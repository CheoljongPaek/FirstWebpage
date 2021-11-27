import {
  dedupExchange,
  fetchExchange,
  gql,
  stringifyVariables,
} from "@urql/core";
import { Cache, cacheExchange, Resolver } from "@urql/exchange-graphcache";
import Router from "next/router";
import { Exchange } from "urql";
import { pipe, tap } from "wonka";
import {
  DeletePostMutationVariables,
  LoginMutation,
  LogoutMutation,
  MeDocument,
  MeQuery,
  RegisterMutation,
  UpdatePostMutationVariables,
  VoteMutationVariables,
} from "../generated/graphql";
import { betterupdateQuery } from "./betterupdateQuery";
import { isServer } from "./isServer";

export const errorExchange: Exchange =
  ({ forward }) =>
  (ops$) => {
    return pipe(
      forward(ops$),
      tap(({ error }) => {
        if (error?.message.includes("not authenticated")) {
          Router.replace("/login");
        }
      })
    );
  };

export type MergeMode = "before" | "after";

export interface PaginationParams {
  cursorArgument?: string;
  limitArgument?: string;
  mergeMode?: MergeMode;
}

const cursorPagination = (): Resolver => {
  return (_parent, fieldArgs, cache, info) => {
    const allFields = cache.inspectFields(info.parentKey);
    const fieldInfos = allFields.filter(
      (afield) => afield.fieldName === info.fieldName
    );
    // console.log("fieldInfos: ", fieldInfos);

    const size = fieldInfos.length;
    if (size === 0) {
      return undefined;
    }
    const fieldKey = `${info.fieldName}(${stringifyVariables(fieldArgs)})`;
    const isItInTheCache = cache.resolve(
      cache.resolve(info.parentKey, fieldKey) as string,
      "posts"
    );

    let hasMore = true;
    info.partial = !isItInTheCache;
    const results: string[] = [];
    fieldInfos.forEach((fi) => {
      const key = cache.resolve(info.parentKey, fi.fieldKey) as string;
      //Query, posts({"limit":10})
      //"Query", .posts(limit: 10) → "Posts:1"
      //key = Query.posts({"limit":10})
      const data = cache.resolve(key, "posts") as string[];
      const _hasMore = cache.resolve(key, "hasMore");
      if (!_hasMore) {
        hasMore = _hasMore as boolean;
      }
      results.push(...data);
    });

    return {
      __typename: "PaginatedPosts",
      hasMore,
      posts: results,
    };
  };
};

function invalidateAllPosts(cache: Cache) {
  const key = "Query";
  cache
    .inspectFields(key)
    .filter((field) => field.fieldName === "posts")
    .forEach((field) => {
      cache.invalidate(key, field.fieldName, field.arguments);
    });
}

export const createUrqlClient = (ssrExchange: any, ctx: any) => {
  let cookie = "";
  if (isServer()) {
    cookie = ctx?.req?.headers?.cookie;
  }

  return {
    url: process.env.NEXT_PUBLIC_API_URL as string,
    fetchOptions: {
      credentials: "include" as const,
      headers: cookie
        ? {
            cookie,
          }
        : undefined,
    },
    exchanges: [
      dedupExchange,
      cacheExchange({
        keys: {
          PaginatedPosts: () => null,
        },
        resolvers: {
          Query: {
            posts: cursorPagination(),
          },
        },
        updates: {
          Mutation: {
            updatePost: (_result, args, cache, _info) => {
              cache.invalidate({
                __typename: "Post",
                id: (args as UpdatePostMutationVariables).id,
              });
            },
            deletePost: (_result, args, cache, _info) => {
              cache.invalidate({
                __typename: "Post",
                id: (args as DeletePostMutationVariables).id,
              });
            },
            vote: (_result, args, cache, _info) => {
              const { postId, value } = args as VoteMutationVariables;
              const data = cache.readFragment(
                gql`
                  fragment _ on Post {
                    id
                    points
                    voteStatus
                  }
                `,
                { id: postId }
              );
              console.log("postId: ", postId);
              console.log("value: ", value);
              console.log("data: ", data);

              if (data) {
                if (data.voteStatus === value) {
                  return;
                }
                const newPoints =
                  (data.points as number) + (!data.voteStatus ? 1 : 2) * value;
                cache.writeFragment(
                  gql`
                    fragment __ on Post {
                      points
                      voteStatus
                    }
                  `,
                  { id: postId, points: newPoints }
                );
              }
            },
            createPost: (_result, _args, cache, _info) => {
              invalidateAllPosts(cache);
            },
            logout: (_result, _args, cache, _info) => {
              betterupdateQuery<LogoutMutation, MeQuery>(
                _result,
                cache,
                { query: MeDocument },
                () => ({ me: null })
              );
            },

            login: (_result, _args, cache, _info) => {
              betterupdateQuery<LoginMutation, MeQuery>(
                _result,
                cache,
                { query: MeDocument },
                (result, query) => {
                  if (result.login.errors) {
                    return query;
                  } else {
                    return {
                      me: result.login.user,
                    };
                  }
                }
              );
              invalidateAllPosts(cache);
            },

            register: (_result, _args, cache, _info) => {
              betterupdateQuery<RegisterMutation, MeQuery>(
                _result,
                cache,
                { query: MeDocument },
                (result, query) => {
                  if (result.register.errors) {
                    return query;
                  } else {
                    return {
                      me: result.register.user,
                    };
                  }
                }
              );
            },
          },
        },
      }),
      errorExchange,
      ssrExchange,
      fetchExchange,
    ],
  };
};

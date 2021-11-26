import { Button } from "@chakra-ui/button";
import { Box, Flex, Heading, Link, Stack, Text } from "@chakra-ui/layout";
import NextLink from "next/link";
import Editdeletepostbtns from "../components/EditDeletePostBtns";
import Layout from "../components/Layout";
import Updootsection from "../components/UpdootSection";
import { useMeQuery, usePostsQuery } from "../generated/graphql";

const Index = () => {
  const { data: meData } = useMeQuery();
  const { data, error, loading, fetchMore, variables } = usePostsQuery({
    variables: {
      limit: 15,
      cursor: null,
    },
    notifyOnNetworkStatusChange: true,
  });

  if (!loading && !data) {
    return (
      <div>
        <div>you got query failed for some reason</div>
        <div>{error?.message}</div>
      </div>
    );
  }

  return (
    <Layout>
      {!data && loading ? (
        <div>loading...</div>
      ) : (
        <Stack spacing={8}>
          {data!.posts.posts.map((p) =>
            !p ? null : (
              <Flex
                key={p.id + "container"}
                p={5}
                shadow="md"
                borderWidth="1px"
              >
                <Updootsection key={p.id + "updoot"} post={p} />
                <Box>
                  <NextLink href={`/post/${p.id}`}>
                    <Link>
                      <Heading fontSize="xl">{p.title}</Heading>
                    </Link>
                  </NextLink>
                  <Text>posted by {p.creator.username}</Text>
                  <Text mt={4}>{p.textSnippet}</Text>
                </Box>
                {meData?.me?.id !== p.creator.id ? null : (
                  <Editdeletepostbtns id={p.id} creatorId={p.creator.id} />
                )}
              </Flex>
            )
          )}
        </Stack>
      )}
      {data && data.posts.hasMore ? (
        <Flex>
          <Button
            m="auto"
            my={8}
            isLoading={loading}
            onClick={() => {
              fetchMore({
                variables: {
                  limit: variables?.limit,
                  cursor:
                    data.posts.posts[data.posts.posts.length - 1].createdAt,
                },
              });
            }}
          >
            load more
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};

export default Index;
// export default withApollo({ ssr: true })(Index);

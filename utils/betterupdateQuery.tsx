import { Cache, QueryInput } from '@urql/exchange-graphcache';

export function betterupdateQuery<Result, Query>(
  result: any,
  cache: Cache,
  qi: QueryInput,
  fn: (r: Result, q: Query) => Query) {
  return cache.updateQuery(qi, (data) => fn(result, data as any) as any);
}

import {
  defaultShouldDehydrateQuery,
  QueryClient,
} from "@tanstack/react-query";
/**
 * Creates a configured React Query `QueryClient` for the application.
 *
 * The client uses a 30,000 ms query stale time and a dehydrate policy that treats queries
 * considered by the default strategy or with `state.status === "pending"` as dehydrable.
 *
 * @returns A `QueryClient` instance with the described default options applied.
 */
export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30 * 1000,
      },
      dehydrate: {
        // serializeData: superjson.serialize,
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === "pending",
      },
      hydrate: {
        // deserializeData: superjson.deserialize,
      },
    },
  });
}
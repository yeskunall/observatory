import { cacheExchange, Client, fetchExchange, gql } from "@urql/core";

export const client = new Client({
  exchanges: [cacheExchange, fetchExchange],
  fetchOptions: {
    headers: {
      // Authorization: `Bearer ${import.meta.env.}`,
      "x-hasura-admin-secret": `${import.meta.env.HASURA_GRAPHQL_ADMIN_SECRET}`,
    },
  },
  requestPolicy: "cache-and-network",
  url: "https://summary-porpoise-60.hasura.app/v1/graphql",
});

export { gql };

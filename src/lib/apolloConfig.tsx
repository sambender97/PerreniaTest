import {
  ApolloProvider,
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  createHttpLink,
  gql,
} from "@apollo/client";
import { createAuthLink } from "aws-appsync-auth-link";
import appSyncConfig from "@/aws-exports";

const httpLink = createHttpLink({
  uri: appSyncConfig.aws_appsync_graphqlEndpoint,
});

const authLink = ApolloLink.from([
  createAuthLink({
    url: appSyncConfig.aws_appsync_graphqlEndpoint,
    region: appSyncConfig.aws_appsync_region,
    auth: {
      type: "API_KEY",
      apiKey: appSyncConfig.aws_appsync_apiKey,
    },
  }),
  httpLink,
]);

const client = new ApolloClient({
  link: authLink,
  cache: new InMemoryCache(),
});

export default function AppSyncProvider({ children }: any) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}


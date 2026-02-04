import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const apoloClient = new ApolloClient({
  link: new HttpLink({ uri: process.env.NEXT_PUBLIC_API_URL }),
  cache: new InMemoryCache(),
});

export default apoloClient;
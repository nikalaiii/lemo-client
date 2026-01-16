import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const apoloClient = new ApolloClient({
  link: new HttpLink({ uri: "https://flyby-router-demo.herokuapp.com/" }),
  cache: new InMemoryCache(),
});

export default apoloClient;
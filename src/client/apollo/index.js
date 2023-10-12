import { ApolloClient } from '@apollo-client';
import { InMemoryCache } from '@apollo-cache-inmemory';
import { HttpLink } from '@apollo-link-http';
import { onError } from '@apollo-link-error';
import { ApolloLink } from '@apollo-link';
import { gql } from '@apollo/client';


const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) => console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`));
        if (networkError) {
          console.log(`[Network error]: ${networkError}`);
        }
      }
    }),
    new HttpLink({
      uri: 'http://ec2-35-162-152-22.us-west-2.compute.amazonaws.com:8000/graphql',
    }),
 ]),
 cache: new InMemoryCache(),
});





client.query({
	query: gql`
	{
	posts {
		id
		text
		
		user
		{
		avatar
		username
		}
}
}`
}).then(result => console.log(result));






export default client;

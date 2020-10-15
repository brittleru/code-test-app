import React, {Component} from 'react';
import './App.css';
import ApolloClient from "apollo-boost";
import { ApolloProvider, Query } from "react-apollo";
import gql from "graphql-tag";

// Connect my site to GraphQL/ FakerQL
const client = new ApolloClient({
  uri: `https://fakerql.stephix.uk/graphql`
});

// My Query of posts
const postsQuery = gql `
{
  allPosts(count: 5) {
    id
    title
    body
    published
    createdAt
    author {
      id
      firstName
      lastName
      avatar
    }
  }
}
`;

// Running query
client.query({
    query: postsQuery
  }).then(res => {
    console.log(res);
  });


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Data Histrogram</h1>
        </header>



        <footer>
            by Mocanu Sebastian
        </footer>
      </div>
    );
  }

}

export default App;

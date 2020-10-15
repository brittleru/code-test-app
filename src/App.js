import React, {Component} from 'react';
import './App.css';
import ApolloClient from "apollo-boost";
import { ApolloProvider, Query } from "react-apollo";
import gql from "graphql-tag";
import moment from "moment";

// Connect my site to GraphQL/ FakerQL
const client = new ApolloClient({
  uri: `https://fakerql.stephix.uk/graphql`
});

// My Query of posts
const postsQuery = gql `
{
  allPosts(count: 100) {
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
    let dataForX = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let dataForY = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    for (let i = 0; i < res.data.allPosts.length; i++) {
      let num = parseFloat(res.data.allPosts[`${i}`]["createdAt"]);
      let theData = moment(new Date(num)).format("MMM Do YY");
      for(let j = 0; j < dataForY.length; j++) {
        if (theData.includes(dataForY[j])) {
          dataForX[j] += 1;
        }
      }
      console.log(theData);
    }

    console.log(dataForX);
    return dataForX;
  });


class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Data Histrogram</h1>
        </header>

        <Query query={postsQuery}>
          {({loading, error, data}) => {
            if (loading) {
              return <div>Loading...</div>
            }
            if (error) {
              return <div>Error {error.toString()}</div>
            }

            if(data) {
              return  (
                <div>
                  {
                    data.allPosts.map((post) => {
                      let theDate = moment(new Date(parseFloat(post.["createdAt"]))).format("MMM Do YY");
                      return <div key={post.id}>{`Date: ${theDate}`}</div>
                    })
                  }
                </div>
              )
            }
          }}
        </Query>

        <footer>
            by Mocanu Sebastian
        </footer>
      </div>
      </ApolloProvider>
    );
  }

}

export default App;

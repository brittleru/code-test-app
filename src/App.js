import React, {Component} from 'react';
import './App.css';
import ApolloClient from "apollo-boost";
import { ApolloProvider, Query } from "react-apollo";
import gql from "graphql-tag";
import moment from "moment";
import Histograma from "./components/Histograma"

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
// client.query({
//     query: postsQuery
//   }).then(res => {
//     let dataForX = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
//     let dataForY = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//
//     for (let i = 0; i < res.data.allPosts.length; i++) {
//       let num = parseFloat(res.data.allPosts[`${i}`]["createdAt"]);
//       let theData = moment(new Date(num)).format("MMM Do YY");
//       for(let j = 0; j < dataForY.length; j++) {
//         if (theData.includes(dataForY[j])) {
//           dataForX[j] += 1;
//         }
//       }
//       // console.log(theData);
//     }
//
//     // console.log(dataForX);
//     return dataForX;
//   });


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show:true,
      toggleText: "Show Data"
    };
    this.toggleDiv = this.toggleDiv.bind(this);

  }

  toggleDiv = () => {
    const {show, toggleText} = this.state;
    if (toggleText === "Show Data") {
      this.setState({
        show: !show,
        toggleText: "Hide Data"
      })
    }
    if (toggleText === "Hide Data") {
      this.setState({
        show: !show,
        toggleText: "Show Data"
      })
    }

  }

  render() {

    let dataForX = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    return (
      <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Data Histrogram</h1>
        </header>

        <Query query={postsQuery}>
          {({loading, error, data}) => {
            if(loading) {
              return <div className="loading-div">Loading...</div>
            }

            if(error) {
              return <div>Error {error.toString()}</div>
            }

            if(data) {
              let dataForY = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
              for (let i = 0; i < data.allPosts.length; i++) {
                let num = parseFloat(data.allPosts[`${i}`]["createdAt"]);
                let theData = moment(new Date(num)).format("MMM Do YY")

                for (let j = 0; j < dataForX.length; j++) {
                  if(theData.includes(dataForX[j])) {
                    dataForY[j] += 1;
                  }
                }
              }
              console.log(dataForY);
              return (
                <div className="histogram">
                   <Histograma
                     xdim={750}
                     ydim={500}
                     margin={{
                       top: 80,
                       bottom: 80,
                       left: 120,
                       right: 120
                     }}
                     xdata={dataForX}
                     ydata={dataForY}
                   />
                   <hr style={{color: "#19d3da",
                                 backgroundColor: "#19d3da",
                                 borderTop: "1px solid #19d3da",

                                 borderRadius: 40,
                                 width: "70%"
                               }}
                   />
                </div>
              );
            }
          }
        }
        </Query>
        <Query query={postsQuery}>
          {({loading, error, data}) => {
            if (loading) {
              return <div className="loading-div">Loading...</div>
            }
            if (error) {
              return <div>Error {error.toString()}</div>
            }

            if(data) {
              return  (
                <div className="data-div">
                  <button className="button" onClick={ this.toggleDiv }>{this.state.toggleText}</button>
                  {!this.state.show && data.allPosts.map((post) => {
                    let theDate = moment(new Date(parseFloat(post.["createdAt"]))).format("MMMM Do YYYY, h:mm:ss a");
                    return <div className="data-divs" key={post.id}>{`Date: ${theDate}`}</div>
                  })}
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

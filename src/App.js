import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider, Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import "./App.css"

const client = new ApolloClient({
  uri: process.env.REACT_APP_SERVER_ENDPOINT
})

const query = gql`
  query{
    todos{
      id
      text
    }
  }
`;
const mutation = gql`
  mutation AddTodo($text: String!){
    addTodo(text: $text){
      id
      text
    }
  }
`;

const AddTodo = ({ onAddTodo }) => {
  let input;
  return (
    <Mutation mutation={mutation}>
      {(addTodo, { data }) => (
        <div>
          <form onSubmit={async e => {
            e.preventDefault();
            addTodo({ variables: { text: input.value } })
            input.value = '';
            onAddTodo();
          }}>
            <input className="InputTodo" ref={node => { input = node; }} />
            <button className="AddTodoButton" type="submit">Add Todo</button>
          </form>
        </div>
      )}
    </Mutation>
  )
}
class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <Query query={query}>
            {({ loading, error, data, refetch }) => {
              if (loading) return <p>Loading...</p>
              if (error) return <p>Error :(</p>
              return (
                <div>
                  <AddTodo onAddTodo={() => refetch()} />
                  <ul>
                    {data.todos.map(todo => <li key={todo.id}>{todo.text}</li>)}
                  </ul>
                </div>
              )
            }}
          </Query>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;

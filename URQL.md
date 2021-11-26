# urql Start
**ural** is a customizable GraphQL client with versatile features including *normalized caching*.  
> To handle content-heavy pages, use *Document Caching*.  
> To handle dynamic and data-heavy apps, use *Normalized Caching*.  

<br>

## Setting up the Client
```javascript
import { createClient } from 'urql';

const client = createClient({
  url: 'http://localhost:3000/graphql',
  fetchOptions: () => {
    const token = getToken();
    return {
      headers: { authorization: token ? `Bearer ${token}` : '' },
    };
  },
});
```
*createClient* method create the GraphQL client.  
The client manages **all** of our GraphQL requests and result.  
- property1: pass an API's url.
- property2: use *fetchOptions* working when a request is sent to the url from client.   
Options object or a function returning options object are passed.  
- property3: exchanges.

<br>

## Providing the Client  
### Option 1: Context API for global **CSR** usage
```javascript
import { createClient, Provider } from 'urql';

const client = createClient({
  url: 'http://localhost:3000/graphql',
});

const App = () => (
  <Provider value={client}>
    <YourRoutes />
  </Provider>
);
```  
urql provides *Provider* to use GraphQL queries sent to API.

<br>

### Option 2: Componentization for selective usage between **SSR and CSR**
```javascript
import { withUrqlClient } from 'next-urql';
// createUrqlClient is the client.
// Index is page('/') in nextjs.
export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
```  
Nextjs provides *withUrqlClient* in **next-urql**.  
We can split the client and use it as a component for each page.  
SSR or CSR is selected by passing ssr option.

<br>

## Queries  
```javascript
import { useQuery } from 'urql';

const TodosQuery = `
  query {
    todos {
      id
      title
    }
  }
`;

const Todos = () => {
  const [result, reexecuteQuery] = useQuery({
    query: TodosQuery,
  });

  const { data, fetching, error } = result;

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <ul>
      {data.todos.map(todo => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
};
```  
*useQuery* accepts query option fitting API and returns a tuple.  
The return contains a **result object** and a reexecute function.  
The result object contains serveral properties.  
- data: result data from API.
- fetching: indicates whetehr the hook is loading data.
- error: set when either the request to the API has failed or  
the API result contained some GraphQLErrors.  

### Query without variables  
```javascript
const TodosQuery = `
  query {
    todos {
      id
      title
    }
  }
`;

const [result, reexecuteQuery] = useQuery({
  query: TodosQuery,
});
```  
### Query with variables
```javascript
const TodosListQuery = `
  query ($from: Int!, $limit: Int!) {
    todos (from: $from, limit: $limit) {
      id
      title
    }
  }
`;

const Todos = ({ from, limit }) => {
  const [result, reexecuteQuery] = useQuery({
    query: TodosListQuery,
    variables: { from, limit },
  });
};
```  
The variables are sent to API with POST request.  
After the variables change, new request is sent to API.  
> New request is sent to API unless a result has already been cached previosuly.  

<br>

## Mutations  
```javascript
const UpdateTodo = `
  mutation ($id: ID!, $title: String!) {
    updateTodo (id: $id, title: $title) {
      id
      title
    }
  }
`;

const Todo = ({ id, title }) => {
  const [updateTodoResult, updateTodo] = useMutation(UpdateTodo);
};
```  
*useMutation* returns a tuple, and **updateTodo** contains fetching, error and data.  

<br>

### Use the mutation result function.
```javascript
const Todo = ({ id, title }) => {
  const [updateTodoResult, updateTodo] = useMutation(UpdateTodo);

  const submit = newTitle => {
      const variables = { id, title: newTitle || '' };
      updateTodo(variables).then(result => {
    });
  };
};
```  

<br>

# urql Architecture  
urql ...
- sends queires & mutations and receives results *declaratively*.
- abstracts *caching* and states management internally.
- provides a central point of extensibility & integration with API.  

In this section, we will figure how urql dealt with the three problems.  

<br>

## Requests and Operations on the Client  
urql follows serveral steps  
1. we send our queries or mutations to the urql Client.
2. internally, they are 'query or mutation **Operations**'.
> Operation is an extension of GraphQLRequests.  
> They carry the *query, variables, a key, etc*.
3. Client cancles the operation, or accepts an Opertation and exeute it.  
4. The operations go through the **Exchanges** on the Client.  
> The Client itself does not actually know what to do with operations.  
> It sends the operations to *exchanges*.
5. receive a result and identify the result with a key.  

<br>

## How operations get to exchanges  
- Any calls to the Client create an operation.
- The operation identifies itself as 'query, mutation, subscription and unique key'.  
- It is sent into the exchanges, and ends up at fetchExchange.  
- It is sent to the API and a result comes back, which is wrapped in an **OperationResult**.
- The Client filters the Operationresult by operation.key.
- gives us a stream of results.

## The Exchanges  
The three exchanges automatically applies to a Client.  
- dedupExchange: deduplicates pending operations.
- **cacheExchange**
- fetchExchange: sends an operation to the API using fetch and adds results to the output stream.  
 
Plus, some of the exchanges are available.  
- errorExchange: allows a global callback when error occurs.  
- ssrExchange: allows for SSR.  

<br>

# Graphcache  
urql provides *Document Cache* as the default.  
For more complex, `yarn add @urql/exchange-graphcache`.  
The **cacheExchange** in the package replaces default of *@urql/core*.  
## Document Cache of Core  
Each request is unique because it has its key and exactly one cached result.  
Document Caching avoids sending the same requests to a API repeatedly by caching the result of each query.  

1. send a mutation containing the same type that another query results have.
2. The query result is removed from the cache.

## Normalized Caching
For more complicated case, there are two configuration options; **resolvers and updates**.  
### Manually Resolving Entities.

### Manual cache updates.
























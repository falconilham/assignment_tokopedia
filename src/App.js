import './App.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { store, persistor } from './redux/store';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import Modal from './component/modal';
import Navbar from './component/navbar';
import AppRoute from './screen';

const client = new ApolloClient({
  uri: 'https://graphql-pokeapi.graphcdn.app/',
  cache: new InMemoryCache()
});

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ApolloProvider client={client}>
          <AppRoute>
            <Navbar />
            <Modal />
          </AppRoute>
        </ApolloProvider>
      </PersistGate>
    </Provider >
  );
}

export default App;

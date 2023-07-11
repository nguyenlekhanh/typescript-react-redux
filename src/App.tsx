import { Provider } from 'react-redux';
import './App.css';
import ProductForm from './Products/ProductForm';
import ProductList from './Products/ProductList';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <ProductList />
        <ProductForm />
      </div>
    </Provider>
  );
}

export default App;

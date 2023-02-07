import store from './store'
import MainPage from './pages/MainPage';
import { Provider } from 'react-redux'

const App = () => {
  return (
    <Provider store={store}>
      <MainPage />
    </Provider>
  );
}

export default App;

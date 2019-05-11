import React , { Component } from 'react';
import NavApp from './Components/NavApp/NavApp';

import { Provider } from 'react-redux';
import store from './store';

import { loadUser } from './actions/authActions';

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {

  componentDidMount() {
    store.dispatch(loadUser());
  }
  
  render(){
    return (
      <Provider store ={store}>
      <div className="App">

        <NavApp />
      </div>
      </Provider>
    );
  }
}

export default App;

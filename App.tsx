import React from 'react';
import {Provider} from 'react-redux';

import MainScreen from './MainScreen';
import {store} from './redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <MainScreen />
    </Provider>
  );
}

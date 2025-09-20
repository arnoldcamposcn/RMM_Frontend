import React from 'react'
import './index.css'
import ReactDOM from "react-dom/client";
import { store } from './store/store.ts'
import { Provider } from 'react-redux'
import AppNavigator from './Navigation/AppNavigator.tsx'

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  </React.StrictMode>,
)

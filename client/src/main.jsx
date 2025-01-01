import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'flowbite/dist/flowbite.css'
import App from './App.jsx'
import {store, persistor} from './redux/store.jsx'
import {Provider} from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'



createRoot(document.getElementById('root')).render(
  //provider is a component that makes the Redux store available to any nested components that need to access the Redux store
  
  <StrictMode>
    <PersistGate persistor={persistor}> 
     <Provider store={store}> {/* makes the Redux store available to any nested components that need to access the Redux store */}
    <App />
    </Provider>
    </PersistGate>
  </StrictMode>
  
)

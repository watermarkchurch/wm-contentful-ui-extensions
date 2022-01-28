import {FunctionComponent, h} from 'preact'
import { Provider } from 'react-redux'
import store from '../appState'

/**
 * The ReduxProvider initializes and provides the client Redux store.
 */
const ReduxProvider: FunctionComponent = ({children}) => {
  return <Provider store={store}>
    {children}
  </Provider>
}

export default ReduxProvider

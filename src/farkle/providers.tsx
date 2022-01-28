import {FunctionComponent, h} from 'preact'
import ReduxProvider from './providers/reduxProvider'

const Providers: FunctionComponent = ({children}) => {
  return <ReduxProvider>
    {children}
  </ReduxProvider>
}
export default Providers

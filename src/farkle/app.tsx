import {FunctionComponent, h} from 'preact'
import { Farkle } from './farkle'
import Providers from './providers'

const App: FunctionComponent = ({children}) => {
  return <Providers>
    <Farkle />
  </Providers>
}
export default App

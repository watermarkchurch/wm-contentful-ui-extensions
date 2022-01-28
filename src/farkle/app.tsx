import {FunctionComponent, h} from 'preact'
import Navigation from './navigation'
import Providers from './providers'

import '../../vendor/react-dice-complete/src/styles.scss'
import './style.scss'

const App: FunctionComponent = ({}) => {
  return <Providers>
    <Navigation />
  </Providers>
}
export default App

import { createHashHistory } from 'history'
import { FunctionComponent, h } from 'preact'
import {Router} from 'preact-router'

import Home from './routes/home'
import MultiPlayer from './routes/multiPlayer'
import SinglePlayer from './routes/singlePlayer'

const Navigation: FunctionComponent = () => {
  return <Router history={createHashHistory() as any}>
    <Home path="/"></Home>
    <SinglePlayer path="/sp" />
    <MultiPlayer path="/mp" />
  </Router>
}

export default Navigation

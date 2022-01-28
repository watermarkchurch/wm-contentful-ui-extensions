import {h, render} from 'preact'
import { injectBootstrap } from '../lib/utils'
import App from './app'

$(document).ready(() => {
  injectBootstrap()

  render(<App />,
    document.getElementById('react-root')!)
})

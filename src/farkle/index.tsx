
import {h, render} from 'preact'
import { injectBootstrap } from '../lib/utils'
import { Farkle } from './farkle'

$(document).ready(() => {
  injectBootstrap()

  // render without UI extension sdk for now
  render(<Farkle />,
    document.getElementById('react-root')!)
})

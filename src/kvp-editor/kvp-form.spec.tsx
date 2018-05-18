import {expect} from 'chai'
import {} from 'mocha'
import {h} from 'preact'
import {shallow} from 'preact-render-spy'

import {KVPForm} from './kvp-form'

describe('<kvp-form />', () => {
  it('should mount', () => {

    const rendered = shallow(<KVPForm />)

    // assert
    expect(rendered.text()).to.include('Form')
  })

  it('renders two inputs for entering a new kvp')

  it('renders a table for displaying the pairs')

  it('adds a new pair to the table on button press')

  it('adds a new pair to the table on enter')

  it('deletes a pair from the table on clicking the X button')

  it('puts the deleted KVP into the inputs')

  it('reorders the inputs with drag-and-drop')
})

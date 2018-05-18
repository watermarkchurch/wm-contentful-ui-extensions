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
})

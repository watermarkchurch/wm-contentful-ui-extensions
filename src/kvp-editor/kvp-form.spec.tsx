import {expect} from 'chai'
import {} from 'mocha'
import {h} from 'preact'
import {shallow} from 'preact-render-spy'

import {KVPForm} from './kvp-form'

// tslint:disable:no-unused-expression

describe('<kvp-form />', () => {
  it('should mount', () => {

    const rendered = shallow(<KVPForm />)

    // assert
    expect(rendered.find('.kvp-form__header')).to.exist
  })

  it('renders two inputs for entering a new kvp', () => {

    const rendered = shallow(<KVPForm />)

    // assert
    const inputs = rendered.find('.kvp-form__form').find('input')
    expect(inputs.length).to.equal(2)
    expect(inputs[0].attributes.name).to.equal('key')
    expect(inputs[1].attributes.name).to.equal('value')
  })

  it('renders a table for displaying the pairs', () => {

    const rendered = shallow(<KVPForm
      items={[
        { key: 'key1', value: 'val1' },
        { key: 'key2', value: 'val2' },
      ]}
      />)

    // assert
    const rows = rendered.find('.kvp-form__table__row')
    expect(rows.length).to.equal(2)
  })

  it('adds a new pair to the table on button press')

  it('adds a new pair to the table on enter')

  it('deletes a pair from the table on clicking the X button')

  it('puts the deleted KVP into the inputs')

  it('reorders the inputs with drag-and-drop')
})

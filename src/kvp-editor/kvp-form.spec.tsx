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

  it('adds a new pair to the table on form submit', () => {

    const pairs: Array<{key: string, value: string}> = []
    const rendered = shallow(<KVPForm
      onRowAdded={(pair) => pairs.push(pair)}
      />)
    rendered.setState({
      key: 'testkey',
      value: 'testval',
    })

    // act
    rendered.find('form').simulate('submit')

    // assert
    expect(pairs).to.have.length(1)
    expect(pairs[0]).to.deep.equal({
      key: 'testkey',
      value: 'testval',
    })
  })

  it('validates presence of key and value', () => {

    const pairs: Array<{key: string, value: string}> = []
    const rendered = shallow(<KVPForm
      onRowAdded={(pair) => pairs.push(pair)}
      />)
    rendered.setState({
      key: '',
      value: null,
    })

    // act
    rendered.find('form').simulate('submit')

    // assert
    expect(pairs).to.have.length(0)
    expect(rendered.find('.error')).to.have.length(2)
  })

  it('deletes a pair from the table on clicking the X button', () => {
    const deleted = [] as any[]
    const rendered = shallow(<KVPForm
      items={[
        { key: 'key1', value: 'val1' },
        { key: 'key2', value: 'val2' },
      ]}
      onRowDeleted={(pair) => deleted.push(pair)}
      />)

    // act
    const button = rendered.find('.delete').first()
    button.simulate('click')

    // assert
    expect(deleted).to.have.length(1)
    expect(deleted[0]).to.deep.equal({
      key: 'key1', value: 'val1',
    })
  })

  it('puts the deleted KVP into the inputs', () => {
    const deleted = [] as any[]
    const rendered = shallow(<KVPForm
      items={[
        { key: 'key1', value: 'val1' },
        { key: 'key2', value: 'val2' },
      ]}
      onRowDeleted={(pair) => deleted.push(pair)}
      />)

    // act
    const button = rendered.find('.delete').first()
    button.simulate('click')

    // assert
    expect(rendered.state().key).to.equal('key1')
    expect(rendered.state().value).to.equal('val1')
  })

  it('reorders the inputs with drag-and-drop')
})

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
    const inputs = rendered.find('.form').find('input')
    expect(inputs.length).to.equal(2)
    expect((inputs[0] as any).attributes.id).to.equal('key')
    expect((inputs[1] as any).attributes.id).to.equal('value')
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
    // 2 display rows + 1 form row
    expect(rows.length).to.equal(3)
  })

  it('adds a new pair to the table on form submit', () => {

    let pairs: Array<{key: string, value: string}> = []
    const rendered = shallow(<KVPForm
      onItemsChanged={(pair) => pairs = pair}
      />)
    rendered.setState({
      key: 'testkey',
      value: 'testval',
    })

    // act
    rendered.find('#add').simulate('click')

    // assert
    expect(pairs).to.have.length(1)
    expect(pairs[0]).to.deep.equal({
      key: 'testkey',
      value: 'testval',
    })
  })

  it('validates presence of key and value', () => {

    let pairs: Array<{key: string, value: string}> = []
    const rendered = shallow(<KVPForm
      onItemsChanged={(pair) => pairs = pair}
      />)
    rendered.setState({
      key: '',
      value: null,
    })

    // act
    rendered.find('#add').simulate('click')

    // assert
    expect(pairs).to.have.length(0)
    expect(rendered.find('.error')).to.have.length(2)
  })

  it('deletes a pair from the table on clicking the X button', () => {
    let pairs: Array<{key: string, value: string}> = []
    const rendered = shallow(<KVPForm
      items={[
        { key: 'key1', value: 'val1' },
        { key: 'key2', value: 'val2' },
      ]}
      onItemsChanged={(pair) => pairs = pair}
      />)

    // act
    const button = rendered.find('.delete').first()
    button.simulate('click')

    // assert
    expect(pairs).to.have.length(1)
    expect(pairs[0]).to.deep.equal({
      key: 'key2', value: 'val2',
    })
  })

  it('puts the deleted KVP into the inputs', () => {
    let pairs: Array<{key: string, value: string}> = []
    const rendered = shallow(<KVPForm
      items={[
        { key: 'key1', value: 'val1' },
        { key: 'key2', value: 'val2' },
      ]}
      onItemsChanged={(pair) => pairs = pair}
      />)

    // act
    const button = rendered.find('.delete').first()
    button.simulate('click')

    // assert
    expect(rendered.state().key).to.equal('key1')
    expect(rendered.state().value).to.equal('val1')
  })

  it('reorders on moveUp', () => {
    let pairs: Array<{key: string, value: string}> = []
    const rendered = shallow(<KVPForm
      items={[
        { key: 'key1', value: 'val1' },
        { key: 'key2', value: 'val2' },
      ]}
      onItemsChanged={(pair) => pairs = pair}
      />)

    // act
    const button = rendered.find('.kvp-form__table__row').at(1)
      .find('.flex-vert').children().first()
    button.simulate('click')

    // assert
    expect(pairs).to.deep.equal([
      { key: 'key2', value: 'val2' },
      { key: 'key1', value: 'val1' },
    ])
  })

  it('reorders on moveDown', () => {
    let pairs: Array<{key: string, value: string}> = []
    const rendered = shallow(<KVPForm
      items={[
        { key: 'key1', value: 'val1' },
        { key: 'key2', value: 'val2' },
      ]}
      onItemsChanged={(pair) => pairs = pair}
      />)

    // act
    const button = rendered.find('.kvp-form__table__row').first()
      .find('.flex-vert').children().last()
    button.simulate('click')

    // assert
    expect(pairs).to.deep.equal([
      { key: 'key2', value: 'val2' },
      { key: 'key1', value: 'val1' },
    ])
  })
})

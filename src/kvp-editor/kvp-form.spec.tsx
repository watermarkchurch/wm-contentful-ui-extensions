import {fireEvent, render} from '@testing-library/preact'
import {expect} from 'chai'
import {} from 'mocha'
import {h} from 'preact'

import { wait } from '../lib/utils'
import {KVPForm} from './kvp-form'

// tslint:disable:no-unused-expression

describe('<kvp-form />', () => {
  it('renders two inputs for entering a new kvp', async () => {

    const rendered = render(<KVPForm />)

    // assert
    const key = await rendered.findByTestId('key')
    expect(key.id).to.equal('key')
    const value = await rendered.findByTestId('value')
    expect(value.id).to.equal('value')
  })

  it('renders a table for displaying the pairs', async () => {

    const rendered = render(<KVPForm
      items={[
        { key: 'key1', value: 'val1' },
        { key: 'key2', value: 'val2' },
      ]}
      />)

    // assert
    const rows = await rendered.findAllByTestId('table-row')
    // 2 display rows
    expect(rows.length).to.equal(2)
    // 1 form row
    expect(await rendered.findByTestId('form-row')).to.exist
  })

  it('adds a new pair to the table on form submit', async () => {

    let pairs: Array<{key: string, value: string}> = []
    const rendered = render(<KVPForm
      onItemsChanged={(pair) => pairs = pair}
      />)
    const key = await rendered.findByTestId('key')
    const value = await rendered.findByTestId('value')
    fireEvent.change(key, { target: { value: 'testkey' }})
    fireEvent.change(value, { target: { value: 'testval' }})

    // act
    fireEvent.click(await rendered.findByTestId('add'))

    // assert
    expect(pairs).to.have.length(1)
    expect(pairs[0]).to.deep.equal({
      key: 'testkey',
      value: 'testval',
    })
  })

  it('validates presence of key and value', async () => {

    let pairs: Array<{key: string, value: string}> = []
    const rendered = render(<KVPForm
      onItemsChanged={(pair) => pairs = pair}
      />)

    // act
    fireEvent.click(await rendered.findByTestId('add'))

    // assert
    expect(pairs).to.have.length(0)
    expect(await rendered.findAllByTestId('error')).to.have.length(2)
  })

  it('deletes a pair from the table on clicking the X button', async () => {
    let pairs: Array<{key: string, value: string}> = []
    const rendered = render(<KVPForm
      items={[
        { key: 'key1', value: 'val1' },
        { key: 'key2', value: 'val2' },
      ]}
      onItemsChanged={(pair) => pairs = pair}
      />)

    // act
    const button = (await rendered.findAllByTestId('delete'))[0]
    fireEvent.click(button)

    // assert
    expect(pairs).to.have.length(1)
    expect(pairs[0]).to.deep.equal({
      key: 'key2', value: 'val2',
    })
  })

  it('puts the deleted KVP into the inputs', async () => {
    let pairs: Array<{key: string, value: string}> = []
    const rendered = render(<KVPForm
      items={[
        { key: 'key1', value: 'val1' },
        { key: 'key2', value: 'val2' },
      ]}
      onItemsChanged={(pair) => pairs = pair}
      />)

    // act
    const button = (await rendered.findAllByTestId('delete'))[0]
    fireEvent.click(button)
    await wait(10)

    // assert
    expect(rendered.getByDisplayValue('key1').id).to.eq('key')
    expect(rendered.getByDisplayValue('val1').id).to.eq('value')
  })

  it('reorders on moveUp', async () => {
    let pairs: Array<{key: string, value: string}> = []
    const rendered = render(<KVPForm
      items={[
        { key: 'key1', value: 'val1' },
        { key: 'key2', value: 'val2' },
      ]}
      onItemsChanged={(pair) => pairs = pair}
      />)

    // act
    const button = (await rendered.findAllByTestId('move-up'))[1]
    fireEvent.click(button)

    // assert
    expect(pairs).to.deep.equal([
      { key: 'key2', value: 'val2' },
      { key: 'key1', value: 'val1' },
    ])
  })

  it('reorders on moveDown', async () => {
    let pairs: Array<{key: string, value: string}> = []
    const rendered = render(<KVPForm
      items={[
        { key: 'key1', value: 'val1' },
        { key: 'key2', value: 'val2' },
      ]}
      onItemsChanged={(pair) => pairs = pair}
      />)

    // act
    const button = (await rendered.findAllByTestId('move-down'))[0]
    fireEvent.click(button)

    // assert
    expect(pairs).to.deep.equal([
      { key: 'key2', value: 'val2' },
      { key: 'key1', value: 'val1' },
    ])
  })
})

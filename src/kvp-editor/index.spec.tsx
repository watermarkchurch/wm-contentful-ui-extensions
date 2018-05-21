import {expect} from 'chai'
import {} from 'mocha'
import {h} from 'preact'
import {render} from 'preact-render-spy'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
chai.use(sinonChai)

import { wait } from '../lib/utils'
import {KvpEditor} from './index'

describe('<KvpEditor />', () => {

  it('renders empty KVPForm when value empty', () => {
    const sdk = {
      field: {
        getValue: sinon.stub().returns(null),
        onValueChanged: sinon.stub(),
      },
    }

    // act
    const rendered = render(<KvpEditor {...sdk as any}/>)

    // assert
    const form = rendered.find<any, any>('KVPForm')
    expect(form.attrs().items || []).to.have.length(0)
  })

  it('renders KVPForm with values from sdk', async () => {
    const sdk = {
      field: {
        getValue: sinon.stub().returns([
          { key: 'test1', value: 'val1' },
        ]),
        onValueChanged: sinon.stub(),
      },
    }

    // act
    const rendered = render(<KvpEditor {...sdk as any}/>)
    await wait(1)

    // assert
    const form = rendered.find<any, any>('KVPForm')
    const items = form.attrs().items || []
    expect(items).to.have.length(1)
    expect(items[0].key).to.equal('test1')
    expect(items[0].value).to.equal('val1')
  })

  it('sets field value on row added', () => {
    const setValue = sinon.spy()
    const sdk = {
      field: {
        getValue: sinon.stub().returns(null),
        onValueChanged: sinon.stub(),
        setValue,
      },
    }

    // act
    const rendered = render(<KvpEditor {...sdk as any}/>)
    const form = rendered.find<any, any>('KVPForm')
    form.attrs().onRowAdded({ key: 'added', value: 'newValue' })

    // assert
    expect(setValue).to.have.been.calledWith([{
      key: 'added', value: 'newValue',
    }])
  })

  it('updates state on row added', async () => {
    const sdk = {
      field: {
        getValue: sinon.stub().returns(null),
        onValueChanged: sinon.stub(),
        setValue: sinon.stub().returns(Promise.resolve()),
      },
    }

    // act
    const rendered = render(<KvpEditor {...sdk as any}/>)
    const form = rendered.find<any, any>('KVPForm')
    form.attrs().onRowAdded({ key: 'added', value: 'newValue' })
    await wait(1)

    // assert
    expect(rendered.state().fieldValue).to.deep.equal([
      { key: 'added', value: 'newValue' },
    ])
  })

  it('sets field value on row deleted', async () => {
    const setValue = sinon.spy()
    const sdk = {
      field: {
        getValue: sinon.stub().returns([
          { key: 'existing', value: 'val' },
          { key: 'existing2', value: 'val2' },
        ]),
        onValueChanged: sinon.stub(),
        setValue,
      },
    }

    // act
    const rendered = render(<KvpEditor {...sdk as any}/>)
    const form = rendered.find<any, any>('KVPForm')
    form.attrs().onRowDeleted({ key: 'existing', value: 'val' })

    // assert
    expect(setValue).to.have.been.calledWith([{
      key: 'existing2', value: 'val2',
    }])
  })

  it('updates state on row deleted', async () => {
    const sdk = {
      field: {
        getValue: sinon.stub().returns([
          { key: 'existing', value: 'val' },
          { key: 'existing2', value: 'val2' },
          { key: 'existing3', value: 'val3' },
        ]),
        onValueChanged: sinon.stub(),
        setValue: sinon.stub().returns(Promise.resolve()),
      },
    }

    // act
    const rendered = render(<KvpEditor {...sdk as any}/>)
    const form = rendered.find<any, any>('KVPForm')
    form.attrs().onRowDeleted({ key: 'existing2', value: 'val2' })
    await wait(1)

    // assert
    expect(rendered.state().fieldValue).to.deep.equal([
      { key: 'existing', value: 'val' },
      { key: 'existing3', value: 'val3' },
    ])
  })
})

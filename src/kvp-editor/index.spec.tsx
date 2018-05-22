import {expect} from 'chai'
import {} from 'mocha'
import {h} from 'preact'
import {render} from 'preact-render-spy'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
chai.use(sinonChai)

import { stubSdk } from '../lib/spec-helpers'
import { wait } from '../lib/utils'
import {KvpEditor} from './index'

describe('<KvpEditor />', () => {

  it('renders empty KVPForm when value empty', () => {
    const sdk = stubSdk()

    // act
    const rendered = render(<KvpEditor {...sdk as any}/>)

    // assert
    const form = rendered.find<any, any>('KVPForm')
    expect(form.attrs().items || []).to.have.length(0)
  })

  it('renders KVPForm with values from sdk', async () => {
    const sdk = stubSdk({
        getValue: sinon.stub().returns([
          { key: 'test1', value: 'val1' },
        ]),
      })

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

  it('sets field value on items changed', () => {
    const setValue = sinon.spy()
    const sdk = stubSdk({
        setValue,
      })

    // act
    const rendered = render(<KvpEditor {...sdk as any}/>)
    const form = rendered.find<any, any>('KVPForm')
    form.attrs().onItemsChanged([{ key: 'added', value: 'newValue' }])

    // assert
    expect(setValue).to.have.been.calledWith([{
      key: 'added', value: 'newValue',
    }])
  })

  it('updates state on items changed', async () => {
    const sdk = stubSdk()

    // act
    const rendered = render(<KvpEditor {...sdk as any}/>)
    const form = rendered.find<any, any>('KVPForm')
    form.attrs().onItemsChanged([{ key: 'added', value: 'newValue' }])
    await wait(1)

    // assert
    expect(rendered.state().fieldValue).to.deep.equal([
      { key: 'added', value: 'newValue' },
    ])
  })
})

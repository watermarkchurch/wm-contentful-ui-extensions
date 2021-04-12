import {fireEvent, render} from '@testing-library/preact'
import {expect} from 'chai'
import {} from 'mocha'
import {h} from 'preact'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import { debug, emptyResponse, loadFixture, stubClient, stubClientResp, stubSdk } from '../lib/spec-helpers'
import { wait } from '../lib/utils'
import {CrossSpaceLinkEditor} from './index'

// tslint:disable: no-unused-expression

describe('<CrossSpaceLinkEditor />', () => {

  it('renders form with disabled input on init', () => {
    const sdk = stubSdk()
    const client = stubClient()

    // act
    const rendered = render(<CrossSpaceLinkEditor {...sdk as any} client={client} />)

    // assert
    const input = rendered.getByTestId('input')
    expect(input.attributes.getNamedItem('disabled').value).to.eq('')
  })

  it('renders enabled after loading entries', async () => {
    const sdk = stubSdk()
    const fixture = stubClientResp(loadFixture('person-query.json'))
    const client = stubClient({
      getEntries: sinon.stub()
        .onCall(0).returns(Promise.resolve(fixture))
        .returns(Promise.resolve(emptyResponse)),
    })

    // act
    const rendered = render(<CrossSpaceLinkEditor {...sdk as any} client={client} />)
    await wait(1) // wait for componentDidMount

    // assert
    const input = rendered.getByTestId('input')
    expect(input.attributes.getNamedItem('disabled')).to.be.null
  })

  it('displays possibilities that match', async () => {
    const sdk = stubSdk()
    const fixture = stubClientResp(loadFixture('person-query.json'))
    console.log(fixture)
    const client = stubClient({
      getEntries: sinon.stub()
        .onCall(0).returns(Promise.resolve(fixture))
        .returns(Promise.resolve(emptyResponse)),
    })

    // act
    const rendered = render(<CrossSpaceLinkEditor {...sdk as any} client={client} />)
    await wait(1) // wait for componentDidMount
    const input = rendered.getByTestId('input')
    fireEvent.input(input, {
      target: {
        value: 'meg',
      },
    })

    // assert
    const items = rendered.getAllByTestId('item')
    expect(items.map((el) => el.textContent))
      .to.deep.equal(['Megan'])
  })
})

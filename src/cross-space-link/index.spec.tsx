import {expect} from 'chai'
import {} from 'mocha'
import {h} from 'preact'
import {shallow} from 'preact-render-spy'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
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
    const rendered = shallow(<CrossSpaceLinkEditor {...sdk as any} client={client} />)

    // assert
    expect(rendered.find('.cf-form-input').exists()).to.be.true
    expect(rendered.find<any, any>('.cf-form-input').attr('disabled')).to.be.true
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
    const rendered = shallow(<CrossSpaceLinkEditor {...sdk as any} client={client} />)
    await wait(1) // wait for componentDidMount

    // assert
    expect(rendered.find('.cf-form-input').exists()).to.be.true
    expect(rendered.find<any, any>('.cf-form-input').attr('disabled')).to.be.false
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
    const rendered = shallow(<CrossSpaceLinkEditor {...sdk as any} client={client} />)
    await wait(1) // wait for componentDidMount
    rendered.find<any, any>('.cf-form-input').attr('onInput')({
      target: {
        value: 'meg',
      },
    })
    rendered.rerender()

    // assert
    expect(rendered.find('.possibilities').find('li').map((el) => el.text()))
      .to.deep.equal(['Megan'])
  })
})

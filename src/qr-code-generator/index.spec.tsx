import {expect} from 'chai'
import {} from 'mocha'
import {h} from 'preact'
import {shallow} from 'preact-render-spy'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import { debug, emptyResponse, loadFixture, stubClient, stubSdk } from '../lib/spec-helpers'
import {QRCodeGenerator} from './index'

// tslint:disable: no-unused-expression

describe('<QRCodeGenerator />', () => {

  it('renders form with disabled input when no field given', () => {
    const sdk = stubSdk()
    const client = stubClient()

    // act
    const rendered = shallow(<QRCodeGenerator {...sdk as any} client={client} />)

    // assert
    expect(rendered.find('.cf-form-input').exists()).to.be.true
    expect(rendered.find<any, any>('.cf-form-input').attr('disabled')).to.be.true
  })
})

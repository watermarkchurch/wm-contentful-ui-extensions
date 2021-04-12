import {render} from '@testing-library/preact'
import {expect} from 'chai'
import {} from 'mocha'
import {h} from 'preact'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import { debug, emptyResponse, loadFixture, stubClient, stubSdk } from '../lib/spec-helpers'
import {QRCodeGenerator} from './index'

// tslint:disable: no-unused-expression

describe('<QRCodeGenerator />', () => {

  it('renders form with enabled input', () => {
    const sdk = stubSdk()
    const client = stubClient()

    // act
    const rendered = render(<QRCodeGenerator {...sdk as any} client={client} />)

    // assert
    const input = rendered.getByTestId('input')
    expect(input.attributes.getNamedItem('disabled')).to.be.null
  })
})

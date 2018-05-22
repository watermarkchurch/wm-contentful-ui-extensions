import {expect} from 'chai'
import {} from 'mocha'
import {h} from 'preact'
import {render} from 'preact-render-spy'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
chai.use(sinonChai)

import { stubSdk } from '../lib/spec-helpers'
import { wait } from '../lib/utils'
import {SlugEditor} from './index'

// tslint:disable:no-unused-expression

describe('<SlugEditor />', () => {
  it('renders empty SlugForm when value empty', async () => {
    const sdk = stubSdk()

    // act
    const rendered = render(<SlugEditor {...sdk as any}/>)
    await wait(1) // wait for componentDidMount

    // assert
    const form = rendered.find<any, any>('SlugForm')
    expect(form.attrs().slug).to.not.exist
    expect(form.attrs().parentSlug).to.not.exist
  })

  it('renders with parent slug when exists', async () => {
    const sdk = stubSdk(null, {
      getEntries: sinon.stub().returns(
        Promise.resolve({ items: [{
          fields: { slug: { 'en-US' : '/parent-slug' } },
        }] }),
      ),
    })

    // act
    const rendered = render(<SlugEditor {...sdk as any}/>)
    await wait(1) // wait for componentDidMount

    // assert
    const form = rendered.find<any, any>('SlugForm')
    expect(form.attrs().slug).to.not.exist
    expect(form.attrs().parentSlug).to.equal('/parent-slug')
  })

  it('passes value along when given', async () => {
    const sdk = stubSdk({
      getValue: sinon.stub().returns('/parent-slug/child-slug'),
    },
    {
      getEntries: sinon.stub().returns(
        Promise.resolve({ items: [{
          fields: { slug: { 'en-US' : '/parent-slug' } },
        }] }),
      ),
    })

    // act
    const rendered = render(<SlugEditor {...sdk as any}/>)
    await wait(1) // wait for componentDidMount

    // assert
    const form = rendered.find<any, any>('SlugForm')
    expect(form.attrs().slug).to.equal('child-slug')
    expect(form.attrs().parentSlug).to.equal('/parent-slug')
  })

  it('sets full slug path when child slug changes', async () => {
    const setValue = sinon.spy()
    const sdk = stubSdk({
      getValue: sinon.stub().returns('/parent-slug/child-slug'),
      setValue,
    },
    {
      getEntries: sinon.stub().returns(
        Promise.resolve({ items: [{
          fields: { slug: { 'en-US' : '/parent-slug' } },
        }] }),
      ),
    })

    const rendered = render(<SlugEditor {...sdk as any}/>)
    await wait(1)

    // act
    const form = rendered.find<any, any>('SlugForm')
    form.attrs().onChange({
      oldValue: 'child-slug',
      newValue: 'new-slug',
    })
    await wait(1)

    // assert
    expect(setValue).to.have.been.calledWith('/parent-slug/new-slug')
  })
})

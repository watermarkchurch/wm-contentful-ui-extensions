import {expect} from 'chai'
import {} from 'mocha'
import {h} from 'preact'
import {shallow} from 'preact-render-spy'

import {SlugForm} from './slug-form'

// tslint:disable:no-unused-expression

describe('<SlugForm />', () => {

  it('renders parent slug', () => {

    const rendered = shallow(<SlugForm
      parentSlug={'parent'}
      slug={'test'}
      />)

    // assert
    const parent = rendered.find('#parent')
    expect(parent.text()).to.equal('parent/')
  })

  it('renders slug as editable', () => {

    const rendered = shallow(<SlugForm
      parentSlug={'parent'}
      slug={'test'}
      />)

    // assert
    const slug = rendered.find<any, any>('#slug')
    expect(slug.text()).to.equal('test')
    expect(slug.attrs().contentEditable).to.be.true
  })

  it('calls onChange on blur', () => {
    const events = [] as any[]
    const rendered = shallow(<SlugForm
      parentSlug={'parent'}
      slug={'test'}
      onChange={(evt) => events.push(evt)}
      />)

    // act
    rendered.find('#slug').simulate('blur', {
      target: { textContent: 'newValue' },
    })

    // assert
    expect(events).to.have.length(1)
    expect(events[0]).to.deep.equal({
      oldValue: 'test',
      newValue: 'newValue',
    })
  })
})

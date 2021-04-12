import {fireEvent, render} from '@testing-library/preact'
import {expect} from 'chai'
import {} from 'mocha'
import {h} from 'preact'

import {SlugForm} from './slug-form'

// tslint:disable:no-unused-expression

describe('<SlugForm />', () => {

  it('renders parent slug', () => {

    const rendered = render(<SlugForm
      parentSlug={'parent'}
      slug={'test'}
      />)

    // assert
    const parent = rendered.getByTestId('parent')
    expect(parent.textContent).to.equal('parent/')
  })

  it('renders slug as editable', () => {

    const rendered = render(<SlugForm
      parentSlug={'parent'}
      slug={'test'}
      />)

    // assert
    const slug = rendered.getByTestId('slug')
    expect(slug.textContent).to.equal('test')
    expect(slug.attributes.getNamedItem('contentEditable').value).to.equal('true')
  })

  it('calls onChange on blur', () => {
    const events = [] as any[]
    const rendered = render(<SlugForm
      parentSlug={'parent'}
      slug={'test'}
      onChange={(evt) => events.push(evt)}
      />)

    // act
    const slug = rendered.getByTestId('slug')
    fireEvent.blur(slug, {
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

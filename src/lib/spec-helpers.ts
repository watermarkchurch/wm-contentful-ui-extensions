import { ContentfulClientApi } from 'contentful'
import { EntryAPI, FieldAPI, FieldExtensionSDK, SpaceAPI } from 'contentful-ui-extensions-sdk'
import * as Path from 'path'
import { FindWrapper, RenderContext } from 'preact-render-spy'
import {render as renderToString} from 'preact-render-to-string'
import * as sinon from 'sinon'

const fakeSdk = {
  field: {
    getValue: sinon.stub().returns(null),
    onValueChanged: sinon.stub(),
    setInvalid: sinon.stub(),
    setValue: sinon.stub().returns(Promise.resolve()),
  },
  space: {
    getEntries: sinon.stub().returns(Promise.resolve({ items: [] })),
  },
  entry: {
    getSys: sinon.stub().returns({ id: 'test' }),
    fields: {},
  },
}

export function stubSdk(
    field?: Partial<FieldAPI>,
    space?: Partial<SpaceAPI>,
    entry?: Partial<EntryAPI>,
  ): FieldExtensionSDK {
  const fake = {
    field: Object.assign({}, fakeSdk.field, field),
    space: Object.assign({}, fakeSdk.space, space),
    entry: Object.assign({}, fakeSdk.entry, entry),
  }
  return fake as any as FieldExtensionSDK
}

export function stubClient(stubs?: Partial<ContentfulClientApi>): ContentfulClientApi {
  const stub: Partial<ContentfulClientApi> = {
    getEntries: sinon.stub().returns(Promise.resolve(emptyResponse)),
    ...stubs,
  }

  return stub as unknown as ContentfulClientApi
}

export const emptyResponse = stubClientResp({
  sys: {
    type: 'Array',
  },
  total: 0,
  skip: 0,
  limit: 100,
  items: [],
})

export function stubClientResp(resp: any) {
  return {
    ...resp,
    toPlainObject: () => resp,
  }
}

export function debug(rendered: RenderContext<any, any> | FindWrapper<any, any>): string {
  return renderToString(rendered.output(), null, { pretty: true, shallow: false, xml: false })
}

export function loadFixture(name: string): any {
  const f = require(`./fixtures/${name}`)
  // deep dup it so tests don't mess with other tests' fixtures
  return JSON.parse(JSON.stringify(f))
}

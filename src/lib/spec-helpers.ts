import { EntryAPI, FieldAPI, FieldExtensionSDK, SpaceAPI } from 'contentful-ui-extensions-sdk'
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

import { IContentfulExtensionSdk, ICurrentField, IEntry, ISpace } from 'contentful-ui-extensions-sdk'
import * as sinon from 'sinon'

const fakeSdk = {
  field: {
    getValue: sinon.stub().returns(null),
    onValueChanged: sinon.stub(),
  },
  space: {
    getEntries: sinon.stub().returns(Promise.resolve({ items: [] })),
  },
  entry: {
    getSys: sinon.stub().returns({ id: 'test' }),
  },
}

export function stubSdk(
    field?: Partial<ICurrentField>,
    space?: Partial<ISpace>,
    entry?: Partial<IEntry>,
  ): IContentfulExtensionSdk {
  const fake = {
    field: Object.assign({}, fakeSdk.field, field),
    space: Object.assign({}, fakeSdk.space, space),
    entry: Object.assign({}, fakeSdk.entry, entry),
  }
  return fake as any as IContentfulExtensionSdk
}

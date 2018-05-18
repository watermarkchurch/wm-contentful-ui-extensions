// polyfills
// tslint:disable:no-namespace
declare global {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith
  // tslint:disable-next-line:interface-name
  interface String {
    startsWith(search: string, pos?: number): boolean
  }
}

if (!String.prototype.startsWith) {
  // tslint:disable-next-line:only-arrow-functions
  String.prototype.startsWith = function(search, pos) {
    return this.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search
  }
}

export default {}

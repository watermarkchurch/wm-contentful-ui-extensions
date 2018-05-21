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
  String.prototype.startsWith = function(search: string, pos: number) {
    return this.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search
  }
}

export function wait(ms: number): Promise<void> {
  return new Promise<void>((resolve, reject) =>
    setTimeout(() => resolve(), ms),
  )
}

export function pathJoin(...pathArr: string[]) {
  return pathArr.join('/').replace(/\/{2,}/, '/')
}

export function basename(path: string): string {
  const pathParts = path.split('/')
  return pathParts[pathParts.length - 1]
}

export function trimStart(toTrim: string, valueToRemove: string): string {
  while (toTrim.startsWith(valueToRemove)) {
    toTrim = toTrim.substring(valueToRemove.length)
  }
  return toTrim
}

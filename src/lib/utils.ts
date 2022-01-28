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
  if (!toTrim || !valueToRemove) {
    return toTrim
  }
  while (toTrim.startsWith(valueToRemove)) {
    toTrim = toTrim.substring(valueToRemove.length)
  }
  return toTrim
}

export function injectScript(src: string, integrity: string) {
  const s = document.createElement('script')
  s.type = 'text/javascript'
  s.integrity = integrity
  s.crossOrigin = 'anonymous'
  s.src = src
  $('head').append(s)
}

export function injectCss(href: string, integrity: string) {
  const s = document.createElement('link')
  s.rel = 'stylesheet'
  s.href = href
  s.integrity = integrity
  s.crossOrigin = 'anonymous'
  // Use any selector
  $('head').append(s)
}

export function injectBootstrap() {
  injectCss('https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css',
    'sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T')
  injectScript('https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js',
    'sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1')
  injectScript('https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js',
    'sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM')
}

// https://davidwalsh.name/javascript-debounce-function
// tslint:disable
export function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number,
    immediate?: boolean,
): (...args: Parameters<T>) => void {
  let timeout: any
  return function() {
    let context = this, args = arguments
    let later = function() {
      timeout = null
      if (!immediate) { func.apply(context, args) }
    }
    let callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) { func.apply(context, args) }
  }
};
// tslint:enable

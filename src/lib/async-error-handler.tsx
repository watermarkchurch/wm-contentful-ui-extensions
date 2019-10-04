// tslint:disable:max-classes-per-file

interface IErrorHandlingComponent {
  state: {
    error?: Error,
    wait?: boolean,
  },
  setState(newState: Partial<{ error: Error, wait: boolean}>): any,
}

interface IErrorHandlingOptions {
  propagate?: boolean
  preventDefault?: boolean
}

type AsyncMethod = (...args: any[]) => Promise<any>

/**
 * Wraps an async handler function in an error handler, which manages the "wait" and
 * "error" properties on the given component's state.
 * @param component The component whose state to set when an error occurs
 * @param fn The async error handling function to bind
 */
export function withErrorHandling<F extends AsyncMethod>(
  component: IErrorHandlingComponent,
  fn: F,
  options?: IErrorHandlingOptions,
) {
  return new AsyncErrorHandler(component).wrap(component, fn, options)
}

/**
 * Wraps async functions to handle thrown errors and forward them to the given
 * ErrorHandlingComponent
 */
export class AsyncErrorHandler {
  constructor(private target: IErrorHandlingComponent) {
    this.setTarget = this.setTarget.bind(this)
  }

  /**
   * Returns an error handling wrapper function which forwards any errors to the target
   * component
   * The returned wrapper function will log any async errors from the source component
   * and then set the state on the target component.
   * @param source The component whose function should be wrapped
   * @returns A wrapped version of that function
   */
  public wrap<F extends AsyncMethod>(
      source: any,
      fn: F,
      options?: IErrorHandlingOptions,
    ): F {

    options = Object.assign({
      propagate: false,
      preventDefault: true,
    }, options)

    const self = this

    return (async (...args) => {
      const evt = (args[0] && typeof args[0] == 'object' && 'preventDefault' in args[0]) ? args[0] : null
      if (options.preventDefault && evt) {
        evt.preventDefault()
      }
      if (evt && 'persist' in evt) {
        // https://reactjs.org/docs/events.html#event-pooling
        evt.persist()
      }

      setState({ error: null, wait: true })

      try {
        const result = await fn.apply(source, args)
        setState({ error: null, wait: false })
        return result

      } catch (exception) {
        // for some reason the shopify client throws an array of errors.
        const errors = Array.isArray(exception) ? exception : [exception]
        let ex: Error | string
        for (ex of errors) {
          console.error(ex)
        }
        if (typeof ex == 'string') {
          ex = new Error(ex)
        }

        setState({ error: ex, wait: false })

        if (options.propagate) {
          throw ex
        }
      }

      function setState(state: IErrorHandlingComponent['state']) {
        if (self.target) { self.target.setState(state) }
        if (source && source !== self.target) {
          source.setState(state)
        }
      }
    }) as F
  }

  /**
   * Sets the top-level target to a new element.
   * Useful in a ref:
   *
   * @example
   * ```
   *   public render() {
   *     return <div>
   *       <MyErrorHandler ref={this.errorHandler.setTarget} />
   *       <OtherAsyncComponent errorHandler={this.errorHandler} />
   * ```
   */
  public setTarget(element: IErrorHandlingComponent) {
    this.target = element
  }
}

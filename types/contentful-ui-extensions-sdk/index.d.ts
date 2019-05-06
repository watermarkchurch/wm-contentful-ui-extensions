declare module 'contentful-ui-extensions-sdk' {
  interface EntryFieldAPI {
    [locale: string]: any
  }

  interface SpaceAPI {
    sys: Sys
  }

  interface EntryAPI {
    sys: Sys
  }

  interface Sys {
    id: string
  }
}

declare module 'contentful-ui-extensions-sdk' {

  /*
  * The main entry point for all extension-related code.
  * Call this to get started.
  */
  export function init(cb: (extension: IContentfulExtensionSdk) => void): void

  type FieldType = 'Symbol' | 'Text' | 'Integer' | 'Number' | 'Date' | 'Boolean' | 'Object' | 'Location' | 'Array' | 'Link'
  type LinkMimetype = 'attachment' | 'plaintext' | 'image' | 'audio' | 'video' | 'richtext' | 
    'presentation' | 'spreadsheet' | 'pdfdocument' | 'archive' | 'code' | 'markup'
  type LinkType = 'Space' | 'Environment' | 'Asset' | 'Entry'

  export interface IField {
    id: string,
    locales: string[],

    /** Gets the current value of the field and locale. */
    getValue(locale?: string): any
    setValue(value: any, locale?: string): Promise<void>
    removeValue(locale?: string): Promise<void>
    onValueChanged(locale: string | null, cb: (newValue: any) => void): () => void
    onIsDisabledChanged(locale: string | null, cb: () => void): () => void
  }

  export interface ILink<T extends string> {
    sys: {
      type: "Link",
      linkType: T,
      id: string
    }
  }

  export interface ICurrentField {
    /** The ID of a field is defined in an entry's content type.  */
    id: string,
    /** The current locale of a field the extension is attached to. */
    locale: string,
    /** Holds the type of the field the extension is attached to. The field type can be one of those described in our api documentation. */
    type: FieldType,
    /** A list of validations for this field that are defined in the content type. The content type documentation provides more information on the shape of validations. */
    validations: IValidation[]


    /** Gets the current value of the field and locale. */
    getValue(): any
    /**
     * Sets the value for the field and locale. The promise is resolved when the change has been acknowledged. The type of the value must match the expected field type. For example, if the extension is attached to a "Symbol" field you must pass a string.
     */
    setValue(newValue: any): Promise<void>
    /** Removes the value for the field and locale. A subsequent call to getValue() for the field would yield undefined. */
    removeValue(value: any): Promise<void>
    /** Communicates to the Contentful web application if the field is in a valid state or not. This impacts the styling applied to the field container. */
    setInvalid(flag: boolean): void
    /** 
     * Calls the callback every time the value of the field is changed by an external event (e.g. when multiple editors are working on the same entry) or when setValue() is called.
     * The method returns a function you can call to stop listening to changes.
     * */
    onValueChanged(cb: (newValue: any) => void): () => void
    /**
     * Calls the callback when the disabled status of the field changes. A boolean indicating whether the field is disabled or not is passed to the callback.
     * The method returns a function that you can call to stop listening to changes.
     */
    onIsDisabledChanged(cb: () => void): () => void

    /**
     * Calls the callback immediately with the current validation errors and whenever the field is re-validated. The callback receives an array of error objects. An empty array indicates no errors.
     * 
     * The errors are updated when the app validates an entry. This happens when loading an entry or when the user tries to publish it.
     * 
     * The method returns a function that you can call to stop listening to changes.
     */
    onSchemaErrorsChanged(cb: (schemaErrors: any[]) => void): () => void
  }

  export interface IEntry {
    /**
     * In addition to extension.field, a extension can also control the values of all other fields in the current entry. Fields are referenced by their ID.
     * The Field API methods provide a similar interface to extension.field. The methods also accept an optional locale to change the value for a specific locale. It defaults to the space the space's default locale (see extension.locales). Providing an unknown locale throws an exception.
     */
    fields: {
      [name: string]: IField
    }

    /** Returns metadata for an entry. The value coincides with the sys value of an entry returned by the v0.8.x of the Contentful Management API. */
    getSys(): IEntrySys

    /**Calls the callback with metadata every time that metadata changes. You can call the returned function to stop listening to changes. */
    onSysChanged(cb: (newSys: IEntrySys) => void): () => void
  }

  export interface IEntrySys {
    space: ILink<'Space'>,
    id: string,
    type: "Entry",
    createdAt: string,
    environment?: ILink<'Environment'>,
    createdBy: ILink<'User'>,
    publishedCounter: number,
    publishedBy: ILink<'User'>,
    publishedVersion: number,
    firstPublishedAt: string,
    publishedAt: string,
    contentType: ILink<'ContentType'>,
    updatedAt: string,
    version: number
  }

  export interface IFieldDefinition {
    id: string,
    name: string,
    type: FieldType,
    localized: boolean,
    required: boolean,
    validations: IValidation[],
    disabled: boolean,
    omitted: boolean
  }

  export interface IContentfulExtensionSdk {
    /** This object holds information about the current user and roles. */
    user?: IUser,
    /** A space can have multiple locales and each localized entry field can have different values for different locales. Locales are identified by their locale code, e.g. "en_US". */
    locales: {
      /** A list of all locales available in the current space. */
      available: string[],
      /** The default locale for the current space. */
      default: string
    },
    /**
     * This API gives you access to the value and metadata of the field the extension is attached to.
     * If you use localization, a extension instance will be rendered for each locale. This means you can only change the value for the given locale. See the entry.fields API for how to change values for different locales.
     */
    field: ICurrentField,
    /** This object allows you to read and update the value of any field of the current entry and to get the entry's metadata. */
    entry: IEntry,
    space: ISpace,
    /** 
     * The window object provides methods to update the size of the iframe the extension is contained within. This prevents scrollbars inside the extension.
     * 
     * To prevent a flickering scrollbar during height updates, it is recommended to set the extension's body to overflow: hidden;. 
     * */
    window: IWindow,
    /**
     * This API gives you access to data about the content type and the entry. It has the form as described under "content type properties" in our api documentation.
     */
    contentType: {
      name: string,
      sys: {
        space: ILink<'Space'>,
        id: string,
        type: 'ContentType',
        createdAt: string,
        updatedAt: string,
        revision: number
      },
      description: string,
      displayField: string,
      fields: IFieldDefinition[]
    },
    /**
     * This object provides methods for opening UI dialogs:
     */
    dialogs?: IDialogs
  }

  // TODO: fill out more of the response types
  export interface ISpace { 
    getContentType(id: string): Promise<any>,
    getContentTypes(): Promise<any>,
    createContentType(data: any): Promise<any>,
    updateContentType(data: any): Promise<any>,
    deleteContentType(data: any): Promise<any>,


    getEntry(id: string): Promise<IApiEntry>,
    getEntries(query: any): Promise<IQueryResult<IApiEntry>>,
    /** The content type is expected in data.sys.contentType */
    createEntry(data: any): Promise<IApiEntry>,
    updateEntry(data: any): Promise<IApiEntry>,
    publishEntry(data: any): Promise<any>,
    unpublishEntry(data: any): Promise<any>,
    archiveEntry(data: any): Promise<any>,
    unarchiveEntry(data: any): Promise<any>,
    deleteEntry(data: any): Promise<any>,
    getPublishedEntries(query: any): Promise<any>,

    getAsset(id: string): Promise<any>,
    getAssets(query: any): Promise<any>,
    createAsset(data: any): Promise<any>,
    updateAsset(data: any): Promise<any>,
    publishAsset(data: any): Promise<any>,
    unpublishAsset(data: any): Promise<any>,
    archiveAsset(data: any): Promise<any>,
    unarchiveAsset(data: any): Promise<any>,
    deleteAsset(data: any): Promise<any>,
    getPublishedAssets(query: any): Promise<any>,
    processAsset(asset: any, locale: string): Promise<any>
  } 

  /**
   * The spaceMembership and roles objects have include a subset of the data from 
   * the corresponding resources in the Contentful Management API. You can find 
   * more information in the CMA Reference Documentation.
   */
  export interface IUser {
    sys: { 
      id: string
    },
    firstName: string,
    lastName: string,
    email: string,
    spaceMembership: {
      sys: { id: string }
      admin: false,
      roles: {
        name: string,
        description: string,
      }[]
    }
  }

  export interface IWindow {
    /** Listens for DOM changes and calls updateHeight() when the size changes. */
    startAutoResizer(): void,
    /** Stops resizing the iframe automatically. */
    stopAutoResizer(): void,

    /** Sets the iframe height to the given value in pixels. height must be an integer. */
    updateHeight(height: number): void
    /** Calculates the body's scrollHeight and sets the containers height to this value. */
    updateHeight(): void
  }

  export interface IDialogs {
    /**
     * Opens a dialog for selecting a single entry. It returns a promise resolved with the selected entity or null if a user closes the dialog without selecting anything.
     * @param options is an optional object configuring the dialog.
     */
    selectSingleEntry(options?: {
      /** The code of a locale you want to use to display proper titles and descriptions. Defaults to the space's default locale. */
      locale?: string,
      /** An array of content type IDs of entries that you want to display in the selector. By default entries of all content types are displayed. */
      contentTypes?: string[]
    }): Promise<IEntry | null>

    /**
     * Works similarly to selectSingleEntry, but allows to select multiple entries and the returned promise is resolved with an array of selected entries.
     * Both locale and contentTypes options can be used. There are two additional options:
     * min and max - numeric values specifying an inclusive range in which the number of selected entities must be contained
     */
    selectMultipleEntries(options?: {
      /** The code of a locale you want to use to display proper titles and descriptions. Defaults to the space's default locale. */
      locale?: string,
      /** An array of content type IDs of entries that you want to display in the selector. By default entries of all content types are displayed. */
      contentTypes?: string[],
      min?: number,
      max?: number
    }): Promise<IEntry[] | null>

    selectSingleAsset(options?: {
      /** The code of a locale you want to use to display proper titles and descriptions. Defaults to the space's default locale. */
      locale?: string
    }): Promise<any | null>

    selectMultipleAssets(options?: {
      /** The code of a locale you want to use to display proper titles and descriptions. Defaults to the space's default locale. */
      locale?: string,
      min?: number,
      max?: number
    }): Promise<any | null>
  }


  export interface IValidation {
    /** Takes an array of content type ids and validates that the link points to an entry of that content type. */
    linkContentType?: string[],
    /** Takes an array of values and validates that the field value is in this array. */
    in?: string[],
    /** Takes a MIME type group name and validates that the link points to an asset of this group. */
    linkMimetypeGroup?: LinkMimetype[],
    /** Takes min and/or max parameters and validates the size of the array (number of objects in it). */
    size?: { max?: number, min?: number },
    /** Takes min and/or max parameters and validates the range of a value. */
    range?: { max?: number, min?: number},
    /** Takes a string that reflects a JS regex and flags, validates against a string. See JS reference for the parameters. */
    regexp?: { pattern: string, flags?: string },
    /** Validates that there are no other entries that have the same field value at the time of publication. */
    unique?: true,
    /** Validates that a value falls within a certain range of dates. */
    dateRange?: { min?: string, max?: string },
    /** Validates that an image asset is of a certain image dimension. */
    assetImageDimensions?: { width: { min?: number, max?: number }, height: { min?: number, max?: number } }
    /** Validates that an asset is of a certain file size. */
    assetFileSize?: { max?: number, min?: number },

    message?: string

    /** Other validations */
    [validation: string]: any
  }

  export interface IQueryResult<T> {
    sys: {
      type: "Array"
    },
    total: number,
    skip: number,
    limit: number,
    items: T[]
  }

  export interface IApiEntry {
    sys: IEntrySys,

    fields: {
      [name: string]: {
        [locale: string]: any
      }
    }
  }
}
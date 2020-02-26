## Cross-Space Link

![Demo gif](../../readmedoc/cross-space-link.gif)

Connects a text field in one space with the ID of an entry in another space.

When a link is made:
```json
{
  "sys": {
    ...
  },
  "fields": {
    ...
    "author": "3YeoXy26d2uuWGKOGSCGQC",
```

When a link fails:
```json
{
  "sys": {
    ...
  },
  "fields": {
    ...
    "author": "Arbitrary Text",
```

### Installation:
Create a new Field extension with this self-hosted URL:  
https://watermarkchurch.github.io/wm-contentful-ui-extensions/latest/cross-space-link.html

Or specify an explicit version with the version string like  
https://watermarkchurch.github.io/wm-contentful-ui-extensions/0.5/cross-space-link.html

Check "Symbol" as the field type

Assign it as the view on your cross-space link field.

### Parameters:

* #### space
    The contentful Space ID to link to
* #### accessToken
    A Contentful CDN access token for that other space
* #### contentType
    The content type of entries to link to in that other space
* #### display
    A field name like `title` or an ES6 template string used for the selection list
* #### value
    A field name like `id` or an ES6 template string that puts the actual value in the Symbol field.
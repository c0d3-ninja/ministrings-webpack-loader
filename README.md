### Usage
In your Webpack configuration, add the loader to your module rules. For example:
```javascript
module.exports = {
  //...
  module: {
    rules: [
      {
          test:/\.minifiableConstants.js$/i,
        use: [
          {
            loader: 'minify-constants-loader',
          },
        ],
      },
    ],
  },
};
```

### Loader Functionality

- Parses JavaScript files into an AST using `@babel/parser`.
- Traverses the AST to identify and replace string values with shorter, generated IDs.
- Optimizes code by reducing the size of string constants.

### API

#### `generateRandomId(value)`
Generates a smaller identifier for a given string value, reducing file size.

- **Parameters**: `value` (string) - The original string value.
- **Returns**: (string) - A shorter identifier or the original value if not beneficial to replace.

#### `putValueInNode(valueNode)`
Replaces the string value of a node in the AST with a generated ID.

- **Parameters**: `valueNode` (Node) - A node in the AST.
- **Returns**: None. The function modifies the `valueNode` directly.

### Example
The loader will transform a source file like this:
```javascript
const MESSAGE = "LONG_CONSTANT_VALUE";
```

Into:
```javascript
const MESSAGE = "1";
```

### Compatibility
- Compatible with Webpack 4 and 5.
- Requires Babel as a peer dependency.

### Support
For bugs and feature requests, please open an issue on the [GitHub repository](https://github.com/c0d3-ninja/ministrings-webpack-loader).

### License
This project is licensed under the MIT License.

graph-to-polyline
=================
Given a planar embedding of a graph, convert it into a collection of oriented cycles (polylines).

# Example

```javascript
var getCycles = require("graph-to-polyline")
```

# Install

```
npm install graph-to-polyline
```

# API

#### `require("graph-to-polyline")(edges, positions)`
Splits a graph into a collection of oriented loops

* `cells` are the cells of complex
* `numVertices` is the number of vertices in the complex

**Returns** An object with two properties:

* `open` are the open loops (paths) in the cell complex
* `closed` are the closed loops (cycles) in the cell complex

# Credits
(c) 2014 Mikola Lysenko. MIT License
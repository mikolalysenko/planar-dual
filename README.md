planar-dual
===========
Given a planar embedding of a graph, find all faces.

# Example

```javascript
var getFaces = require("planar-dual")
```

# Install

```
npm install planar-dual
```

# API

#### `require("planar")(edges, positions)`
Splits an embedded planar graph into a collection of faces

* `edges` are the edges of the graph
* `positions` are the locations of the vertices of the graph

**Returns** A list of faces of the graph represented as ordered lists of vertices

# Credits
(c) 2014 Mikola Lysenko. MIT License
"use strict"

var tape = require("tape")
var getLoops = require("../loops")

var cells = [
  [0, 1],
  [1, 2],
  [2, 1],
  [1, 3],
  [3, 4],
  [4, 5],
  [5, 6]
]

console.log(getLoops(cells))
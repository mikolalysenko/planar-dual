"use strict"

module.exports = getLoops

var compareAngle = require("compare-angle")

function getLoops(cells, positions) {

  var numVertices = positions.length|0
  var numEdges = cells.length
  var adj = [new Array(numVertices), new Array(numVertices)]
  for(var i=0; i<numVertices; ++i) {
    adj[0][i] = []
    adj[1][i] = []
  }
  for(var i=0; i<numEdges; ++i) {
    var c = cells[i]
    adj[0][c[0]].push(c)
    adj[1][c[1]].push(c)
  }

  var cycles = []

  //Remove a half edge
  function cut(c, i) {
    var a = adj[i][c[i]]
    a.splice(a.indexOf(c), 1)
  }

  //Find next vertex and cut edge
  function next(a, b, dir) {
    //Get neighborhood
    var nbhd = adj[dir][b]
    if(nbhd.length === 0) {
      //This should never happen
      return b
    }
    var nextCell = nbhd[0]
    var nextVertex = nextCell[dir^1]
    for(var k=1; k<nbhd.length; ++k) {
      var e = nbhd[k]
      var p = e[dir^1]
      if(compareAngle(
          positions[a], 
          positions[b], 
          positions[nextVertex],
          positions[p]) > 0) {
        nextCell = e
        nextVertex = p
      }
    }
    //Cut and return
    cut(nextCell, dir)
    return nextVertex
  }

  function extractCycle(v, dir) {
    var e0 = adj[dir][v]
    var cycle = []


    if(nbhd.length % 2 === 0) {
      dir ^= 1
      nbhd = adj[dir][b]
    }
  }

  for(var i=0; i<numVertices; ++i) {
    for(var j=0; j<2; ++j) {
      while(adj[j][i].length > 0) {
        extractCycle(i, j)
      }
    }
  }

  //Combine paths and loops together
  return cycles
}
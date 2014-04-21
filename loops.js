"use strict"

module.exports = planarDual

var compareAngle = require("compare-angle")

function planarDual(cells, positions) {

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

  //Add isolated vertices as trivial case
  for(var i=0; i<numVertices; ++i) {
    if(adj[0][i].length + adj[1][i].length === 0) {
      cycles.push( [i] )
    }
  }

  //Remove a half edge
  function cut(c, i) {
    var a = adj[i][c[i]]
    a.splice(a.indexOf(c), 1)
  }

  //Find next vertex and cut edge
  function next(a, b) {
    var nextCell, nextVertex, nextDir
    for(var i=0; i<2; ++i) {
      if(adj[i][b].length > 0) {
        nextCell = adj[i][b][0]
        nextDir = i
        break
      }
    }
    nextVertex = nextCell[nextDir^1]

    for(var dir=0; dir<2; ++dir) {
      var nbhd = adj[dir][b]
      for(var k=0; k<nbhd.length; ++k) {
        var e = nbhd[k]
        var p = e[dir^1]
        var cmp = compareAngle(
            positions[a], 
            positions[b], 
            positions[nextVertex],
            positions[p])
        if(cmp > 0) {
          nextCell = e
          nextVertex = p
          nextDir = dir
        }
      }
    }
    if(nextCell) {
      cut(nextCell, nextDir)
    }
    return nextVertex
  }

  function extractCycle(v, dir) {
    var e0 = adj[dir][v][0]
    var cycle = [v]
    cut(e0, dir)
    var u = e0[dir^1]
    var d0 = dir
    while(u !== v) {
      cycle.push(u)
      //If we hit a dead end, flip direction and walk back
      if(adj[dir][u].length === 0) {
        dir = dir^1
      }
      u = next(cycle[cycle.length-2], u, dir)
    }
    return cycle
  }

  for(var i=0; i<numVertices; ++i) {
    for(var j=0; j<2; ++j) {
      var pcycle = []
      while(adj[j][i].length > 0) {
        var ni = adj[0][i].length
        var ncycle = extractCycle(i,j)
        if(ncycle[1] === ncycle[ncycle.length-1]) {
          //Glue together trivial cycles
          pcycle.push.apply(pcycle, ncycle)
        } else {
          if(pcycle.length > 0) {
            cycles.push(pcycle)
          }
          pcycle = ncycle
        }
      }
      if(pcycle.length > 0) {
        cycles.push(pcycle)
      }
    }
  }

  //Combine paths and loops together
  return cycles
}
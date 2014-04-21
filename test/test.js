"use strict"

var tape = require("tape")
var getFaces = require("../loops")
var dup = require("dup")

tape("planar-dual", function(t) {


  function canonicalizeCycle(cycle) {
    var lo = 0
    for(var i=0; i<cycle.length; ++i) {
      if(cycle[i] < cycle[lo]) {
        lo = i
      }
    }
    return cycle.slice(lo).concat(cycle.slice(0, lo))
  }

  function compareCycles(a, b) {
    var ca = a.map(canonicalizeCycle)
    var cb = b.map(canonicalizeCycle)
    ca.sort()
    cb.sort()
    t.same(ca, cb)
  }

  function makeCircle(n) {
    return {
      edges: dup(n).map(function(a,i) {
        return [i, (i+1)%n]
      }),
      positions: dup(n).map(function(a,i) {
        var t = 2.0*Math.PI*i/n
        return [Math.cos(t), Math.sin(t)]
      })
    }
  }
  var circ = makeCircle(10)
  compareCycles(getFaces(circ.edges, circ.positions), [
      [0,1,2,3,4,5,6,7,8,9],
      [9,8,7,6,5,4,3,2,1,0]
    ])

  compareCycles(getFaces([ [0, 1] ], [ [0, 0], [1, 0] ]), [ [0, 1] ])


  //Two circles
  var c1 = makeCircle(5)
  var c2 = makeCircle(5)
  for(var i=0; i<5; ++i) {
    c1.positions[i][0] -= 2
    c2.positions[i][0] += 2
    for(var j=0; j<2; ++j) {
      c1.edges[i][j] += 1
      c2.edges[i][j] += 6
    }
  }
  var nedges = [ [0,1], [0,6] ].concat(c1.edges).concat(c2.edges)
  var npositions = [ [0,0] ].concat(c1.positions).concat(c2.positions)
  compareCycles(getFaces(nedges, npositions), 
    [ [ 0, 1, 2, 3, 4, 5, 1, 0, 6, 10, 9, 8, 7, 6 ],
      [ 1, 5, 4, 3, 2 ],
      [ 6, 7, 8, 9, 10 ] ])

  //Tri force!
  var tpositions = [
    [0, 0],
    [-1, -1],
    [0, 1],
    [1, -1]
  ]
  var tedges = [
    [1, 2],
    [2, 3],
    [3, 1],
    [0, 1],
    [0, 2],
    [0, 3]
  ]
  compareCycles(getFaces(tedges, tpositions), [ [ 0, 1, 2 ], [ 0, 2, 3 ], [ 0, 3, 1 ], [ 1, 3, 2 ] ])
  
  //Single vertex
  compareCycles(getFaces([], [[0,0]]), [ [0] ])


  t.end()
})
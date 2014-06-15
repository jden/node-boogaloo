#!/usr/bin/env node
var path = require('path')
var boogaloo = require('../.')
var fs = require('fs')

var src = process.argv[2] || process.cwd()

boogaloo(src, function (err, value) {
  if (err) { return console.error(err) }
  var dest = path.join(src,'./show.html')
  fs.writeFileSync(dest, value)
  console.log('wrote ' + dest)
})

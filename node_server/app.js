var express = require('express');
var path = require('path');
var fs = require('fs');
var minimist = require('minimist');

var argv = minimist(process.argv.slice(2), {
  string: ['port'],
  alias: {'p' : 'port'},
  default: { 'port': 8080 }
  });
var port = parseInt(argv.port);
var logBase = '.';
if (argv._.length == 1) {
  logBase = argv._[0];
}

var app = express();

app.set('view engine', 'ejs');
app.use('/js', express.static(path.join(__dirname, 'js')));

app.get(/^\/viewer\/(.*)$/, function(req, res, next) {
  var p = decodeURIComponent(req.params[0]);
  var fname = path.join(logBase, p);
  if (fname.length > 1 && fname[fname.length - 1] === '/')
    fname = fname.substr(0, fname.length - 1);
  fs.stat(fname, function(err, stats) {
    if (err !== null) {
      res.status(404).send('Can\'t ' + req.method + ' ' + req.params.path);
      return;
    }
    if (stats.isDirectory()) {
      console.log('directory ' + fname);
      fs.readdir(fname, function(err, files) {
        if (err !== null) {
          res.status(404).send('Can\'t readdir ' + req.params.path);
          return;
        }
        var f = ''
        for (var i = 0; i < files.length; i++) {
          var newp = path.join(p, files[i]);
          var stats1 = fs.statSync(path.join(logBase, newp));
          if (stats1.isDirectory()) {newp += '/'; files[i] += '/'}
          f += '<li> <a href="/viewer/' + encodeURIComponent(newp) + '">' + files[i] + '</a>\n';
        }
        res.render("directory", { files : f, path : p });
      });
    }
    else {
      console.log('file ' + fname);
      fs.readFile(fname, function(err, buf) {
        if (err !== null) {
          res.status(404).send('Can\'t open ' + req.params.path);
          return;
        }
        res.render("curling_viewer", {log : buf.toString() });
      });
    }
  });
});

app.get('/', function(req, res) {
  res.redirect(302, '/viewer/');
  });
app.get('/viewer', function(req, res) {
  res.redirect(302, '/viewer/');
  });


var server = app.listen(port, function(){
    console.log("Node.js is listening to PORT:" + server.address().port);
});

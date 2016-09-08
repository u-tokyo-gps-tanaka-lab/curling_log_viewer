var m2pRate = 59;
var end = 1;
var stone = 0;
var records = [];
var first = '';
var second = '';
var scores = [[], []];
var shots = [];
var realShots = [];
var fillColors = ['rgb(255, 0, 0)', 'rgb(255, 255, 0)'];
var drawColors = ['rgb(255, 128, 128)', 'rgb(200, 200, 0)'];
var firstPlayers = [];

function ltltlt() {
  rn = 0;
  draw();
}

function ltlt() {
  if ((rn % 17) == 0) {
    rn = Math.max(0, rn - 17);
  }
  else {
    rn -= (rn % 17);
  }
  draw();
}

function lt() {
  rn = Math.max(0, rn - 1);
  draw();
}

function gt() {
  rn = Math.min(records.length - 1, rn + 1);
  draw();
}

function gtgt() {
  if ((rn % 17) == 16) {
    rn = Math.min(records.length - 1, rn + 17);
  }
  else {
    rn = rn - (rn % 17) + 16;
  }
  draw();
}

function gtgtgt() {
  rn = records.length - 1;
  draw();
}

function Point(x, y) {
  this.x = x;
  this.y = y;
}

/**
 * Converts this Point to a String
 * @return {String} converted string.
 */
Point.prototype.toString = function() {
  return '(' + this.x.toString() + ',' + this.y.toString() + ')';
};

/**
 * Calculates the euculid distance (length) of this Point
 * @return {Float} the length of a Point.
 */
Point.prototype.abs = function() {
  return Math.sqrt(this.x * this.x + this.y * this.y);
};

/**
 * Calculates the Normal vector (length = 1.0) of this point
 * @return {Point} normal vector
 */
Point.prototype.normalize = function() {
  var l = this.abs();
  return new Point(this.x / l, this.y / l);
};

/**
 * Rotates this Point by theta (radian) and make a new Point
 * @param {Float} theta : angle in radian
 * @return {Float} new Point rotated by theta
 * Do not modify the original Point
 */
Point.prototype.rotate = function(theta) {
  var newX = this.x * cos(theta) + this.y * sin(theta);
  var newY = this.x * sin(theta) - this.y * cos(theta);
  return new Point(newX, newY);
};

/**
 * complex multiply this * p
 * @param {Point} p : another point
 * @return {Point} : new Point this * p
 * be careful. The coordinate system used in this simulator is not the same
 * as coordinate system used in mathematics.
 * (A + Bi) (C + Di) = (AC - BD) + (AD + BC)i
 * (A - Bi) (C - Di) = (AC - BD) - (AD + BC)i
 */
Point.prototype.compMul = function(p) {
  return new Point(this.x * p.x - this.y * p.y, this.x * p.y + this.y * p.x);
};

/**
 * complex multiply this * t
 * @param {Point} t : scalar value
 * @return {Point} : new Point this * t
 */
Point.prototype.scalarMul = function(t) {
  return new Point(this.x * t, this.y * t);
};

/**
 * complex add this + p
 * @param {Point} p : another point
 * @return {Point} : new Point this + p
 * (A - Bi) + (C - Di) = (A + C) - (B + D)i
 */

Point.prototype.add = function(p) {
  return new Point(this.x + p.x, this.y + p.y);
};

/**
 * complex sub this + p
 * @param {Point} p : another point
 * @return {Point} : new Point this - p
 * (A - Bi) - (C - Di) = (A - C) - (B - D)i
 */

Point.prototype.sub = function(p) {
  return new Point(this.x - p.x, this.y - p.y);
};


function Stone(col, point) {
  this.col = col;
  this.point = point;
}

function Shot(point, rot) {
  this.point = point;
  this.rot = rot;
}

/**
 * Converts this Shot to a String.
 * @return {String} converted string
 */
Shot.prototype.toString = function() {
  return '(' + this.point.toString() + ', ' + this.rot.toString() + ')';
};

function m2p(meter) {
  return Math.floor(m2pRate * meter);
}

function setScoreBoard() {
  var table = document.getElementById('scoreboard');
  var rs = table.rows;
  rs.item(0).cells.item(1).firstChild.nodeValue = first;
  rs.item(2).cells.item(1).firstChild.nodeValue = second;
  for (var p = 0; p < 2; p++) {
    for (var i = 0; i < 13; i++) {
      rs.item(p * 2).cells.item(i + 2).firstChild.nodeValue =
        scores[p][i].toString();
    }
  }
}

function setRecord() {
  rn = 0;
  var body = document.getElementById('log').innerHTML;
  var lines = body.split('\r\n');
  if (lines.length == 1) {
    lines = body.split('\n');
    if (lines.length == 1) {
      lines = body.split('\r');
    }
  }
  scores = [[], []];
  for (var p = 0; p < 2; p++) {
    for (var i = 0; i < 13; i++) {
      scores[p].push(0);
    }
  }
  records = [];
  var readEnds = 1;
  var firstPlayer = 0;
  for (var i = 0; i < lines.length; i++) {
    var cols = lines[i].split(' ');
    if (cols[0] === 'POSITION=POSITION') {
      stones = [];
      for (var j = 1; j < cols.length - 1; j += 2) {
        var m1 = parseFloat(cols[j]), m2 = parseFloat(cols[j + 1]);
        if (m1 != 0.0 || m2 != 0.0) {
          var color = ((j - 1) / 2) % 2;
          if (firstPlayer == 1) {
            color = 1 - color;
          }
          stones.push(new Stone(color, new Point(m1, m2)));
        }
      }
      records.push(stones);
    }
    else if (cols[0].substr(0, 6) === 'First=') {
      first = cols[0].substr(6);
    }
    else if (cols[0].substr(0, 7) === 'Second=') {
      second = cols[0].substr(7);
    }
    else if (cols[0] === 'SCORE=SCORE') {
      firstPlayers.push(firstPlayer);
      var s = parseInt(cols[1]);
      if (s > 0) {
        scores[0][readEnds - 1] = s;
        scores[1][readEnds - 1] = 0;
        firstPlayer = 0;
      }
      else {
        scores[0][readEnds - 1] = 0;
        scores[1][readEnds - 1] = -s;
        if (s < 0) {
          firstPlayer = 1;
        }
      }
      readEnds++;
    }
    else if (cols[0] === 'TOTALSCORE=TOTALSCORE') {
      scores[0][12] = parseInt(cols[1]);
      scores[1][12] = parseInt(cols[2]);
    }
    else if (cols[0] == 'BESTSHOT=BESTSHOT') {
      shots.push(new Shot(new Point(parseFloat(cols[1]), parseFloat(cols[2])),
                          parseInt(cols[3])));
    }
    else if (cols[0] == 'RUNSHOT=RUNSHOT') {
      var p = new Point(parseFloat(cols[1]), parseFloat(cols[2]));
      realShots.push(new Shot(p, parseInt(cols[3])));
      //          alert(lines[i]);
    }
  }
  setScoreBoard();
  end = 1;
  stone = 0;
}

function hline(ctx, y) {
  ctx.beginPath();
  ctx.moveTo(0, m2p(y));
  ctx.lineTo(ctx.width, m2p(y));
  ctx.stroke();
}

function vline(ctx, x) {
  ctx.beginPath();
  var ix = Math.min(ctx.width - 1, m2p(x));
  ctx.moveTo(ix, 0);
  ctx.lineTo(ix, ctx.height);
  ctx.stroke();
}

function drawCircle(ctx, point, r, color) {
  ctx.beginPath();
  ctx.lineWidth = 2.0;
  ctx.strokeStyle = color;
  ctx.arc(m2p(point.x), m2p(point.y), m2p(r), 0, 2 * Math.PI, false);
  ctx.stroke();
}

function scircle(ctx, point, r, color) {
  ctx.beginPath();
  ctx.lineWidth = 1.0;
  ctx.strokeStyle = 'rgb(0, 0, 0)';
  ctx.fillStyle = color;
  ctx.arc(m2p(point.x), m2p(point.y), m2p(r), 0, 2 * Math.PI, false);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(m2p(point.x), m2p(point.y), m2p(r), 0, 2 * Math.PI, false);
  ctx.stroke();
}

function drawStone(ctx, stone) {
  var color = drawColors[stone.col];
  drawCircle(ctx, stone.point, 0.145, color);
}

function fillStone(ctx, stone) {
  var color = fillColors[stone.col];
  scircle(ctx, stone.point, 0.145, color);
}

function shotToPoints(shot) {
  var vp = shot.point;
  var v = vp.abs();
  var a = 0.001386965639075;
  var b = 0.041588442394742;
  var tanphi = a / b;
  var dx = a * v * v;
  var rot = shot.rot;
  if (rot > 0) { // left rotation
    dx = -dx;
  }
  var dy = b * v * v;
  //  alert(vp.normalize().toString() + p.toString());
  var points = [];
  var sp = new Point(2.375, 41.28);
  var ep = sp.add(vp.normalize().compMul(new Point(dy, dx)));
  var diff = sp.sub(ep);
  points.push(ep);
  for (var i = 1; i <= 100; i++) {
    var t = i / 100.0;
    var theta1 = Math.log(t) * tanphi;
    if (rot > 0) {
      theta1 = -theta1;
    }
    var dp = new Point(Math.cos(theta1), -Math.sin(theta1));
    var p = diff.scalarMul(t).compMul(dp);
    points.push(ep.add(p));
  }
  return points;
}

function drawLine(ctx, p0, p1, color) {
  ctx.beginPath();
  ctx.lineWidth = 2.0;
  ctx.strokeStyle = color;
  ctx.moveTo(m2p(p0.x), m2p(p0.y));
  ctx.lineTo(m2p(p1.x), m2p(p1.y));
  ctx.stroke();
}

function drawTrack(ctx, shot, color) {
  var points = shotToPoints(shot);
  console.log(JSON.stringify(points));
  for (var i = 0; i < points.length - 1; i++) {
    drawLine(ctx, points[i], points[i + 1], color);
  }
}

function drawTracks(ctx, shot, realShot, player) {
  drawTrack(ctx, shot, drawColors[player]);
  drawTrack(ctx, realShot, fillColors[player]);
}

function ccircle(ctx, r, color) {
  scircle(ctx, new Point(2.375, 4.88), r, color);
}

function getEnd(rn) {
  return Math.floor(rn / 17) + 1;
}

function getStone(rn) {
  return Math.floor(rn % 17);
}

function updateEndScore() {
  document.getElementById('end').firstChild.nodeValue = String(getEnd(rn));
  document.getElementById('stone').firstChild.nodeValue = String(getStone(rn));
}

function draw() {
  var canvas = document.getElementById('canvas_soko');
  var ctx = canvas.getContext('2d');
  var player = getStone(rn) % 2;
  if (firstPlayers[getEnd(rn) - 1] == 1) {
    player = 1 - player;
  }
  ctx.width = m2p(4.75);
  ctx.height = m2p(11.28);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(ctx.width, 0);
  ctx.lineTo(ctx.width, ctx.height);
  ctx.lineTo(0, ctx.height);
  ctx.closePath();
  ctx.clip();
  ctx.strokeStyle = 'rgb(0, 0, 0)';
  ctx.clearRect(0, 0, ctx.width, ctx.height);
  // draw a rectanble
  hline(ctx, 0);
  vline(ctx, 0);
  vline(ctx, 4.75);
  // draw circles
  ccircle(ctx, 1.83, 'rgb(0, 0, 255)');
  ccircle(ctx, 1.22, 'rgb(255, 255, 255)');
  ccircle(ctx, 0.61, 'rgb(255, 0, 0)');
  ccircle(ctx, 0.1525, 'rgb(255, 255, 255)');
  hline(ctx, 4.88 - 1.83);
  hline(ctx, 4.88);
  hline(ctx, 11.28);
  // center line
  ctx.beginPath();
  var ix = Math.min(ctx.width - 1, m2p(2.375));
  ctx.moveTo(ix, m2p(1.22));
  ctx.lineTo(ix, ctx.height);
  ctx.stroke();
  if (getStone(rn) != 16) {
    var sn = (getEnd(rn) - 1) * 16 + getStone(rn);
    drawTracks(ctx, shots[sn], realShots[sn], player);
    var restStones = 16 - getStone(rn);
    var redStones = Math.floor(restStones / 2);
    var yellowStones = restStones - redStones;
    for (var i = 0; i < redStones; i++) {
      var point = new Point((i * 0.8 + 0.8) * 0.3048, 0.20);
      scircle(ctx, point, 0.075, fillColors[0]);
    }
    for (var i = 0; i < yellowStones; i++) {
      var point = new Point((16 - i * 0.8 - 1.2) * 0.3048, 0.20);
      scircle(ctx, point, 0.075, fillColors[1]);
    }
  }
  if (getStone(rn) != 0) {
    for (var i = 0; i < records[rn - 1].length; i++) {
      drawStone(ctx, records[rn - 1][i]);
    }
  }
  for (var i = 0; i < records[rn].length; i++) {
    fillStone(ctx, records[rn][i]);
  }
  updateEndScore(ctx);
}

function onload() {
  setRecord();
  draw();
}

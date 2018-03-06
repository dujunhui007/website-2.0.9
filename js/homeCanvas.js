var canvas = document.getElementById("canvas"), cW, cH;
cW = canvas.width = window.innerWidth;
cH = canvas.height = window.innerHeight;

var ctx = canvas.getContext("2d");
var t = 1;
var canvasArr11 = [{x: cW / 10, y: 0}, {x: (cW / 10) * 6, y: cH}];
var canvasArr12 = [{x: (cW / 10) * 9, y: 0}, {x: (cW / 10) * 4, y: cH}];
var canvasArr21 = [{x: 0, y: (cH / 10) * (8.5)}, {x: (cW / 10) * 4, y: 0}];
var canvasArr22 = [{x: cW, y: (cH / 10) * (8.5)}, {x: (cW / 10) * 6, y: 0}];
var canvasArr31 = [{x: cW / 10, y: cH}, {x: cW / 2, y: (cH / 10) * (1.5)}];
var canvasArr32 = [{x: (cW / 10) * 9, y: cH}, {x: cW / 2, y: (cH / 10) * (1.5)}];
var canvasArr41 = [{x: (cW / 10) * (2.5), y: 0}, {x: (cW / 10) * 5, y: cH / 2}];
var canvasArr51 = [{x: (cW / 10) * (2.5), y: 0}, {x: (cW / 10) * 5, y: cH / 2}];
var canvasArr42 = [{x: (cW / 10) * (7.5), y: 0}, {x: (cW / 10) * 5, y: cH / 2}];
var canvasArr52 = [{x: (cW / 10) * (7.5), y: 0}, {x: (cW / 10) * 5, y: cH / 2}];
var clw1 = 1;
var clw2 = 2;

var cColor = "#98bae5";
ctx.lineCap = "round";

function canvasLine(t, cArr, clw, cColor) {
  ctx.lineWidth = clw;
  // ctx.strokeStyle = cColor;
  var points = calcWaypoints(cArr);
  animate(points);

  function calcWaypoints(cArr) {
    var waypoints = [];
    for (var i = 1; i < cArr.length; i++) {
      var pt0 = cArr[i - 1];
      var pt1 = cArr[i];
      var dx = pt1.x - pt0.x;
      var dy = pt1.y - pt0.y;
      for (var j = 0; j <= 100; j++) {
        var x = pt0.x + dx * j / 100;
        var y = pt0.y + dy * j / 100;
        waypoints.push({
          x: x,
          y: y
        });
      }
    }
    return (waypoints);
  }

  function animate() {
    if (t < points.length - 1) {
      requestAnimationFrame(animate);
    }
    // draw a line segment from the last waypoint
    // to the current waypoint

    var grad = ctx.createLinearGradient(points[t - 1].x, points[t - 1].y, points[t].x, points[t].y);
    grad.addColorStop(0.1, 'rgba(107,159,237,0.4)');
    grad.addColorStop(0.8, 'rgba(107,159,237,0.4)');
    ctx.strokeStyle = grad;
    ctx.beginPath();
    ctx.moveTo(points[t - 1].x, points[t - 1].y);
    ctx.lineTo(points[t].x, points[t].y);
    ctx.closePath();
    ctx.stroke();
    // increment "t" to get the next waypoint
    t++;
  }
}

setTimeout(function () {
  canvasLine(t, canvasArr11, clw1, cColor);
  canvasLine(t, canvasArr12, clw1, cColor);
}, 0);

setTimeout(function () {
  canvasLine(t, canvasArr21, clw1, cColor);
  canvasLine(t, canvasArr22, clw1, cColor);
}, 400);


setTimeout(function () {
  canvasLine(t, canvasArr31, clw1, cColor);
  canvasLine(t, canvasArr32, clw1, cColor);
}, 600);

setTimeout(function () {
  canvasLine(t, canvasArr41, clw1, cColor);
  canvasLine(t, canvasArr42, clw1, cColor);
}, 750);

setTimeout(function () {
  canvasLine(t, canvasArr51, clw2, cColor);
  canvasLine(t, canvasArr52, clw2, cColor);
}, 900);
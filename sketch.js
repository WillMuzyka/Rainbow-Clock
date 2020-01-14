var tSize = 200;
var pos = [];
var font;
var vehicles = [];
var vehicles2 = [];
var pts = [];
var pts2 = [];
var tempT;
var maxRandomForce = 40;

function preload() {
    font = loadFont('AvenirNextLTPro-Demi.ttf');
}

function setup() {
    createCanvas(850, 300);
    textSize(tSize);
    colorMode(HSB);
    strokeWeight(4);
    var t = getTime();
    tempT = t;
    for (var n = 0; n < 3; n++) {
        pos[n] = createVector(((1 - n) * 1.4 * tSize), 0);
        createPoints(n, t[n], 0);
        createPoints(n, t[n], 1);
        vehicles[n] = [];
        vehicles[n + 3] = [];
    }
    for (var n = 0; n < 6; n++) {
        for (var i = 0; i < pts[n].length; i++) {
            var pt = pts[n][i];
            var v = new Vehicle(pt.x, pt.y);
            vehicles[n].push(v);
        }
    }
    createTwoPoints();
    for (var n = 0; n < 2; n++) {
        for (var i = 0; i < pts2[n].length; i++) {
            var pt = pts2[n][i];
            var v = new Vehicle(pt.x, pt.y);
            vehicles2.push(v);
        }
    }
		slider = createSlider(320, 620, 580);
    slider.style('width', '100px')
    slider.position(width / 2 - 50, height-50);
}

function draw() {
    var t = getTime();
		var colorNum=slider.value()%360;
    if (tempT[0] != t[0]) {
        updateTime(t);
    }
    tempT = [];
    tempT = t;
    background(0);
    translate(width / 2, height / 2);


    //frameShow();
    for (var i = 0; i < vehicles2.length; i++) {
        vehicles2[i].show(colorNum);
        vehicles2[i].update();
        vehicles2[i].applyBehaviors(mouseX - width / 2, mouseY - height / 2);
    }
    for (var n = 0; n < 6; n++) {
        for (var i = 0; i < vehicles[n].length; i++) {
            vehicles[n][i].show(colorNum);
            vehicles[n][i].applyBehaviors(mouseX - width / 2, mouseY - height / 2);
            vehicles[n][i].update();
        }
    }
}

function frameShow() {
    var f = frameRate();
    push();
    textSize(8);
    strokeWeight(1);
    fill(220, 255, 255)
    text(floor(frameRate()), -400, -100);
    pop();
}

function updateTime(t_) {
    var t = t_;
    pts = [];
    for (var n = 0; n < 3; n++) {
        createPoints(n, t[n], 0);
        createPoints(n, t[n], 1);
    }

    for (var o = 0; o < 6; o++) {
        var sizeV = pts[o].length - vehicles[o].length;
        if (sizeV < 0) {
            vehicles[o].splice(pts[o].length - 1, -sizeV);
            for (var q = 0; q < vehicles[o].length; q++) {
                var fo = p5.Vector.random2D();
                fo.mult(random(maxRandomForce));
                vehicles[o][q].applyForce(fo);
            }
        } else if (sizeV > 0) {
            for (p = 0; p < sizeV; p++) {
                var vRef = vehicles[o][p].clone();
                vehicles[o].push(vRef);
            }
            for (var q = 0; q < vehicles[o].length; q++) {
                var fo = p5.Vector.random2D();
                fo.mult(random(maxRandomForce));
                vehicles[o][q].applyForce(fo);
            }
        }
        sizeV = pts[o].length - vehicles[o].length;
    }

    for (var o = 0; o < 6; o++) {
        for (var q = pts[o].length - 1; q >= 0; q--) {
            var pt = pts[o][q];
            vehicles[o][q].target.x = pt.x;
            vehicles[o][q].target.y = pt.y;
        }
    }
}

function getTime() {
    var sec = second();
    var min = minute();
    var hou = hour();
    var timeIs = [sec, min, hou];
    return (timeIs);
}

function createPoints(un, val, choice) {
    var time = val;
    var uni = time % 10;
    if (choice === 0) {
        var newPointsU = (font.textToPoints(str(uni), (pos[un].x + 0.3 * tSize - 70), pos[un].y + 50));
        pts.push(newPointsU);
    } else if (choice === 1) {
        var dez = (time - uni) / 10;
        var newPointsD = (font.textToPoints(str(dez), (pos[un].x - 0.3 * tSize - 70), pos[un].y + 50));
        pts.push(newPointsD);
    }
}

function createTwoPoints() {
    var v1 = (font.textToPoints(':', (pos[1].x + 0.3 * tSize + 40), pos[1].y + 30));
    var v2 = (font.textToPoints(':', (pos[1].x - 0.3 * tSize - 120), pos[1].y + 30));
    pts2.push(v1);
    pts2.push(v2);
}

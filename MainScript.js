

var ballArray = [];


var lines = [];

var worldWidth = 1000;
var worldHeight = 1000;

var cam;

var mousegrab = true;

var editorMode = false;
var cameraTrack = true;
var cameradist;

function setup() {
    createCanvas(windowWidth, windowHeight);

    cam = new Camera();


    for (var a = 0; a < 1; a++) {
        ballArray.push(new Ball());
    }



    var pointsA = [
        createVector(47, 38),
        createVector(237, 98),
        createVector(311, 47),
        createVector(481, 47),
        createVector(472, 191),
        createVector(483, 391),
        createVector(420, 377),
        createVector(264, 282),
        createVector(250, 282),
        createVector(240, 300),
        createVector(20, 300)
    ];

    for (var a = 0; a < pointsA.length - 1; a++) {
        lines.push(new Line(pointsA[a], pointsA[a + 1]));
    }

    lines.push(new Line(pointsA[0], pointsA[pointsA.length - 1]));


    lines.push(new Line(createVector(0, 0), createVector(worldWidth, 0)));
    lines.push(new Line(createVector(0, worldHeight), createVector(worldWidth, worldHeight)));
    lines.push(new Line(createVector(0, 0), createVector(0, worldHeight)));
    lines.push(new Line(createVector(worldWidth, 0), createVector(worldWidth, worldHeight)));

}


function draw() {
    background(51);

    // translate(windowWidth / 2 , windowHeight / 2);

    fill(160, 255, 160);
    rect(0, 0, worldWidth, worldHeight);

    if (cameraTrack) {
        cam.reset();
        cam.translate(ballArray[0].pos.x, ballArray[0].pos.y);
    }

    /// Don't Draw anything above this ///



    mousegrab = false;
    for (var a = 0; a < lines.length; a++) {
        lines[a].update();
        lines[a].render();

        if (editorMode) {
            lines[a].linemove();
        }

        if (mouseIsPressed) {
            if (lines[a].p1H == true) {
                lines[a].p1 = createVector(cam.mouseX, cam.mouseY);
            } else if (lines[a].p2H == true) {
                lines[a].p2 = createVector(cam.mouseX, cam.mouseY);
            }
        }

        if (keyIsDown(46)) {
            if (lines[a].p1H == true || lines[a].p2H == true) {
                lines.splice(a, 1)
            }
        }



        //     if (mouseIsPressed) {
        // if (this.p1H) {
        //     this.p1 = createVector(cam.mouseX, cam.mouseY);
        // } else if (this.p2H) {
        //     this.p2 = createVector(cam.mouseX, cam.mouseY);
        // }

    }



    // for (var a = 0; a < ballArray.length; a++) {
    //     ballArray[a].update();
    //     ballArray[a].render();
    // }

    ballArray[0].update();

    let mousepos = createVector(cam.pmouseX, cam.pmouseY);
    let ballpos = createVector(ballArray[0].pos.x, ballArray[0].pos.y);
    let veladd = createVector(0, 0);
    let vectorfromball = createVector(ballpos.x - mousepos.x, ballpos.y - mousepos.y);

    stroke(255, 0, 0);
    strokeWeight(5);
    line(ballpos.x, ballpos.y, vectorfromball.x + ballpos.x, vectorfromball.y + ballpos.y);

    ballArray[0].render();




    if (newline == false) {
        push();
        stroke(0, 0, 255);
        strokeWeight(5);
        line(linestart.x, linestart.y, cam.mouseX, cam.mouseY);
        pop();
    }

    if (keyIsDown(46)) {
        newline = true
    }


    // cam.translate(ballArray[1].pos.x, ballArray[1].pos.y);

    // cameraX = ballArray[1].pos.x;
    // cameraY = ballArray[1].pos.y;

    push();
    stroke(0);
    strokeWeight(5);
    point(0, 0);

    if (cam.mouseX) {

        strokeWeight(5);
        point(cam.mouseX, cam.mouseY);

        stroke(0, 255, 0);
        point(cam.pmouseX, cam.pmouseY);
    }

    if (editorMode) {
        stroke(0, 0, 255);
        point(cameraX, cameraY);
    }

    pop();



    push();
    fill(0);
    stroke(0);
    strokeWeight(2);
    textSize(25);

    var xc = cameraX;
    var yc = cameraY;

    let fps = frameRate();
    textSize(20);
    text("fps = " + Math.round(fps), xc - (windowWidth / 2) + 50, yc + (windowHeight / 2) - 50);
    pop();

    cameraWASDmove();

}


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

////////////////////////////////////////////////////////////////////////////////

var newline = true;
var linestart;
var lineend;
function mousePressed() {
    if (editorMode) {
        // if (mouseButton === LEFT) {
        //     ellipse(50, 50, 50, 50);
        // }

        // if (mouseButton === RIGHT) {
        //     rect(25, 25, 50, 50);
        // }

        if (mouseButton === LEFT) {
            if (!mousegrab) {

                if (newline) {
                    linestart = createVector(cam.mouseX, cam.mouseY);
                    newline = false;
                } else {
                    lineend = createVector(cam.mouseX, cam.mouseY);

                    lines.push(new Line(linestart, lineend));

                    newline = true;
                }
            }
        }
    }

    if (!editorMode) {
        let mousepos = createVector(cam.pmouseX, cam.pmouseY);
        let ballpos = createVector(ballArray[0].pos.x, ballArray[0].pos.y);
        let veladd = createVector(0, 0);
        let vectorfromball = createVector(ballpos.x - mousepos.x, ballpos.y - mousepos.y);

        stroke(255, 0, 0);
        strokeWeight(5);
        line(ballpos.x, ballpos.y, vectorfromball.x + ballpos.x, vectorfromball.y + ballpos.y);

        veladd = createVector(vectorfromball.x, vectorfromball.y);
        veladd.mult(0.05);

        ballArray[0].applyForce(veladd);

    }

}

function mouseWheel(e) {
    if (editorMode) {
        var factor = Math.pow(1.001, -e.delta);
        cam.scale(factor, mouseX, mouseY);
    }
}

function mouseDragged() {
    if (editorMode) {
        if (mouseButton === CENTER) {
            var dx = cam.mouseX - cam.pmouseX;
            var dy = cam.mouseY - cam.pmouseY;

            cam.translate(-dx, -dy);
        }
    }
}

function cameraWASDmove() {
    if (keyIsDown(65)) { // LEFT_ARROW
        cam.mouseX = cam.mouseX - 10;
        cam.translate(-10, 0);
    }

    if (keyIsDown(68)) { // RIGHT_ARROW
        cam.mouseX = cam.mouseX + 10;
        cam.translate(10, 0);
    }

    if (keyIsDown(87)) { // UP_ARROW
        cam.mouseY = cam.mouseY - 10;
        cam.translate(0, -10);
    }

    if (keyIsDown(83)) { // DOWN_ARROW
        cam.mouseY = cam.mouseY + 10;
        cam.translate(0, 10);
    }
}

function keyTyped() {
    switch (key) {
        case 'r':
            cam.reset();
            break;
        case '1':
            editorMode = false;
            cameraTrack = true;
            break;
        case '2':
            cameraTrack = false;
            editorMode = true;
            break;
    }
}


////////////////////////////////////////////////////////////////////////////////

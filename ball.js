class Ball {
    constructor() {

        this.pos = createVector(200, 200);
        this.vel = createVector(random(4, 5) , random(-4, -9) );
        this.acc = createVector(0, 0);


        this.mass = 2;

        this.height = 10;
        this.width = 10;

        this.radius = 8;

        this.jumping = false;
        this.jumpTime = 0;
        this.canJumpAgain = true;

        this.col = {
            top: false,
            top_cell: 0,

            bottom: false,
            bottom_cell: 0,

            left: false,
            left_cell: 0,

            right: false,
            right_cell: 0
        };

        this.colided = false;
        // this.test = false;
        this.colidedtime = 0;
        this.colidedNumber = 0;
        this.colidedLine = -1;


    }

    update() {

        this.vel.add(this.acc);

        this.edge();


        var spos = this.vel;
        var spos = this.pos;

        // var endPos = spos.add(spos);

        var magtoFixed = Math.floor(this.vel.copy().mag().toFixed(0) * 2);
        // console.log(magtoFixed );
        var magVel = this.vel.copy();
        magVel = p5.Vector.div(magVel, magtoFixed);
        // magVel.div(magtoFixed);

        this.colided = false;
        this.colidedtime++;
        if (this.colidedtime > 10) {
            this.colidedLine = -1;
        }

        var newVel = this.vel;

        for (var i = 0; i < magtoFixed; i++) {
            // this.pos.add(svel.x / Math.abs(svel.x), svel.y / Math.abs(svel.y));

            if (this.colided) {
                break;
            }

            this.pos.add(magVel);

            for (var l = 0; l < lines.length; l++) {

                var lineA = lines[l];

                if (!(this.colidedLine == l) ) {

                    if (collideLineCircle(lineA.p1.x,lineA.p1.y, lineA.p2.x,lineA.p2.y, this.pos.x, this.pos.y, this.radius) ) {

                        var seg_v = p5.Vector.sub(lineA.p2, lineA.p1);

                        var seg_n = seg_v.copy().rotate(-HALF_PI);
                        seg_n.normalize();
                        // seg_n.mult(20);

                        var light_d = this.vel;

                        var dot = p5.Vector.dot(light_d, seg_n) * 2;

                        var r = p5.Vector.sub(light_d, seg_n.copy().mult(dot));

                        // this.vel = r;
                        newVel = r;

                        // console.log("colided");

                        this.colided = true;
                        this.colidedtime = 0;
                        this.colidedLine = l;
                        this.colidedNumber++;

                        break;


                    } else {
                        this.colided = false;
                    }
                }

            }



        }

        this.vel = newVel;
        this.acc.mult(0);

        this.vel.mult(0.991);

        // if (this.colided) {
        //     this.pos.add(this.vel);
        // }
    }

    edge() {
        if (this.pos.x > worldWidth + 100) {
            this.reset();
        }
        if (this.pos.x < -100) {
            this.reset();
        }
        if (this.pos.y < -100) {
            this.reset();
        }
        if (this.pos.y > worldHeight + 100) {
            this.reset();
        }

    }

    reset() {
        this.pos = createVector(100, 100);
    }

    render() {
        push();
        // noFill();
        // stroke(0, 255, 0);
        // point(this.pos.x, this.pos.y);
        //rectMode(CENTER);

        // noStroke();

        // if (false) {
        //     fill(0, 255, 0);
        // } else {
        //     fill(0, 153, 255);
        // }

        fill(255);
        stroke(200);
        strokeWeight(2);

        ellipse(this.pos.x, this.pos.y, this.radius * 2, this.radius * 2);

        // strokeWeight(1);
        // fill(0);
        // stroke(0);
        // text(this.colidedNumber + "  ", this.pos.x, this.pos.y - 30);

        // fill(0, 255, 0);
        // text("x " + this.pos.x + "  y " + this.pos.y, this.pos.x, this.pos.y - 30);

        // noFill();
        //ellipse(this.pos.x, this.pos.y, 500, 500);

        pop();
    }

    applyForce(force) {
        // let f = p5.Vector.div(force, this.mass);
        this.vel.add(force);
    }

}

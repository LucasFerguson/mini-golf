
class Line {
    constructor(point1, point2) {
        this.p1 = point1;
        this.p1H = false;
        this.p2 = point2;
        this.p2H = false;
    }

    render() {
        push();
        stroke(0);
        fill(0);
        strokeWeight(4);

        line(this.p1.x, this.p1.y, this.p2.x, this.p2.y);

        strokeWeight(10);
        stroke(255, 255, 255, 150);
        noFill();

        if (this.p1H) {
            ellipse(this.p1.x, this.p1.y, 10, 10);
        }
        if (this.p2H) {
            ellipse(this.p2.x, this.p2.y, 10, 10);
        }


        pop();
    }

    update() {

    }

    linemove() {
            if (!mouseIsPressed) {
                this.p1H = false;
                this.p2H = false;
            }

            let d1 = dist(this.p1.x, this.p1.y, cam.mouseX, cam.mouseY);

            if (d1 < 10) {
                this.p1H = true;
                mousegrab = true;
            }

            let d2 = dist(this.p2.x, this.p2.y, cam.mouseX, cam.mouseY);
            if (d2 < 10) {
                this.p2H = true;
                mousegrab = true;
            }
        

    }


}



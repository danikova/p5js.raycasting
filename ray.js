
class Ray{
    constructor(pos, angle){
        this.pos = pos;
        this.dir = p5.Vector.fromAngle(angle);
    }

    lookAt(x, y){
        this.dir.x = x - this.pos.x;
        this.dir.y = y - this.pos.y;
        this.dir.normalize(); 
    }

    show(){
        push();
        stroke(255);
        line(
            this.pos.x, 
            this.pos.y, 
            this.pos.x + this.dir.x * 20, 
            this.pos.y + this.dir.y * 20
        );
        pop();
    }

    cast(wall){
        var x1 = wall.a.x;
        var x2 = wall.b.x;
        var x3 = this.pos.x;
        var x4 = this.pos.x + this.dir.x;

        var y1 = wall.a.y;
        var y2 = wall.b.y;
        var y3 = this.pos.y;
        var y4 = this.pos.y + this.dir.y;

        var denominator = (x1-x2)*(y3-y4)-(y1-y2)*(x3-x4);
        if(denominator == 0){
            return;
        }

        var t = ((x1-x3)*(y3-y4)-(y1-y3)*(x3-x4)) / denominator;
        var u = -((x1-x2)*(y1-y3)-(y1-y2)*(x1-x3)) / denominator;
        if(0 < t && t < 1 && 0 < u){
            var intersection_x = x1 + t*(x2-x1);
            var intersection_y = y1 + t*(y2-y1);
            return createVector(intersection_x, intersection_y);
        }
        return;
    }
}
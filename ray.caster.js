
class RayCaster{
    constructor(x1, y1){
        this.pos = createVector(x1, y1);
        this.rays = [];

        for (let i = 0; i < 360; i+=1) {
            this.rays.push(
                new Ray(this.pos, radians(i))
            );
        }
    }

    update(x, y){
        this.pos.set(x, y);
    }

    cast(walls){
        this.rays.forEach(ray => {
            var closest_point = null;
            var min_dist = Infinity;
            walls.forEach(wall => {
                const act_point = ray.cast(wall);
                if(act_point){
                    const d = p5.Vector.sub(this.pos, act_point).magSq();
                    if(d < min_dist){
                        min_dist = d;
                        closest_point = act_point;
                    }
                }
            });
            if(closest_point){
                push();
                strokeWeight(5);
                stroke(255, 50);
                line(this.pos.x, this.pos.y, closest_point.x, closest_point.y);
                pop();
            }
        });
    }

    show(){
        ellipse(this.pos.x, this.pos.y, 20);
    }
}

class RayCaster{
    constructor(x1, y1){
        this.pos = createVector(x1, y1);
        this.rays = [];
        this.walls = [];
        this.dots = [];
    }

    update(x, y){
        this.pos.set(x, y);
    }

    collect_dots(walls){
        this.walls = walls;

        this.dots = [];
        this.walls.forEach(wall => {
            this._add_dot(wall.a);
            this._add_dot(wall.b);
        });

        this.rays = [];
        this.dots.forEach(dot => {
            this.rays.push(new Ray(this.pos, 0));
        });
    }

    _add_dot(pos){
        for (const dot of this.dots) {
            if(pos.equals(dot))
                return;
        }
        this.dots.push(pos);
    }

    castRays(){
        var ray_intersections = [];
        for (let i = 0; i < this.rays.length; i++) {
            this.rays[i].lookAt(this.dots[i]);
        }

        // beginShape();
        this.rays.forEach(dot => {
            console.log(dot.dir);
            // vertex(dot.x, dot.y);
        });
        // endShape(CLOSE);

        this.rays.sort(
            (ray1, ray2)=> this.pos.angleBetween(ray1.dir) < this.pos.angleBetween(ray2.dir)
        );

        for (const ray of this.rays) {
            var closest_point = ray.dir;
            var min_dist = Infinity;
            this.walls.forEach(wall => {
                const act_point = ray.cast(wall);
                if(act_point){
                    const d = p5.Vector.sub(this.pos, act_point).magSq();
                    if(d < min_dist){
                        min_dist = d;
                        closest_point = act_point;
                    }
                }
            });
            ray_intersections.push(closest_point);
        }

        beginShape();
        ray_intersections.forEach(dot => {
            vertex(dot.x, dot.y);
        });
        endShape(CLOSE);
    }

    show(){
        ellipse(this.pos.x, this.pos.y, 20);
        // this.rays.forEach(ray => {
        //     ray.show();
        // });
    }
}
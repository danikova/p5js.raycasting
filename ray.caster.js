
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
            this._add_unique_vector(this.dots, wall.a);
            this._add_unique_vector(this.dots, wall.b);
        });

        this.rays = [];
        this.dots.forEach(dot => {
            this.rays.push(new Ray(this.pos, 0));
        });
    }

    _add_unique_vector(list, pos){
        for (const dot of list) {
            if(pos.equals(dot))
                return false;
        }
        list.push(pos);
        return true;
    }

    castRays(){
        var ray_intersections = [];
        var angle_indexer = [];
        
        for (let i = 0; i < this.rays.length; i++) {
            this.rays[i].lookAt(this.dots[i]);
        }

        for (let i = 0; i< this.rays.length; i++) {
            var closest_point = this.dots[i];

            if(this._add_unique_vector(ray_intersections, closest_point))
                angle_indexer.push({
                    index: i, angle: p5.Vector.sub(this.pos, closest_point).heading() + PI
                });

            var min_dist = Infinity;
            this.walls.forEach(wall => {
                const act_point = this.rays[i].cast(wall);
                if(act_point){
                    const d = p5.Vector.sub(this.pos, act_point).magSq();
                    if(d < min_dist){
                        min_dist = d;
                        closest_point = act_point;
                    }
                }
            });
            if(this._add_unique_vector(ray_intersections, closest_point))
                angle_indexer.push({
                    index: i, angle: p5.Vector.sub(this.pos, closest_point).heading() + PI
                });
        }

        angle_indexer.sort(
            (obj1, obj2)=> obj1.angle - obj2.angle
        );

        console.table(angle_indexer);

        beginShape();
        let index = 0;
        angle_indexer.forEach(indexer => {
            line(this.pos.x, this.pos.y, ray_intersections[indexer.index].x, ray_intersections[indexer.index].y);
            console.log(ray_intersections[indexer.index], indexer.angle);
            textSize(40);
            text(index, ray_intersections[indexer.index].x - 20, ray_intersections[indexer.index].y + 20);
            index++;
            // vertex(ray_intersections[indexer.index].x, ray_intersections[indexer.index].y);
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
let WIDTH = 500;
let HEIGHT = 500;

let walls = [];
let caster = null;
function setup() {
    createCanvas(500 + 100, 500 + 100);
    frameRate(30);

    caster = new RayCaster(134, 325);

    walls.push(
        // additional internal walls
        new Wall(400, 100, 400, 400),

        // border walls
        new Wall(0, 0, WIDTH, 0),
        new Wall(0, 0, 0, HEIGHT),
        new Wall(WIDTH, HEIGHT, WIDTH, 0),
        new Wall(WIDTH, HEIGHT, 0, HEIGHT),
    );
    caster.collect_dots(walls);
}

function draw() {
    background(50);
    translate(50, 50);

    push();
    stroke(255);
    walls.forEach(wall => {
        wall.show();
    });
    pop();

    // caster.update(mouseX, mouseY);

    caster.show();
    caster.castRays();

    noLoop();
}

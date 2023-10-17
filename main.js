//Create galaxy instance
let game = new galaxy(1000, 600, "game");

//Create field
let fieldspr = new canvasentity(0, 0);

let fieldlabels = new container();

let field = new container();

let perf = new canvasentity(20, 20)

function createField() {
    let f = new canvasentity(1000, 600);

    let wx = 35
    let wy = 400

    let x = 0, y = 0;

    let c2 = "#008811"
    let c1 = "#00CC11"
    let g = "#00EE11"
    let lc = "#CCCCCC"
    let lw = 4

    f.sprite.ctx.fillStyle = g
    f.sprite.ctx.fillRect(x, y, 2*wx, wy)
    f.sprite.ctx.fillRect(x+(22*wx), y, 2*wx, wy)

    x = wx*2
    f.sprite.ctx.fillStyle = c1

    for(let i=0; i<5; i++) {
        f.sprite.ctx.fillRect(x, y, wx, wy)
        x+=wx*2
    }

    x = wx*3
    f.sprite.ctx.fillStyle = c2

    for(let i=0; i<5; i++) {
        f.sprite.ctx.fillRect(x, y, wx, wy)
        x+=wx*2
    }

    x=wx*12
    f.sprite.ctx.fillStyle = c2

    for(let i=0; i<5; i++) {
        f.sprite.ctx.fillRect(x, y, wx, wy)
        x+=wx*2
    }

    x = wx*13
    f.sprite.ctx.fillStyle = c1

    for(let i=0; i<5; i++) {
        f.sprite.ctx.fillRect(x, y, wx, wy)
        x+=wx*2
    }

    x = wx*2
    f.sprite.ctx.fillStyle = lc
    for(let i=0; i<21; i++) {
        f.sprite.ctx.fillRect(x-(lw/2), y, lw, wy)
        x+=wx
    }

    x = wx*2

    for(let i=0; i<20*5; i++) {
        f.sprite.ctx.fillRect(x-(lw/4), y, lw/2, 4)
        f.sprite.ctx.fillRect(x-(lw/4), 133, lw/2, 5)
        f.sprite.ctx.fillRect(x-(lw/4), 266, lw/2, 5)
        f.sprite.ctx.fillRect(x-(lw/4), 396, lw/2, 4)
        x+=wx/5
    }

    return f;
}

function createFLabels() {
    let f = new container();

    let tc = "#DDEE00"

    let sb = new text();
    sb.color = tc
    sb.txt = "SIDE B"
    sb.pos.x = 50;
    sb.pos.y = 260
    sb.rot = -90;

    let sa = new text();
    sa.color = tc
    sa.txt = "SIDE A"
    sa.pos.x = 792;
    sa.pos.y = 110;
    sa.rot = 90;

    let x = 122;
    let y = 0;
    let num = 10;
    for(let i=0; i<5; i++) {
        let tmp = new text();
        tmp.color = tc
        tmp.font = "30px monospace"
        tmp.txt = num.toString();
        tmp.pos.y = 45+y;
        tmp.pos.x = x
        f.addChild(tmp);
        num+=10;
        x+=70
    }

    num = 40;

    for(let i=0; i<4; i++) {
        let tmp = new text();
        tmp.color = tc
        tmp.font = "30px monospace"
        tmp.txt = num.toString();
        tmp.pos.y = 45+y;
        tmp.pos.x = x
        f.addChild(tmp);
        num-=10;
        x+=70
    }

    x = 157;
    y = 315;
    num = 10;
    for(let i=0; i<5; i++) {
        let tmp = new text();
        tmp.color = tc
        tmp.font = "30px monospace"
        tmp.txt = num.toString()
        tmp.rot = 180;
        tmp.pos.y = 45+y;
        tmp.pos.x = x
        f.addChild(tmp);
        num+=10;
        x+=70
    }

    num = 40;

    for(let i=0; i<4; i++) {
        let tmp = new text();
        tmp.color = tc
        tmp.font = "30px monospace"
        tmp.txt = num.toString();
        tmp.rot = 180;
        tmp.pos.y = 45+y;
        tmp.pos.x = x
        f.addChild(tmp);
        num-=10;
        x+=70
    }

    f.addChild(sa);
    f.addChild(sb);

    return f;
}

function moveset(set) {
    stepx = 4.375;
    stepy = 4.7619047619;

    if(set.yard == 10) { perf.pos.x = (stepx * 96) + (stepx * set.stepsy) - 5 }
    else if(set.side == 1) { perf.pos.x = 70 + (stepx * set.yard * 8) + (stepx * set.stepsy) - 5 }
    else if(set.side == 0) { perf.pos.x = 420 + (stepx * (10-set.yard) * 8) + (stepx * set.stepsy) - 5 }

    let y = 0;
    if(set.line == 0) { y = 0}
    else if(set.line == 1) { y = stepy * 28}
    else if(set.line == 2) { y = stepy * 56}
    else if(set.line == 3) { y = stepy * 84}

    y+=stepy*set.stepsl-4

    perf.pos.y = y;
}

//Async load function to load sprites and start galaxy
async function load() {
    fieldspr = createField();
    fieldlabels = createFLabels();
    fieldlabels.layer = 1;
    field.addChild(fieldspr);
    field.addChild(fieldlabels);
    field.pos.x = 80;
    field.pos.y = 100;

    perf = new canvasentity(10, 10)
    perf.sprite.ctx.fillStyle = "red";
    perf.sprite.ctx.beginPath();
    perf.sprite.ctx.arc(5, 5, 5, 0, 2 * Math.PI);
    perf.sprite.ctx.fill();
    perf.layer = 2

    field.addChild(perf)

    game.scene.addChild(field);

    moveset(cset)

    game.start();
}

load();
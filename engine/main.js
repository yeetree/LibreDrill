//Galaxy Engine

//Engine Class
class galaxy {
    //Reference to galaxygfx and galaxyinpit
    gfx = null;
    input = null;

    //Current scene (container)
    scene = null;

    //Refresh rate (FPS)
    fps = 60;
    _lastDraw = 0;
    _frameDiff = 0;

    //Frame count
    frames = 0;

    //isrunning
    running = false;

    //alreadystarted
    alreadystarted = false;

    //Init
    constructor(w, h, id) {
        this.gfx = new galaxygfx(w, h, id)
        this.input = new galaxyinput(this.gfx)
        this.scene = new container();
    }

    start = function() {
        this._frameDiff = Math.round((1000 / this.fps));
        this.running = true;
        if(!this.alreadystarted) {
            this.scene._start();
            this.alreadystarted = true;
        }
        requestAnimationFrame(this._loop.bind(this));
    }

    _loop = async function() {
        let now = Date.now();
        let diff = now - this._lastDraw;

        if (diff >= this._frameDiff) {
            this.scene._update();
            this.gfx.clear();
            this.scene._draw(this.gfx);
            this.frames+=1;
            this._lastDraw = now;
        }

        requestAnimationFrame(this._loop.bind(this));
    }
}

//Container Class
class container {
    //List of objects (children)
    objects = [];
    //Position and rotation
    pos = new v2();
    wpos = new v2();
    rot = 0;
    
    //Layer
    layer = 0;

    //Matrix (calculated on draw)
    _mat = Mat(0, 0, 1, 0);

    //Already initiated?
    _init = false;

    //Add a child to the container
    addChild = function(child) {
        //Add reference to array
        this.objects.push(child);
        //Sort by layer
        this.objects = this.objects.sort((a, b) => { if (a.layer > b.layer) { return 1 } return -1})
    }

    //Remove child from container
    removeChild = function(child) {
        //Remove Child
        this.objects = this.objects.filter((c) => { return c != child})
        //Sort by layer
        //this.objects = this.objects.sort((a, b) => { if (a.layer > b.layer) { return 1 } return -1})
    }

    //Draw
    _draw = function(gfx) {

        //Updates matrixes and pushes context position and applies matrix
        gfx.ctx.save();
        gfx.ctx.transform(...this._mat)

        let gt = gfx.ctx.getTransform();
        this.wpos.x = gt.e;
        this.wpos.y = gt.f;

        //Loop through children
        for(let i=0; i<this.objects.length; i++) {
            //Call draw function of entity
            let dr = this.objects[i]
            //Makes sure that the entity has had at least one update frame before drawing
            if(dr._init) { dr._draw(gfx); }
        }

        //pops context position
        gfx.ctx.restore();
    }

    //Update
    _update = function() {
        //If not initiated, initiate! Allows for drawing after first update frame.
        if(!this._init) {this._init = true};
        this.update();
        this._mat = setMat(this._mat, this.pos.x, this.pos.y, 1, this.rot)
        //Loop through children
        for(let i=0; i<this.objects.length; i++) {
            //Call update function of entity
            this.objects[i]._update();
        }
    }

    //Start
    _start = function() {
        this.start();
        //Loop through children
        for(let i=0; i<this.objects.length; i++) {
            //Call start function of entity
            this.objects[i]._start();
        }
    }
    

    //Define by user
    update = function() {}
    start = function() {}
}

//Entity class
class entity {
    //Sprite
    sprite = null;
    //Position and rotation
    pos = new v2();
    wpos = new v2();
    rot = 0;
    //Layer
    layer = 0;

    //Already initiated?
    _init = false;

    //Matrix (calculated on draw)
    _mat = Mat(0, 0, 1, 0);

    //Create new sprite on creation (don't worry about this)
    constructor() {
        this.sprite = new sprite();
    }

    //Draw function
    _draw = function(gfx) {
        //Pushes context position and applies matrix
        gfx.ctx.save();
        gfx.ctx.transform(...this._mat);
        let gt = gfx.ctx.getTransform();
        this.wpos.x = gt.e;
        this.wpos.y = gt.f;
        //Draws the sprite
        gfx.drawspr(this.sprite, 0, 0, 0);
        //Pops context position
        gfx.ctx.restore();
    }

    _update = function() {
        //If not initiated, initiate! Allows for drawing after first update frame.
        if(!this._init) {this._init = true};
        this.update();
        this._mat = setMat(this._mat, this.pos.x, this.pos.y, 1, this.rot)
    }

    _start = function() {
        this.start();
    }

    //Define by user
    update = function() {}
    start = function() {}
}

//Canvas entity class, like entity, but instead of an image, it's sprite is a canvas
//So you can draw primitives

class canvasentity extends entity {
    constructor(w, h) {
        //Set sprite to canvassprite
        super();
        this.sprite = new canvassprite(w, h);
    }

    //Draw function
    _draw = function(gfx) {
        //Pushes context position and applies matrix
        gfx.ctx.save();
        gfx.ctx.transform(...this._mat)
        let gt = gfx.ctx.getTransform();
        this.wpos.x = gt.e;
        this.wpos.y = gt.f;
        //Draws the sprite
        gfx.drawsprimg(this.sprite.canvas, 0, 0, 0);
        //Pops context position
        gfx.ctx.restore();
    }
}

//Text Object
class text {
    //Text Stuff
    txt = "";
    font = "48px Arial";
    color = "white";
    fill = true;
    //Position and rotation
    pos = new v2();
    wpos = new v2();
    rot = 0;
    //Layer
    layer = 0;
    //Already Initiated
    _init = false;
    //Matrix (calculated on draw)
    _mat = Mat(0, 0, 1, 0);

    _update = function() {
        if(!this._init) {this._init = true};
        this._mat = setMat(this._mat, this.pos.x, this.pos.y, 1, this.rot)
    }

    _start = function() {}

    //Draw function
    _draw = function(gfx) {
        //Pushes context position and applies matrix
        gfx.ctx.save();
        gfx.ctx.transform(...this._mat)
        let gt = gfx.ctx.getTransform();
        this.wpos.x = gt.e;
        this.wpos.y = gt.f;
        
        //Draws the text
        gfx.ctx.fillStyle = this.color;
        gfx.ctx.strokeStyle = this.color;
        gfx.ctx.font = this.font;
        if(this.fill) {
            gfx.ctx.fillText(this.txt, 0, 0);
        }
        else {
            gfx.ctx.strokeText(this.txt, 0, 0);
        }
        
        //Pops context position
        gfx.ctx.restore();
    }
}

class v2 {
    x = 0;
    y = 0;
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
}

const Mat = (x, y, scale = 1, rotate = 0) => {
    rotate = (rotate * Math.PI) / 180.0;
    const xAx = Math.cos(rotate) * scale;
    const xAy = Math.sin(rotate) * scale;
    return [xAx, xAy, -xAy, xAx, x, y];
};

const setMat = (mat, x, y, scale = 1, rotate = 0)  => {
    rotate = (rotate * Math.PI) / 180.0;
    const xAx = Math.cos(rotate) * scale;
    const xAy = Math.sin(rotate) * scale;
    mat[0] = xAx;
    mat[1] = xAy;
    mat[2] = -xAy;
    mat[3] = xAx;
    mat[4] = x;
    mat[5] = y;
    return mat;
};

const sleep = time => new Promise(res => setTimeout(res, time, "done sleeping"));

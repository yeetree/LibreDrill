class sound {
    audio = null;
    constructor() {
        this.audio = new Audio();
    }

    load = async function(src) {
        //New image object
        this.audio = new Audio();
        //Sets source to src
        this.audio.src = src
        //Waits for image to load
        await new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve("timeout");
            }, 10000);
            this.audio.onload = function() {
                resolve();
            }
        })
    }

    play = function() {
        this.audio.play()
    }

    pause = function() {
        this.audio.pause()
    }
}
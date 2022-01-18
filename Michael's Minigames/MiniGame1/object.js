function Objects(x, y, object) {
    this.x = x;
    this.y = y;
    this.ydir = 2.5;

    this.move = function() {
        this.y += this.ydir;
    }

    this.show = function() {
        image(object, this.x, this.y, 60, 60);
    }
}



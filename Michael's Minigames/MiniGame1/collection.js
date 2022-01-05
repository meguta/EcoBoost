function Collection() {
    this.x = width / 2;
    this.y = height - 40;
    this.xdir = 0;

    this.show = function(showImage) {
        image(showImage, this.x, this.y, 40, 40);
    }

    this.setDir = function(dir) {
        this.xdir = dir;
    }

    this.move = function() {
        this.x += this.xdir * 5;
    }
    
    this.hits = function(object) {
        let d = dist(this.x + 20, this.y + 20, object.x + 15, object.y+ 15);
        if (d < 35) {
            return true;
        } else {
            return false;
        }
    }
     
}
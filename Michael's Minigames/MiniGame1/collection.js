function Collection() {
    this.x = width / 2;
    this.y = height - 75;
    this.xdir = 0;

    this.show = function(showImage) {
        image(showImage, this.x, this.y, 70, 70);
    }

    this.setDir = function(dir) {
        this.xdir = dir;
    }

    this.move = function() {
        this.x += this.xdir * 9;
    }
    
    this.hits = function(object) {
        let d = dist(this.x + 35, this.y + 35, object.x + 30, object.y + 30);
        if (d < 50) {
            return true;
        } else {
            return false;
        }
    }
     
}
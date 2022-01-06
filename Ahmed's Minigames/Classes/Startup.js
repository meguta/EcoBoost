class StartupScreen extends RenderObject {
    constructor (width, height, scale, x=0, y=0) {

        x = center(width, WIDTH)
        y = center(height, HEIGHT)
        super (x, y, width, height, scale)
    }

    render () {
        g.background(0, 100)
        g.image(gImageDatabase['helpframe'], this.x, this.y)
    }
}
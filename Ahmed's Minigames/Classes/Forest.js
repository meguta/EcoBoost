class Forest extends RenderObject {
    constructor (x, y, width, height, e_type=null, scale) {
        super (x,y,width,height,scale)

        this.type = e_type
        this.img = null
    }

	render () {
		this.load()
		
		this.events()

        if (this.type!=null){
            g.image(this.img, this.x, this.y)
        } else {
		    g.rect(this.x, this.y, this.width, this.height)
        }
	}

	load () {
		if (this.img==null) {
			this.img = gImageDatabase[this.type]
		}
	}

	events() {
        // nothing
	}


}
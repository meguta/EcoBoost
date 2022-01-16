class Entity extends RenderObject {
	constructor(x, y, width, height, e_type=null, scale) {
		super(x, y, width, height, scale)

        this.type = e_type
		this.img = null
		this.drag = false
	}
	render (draggable) {
		this.load()
		
		this.events(draggable)

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

	events(draggable) {
		if (mouseIsPressed && (draggable || this.drag) && !gGameOver) {
			if (this.collidepoint(pmouseX/SCALE, pmouseY/SCALE) || this.drag) {
				this.drag = true

				let tempx = (pmouseX-this.width*2)/SCALE
				let tempy = (pmouseY-this.height*2)/SCALE

				this.snapToGrid()
				move(this, [tempx, tempy], rects)
			}

		}
		if (!mouseIsPressed) {
			this.drag = false
		}
	}

	snapToGrid() {
		this.x = Math.round(this.x/this.width)
		this.x = this.x * this.width
		
		this.y = Math.round(this.y/this.height)
		this.y = this.y * this.height
	}
	
}
class Gui extends RenderObject{
	constructor(x, y, width, height, scale, btns) {
		super (x, y, width, height, scale)

		this.btns = btns
		this.size = btns.length
		this.padding = 30
	}
	render() {
		g.fill(0, 140, 0)
		g.image(gImageDatabase['mainframe'], 0, 128)
		for (let i=0;i<this.size;i++) {
			let xpos = 10 + i*16 + this.padding * i
			let ypos = 128+9
			
			this.btns[i].x = xpos
			this.btns[i].y = ypos

			this.btns[i].update()

			this.btns[i].render()
			this.btns[i].onClick(rects)
		}
	}
}
class SpawnButton extends RenderObject {
	constructor(x, y, width, height, e_type, scale, state) {
		super(x, y, width, height, scale)	
		this.animObj = new AnimationObject(x-1, y-1, state, scale)


		this.type = e_type

		this.cooldown = 0
		this.cooldownDuration = 60
		this.onCooldown = false
	}
	render() {
		this.animObj.update()
		this.animObj.x = this.x-1
		this.animObj.y = this.y-1
		if (this.onCooldown){
			this.cooldown+=1
			if (this.cooldown >= this.cooldownDuration){
				this.onCooldown = false
				this.cooldown = 0
			}
		}
		g.image(gImageDatabase[this.type], this.x, this.y)
		this.animObj.render()
	}
	onClick(obj) {
		if (this.collidepoint(mouseX/this.scale, mouseY/this.scale) && gMouseBuffer && !gGameOver) {
			if (mouseIsPressed && !this.onCooldown) {
				this.onCooldown = true
				this.animObj.changeAction("buttonPressed", true)

				gMouseBuffer = !gMouseBuffer
				let e = new Entity(random(0,128-16), random(0,128-16), 16, 16, this.type, 4)
				e.snapToGrid()
				let clear = false

				if (obj.length < 64) {
					while (!clear){
						clear = true
						for (let i=0;i<obj.length;i++){
							if (e.colliderect(obj[i])) {
								clear = false
								e.x = random(0, 128-16)
								e.y = random(0, 128-16)
								e.snapToGrid()
							}
						}
					}
					obj.push(e)
				}
			}
		} else if (!mouseIsPressed){
			this.animObj.changeAction("buttonIdle", false)	
		}
	}
}
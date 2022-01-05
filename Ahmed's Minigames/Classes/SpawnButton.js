class SpawnButton extends RenderObject {
	constructor(x, y, width, height, e_type, scale, state) {
		super(x, y, width, height, scale)
		this.type = e_type
		this.state = state
		this.img = null
		this.frame = 0

		this.cooldown = 0
		this.cooldownDuration = 60
		this.onCooldown = false
	}
	render() {
		this.updateFrame()
		if (this.onCooldown){
			this.cooldown+=1
			if (this.cooldown >= this.cooldownDuration){
				this.onCooldown = false
				this.cooldown = 0
			}
		}
		g.image(gImageDatabase[this.type], this.x, this.y)
		g.image(this.img, this.x-1, this.y-1)
	}

	updateFrame() {
		this.frame+=1
		if (this.frame >= gAnimationDatabase[this.state].length) {
			this.frame = 0
		}
		let imgId = gAnimationDatabase[this.state][this.frame]
		this.img = gAnimationFrames[imgId]

	}

	onClick(obj) {
		if (this.collidepoint(mouseX/this.scale, mouseY/this.scale) && gMouseBuffer && !gGameOver) {
			if (mouseIsPressed && !this.onCooldown) {
				this.onCooldown = true
				let changeFrame = changeAction("buttonIdle",this.frame, "buttonPressed")
				
				this.state = changeFrame[0]
				this.frame = changeFrame[1]

				gMouseBuffer = !gMouseBuffer
				let e = new Entity(random(0,128-16), random(0,128-16), 16, 16, this.type, 4)
				e.snapToGrid()
				//print("yes")
				let clear = false

				while (!clear){
					clear = true
					for (let i=0;i<obj.length;i++){
						print("yes")
						if (e.colliderect(obj[i])) {
							clear = false
							print("NO")
							e.x = random(0, 128-16)
							e.y = random(0, 128-16)
							e.snapToGrid()
						}
					}
				}
				
				obj.push(e)
				
				print("added")
			}
		} else if (!mouseIsPressed){
			let changeFrame = changeAction("buttonPressed",this.frame, "buttonIdle")
			
			this.state = changeFrame[0]
		}
	}
}
class Timer extends RenderObject {
	constructor (x,y,width,height, index, scale) {
		super(x, y, width, height, scale)
		this.index = index

		this.clock = new Clock(60, 60)
		if (this.index == "minigame2") {
			this.clock = new Clock(1000, 60)
		}
		this.fade = 0
	}
	render () {
		this.clock.update()

		this.hover()

		g.textSize(10)
		g.fill('#f2ff66')
		g.image(gImageDatabase['timerframe'], this.x, this.y)
		
		let temp = this.clock.format()
		let tWidth = g.textWidth(temp)

		g.textAlign(CENTER);
		g.text(this.clock.format(), align(tWidth, this.width, 10)+this.x, center(10, this.height)+this.y-5, tWidth, this.height)
		tWidth = g.textWidth(this.getScore())
		g.fill('#00BE91')
		g.text(this.getScore(), align(tWidth, this.width, 10)+this.x, center(10, this.height)+this.y+5, tWidth, this.height)

		if (this.index == "minigame2") {
			g.textSize(8)

			// current enemies
			text = tripleD(gEnemies.length)
			tWidth = g.textWidth(text)
			g.text(text, align(tWidth, this.width, 3, "RIGHT")+this.x, align(5, this.height)+this.y, tWidth, this.height)

			// total enemies
			text = tripleD(game.getTotalEnemies())
			tWidth = g.textWidth(text)
			g.text(text, align(tWidth, this.width, 3, "RIGHT")+this.x, align(5, this.height, 10, "RIGHT")+this.y, tWidth, this.height) 
			print("TOTAL ENEMIES: " + game.getTotalEnemies())

			// waves
			g.textSize(15)
			text = game.getCurrentWave()
			tWidth = g.textWidth(text)
			g.text(text, align(tWidth, this.width, 25, "RIGHT")+this.x, center(20, this.height)+this.y, tWidth, this.height)

			if (game.changeWave) {
				this.fade = lerp(this.fade, 150, 0.025)
				g.background(0, this.fade)
				if (this.fade > 149) {
					game.changeWave = false
				}
				
				g.textSize(20)
				text = "WAVE CLEARED"
				tWidth = g.textWidth(text)
				g.text(text, center(tWidth, gWidth)+this.x, center(20, gHeight)-15, 100, 50)
				

			} else {
				this.fade = lerp(this.fade, 0, 0.025)
				g.background(0, this.fade)
			}

		}


		if (this.gGameOver()) {
			this.fade = lerp(this.fade, 150, 0.05)
			g.background(0, this.fade)
			g.fill('#00BE91')
			tWidth = g.textWidth("You got: " + this.getScore() + " points!")
			g.text("You got: " + this.getScore() + " points!", center(tWidth, this.width)+this.x, center(10, HEIGHT), tWidth, this.height)

			g.fill('#f2ff66')
			tWidth = g.textWidth("Game Over!")
			g.text("Game Over!", center(tWidth, this.width)+this.x, center(10, HEIGHT)-15, 100, 50)
			gGameOver = true

			if (this.fade > 149) {
				window.location.href = "minigameTwo.html"
			}
		}
	}
	hover () {
		this.update()
		if (this.collidepoint(mouseX/this.scale, mouseY/this.scale) && !gGameOver) {
			this.y = lerp(this.y, 0, 0.05)
		
		} else {
			this.y = lerp(this.y, -28, 0.05)
		}
	}
	getScore() {
		if (this.index == "minigame1") {
			let type1 =0;
			let type2 =0;
			let type3 =0;

			try {
				for (let i=0;i<rects.length;i++){
					if(rects[i].type=="flower1"){
						type1+= 1
			
					} else if(rects[i].type=="flower2"){
						type2+=1
					} else {
						type3+=1
					}
				}
				let bonusPoints = min(type3, min(type1, type2))
				let totalPoints = bonusPoints*15 + (type1)*10 + (type2)*10 + (type3)*10
				return totalPoints
			} catch (e) {
				return 0
			}


		} else if (this.index == "minigame2"){
			return 100;

		}
	}

	gGameOver() {
		if (this.clock.time == 0){	
			return true 
		}
	}

}
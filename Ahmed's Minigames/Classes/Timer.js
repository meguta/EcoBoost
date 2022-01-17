class Timer extends RenderObject {
	constructor (x,y,width,height, index, scale) {
		super(x, y, width, height, scale)
		this.index = index
		this.endScreen = new EndScreen(100, 110, SCALE)
		this.clock = new Clock(60, 60)
		if (this.index == "minigame2") {
			this.clock = new Clock(60, 60)
			this.endScreen = new EndScreen(100, 110, "minigame2", SCALE)
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
				g.textAlign(CENTER, TOP)
				g.text(text, 0, 0, gWidth, gHeight)
				

			} else {
				this.fade = lerp(this.fade, 0, 0.025)
				g.background(0, this.fade)
			}

		}
		if (this.gGameOver()) {
			this.fade = lerp(this.fade, 150, 0.05)
			g.background(0, this.fade)
			gGameOver = true
			this.endScreen.render(this.getScore())
			if (this.endScreen.render(this.getScore())) {
				if (this.index == "minigame1") {
					if (this.getScore() < 150) {
						window.location.href = "minigameOne.html"
					} else {
						window.location.href = "minigameTwo.html"
					}
				} else {
					if (this.getScore() < 150) {
						window.location.href = "minigameTwo.html"
					} else {
						sessionStorage.setItem("GAMEOVER", "true")
						window.location.href = "/index.html"
					}
				}
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
			let score=0;
			for (let i=0;i<gForests.length;i++) {
				score+=int(gForests[i].getHealth())
			}
			return score

		}
	}

	gGameOver() {
		if (this.clock.time == 0 || GAMEOVER){	
			GAMEOVER = true
			return true 
		}
	}

}
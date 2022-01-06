// https://meguta.loca.lt
GAMEOVER = false
class HealthBar extends RenderObject {
    constructor (x, y, width, height, maxHealth, scale) {
        super(x, y, width, height, scale)
        this.maxHealth = maxHealth
        this.displayHealth = 0
        this.health = maxHealth

		this.fade = 150

    }
    render () {
        this.events()
        let frameWidth = this.width + 2
        let frameHeight = this.height + 2
        // frame
        g.noStroke()
        g.fill(0, 50, 0)
        g.rect (this.x, this.y, frameWidth, frameHeight, 5)

        // bar
        g.fill(255, 0, 50)
        g.rect(center(this.width, frameWidth)+this.x, center(this.height, frameHeight)+this.y, this.displayHealth*.4, this.height, 5)

    }
	nonrender() {
		this.fade = lerp(this.fade, 0, 0.05)
        let frameWidth = this.width + 2
        let frameHeight = this.height + 2

        g.fill(0, 50, 0, this.fade)
        g.rect (this.x, this.y, frameWidth, frameHeight, 5)

        // bar
        g.fill(255, 0, 50, this.fade)
        g.rect(center(this.width, frameWidth)+this.x, center(this.height, frameHeight)+this.y, this.displayHealth*.4, this.height, 5)

	}
	
    events () {
        // nice transtion
        this.displayHealth = lerp(this.displayHealth, this.health, 0.05)
		if (this.health < 0) {
			this.health = 0
		} else if (this.health > this.maxHealth) {
			this.health = this.maxHealth
		}
    }
}

class Enemy extends RenderObject {
	constructor (x, y, width, height, e_type=null, scale) {
		super (x, y, width, height, scale)
		this.img = null
		this.type = e_type
		this.inRange = false
		this.displayLag = 60

		this.isDead = false

		this.startDrag = null
		this.endDrag = null
		this.dragVel = null

		this.drag = false
		this.healthBar = new HealthBar(x+width, y, 20, 2, 50, 4)
	}

	move (movement) {
		this.x += movement[0]
		for (let i=0;i<gCollisonRects.length;i++) {
			if (this.collison(gCollisonRects[i])) {
	
				if (movement[0] > 0) {
					this.x = gCollisonRects[i].left - this.width
				}
				if (movement[0] < 0) {
					this.x = gCollisonRects[i].right 
				}
			}
		}
		this.y += movement[1]
		for (let i=0;i<gCollisonRects.length;i++) {
			if (this.collison(gCollisonRects[i])) {
				if (movement[1] > 0) {
					this.y = gCollisonRects[i].top - this.height
				} 
				if (movement[1] < 0) {
					this.y = gCollisonRects[i].bottom
				}
			}
		}
	}
	
	render (draggable) {
		this.load()
		this.events()
		this.healthBar.x = this.x+this.width
		this.healthBar.y = this.y
		if(this.drag) {
			this.healthBar.render()
			this.displayLag = 60
		} else if (this.displayLag >= 0) {
			this.healthBar.render()
			this.displayLag-=1
		} else {
			this.healthBar.nonrender()
		}
		
		if (this.img != null) {
			g.fill(255)
			g.image(this.img, this.x, this.y)
		}  else {
			if (this.inRange) 
				g.fill((255, 0, 0))
			g.rect(this.x, this.y, this.width, this.height)
		}

	}

	events () {
		if (this.healthBar.health == 0) {
			this.isDead=true
		}
		// find closest forest and move towards it
		let minIndex = -1
		let minDis = Infinity
		for (let i=0;i<gForests.length;i++){
			if (!gForests[i].isDead){
				let dist = Math.abs(this.x - gForests[i].x) + Math.abs(this.y - gForests[i].y)
				if (minDis > dist) {
					minDis = dist
					minIndex = i
				}
			}

		}
		if (minIndex != -1) {
			let movement =[]
			let dist = Math.abs(this.x - gForests[minIndex].x) + Math.abs(this.y - gForests[minIndex].y)
			movement[0] = lerp(this.x, gForests[minIndex].x, 0.01) - this.x
			movement[1] = lerp(this.y, gForests[minIndex].y, 0.01) - this.y
			//movement[0] = lerp(this.x, mouseX/this.scale, 0.01) - this.x
			//movement[1] = lerp(this.y, mouseY/this.scale, 0.01) - this.y
			this.move(movement)
			if (dist < 50){
				this.inRange = true;
			} else {
				this.inRange = false;
			}

			if (this.inRange) {
				gForests[minIndex].healthBar.health -= 0.1
			}
			
		}

		if (mouseIsPressed /*&& (draggable || this.drag)*/) {
			print("YES")
			if (this.collidepoint(mouseX/this.scale, mouseY/this.scale) || this.drag) {
				if (this.drag == false) {
					this.startDrag = [mouseX/this.scale, mouseY/this.scale, 0]
				} 
				this.drag = true
				this.endDrag = [null, null, 0]
				this.endDrag[2] += 1
				let tempx = ((mouseX-this.width*2)/this.scale) - this.x
				let tempy = ((mouseY-this.height*2)/this.scale) - this.y

				this.move([tempx, tempy])
			}
		} else {
			if (this.drag == true) {
				this.healthBar.health-=5;
				this.endDrag[0] = mouseX/this.scale
				this.endDrag[1] = mouseY/this.scale

				//print( this.endDrag[0]-this.startDrag[0])

				this.dragVel = [0, 0]
				this.dragVel[0] = ((2*(this.endDrag[0]-this.startDrag[0]) )/ (this.endDrag[2]))/this.scale
				this.dragVel[1] = ((2*(this.endDrag[1]-this.startDrag[1]) )/ (this.endDrag[2]))/this.scale
				this.drag = false

			} else if (this.endDrag != null){
				print(this.dragVel[0], this.dragVel[1])
				if (this.endDrag[2] >= 0) {
					this.move(this.dragVel)
					this.endDrag[2]-=0.5
				} else {
					this.dragVel[0] = lerp(this.dragVel[0], 0, 0.5)
					this.dragVel[1] = lerp(this.dragVel[1], 0, 0.5)
					this.move(this.dragVel)
				}
			}

		}
		

	}

	load () {
		if (this.img==null && this.type !=null) {
			this.img = gImageDatabase[this.type]
		}
	}

	collison (rect1) {
		this.update()
		rect1.update()


		if (rect1==this) {
			print("check 1")
			return false
		}

		if (this.left < rect1.right && rect1.left < this.right) {
			if (this.top < rect1.bottom && rect1.top < this.bottom) {
				print("collide 1")
				return true
			}
		}


		// if (this.collidepoint(rect1.left, rect1.top))
		// 	return true
		// if (this.collidepoint(rect1.right, rect1.top))
		// 	return true
		// if (this.collidepoint(rect1.left, rect1.bottom))
		// 	return true
		// if (this.collidepoint(rect1.right, rect1.bottom)){
		// 	print("POO")
		// 	return true

		// }

		return false
	}
}

class Forest extends RenderObject {
	constructor (x, y, width, height, e_type=null, scale) {
		super(x, y, width, height, scale)
		this.img = null
		this.type = e_type
        this.healthBar = new HealthBar (x+width, y, 40, 5, 100, 4)
		this.isDead = false
	}

	render () {
        this.load()
		if (this.x == gWidth-64) {
			this.healthBar.x = this.x-this.healthBar.width
		}
		if (this.img !=null) {
			g.image(this.img, this.x, this.y)
		}
		this.healthBar.render()
		if (this.healthBar.health == 0) {
			this.isDead = true
		} else {
			this.healthBar.health += 0.05
		}
	}
	load () {
		if (this.img==null) {
			this.img = gImageDatabase[this.type]
		}
	}
	collison (rect1) {
		this.update()
		rect1.update()


		if (rect1==this) {
			print("check 1")
			return false
		}

		if (this.left < rect1.right && rect1.left < this.right) {
			if (this.top < rect1.bottom && rect1.top < this.bottom) {
				print("collide 1")
				return true
			}
		}

		return false
	}
	
}

class GameController {
	constructor (waves, waveLength) {
		this.waves = waves
		this.currentWave = 1
		this.waveDiff = 4
		this.waveEnemies = 0
		this.maxWave = 3
		this.changeWave = false

		this.waveLength = waveLength
		this.waveTime = waveLength
	} 

	getTotalEnemies () {
		return this.waveDiff * this.currentWave
	}

	getCurrentWave () {
		return this.currentWave
	}

	changeWave () {
		this.changeWave = false
	}

	events () {
		if (this.waveTime >= 0) {
			this.waveTime -= 1
			if (this.waveTime % 300 == 1) {
				if (this.waveEnemies < this.waveDiff*this.currentWave) {
					if (randInt(0, 2) == 1) {
						gEnemies.push(new Enemy(randInt(-16, 0), randInt(-16, 0), 16, 16,'enemy', 4))
						gCollisonRects.push(gEnemies[gEnemies.length-1])
					} else {
						gEnemies.push(new Enemy(randInt(gWidth, gWidth+16), randInt(gHeight, gHeight+16), 16, 16,'enemy', 4))
						gCollisonRects.push(gEnemies[gEnemies.length-1])
					}
					this.waveEnemies+=1
				}
			}
		} else {
			if (this.currentWave >= this.maxWave) {
				GAMEOVER = true
			} else {
				this.waveTime = this.waveLength
				this.currentWave+=1
				this.changeWave = true

			}
		}
	}

}
function preload () {
	gImageDatabase["forest"] = loadImage("data/images/entities/forest.png")
	gImageDatabase["enemy"] = loadImage("data/images/entities/enemy.png")
	gImageDatabase['timerframe'] = loadImage('data/images/entities/largetimerframe.png')

	font = loadFont('data/fonts/EarlyGameBoy.ttf')
}

let mean = new Enemy(80, 80, 16, 16, 'enemy', 4)
let gEnemies = []

let gWidth = 256
let gHeight = 192

let furry  = new Forest(32, 32, 32, 32, 'forest');
let furry1 = new Forest(gWidth-64, gHeight-64, 32, 32, 'forest');
let furry2 = new Forest(32,        gHeight-64, 32, 32, 'forest');
let furry3 = new Forest(gWidth-64,         32, 32, 32, 'forest');


let gForests = [furry, furry1, furry2, furry3]

let gCollisonRects = []
let game = new GameController(10, 200)

function setup() {
    createCanvas(gWidth*4, gHeight*4)
    g = createGraphics (gWidth, gHeight)
    frameRate(60)
    g.pixelDensity(4)
	for(let i=0; i<1; i++){
		
		//gEnemies.push(new Enemy(randInt(0, 100),randInt(0, 100), 16, 16, 'enemy', 4))
		//gCollisonRects.push(gEnemies[i])
	}
	for (let i=0; i<gForests.length; i++){
		gCollisonRects.push(gForests[i])
	}
	g.textFont(font)

}

let timer = new Timer(center(128, gWidth), 0, 128, 32, "minigame2", 4)

function draw() {
	p5.disableFriendlyErrors = true
	game.events()
	//print("POOOPOO")
	try {
    	g.noSmooth()
	} catch (e) {}
    g.background('#38d88e')
	for (let i=0;i<gForests.length;i++){
		gForests[i].render()
	}	
	for(let i=0;i<gCollisonRects.length; i++){
		if (gCollisonRects[i].type == 'enemy'){
			gCollisonRects[i].render()
			if (gCollisonRects[i].isDead) {
				gCollisonRects.splice(i, 1)
			}
		} else {
			if (gCollisonRects[i].isDead){
				gCollisonRects.splice(i, 1)
			}
		}
	}
	for (let i=0;i<gEnemies.length; i++){
		if (gEnemies[i].isDead) {
			gEnemies.splice(i, 1)
		}
	}
    // furry.render()
	// furry1.render()
	timer.render()
    scale(4)
    image(g, 0, 0)
}
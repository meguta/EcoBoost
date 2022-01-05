width = 800
height = 800

function setup() {
	createCanvas(800, 800)
	noLoop()
	frameRate(60)
}

dots = []

class entity {
	constructor(x, y, width, height) {
		this.height = height
		this.width = width
		this.x = x
		this.y = y
		this.top = y
		this.bottom = y+height
		this.left = x
		this.right = x+width 
	}
	render (scroll) {
		rect(this.x-scroll[0], this.y-scroll[1], this.width, this.height)

	}

	colliderect (rect1) {
		// right side
		this.top = this.y
		this.bottom = this.y+this.height
		this.left = this.x
		this.right = this.x+this.width

		rect1.top = rect1.y
		rect1.bottom = rect1.y+rect1.height
		rect1.left = rect1.x
		rect1.right = rect1.x +rect1.width

		print("check 1: " + (this.right>rect1.left))
		print("check 2: " + (this.right<rect1.right))
		print("check 3: " + (this.bottom>rect1.top))
		print("check 4: " + (this.bottom<rect1.bttom))
		if ((rect1.right > this.left && rect1.right < this.right) || (rect1.left > this.left && rect1.left < this.right)) {
			print("collide x")
			if ((rect1.bottom > this.top && rect1.bottom < this.bottom)||(rect1.top > this.top && rect1.top < this.bottom)) {
				print("collide y")
				return true;
			}
		}
		if ((this.right > rect1.left && this.right < rect1.right) || (this.left > rect1.left && this.left < rect1.right)) {
			print("collide x")
			if ((this.bottom > rect1.top && this.bottom < rect1.bottom)||(this.top > rect1.top && this.top < rect1.bottom)) {
				print("collide y")
				return true;
			}
		}
		return false
	}
	
}
types = {}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight)
}

function move(obj, movement, rects) {
	obj.x += movement[0]
	collision_types = {top: false, bottom: false, left: false, right: false}
	print(rects.length)
	for (let i=0; i<rects.length;i++) {

		if (obj.colliderect(rects[i])) {
			print("x collide")
			if (movement[0] > 0) {
				collision_types["right"] = true
				obj.x = rects[i].left-obj.width
			} if (movement[0] < 0) {
				collision_types["left"] = true
				obj.x = rects[i].right
			}
		}
	}
	obj.y += movement[1]
	for (let i=0; i<rects.length;i++) {
		if (obj.colliderect(rects[i])) {
			print("y collide")
			if (movement[1] > 0) {
				collision_types["bottom"] = true
				obj.y = rects[i].top-obj.height
			}
			if (movement[1] < 0) {
				collision_types["top"] = true
				obj.y = rects[i].bottom
			}
		}
	}
	return collision_types
}
player = new entity(100, 100, 80, 80)
test = new entity(20, 20, 50, 50)
bottom = new entity(0, 700, 800, 100)
grav = 0

true_scroll = [0,0]

function draw() {
  true_scroll[0] += (player.x-true_scroll[0]-width/2)/20
  true_scroll[1] += (player.y-true_scroll[1]-height/2)/20
  scroll = true_scroll
  scroll[0] = int(scroll[0])
  scroll[1] = int(scroll[1])

  strokeWeight(1)
  text = `player x: ${player.x}
          player y: ${player.y}`
  fill(60)
	let c1 = color(255,255,0)
	let c2 = color(255,255,255)
	let c3 = color(221, 220, 220)

	background(c3)
	player.render(scroll)
	movement = [0,0]
  
  grav+=0.98
  if (grav >= 100) {
    grav=-30
  }

	if (keyIsDown(LEFT_ARROW)) {
		movement[0] = -2.5
	}
	if (keyIsDown(RIGHT_ARROW)) {
		movement[0] = 2.5
	}
	if (keyIsDown(UP_ARROW)) {
    if (types["bottom"]) {
		  grav *= -1.1
    }
	}
	if (keyIsDown(DOWN_ARROW)) {
		movement[1] = 2.5
	}
	if (movement == [0,0]) {
		noLoop()
	} else {
		loop()
	}
  movement[1]+=grav
	rects = [bottom, test]
  for (let i=0;i<rects.length;i++) {
    strokeWeight(10)
    fill(color(255,0,0))
    rects[i].render(scroll)
  }
	types = move(player, movement, rects)
  
  if(types['top']) {
    grav = 0
  }
}
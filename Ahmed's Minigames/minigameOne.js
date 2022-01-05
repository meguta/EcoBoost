let flo1 = new Entity(20, 50, 16, 16, 'flower1', 4)
let tree = new Entity(80, 50, 16, 16, 'tree1', 4)
let flo2 = new Entity(100, 50, 16, 16, 'flower2', 4)

let rects = []
let flo1Spawn = new SpawnButton(0, 0, 16, 16, flo1.type, 4, "buttonIdle")
let flo2Spawn = new SpawnButton(0, 0, 16, 16, flo2.type, 4, "buttonIdle")
let tree1Spawn = new SpawnButton(0, 0, 16, 16, tree.type, 4, "buttonIdle")
let timer = new Timer(center(64, WIDTH), 0, 64, 32, "minigame1", 4)

let btns = [flo1Spawn, flo2Spawn, tree1Spawn]
let gui = new Gui(0, 0, 128, 30, 4, btns)
let font

function preload() {
	gImageDatabase['flower1'] = loadImage('data/images/entities/flower1.png')
	gImageDatabase['tree1'] = loadImage('data/images/entities/tree1.png')
	gImageDatabase['flower2'] = loadImage('data/images/entities/flower2.png')
	gImageDatabase['frame'] = loadImage('data/images/entities/frame.png')
	gImageDatabase['mainframe'] = loadImage('data/images/entities/mainframe.png')
	gImageDatabase['timerframe'] = loadImage('data/images/entities/timerframe.png')

	font = loadFont('data/fonts/EarlyGameBoy.ttf')
	gAnimationDatabase["buttonPressed"] = loadAnimation("data/animations/buttonPressed", [2])
	gAnimationDatabase["buttonIdle"] = loadAnimation("data/animations/buttonIdle", [100, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1])
}

function setup() {
	createCanvas(512, 640)
	g = createGraphics(128, 256)
	frameRate(60)
	g.pixelDensity(4)
	g.textFont(font)
}

function draw() {
	g.background('#38d88e')
	g.noSmooth()
	for (let i=0;i<rects.length;i++){
		rects[i].render([0,0], checkDraggable(rects))
	}
	gui.render()
	timer.render()
	scale(4)
	image(g, 0, 0)
}
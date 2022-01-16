let flo1 = new Entity(20, 50, 16, 16, 'flower1', SCALE)
let tree = new Entity(80, 50, 16, 16, 'tree1', SCALE)
let flo2 = new Entity(100, 50, 16, 16, 'flower2', SCALE)

let rects = []
let flo1Spawn = new SpawnButton(0, 0, 16, 16, flo1.type, SCALE, "buttonIdle")
let flo2Spawn = new SpawnButton(0, 0, 16, 16, flo2.type, SCALE, "buttonIdle")
let tree1Spawn = new SpawnButton(0, 0, 16, 16, tree.type, SCALE, "buttonIdle")
let timer = new Timer(center(64, WIDTH), 0, 64, 32, "minigame1", SCALE)
let help = new StartupScreen (100, 110, SCALE)
let btns = [flo1Spawn, flo2Spawn, tree1Spawn]
let gui = new Gui(0, 0, 128, 30, SCALE, btns)
let font

function preload() {
	gImageDatabase['flower1'] = loadImage('data/images/entities/flower1.png')
	gImageDatabase['tree1'] = loadImage('data/images/entities/tree1.png')
	gImageDatabase['flower2'] = loadImage('data/images/entities/flower2.png')
	gImageDatabase['frame'] = loadImage('data/images/entities/frame.png')
	gImageDatabase['mainframe'] = loadImage('data/images/entities/mainframe.png')
	gImageDatabase['timerframe'] = loadImage('data/images/entities/timerframe.png')
	gImageDatabase['helpframe'] = loadImage('data/images/entities/helpframe.png')
	gImageDatabase['helpbutton'] = loadImage('data/images/entities/helpbutton.png')
	gImageDatabase['badending1'] = loadImage('data/images/backgrounds/badending1.jpg')
	gImageDatabase['goodending1'] = loadImage('data/images/backgrounds/goodending1.jpg')
	gImageDatabase['tryagain'] = loadImage('data/images/entities/tryagainbutton.png')
	gImageDatabase['nextbutton'] = loadImage('data/images/entities/nextbutton.png')


	font = loadFont('data/fonts/COMMP___.TTF')
	gAnimationDatabase["buttonPressed"] = loadAnimation("data/animations/buttonPressed", [2])
	gAnimationDatabase["buttonIdle"] = loadAnimation("data/animations/buttonIdle", [100, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1])
}

function setup() {
	w = 768
	h = 960
	createCanvas(w, h)
	g = createGraphics((w/SCALE), (h/SCALE))
	frameRate(60)
	g.pixelDensity(SCALE*3)
	g.textFont(font)
}

function draw() {
	g.background('#38d88e')
	g.noSmooth()
	help.render()
	for (let i=0;i<rects.length;i++){
		rects[i].render([0,0], checkDraggable(rects))
	}
	gui.render()
	timer.render()
	scale(SCALE)
	image(g, 0, 0)
}
// Global and constant variables
let WIDTH = 128
let HEIGHT = 128
let gGameOver = false

let gImageDatabase = {}
let gAnimationDatabase = {}
let gAnimationFrames = {}

let gMouseBuffer = false

function randInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

/**
 * 
 * @param {*} obj Object that is trying to move
 * @param {*} movement The movement the object is trying to complete
 * @param {*} rects Collisions objects in the game
 */
function move(obj, movement, rects) {
	let tempx = obj.x
	let tempy = obj.y
	obj.x = movement[0]
	obj.y = movement[1]
	obj.snapToGrid()
	obj.update()

	for (let i=0; i<rects.length;i++) {
		if (obj.colliderect(rects[i])) {
			obj.x = tempx
			obj.y = tempy
		}
	}
}

/**
 * 
 * @param {*} path The location of the frame data
 * @param {*} frameDurations How long each frame lasts
 * @returns The animation frame data
 */

function loadAnimation(path,frameDurations){
	animationName = path.split('/')
	animationName = animationName[animationName.length-1]
	animationFrameData = []
	for (let i = 0;i<frameDurations.length;i++){
		animationFrameId = animationName + '_' + str(i)
		let imageLocation = path + '/' + animationFrameId + '.png'
		animationImage = loadImage(imageLocation)
		gAnimationFrames[animationFrameId] = animationImage
		for (let j=0;j<frameDurations[i];j++){
			animationFrameData.push(animationFrameId)
		}
	} 
	return animationFrameData
}

/**
 * 
 * @param {*} actionVar The current animation action 
 * @param {*} frame The current frame
 * @param {*} newValue The new action
 * @returns	The changed action variable and the frame 
 */
function changeAction(actionVar, frame, newValue){
	if (actionVar != newValue){
		actionVar = newValue
		frame = 0
	}
	return [actionVar, frame]
}

/**
 * @param {*} size The size of the child object
 * @param {*} divSize The size of the container containing the child object
 * @returns The center position
 */
function center(size, divSize){
	return (divSize/2)-(size/2)
}

function align(size, divSize, padding=5, dir="LEFT") {
	if (dir=="LEFT") {
		return padding
	} else if (dir=="RIGHT") {
		return divSize-size-padding
	} else {
		return (divSize/2)-(size/2)
	}
}

function tripleD(original) {
	if (original < 10) {
		return "00"+original
	} else if (original < 100) {
		return "0"+original
	}
}

// p5.js functions
function mouseReleased() {
	gMouseBuffer = false
}
function mousePressed() {
	gMouseBuffer = true
}

/**
 * 
 * @returns If the object is currently draggable
 */
function checkDraggable (rects) {
	let draggable = true
	for (let i=0;i<rects.length;i++) {
		if (rects[i].drag == true) {
			draggable = false
			break
		}
	}
	return draggable
}












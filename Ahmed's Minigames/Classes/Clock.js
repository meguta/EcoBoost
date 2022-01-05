
class Clock {
	constructor (initTime, frameRate) {
		this.time = initTime
		this.frameRate = frameRate
		this.frameCount = 0
	}
	update () {
		this.frameCount+=1
		if (this.frameCount % this.frameRate == 0 && this.time > 0){
			this.time -= 1
		}
	}
	format () {
		let minutes = str(Math.floor(this.time/60))
		let seconds = str(this.time - minutes*60)
		if (seconds.length == 1) {
			seconds = "0"+seconds
		}
		return minutes+":"+seconds
	}
}

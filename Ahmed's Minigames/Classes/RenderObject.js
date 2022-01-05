/**
 * @author	Ahmed Imana <662438@pdsb.net>
 * @version	1.0
 * @since	1.0
 */
 class RenderObject {
	constructor(x,y,width,height,scale){
		this.x = x
		this.y = y

		this.top = y
		this.bottom = y+height
		this.left = x
		this.right = x+width

		this.width = width
		this.height = height

		this.scale = scale
	}

	/**
	 * Updates the postion variables in the RenderObject
	 */
	update() {
		this.left = this.x
		this.right = this.x + this.width
		this.top = this.y
		this.bottom = this.y + this.height
	}

	/**
	 * 
	 * @param {*} x The x position to test collision
	 * @param {*} y The y position to test collision
	 * @returns If the point collided with the object
	 */
	collidepoint(x, y) {
		if (x > this.left && x <= this.right){
			if (y > this.top && y <= this.bottom) {
				return true
			}
		}
		return false
	}

	/**
	 * 
	 * @param {*} rect1 The rectangle to check collision
	 * @returns If the rectangle collided with the object
	 */
	colliderect (rect1) {
		this.update()
		rect1.update()


		if (rect1==this) {
			return false
		}

		if (this.x == rect1.x && this.y == rect1.y) {
			return true
		}

		if (this.x < 0 || this.x > WIDTH-this.width) {
			return true
		}
		if (this.y < 0 || this.y > HEIGHT-this.height) {
			return true
		}

		return false
	}

}

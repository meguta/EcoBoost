class AnimationObject extends RenderObject{
    constructor (x, y, state, scale) {
        super(x, y, 0,0,scale)
        this.state = state
        this.frame = 0
        this.img = null
    }

    update() {
        this.frame+=1
        if (this.frame >= gAnimationDatabase[this.state].length) {
            this.frame = 0
        }
        let imgId = gAnimationDatabase[this.state][this.frame]
        this.img = gAnimationFrames[imgId]
    }

    render () {
        if (this.img != null) {
            g.image(this.img, this.x, this.y)
        }
    }

    changeAction(newState, follow) {
        if (this.state != newState) {
            this.state = newState
            if (follow) {
                this.frame = 0
            }
        }  
    }
}
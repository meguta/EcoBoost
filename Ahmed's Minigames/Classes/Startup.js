class StartupButton extends RenderObject {
    constructor (x, y, width, height, scale) {
        super(x, y, width, height, scale)
        this.pressed = false
    }
    render () {
        g.image(gImageDatabase['helpbutton'], this.x, this.y)
        print(this.collidepoint(pmouseX/SCALE, pmouseY/SCALE))
        if (this.collidepoint(pmouseX/SCALE, pmouseY/SCALE) && mouseIsPressed) {
            this.pressed = true
            print("PPPP")
            return this.pressed
        }
        return this.pressed
    }
}

class EndButton extends RenderObject {
    constructor (x, y, width, height, scale) {
        super(x, y, width, height, scale)
        this.pressed = false
    }
    render (score) {
        if (score > 150) {
            g.image(gImageDatabase['nextbutton'], this.x, this.y)
        } else {
            g.image(gImageDatabase['tryagain'], this.x, this.y)
        }

        if (this.collidepoint(pmouseX/SCALE, pmouseY/SCALE) && mouseIsPressed) {
            this.pressed = true
            return this.pressed
        }
        return this.pressed
    }
}

class StartupScreen extends RenderObject {
    constructor (width, height, scale, index="minigame1", x=0, y=0) {

        x = center(width, WIDTH)
        y = center(height, HEIGHT)
        if (index != "minigame1") {
            x = center(width, gWidth)
            y = center(height, gHeight)
        }
        super (x, y, width, height, scale)
        this.index = index
        this.button = new StartupButton(center(90, this.width)+this.x,this.y+93, 90, 20, SCALE)

    }

    render () {
        if (!this.button.pressed) {
            g.background(0, 100)
            g.image(gImageDatabase['helpframe'], this.x, this.y)
            g.textAlign(LEFT)
            let pX = 22.5
		    
		    g.fill('#00BE91')

            g.textSize(10)
            let text = "HOW TO PLAY"
            let tWidth = g.textWidth(text)
            g.text(text, center(tWidth, this.width)+this.x, align(tWidth, this.height, 15)+this.y, tWidth+5)

            g.textSize(5)
            if (this.index=="minigame1") {
                text = "1. Click the buttons at the bottom to increase biodiversity!"
                g.image(gImageDatabase['flower1'],this.x+pX/4, this.y+20)
            } else {
                text = "1. Swipe away the loggers from the forest, to prevent deforestation"
                g.image(gImageDatabase['enemy'],this.x+pX/4, this.y+20)
            }

            tWidth = g.textWidth(text)
            g.text(text, this.x+pX, this.y+20, this.width-pX, this.height)

            if (this.index=="minigame1") {
                text = "2. Try to make cool patterns for the most points!"
                g.image(gImageDatabase['flower2'],this.x+pX/4, this.y+45)
                tWidth = g.textWidth(text)
                g.text(text, this.x+pX, this.y+45, this.width-pX, this.height)
            } else {
                text = "2. Try to make it through the most waves for the most points!"
                //g.image(gImageDatabase['tree1'],this.x+pX/4, this.y+45)
                tWidth = g.textWidth(text)
                pX = 5
                g.text(text, this.x+pX, this.y+46.5, this.width-pX, this.height)
            }

            pX = 22
            text = "3. You have 60 seconds get the highest score! Good luck!"
            tWidth = g.textWidth(text)
            g.text(text, this.x+pX, this.y+70, this.width-pX, this.height)
            g.image(gImageDatabase['tree1'],this.x+pX/4, this.y+70)

            this.button.render()
        } else {
            return true
        }
        //g.image(gImageDatabase['helpbutton'],center(gImageDatabase['helpbutton'].width, this.width)+this.x,this.y+93)

    }
}

class EndScreen extends RenderObject {
    constructor (width, height, scale, index="minigame1", x=0, y=0) {

        x = center(width, WIDTH)
        y = center(height, HEIGHT)
        if (index != "minigame1") {
            x = center(width, gWidth)
            y = center(height, gHeight)

        }
        super (x, y, width, height, scale)
        this.index = index
        this.selectCode = Math.floor(Math.random()*3)
        this.button = new EndButton(center(90, this.width)+this.x,this.y+90, 90, 20, SCALE)
    }

    render(score) {
        g.background(0, 100)
        g.image(gImageDatabase['helpframe'], this.x, this.y)
        g.textAlign(LEFT)
        let pX = 23

        g.textSize(8)
        let text = ""
        if (score > 150) {
            text = "YOU WON!"
        } else {
            text = "YOU LOST!"
        }
        let tWidth = g.textWidth(text)
        g.textAlign(CENTER)
        g.text(text, this.x, this.y+5, this.width, this.height)

        g.textSize(4)
        let codes = [11223, 30292, 22331]
        text = "CODE FOR COSEMETIC SHOP: " + codes[this.selectCode]
        g.text(text, this.x, this.y+14, this.width, this.height)

        if (this.index =="minigame1") {
            if (score > 150){
                g.image(gImageDatabase['goodending1'], center(90, this.width)+this.x, this.y+20)

            } else {
                g.image(gImageDatabase['badending1'], center(90, this.width)+this.x, this.y+20)
            }

        } else {
            if (score > 150){
                g.image(gImageDatabase['goodending2'], center(90, this.width)+this.x, this.y+20)

            } else {
                g.image(gImageDatabase['badending2'], center(90, this.width)+this.x, this.y+20)
            }
        }
        return this.button.render(score)
    }

}

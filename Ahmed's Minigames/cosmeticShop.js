class TextBox extends RenderObject {
    constructor (x, y, width, height, e_type, code, scale) {
        super(x, y, width, height, scale)
        this.pressed = true;
        this.text = ""
        this.keyBuffer = true
        this.type = e_type
        this.code = code

    }
    render () {
        g.image(gImageDatabase['textbox'], this.x, this.y)
        print(this.collidepoint(pmouseX/SCALE, pmouseY/SCALE))
        if (!this.collidepoint(pmouseX/SCALE, pmouseY/SCALE)){
            this.pressed=false
        }
        
        if ( (this.collidepoint(pmouseX/SCALE, pmouseY/SCALE) && mouseIsPressed) || this.pressed==true) {
            this.pressed = true;
            if (keyIsPressed && this.keyBuffer) {
                if (key=="Backspace") {
                    if (this.text.length>0){
                        this.text = this.text.substring(0, this.text.length-1)
                    }
                } else if (key=="Enter") {
                    if (this.text == this.code) {
                        localStorage.setItem('bkgimage', "url('data/images/backgrounds/"+this.type+".png')")
                        print(localStorage.getItem('bkgimage'))
                        document.body.style.backgroundImage = localStorage.getItem('bkgimage')
                        history.back()
                    } else {
                        this.text = "INVAILD"
                    }
                } 
                else if (this.text.length < 11){
                    this.text+=key
                }
                this.keyBuffer = false
            } else if (!keyIsPressed) {
                this.keyBuffer = true
            }

        }

        g.fill("#f2ff66")
        g.textSize(8)
        let pX = 5
        let pY = 4
        g.text(this.text, this.x+pX, this.y+pY, this.width-pX, this.height-pY)
    }
}

class ItemDisplay extends RenderObject {
    constructor (x, y, width, height, e_type, text, code, scale) {
        super (x, y, width, height, scale)
        this.type = e_type
        this.text = text
        this.textbox = new TextBox(x, y+height, width, 16, e_type, code)
    }

    render () {
        g.image(gImageDatabase['itemframe'], this.x, this.y)
        g.image(gImageDatabase[this.type], center(32, this.width)+this.x, this.y+4)

        g.textSize(3)
        let pX = 4
        let pY = 40
        g.fill('#133a40')
        g.text(this.text, this.x+pX, this.y+pY, this.width-pX, this.height-pY)

        g.fill("#f2ff66")
        g.text(this.text, this.x+pX+0.3, this.y+pY+0.3, this.width-pX, this.height-pY)

        this.textbox.render()
    }
}


function preload() {
    gImageDatabase['backdrop'] = loadImage('data/images/backgrounds/backdrop.png')
    gImageDatabase['itemframe'] = loadImage('data/images/backgrounds/itemframe.png')
    gImageDatabase['textbox'] = loadImage('data/images/backgrounds/textbox.png')

    gImageDatabase['flower1display'] = loadImage('data/images/backgrounds/flower1display.png')
    gImageDatabase['flower2display'] = loadImage('data/images/backgrounds/flower2display.png')
    gImageDatabase['tree1display'] = loadImage('data/images/backgrounds/tree1display.png')
}

let font
function setup() {
    createCanvas(cWidth*SCALE, cHeight*SCALE)
    g = createGraphics((cWidth), (cHeight))
    g.pixelDensity(SCALE*4)
    
	font = loadFont('data/fonts/COMMP___.TTF')
    g.textFont(font)
}
let text1 = "This is one of the roses you can plant in the [BIODIVERSITY] minigame. Roses are apart of the Rosaceae family, and has over three hundred different kinds of species."
let text2 = "This is one of the tulips you can plant in the [BIODIVERSITY] minigame. Tulips are a genus of spring-blooming flowers. Their flowers are large, showy, and brightly colored."
let text3 = "This is one of the pine trees you can plant in the [BIODIVERSITY] minigame. Pine trees are apart of the family Pinaceae, while Pinus is the sole genus in the subfamily Pinoideae."

let itemDisplay1 = new ItemDisplay(10, 25, 75, 75, "flower1display", text1, "11223", SCALE)
let itemDisplay2 = new ItemDisplay(90, 25, 75, 75, "flower2display", text2, "30292", SCALE)
let itemDisplay3 = new ItemDisplay(170, 25, 75, 75, "tree1display", text3, "22331", SCALE)

function draw() {
    g.noSmooth()
    g.image(gImageDatabase['backdrop'], 0,0 )
    itemDisplay1.render()
    itemDisplay2.render()
    itemDisplay3.render()
    g.textSize(20)
    let text = "COSMETIC SHOP"
    let tWidth = g.textWidth(text)
    g.fill('#133a40')
    g.text(text, center(tWidth, cWidth), 20)

    g.fill("#f2ff66")
    g.text(text, center(tWidth, cWidth)-1, 20-1)
    scale(SCALE)
    image(g, 0, 0)
}
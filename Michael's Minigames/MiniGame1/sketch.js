// Backgrounds
let level1Background;
let level2Background;
let level3Background;
let startScreen;
let loseScreen;
let winScreen;

// Bins
let recycle;
let foodWaste;
let waste;

// Recycle
let recycleObjects = [];
let noRecycleObjects = [];

// Food Waste
let foodWasteObjects = [];
let noFoodWasteObjects = [];

// Waste
let wasteObjects = [];
let noWasteObjects = [];

// Font
let font;

// Other variables
let collect;
let texts;
let currentLevel;
let imagePicker;
let width;
let height;

// Stored Objects
let goodFallingObjects = [[], [], []];
let badFallingObjects = [[], [], []];

// Score
let scoreNumber1 = 0;
let scoreNumber2 = 0;
let scoreNumber3 = 0;

function preload() {
    // Backgrounds Images
    startScreen = loadImage('Backgrounds/background1.jpg');
    level1Background = loadImage('Backgrounds/background5.jpg');
    level2Background = loadImage('Backgrounds/background4.jpg');
    level3Background = loadImage('Backgrounds/background3.jpg');
    loseScreen = loadImage('Backgrounds/toxic.jpg')
    winScreen = loadImage('Backgrounds/win.jpg')

    // Bin Images
    recycle = loadImage('Bins/recycle.png');
    foodWaste = loadImage('Bins/foodwaste.png');
    waste = loadImage('Bins/waste.png');

    // Recyclable Images
    recycleObjects[0] = loadImage('Recycle/aerosol.png');
    recycleObjects[1] = loadImage('Recycle/cannedfood.png');
    recycleObjects[2] = loadImage('Recycle/cardboardbox.png');
    recycleObjects[3] = loadImage('Recycle/cereals.png');
    recycleObjects[4] = loadImage('Recycle/dishes.png');
    recycleObjects[5] = loadImage('Recycle/documents.png');
    recycleObjects[6] = loadImage('Recycle/eggs.png');
    recycleObjects[7] = loadImage('Recycle/email.png');
    recycleObjects[8] = loadImage('Recycle/envelope.png');
    recycleObjects[9] = loadImage('Recycle/foil.png');
    recycleObjects[10] = loadImage('Recycle/glass.png');
    recycleObjects[11] = loadImage('Recycle/jar.png');
    recycleObjects[12] = loadImage('Recycle/magazine.png');
    recycleObjects[13] = loadImage('Recycle/milk.png');
    recycleObjects[14] = loadImage('Recycle/newspaper.png');
    recycleObjects[15] = loadImage('Recycle/paper.png');
    recycleObjects[16] = loadImage('Recycle/paperbag.png');
    recycleObjects[17] = loadImage('Recycle/paperbook.png');
    recycleObjects[18] = loadImage('Recycle/postitnotes.png');
    recycleObjects[19] = loadImage('Recycle/tray.png');
    recycleObjects[20] = loadImage('Recycle/water.png');

    // Not Recyclable Images
    noRecycleObjects[0] = loadImage('Recycle/REDbox.png');
    noRecycleObjects[1] = loadImage('Recycle/REDflask.png');
    noRecycleObjects[2] = loadImage('Recycle/REDlightbulb.png');
    noRecycleObjects[3] = loadImage('Recycle/REDpizza.png');
    noRecycleObjects[4] = loadImage('Recycle/REDplasticbag.png');
    noRecycleObjects[5] = loadImage('Recycle/REDplasticfilm.png');
    noRecycleObjects[6] = loadImage('Recycle/REDwindow.png');

    // Food Waste Images
    foodWasteObjects[0] = loadImage('FoodWaste/bake.png');
    foodWasteObjects[1] = loadImage('FoodWaste/beans.png');
    foodWasteObjects[2] = loadImage('FoodWaste/bone.png');
    foodWasteObjects[3] = loadImage('FoodWaste/bread.png');
    foodWasteObjects[4] = loadImage('FoodWaste/cheese.png');
    foodWasteObjects[5] = loadImage('FoodWaste/chicken.png');
    foodWasteObjects[6] = loadImage('FoodWaste/coffeefilter.png');
    foodWasteObjects[7] = loadImage('FoodWaste/herb.png');
    foodWasteObjects[8] = loadImage('FoodWaste/meat.png');
    foodWasteObjects[9] = loadImage('FoodWaste/ricebowl.png');
    foodWasteObjects[10] = loadImage('FoodWaste/seafood.png');
    foodWasteObjects[11] = loadImage('FoodWaste/tea.png');
    foodWasteObjects[12] = loadImage('FoodWaste/tissuepaper.png');
    foodWasteObjects[13] = loadImage('FoodWaste/toiletpaper.png');
    foodWasteObjects[14] = loadImage('FoodWaste/toothpick.png');
    foodWasteObjects[15] = loadImage('FoodWaste/vegetables.png');

    // Not Food Waste Images
    noFoodWasteObjects[0] = loadImage('FoodWaste/REDfoodpackage.png');
    noFoodWasteObjects[1] = loadImage('FoodWaste/REDgardening.png');
    noFoodWasteObjects[2] = loadImage('FoodWaste/REDliquids.png');
    noFoodWasteObjects[3] = loadImage('FoodWaste/REDoil.png');
    noFoodWasteObjects[4] = loadImage('FoodWaste/REDplasticbag.png');

    // Waste Images
    wasteObjects[0] = loadImage('Waste/book.png');
    wasteObjects[1] = loadImage('Waste/bubblewrap.png');
    wasteObjects[2] = loadImage('Waste/candywrappers.png');
    wasteObjects[3] = loadImage('Waste/cups.png');
    wasteObjects[4] = loadImage('Waste/cultery.png');
    wasteObjects[5] = loadImage('Waste/dish.png');
    wasteObjects[6] = loadImage('Waste/documentprinting.png');
    wasteObjects[7] = loadImage('Waste/foodcontainer.png');
    wasteObjects[8] = loadImage('Waste/gardenexcess.png');
    wasteObjects[9] = loadImage('Waste/glove.png');
    wasteObjects[10] = loadImage('Waste/pictures.png');
    wasteObjects[11] = loadImage('Waste/plate.png');
    wasteObjects[12] = loadImage('Waste/potatochips.png');
    wasteObjects[13] = loadImage('Waste/sticker.png');
    wasteObjects[14] = loadImage('Waste/straw.png');
    wasteObjects[15] = loadImage('Waste/tissue.png');
    wasteObjects[15] = loadImage('Waste/vase.png');
    wasteObjects[15] = loadImage('Waste/wrapping.png');

    // Not Waste Images
    noWasteObjects[0] = loadImage('Waste/REDbox.png');
    noWasteObjects[1] = loadImage('Waste/REDpaper.png');
    noWasteObjects[2] = loadImage('Waste/REDplastic.png');

    // Font
    font = loadFont('Font/commonPixel.woff');
}

function setup() {
    createCanvas(displayWidth - 80, displayHeight - 150);
    width = displayWidth - 80;
    height = displayHeight - 150;
    currentLevel = -1;
    collect = new Collection();
    texts = new Text(font);
   
    // Created objects, set location, and set image 
    for (let c = 0; c < 75; c++) {
        goodFallingObjects[0][c] = new Objects(Math.floor(Math.random() * width - (displayWidth * 0.075)) + displayWidth * 0.125, Math.floor(Math.random() * 3200) - 3200
        , recycleObjects[Math.floor(Math.random() * recycleObjects.length)]);
        goodFallingObjects[1][c] = new Objects(Math.floor(Math.random() * width - (displayWidth * 0.075)) + displayWidth * 0.125, Math.floor(Math.random() * 3200) - 3200
        , foodWasteObjects[Math.floor(Math.random() * foodWasteObjects.length)]);
        goodFallingObjects[2][c] = new Objects(Math.floor(Math.random() * width - (displayWidth * 0.075)) + displayWidth * 0.125, Math.floor(Math.random() * 3200) - 3200
        , wasteObjects[Math.floor(Math.random() * wasteObjects.length)]);
    } 
    
    for (let c = 0; c < 50; c++) {
        badFallingObjects[0][c] = new Objects(Math.floor(Math.random() * width - (displayWidth * 0.075)) + displayWidth * 0.125, Math.floor(Math.random() * 3200) - 3200
        , noRecycleObjects[Math.floor(Math.random() * noRecycleObjects.length)]);
        badFallingObjects[1][c] = new Objects(Math.floor(Math.random() * width - (displayWidth * 0.075)) + displayWidth * 0.125, Math.floor(Math.random() * 3200) - 3200
        , noFoodWasteObjects[Math.floor(Math.random() * noFoodWasteObjects.length)]);
        badFallingObjects[2][c] = new Objects(Math.floor(Math.random() * width - (displayWidth * 0.075)) + displayWidth * 0.125, Math.floor(Math.random() * 3200) - 3200
        , noWasteObjects[Math.floor(Math.random() * noWasteObjects.length)]);
    } 
}

function draw() {
    background(255);

    // Set boundaries
    if (collect.x < width * 0.03) {
        collect.x = width * 0.97;
    } else if (collect.x > width * 0.98) {
        collect.x = width * 0.04
    } else {
        collect.move();
    }  

    // Start screen 
    if (currentLevel == -1) {
        image(startScreen, displayWidth * 0.05, 0, displayWidth - 80, displayHeight - 150);
        texts.start();
    }

    // Instructions screen
    if (currentLevel == 0) {
        image(startScreen, displayWidth * 0.05, 0, displayWidth - 80, displayHeight - 150);
        texts.instructions();
    }

    // Level 1 
    if (currentLevel == 1) {
        image(level1Background, displayWidth * 0.05, 0, displayWidth - 80, displayHeight - 150);
        texts.level1();

        collect.show(recycle);
        texts.score1(scoreNumber1);

        for (let i = goodFallingObjects[0].length - 1; i >= 0; i--) {
            goodFallingObjects[0][i].show();  
            goodFallingObjects[0][i].move();
            
            if (collect.hits(goodFallingObjects[0][i])) {
                goodFallingObjects[0].splice(i, 1);
                scoreNumber1++;
            } else if (goodFallingObjects[0][i].y > height) {
                goodFallingObjects[0].splice(i, 1); 
            }  
        }

        for (let i = badFallingObjects[0].length - 1; i >= 0; i--) {
            badFallingObjects[0][i].show();  
            badFallingObjects[0][i].move();
            
            if (collect.hits(badFallingObjects[0][i])) {
                badFallingObjects[0].splice(i, 1);
                scoreNumber1--;
            } else if (badFallingObjects[0][i].y > height) {
                badFallingObjects[0].splice(i, 1); 
            }  
        }
    }

    // End Screen for level 1
    if (goodFallingObjects[0].length == 0 && badFallingObjects[0].length == 0) {
        texts.end(scoreNumber1, loseScreen, winScreen, 15);
    }

    // Level 2 
    if (currentLevel == 2) {
        image(level2Background, displayWidth * 0.05, 0, displayWidth - 80, displayHeight - 150);
        texts.level2();

        collect.show(foodWaste);
        texts.score2(scoreNumber2);

        for (let i = goodFallingObjects[1].length - 1; i >= 0; i--) {
            goodFallingObjects[1][i].show();  
            goodFallingObjects[1][i].move();
            
            if (collect.hits(goodFallingObjects[1][i])) {
                goodFallingObjects[1].splice(i, 1);
                scoreNumber2++;
            } else if (goodFallingObjects[1][i].y > height) {
                goodFallingObjects[1].splice(i, 1); 
            }  
        }

        for (let i = badFallingObjects[1].length - 1; i >= 0; i--) {
            badFallingObjects[1][i].show();  
            badFallingObjects[1][i].move();
            
            if (collect.hits(badFallingObjects[1][i])) {
                badFallingObjects[1].splice(i, 1);
                scoreNumber2--;
            } else if (badFallingObjects[1][i].y > height) {
                badFallingObjects[1].splice(i, 1); 
            }  
        }
    }

    // End Screen for level 2
    if (goodFallingObjects[1].length == 0 && badFallingObjects[1].length == 0) {
        texts.end(scoreNumber2, loseScreen, winScreen, 20);
    }

    // Level 3
    if (currentLevel == 3) {
        image(level3Background, displayWidth * 0.05, 0, displayWidth - 80, displayHeight - 150);
        texts.level3();

        collect.show(waste);
        texts.score3(scoreNumber3);

        for (let i = goodFallingObjects[2].length - 1; i >= 0; i--) {
            goodFallingObjects[2][i].show();  
            goodFallingObjects[2][i].move();
            
            if (collect.hits(goodFallingObjects[2][i])) {
                goodFallingObjects[2].splice(i, 1);
                scoreNumber3++;
            } else if (goodFallingObjects[2][i].y > height) {
                goodFallingObjects[2].splice(i, 1); 
            }  
        }

        for (let i = badFallingObjects[2].length - 1; i >= 0; i--) {
            badFallingObjects[2][i].show();  
            badFallingObjects[2][i].move();
            
            if (collect.hits(badFallingObjects[2][i])) {
                badFallingObjects[2].splice(i, 1);
                scoreNumber3--;
            } else if (badFallingObjects[2][i].y > height) {
                badFallingObjects[2].splice(i, 1); 
            }  
        }
    }

    // End Screen for level 3
    if (scoreNumber3 < 25 && goodFallingObjects[2].length == 0 && badFallingObjects[2].length == 0) {
        texts.end(scoreNumber3, loseScreen, winScreen, 25);
    } else if (scoreNumber3 >= 25 && goodFallingObjects[2].length == 0) {
        texts.final(scoreNumber1, scoreNumber2, scoreNumber3, startScreen);
        texts.restart();
    }
}

// Called everytime I release a key
function keyReleased() { 
    if (key != ' ') {
        collect.setDir(0);
    }
}

// Called everytime I press a key
function keyPressed() {

    // Change to next level 
    if (keyCode == ENTER && currentLevel == -1) {
        currentLevel = 0;
    } else if (keyCode == ENTER && scoreNumber1 == 0) {
        currentLevel = 1;
    } 
    if (keyCode == ENTER && scoreNumber1 >= 15 && goodFallingObjects[0].length == 0) {
        currentLevel = 2;
    } 
    if (keyCode == ENTER && scoreNumber2 >= 20 && goodFallingObjects[1].length == 0) {
        currentLevel = 3;
    } 

    // Restart current level
    if (keyCode == ENTER && scoreNumber1 < 15 && goodFallingObjects[0].length == 0) {
        currentLevel = 1;  
        scoreNumber1 = 0;       
        for (let c = 0; c < 75; c++) {
            goodFallingObjects[0][c] = new Objects(Math.floor(Math.random() * width - (displayWidth * 0.075)) + displayWidth * 0.125, Math.floor(Math.random() * 3200) - 3200
            , recycleObjects[Math.floor(Math.random() * recycleObjects.length)]);
        }
        for (let c = 0; c < 50; c++) {
            badFallingObjects[0][c] = new Objects(Math.floor(Math.random() * width - (displayWidth * 0.075)) + displayWidth * 0.125, Math.floor(Math.random() * 3200) - 3200
            , noRecycleObjects[Math.floor(Math.random() * noRecycleObjects.length)]);
        }
    } else if (keyCode == ENTER && scoreNumber2 < 20 && goodFallingObjects[1].length == 0) {
        currentLevel = 2;  
        scoreNumber2 = 0;       
        for (let c = 0; c < 75; c++) {
            goodFallingObjects[1][c] = new Objects(Math.floor(Math.random() * width - (displayWidth * 0.075)) + displayWidth * 0.125, Math.floor(Math.random() * 3200) - 3200
            , foodWasteObjects[Math.floor(Math.random() * foodWasteObjects.length)]);
        }
        for (let c = 0; c < 50; c++) {
            badFallingObjects[1][c] = new Objects(Math.floor(Math.random() * width - (displayWidth * 0.075)) + displayWidth * 0.125, Math.floor(Math.random() * 3200) - 3200
            , noFoodWasteObjects[Math.floor(Math.random() * noFoodWasteObjects.length)]);
        }
    } else if (keyCode == ENTER && scoreNumber3 < 25 && goodFallingObjects[2].length == 0) {
        currentLevel = 3;  
        scoreNumber3 = 0;       
        for (let c = 0; c < 75; c++) {
            goodFallingObjects[2][c] = new Objects(Math.floor(Math.random() * width - (displayWidth * 0.075)) + displayWidth * 0.125, Math.floor(Math.random() * 3200) - 3200
            , wasteObjects[Math.floor(Math.random() * wasteObjects.length)]);
        }
        for (let c = 0; c < 50; c++) {
            badFallingObjects[2][c] = new Objects(Math.floor(Math.random() * width - (displayWidth * 0.075)) + displayWidth * 0.125, Math.floor(Math.random() * 3200) - 3200
            , noWasteObjects[Math.floor(Math.random() * noWasteObjects.length)]);
        }
    } else if (keyCode == ENTER && goodFallingObjects[0].length == 0 && goodFallingObjects[1].length == 0 && goodFallingObjects[2].length == 0) {
        currentLevel = -1;
        scoreNumber1 = 0;
        scoreNumber2 = 0;
        scoreNumber3 = 0;
        for (let c = 0; c < 75; c++) {
            goodFallingObjects[0][c] = new Objects(Math.floor(Math.random() * width - (displayWidth * 0.075)) + displayWidth * 0.125, Math.floor(Math.random() * 3200) - 3200
            , recycleObjects[Math.floor(Math.random() * recycleObjects.length)]);
            goodFallingObjects[1][c] = new Objects(Math.floor(Math.random() * width - (displayWidth * 0.075)) + displayWidth * 0.125, Math.floor(Math.random() * 3200) - 3200
            , foodWasteObjects[Math.floor(Math.random() * foodWasteObjects.length)]);
            goodFallingObjects[2][c] = new Objects(Math.floor(Math.random() * width - (displayWidth * 0.075)) + displayWidth * 0.125, Math.floor(Math.random() * 3200) - 3200
            , wasteObjects[Math.floor(Math.random() * wasteObjects.length)]);
        } 
        
        for (let c = 0; c < 50; c++) {
            badFallingObjects[0][c] = new Objects(Math.floor(Math.random() * width - (displayWidth * 0.075)) + displayWidth * 0.125, Math.floor(Math.random() * 3200) - 3200
            , noRecycleObjects[Math.floor(Math.random() * noRecycleObjects.length)]);
            badFallingObjects[1][c] = new Objects(Math.floor(Math.random() * width - (displayWidth * 0.075)) + displayWidth * 0.125, Math.floor(Math.random() * 3200) - 3200
            , noFoodWasteObjects[Math.floor(Math.random() * noFoodWasteObjects.length)]);
            badFallingObjects[2][c] = new Objects(Math.floor(Math.random() * width - (displayWidth * 0.075)) + displayWidth * 0.125, Math.floor(Math.random() * 3200) - 3200
            , noWasteObjects[Math.floor(Math.random() * noWasteObjects.length)]);
        } 
    } else if (keyCode == UP_ARROW && goodFallingObjects[0].length == 0 && goodFallingObjects[1].length == 0 && goodFallingObjects[2].length == 0) {
        window.location.href = "/Michael's Minigames/Minigame2/index.html"
    }

    // Moving left and right
    if (keyCode == RIGHT_ARROW) {
        collect.setDir(1);
    } else if (keyCode == LEFT_ARROW) {
        collect.setDir(-1);
    }
}

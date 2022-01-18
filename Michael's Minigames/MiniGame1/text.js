function Text(font) {

    let width = displayWidth - 30;
    let height = displayHeight - 130;

    this.score1 = function(score) {
        textFont(font);
        textSize(30);
        fill("white");
        text("Score: " + score + "/15", width * 0.01, height * 0.05);    
    }

    this.score2 = function(score) {
        textFont(font);
        textSize(30);
        fill("white");
        text("Score: " + score + "/20", width * 0.01, height * 0.05);    
    }

    this.score3 = function(score) {
        textFont(font);
        textSize(30);
        fill("white");
        text("Score: " + score + "/25", width * 0.01, height * 0.05);    
    }

    this.instructions = function() {
        textFont(font);
        textSize(75);
        fill("white");
        text("Instructions: ", width * 0.33, height * 0.125);   

        textSize(35);
        text("[1] Sort the garbage into the correct bin", width * 0.26, height * 0.22);    
        text("[2] Don't collect the red objects!", width * 0.26, height * 0.3);  
        text("[3] Each correct garbage sorted adds 1 points", width * 0.26, height * 0.38); 
        text("[4] Top left of the screen shows the required points", width * 0.26, height * 0.46);  
        text("[5] Fulfill required points to move onto the next level", width * 0.26, height * 0.54);   
        text("[6] Right and left arrow to move", width * 0.26, height * 0.62);    
        text("[7] Have fun!", width * 0.26, height * 0.7); 

        textSize(50);
        text("Press ENTER to begin", width * 0.34, height * 0.96);     
    }

    this.level1 = function() {
        textFont(font);
        textSize(45);
        fill("white");
        text("Recycle Level", width * 0.43, height * 0.05);    
    }

    this.level2 = function() {
        textFont(font);
        textSize(45);
        fill("white");
        text("Food Waste Level", width * 0.42, height * 0.05);    
    }

    this.level3 = function() {
        textFont(font);
        textSize(45);
        fill("white");
        text("Landfill Level", width * 0.42, height * 0.05);    
    }

    this.start = function() {
        textFont(font);
        textSize(170);
        fill("white");
        text("Garbage", width * 0.28, height * 0.43);    
        text("Collection", width * 0.33, height * 0.63);    
        textSize(50);
        text("Press ENTER to start", width * 0.38, height * 0.96);    
    }

    this.end = function(score, lose, win, level) {
        textFont(font);
        textSize(50);
        fill("white");
        if (score >= level) {
            image(win, 0, 0, displayWidth - 30, displayHeight - 130);
            text("Thank you for helping the environment", width * 0.265, height * 0.45);    
            text("Press ENTER to move onto the next level", width * 0.25, height * 0.55);    
        } else {
            image(lose, 0, 0, displayWidth - 30, displayHeight - 130);
            text("You were not successful would you like to try again?", width * 0.15, height * 0.45);   
            text("Press ENTER to try again", width * 0.35, height * 0.55);     
        }
    }

    this.final = function(scoreNumber1, scoreNumber2, scoreNumber3, showImage) {
        textFont(font);
        image(showImage, 0, 0, displayWidth - 30, displayHeight - 130);
        textSize(60);
        fill("white");
        text("Thank you for playing", width * 0.34, height * 0.15);
        textSize(40);
        text("Scores:", width * 0.46, height * 0.3);
        text("First Game: " + scoreNumber1, width * 0.42, height * 0.4);
        text("Second Game: " + scoreNumber2, width * 0.42, height * 0.5);
        text("Third Game: " + scoreNumber3, width * 0.42, height * 0.6);
        textSize(50);
        text("Press 'up arrow' to play next game", width * 0.27, height * 0.94);

    }

    this.restart = function() {
        textFont(font);
        textSize(40);
        fill("white");
        text("Press ENTER to play again", width * 0.36, height * 0.8);     
    }
}
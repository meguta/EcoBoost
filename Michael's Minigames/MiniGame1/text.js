function Text() {
    this.score1 = function(score) {
        textSize(20);
        fill("white");
        text("Score: " + score + "/15", 5, 25);    
    }

    this.score2 = function(score) {
        textSize(20);
        fill("white");
        text("Score: " + score + "/20", 5, 25);    
    }

    this.score3 = function(score) {
        textSize(20);
        fill("white");
        text("Score: " + score + "/25", 5, 25);    
    }

    this.instructions = function() {
        textSize(30);
        fill("white");
        text("Instructions: ", 200, 100);   

        textSize(20);
        text("[1] Sort the garbage into the correct bin", 100, 150);    
        text("[2] Don't collect the red objects!", 100, 175);  
        text("[3] Each correct garbage sorted adds 1 points", 100, 200); 
        text("[4] Top left of the screen shows the required points", 100, 225);  
        text("[5] Fulfill required points to move onto the next level", 100, 250);    
        text("[5] Have fun!", 100, 275); 

        textSize(30);
        text("Press ENTER to start", 150, 325);     
    }

    this.level1 = function() {
        textSize(20);
        fill("white");
        text("Recycle Level", 245, 25);    
    }

    this.level2 = function() {
        textSize(20);
        fill("white");
        text("Food Waste Level", 235, 25);    
    }

    this.level3 = function() {
        textSize(20);
        fill("white");
        text("Landfill Level", 245, 25);    
    }

    this.start = function() {
        textSize(25);
        fill("white");
        text("Welcome to Garbage Collection", 120, 170);    
        text("Press ENTER to start", 180, 210);    
    }

    this.end = function(score, lose, win, level) {
        textSize(20);
        fill("white");
        if (score >= level) {
            image(win, 0, 0, 600, 400);
            text("Thank you for helping the environment", 130, 190);    
            text("Press ENTER to move onto the next level", 115, 220);    
        } else {
            image(lose, 0, 0, 600, 400);
            text("You were not successful would you like to try again?", 75, 190);   
            text("Press ENTER to try again", 180, 220);     
        }
    }

    this.final = function(scoreNumber1, scoreNumber2, scoreNumber3, showImage) {
        image(showImage, 0, 0, 600, 400);
        textSize(30);
        fill("white");
        text("Thank you for playing", 155, 75);
        textSize(20);
        text("Scores:", 260, 145);
        text("First Game: " + scoreNumber1, 230, 180);
        text("Second Game: " + scoreNumber2, 230, 210);
        text("Third Game: " + scoreNumber3, 230, 240);
    }

    this.restart = function() {
        textSize(25);
        fill("white");
        text("Press ENTER to play again", 150, 350);
    }
}
$(document).ready(function() {
    // Create a function that creates the start button and initial screen
    
    function initialScreen() {
        startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Click here BOO!</a></p>";
        $(".mainArea").html(startScreen);
    }
    
    initialScreen();
    
    //Create a function, generateHTML(), that is triggered by the start button, and generates the HTML
    
    $("body").on("click", ".start-button", function(event){
        //event.preventDefault();  // added line to test issue on GitHub Viewer
        clickSound.play();
        generateHTML();
    
        timerWrapper();
    
    }); // Closes start-button click
    
    $("body").on("click", ".answer", function(event){
        //answeredQuestion = true;
        clickSound.play();
        selectedAnswer = $(this).text();
        if(selectedAnswer === correctAnswers[questionCounter]) {
            //alert("correct");
    
            clearInterval(theClock);
            generateWin();
        }
        else {
            //alert("wrong answer!");
            clearInterval(theClock);
            generateLoss();
        }
    }); // Close .answer click
    
    $("body").on("click", ".reset-button", function(event){
        clickSound.play();
        resetGame();
    }); // Closes reset-button click
    
    });  //  Closes jQuery wrapper
    
    function generateLossDueToTimeOut() {
        unansweredTally++;
        gameHTML = "<p class='text-center timer-p'><span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/images/neversaydie.jpg'>";
        $(".mainArea").html(gameHTML);
        setTimeout(wait, 4000);  //  change to 4000 or other amount
    }
    
    function generateWin() {
        correctTally++;
        gameHTML = "<p class='text-center timer-p'><span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
        $(".mainArea").html(gameHTML);
        setTimeout(wait, 4000);  //  change to 4000 or other amount
    }
    
    function generateLoss() {
        incorrectTally++;
        gameHTML = "<p class='text-center timer-p'><span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/images/monster.jpg'>";
        $(".mainArea").html(gameHTML);
        setTimeout(wait, 4000); //  change to 4000 or other amount
    }
    
    function generateHTML() {
        gameHTML = "<p class='text-center timer-p'><span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
        $(".mainArea").html(gameHTML);
    }
    
    function wait() {
        if (questionCounter < 7) {
        questionCounter++;
        generateHTML();
        counter = 30;
        timerWrapper();
        }
        else {
            finalScreen();
        }
    }
    
    function timerWrapper() {
        theClock = setInterval(thirtySeconds, 1000);
        function thirtySeconds() {
            if (counter === 0) {
                clearInterval(theClock);
                generateLossDueToTimeOut();
            }
            if (counter > 0) {
                counter--;
            }
            $(".timer").html(counter);
        }
    }
    
    function finalScreen() {
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
        $(".mainArea").html(gameHTML);
    }
    
    function resetGame() {
        questionCounter = 0;
        correctTally = 0;
        incorrectTally = 0;
        unansweredTally = 0;
        counter = 30;
        generateHTML();
        timerWrapper();
    }
    
    var startScreen;
    var gameHTML;
    var counter = 30;
    var questionArray = ["Who plays Frankenstein in the 1974 film, Young Frankenstein?", "Which movie features numerous monster including a roc, a cyclops and a dragon?", "Which of these monster could be seen in the 2010 movie, The Clash of the Titans?", "Who plays the character of Freddy Krueger?", "What monster is genetically engineered in a 2010 monster film?", "What is a Minotaur?", "whose grave is being excavated in the 1999 film, The Mummy?", "What kind of monster is the 'Maneater' in the 2007 film Maneater?"];
    var answerArray = [["John Candy", "Gene Wilder", "Tom Hanks", "Marty Feldman"], ["Island of Terror","The 7th voyage of Sinbad","The Castle of the monsters","Monsters"], ["A Kraken, a Pegasus and the Stygian Witches", "A dragon, Medusa and a Vampire", "A Pegasus, a Genie and a Sphinx", "The Stygian Withes, Sirens and Harpies"], ["Sean Penn","Robert Englund","Jeremy Irons","Ed Call"], ["Sharktopus", "Squidcroc", "Whaleshark", "Croctopus"], ["1/2 man 1/2 eagle","1/2 bull 1/2 snake","1/2 man 1/2 bull","1/2 lion 1/2 snake"], ["Khufu", "Nefer", "Imhotep", "Rammesses"], ["Shark","Alien","Tiger","Crocodile"]];
    var imageArray = ["<img class='center-block img-right' src='assets/images/frankmonster.jpg'>", "<img class='center-block img-right' src='assets/images/cyclops.jpg'>", "<img class='center-block img-right' src='assets/images/kraken.jpg'>", "<img class='center-block img-right' src='assets/images/kruger.jpg>", "<img class='center-block img-right' src='assets/images/gifsharktopus.gif>", "<img class='center-block img-right' src='assets/images/Minotaur.jpg>", "<img class='center-block img-right' src='assets/images/Imhotep.jpg>", "<img class='center-block img-right' src='assets/images/tiger.jpg>"];
    var correctAnswers = ["B. Gene Wilder", "B. The 7th voyage of Sinbad", "A. A Kraken, a Pegasus and the Stygian Witches", "B. Robert Englund", "A. Sharktopus", "C. 1/2 man 1/2 bull", "C. Imhotep", "C. Tiger"];
    var questionCounter = 0;
    var selecterAnswer;
    var theClock;
    var correctTally = 0;
    var incorrectTally = 0;
    var unansweredTally = 0;
    var clickSound = new Audio("assets/sound/01 - Monster Mash.mp3");
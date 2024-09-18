var buttonColors = ["red" , "blue" , "green" , "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keypress(function(){
    if(!started)
    {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }

});

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
    
    // console.log(userChosenColour);
});

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length === gamePattern.length){
        setTimeout(function(){
            nextSequence();}, 1000);
            userClickedPattern = [];
        }
        
    }
    else {
        
        $("#level-title").text("Game Over. Level - " + level);
        $("body").addClass("game-over");
        playSound("wrong");
        setTimeout(function(){
            $("body").removeClass("game-over");} , 2000);
        setTimeout(function(){
            $("#level-title").text("Press A Key to Start");} , 2000);
            started = false;
            level = 0;
            gamePattern = [];
            userClickedPattern = [];


  
      }

}


function nextSequence(){
    level++;
$("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor)
$("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
var audio = new Audio("sounds/" + randomChosenColor + ".mp3");
audio.play();

}


function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
audio.play();

}

function animatePress(currentColor){
    $("#"+ currentColor).addClass("pressed");

    setTimeout(function(){
        $("#"+ currentColor).removeClass("pressed");} , 100);

};



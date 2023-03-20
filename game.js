var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;


//  Game start
 $(document).keypress(function() {
  if (!started){
  nextSequence();
  
  started = true;
  };
});

// sequence of the game
 function nextSequence() {
  level++;
  userClickedPattern = [];
  $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeTo(100, 0.3, function() { $(this).fadeTo(500, 1.0); });
     var audio = new Audio("sounds/" + randomChosenColor + ".mp3");
      audio.play();
 
};
 
// click trigger
$(".btn").click(function() {
 var userChosenColor = $(this).attr("id");
 userClickedPattern.push(userChosenColor);
 playSound(userChosenColor);
 animatePress(userChosenColor);
 checkAnswer(userClickedPattern.length - 1);
});

// Sound and Animation
function animatePress(currentColor){
  $("." + currentColor).addClass("pressed").delay(100).queue(function(next) {
    $(this).removeClass("pressed");
    next();
});
};

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
      audio.play();
};

// Answer check
function checkAnswer(currentLevel){
  
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
  
    if(userClickedPattern.length === gamePattern.length){
      console.log("success");
      setTimeout(function(){
          nextSequence();
        }, 1000);
    };
    
  } else {
    console.log("wrong");
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },200);
      $("h1").text("Game Over, Press Any Key to Restart");
      startOver();
  };
};
 
// Reset every variable -------------
 
function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
};
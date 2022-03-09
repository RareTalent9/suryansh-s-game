var buttonColors = ["red", "blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

//Press any key to continue
$(document).keypress(function(){
  if(!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


// Check Which Button is Pressed
$(".btn").click(function (event){
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

//carry out the pattern of game
function nextSequence(){
  userClickedPattern=[];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];
  $("#"+randomChosenColor).fadeTo('fast',0).fadeTo('fast',1)
  playSound(randomChosenColor);
  gamePattern.push(randomChosenColor);
}

//Play Color Sound
function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}


//animation when the buttons are clicked
function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setInterval(function(){$("#"+currentColor).removeClass("pressed")},100);
}

//checking the answer against the user's answer
function checkAnswer(currentLevel){
if(userClickedPattern[currentLevel] === gamePattern[currentLevel])
{
  console.log("Success");
  if(userClickedPattern.length === gamePattern.length)
  {
    setTimeout(function(){
      nextSequence();
    },1000);
  }
}
else
{
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  },200);
  var audio = new Audio("sounds/wrong.mp3");
  audio.play();
  $("#level-title").text("Game Over, Press Any Key To Restart");
  startOver();
}
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}

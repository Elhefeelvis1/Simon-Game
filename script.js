// Declaration and assignment

let btnColours = ['green', 'red', 'yellow', 'blue'];
let clickPattern = []
let pattern = [];
let num = 0;
let numClicks = 1;

// Functions

function nextSequence(arr){
    let randomNumbers = Math.floor((Math.random())*4);
    pattern.push(arr[randomNumbers]);

    $('h1').text("Level " + ++num);
    $("#" + arr[randomNumbers]).fadeOut().fadeIn();
}

function pressed(btn){
    btn.addClass('pressed');
    setTimeout(function(){
        btn.removeClass('pressed');
    }, 100)
}

function checkArr(a, b){
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
    
    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

function wrong(){
    $('h1').text('Game Over');
    new Audio('sounds/wrong.mp3').play();
    $("body").addClass("wrong");
    setTimeout(function(){
        $("body").removeClass("wrong");
        $('h1').text('Press A Key to Start');
    }, 200);

    num = 0;
    clickPattern = [];
    pattern = [];
}

// Keypress

$(document).keypress(function(){
    if(num <= 0){
        nextSequence(btnColours);
    }
})

// Button Click Notifier

$('.row > div').click(function(){
    let btn = $(this).attr('id');
    new Audio('sounds/' + btn + '.mp3').play();
    pressed($(this));

    if(num > 0){
        clickPattern.push(btn);
        
        if(pattern.length === clickPattern.length){
            if(checkArr(pattern, clickPattern)){
                clickPattern = [];
                numClicks = 0;
                nextSequence(btnColours);
            }else{
                wrong();
            }
        }else{
            if(pattern[numClicks] !== clickPattern[numClicks]){
                wrong();
            }
            numClicks++
        }
    }
});
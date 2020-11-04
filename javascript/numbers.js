let specialNum = 0, len = 1, keepGoing = true;

$(document).ready(function(){
    $('#num-area').hide();
    $('#random-wrapper').hide();
    $('#correct').hide();
    $('#incorrect').hide();
    $('#stats').hide();
    $('body').css('overflow', 'hidden');
});

function randomNum() {
    let str = "";
    for(let j = 0; j < len; j++) {
        str += Math.floor(Math.random() * 9);
    }
    specialNum = str;
    $('#random').text(specialNum);
}

function timerBar() {
    let i = 0, width = 0;
    if(i == 0) {
        i = 1;
        let interval = setInterval(increment, 28);
        function increment() {
            if(width >= 100) {
                clearInterval(interval);
                i = 0;
            } else {
                width++;
                $('#bar').css('width', width + "%");
            }
        }
    }
}

function checkAnswer() {
    $('#submit').off('click');
    let val = $('#num').val();
    if(val == specialNum) {
        $('#correct-answer').text(specialNum);
        $('#your-answer').text(val);
    } else {
        keepGoing = false;
        $('#correct-answer-i').text(specialNum);
        $('#your-answer-i').text(val);
    }
    len++;
    continueGame();
}

function reset() {
    len = 1;
    keepGoing = true;
    $('#next').css('pointer-events', 'auto');
    $('#bar').css('width', '0%');
    $('#num').val('');
    $('#stats').hide();
    $('#open-wrapper').fadeIn(1000);
}

function stats() {
    $('body').css('background-color', 'white');
    $('#incorrect').hide(500);
    if(len - 1 > 7) {
        $('#stats-avg').text('Your score is above average!');
    } else if(len - 1 < 7) {
        $('#stats-avg').text('Your score is below average...');
    } else {
        $('#stats-avg').text('Your score is average!');
    }
    $('#stats').show(500);
    $('#try-again').click(reset);
}

function endGame() {
    $('#num-area').hide();
    $('#incorrect').show(500);
    $('body').css('background-color', '#db7272');
    $('#continue-i').click(stats);
}

function furtherGame() {
    $('#continue').off('click');
    $('#bar').css('width', '0%');
    $('#num').val('');
    $('#correct').fadeOut(1000);
    setTimeout(function(){
        randomNum();
        $('#random-wrapper').fadeIn(1000);
        $('body').css('background-color', 'white');
    }, 1000);
    setTimeout(timerBar, 2000);
    setTimeout(function(){
        $('#random-wrapper').hide();
        $('#num-area').show();
        $('#submit').click(checkAnswer);
    }, 4830);
}

function continueGame() {
    if(keepGoing == true) {
        $('#num-area').hide();
        $('#correct').show(500);
        $('body').css('background-color', '#70cc96');
        $('#continue').click(furtherGame);
    } else {
        endGame();
    }
}

function newGame(){
    $('#next').css('pointer-events', 'none');
    $('#open-wrapper').fadeOut(1000);
    setTimeout(function(){
        randomNum();
        $('#open-wrapper').hide();
        $('#random-wrapper').fadeIn(1000);
    }, 1000);
    setTimeout(timerBar, 2000);
    setTimeout(function(){
        $('#random-wrapper').hide();
        $('#num-area').show();
        $('#submit').click(checkAnswer);
    }, 4830);
}

$('#next').click(newGame);
let nCell, nLetter = [];
let currentCell, currentLetter;
let time;
let correct;
let totalCorrect = 0;
let gamesPlayed = 1;
let j;
let hasRun, rightAnswer;
let n = 1;

$(document).ready(function(){
    $('#back-wrap').hide();
    $('#round-end').hide();
    $('body').css('overflow', 'hidden');
});

function newGame(){
    $('#next').off('click');
    $('#open-wrapper').fadeOut(1500);
    $('#back-wrap').fadeIn(1500);
    startTest();
    clickCount();
}

function randomCell(){
    return Math.floor(Math.random() * 9);
}

function randomLetter(){
    return Math.floor(Math.random() * 5);
}

function playAudio(a){
    switch (a) {
    case 0:
        $('audio#k-audio')[0].play();
        break;
    case 1:
        $('audio#n-audio')[0].play();
        break;
    case 2:
        $('audio#o-audio')[0].play();
        break;
    case 3:
        $('audio#t-audio')[0].play();
        break;
    case 4:
        $('audio#x-audio')[0].play();
        break;
    }
}

function stimuli(t){
    setTimeout(function(){
        $('#round').text("Round: " + (j + 1));
        if(j > n - 1) {
            if(!hasRun){
                if(currentCell == nCell[j - n] || currentLetter == nLetter[j - n]) {
                    $('#game-grid').css('box-shadow', '0px 0px 50px #db7272');
                    setTimeout(function(){
                        $('#game-grid').css('box-shadow', '0px 0px 0px white');
                    }, 500);
                } else {
                    $('#game-grid').css('box-shadow', '0px 0px 50px #70cc96');
                    setTimeout(function(){
                        $('#game-grid').css('box-shadow', '0px 0px 0px white');
                    }, 500);
                    correct++;
                }
            } else if(rightAnswer) {
                $('#game-grid').css('box-shadow', '0px 0px 50px #70cc96');
                setTimeout(function(){
                    $('#game-grid').css('box-shadow', '0px 0px 0px white');
                }, 500);
                correct++;
            } else {
                $('#game-grid').css('box-shadow', '0px 0px 50px #db7272');
                setTimeout(function(){
                    $('#game-grid').css('box-shadow', '0px 0px 0px white');
                }, 500);
            }
        }
        hasRun = false;
        rightAnswer = false;
        currentCell = randomCell();
        nCell.push(currentCell);
        currentLetter = randomLetter();
        nLetter.push(currentLetter);
        $('#' + currentCell).css('background-color', '#ed5f5f');
        playAudio(currentLetter);
        setTimeout(function(){
            $('#' + currentCell).css('background-color', 'white');
        }, 500);
        j++;
    }, t);
}

function checkAnswer(){
    hasRun = true;
    if(currentCell == nCell[j - n] || currentLetter == nLetter[j - n]) {
        rightAnswer = true;
    }
}

function clickCount(){
    $(document).keyup(function(e){
        if(e.which == 32){
            $('#match').css('background-color', '#4e8df2');
            $('#match').css('box-shadow', '0px 0px 18px #4e8df2');
            $('#match').css('color', 'white');
            setTimeout(function(){
                $('#match').css('background-color', 'white');
                $('#match').css('box-shadow', '0px 0px 0px black');
                $('#match').css('color', 'black');
                checkAnswer();
            }, 300);
            document.onkeyup = function(f){
                return false;
            };
            document.onkeyup = function(f){
                return true;
            };
        }
    });
    $('#match').click(function(){
        $('#match').blur();
        $('#match').css('background-color', '#4e8df2');
        $('#match').css('box-shadow', '0px 0px 18px #4e8df2');
        $('#match').css('color', 'white');
        setTimeout(function(){
            $('#match').css('background-color', 'white');
            $('#match').css('box-shadow', '0px 0px 0px black');
            $('#match').css('color', 'black');
            checkAnswer();
        }, 300);
    });
}

function startTest(){
    if(correct < 14){
        if(n == 2) {
            n--;
        } else {
            n -= 2;
        }
    }
    $('#n-test').text(n + "-back test");
    j = 0;
    correct = 0;
    nCell = [];
    nLetter = [];
    currentCell = 99;
    currentLetter = 99;
    time = 3000;
    hasRun = false;
    rightAnswer = false;
    for(let i = 0; i < 15; i++){
        stimuli(time);
        time += 3000;
    }
    endRound();
    n++;
}

function endRound(){
    setTimeout(function(){
        $('#round').text("Round: " + (j + 1));
        if(!hasRun){
            if(currentCell == nCell[j - n] || currentLetter == nLetter[j - n]) {
                $('#game-grid').css('box-shadow', '0px 0px 50px #db7272');
                setTimeout(function(){
                    $('#game-grid').css('box-shadow', '0px 0px 0px white');
                }, 500);
            } else {
                $('#game-grid').css('box-shadow', '0px 0px 50px #70cc96');
                setTimeout(function(){
                    $('#game-grid').css('box-shadow', '0px 0px 0px white');
                }, 500);
                correct++;
            }
        } else if(rightAnswer) {
            $('#game-grid').css('box-shadow', '0px 0px 50px #70cc96');
            setTimeout(function(){
                $('#game-grid').css('box-shadow', '0px 0px 0px white');
            }, 500);
            correct++;
        } else {
            $('#game-grid').css('box-shadow', '0px 0px 50px #db7272');
            setTimeout(function(){
                $('#game-grid').css('box-shadow', '0px 0px 0px white');
            }, 500);
        }
        setTimeout(function(){
            $('#back-wrap').fadeOut(1000);
            totalCorrect += correct;
            $('#points').text("Score for this round: " + Math.round(correct / 14 * 100) + "%");
            $('#strikes').text("Total score: " + Math.round(totalCorrect / (14 * gamesPlayed) * 100) + "%");
            setTimeout(function(){
                $('#round-end').show();
                $('#continue').click(function(){
                    $('#continue').off('click');
                    $('#round').text("Round: " + 1);
                    $('#round-end').fadeOut(1000);
                    setTimeout(function(){
                        $('#back-wrap').show();
                        startTest();
                        gamesPlayed++;
                    }, 1000);
                });
            }, 1000);
        }, 3000);
    }, 48000);
}

$('#next').click(newGame);
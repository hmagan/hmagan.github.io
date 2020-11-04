let colorString = [];
let userString = [];
let time, points;

$(document).ready(function(){
    $('#canvas').hide();
    $('#try-again').hide();
    $('#point-count').hide();
    $('body').css('overflow', 'hidden');
});

function newGame(){
    points = 0;
    $('#canvas h4').css('visibility', 'hidden');
    $('#open-wrapper').fadeOut(2000);
    $('#open-wrapper').hide();
    $('.square').css('pointer-events', 'none');
    $('#canvas').fadeIn(2000);
    colorDisplay();
}

function randomColor(){
    let color = Math.floor((Math.random() * 4) + 1);
    colorString.push(color);
}

function colorCSS(){
    time = 500;
    for(let i = 0; i < colorString.length; i++){
        switch(colorString[i]) {
        case 1:
            setTimeout(function(){
                $('#green').css('background-color', '#3fd968');
                $('audio#green-audio')[0].play();
            }, time);
            setTimeout(function(){
                $('#green').css('background-color', '#2d9148');
            }, time + 500);
            break;
        case 2:
            setTimeout(function(){
                $('#red').css('background-color', '#f04a4a');
                $('audio#red-audio')[0].play();
            }, time);
            setTimeout(function(){
                $('#red').css('background-color', '#b53131');
            }, time + 500);
            break;
        case 3:
            setTimeout(function(){
                $('#yellow').css('background-color', '#fae71b');
                $('audio#yellow-audio')[0].play();
            }, time);
            setTimeout(function(){
                $('#yellow').css('background-color', '#c7c428');
            }, time + 500);
            break;
        case 4:
            setTimeout(function(){
                $('#blue').css('background-color', '#4e8df2');
                $('audio#blue-audio')[0].play();
            }, time);
            setTimeout(function(){
                $('#blue').css('background-color', '#2f89c4');
            }, time + 500);
            break;
        }
        time += 1000;
    }
    setTimeout(function(){
        $('#canvas h4').css('visibility', 'visible');
        $('.square').css('pointer-events', 'auto');
        $('.square').css('cursor', 'pointer');
    }, time + 500);
}

function colorDisplay(){
    randomColor();
    setTimeout(colorCSS, 1000);
}

function colorClick(){
    //GREEN CLICK
    $('#green').click(function(){
        userString.push(1);
        $('#green').css('background-color', '#3fd968');
        $('.square').css('pointer-events', 'none');
        $('audio#green-audio')[0].play();
        setTimeout(function(){
            $('#green').css('background-color', '#2d9148');
            setTimeout(function(){
                $('.square').css('pointer-events', 'auto');
                if(colorString.length == userString.length) {
                    endClicks();
                }
            }, 400);
        }, 250);
    });
    //RED CLICK
    $('#red').click(function(){
        userString.push(2);
        $('#red').css('background-color', '#f04a4a');
        $('.square').css('pointer-events', 'none');
        $('audio#red-audio')[0].play();
        setTimeout(function(){
            $('#red').css('background-color', '#b53131');
            setTimeout(function(){
                $('.square').css('pointer-events', 'auto');
                if(colorString.length == userString.length) {
                    endClicks();
                }
            }, 400);
        }, 250);
    });
    //YELLOW CLICK
    $('#yellow').click(function(){
        userString.push(3);
        $('#yellow').css('background-color', '#fae71b');
        $('.square').css('pointer-events', 'none');
        $('audio#yellow-audio')[0].play();
        setTimeout(function(){
            $('#yellow').css('background-color', '#c7c428');
            setTimeout(function(){
                $('.square').css('pointer-events', 'auto');
                if(colorString.length == userString.length) {
                    endClicks();
                }
            }, 400);
        }, 250);
    });
    //BLUE CLICK
    $('#blue').click(function(){
        userString.push(4);
        $('#blue').css('background-color', '#4e8df2');
        $('.square').css('pointer-events', 'none');
        $('audio#blue-audio')[0].play();
        setTimeout(function(){
            $('#blue').css('background-color', '#2c86bf');
            setTimeout(function(){
                $('.square').css('pointer-events', 'auto');
                if(colorString.length == userString.length) {
                    endClicks();
                }
            }, 400);
        }, 250);
    });
}

function endClicks(){
    $('.square').css('pointer-events', 'none');
    $('#canvas h4').text('...');
    if(checkSequence()) {
        setTimeout(function(){
            $('#canvas h4').css('color', '#2deb49');
            $('#canvas h4').text('Correct!');
            userString = [];
            points++;
        }, 2000);
        setTimeout(function(){
            $('#canvas h4').css('color', 'black');
            $('#canvas h4').css('visibility', 'hidden');
            $('#canvas h4').text('What was the sequence?');
            setTimeout(function(){
                colorDisplay();
            }, 750);
        }, 5000);
    } else {
        $('#game-grid').css('pointer-events', 'none');
        setTimeout(function(){
            $('#canvas h4').css('color', '#eb392d');
            $('#canvas h4').text('Incorrect!');
        }, 2000);
        setTimeout(function(){
            $('#canvas h4').css('color', 'black');
            $('#canvas h4').text('Correct sequence: ');
            time = 500;
            for(let i = 0; i < colorString.length; i++){
                switch(colorString[i]) {
                case 1:
                    setTimeout(function(){
                        $('#green').css('background-color', '#3fd968');
                        $('audio#green-audio')[0].play();
                    }, time);
                    setTimeout(function(){
                        $('#green').css('background-color', '#2d9148');
                    }, time + 500);
                    break;
                case 2:
                    setTimeout(function(){
                        $('#red').css('background-color', '#f04a4a');
                        $('audio#red-audio')[0].play();
                    }, time);
                    setTimeout(function(){
                        $('#red').css('background-color', '#b53131');
                    }, time + 500);
                    break;
                case 3:
                    setTimeout(function(){
                        $('#yellow').css('background-color', '#fae71b');
                        $('audio#yellow-audio')[0].play();
                    }, time);
                    setTimeout(function(){
                        $('#yellow').css('background-color', '#c7c428');
                    }, time + 500);
                    break;
                case 4:
                    setTimeout(function(){
                        $('#blue').css('background-color', '#4e8df2');
                        $('audio#blue-audio')[0].play();
                    }, time);
                    setTimeout(function(){
                        $('#blue').css('background-color', '#2f89c4');
                    }, time + 500);
                    break;
                }
                time += 1000;
            }
            setTimeout(function(){
                $('#canvas').fadeOut(2000);
            }, colorString.length * 1000 + 500);
            setTimeout(function(){
                $('#point-count').text("Points: " + points);
                $('#point-count').show();
                $('#try-again').show();
                tryClick();
            }, colorString.length * 1000 + 2500);
        }, 4500);
    }
}

function checkSequence() {
    for(let i = 0; i < colorString.length; i++){
        if(colorString[i] != userString[i]) {
            return false;
        }
    }
    return true;
}

colorClick();

$('#next').click(newGame);

function tryClick() {
    $('#try-again').click(function(){
        $('#try-again').off();
        $('#try-again').fadeOut(1000);
        $('#point-count').fadeOut(1000);
        userString = [];
        colorString = [];
        $('#canvas h4').css('visibility', 'hidden');
        $('.square').css('pointer-events', 'none');
        setTimeout(function(){
            $('#canvas').fadeIn(1000);
            newGame();
        }, 1500);
    });
}
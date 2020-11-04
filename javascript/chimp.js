let squares, squareList, availableSpots, clicks, order, strikes, score;

$(document).ready(function(){
    $('#chimp-area').hide();
    $('#lose').hide();
    $('#strike').hide();
    $('#chimp-text').hide();
    $('body').css('overflow', 'hidden');
});

function newGame(){
    $('#next').off('click');
    $('#open-wrapper').fadeOut(1000);
    setTimeout(function(){
        $('#chimp-area').show();
        $('#chimp-text').show();
    }, 1000);
    squares = 4;
    score = 0;
    strikes = 0;
    randomSpots(squares);
}

function randomSpots(t){
    let current = 1;
    clicks = 0;
    order = 1;
    squareList = [];
    availableSpots = [];
    for(let i = 1; i < 41; i++){
        availableSpots.push(i);
    }
    for(let i = 0; i < t; i++) {
        let spot = recursiveRandom();
        let index = availableSpots.indexOf(spot);
        availableSpots.splice(index, 1);
        squareList.push(spot);
        $('#' + spot).css('border-color', '#ed5f5f');
        $('#' + spot).css('color', 'black');
        $('#' + spot).css('cursor', 'pointer');
        $('#' + spot).on('mouseenter mouseleave');
        $('#' + spot).mouseenter(function(){
            $('#' + spot).css('border-color', '#e89090');
        });
        $('#' + spot).mouseleave(function(){
            $('#' + spot).css('border-color', '#ed5f5f');
        });
        $('#' + spot).text(current);
        $('#' + spot).click(clickSquare);
        current++;
    }
}

function recursiveRandom(){
    let num = Math.floor(Math.random() * 40) + 1;
    while(availableSpots.indexOf(num) == -1){
        num = Math.floor(Math.random() * 40) + 1;
    }
    return num;
}

function clickSquare(){
    if($(this).text() == order){
        if(clicks < 1) {
            for(let i = 0; i < squareList.length; i++){
                $('#' + squareList[i]).css('cursor', 'pointer');
                $('#' + squareList[i]).css('color', '#ed5f5f');
                $('#' + squareList[i]).off('mouseenter mouseleave');
                $('#' + squareList[i]).css('background-color', '#ed5f5f');
                $('#' + squareList[i]).css('border-color', '#ed5f5f');
            }
            $(this).css('border-color', 'white');
            $(this).css('background-color', 'white');
            $(this).css('cursor', 'default');
            $(this).css('color', 'white');
        } else if(clicks == squareList.length - 1) {
            score++;
            $('#points').text('Points: ' + score);
            $('#strikes').text('Strikes: ' + strikes + "/3");
            $('#chimp-area').hide();
            $('#strike').show();
            $('#continue').click(function(){
                $('#strike').fadeOut(1000);
                setTimeout(function(){
                    $('#chimp-area').show();
                    roundReset();
                }, 1000);
                squares++;
                $('#continue').off('click');
            });
        } else {
            $(this).css('border-color', 'white');
            $(this).css('background-color', 'white');
            $(this).css('cursor', 'default');
            $(this).css('color', 'white');
        }
        clicks++;
        order++;
    } else {
        strikes++;
        if(strikes >= 3){
            $('#chimp-area').hide();
            $('#end-points').text("You lost. Total points: " + score);
            $('#lose').show();
            $('#try-again').click(restartGame);
        } else {
            $('#points').text('Points: ' + score);
            $('#strikes').text('Strikes: ' + strikes + "/3");
            $('#chimp-area').hide();
            $('#strike').show();
            $('#continue').click(function(){
                $('#strike').fadeOut(1000);
                setTimeout(function(){
                    $('#chimp-area').show();
                    roundReset();
                }, 1000);
                $('#continue').off('click');
            });
        }
    }
    $(this).off('click');
}

function roundReset(){
    for(let i = 1; i < 41; i++){
        $('#' + i).css('cursor', 'default');
        $('#' + i).css('color', 'black');
        $('#' + i).text('');
        $('#' + i).off('mouseenter mouseleave click');
        $('#' + i).css('background-color', 'white');
        $('#' + i).css('border-color', 'white');
    }
    randomSpots(squares);
}

function restartGame(){
    $('#try-again').off('click');
    squares = 4;
    score = 0;
    strikes = 0;
    $('#lose').fadeOut(1000);
    setTimeout(function(){
        $('#chimp-area').show();
        for(let i = 1; i < 41; i++){
            $('#' + i).css('cursor', 'default');
            $('#' + i).css('color', 'black');
            $('#' + i).text('');
            $('#' + i).off('mouseenter mouseleave click');
            $('#' + i).css('background-color', 'white');
            $('#' + i).css('border-color', 'white');
        }
        randomSpots(squares);
    }, 1000);
}

$('#next').click(newGame);
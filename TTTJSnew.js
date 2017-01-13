
$(Document).ready(function(){
    var playerSymbol = "";
    var compSymbol = "";
    var playerMove = true;
    var moveNum = 0;
    var win = false;
    //TESTING NEW IDEA!
    var playerPicks = [];
    var computerPicks = [];
    var winCombination = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7]
    ]
    
    
    
    function gameStart(){
        var whoStarts = Math.floor(Math.random() * 2 + 1);
        switch(Math.floor(Math.random() * 2 + 1)){
            case 1:
                playerMove = true;
                break;
            case 2:
                playerMove = false;
                checkMove();
                break;
            default:
                playerMove = true;
                break;
        }
    }
    
    function btnClick(val){
        switch(val){
            case 1:
                $('#1').click();
                break;
            case 2:
                $('#2').click();
                break;
            case 3:
                $('#3').click();
                break;
            case 4:
                $('#4').click();
                break;
            case 5:
                $('#5').click();
                break;
            case 6:
                $('#6').click();
                break;
            case 7:
                $('#7').click();
                break;
            case 8:
                $('#8').click();
                break;
            case 9:
                $('#9').click();
                break;
            default:
                break;
        }
    }
    
    function checkWin(){
        console.log('win');
        winCombination.reduce(function(acc, next){
            
            move = 0;
            var match = 0;
            for (var i=0; i < next.length && !playerMove; i++){
                if (computerPicks.indexOf(next[i]) !== -1){
                    match++;
                } else if (playerPicks.indexOf(next[i]) !== -1){
                    match--;
                } else {
                    move = next[i];
                }
                if(i+1 === next.length && match === 2){
                    btnClick(move);
                    win = true;
                    break;
                }
            }
        }, 0);
    }
    function checkBlock(){
        console.log("block");
        winCombination.reduce(function(acc, next){
            
            var move = 0;
            var match = 0;
            for (var i=0; i < next.length && !playerMove; i++){
                console.log(next[i], move, match);
                if (playerPicks.indexOf(next[i]) !== -1){
                    match++;
                } else if (computerPicks.indexOf(next[i]) !== -1){
                    match--;
                }else {
                    move = next[i];
                }
                if(i+1 === next.length && match === 2){
                    btnClick(move);
                    console.log(move, match, playerMove);
                    break;
                }
            }
        }, 0);
    }
    function checkSetup(){
        console.log("setup");
        winCombination.reduce(function(acc, next){
            
            move = 0;
            var match = 0;
            for (var i=0; i < next.length  && !playerMove; i++){
                if (computerPicks.indexOf(next[i]) !== -1){
                    match++;
                } else if (playerPicks.indexOf(next[i]) !== -1) {
                    match--;
                } else {
                    move = next[i];
                }
                if(i+1 === next.length && match === 1){
                    btnClick(move);
                    break;
                }
            }
        }, 0);
    }
    function randomRemainingMove(){
        var used = playerPicks.concat(computerPicks);
        winCombination.reduce(function(acc, next){
            var match = 0;
            var move;
            for(var i=0; i<next.length && !playerMove; i++){
                if (used.indexOf(next[i]) === -1){
                    btnClick(next[i]);
                }
            }
        }, 0);
        console.log(used);
    }
    
    function isDraw(){
        if (moveNum === 9){
            $('#gameDraw').show();
            $('#restartGame').show();
            return;
        }
    }
    
    function checkMove(){
        console.log(playerMove);
        isDraw();
        if (moveNum < 2) {
            if (playerPicks.indexOf(5) === -1){
                $('#5').click();
            } else {
                var val = Math.floor(Math.random() * 4 + 1);
                console.log(val);
                switch(val){
                    case 1:
                        $('#1').click();
                        break;
                    case 2:
                        $('#3').click();
                        break;
                    case 3:
                        $('#7').click();
                        break;
                    case 4:
                        $('#9').click();
                        break;
                    default:
                        break;
                }
            }
        } else {
            checkWin();
            if (win === true){
                $('#compWin').show();
                $('#restartGame').show();
                $('#gameBoard button').prop('disabled', true);
            } else {
                checkBlock();
                if (!playerMove){
                    console.log("Setup");
                    checkSetup();
                    randomRemainingMove();
                }
            }
            
        }
        console.log("Move Number: "+moveNum);
        isDraw();
    }
    
    $('#chooseX').click(function(){
        playerSymbol = "X";
        compSymbol = "O";
        $('#start').hide();
        $('#gameBoard').show();
        gameStart();
    });
    $('#chooseO').click(function(){
        playerSymbol = "O";
        compSymbol = "X";
        $('#start').hide();
        $('#gameBoard').show();
        gameStart();
    });
    $('#newGame').click(function(){
        playerMove = true;
        win = false;
        computerPicks = [];
        playerPicks = [];
        moveNum = 0;
        $("#gameBoard button").html('');
        $('#gameDraw').hide();
        $('#compWin').hide();
        $('#restartGame').hide();
        $('button').prop('disabled', false);
        gameStart();
    });
    
    $("#gameBoard button").click(function(){
        moveNum++;
        this.setAttribute('disabled', 'disabled');
        if (playerMove){
            playerMove = false;
            playerPicks.push(parseInt($(this).attr('id'), 10));
            console.log(playerPicks);
            $(this).html(playerSymbol);
            checkMove();
        } else {
            playerMove = true;
            computerPicks.push(parseInt($(this).attr('id'), 10));
            $(this).html(compSymbol);
        }
        console.log(computerPicks, playerPicks);
    });
});
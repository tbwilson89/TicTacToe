$(Document).ready(function(){
    var myChoice = "O";
    var compChoice = "X";
    
    //TESTING NEW IDEA!
    var tl = [];
    var tm = [];
    var tr = [];
    
    var ml = [];
    var mm = [];
    var mr = [];
    
    var bl = [];
    var bm = [];
    var br = [];
    
    function addValue(btn){
        switch(btn){
            case 'tl':
                tl = NaN;
                tm += 1;
                tr += 1;
                ml += 1;
                mm += 1;
                bl += 1;
                br += 1;
                break;
            case 'tm':
                tm = NaN;
                tl += 1;
                tr += 1;
                mm += 1;
                bm += 1;
                break;
            case 'tr':
                tr = NaN;
                tl += 1;
                tm += 1;
                mm += 1;
                bl += 1;
                mr += 1;
                br += 1;
                break;
            case 'ml':
                ml = NaN;
                tl += 1;
                bl += 1;
                mm += 1;
                mr += 1;
                break;
            case 'mm':
                mm = NaN;
                tl += 1;
                tm += 1;
                tr += 1;
                ml += 1;
                mr += 1;
                bl += 1;
                bm += 1;
                br += 1;
                break;
            case 'mr':
                mr = NaN;
                tr += 1;
                br += 1;
                ml += 1;
                mm += 1;
                break;
            case 'bl':
                bl = NaN;
                tl += 1;
                ml += 1;
                mm += 1;
                tr += 1;
                bm += 1;
                br += 1;
                break;
            case 'bm':
                bm = NaN;
                tm += 1;
                mm += 1;
                bl += 1;
                br += 1;
                break;
            case 'br':
                br = NaN;
                tl += 1;
                mm += 1;
                tr += 1;
                mr += 1;
                bl += 1;
                bm += 1;
                break;
            default:
                break;
        }
        console.log(tl, ml, bl);
    }
    addValue('tl');
    addValue('bl');

    
    //Rows Top - Middle - Bottom
    var rows = {
        top: ['', '', ''],
        mid: ['', '', ''],
        bottom:['', '', '']
    }
    //Columns Left - Middle - Right
    var col = {
        left: ['', '', ''],
        mid: ['', '', ''],
        right: ['', '', '']
    }
    //Diagonals(Starting from top to bottom) Left - Right
    var dia = {
        left: ['', '', ''],
        right: ['', '', '']
    }
    var playerMove = true;
    var win = false;
    var stopSetup = false;
    var moveNum = 0;
    
    //$('button').hide();
    $('#start').hide();
    $('#compWin').hide();
    
    console.log(rows[1]);
    
    //Clicks the space that is calculated as the best move for the computer.
    function computerMove(dir, loc, index){
        console.log(dir, loc, index);
        if(dir === 'rows'){
            if (loc === "top"){
                switch (index){
                    case 0:
                        $('#tl').click();
                        break;
                    case 1:
                        $('#tm').click();
                        break;
                    case 2:
                        $('#tr').click();
                        break;
                    }
            } else if (loc === 'mid'){
                switch (index){
                    case 0:
                        $('#ml').click();
                        break;
                    case 1:
                        $('#mm').click();
                        break;
                    case 2:
                        $('#mr').click();
                        break;
                    default:
                        break;
                    }
            } else if (loc === 'bottom'){
                switch (index){
                    case 0:
                        $('#bl').click();
                        break;
                    case 1:
                        $('#bm').click();
                        break;
                    case 2:
                        $('#br').click();
                        break;
                    default:
                        break;
                    }
            }
        } else if (dir === 'col'){
            if (loc === "left"){
                switch (index){
                    case 0:
                        $('#tl').click();
                        break;
                    case 1:
                        $('#ml').click();
                        break;
                    case 2:
                        $('#bl').click();
                        break;
                    }
            } else if (loc === 'mid'){
                switch (index){
                    case 0:
                        $('#tm').click();
                        break;
                    case 1:
                        $('#mm').click();
                        break;
                    case 2:
                        $('#bm').click();
                        break;
                    default:
                        break;
                    }
            } else if (loc === 'right'){
                switch (index){
                    case 0:
                        $('#tr').click();
                        break;
                    case 1:
                        $('#mr').click();
                        break;
                    case 2:
                        $('#br').click();
                        break;
                    default:
                        break;
                    }
            }
        } else if (dir === 'dia'){
            if (loc === "left"){
                switch (index){
                    case 0:
                        $('#tl').click();
                        break;
                    case 1:
                        $('#mm').click();
                        break;
                    case 2:
                        $('#br').click();
                        break;
                    }
            } else if (loc === 'right'){
                switch (index){
                    case 0:
                        $('#tr').click();
                        break;
                    case 1:
                        $('#mm').click();
                        break;
                    case 2:
                        $('#bl').click();
                        break;
                    default:
                        break;
                    }
            }
        }
        
    }
    
    //Checks through arrays to see where to respond depending on if it can win, set itself up or block.
    function checkBlockSection(key, arr, type){
        accum = 0;
        var counter;
        arr.reduce(function(acc, val ,index){
            if(val === myChoice) {
                accum++;
            } else if (val === compChoice){
                accum--;
            }
            if(val === ''){
                counter = index;
                console.log(counter);
            }
            if (index === 2){
                if (accum === 2){
                    console.log("Block?")
                    computerMove(type, key, counter);
                }
            }
        }, 0);
    }
    function checkSetupSection(key, arr, type){
        accum = 0;
        var counter;
        arr.reduce(function(acc, val ,index){
            if (stopSetup === false){
                console.log(type, val, index);
                console.log(accum);
                if (val === compChoice){
                    accum++;
                }
                if (val === myChoice){
                    accum -= 5;
                }
                if(val === ''){
                    counter = index;
                }
                console.log(accum);
                if (index === 2){
                    if (accum === 1){
                        console.log('Setup!')
                        computerMove(type, key, counter);
                        stopSetup = true;
                    }
                }
            }
        }, 0);
    } 
    function checkWinSection(key, arr, type){
        accum = 0;
        var counter;
        arr.reduce(function(acc, val ,index){
            if (val === compChoice){
                accum++;
            }
            if (val === myChoice){
                accum--;
            }
            if(val === ''){
                counter = index;
                console.log(counter);
            }
            if (index === 2){
                if (accum === 2){
                    console.log('#WINNING')
                    computerMove(type, key, counter);
                    win = true;
                }
            }
        }, 0);
    }
    
    //Each checks for different response from the computer
    function checkWin(){
        $.each(rows, function(key, arr){
            //console.log(key, arr);
            var type = 'rows';
            checkWinSection(key, arr, type);
        });
        $.each(col, function(key, arr){
            //console.log(key, arr);
            var type = 'col';
            checkWinSection(key, arr, type);
        });
        $.each(dia, function(key, arr){
            //console.log(key, arr);
            var type = 'dia';
            checkWinSection(key, arr, type);
        });
    }
    function checkSetup(){
        $.each(rows, function(key, arr){
            //console.log(key, arr);
            var type = 'rows';
            checkSetupSection(key, arr, type);
        });
        $.each(col, function(key, arr){
            //console.log(key, arr);
            var type = 'col';
            checkSetupSection(key, arr, type);
        });
        $.each(dia, function(key, arr){
            //console.log(key, arr);
            var type = 'dia';
            checkSetupSection(key, arr, type);
        });
        stopSetup = false;
    }    
    function checkBlock(){
        $.each(rows, function(key, arr){
            //console.log(key, arr);
            var type = 'rows';
            checkBlockSection(key, arr, type);
        });
        $.each(col, function(key, arr){
            //console.log(key, arr);
            var type = 'col';
            checkBlockSection(key, arr, type);
        });
        $.each(dia, function(key, arr){
            //console.log(key, arr);
            var type = 'dia';
            checkBlockSection(key, arr, type);
        });
    }
    //Adds the information about the button clicked to arrays used for checking win/setup/block
    
    function addChoice(id, sym){
        var symbol = sym;
        console.log(id, sym);
        switch(id){
            case "tl":
                rows.top[0] = sym;
                col.left[0] = sym;
                dia.left[0] = sym;
                break;
            case "tm":
                rows.top[1] = sym;
                col.mid[0] = sym;
                break;
            case "tr":
                rows.top[2] = sym;
                col.right[0] = sym;
                dia.right[0] = sym;
                break;
            case "ml":
                rows.mid[0] = sym;
                col.left[1] = sym;
                break;
            case "mm":
                rows.mid[1] = sym;
                col.mid[1] = sym;
                dia.left[1] = sym;
                dia.right[1] = sym;
                break;
            case "mr":
                rows.mid[2] = sym;
                col.right[1] = sym;
                break;
            case "bl":
                rows.bottom[0] = sym;
                col.left[2] = sym;
                dia.right[2] = sym;
                break;
            case "bm":
                rows.bottom[1] = sym;
                col.mid[2] = sym;
                break;
            case "br":
                rows.bottom[2] = sym;
                col.right[2] = sym;
                dia.left[2] = sym;
                break;
            default:
                break;
        }
    }
    //Checks if game is a draw and if not what the computer should do at this particular point in the game.
    function checkMove(){
        if (moveNum === 9){
            alert("Game is a draw");
        }
        if (moveNum < 2) {
            if (rows.mid[1] === ''){
                $('#mm').click();
                console.log(moveNum);
            } else {
                var val = Math.floor(Math.random() * 4);
                switch(val){
                    case 1:
                        $('#tl').click();
                        break;
                    case 2:
                        $('#tr').click();
                        break;
                    case 3:
                        $('#bl').click();
                        break;
                    case 0:
                        $('#br').click();
                        break;
                    default:
                        break;
                }
            }
        } else {
            checkWin();
            if (win === true){
                $('#compWin').show()
            } else {
                checkBlock();
                if (playerMove === false){
                    checkSetup();
                }
            }
            
        }
        console.log("Move Number: "+moveNum);
        playerMove = true;
        return;
    }
    
    $("button").click(function(){
        moveNum++;
        if (playerMove){
            playerMove = false;
            addChoice($(this).attr('id'), myChoice);
            $(this).html(myChoice);
            checkMove();
        } else {
            playerMove = true;
            addChoice($(this).attr('id'), compChoice);
            $(this).html(compChoice);
        }
        this.setAttribute('disabled', 'disabled');
    });
});
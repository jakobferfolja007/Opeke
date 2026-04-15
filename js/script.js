function drawIt() {

var x = 150;
var y = 150;
var dx = 2;
var dy = -4;
var ctx;
var WIDTH;
var HEIGHT;
var r = 10;

var paddlex;
var paddleh;
var paddlew;

var rightDown = false;
var leftDown = false;

var bricks;
var NROWS;
var NCOLS;
var BRICKWIDTH;
var BRICKHEIGHT;
var PADDING;

var sekunde;
var sekundeI;
var minuteI;
var intTimer;
var izpisTimer;

var tocke;
var start = true;
var intervalId;

var launch = false;


var rowcolors = ["#00ffcc", "#00ffcc", "#00ffcc", "#00ffcc", "#00ffcc"];
var paddlecolor = "#000000";
var ballcolor = "#000000";


function init() {
    ctx = $('#canvas')[0].getContext("2d");
    WIDTH = $("#canvas").width();
    HEIGHT = $("#canvas").height();

    init_paddle();
    initbricks();

    sekunde = 0;
    izpisTimer = "00:00";
    intTimer = setInterval(timer, 1000);

    tocke = 0;
    $("#tocke").html(tocke);

    intervalId = setInterval(draw, 10);
}


function circle(x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
}

function rect(x, y, w, h) {
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.closePath();
    ctx.fill();
}

function clear() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
}


function init_paddle() {
    paddlex =  WIDTH / 2 ;
    paddleh = 10;
    paddlew = 140;
}


function initbricks() {
    NROWS = 8;
    NCOLS = 8;
    BRICKWIDTH = (WIDTH / NCOLS) - 1;
    BRICKHEIGHT = 18;
    PADDING = 1;

    bricks = [];
    for (var i = 0; i < NROWS; i++) {
        bricks[i] = [];
        for (var j = 0; j < NCOLS; j++) {
            bricks[i][j] = 2;
        }
    }
}


function draw() {
    clear();

    if (!launch) {
        x = paddlex + paddlew / 2;
        y = HEIGHT - paddleh - r;
    }

    
    ctx.fillStyle = ballcolor;
    circle(x, y, r);

    
    if (rightDown) {
        if ((paddlex + paddlew) < WIDTH) {
            paddlex += 5;
        } else {
            paddlex = WIDTH - paddlew;
        }
    } else if (leftDown) {
        if (paddlex > 0) {
            paddlex -= 5;
        } else {
            paddlex = 0;
        }
    }

    
    ctx.fillStyle = paddlecolor;
    rect(paddlex, HEIGHT - paddleh, paddlew, paddleh);

    
    for (var i = 0; i < NROWS; i++) {
        ctx.fillStyle = rowcolors[i];
        for (var j = 0; j < NCOLS; j++) {
            if (bricks[i][j] > 0  ) {
                if(bricks[i][j]==2){
                    ctx.fillStyle="#0026ff";
                }
                if(bricks[i][j]==1){
                    ctx.fillStyle="#00ffcc";
                }
                rect(
                    (j * (BRICKWIDTH + PADDING)) + PADDING,
                    (i * (BRICKHEIGHT + PADDING)) + PADDING,
                    BRICKWIDTH,
                    BRICKHEIGHT
                );
            }
        }
    }

    
    var rowheight = BRICKHEIGHT + PADDING;
    var colwidth = BRICKWIDTH + PADDING;
    var row = Math.floor(y / rowheight);
    var col = Math.floor(x / colwidth);

    if (y < NROWS * rowheight && row >= 0 && col >= 0  ) {
        if (bricks[row][col] > 0) {
            dy = -dy;
            bricks[row][col] --;
             tocke += 1;
        }

       
        $("#tocke").html(tocke);
        if(tocke==3){
            paddlew=70;
        }
        else if(tocke==6){
            paddlew=170;
        }    
        
    }

    
    if (x + dx > WIDTH - r || x + dx < r) {
        dx = -dx;
    }

    if (y + dy < r) {
        dy = -dy;
    }
    else if (y + dy > HEIGHT - r) {

        start = false;

        if (x > paddlex && x < paddlex + paddlew) {
            dx = 8 * ((x - (paddlex + paddlew / 2)) / paddlew);
            dy = -dy;
            start = true;
        }
        else if (y + dy > HEIGHT - r) {
            clearInterval(intervalId);
        }
    }

      if (launch) {
        x += dx;
        y += dy;
    }
}


function timer() {
    if (start == true) {
        sekunde++;

        sekundeI = ((sekunde % 60) > 9) ? (sekunde % 60) : "0" + (sekunde % 60);
        minuteI = (Math.floor(sekunde / 60) > 9) ? Math.floor(sekunde / 60) : "0" + Math.floor(sekunde / 60);

        izpisTimer = minuteI + ":" + sekundeI;
        $("#cas").html(izpisTimer);
    }
    else {
        sekunde = 0;
        $("#cas").html(izpisTimer);
    }
}


function onKeyDown(evt) {
    if (evt.keyCode == 39) rightDown = true;
    else if (evt.keyCode == 37) leftDown = true;



     if (evt.keyCode == 32 && !launch) {
        launch = true;
        dx = 2;
        dy = -4;
    }
}




function onKeyUp(evt) {
    if (evt.keyCode == 39) rightDown = false;
    else if (evt.keyCode == 37) leftDown = false;
}

$(document).keydown(onKeyDown);
$(document).keyup(onKeyUp);


init();

}
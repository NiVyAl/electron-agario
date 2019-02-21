var detector = document.querySelector('.detector');
var grad = new Array();
var time;
var intervalId;
var square = document.querySelector('.square');
var mapPlayer = document.getElementById('mapPlayer');
var player = document.querySelectorAll('.player');

var playerDiameter = new Array();
playerDiameter[0] = 100;

var playerFontSize = new Array();
playerFontSize[0] = 18;

var playerContainer = document.querySelector('.player-container');


var changeX = new Array;
changeX[0] = 0;

var changeY = new Array;
changeY[0] = 0

var cordinateX = new Array;
cordinateX[0] = Math.floor(Math.random() * 2950) + 50

var cordinateY = new Array;
cordinateY[0] = Math.floor(Math.random() * 1400) - 700;

square.style.transform = 'translate(' + (-cordinateX[0]) +'px, ' + (-cordinateY[0]) + 'px)';


/* food */
var foods = new Array();

var computFoodCordinate = function(numberFood){
    var x = Math.floor(Math.random() * 2900) + 50;
    var y = Math.floor(Math.random() * 1400) - 700;
    document.querySelector('.food-' + numberFood).style.transform = 'translate(' + x +'px, ' + y + 'px)';
    
    foods[numberFood] = {
        foodCordinateX: x,
        foodCordinateY: y  
    };
}

for (var i=0; i<100; i++) {
    foods[i] = document.createElement('div');            
    square.appendChild(foods[i]);
    foods[i].classList.add('food');
    foods[i].classList.add('food-' + i);
    foods[i].classList.add('food-color-' + (Math.floor(Math.random()*5)+1) )
    
    computFoodCordinate(i);
    
};

/* */

/* Eat */

var sizeChange = function(playerNumber, increaseProcent) {
    increaseProcent = playerDiameter[playerNumber]/increaseProcent;
    playerFontSize[playerNumber] = playerFontSize[playerNumber] * increaseProcent;
    
    player[playerNumber].style.width = playerDiameter[playerNumber] + 'px';
    player[playerNumber].style.height = playerDiameter[playerNumber] + 'px';
    player[playerNumber].style.lineHeight = (playerDiameter[playerNumber]-10) + 'px';
    player[playerNumber].style.fontSize = playerFontSize[playerNumber] + 'px';
    
    mapPlayer.style.width = (playerDiameter[0]/10) + 'px';
    mapPlayer.style.height = (playerDiameter[0]/10) + 'px';

    //eatDistance = playerDiameter*0.4;
}

var eat = function(typeFood, playerNumber) {
    if (typeFood == 'food') {
        var increaseProcent = playerDiameter[playerNumber];
        playerDiameter[playerNumber] = Math.sqrt(Math.pow(playerDiameter[playerNumber], 2) + Math.pow(30, 2));
        
        sizeChange(playerNumber, increaseProcent);
    }
}
/* */


for (var i=0; i<180; i++) {     /* генерация градусов */
    grad[i] = document.createElement('div');
    detector.appendChild(grad[i]);
    grad[i].classList.add('grad');
    grad[i].style.cssText = 'transform: rotate(' + -i + 'deg)';
    var reverse = i+180;
    grad[i].innerHTML = '<div class="inner" onmouseenter="move2(' + reverse + ')"></div><div class="inner-reverse" onmouseenter="move2(' + i + ')"></div>';
};

var move2 = function(deg) {
    
    for (var i = 0; i<player.length; i++){
        
        if ((deg <= 90) && (deg >= 0)) {
            changeX[i] = 1 - deg/90;
            changeY[i] = 1 - changeX[i];
        }

        if ((deg > 90) && (deg <= 180)){
            deg = deg - 90
            changeY[i] = 1 - deg/90;
            changeX[i] = -(1 - changeY[i]);
        }

        if ((deg > 180) && (deg <= 270)){
            deg = deg - 180;
            changeX[i] = -(1 - deg/90);
            changeY[i] = -(1 + changeX[i]);
        }

        if ((deg > 270) && (deg <= 360)){
            deg = deg - 270;
            changeY[i] = -(1 - deg/90);
            changeX[i] = 1 + changeY[i];
        }
        //console.log(i + ' от X: ' + changeX[i]);
    
        changeX[i] = changeX[i] * (10 - playerDiameter[i]/40); // если игрок больше 400px то движемся в обратную сторону
        changeY[i] = changeY[i] * (10 - playerDiameter[i]/40);
        
        console.log(i + ' Y: ' + changeY[i]);
        console.log('diam: ' + playerDiameter[i]);
        
        
    }
    
    
    /* анимация поедания 
    
    if (((deg > 45) && (deg < 135)) || ((deg > 225) && (deg < 315)) ) {
        player.style.transition = '0.25s width, 0.25s font-size, 0.25s line-height';
    } else {
        player.style.transition = '0.25s height, 0.25s font-size, 0.25s line-height';
    } */
}


var mainInterval = setInterval(function(){
    
    if (((playerDiameter[0]/2) < (changeX[0] + cordinateX[0])) && ((3000-playerDiameter[0]/2) > (changeX[0] + cordinateX[0])) ) {
            cordinateX[0] = changeX[0] + cordinateX[0];
    };

    if ( ((changeY[0] + cordinateY[0]) > (-750 + playerDiameter[0]/2)) && ((changeY[0] + cordinateY[0]) < (750 - playerDiameter[0]/2) ) ) {
        cordinateY[0] = changeY[0] + cordinateY[0];
    }

    square.style.transform = 'translate(' + (-cordinateX[0]) + 'px, ' + (cordinateY[0]) + 'px)';
    mapPlayer.style.transform = 'translate(' + (cordinateX[0]/10) + 'px, ' + (-cordinateY[0]/10) + 'px)';
    
    
    for (var i=0; i<player.length; i++){   
        if (i >= 1){
            //cordinateX[i] = -changeX[i] + cordinateX[i];
            //cordinateY[i] = changeY[i] - cordinateY[i];
            player[i].style.transform = 'translate(' + (cordinateX[0]-cordinateX[i]) + 'px, ' + (-(cordinateY[0] - cordinateY[i])) + 'px)';    
        }
        
        
        /* eat */
        for (var j=0; j<100; j++){
            if (j == 2) {
                //console.log();
            }
            
            if ( Math.sqrt(Math.pow((cordinateX[i] - foods[j].foodCordinateX), 2) + Math.pow((-cordinateY[i] - foods[j].foodCordinateY), 2)) < playerDiameter[i]*0.4 ) {
                
                //console.log('eat');
                computFoodCordinate(j);
                eat('food', i);
            }
        }  
    }
    
    
}, 10);


var split = function() {
    increaseProcent = playerDiameter[player.length-1];
    playerDiameter[player.length-1] = playerDiameter[player.length-1]/2;
    sizeChange(player.length-1, increaseProcent);
    
    var playerSpl = document.createElement('div');
    playerContainer.appendChild(playerSpl);
    playerSpl.classList.add('player');
    //playerSpl.style.transform = 'translate(100px, 100px)';
    
    player = document.querySelectorAll('.player');
    playerDiameter[player.length-1] = playerDiameter[player.length-2];
    playerFontSize[player.length-1] = playerFontSize[player.length-2];
    
    sizeChange(player.length-1, increaseProcent);
    
 
    changeX[player.length-1] = changeX[player.length-2];
    changeY[player.length-1] = changeX[player.length-2];
    cordinateX[player.length-1] = cordinateX[player.length-2] + 100;
    cordinateY[player.length-1] = cordinateY[player.length-2] + 100; 
}

/* старая функция

var radian = function(deg) {
    var rad = (deg * Math.PI)/180;
    return rad
};

var move = function(deg, event) {
    var hypothesis = 0;
    
    
    intervalId = setInterval(function(){
        hypothesis = hypothesis + 1;
        
        cordinateX = (Math.cos(deg) * hypothesis) + cordinateX;
        var fixCordinateX = -cordinateX
        cordinateY = (Math.sin(deg) * hypothesis) + cordinateY;
        
        square.style.transform = 'translate(' + fixCordinateX + 'px, ' + cordinateY + 'px)';
    }, 100);    

};

var stop = function(deg, event) {
    clearInterval(intervalId);
};
*/
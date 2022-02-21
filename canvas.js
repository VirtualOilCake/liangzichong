$(document).ready(function(){
    $('.datepicker').datepicker();
  });

var seed = 2;

function paintCanvas() {

    var nameInput = document.getElementById("nameInput");
    var birthInput = document.getElementById("birthdayInput");

    //console.log(birthInput.valueAsNumber);

    if(!nameInput.value||!birthInput.value){
        alert("Input should not be null.");
        return;
    }
    
    // Get Canvas
    var canvas = document.querySelector("canvas");

    var context2d = canvas.getContext("2d");

    height = canvas.height;
    width = canvas.width;

    context2d.fillStyle = "black";
    context2d.fillRect(0, 0, width, height);

    

    var fullValue=nameInput.value+birthInput.valueAsNumber;

    seed=getHash(fullValue);

    var curveNumber = 512;
    for (let i = 0; i < curveNumber; i++) {
        context2d.strokeStyle = `rgb(
            ${Math.floor(255 * i/curveNumber)},
            ${Math.floor(255 * i/curveNumber)},
            ${Math.floor(255 * i/curveNumber)})`;
    
        context2d.beginPath();
        context2d.moveTo(getRandomInt(width), getRandomInt(height));
        context2d.bezierCurveTo(
            width/2 + getRandomInt(100) - 50, height/2 + getRandomInt(50)- 50,
            width/2 + getRandomInt(100)- 50, height/2 + getRandomInt(50)- 50,
            getRandomInt(width), getRandomInt(height));
        context2d.stroke();
    }
    seed = 1;

}



function getHash(input) {
    var hash = 0, i, chr;
    if (input.length === 0) return hash;
    for (i = 0; i < input.length; i++) {
      chr   = input.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
};
  
function getRandomInt(max) {
    return Math.floor(random() * max);
}


function random() {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}
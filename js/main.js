var taps = 0;
var squares = document.querySelectorAll(".square");
var NumSquares = 15;
var colors = generateRandomColors(NumSquares);
var pickedColor = pickColor();
var colorDisplay = document.getElementById('colorDisplay');
var messageDisplay = document.getElementById('message');
var h1 = document.querySelector('#heading');
var NewGame = document.querySelector('#newGame');
var defaultColor = "#26a69a"; 
var newColor = document.getElementById('newGame');
var modes = document.querySelectorAll('#mode');
var NoControl = document.querySelector('.nocontrol');
var GameOverDisplay = document.querySelector('#gameover');
var con = document.getElementById('container');
// var sound = new Howl({
//       src: ['']
//     });

colorDisplay.textContent = pickedColor;

function SetModes() {
	function EasyMode() {
		con.style.gridTemplateColumns = "1fr 1fr 1fr 1fr 1fr";
		for (var i = 0; i < 3; i++) {
			squares[i].style.gridColumn = i+2;	
		}
		con.style.maxWidth='800px';
		NumSquares = 3;
	}
	function NormalMode() {
		for (var i = 0; i < 3; i++) {
			squares[i].style.gridColumn = i+1;	
		}
		con.style.gridTemplateColumns = "1fr 1fr 1fr 1fr";
		con.style.maxWidth='600px';
		NumSquares = 8;
	}
	function HardMode() {
		con.style.gridTemplateColumns = "1fr 1fr 1fr 1fr 1fr";
		con.style.maxWidth='800px';
		NumSquares = 15;
	}
	modes[0].classList.contains('active') ? EasyMode(): modes[1].classList.contains('active') ? NormalMode():HardMode();
	reset();
	;
	for (var i = 0; i < modes.length; i++) {
	modes[i].addEventListener('click',function() {
		for (var i = 0; i < modes.length; i++) {
			modes[i].classList.remove('active');
		}
		this.classList.add('active');
		this.textContent === "Easy" ? EasyMode(): this.textContent === "Normal" ? NormalMode():HardMode();
		reset();
		})
	}
}

function SetSquares() {
	for(var i=0;i<squares.length; i++) {
	squares[i].style.background = colors[i];

	squares[i].addEventListener("click",function () {
		if(Number(window.getComputedStyle(this).getPropertyValue("opacity")) === 1)
			{
				taps += 1;
			}
		var clickedColor = this.style.background;
		console.log(clickedColor);
		var clickedsquare = this;
		messageDisplay.classList.remove('invisible');		

		if(clickedColor === pickedColor && taps<=3) {
			taps = 0;
			messageDisplay.textContent = 'Correct!';
			newColor.textContent = "PLay Again?";
			h1.style.background = pickedColor;
			this.style.transform = 'scaleX(-1)';
			for (var i = 0; i < squares.length; i++) {
				FadeIn(squares[i],30);
				squares[i].style.background = pickedColor;
			}
			setTimeout(function(){
				clickedsquare.style.transform = 'scaleX(1))';
				reset();
				},2000)
		} else if(taps<3){
			messageDisplay.textContent = 'Try Again';
			FadeOut(clickedsquare,30);
		} else {
			GameOver();
		}
		})
	}
}

function reset() {
	taps = 0;
	colors = generateRandomColors(NumSquares);
	pickedColor = pickColor();
	newColor.textContent = "New Colors";
	messageDisplay.classList.add('invisible');
	colorDisplay.textContent = pickedColor;
	h1.style.background = defaultColor;

	for (var i = 0; i < squares.length; i++) {
			if(colors[i]) {
				FadeIn(squares[i],30);
				squares[i].style.display = 'block';
				squares[i].style.background = colors[i];
			} else {
				ReduceSquare(squares[i]);
				// squares[i].style.display = 'none';
			}
		}
	console.log('game was reset');
}

function generateRandomColors(num) {
	// creating an empty array
	var arr = [];
	// creating and pushing random colors in empty array
	for (var i = 0; i < num; i++) {
		arr.push(RandomColor());
	}
	return arr;
}

function RandomColor() {
	var R = Math.floor(Math.random()*256);
	var G = Math.floor(Math.random()*256);
	var B = Math.floor(Math.random()*256);

	return `rgb(${R}, ${G}, ${B})`;
}

function pickColor() {
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function FadeOut(elm,speed) {
	var Opacity=Number(window.getComputedStyle(elm).getPropertyValue("opacity"));
   	var interval = setInterval(function () {
	if(Opacity>0){
	    Opacity-=0.1;
	    elm.style.opacity=Opacity; 
	} else {
	    clearInterval(interval);
	    }
	},speed);
}   

function FadeIn(elm,speed) {
	var Opacity=Number(window.getComputedStyle(elm).getPropertyValue("opacity"));
   	var interval = setInterval(function () {
	if(Opacity<=1){
	    Opacity+=0.1;
	    elm.style.opacity=Opacity; 
	} else {
	    clearInterval(interval);
	    }
	},speed);
}
function ReduceSquare(elm) {
	var Opacity=Number(window.getComputedStyle(elm).getPropertyValue("opacity"));
   	var interval = setInterval(function () {
	if(Opacity>0){
	    Opacity-=0.1;
	    elm.style.opacity=Opacity; 
	} else {
		elm.style.display = 'none';
	    clearInterval(interval);
	    }
	},10);
}

function GameOver() {
	var scale = 0;
	NoControl.style.display = 'block';
	setTimeout(function(){
		var a = setInterval(function(){
			scale += 0.05;
			GameOverDisplay.style.transform = `translate(-50%,-60%) scale(${scale})`;
			if(scale>1) {
				clearInterval(a)
			}
		},10)
	},100);

	setTimeout(function(){
		var a = setInterval(function(){
			scale -= 0.05;
			GameOverDisplay.style.transform = `translate(-50%,-60%) scale(${scale})`;
			if(scale<=0) {
				NoControl.style.display = 'none';
				clearInterval(a)
			}
		},10)
		reset();
	},1800);
	taps = 0;
}

SetModes();
SetSquares();   

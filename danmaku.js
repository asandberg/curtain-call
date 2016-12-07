// JavaScript Document

var position = new Vector2(100,100);
var particles = new Array();
var boundaries;
var Canvas;
var Context;
var I = 0;


function Initialize()
{
	var t = setTimeout("Main()", 16);
	
	Canvas = document.getElementById("canvas");
	Context  = canvas.getContext("2d");
	boundaries = new Vector2(canvas.width, canvas.height);
	
	var s = 200;
	
	/*
	for(var i = 0; i < s; i++)
	{
		var v = new Vector2(boundaries.X/2, boundaries.Y /2);
		v.Add(DiagVector(-100, i/s * 360));
		particles[i] = new Particle(v, 1, i/s * 360); 	
	}
	*/
}

function Main()
{
	Context.clearRect(0,0, 640, 480);
	
	Update();
	Draw(Context);
	
	var t = setTimeout("Main()", 20);
	I++;
}

var alpha = 0;
function Update()
{
	alpha += 1;
	if(I % 4 == 0)
	{
		for(var i = 0; i < 360; i += 360/8)
		{
			particles.push(new Particle(new Vector2(boundaries.X/2, boundaries.Y /2), 1, Math.pow(Math.sin(alpha * Math.PI/180),2) * 45 + i));
		}
	}
	for(var i = 0; i < particles.length; i++)
	{
		particles[i].Update(boundaries); 	
		
		if(!particles[i].Alive)
		{
			particles.splice(i, 1);
			i--;
		}
	}
}

function Draw(ctx)
{
	ctx.beginPath();
	ctx.fillStyle = "rgb(0,0,0)";
	
	for(var i = 0; i < particles.length; i++)
	{
		particles[i].Draw(ctx); 	
	}
	
	ctx.fill();
}

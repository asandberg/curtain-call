// JavaScript Document

function Vector(_x, _y)
{
	this.X = _x;
	this.Y = _y;
	
	function Length()
	{ return Math.sqrt(Math.pow(this.X, 2) + Math.pow(this.Y, 2)); }
}
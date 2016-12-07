/* Curtain Call, a web browser bullet hell game */

//A 2D vector class
function Vector2(x, y)
{
	this.X = x;
	this.Y = y;
	
	
	//Vector sum
	this.Add = function (v)
	{ this.Y += v.Y; this.X += v.X; }
	
	//Calculate length of a vector
	this.Length = function () 
	{ return Math.pow(Math.pow(this.X, 2) + Math.pow(this.Y, 2), 1/2); }
		
	
	this.Normalize = function()
	{
		if(this.Length != 0)
		{
			var l = this.Length();
			this.Y = this.Y / l;
			this.X = this.X / l;
		}
	}
	
	//Basic vector sum
	Vector2.Sum = function (v1, v2)
	{ return new Vector2(v1.X + v2.X, v1.Y + v2.Y); }
	
	//Reduce
	Vector2.Reduce = function (v1, v2)
	{ return new Vector2(v1.X - v2.X, v1.Y - v2.Y); }
	
	//Multiple vector by number
	Vector2.Multiply = function(v, m)
	{ return new Vector2(v.X * m, v.Y * m); }
	
	//Get vector by length and angle of horizontal axis
	Vector2.Diag = function (length, angle)
	{ return new Vector2(Math.cos(angle * Math.PI/180) * length, Math.sin(angle * Math.PI/180) * length); }
	
	//Dot product of two vectors
	Vector2.Dot = function (v1, v2)
	{ return v1.X * v2.X + v1.Y * v2.Y; }
	
	//Reflection vector of movement vector and wall normal.
	Vector2.Reflect = function (v, n)
	{ n.Normalize(); return Vector2.Reduce(v, Vector2.Multiply(n, 2 * Vector2.Dot(n, v))); }
}

function Circle(center, radius)
{
	this.Center = center;
	this.Radius = radius;
	this.Alive = true;
	this.Bullet = new Bullet(this.Center, Vector2.Diag(0,0), this.Radius * 2, getColor(0,0,0,0), 5, "Safe");
}

function MultipleVector(v, m)
{ return new Vector2(v.X * m, v.Y * m); }

function Diag(length, angle)
{ return new Vector2(Math.cos(angle * Math.PI/180) * length, Math.sin(angle * Math.PI/180) * length); }

function Clamp(num, mi, ma)
{ return Math.max(mi, Math.min(num, ma)); }

function Distance(v1, v2)
{
	var r = new Vector2(v2.X - v1.X, v2.Y - v1.Y);
	return r.Length();
}

function DistanceToPlayer(v1)
{
	var r = new Vector2(player.Position.X - v1.X, player.Position.Y - v1.Y);
	return r.Length();
}

function PlayerPosition()
{ return new Vector2(player.Position.X, player.Position.Y); }

function PointAngle(p1, p2)
{ return Math.atan2(p2.Y - p1.Y, p2.X - p1.X) * 180/Math.PI; }

function AngleToPlayer(p1)
{ return PointAngle(p1, player.Position); }

function getColor(r, g, b, a)
{ return "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";  }

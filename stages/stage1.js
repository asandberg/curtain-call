/* JavaScript
 * Curtain Call - stage script
 * Name: Demo stage
 * By: Spike
 * Date: 2012 Apr 19th
 * Updated: 2012 Apr 20th
*/
function StageScript()
{
	this.InitWaves = function () {
		var array = new Array();
		array.push(new Wave(50, new Wave09(Bounds)));
		array.push(new Wave(30, new Wave05(Bounds)));
		array.push(new Wave(50, new Wave06(Bounds)));
		array.push(new Wave(50, new Wave08(Bounds)));
		array.push(new Wave(30, new Wave03(Bounds)));
		array.push(new Wave(60, new Wave04(Bounds)));
		array.push(new Wave(40, new Wave01(Bounds)));
		array.push(new Wave(50, new Wave07(Bounds)));
		return array;
	}
	this.InitSprites = function() {
		var array = new Array();
		array.push(new Image()); array[0].src = "images/bul1.png";
		array.push(new Image()); array[1].src = "images/bul2.png";
		array.push(new Image()); array[2].src = "images/bul3.png";
		array.push(new Image()); array[3].src = "images/greenTail.png";
		array.push(new Image()); array[4].src = "images/tailHead.png";
		return array;
	}
	
	function Wave01(bounds)
	{
		this.alpha = 0;
		this.counter = 0;
		this.pos = new Vector2(bounds.X/2, bounds.Y/5);
		
		this.Update = function(bounds) {
			this.alpha += 4;
			if(this.counter > 500)
			{ 
				this.counter = 0;
				for(var i = 0; i < 360; i += 360/16)
				{
					Particles.push(new Bullet(
					new Vector2(this.pos.X, this.pos.Y), 
					Diag(4, this.alpha + i), 
					40,
					getColor(Math.floor(Math.random() * 140 + 115), Math.floor(Math.random() * 140 + 115), Math.floor(Math.random() * 140 + 115), 1))); 
				}
			}
			else
				this.counter += elapsedTime;
		}
	}

	function Wave02(bounds)
	{
		this.alpha = 0;
		this.counter = 0;
		this.pos = new Vector2(bounds.X/2, bounds.Y/3);
		
		this.Update = function _update(bounds) {
			
			this.alpha += 0.4;
			if(this.counter > 22)
			{ 
				this.counter = 0;
				for(var i = 0; i < 360; i += 360/12)
				{
					var v = new Vector2(this.pos.X + Math.cos(i * Math.PI/180) * 120, this.pos.Y + Math.sin(i * Math.PI/180) * 120);
					Particles.push(new Bullet(v, Diag(3, AngleToPlayer(this.pos)), 12,
					getColor(Math.floor(Math.random() * 140 + 115), Math.floor(Math.random() * 140 + 115), Math.floor(Math.random() * 140 + 115)))); 
				}
				Particles.push(new Bullet(new Vector2(this.pos.X, this.pos.Y), Diag(3, AngleToPlayer(this.pos)), 12,
					getColor(Math.floor(Math.random() * 140 + 115), Math.floor(Math.random() * 140 + 115), Math.floor(Math.random() * 140 + 115), 1))); 
			
			}
			else
				this.counter += deltaTime;
		}
	}

	function Wave03(bounds)
	{
		this.alpha = 0;
		this.counter = 0;
		this.pos = new Vector2(bounds.X/2, bounds.Y/4);
		
		this.Update = function _update(bounds) {
			
			this.alpha += 0.4;
			if(this.counter > 22)
			{ 
				this.counter = 0;
				for(var i = 0; i < 360; i += 360/16)
				{
					for(var j = 0; j < 5; j++)
					{
						Particles.push(new Bullet(new Vector2(this.pos.X, this.pos.Y), Diag(j * 2 + 1, AngleToPlayer(this.pos) + i), 12,
						getColor(203 - j * 10, 117 - j * 10, 149- j * 10, 1))); 
					}
				}
			}
			else
				this.counter += deltaTime;
		}
	}

	function Wave04(bounds)
	{
		this.alpha = 0;
		this.counter = 0;
		this.pos = new Vector2(bounds.X/2, bounds.Y/4);
		
		var c = 0;
		var a = 0;
		
		this.Update = function _update(bounds) {
			
			a += 0.03;
			if(this.counter < 150 && c > 10)
			{ 
				c = 0;
				for(var j = 0; j < 360; j += 360/8)
				{
					var b = new Bullet(new Vector2(this.pos.X, this.pos.Y), Diag(0.6, a + j), 12,
					getColor(239, 226, 50, 1));
					b.Init(new WallBullet(b, a + j, 1));
					Particles.push(b); 
				}
			
			}
			c += deltaTime;
			
			this.counter += deltaTime;
			if(this.counter >= 210) { this.counter = 0; }
		}
	}


	function Wave05(bounds)
	{
		this.alpha = 0;
		this.counter = 0;
		this.pos = new Vector2(bounds.X/2, bounds.Y/3);
		
		var bs = new Array();
		var c = 0;
		var a = 0;
		
		var colorChange = true;
		
		this.Update = function _update(bounds) {
			
			if(c > 140)
			{ 
			c = 0;
			
			var sprite = 1;
			if(colorChange) { sprite = 2; colorChange = false; }
			else { colorChange = true; }
			if(bs.length > 0)
			{
				for(var i = 0; i < bs.length; i++)
				{ 
					bs[i].Init(new HomingBullet(bs[i])); 
				}
				bs.splice(0, bs.length);
			}
				for(var i = 0; i < 80; i++)
				{
					var b = new Bullet(new Vector2(this.pos.X, this.pos.Y), Diag(Math.random() * 4.5, Math.random() * 360), i/100 * 20 + 20,
					getColor(0,0,0,0)); 
					b.Init(new SlowingBullet(b));
					Particles.push(b);
					b.Sprite = sprite;
					bs.push(b);
				}
			}
			else 
				c += deltaTime;
		}
	}


	function Wave06(bounds)
	{
		this.alpha = 0;
		this.counter = 0;
		this.pos = new Vector2(bounds.X/2, bounds.Y/3);
		
		var c = 0;
		var c2 = 0;
		var a = 0;
		var a2 = 0;
		
		var colorChange = true;
		
		this.Update = function _update(bounds) {
			
			if(c2 > 50)
			{
				c2 = 0;
				for(var i = 0; i < 360; i += 360/16)
				{
					Particles.push(new Bullet(new Vector2(this.pos.X, this.pos.Y), Diag(1, i + a), 10, getColor(0,0,0,0), 0));
				}
			}
			c2 += deltaTime;
			a += 5 * deltaTime;
			a2 += 0.2 * deltaTime;
			a2 = a2 % 360;
			
			if(c > 150)
			{ 
				c = 0;
				var b = new Bullet(new Vector2(this.pos.X, this.pos.Y), Diag(DistanceToPlayer(this.pos) / 100, AngleToPlayer(this.pos)), 60, getColor(0,0,0,1), 2);
				b.Init(new CircleBullet(b, a2));
				Particles.push(b);
			}
			else 
				c += deltaTime;
		}
	}


	function Wave07(bounds)
	{
		this.alpha = 0;
		this.counter = 0;
		this.pos = new Vector2(bounds.X/2, bounds.Y/2);

		var c2 = 0;
		var i = 0;
		var radius = 280;
		
		this.Update = function _update(bounds) {
			
			if(c2 > 2)
			{
				c2 = 0;
				
				i += 360/90
				radius -= 0.17;
				for(var j = 0; j < 3; j++)
				{
					var a = i + j * 360/3;
					var b = new Bullet(
					new Vector2(this.pos.X + Math.cos((a + 1) * Math.PI/180) * radius, this.pos.Y + Math.sin((a + 1) * Math.PI/180) * radius), 
					Diag(1 + a/3000, a + 180), 20, getColor(0,0,0,0), 1);
					b.Init(new TimedBullet(b, 200));
					Particles.push(b);
				}
			
			}
			else 
				c2 += deltaTime;
		}
	}

	function Wave08(bounds)
	{
		this.alpha = 0;
		this.counter = 0;
		this.pos = new Vector2(bounds.X/2, bounds.Y/2);
		var c2 = 0;
		
		this.Update = function _update(bounds) {
			
			if(c2 > 0 && Particles.length < 15)
			{
				c2 = -100;
				for(var j = 0; j < 360; j += 360/6)
				{
					var b = new Bullet(
					new Vector2(this.pos.X, this.pos.Y), 
					Diag(3, j), 20, getColor(0,0,0,0), 4);
					b.Init(new TailBullet(b, 20, j));
					Particles.push(b);
					
				}
			
			}
			else 
				c2 += deltaTime;
		}
	}
	function Wave09(bounds)
	{
		this.alpha = 0;
		this.counter = 0;
		this.pos = new Vector2(bounds.X/2, bounds.Y/2);
		var c = 0;
		
		var i = 0;
		this.Update = function _update(bounds) {
			i += 4;
			if(Particles.length < 50 && c > 3)
			{
				c= 0;
				var b = new Bullet(
				new Vector2(this.pos.X, this.pos.Y), 
				Diag(3, i), 20, getColor(0,0,0,0), 2);
				b.Init(new RedTailBullet(b, 15, i));
				Particles.push(b);
			}
			else
				c += deltaTime;
		}
	}


	function Wave07(bounds)
	{
		this.alpha = 0;
		this.counter = 0;
		this.pos = new Vector2(bounds.X/2, bounds.Y/2);
		
		var c = 0;
		var c2 = 0;
		var a = 0;
		
		var colorChange = true;
		
		this.Update = function _update(bounds) {
			
			a += 0.34 * deltaTime;
			a = a % 360;
			
			if(c > 60)
			{ 
				c = 0;
				var b = new Bullet(new Vector2(this.pos.X, this.pos.Y), Diag(DistanceToPlayer(this.pos) / 100, AngleToPlayer(this.pos)), 60, getColor(0,0,0,1), 1);
				b.Init(new CircleBullet(b, a));
				Particles.push(b);
			}
			else 
				c += deltaTime;
		}
	}
}


// Seinistä kimpoileva bullet
function WallBullet(b, direction, i)
{
	this.B = b;
	var i = i;
	var direction = direction;
	this.Update = function(bounds){
	
		if(this.B.Position.X < 0 - this.B.Size || this.B.Position.X > bounds.X + this.B.Size || 
		this.B.Position.Y < 0 - this.B.Size || this.B.Position.Y > bounds.Y + this.B.Size)
			this.B.Alive = false;
		
		if(i > 0)
		{
			if((this.B.Position.Y + this.B.Size > bounds.Y && this.B.Speed.Y > 0) || (this.B.Position.Y - this.B.Size < 0 && this.B.Speed.Y < 0))
			{ direction = -direction; i--;}
			
			if((this.B.Position.X + this.B.Size > bounds.X && this.B.Speed.X > 0) || (this.B.Position.X - this.B.Size < 0 && this.B.Speed.X < 0))
			{ direction = 180 - direction; i--; }
			
			this.B.Speed = Diag(this.B.Speed.Length(), direction);
		}
		this.B.Position.Add(MultipleVector(this.B.Speed, deltaTime));	
	}
}


function HomingBullet(b)
{
	this.B = b;
	var i = i;
	var direction = AngleToPlayer(this.B.Position);
	this.Update = function(bounds){
		
		this.B.Speed.Add(Diag(0.01, direction));
		this.B.Position.Add(MultipleVector(this.B.Speed, deltaTime));	
	}
}

function SlowingBullet(b)
{
	this.B = b;
	this.Update = function(bounds){
		this.B.Speed = new Vector2(this.B.Speed.X * 0.995, this.B.Speed.Y * 0.995);
		this.B.Position.Add(MultipleVector(this.B.Speed, deltaTime));	
	}
}


function AccBullet(b, acc, max)
{
	this.B = b;
	this.Update = function(bounds){
		this.B.Speed = new Vector2(this.B.Speed.X * acc, this.B.Speed.Y * acc);
		
		if(this.B.Speed.Length() > max)
		{ this.B.Speed.Normalize(); this.B.Speed = MultipleVector(this.B.Speed, max); }
		this.B.Position.Add(MultipleVector(this.B.Speed, deltaTime));	
	}
}

function TimedBullet(b,c)
{
	this.B = b;
	this.Update = function(bounds){
		if(c <= 0)
			this.B.Position.Add(MultipleVector(this.B.Speed, deltaTime));
		else
			c -= deltaTime;	
	}
}

function CircleBullet(b, gap)
{
	this.B = b;
	var c = 0;
	
	this.Update = function(bounds){
		this.B.Speed = new Vector2(this.B.Speed.X * 0.99, this.B.Speed.Y * 0.99);
		this.B.Position.Add(MultipleVector(this.B.Speed, deltaTime));	
		
		if(c > 200)
		{
			for(var i = 0; i < 360; i += 360/72)
			{
				if(Math.abs(i - gap) > 20)
					Particles.push(new Bullet(new Vector2(this.B.Position.X, this.B.Position.Y), Diag(1, i), 20, getColor(0,0,0,0), 1));
			}
			this.B.Alive = false;
		}
		c += deltaTime;
	}
	
	this.DeadCheck = function() { };
}

function WallBounce(bullet, alpha, bounds)
{
	if((bullet.Position.Y > bounds.Y && bullet.Speed.Y > 0) || (bullet.Position.Y < 0 && bullet.Speed.Y < 0))
	{ alpha = -alpha; }
	if((bullet.Position.X > bounds.X && bullet.Speed.X > 0) || (bullet.Position.X < 0 && bullet.Speed.X < 0))
	{ alpha = 180 - alpha; }
	return alpha;
}

function TailBullet(b,length, A)
{
	this.B = b;
	var c = 0;
	var c2 = 0;
	this.instances = new Array();
	var a = A;
	var t = 90;
	var first = true;
	var alpha = A;
	this.Update = function(bounds){	
	
		this.B.Speed = Diag(this.B.Speed.Length(), alpha);
		this.B.Sprite = 2;
		
		if(c2 > 500)
		{ 
			first = false;
			c2 = 0;
		}
		else if(c2 > 150 && c2 < 200)
		{
			alpha += Math.random() * 90 - 45;
		}
		else if(c2 < 30 && !first)
		{ 
			alpha = AngleToPlayer(this.B.Position); 
			this.B.Sprite = 1; 
		}
		
		
		c2 += deltaTime;
		
		Tail(this.B, this.instances, length);
		alpha = WallBounce(this.B, alpha, bounds);
		this.B.Position.Add(MultipleVector(this.B.Speed, deltaTime));
	}
	
	 this.Draw = new Function('ctx', 'TrailDraw(ctx, this.instances, this.B)');
	 this.Collision = new Function('pPos', 'return TrailCollision(pPos, this.instances, this.B)');
	 this.DeadCheck = new Function('bounds', 'TrailDeadCheck(bounds, this.instances, this.B)');
}


function RedTailBullet(b, length, A)
{
	this.B = b;
	var c = 0;
	this.instances = new Array();
	var t = 90;
	var speed = 3;
	
	var alpha = A;
	var locked = false;
	this.Update = function(bounds){	
	
		this.B.Speed = Diag(speed, alpha);
		
		if(DistanceToPlayer(this.B.Position) <= 130 && !locked)
		{ 
			locked = true; alpha = AngleToPlayer(this.B.Position); 
		}
		else if(DistanceToPlayer(this.B.Position) > 130)
		{ locked = false; }
		
		if(locked)
		{
			speed = 1.5;
			this.B.Sprite = 1;
		}
		else
		{
			speed = 4;
			this.B.Sprite = 2;
		}

		Tail(this.B, this.instances, length);
		alpha = WallBounce(this.B, alpha, bounds);
		
		this.B.Position.Add(MultipleVector(this.B.Speed, deltaTime));
	}
	
	 this.Draw = new Function('ctx', 'TrailDraw(ctx, this.instances, this.B)');
	 this.Collision = new Function('pPos', 'return TrailCollision(pPos, this.instances, this.B)');
	 this.DeadCheck = new Function('bounds', 'TrailDeadCheck(bounds, this.instances, this.B)');
}

function Tail(bullet, tail, length)
{
	tail.push(new Vector2(bullet.Position.X, bullet.Position.Y)); 
	if(tail.length > length)
	{ tail.splice(0, tail.length - length); }
}

function TrailDraw(ctx, instances, bullet)
{	
	for(var i = 0; i < instances.length; i += 1)
	{
		var size = 0.8 * bullet.Size * Clamp(bullet.Counter / bullet.Delay, 0, 1) * (1 + i/instances.length);
		ctx.globalAlpha = i/instances.length;
		ctx.drawImage(BulletSprites[3], 
		instances[i].X - size/2 * Clamp(bullet.Counter / bullet.Delay, 0, 1), 
		instances[i].Y - size/2 * Clamp(bullet.Counter / bullet.Delay, 0, 1), 
		size, 
		size);
	}
	
	ctx.drawImage(BulletSprites[bullet.Sprite], 
	bullet.Position.X - bullet.Size/2 * Clamp(bullet.Counter / bullet.Delay, 0, 1), 
	bullet.Position.Y - bullet.Size/2 * Clamp(bullet.Counter / bullet.Delay, 0, 1), 
	bullet.Size * Clamp(bullet.Counter / bullet.Delay, 0, 1), 
	bullet.Size * Clamp(bullet.Counter / bullet.Delay, 0, 1));
	ctx.globalAlpha = 1;
}

function TrailCollision(pPos, instances, bullet)
{ 
	for(var i = Math.round(instances.length * 0.3); i < instances.length; i += 1)
	{ if(Distance(pPos, instances[i]) < (bullet.Size / 2) * 0.8) { return true; } }
	return false;
}

function TrailDeadCheck(bounds, instances, bullet)
{
	var value = true;
	if(instances.length > 0)
	{
		value = false;
		for(var i = 0; i < instances.length; i += 3)
		{
			if(instances[i].X > 0 - bullet.Size && instances[i].X < bounds.X + bullet.Size && instances[i].Y > 0 - bullet.Size && instances[i].Y < bounds.Y + bullet.Size)
			{ value = true; break; }
		}
	}
	bullet.Alive = value;
}
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
			array.push(new Wave(80, new PlayerFollowCircle(Bounds)));
			array.push(new Wave(80, new SpawningCircles(Bounds)));
			return array;
		}
		this.InitSprites = function() {
			var array = new Array();
			array.push(new Image()); array[0].src = "images/bul1.png";
			array.push(new Image()); array[1].src = "images/bul2.png";
			array.push(new Image()); array[2].src = "images/bul3.png";
			array.push(new Image()); array[3].src = "images/greenTail.png";
			array.push(new Image()); array[4].src = "images/tailHead.png";
			array.push(new Image()); array[5].src = "images/circle.png";
			return array;
		}
		
	function PlayerFollowCircle(bounds)
	{
		this.alpha = 0;
		this.counter = 0;
		this.pos = new Vector2(bounds.X/2, bounds.Y/9);
		var circle;
		var circleSpr = false;
		var released = false;
		var Bounds = bounds;
		var c2 = 0;
		this.Update = function(bounds) {
		
			if(!circleSpr && this.counter > 1000)
			{	
				this.counter = 0;
				circleSpr = true;
				circle = new Circle(PlayerPosition(), 200);
				Particles.push(circle.Bullet); 
			
				
				for(var j = 0; j < 360; j += 360/1)
				{
					for(var i = 0; i < 360; i += 360/150)
					{
						var bul = new Bullet(Vector2.Sum(PlayerPosition(), Vector2.Sum(Vector2.Diag(150, i), Vector2.Diag(0, j))), 
						Diag(1, i + 45), 
						20,
						getColor(0,0,0,0), 1); 
						bul.Init(new CircleWarpBullet(bul, circle));
						Particles.push(bul);
					}
				}
			}
			else
				this.counter += elapsedTime;
				
			if(circleSpr && this.counter > 1300)
			{
				this.counter = 0;
				Particles.push(new Bullet(new Vector2(this.pos.X, this.pos.Y), Vector2.Diag(2, AngleToPlayer(this.pos)), 50, getColor(0,0,0,0), 4));
			}
			
			if(circleSpr)
			{
				circle.Center = PlayerPosition();
				circle.Bullet.Position = circle.Center;
			}
		
		}
	}
	
	function SpawningCircles(bounds)
	{
		this.alpha = 0;
		this.counter = 0;
		this.pos = new Vector2(bounds.X/2, bounds.Y/2 + 20);
		var circles = new Array();
		var circleSpr = false;
		var released = false;
		var Bounds = bounds;
		var c2 = 0;
		this.Update = function(bounds) {
		
			if(this.counter > 3500)
			{	
				this.counter = 0;
				circleSpr = true;
				circles.push(new Circle(PlayerPosition(), 300));
				Particles.push(circles[circles.length - 1].Bullet); 
			
				
				for(var j = 0; j < 360; j += 360/15)
				{
					var bul = new Bullet(Vector2.Sum(PlayerPosition(), Vector2.Diag(80, j)), 
					Diag(2, 90 + j), 
					20,
					getColor(0,0,0,0), 2); 
					bul.Init(new CircleReflectBullet(bul, [circles[circles.length-1]]));
					Particles.push(bul);
					
					bul = new Bullet(Vector2.Sum(PlayerPosition(), Vector2.Diag(80, j)), 
					Diag(1, 90 + j), 
					20,
					getColor(0,0,0,0), 2); 
					bul.Init(new CircleReflectBullet(bul, [circles[circles.length-1]]));
					Particles.push(bul);
				}
			}
			else
				this.counter += elapsedTime;
				
			for(var i = 0; i < circles.length; i++)
			{
				
				if(circles[i].Radius > 50)
				{
					circles[i].Radius *= 0.998;
					circles[i].Bullet.Size = circles[i].Radius * 2;
				}
			}
		}
	}
		
		
	function CircleReflectBullet(b, circles)
	{
		this.B = b;
		this.Circles = circles;
		var calcPos;
		var calcDist = 0;
		var nearestIndex = -1;
		var inside = false;
		
		this.Update = function(bounds){
			
			calcPos = Vector2.Sum(this.B.Position, this.B.Speed);
			inside = false; 
			var dist;
			nearestIndex = -1;
			calcDist = 0;
			for(var i = 0; i < this.Circles.length; i++)
			{
				dist = Distance(this.Circles[i].Center, calcPos) ;
				if(dist < this.Circles[i].Radius)
				{ inside = true; break; }
				else if(nearestIndex == -1 || dist - this.Circles[i].Radius < calcDist)
				{ nearestIndex = i; calcDist = dist - this.Circles[i].Radius; }
			}
			
			if(!inside && Distance(this.Circles[nearestIndex].Center, calcPos) > this.Circles[nearestIndex].Radius - this.B.Size)
			{
				var c = 0;
				/*
				while(Distance(this.Circles[nearestIndex].Center, this.B.Position) > this.Circles[nearestIndex].Radius && c < 40)
				{ this.B.Position = Vector2.Reduce(this.B.Position, Vector2.Multiply(this.B.Speed, 1/this.B.Speed.Length())); c++; }
				*/
				if(Distance(this.Circles[nearestIndex].Center, this.B.Position) > this.Circles[nearestIndex].Radius)
				{
					c = Vector2.Reduce(this.Circles[nearestIndex].Center, this.B.Position);
					c.Normalize();
					this.B.Position = Vector2.Sum(this.Circles[nearestIndex].Center, Vector2.Multiply(c, -this.Circles[nearestIndex].Radius));
				}
				this.B.Speed = Vector2.Reflect(this.B.Speed, Vector2.Reduce(this.Circles[nearestIndex].Center, calcPos));
			}
			
			this.B.Position.Add(MultipleVector(this.B.Speed, deltaTime));	
		}
		
		this.DeadCheck = function(bounds)
		{
			for(var i = 0; i < this.Circles.length; i++)
			{
				if(this.Circles[i].Alive)
				{ this.Alive = true; return; }
			}
			this.Alive = false;
		}
	}
	function CircleWarpBullet(b, circle)
	{
		this.B = b;
		this.Circle = circle;
		
		this.Update = function(bounds){
			
			if(Distance(Vector2.Sum(this.B.Position, this.B.Speed), this.Circle.Center) > this.Circle.Radius)
			{
				var v = Vector2.Reduce(this.B.Position, this.Circle.Center);
				v.Normalize();
				this.B.Position = Vector2.Reduce(this.Circle.Center, Vector2.Multiply(v, this.Circle.Radius));
			}
			
			this.B.Position.Add(MultipleVector(this.B.Speed, deltaTime));	
		}
		
		this.DeadCheck = function(bounds)
		{
			if(this.Circle.Alive)
			{ this.Alive = true; return; }
			this.Alive = false;
		}
	}
	

}
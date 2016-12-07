// JavaScript Document

function Bullet(pos, spe, size, color, sprite, safety)
{
	this.Speed = spe;
	this.Position = pos;
	this.Alive = true;
	this.Color = color;
	this.Size = size;
	this.Counter = 0;
	this.Delay = 20;
	
	if(typeof safety == "undefined")
	{ this.Safety = "danger"; }
	else
	{ this.Safety = safety; }
	
	if(typeof sprite == "undefined")
	{ this.Sprite = 0; }
	else
	{ this.Sprite = sprite; }
	
	this.Init = function(be)
	{
		if(typeof be == "undefined")
		{ this.Behavior = new BasicBehavior(this);  }
		else
		{ this.Behavior = be;  }
		
		if(typeof this.Behavior.Update == "undefined")
		{ this.Behavior.Update = new Function('bounds', 'BasicUpdate(bounds, this.B)'); }
		
		if(typeof this.Behavior.Draw == "undefined")
		{ this.Behavior.Draw = new Function('ctx', 'BasicDraw(ctx, this.B)'); }
		
		if(typeof this.Behavior.Collision == "undefined")
		{ this.Behavior.Collision = new Function('pPos', 'return BasicCollision(pPos, this.B)'); }
		
		if(typeof this.Behavior.DeadCheck == "undefined")
		{ this.Behavior.DeadCheck = new Function('bounds', 'return BasicDeadCheck(bounds, this.B)'); }
	}
	
	this.Update = function(bounds)
	{
		
		if(this.Counter > this.Delay)
		{
			this.Behavior.Update(bounds);
			this.Behavior.DeadCheck(bounds); 
		}
		else
			this.Counter += deltaTime;
	}
	
	this.Init();
	
}

function BasicBehavior(bullet)
{ this.B = bullet; }

function BasicUpdate(bounds, bullet)
{ bullet.Position.Add(MultipleVector(bullet.Speed, deltaTime)); }

function BasicDeadCheck(bounds, bullet)
{
	if(bullet.Position.X < 0 - bullet.Size || bullet.Position.X > bounds.X + bullet.Size || 
	bullet.Position.Y < 0 - bullet.Size || bullet.Position.Y > bounds.Y + bullet.Size)
		bullet.Alive = false;
}

function BasicDraw(ctx, bullet)
{ 
	ctx.drawImage(BulletSprites[bullet.Sprite], bullet.Position.X - bullet.Size/2 * Clamp(bullet.Counter / bullet.Delay, 0, 1), bullet.Position.Y - bullet.Size/2 * Clamp(bullet.Counter / bullet.Delay, 0, 1), bullet.Size * Clamp(bullet.Counter / bullet.Delay, 0, 1), bullet.Size * Clamp(bullet.Counter / bullet.Delay, 0, 1)); 
}

function BasicCollision(pPos, bullet)
{ return (Distance(pPos, bullet.Position) < (bullet.Size / 2) * 0.8); }


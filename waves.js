// JavaScript Document
function Wave(timeLimit, wave)
{
	this.timeLimit = timeLimit;
	this.Alive = true;
	this.Wave = wave;
	this.StartDelay = 2;
	
	this.Update = function() {
		
		if(this.StartDelay <= 0)
		{
			this.timeLimit -= deltaSeconds;
			if(this.timeLimit <= 0)
				this.Alive = false;
				
			this.Wave.Update();
		}
		else
			this.StartDelay -= deltaSeconds;
	}	
}

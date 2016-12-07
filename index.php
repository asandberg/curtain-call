<?php $source = isset($_GET["source"]) ? "stages/".$_GET["source"].".js" : "stages/stage1.js";  ?>

<!doctype html>  
<html lang="en">  
<head>  
  <meta charset="utf-8">  
  <title>Curtain Call</title>  
  <meta name="description" content="Curtain Call, a browser bullet hell game.">  
  <meta name="author" content="Spike">   
  <script type="text/javascript" src="http://code.jquery.com/jquery-1.7.2.min.js"></script>
  <script type="text/javascript" src="tools.js"></script>
  <script type="text/javascript" src="<?php echo $source; ?>"></script> 
  <script type="text/javascript" src="bullets.js"></script> 
  <script type="text/javascript" src="waves.js"></script>  
  <script type="text/javascript" src="patterns.js"></script>  
  <script type="text/javascript" src="index.js"></script>  
<style>
body{
	width: 1080px;
	margin: auto;
	margin-top: 50px;
	font-family: Tahoma;
	font-size: 12px;
	color: #fff;
	background-color: #001;
	background-image: url(images/spacenebula.jpg);
	background-size: cover;
}
#canvas{
	box-shadow: 0px -3px 20px #dedede;
	background-image: url(images/stage1.png);
}
h1{
	padding-left: 12px;  
	letter-spacing: 1.05em;
	text-transform: uppercase;
	text-shadow: 2px 2px 7px #dedede;
	color: rgba(255,255,255,0);
	margin-bottom: -0px;
	font-size: 3em;
}
#highscore{
	float: right;
	padding: 20px;
	width: 310px;
	overflow: auto;
	height: 500px;
	box-shadow: 0px 0px 20px #dedede;
	background-color: rgba(4,4,4,0.3);
	border-radius: 8px;
}
a{
	cursor: pointer;
	color: #039;
}
.score{
	background-color: #222;
	border-radius: 7px;
	padding: 10px;
	margin-top: 10px;
	box-shadow: 0px 0px 5px #777;
}
.own{
	box-shadow: 0px 0px 5px #fff;
}
.score-nro{
	font-size: 1.4em;
	padding-top: 3px;
	float: left;
	width: 10%;
	color: #999;
}
.score-name{
	font-weight: bold;
	float: left;
	width: 53%;
	font-size: 0.9em;
}
.score-date{
	color: #656565;
	font-size: 0.8em;
	float: left;
	width: 53%;
}
.score-score{
	float: right;
	width: 25%;
}
#footer{
	width: 100%;
	text-align: center;
	margin-top: 10px;
}
#footer a{
	color: #bbb;
	font-size: 1.2em;
}
</style>
</head>  
<body> 
<h1>Curtain call</h1>
<canvas width="720" height="540" id="canvas"><p>Your browser doesn't support HTML5. To play the game, please update your browser software!</p></canvas>
<div id="highscore">
<span id="mode"><?php echo ((isset($_GET["source"])) ? "Development mode" : ""); ?></span>
<p>Don't get hit by bullets! Bullets appear in different patterns and single pattern lasts for from 30 to 60 seconds. </p>
<p><b>Controls</b></p>
<p>Move: Arrow keys<br />
Slow movement: Shift key<br />
Pause: Space</p>
<h2>Highscores</h2>
<div id="highscore-list"></div>
</div>
<div id="footer"><a href="http://spike.viuhka.fi">http://spike.viuhka.fi</a></div>
</p>
</div>
</body>  
</html>
<?php

?>
<?php
class ServerType
{
	const VIUHKA = 0;
	const EASYPHP = 1;
	const LUDOCRAFT = 2;
}
$serverType = ServerType::VIUHKA;
switch($serverType)
{
	case ServerType::VIUHKA :
		$host = "localhost";
		$user = "spike";
		$pass = "7yN)5Z9d+L35";
		$db = "spike";
	break;
	case ServerType::EASYPHP :
		$host = "127.0.0.1";
		$user = "root";
		$pass = "";
		$db = "html5shmup";
	break;
	case ServerType::LUDOCRAFT :
		$host = "localhost";
		$user = "root";
		$pass = "";
		$db = "asandberg";
	break;
}
mysql_connect($host, $user, $pass);
mysql_select_db($db);

if(isset($_POST["name"]))
{
	if($_POST["name"] != "null" && $_POST["name"] != "")
	{
		$sql = "select * from highscore";
		$result = mysql_query($sql);
		$name = mysql_real_escape_string($_POST["name"]);
		$deaths = mysql_real_escape_string($_POST["deaths"]);
		$clears = mysql_real_escape_string($_POST["clears"]);
		
		$sql = "select id, deaths, cleared from highscore where player = '".$name."' and ip = '".$_SERVER["REMOTE_ADDR"]."'";
		$result = mysql_query($sql);
		$id;
		if(mysql_num_rows($result) == 1)
		{			
			$id = mysql_result($result, 0);
			$sql = "update highscore set playtimes = (playtimes + 1), date = date where id = '".$id. "'";
			mysql_query($sql);
			
			$table = mysql_fetch_assoc($result);
			$deathsOld = $table["deaths"];
			$clearsOld = $table["cleared"];
			if($clearsOld < $clears || ($clearsOld == $clears && $deathsOld >= $deaths))
			{
				$sql = "update highscore set deaths = '".$deaths."', cleared = '".$clears."' where id = '".$id. "'";
				mysql_query($sql);
			}
		}
		else
		{
			$sql = "insert into highscore(player, deaths, cleared, ip) values ('".$name."', '".$deaths."', '".$clears."', '".$_SERVER["REMOTE_ADDR"]."')";
			mysql_query($sql);
			$sql = "select max(id) from highscore where player = '".$name."'";
			$result = mysql_query($sql);
			$id = mysql_result($result, 0);
		}
		echo $id;
	}
	else
		echo "Tietoja ei tallennettu";
}
else if(isset($_POST["get_id"]))
{
	$sql = "select id from highscore where ip = '".$_SERVER["REMOTE_ADDR"]."' order by date desc";
	$result = mysql_query($sql);
	if(mysql_num_rows($result) > 0)
	{
		echo mysql_result($result, 0);
	}
	else 
		echo mysql_error();
}
else if(isset($_POST["get_list"]))
{
	$sql = "select * from highscore order by cleared desc, deaths, date desc";
	$result = mysql_query($sql);
	$i = 1;
	$id = (isset($_POST["id"])) ? $_POST["id"] : -1;
	while($row = mysql_fetch_assoc($result))
	{
		Score($i, $row["player"], $row["cleared"] . " clears", $row["deaths"]. " deaths", date("M dS Y H:i" , strtotime($row["date"])), ($id == $row["id"])); 
		$i++;
	}
}
function Score($nro, $name, $clears, $deaths, $date, $own)
{
	echo '<div class="score'.($own ? " own" : "").'">
			<div class="score-nro">'.$nro.'</div>
			<div class="score-name">'.$name.'</div>
			<div class="score-score">'.$clears.'<br />'.$deaths.'</div>
			<div class="score-date">'.$date.'</div>
			<div style="width: 100%; clear:both"></div>
		</div>';
}
?>
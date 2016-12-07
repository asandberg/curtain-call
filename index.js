// JavaScript Document
var Development;
$(function ()
{
	if($("#mode").html() == "Development mode")
	{ Development = true; }
	else
	{ Development = false; }
	
	if(!Development)
		GetRecords();
	
	Initialize();
});

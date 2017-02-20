function rchange(){
	var oRnav=document.getElementById("rnav");
	var oZnav=document.getElementById("znav");
	var oJnav=document.getElementById("jnav");
	var oFnav=document.getElementById("fnav");
	var oTuijian=document.getElementById("recommend");
	var oZuixin=document.getElementById("new");
	oRnav.style.borderBottom='2px solid #2aa0a8';
	oZnav.style.borderBottom='none';
	oJnav.style.borderBottom='none';
	oFnav.style.borderBottom='none';
	oTuijian.style.display='block';
	oZuixin.style.display='none';
}
function xchange(){
	var oRnav=document.getElementById("rnav");
	var oZnav=document.getElementById("znav");
	var oJnav=document.getElementById("jnav");
	var oFnav=document.getElementById("fnav");
	var oTuijian=document.getElementById("recommend");
	var oZuixin=document.getElementById("new");
	oRnav.style.borderBottom='none';
	oZnav.style.borderBottom='2px solid #2aa0a8';
	oJnav.style.borderBottom='none';
	oFnav.style.borderBottom='none';
	oTuijian.style.display='none';
	oZuixin.style.display='block';
}
function jchange(){
	var oRnav=document.getElementById("rnav");
	var oZnav=document.getElementById("znav");
	var oJnav=document.getElementById("jnav");
	var oFnav=document.getElementById("fnav");
	var oTuijian=document.getElementById("recommend");
	var oZuixin=document.getElementById("new");
	oRnav.style.borderBottom='none';
	oZnav.style.borderBottom='none';
	oJnav.style.borderBottom='2px solid #2aa0a8';
	oFnav.style.borderBottom='none';
	oTuijian.style.display='none';
	oZuixin.style.display='block';
}
function fchange(){
	var oRnav=document.getElementById("rnav");
	var oZnav=document.getElementById("znav");
	var oJnav=document.getElementById("jnav");
	var oFnav=document.getElementById("fnav");
	var oTuijian=document.getElementById("recommend");
	var oZuixin=document.getElementById("new");
	oRnav.style.borderBottom='none';
	oZnav.style.borderBottom='none';
	oJnav.style.borderBottom='none';
	oFnav.style.borderBottom='2px solid #2aa0a8';
	oTuijian.style.display='none';
	oZuixin.style.display='block';
}
function tchange(){
	var oTnav=document.getElementById("tnav");
	var oXnav=document.getElementById("xnav");
	var oMnav=document.getElementById("mnav");
	var oTiezi=document.getElementById("list");
	var oXiangce=document.getElementById("photo");
	var oMdan=document.getElementById("word");
	oTnav.style.color='#aefffc';
	oXnav.style.color='#fff';
	oMnav.style.color='#fff';
	oTnav.style.borderBottom='0.3em solid #5acfd8';
	oXnav.style.borderBottom='none';
	oMnav.style.borderBottom='none';
	oTiezi.style.display='block';
	oXiangce.style.display='none';
	oMdan.style.display='none';
}
function xchange(){
	var oTnav=document.getElementById("tnav");
	var oXnav=document.getElementById("xnav");
	var oMnav=document.getElementById("mnav");
	var oTiezi=document.getElementById("list");
	var oXiangce=document.getElementById("photo");
	var oMdan=document.getElementById("word");
	oTnav.style.color='#fff';
	oXnav.style.color='#aefffc';
	oMnav.style.color='#fff';
	oTnav.style.borderBottom='none';
	oXnav.style.borderBottom='0.3em solid #5acfd8';
	oMnav.style.borderBottom='none';
	oTiezi.style.display='none';
	oXiangce.style.display='block';
	oMdan.style.display='none';
}
function mchange(){
	var oTnav=document.getElementById("tnav");
	var oXnav=document.getElementById("xnav");
	var oMnav=document.getElementById("mnav");
	var oTiezi=document.getElementById("list");
	var oXiangce=document.getElementById("photo");
	var oMdan=document.getElementById("word");
	oTnav.style.color='#fff';
	oXnav.style.color='#fff';
	oMnav.style.color='#aefffc';
	oTnav.style.borderBottom='none';
	oXnav.style.borderBottom='none';
	oMnav.style.borderBottom='0.3em solid #5acfd8';
	oTiezi.style.display='none';
	oXiangce.style.display='none';
	oMdan.style.display='block';
}
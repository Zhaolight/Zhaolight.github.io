function fcolor(){
	var oFnav=document.getElementById("fnav");
	var oSnav=document.getElementById("snav");
	var oTnav=document.getElementById("tnav");
	var oYugao=document.getElementById("notice_wrap");
	var oJinxing=document.getElementById("process_wrap");
	var oJieshu=document.getElementById("end_wrap");
	oFnav.style.color='#eb4f38';
	oSnav.style.color='#888';
	oTnav.style.color='#888';
	oYugao.style.display='block';
	oJinxing.style.display='none';
	oJieshu.style.display='none';
}
function scolor(){
	var oFnav=document.getElementById("fnav");
	var oSnav=document.getElementById("snav");
	var oTnav=document.getElementById("tnav");
	var oYugao=document.getElementById("notice_wrap");
	var oJinxing=document.getElementById("process_wrap");
	var oJieshu=document.getElementById("end_wrap");
	oFnav.style.color='#888';
	oSnav.style.color='#eb4f38';
	oTnav.style.color='#888';
	oYugao.style.display='none';
	oJinxing.style.display='block';
	oJieshu.style.display='none';
}
function tcolor(){
	var oFnav=document.getElementById("fnav");
	var oSnav=document.getElementById("snav");
	var oTnav=document.getElementById("tnav");
	var oYugao=document.getElementById("notice_wrap");
	var oJinxing=document.getElementById("process_wrap");
	var oJieshu=document.getElementById("end_wrap");
	oFnav.style.color='#888';
	oSnav.style.color='#888';
	oTnav.style.color='#eb4f38';
	oYugao.style.display='none';
	oJinxing.style.display='none';
	oJieshu.style.display='block';
}
function gZhu(){
	var oGzhu=document.getElementById("btn1");
	if (oGzhu.style.background=="") {
		oGzhu.style.background="#eb4f38";
		oGzhu.style.border.color="#eb4f38";
	}
	else{
		oGzhu.style.background="";
		oGzhu.style.border.color='#5acfd7';
	}
}
function pingLun(){
	var oPlun=document.getElementById('comment');
	if (oPlun.style.display=="block") {
		oPlun.style.display="none";
	}
	else{
		oPlun.style.display="block";
	}
}
function sheZhi() {
				var oDiv=document.getElementById('cebian');
				var oSide=document.getElementById('side');
				var oWrap=document.getElementById('wrap');
				if (oWrap.style.position=='fixed') {
					oSide.style.transform='translateX(-100%)';
					oWrap.style.position='absolute';
					oWrap.style.left='0';
				}
				else{
					oSide.style.transform='translateX(0)';
					oWrap.style.position='fixed';
					oWrap.style.left='80%';
				}
			}
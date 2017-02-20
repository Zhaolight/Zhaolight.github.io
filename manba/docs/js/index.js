function sheZhi() {
    var oDiv = document.getElementById('cebian');
    var oSide = document.getElementById('side');
    var oWrap = document.getElementById('wrap');
    if (oWrap.style.position == 'fixed') {
        oSide.style.transform = 'translateX(-100%)';
        oWrap.style.position = 'absolute';
        oWrap.style.left = '0';

    }
    else {
        oSide.style.transform = 'translateX(0)';
        oWrap.style.position = 'fixed';
        oWrap.style.left = '80%';
    }
    // oSide.style.background='#000';
}
var swiper = new Swiper('.swiper-container', {
    pagination: '.swiper-pagination',
    paginationClickable: true
});

function login(){




}

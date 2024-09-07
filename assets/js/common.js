window.onscroll = function () {
    var header = document.getElementById("header");
    var headerTop = header.getBoundingClientRect().top;
    if (headerTop === 0) {
        header.style.backgroundImage="url('assets/graphics/common/backdrop.png')";
        header.style.backgroundColor="white";
    } else {        
        header.style.backgroundImage="none";
        header.style.backgroundColor="transparent";
    }
};
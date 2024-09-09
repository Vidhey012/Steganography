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

function mypage(){
    Swal.fire({
        imageUrl: 'assets\\graphics\\common\\mypage.png',
        title: " Are you sure? 🤔",
        html: "You seem ready to leave!🚪<br/>Do you really want to quit? 😟",
        showCancelButton: true,
        confirmButtonText: 'Yes, Leave 🏠',
        cancelButtonText: 'No, Stay 😌',
        imageAlt: "Quit image"
      }).then((result) => {
        if(result.isConfirmed){
            window.open('https://vidhey.netlify.app/','_blank');
        } else {
            /* if not quitted */
        }       
      });
}
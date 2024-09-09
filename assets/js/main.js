function showInfo(option){
    Swal.fire({
        imageUrl: option ? 'assets\\graphics\\main_page\\unwrap.png' : 'assets\\graphics\\main_page\\wrap.png' ,
        showConfirmButton: false,
        imageAlt: "Info image"
      });
}
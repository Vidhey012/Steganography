function showStep(step) {
    if(validate(step)){
        document.querySelectorAll('.step-button, .step-content').forEach(function(el) {
             el.classList.remove('active');
            });

         document.getElementById('step' + step).classList.add('active');
         document.getElementById('content' + step).classList.add('active');

         document.querySelectorAll('.step-button').forEach(function(button) {
             if (button.id === 'step' + step) {
                 button.textContent = button.getAttribute('data-step-name');
             } else {
                 button.textContent = button.getAttribute('data-step-number');
             }
         });
     
         document.querySelectorAll('.step-button').forEach(function(button) {
             button.style.width = 'auto'; 
         });
    } else {
        
    }
    
}

function validate(step){
    if(step==1){
        var style = document.createElement('style');
        style.innerHTML = `
            input::placeholder {
                color: #6c757d !important;
            }
            .upload-box p {
            color: #007bff !important;
            }
        `;
        document.head.appendChild(style);
        return true;
    }
    else if(step==2){
        var style = document.createElement('style');
        style.innerHTML = `
            textarea::placeholder {
                color: #6c757d !important;
            }
            .upload-box p {
            color: #007bff !important;
            }
        `;
        document.head.appendChild(style);
        if(document.getElementById("message").value.trim()==""){
            document.getElementById("message").value="";
            invalid("textarea","input");
            showStep(1);
        } else {
            return true;
        }
    }
    else if(step==3){
        var style = document.createElement('style');
        style.innerHTML = `
            textarea::placeholder,
            input::placeholder {
                color: #6c757d !important;
            }
        `;
        document.head.appendChild(style);
        if(document.getElementById("message").value.trim()==""){
            document.getElementById("message").value="";
            invalid("textarea","input");
            showStep(1);
        } else if(document.getElementById("key").value.trim()==""){
            document.getElementById("key").value="";
            invalid("input","textarea");
            showStep(2);
        } else {
            return true;
        }
    }
}

function invalid(tag,notag){
    var style = document.createElement('style');
        style.innerHTML = `
            ${tag}::placeholder {
                color: red !important;
            }
            ${notag}::placeholder {
                color: #6c757d !important;
            }
        `;
        document.head.appendChild(style);
}

showStep(1);

document.getElementById('upload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                document.getElementById('uploadBox').style.backgroundImage = `url(${e.target.result})`;
                document.getElementById('canvas').src=e.target.result;
                document.getElementById('canvas').style.height=img.height;
                document.getElementById('canvas').style.width=img.width;
                uploadBox.classList.add('hidden-text');
            };
            img.src = e.target.result;
        }
        reader.readAsDataURL(file);
    } else {        
        document.getElementById('canvas').src=null;
        document.getElementById('uploadBox').style.backgroundImage = "none";
        uploadBox.classList.remove('hidden-text');
    }
});

function generate(){
    var style = document.createElement('style');
        style.innerHTML = `
            textarea::placeholder,
            input::placeholder {
                color: #6c757d !important;
            }
        `;
        document.head.appendChild(style);
    if(document.getElementById("upload").value==""){
        document.getElementById('uploadBox').style.backgroundImage = "none";
        uploadBox.classList.remove('hidden-text');
        var style = document.createElement('style');
        style.innerHTML = `
        .upload-box p {
            color: red !important;
        }
    `;
    document.head.appendChild(style);
    } else {        
        document.getElementsByClassName("full-screen")[0].style.display = "flex";
        var img= document.getElementById('canvas');
        var msg="#*...start-vidhey...*#"+document.getElementById("message").value+"#*...end-vidhey...*#";
        var key=document.getElementById("key").value;
        var encrypted=encrypt(key,msg);   
        var hexEnc=binaryToHex(encrypted);
        var stegImg=steg.encode(hexEnc,img);
        document.getElementById("canvas").src = stegImg;
        // console.log("msg :"+msg);
        // console.log("key :"+key);
        // console.log("hex :"+hexEnc);
        // setTimeout(function() {
        //     console.log("This message appears after 2 seconds.");
        // }, 2000);
        download(stegImg);
    }
}

function encrypt(key,msg){
    const morseKey = numberToMorse(key);
    const binaryKey = morseToBinary(morseKey);
    const binaryMessage = textToBinary(msg);
    const encryptedBinaryMessage = "1"+xorEncryptDecrypt(binaryMessage, binaryKey);
    // console.log("morse :"+morseKey);
    // console.log("bin key :"+binaryKey);
    // console.log("bin msg :"+binaryMessage);
    // console.log("xor :"+encryptedBinaryMessage);
    return encryptedBinaryMessage;
}

const morseCodeMap = {
    '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....',
    '6': '-....', '7': '--...', '8': '---..', '9': '----.'
};

function numberToMorse(key) {
    return key.split('').map(digit => morseCodeMap[digit] || '').join(' ');
}

function morseToBinary(morse) {
    return morse.split('').map(char => {
        switch (char) {
            case '.': return '1';
            case '-': return '0';
            default: return '';
        }
    }).join('');
}

function textToBinary(text) {
    return Array.from(text).map(char => {
        const codePoint = char.codePointAt(0);
        return codePoint.toString(2).padStart(21, '0');
    }).join('');
}

function binaryToHex(binaryString) {
    binaryString = binaryString.replace(/[^01]/g, '');
    while (binaryString.length % 4 !== 0) {
        binaryString = '0' + binaryString;
    }

    let hexString = '';
    for (let i = 0; i < binaryString.length; i += 4) {
        const binaryChunk = binaryString.substr(i, 4);
        const hexDigit = parseInt(binaryChunk, 2).toString(16).toUpperCase();
        hexString += hexDigit;
    }

    return hexString;
}

function xorEncryptDecrypt(binaryMessage, binaryKey) {
    let result = '';
    for (let i = 0; i < binaryMessage.length; i++) {
        result += binaryMessage[i] === binaryKey[i % binaryKey.length] ? '0' : '1';
    }
    return result;
}

function download(img){
    document.getElementsByClassName("full-screen")[0].style.display = "none";
    Swal.fire({
        imageUrl: img,
        confirmButtonText: 'Download 📥',
        imageAlt: "Stegnoed image"
      }).then((result) => {
        if(result.isConfirmed){
            var img = document.getElementById('canvas');
            var a = document.createElement('a');
            a.download = 'Gift-Box.png';
            a.href = img.src;
            a.click();
            home(0);
        } else {
            /* if not downloaded */
        }       
      });

}

function home(type){
    Swal.fire({
        imageUrl: 'assets\\graphics\\common\\quit.gif',
        title: type == 0 ? "Download Started 🎉" : " Are you sure? 🤔",
        html: type == 0 ? "Your file 🗂️ is ready!<br/>Would you like to head back to the home page? 🏠" : "You seem ready to leave!🚪<br/>Do you really want to quit? 😟",
        showCancelButton: true,
        confirmButtonText: type == 0 ? 'Home 🏡' : 'Yes, Leave 🏠',
        cancelButtonText: type == 0 ?  'Stay 😌' : 'No, Stay 😌',
        imageAlt: "Quit image"
      }).then((result) => {
        if(result.isConfirmed){
            window.open('index.html','_self');
        } else {
            /* if not quitted */
        }       
      });
}

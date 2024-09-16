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
            `;
        document.head.appendChild(style);
        return true;
    }
    else if(step==2){
        if(document.getElementById("upload").value.trim()==""){
            var style = document.createElement('style');
            style.innerHTML = `
            .upload-box p {
                color: red !important;
            }
            `;
            document.head.appendChild(style);
            showStep(1);
        } else {
            var style = document.createElement('style');
            style.innerHTML = `
            .upload-box p {
            color: #007bff !important;
            }
            `;
            document.head.appendChild(style);
            return true;
        }
    }
    else {
        return true;
    }
}

function readMsg(){
    if(document.getElementById("upload").value.trim()=="") {
        var style = document.createElement('style');
        style.innerHTML = `
        .upload-box p {
            color: red !important;
        }
        `;
        document.head.appendChild(style);
        showStep(1);
    } else if(document.getElementById("key").value.trim()=="") {
        var style = document.createElement('style');
        style.innerHTML = `
        input::placeholder {
            color: red !important;
        }
        `;
        document.head.appendChild(style);
        showStep(2);
    } else {
        var style = document.createElement('style');
            style.innerHTML = `
            .upload-box p {
            color: #007bff !important;
            }
            input::placeholder {
                color: #6c757d !important;
            }
            `;
        document.head.appendChild(style);
        generate();
    }
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
    var img= document.getElementById('canvas');
    var encHex=steg.decode(img);
    var encMsg=hexToBinary(encHex);
    encMsg=encMsg.substring(1);
    var key=document.getElementById("key").value;
    var decrypted=decrypt(key, encMsg);
    const match = decrypted.match(/#\*.*?start-vidhey.*?\*#(.*?)#\*.*?end-vidhey.*?\*#/s);
    var message = match ? match[1].trim() : "Oops, this was an empty giftbox 🥺...!";
    document.getElementById("message").value=message;
    // console.log("key :"+key);
    // console.log("msg :"+decrypted);
    // console.log("hex :"+encHex);
    // console.log("xor :"+encMsg);
    showStep(3);
}

function decrypt(key, encMsg) {
    const morseKey = numberToMorse(key);
    const binaryKey = morseToBinary(morseKey);
    const decryptedBinaryMessage = xorEncryptDecrypt(encMsg, binaryKey);
    // console.log("morse :"+morseKey);
    // console.log("bin key :"+binaryKey);
    // console.log("bin msg :"+decryptedBinaryMessage);
    return binaryToText(decryptedBinaryMessage);
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

function hexToBinary(hexString) {
    hexString = hexString.replace(/[^0-9A-Fa-f]/g, '');

    let binaryString = '';
    for (let i = 0; i < hexString.length; i++) {
        const hexDigit = hexString.charAt(i);
        const binaryChunk = parseInt(hexDigit, 16).toString(2).padStart(4, '0');
        binaryString += binaryChunk;
    }

    binaryString = binaryString.replace(/^0+/, '');

    return binaryString.length > 0 ? binaryString : '0';
}

function xorEncryptDecrypt(binaryMessage, binaryKey) {
    let result = '';
    for (let i = 0; i < binaryMessage.length; i++) {
        result += binaryMessage[i] === binaryKey[i % binaryKey.length] ? '0' : '1';
    }
    return result;
}

function binaryToText(binary) {
    let text = '';
    for (let i = 0; i < binary.length; i += 21) {
        const binarySegment = binary.substring(i, i + 21);
        if (binarySegment.length < 21) {
            const paddedSegment = binarySegment.padStart(21, '0');
            const codePoint = parseInt(paddedSegment, 2);
            if (codePoint <= 0x10FFFF) {
                text += String.fromCodePoint(codePoint);
            }
        } else {
            const codePoint = parseInt(binarySegment, 2);
            if (codePoint <= 0x10FFFF) {
                text += String.fromCodePoint(codePoint);
            }
        }
    }
    return text;
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

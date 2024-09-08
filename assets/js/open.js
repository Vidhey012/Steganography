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
            document.getElementById('uploadBox').style.backgroundImage = `url(${e.target.result})`;
            document.getElementById('canvas').src=e.target.result;
            uploadBox.classList.add('hidden-text');
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
    var encMsg=steg.decode(img);
    var key=document.getElementById("key").value;
    var decrypted=decrypt(key, encMsg);
    const match = decrypted.match(/#\*.*?start-vidhey.*?\*#(.*?)#\*.*?end-vidhey.*?\*#/s);
    var message = match ? match[1].trim() : "Oops, this was an empty giftbox 🥺";
    document.getElementById("message").value=message;
    showStep(3);
}

function decrypt(key, encMsg) {
    const morseKey = numberToMorse(key);
    const binaryKey = morseToBinary(morseKey);
    const decryptedBinaryMessage = xorEncryptDecrypt(encMsg, binaryKey);
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
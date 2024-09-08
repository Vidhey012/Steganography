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
        var img= document.getElementById('canvas');
        var msg="#*...start-vidhey...*#"+document.getElementById("message").value+"#*...end-vidhey...*#";
        var key=document.getElementById("key").value;
        var encrypted=encrypt(key,msg);   
        document.getElementById("canvas").src=steg.encode(encrypted,img);
    }
}

function encrypt(key,msg){
    const morseKey = numberToMorse(key);
    const binaryKey = morseToBinary(morseKey);
    const binaryMessage = textToBinary(msg);
    const encryptedBinaryMessage = xorEncryptDecrypt(binaryMessage, binaryKey);
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

function xorEncryptDecrypt(binaryMessage, binaryKey) {
    let result = '';
    for (let i = 0; i < binaryMessage.length; i++) {
        result += binaryMessage[i] === binaryKey[i % binaryKey.length] ? '0' : '1';
    }
    return result;
}
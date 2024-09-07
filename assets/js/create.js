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
        return true;
    }
    else if(step==2){
        if(document.getElementById("message").value.trim()==""){
            document.getElementById("message").value="";
            invalid();
            showStep(1);
        } else {
            return true;
        }
    }
    else if(step==3){
        if(document.getElementById("message").value.trim()==""){
            document.getElementById("message").value="";
            invalid();
            showStep(1);
        } else if(document.getElementById("key").value.trim()==""){
            document.getElementById("key").value="";
            invalid();
            showStep(2);
        } else {
            return true;
        }
    }
}

function invalid(){
    var style = document.createElement('style');
        style.innerHTML = `
            textarea::placeholder,
            input::placeholder {
                color: red !important;
            }
        `;
        document.head.appendChild(style);
}

showStep(1);
var fileData; 

document.getElementById('upload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    fileData=file;
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('uploadBox').style.backgroundImage = `url(${e.target.result})`;
            uploadBox.classList.add('hidden-text');
        }
        reader.readAsDataURL(file);
    }
});

function generate(){
    if(document.getElementById("upload").value==""){
        var style = document.createElement('style');
        style.innerHTML = `
        .upload-box p {
            color: red !important;
        }
    `;
    document.head.appendChild(style);
    } else {
        var msg=document.getElementById("message").value;
        var key=document.getElementById("message").value;        
        var file=fileData;
        var encrypted=encrypt(key,msg);
        stegno(file,encrypted);
    }
}

function encrypt(key,msg){
    const msgBinary = toAsciiBinary(msg);
    let keyBinary = toMorseBinary(key);
    keyBinary = keyBinary.padEnd(msgBinary.length, '0');
    const encBinary = xorBinary(msgBinary, keyBinary);
    return encBinary;
}

function toAsciiBinary(msg) {
    return Array.from(msg).map(char => {
        return char.codePointAt(0).toString(2).padStart(32, '0');
    }).join('');
}

function toMorseBinary(key) {
    const morseCode = {
        '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....',
        '6': '-....', '7': '--...', '8': '---..', '9': '----.'
    };
    return Array.from(String(key)).map(digit => morseCode[digit])
        .join('').split('').map(char => char === '.' ? '1' : '0').join('');
}

function xorBinary(binary1, binary2) {
    const length = Math.min(binary1.length, binary2.length);
    let result = '';
    for (let i = 0; i < length; i++) {
        result += (binary1[i] !== binary2[i]) ? '1' : '0';
    }
    return result;
}

function binaryStringToArray(binaryString) {
    return Array.from(binaryString).map(bit => parseInt(bit, 2));
}

function stegno(imageFile, encryptedBinary) {
    const canvas = document.getElementById("canvas");
    if (!canvas) {
        console.error('Canvas element not found.');
        return;
    }
    
    const ctx = canvas.getContext("2d");
    if (!ctx) {
        console.error('Failed to get canvas context.');
        return;
    }

    const img = new Image();
    img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        let binaryIndex = 0;

        for (let i = 0; i < data.length && binaryIndex < encryptedBinary.length; i += 4) {
            for (let j = 0; j < 3; j++) {
                if (binaryIndex < encryptedBinary.length) {
                    data[i + j] = (data[i + j] & ~1) | binaryStringToArray(encryptedBinary)[binaryIndex];
                    binaryIndex++;
                }
            }
        }

        ctx.putImageData(imageData, 0, 0);
        canvas.toBlob(blob => {
            if (blob) {
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = 'Gift-Box.png';
                link.click();
            } else {
                console.error('Failed to create blob from canvas.');
            }
        });
    };

    img.onerror = () => {
        console.error('Failed to load image.');
    };

    img.src = URL.createObjectURL(imageFile);
}
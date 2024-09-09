# Steganography Web Application - Gift Box 🎁

Welcome to **Stegno**, a fun and secure steganography tool! Unlike traditional steganography techniques, this web application presents a unique and interactive way to hide and reveal secret messages, all while keeping things wrapped up in a "gift box" metaphor. 🌟

🚀 **Live Demo:** [Stegno Web App](https://stegno.netlify.app)



## ✨ Project Overview

This web application allows users to encrypt their messages in a highly secure and innovative way, making it more engaging than other existing steganography tools. The UI is designed to be intuitive, making the encryption process feel like preparing a gift and decryption like opening one. 🎁

### 📜 Features

- **Interactive Interface:** Users interact with the app as if they are creating and unwrapping gifts, making the process enjoyable.
- **Encryption Process:** Messages are encrypted using a combination of Unicode binary and Morse code techniques, ensuring robust security. 🛡️
- **Image Embedding:** The encrypted message is hidden within an image (the ribbon), adding an extra layer of security.
- **Decryption:** The reverse process of untying the ribbon and unwrapping the gift reveals the original message.



## 🎨 UI Overview

The UI is sleek and user-friendly, guiding users step by step through the process of creating and opening gift boxes. Here's how it works:

1. **Create a Gift Box (Encrypt Message)**
    - Input your secret message (the "gift box"). 🎁
    - Provide a secret key (the "gift wrap"). 🧾
    - The message is converted to binary, and the key is encoded in Morse binary.
    - After encryption, upload an image (the "ribbon") to hide the message. 🎀
    - The gift box is ready for download!

2. **Open a Gift Box (Decrypt Message)**
    - Upload the steganographic image (the "gift box"). 📦
    - Enter the secret key to unwrap the box and reveal the hidden message. 🗝️



## 🛠️ Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Encryption Methods:** Unicode binary, Morse code, XOR encryption
- **Image Processing:** Image embedding for steganography
- **Deployment:** Hosted on [Netlify](https://stegno.netlify.app)



## 💡 How It Works

### Step 1: Create a Gift Box 🎁
1. **Enter your message** (gift box) on the first card.
2. Click **Next**, then enter a **secret key** (gift wrap).
3. The encryption process begins:
    - The message is converted into Unicode binary.
    - The secret key is transformed into Morse code, and then Morse binary.
    - The message and key are XORed, and the binary output is converted to hexadecimal.
4. Click **Next**, and upload an image (the ribbon) to hide the encrypted message.
5. Finally, click **Generate** to complete the process, and download the final image (the gift box).

### Step 2: Open a Gift Box 🎁
1. Upload the **gift box** (steganographic image).
2. Enter the **secret key** to decrypt the hidden message.
3. The message is revealed in the text area!



## 🔒 Security & Accuracy

The combination of binary encoding, Morse code, and XOR encryption ensures that the hidden message is securely embedded within the image. This results in an accurate and tamper-proof steganographic process. 🔐



## 🛠️ How to Run Locally

1. Clone the repository:
    ```bash
    git clone https://github.com/Vidhey012/steganography.git
    ```

2. Navigate to the project directory:
    ```bash
    cd steganography
    ```

3. Run the project:
    ```bash
    start index.html
    ```



## 🌐 Deployment

The project is deployed and accessible via [Netlify](https://stegno.netlify.app). You can easily deploy it yourself using services like Netlify or Vercel.



## 📬 Feedback

I'd love to hear your thoughts on this project! Feel free to reach out via [LinkedIn](https://www.linkedin.com/in/bhogadi-vidhey-aa62b71a8/) or open an issue on GitHub if you encounter any bugs or have suggestions for improvements. 😊



## 🔧 Future Enhancements

- Add support for more encryption methods 🔐
- Improve UI with more animations and visual feedback 💻
- Add a feature for batch processing multiple messages 📑



## 👨‍💻 Author

Made with ❤️ by [𝐕𝐢𝐝𝐡𝐞𝐲 𝐁𝐡𝐨𝐠𝐚𝐝𝐢](https://vidhey.netlify.app/)⚡




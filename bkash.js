function triggerShake() {
    const container = document.getElementById('send-money-form');
    let shakeInterval;
    let shakeTime = 0;

    function shake() {
        const randomX = Math.floor(Math.random() * 6) - 3; // Small shake between -3px and 3px for X (left-right)
        container.style.transform = `translateX(${randomX}px)`; // Only translate along the X-axis
        shakeTime += 50; // Shake duration in milliseconds
        if (shakeTime >= 300) { // Shake for 300ms (for a smoother and shorter effect)
            clearInterval(shakeInterval);
            container.style.transform = ''; // Reset the transform property after the shake
        }
    }

    shakeInterval = setInterval(shake, 50); // Start shaking at 50ms intervals
}

const imageInput = document.getElementById('imageInput');
const imagePreview = document.getElementById('imagePreview');
const output = document.getElementById('output');
const overlay = document.getElementById('overlay');
const popup = document.getElementById('popup');
const loadingPopup = document.getElementById('loadingPopup');
const sendButton = document.querySelector('#send-money-form button');
let fetchedDataValue;
let audioPlayed = false;
const audioElement = new Audio('ting.mp3');
const audioElement2 = new Audio('fail.mp3');
audioElement.preload = 'auto';
audioElement.load();
audioElement2.preload = 'auto';
audioElement2.load();

function preprocessImage(imageSrc) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    return new Promise((resolve, reject) => {
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;

            for (let i = 0; i < data.length; i += 4) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];
                const grayscale = r * 0.3 + g * 0.59 + b * 0.11;
                data[i] = data[i + 1] = data[i + 2] = grayscale;
            }
            ctx.putImageData(imageData, 0, 0);
            resolve(canvas.toDataURL()); // Return processed image as base64
        };
        img.onerror = reject;
        img.src = imageSrc; // Set src after attaching onload and onerror
    });
}

imageInput.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            preprocessImage(event.target.result) // Use the preprocessed image
                .then((processedImageSrc) => {
                    const imgElement = document.createElement('img');
                    imgElement.src = processedImageSrc;
                    imagePreview.innerHTML = '';
                    imagePreview.appendChild(imgElement);
                    loadingPopup.style.display = 'block';
                    return Tesseract.recognize(
                        processedImageSrc, // Pass processed image source
                        'eng+ben',
                        { logger: m => console.log(m), psm: 6 }
                    );
                })
                .then(({ data: { text } }) => {
                    loadingPopup.style.display = 'none';
                    console.log('Full Extracted Text:', text);

                    const phoneRegex = /(\+880|0)?[0-9]{10}/;
                    const transactionIdRegex = /\bB[A-Z0-9]{9}\b/;
                    const totalAmountRegex = /\d+(\.\d{2})/;
                    const referenceRegex = /\d{12}/;

                    const phoneMatch = text.match(phoneRegex);
                    const transactionIdMatch = text.match(transactionIdRegex);
                    const totalAmountMatch = text.match(totalAmountRegex);
                    const referenceMatch = text.match(referenceRegex);

                    if (phoneMatch && transactionIdMatch && totalAmountMatch && referenceMatch) {
                        document.getElementById('name').value = phoneMatch[0];
                        document.getElementById('amount').value = totalAmountMatch[0];
                        document.getElementById('description').value = transactionIdMatch[0];
                        document.getElementById('reference').value = referenceMatch[0];
                        overlay.style.display = 'block';
                        popup.style.display = 'block';
                    } else {
                        alert("দুঃখিত। সঠিক তথ্য নেই.");
                        location.reload();
                    }
                })
                .catch(error => {
                    loadingPopup.style.display = 'none';
                    output.innerHTML = `<h2>Error:</h2><p>${error.message}</p>`;
                });
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById('send-money-form').addEventListener('submit', function (e) {
    e.preventDefault();
    sendButton.style.display = 'none';
    
    const accountNumber = document.getElementById('name').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const description = document.getElementById('description').value;
    const reference = document.getElementById('reference').value;
    const secureData = JSON.parse(localStorage.getItem('secureData'));
    const name = secureData.name;
    const matchedName = "from " + name;
    const msg2 = 'Cash In - Bkash';
    const msg = `Dear Sir, A/C ${reference} tnx ${description} (Cash In) by ${amount} BDT.`;
    const surl = secureData.surl;
    const saentry = secureData.saentry;
    const sdentry = secureData.sdentry;

    async function fetchSheetData() {
    const sheetUrl = 'https://docs.google.com/spreadsheets/d/1sXMz_aF0YVV8NGf6AbGfhdK-ObETYvkbia-gua3Gdu8/htmlview'; // Your Google Sheet Public HTML link
    const response = await fetch(sheetUrl);
    const text = await response.text();
    
    // Create a temporary DOM element to parse the HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');
    
    // Extract table rows from the parsed HTML
    const rows = Array.from(doc.querySelectorAll('table tr'));
    return rows.map(row => Array.from(row.querySelectorAll('td')).map(cell => cell.innerText.trim()));
}

function searchInSheet() {
    const searchValue = document.getElementById('description').value.trim(); // Keep the value as it is
    fetchSheetData()
        .then(data => {
            let found = false;
            // Loop through the fetched data to find a match
            for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < data[i].length; j++) {
                    // Check for an exact match (case-sensitive or convert to lowercase for case-insensitivity)
                    if (data[i][j].trim().toLowerCase() === searchValue.toLowerCase()) {
                        found = true;
                        console.log(`Found exact match: ${data[i][j]} at row ${i + 1}, column ${j + 1}`);
                        break;
                    }
                }
                if (found) break;
            }

            if (found) {
                console.log('Match found, preventing form submission');
                document.getElementById('no-connection-popup2').style.display = 'block';
                document.getElementById('result2').innerText = `ইতোমধ্যে যোগ করা হয়েছে `;
                
                if (!audioPlayed) {
                    audioElement2.play().catch(error => console.error('Audio playback failed:', error));
                    audioPlayed = true;
                }
setTimeout(function() {
                    window.location.href = "user.html";
                }, 3000);
                // Prevent form submission and re-show the send button
                sendButton.style.display = 'block';
return;
            } else {
                console.log('No match found, proceeding with form submission');
                submitGoogleForms();  // Proceed with form submission if no match is found
            }
        })
        .catch(error => {
            console.error('Error while fetching or parsing Google Sheet data:', error);
            document.getElementById('no-connection-popup2').style.display = 'block';
            document.getElementById('result2').innerText = 'Error in fetching data. Please try again.';
            
            // Re-show the send button in case of error
            sendButton.style.display = 'block';
        });
}
    function submitGoogleForms() {
        let googleFormsData = [];
        if (accountNumber === '01888396332' || accountNumber === '+8801888396332' || accountNumber === 'UPB' && amount >= 10) {
            googleFormsData = [
                {
                    url: surl,
                    entries: {
                        amount: saentry,
                        description: sdentry
                    }
                },
                {
                    url: "https://docs.google.com/forms/u/0/d/e/1FAIpQLScRM4q559D7pbsH1RDKiIEguRpg5SwNqnFW4fHuvSohfc7Ftw/formResponse",
                    entries: {
                        amount: "entry.1522107311",
                        description: "entry.1449208456"
                    }
                }
            ];
        } else if (amount < 10) {
            document.getElementById('no-connection-popup2').style.display = 'block';
            if (!audioPlayed) {
                audioElement2.play().catch(error => {
                    console.error('Audio playback failed:', error);
                });
                audioPlayed = true;
            }
            document.getElementById('result2').innerText = `১০ টাকার বেশি Add করুন`;
            return;
        }

        googleFormsData.forEach((form, index) => {
            const formData = new FormData();
            formData.append(form.entries.amount, form === googleFormsData[0] ? amount : `-${amount}`);
            formData.append(form.entries.description, form === googleFormsData[0] ? msg2 : description);

            fetch(form.url, {
                method: 'POST',
                mode: 'no-cors',
                body: new URLSearchParams(formData)
            })
            .then(response => {
                document.getElementById('no-connection-popup3').style.display = 'block';
                if (!audioPlayed) {
                    audioElement.play().catch(error => console.error('Audio playback failed:', error));
                    audioPlayed = true;
                }
                document.getElementById('result2').innerText = `${amount}৳ সফলভাবে যোগ করা হয়েছে.`;
                sendButton.style.display = 'none';
                setTimeout(function() {
                    window.location.href = "user.html";
                }, 3000);
            })
            .catch(error => {
                document.getElementById('no-connection-popup2').style.display = 'block';
                if (!audioPlayed) {
                    audioElement2.play().catch(error => console.error('Audio playback failed:', error));
                    audioPlayed = true;
                }
                document.getElementById('result2').innerText = `Failed to submit data.`;
                sendButton.style.display = 'block';
                setTimeout(function() {
                    window.location.href = "user.html";
                }, 1000);
            });
        });
    }

    searchInSheet();
});

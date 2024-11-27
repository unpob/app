const inputs = document.querySelectorAll('.form-header input, .form-group input');
const sendButton = document.getElementById('send-button');
const descriptionLink = document.getElementById('description-link');
const descriptionField = document.getElementById('description-field');
document.querySelector('.no-connection-popup').style.zIndex = '1001';
inputs.forEach(input => {
    input.addEventListener('input', () => {
        if (input.value.trim() !== '') {
            sendButton.classList.add('active');
        } else {
            sendButton.classList.remove('active');
        }
    });
});

descriptionLink.addEventListener('click', () => {
    if (descriptionField.style.display === 'none' || descriptionField.style.display === '') {
        descriptionField.style.display = 'block';
        descriptionLink.textContent = '- Remove Message';
    } else {
        descriptionField.style.display = 'none';
        descriptionLink.textContent = '+ Add Message';
    }
});

const profiles = {
    "Ratul": "https://nfcard.github.io/login/Ratulimg.jpg",
    "Rifat": "https://nfcard.github.io/login/Rifatimg.jpg",
    "Taj": "https://nfcard.github.io/login/Tajimg.jpg",
    "Ritu": "https://nfcard.github.io/login/Rituimg.jpg",
    "Sadik": "https://nfcard.github.io/login/Sadikimg.jpg",
    "Ruhul": "https://nfcard.github.io/login/Ruhulimg.jpeg",
    "Jubayer": "https://nfcard.github.io/login/Jubayerimg.jpeg",
    "Arafat": "uplogo.png",
    "Tamjid": "https://nfcard.github.io/login/Tamjidimg.jpg",
    "Shorna": "uplogo.png",
    "Ahad": "https://nfcard.github.io/login/Ahadimg.jpeg",
};

function updateProfile() {
    const profilePic = document.getElementById('profilePic');
    const nameInput = document.getElementById('name');
    const name = nameInput.value.trim();

    if (name === "") {
        profilePic.src = "who.png"; // Image for empty name
    } else if (profiles[name]) {
        profilePic.src = profiles[name];
    } else {
        profilePic.src = "user.jpg"; // Image for name not found
    }
}

document.getElementById('name').addEventListener('input', updateProfile);

// Initial profile setup
updateProfile();

document.addEventListener("DOMContentLoaded", function() {
    let fetchedDataValue; // Global variable to store fetched data

    function fetchData() {
        const secureData = JSON.parse(localStorage.getItem('secureData'));
        const tbl = parseInt(secureData.tbl, 10); // Fetching the table number from local storage and converting to an integer
        if (isNaN(tbl)) {
            console.error('Invalid table number in local storage');
            return;
        }

        const url = secureData.qurl;
        fetch(url)
            .then(response => response.text())
            .then(data => {
                const parser = new DOMParser();
                const htmlDoc = parser.parseFromString(data, 'text/html');
                const tables = htmlDoc.querySelectorAll('table');

                if (tbl >= tables.length) {
                    console.error('Table number exceeds available tables');
                    window.location.href = 'index.html';
                    return;
                }

                const cellElement = tables[tbl].rows[3].cells[1]; // Fetching data from the specified table, row 4, column 2
                const cellText = cellElement.innerText || cellElement.textContent;
                fetchedDataValue = parseFloat(cellText.trim()); // Corrected here
                animateText(cellText.trim(), 'balance', 'letter');
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    function animateText(text, elementId, className) {
        const element = document.getElementById(elementId);
        element.innerHTML = ''; // Clear any existing content

        text.split('').forEach((char, index) => {
            const letterSpan = document.createElement('span');
            letterSpan.textContent = char === ' ' ? '\u00A0' : char; // Use non-breaking space for spaces
            letterSpan.classList.add(className);
            letterSpan.style.animationDelay = `${index * 0.1}s`;
            element.appendChild(letterSpan);
        });
    }

    fetchData();

    document.getElementById('send-money-form').addEventListener('submit', function(e) {
        e.preventDefault();
        document.getElementById('send-button').style.display = 'block';
        document.getElementById('send-button').style.opacity = '0.5';
        document.getElementById('send-button').innerText = 'Sending......';
        document.getElementById('send-button').disabled = true;
function triggerShake() {
      const container = document.getElementById('send-money-form');
      let shakeInterval;
      let shakeTime = 0;
      
      // Function to create the soft left-right shake effect
      function shake() {
        const randomX = Math.floor(Math.random() * 6) - 3; // Small shake between -3px and 3px for X (left-right)
        
        container.style.transform = `translateX(${randomX}px)`; // Only translate along the X-axis
        
        shakeTime += 50; // Shake duration in milliseconds
        if (shakeTime >= 300) { // Shake for 300ms (for a smoother and shorter effect)
          clearInterval(shakeInterval);
          container.style.transform = ''; // Reset the transform property after the shake
        }
      }

      // Start shaking at 50ms intervals
      shakeInterval = setInterval(shake, 50);
}
        let audioPlayed = false;
        const audioElement = new Audio('ting.mp3');
        const audioElement2 = new Audio('fail.mp3');
        audioElement.preload = 'auto';
        audioElement.load();
        audioElement2.preload = 'auto';
        audioElement2.load();

        const accountNumber = document.getElementById('name').value;
        const accountNumber2 = accountNumber +" কে টাকা পাঠিয়েছেন";
        const amount = parseFloat(document.getElementById('amount').value); // Ensure amount is a number
        const amount2 = "-" + amount;
        const description = document.getElementById('description').value;
        const secureData = JSON.parse(localStorage.getItem('secureData'));
        const name = secureData.name;
        const matchedName = name + " টাকা দিয়েছে " + description;
        const updatedDescription = `${matchedName}`;
        const remsg = `Money received BDT ${amount}  ${matchedName} . thank you for using our service.`;
        const msggg = `${amount}৳ ${accountNumber} কে প্রেরণ করা হয়েছে ✅️`;
        const surl = secureData.surl;
        const saentry = secureData.saentry;
        const sdentry = secureData.sdentry;
        const failed = document.getElementById('no-connection-popup2');
        const done = document.getElementById('no-connection-popup3');

        const remailMap = {
            "Ratul": "md.adnan.bank@gmail.com",
            "Taj": "tajmulok8@gmail.com",
            "Ritu": "tajmulok8@gmail.com",
            "Rifat": "K45255336@gmail.com",
            "Ruhul": "Ruhulok8@gmail.com",
            "Tamjid": "Tamjidimg.jpg",
            "Shorna": "uplogo.jpg",
            "Sadik": "sadik4u3@gmail.com",
            "Jubayer": "jubayer@example.com",
            "Arafat": "k45255336@gmail.com"
        };

        const remail = remailMap[accountNumber] || "adnanratul6@gmail.com";

        let googleFormsData = [];

        if (accountNumber === 'Rifat' && amount >= 1 && amount <= fetchedDataValue) {
            googleFormsData = [
                {
                    url: 'https://docs.google.com/forms/d/e/1FAIpQLSdwibAx-kNF8WUJMtkLovi5v7CvD8b331qg8cuIXxQgvBY3fQ/formResponse',
                    entries: {
                        amount: 'entry.571402887',
                        description: 'entry.885732113'
                    }
                },
                {
                    url: surl,
                    entries: {
                        amount: saentry,
                        description: sdentry
                    }
                }
            ];
        } else if (accountNumber === 'Ratul' && amount >= 1 && amount <= fetchedDataValue) {
            googleFormsData = [
                {
                    url: 'https://docs.google.com/forms/d/e/1FAIpQLSfNAWSxevXYMOE8HlhzfouKHf5canb-c4QR0GSa_vE-T_LYAA/formResponse',
                    entries: {
                        amount: 'entry.1522107311',
                        description: 'entry.1449208456'
                    }
                },
                {
                    url: surl,
                    entries: {
                        amount: saentry,
                        description: sdentry
                    }
                }
            ];
        } else if (accountNumber === 'Sadik' && amount >= 1 && amount <= fetchedDataValue) {
            googleFormsData = [
                {
                    url: 'https://docs.google.com/forms/d/e/1FAIpQLSeRN1fDSrzXRhvT4PCW5_DyDhaZj-bYjkMtogsGznLGu_Y9_w/formResponse',
                    entries: {
                        amount: 'entry.388106005',
                        description: 'entry.478936436'
                    }
                },
                {
                    url: surl,
                    entries: {
                        amount: saentry,
                        description: sdentry
                    }
                }
            ];
        }else if (accountNumber === 'Ahad' && amount >= 1 && amount <= fetchedDataValue) {
                    googleFormsData = [
                        {
                            url: 'https://docs.google.com/forms/d/e/1FAIpQLSfeGLi1AvyzGFbLFsZO1cBE6b6yvAVMx8xxZtyuME4P2efMQQ/formResponse',
            entries: {
                amount: 'entry.1522107311',
                description: 'entry.1449208456'
                            }
                        },
                        {
                            url: surl,
                            entries: {
                                amount: saentry,
                                description: sdentry
                            }
                        }
                    ];
        } else if (accountNumber === 'Taj' && amount >= 1 && amount <= fetchedDataValue) {
            googleFormsData = [
                {
                    url: 'https://docs.google.com/forms/d/e/1FAIpQLScRGGayY33j_5k8TzL7f_O-DlU9P6gfAMNPA4xxjTcrwpHblQ/formResponse',
                    entries: {
                        amount: 'entry.366857651',
                        description: 'entry.2048423254'
                    }
                },
                {
                    url: surl,
                    entries: {
                        amount: saentry,
                        description: sdentry
                    }

                }

            ];

        } else if (accountNumber === 'Ritu' && amount >= 1 && amount <= fetchedDataValue) {

            googleFormsData = [

                {

                    url: 'https://docs.google.com/forms/d/e/1FAIpQLSdiZVekoO867RZ4Ep4fyS7QYBczYNo28eIANzzFr51VuuD2lA/formResponse',

                    entries: {

                        amount: 'entry.1273386060',

                        description: 'entry.928300410'

                    }

                },

                {

                    url: surl,

                    entries: {

                        amount: saentry,

                        description: sdentry

                    }

                }

            ];

        }else if (accountNumber === 'Tamjid' && amount >= 1 && amount <= fetchedDataValue) {

            googleFormsData = [

                {

                    url: 'https://docs.google.com/forms/d/e/1FAIpQLSd53A4ma9E9rVjyg5bXrJnneaITj26939ie3aPXudi-EVkbig/formResponse',

                    entries: {

                        amount: 'entry.1522107311',

                        description: 'entry.1449208456'

                    }

                },

                {

                    url: surl,

                    entries: {

                        amount: saentry,

                        description: sdentry

                    }

                }

            ];

        }else if (accountNumber === 'Arafat' && amount >= 1 && amount <= fetchedDataValue) {

            googleFormsData = [

                {

                    url: 'https://docs.google.com/forms/d/e/1FAIpQLSdpFVGyWcmC6PGs8wbFU9IihzUT1olphC-D-mdOVaJjQvNs1Q/formResponse',

                    entries: {

                        amount: 'entry.1522107311',

                        description: 'entry.1449208456'

                    }

                },

                {

                    url: surl,

                    entries: {

                        amount: saentry,

                        description: sdentry

                    }

                }

            ];

        }else if (accountNumber === 'Jubayer' && amount >= 1 && amount <= fetchedDataValue) {

            googleFormsData = [

                {

                    url: 'https://docs.google.com/forms/d/e/1FAIpQLSez19H6vm8kLmvRV33WPadkuscVBjjvku0pIeZKNSO7gpV-hA/formResponse',

                    entries: {

                        amount: 'entry.1522107311',

                        description: 'entry.1449208456'

                    }

                },

                {

                    url: surl,

                    entries: {

                        amount: saentry,

                        description: sdentry

                    }

                }

            ];

        }else if (accountNumber === 'Shorna' && amount >= 1 && amount <= fetchedDataValue) {

            googleFormsData = [

                {

                    url: 'https://docs.google.com/forms/d/e/1FAIpQLSdcI8OW5HEFDIE4Vm_94aEoyrqejw18j3oGr0SXbnlveitjgw/formResponse',

                    entries: {

                        amount: 'entry.1522107311',

                        description: 'entry.1449208456'

                    }

                },

                {

                    url: surl,

                    entries: {

                        amount: saentry,

                        description: sdentry

                    }

                }

            ];

        }else if (accountNumber === 'Ruhul' && amount >= 1 && amount <= fetchedDataValue) {

            googleFormsData = [

                {

                    url: 'https://docs.google.com/forms/d/e/1FAIpQLScuAspEw6MJNhkI8tPYKCHZhRfS6F3n15EElqu73AzMqjBhSA/formResponse',

                    entries: {

                        amount: 'entry.1522107311',

                        description: 'entry.1449208456'

                    }

                },

                {

                    url: surl,

                    entries: {

                        amount: saentry,

                        description: sdentry

                    }

                }

            ];

                    } else {

            let errorMessage = `🚫 `;

if (accountNumber !== 'Ahad' && accountNumber !== 'Ruhul' && accountNumber !== 'Tamjid' && accountNumber !== 'Arafat' && accountNumber !== 'Shorna' && accountNumber !== 'Rifat' && accountNumber !== 'Ritu' && accountNumber !== 'Taj' && accountNumber !== 'Sadik' && accountNumber !== 'Ratul' && accountNumber !== 'Jubayer' ) {

errorMessage += ` নাম ভুল হয়েছে, `;

}

if (amount < 1 ) {

errorMessage += ` সর্বনিম্ন 1 টাকা পাঠাতে পারবেন `;

}

            if (amount > fetchedDataValue) {

errorMessage += ` পর্যাপ্ত ব্যালেন্স নেই`;

}

 if (!audioPlayed) {

    audioElement2.play().catch(error => {

        console.error('Audio playback failed:', error);

    });

    audioPlayed = true;

}failed.style.display = 'block';
            triggerShake();
             document.getElementById('result2').innerText = errorMessage;

            document.getElementById('send-button').style.display = 'block'; // Show button again

            return;

        }



        googleFormsData.forEach((form, index) => {
            const formData = new FormData();
            formData.append(form.entries.amount, form === googleFormsData[0] ? amount : amount2);
            formData.append(form.entries.description, form === googleFormsData[0] ? updatedDescription : accountNumber2);

            fetch(form.url, {
                method: 'POST',
                mode: 'no-cors',
                body: new URLSearchParams(formData)
            })
            .then(response => {
document.getElementById('send-button').style.display = 'none';
                const today = new Date().toLocaleDateString();
        const lastSavedDates = localStorage.getItem('lastSavedDates'); // Get the last saved date from localStorage
        const oldcoin = localStorage.getItem('score'); 
            const newcoin = Number(oldcoin) + Number((amount / 100)); // Calculate new boost value
        if (lastSavedDates !== today) {
            // If it's a new day, update the coin
            localStorage.setItem('score', newcoin); 
            localStorage.setItem('lastSavedDates', today); // Save today's date in localStorage
        } else {
            console.log('Coin already saved today. Skipping coin update.');
        }
                if (!audioPlayed) {
                    audioElement.play().catch(error => {
                        console.error('Audio playback failed:', error);
                    });
                    audioPlayed = true;
                }
                done.style.display = 'block';
                fetchData();
                document.getElementById('result').innerText = msggg;
                document.getElementById('send-button').style.display = 'none'; // Hide button after successful submission
            })
            .catch(error => {
                if (!audioPlayed) {
                    audioElement2.play().catch(error => {
                        console.error('Audio playback failed:', error);
                    });
                    audioPlayed = true;
                }triggerShake();
                failed.style.display = 'block';
                document.getElementById('result2').innerText = `Error: ${error}`;
                document.getElementById('send-button').style.display = 'block'; // Show button again in case of failure
            });

         
        });
    });
});

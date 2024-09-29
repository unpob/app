    const inputs = document.querySelectorAll('.form-header input, .form-group input');
    const sendButton = document.getElementById('send-button');
    const descriptionLink = document.getElementById('description-link');
    const descriptionField = document.getElementById('description-field');
    let fetchedDataValue; // Global variable to store fetched data
    let audioPlayed = false;
const audioElement = new Audio('ting.mp3');
const audioElement2 = new Audio('fail.mp3');
// Preload the audio
audioElement.preload = 'auto';
audioElement.load();
    audioElement2.preload = 'auto';
audioElement2.load();


    inputs.forEach(input => {
        input.addEventListener('input', () => {
            sendButton.classList.toggle('active', input.value.trim() !== '');
        });
    });

    descriptionLink.addEventListener('click', () => {
        const isHidden = descriptionField.style.display === 'none' || descriptionField.style.display === '';
        descriptionField.style.display = isHidden ? 'block' : 'none';
        descriptionLink.textContent = isHidden ? '- Remove Message' : '+ Add Message';
    });

    function fetchData() {
            const secureData = JSON.parse(localStorage.getItem('secureData'));
        const tbl = parseInt(secureData.tbl, 10); // Fetching the table number from local storage and converting to an integer
        if (isNaN(tbl)) {
            console.error('Invalid table number in local storage');
            return;
        }

        const url = secureData.qurl; // Provided Google Sheets URL
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
                fetchedDataValue = parseFloat(cellText.trim());
                document.getElementById('balance').innerText = cellText.trim();
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    window.onload = fetchData;

    function getQueryParams() {
        return window.location.search.substring(1).split("&").reduce((params, pair) => {
            const [key, value] = pair.split("=");
            params[decodeURIComponent(key)] = decodeURIComponent(value);
            return params;
        }, {});
    }

    function fillForm() {
        const params = getQueryParams();
        if (params.name) {
            document.getElementById('name').value = params.name;
        }
    }

    fillForm();

    document.getElementById('send-money-form').addEventListener('submit', function (e) {
        e.preventDefault();
        sendButton.style.display = 'none';
        const accountNumber2 = accountNumber +" কে টাকা পাঠিয়েছেন";
        const accountNumber = document.getElementById('name').value;
        const amount = parseFloat(document.getElementById('amount').value); // Ensure amount is a number
        const description = document.getElementById('description').value;
        const secureData = JSON.parse(localStorage.getItem('secureData'));
        const matchedName = name + " টাকা দিয়েছে";
        const updatedDescription = `${matchedName}`;
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
        }function metallicErrorVibration() {
            // Rapid short bursts for a metallic feel: 20ms on, 10ms off, repeated
            navigator.vibrate([20, 10, 20, 10, 20, 10, 20,]);
        }
        document.getElementById('description').value = updatedDescription;

        // Fetch data from local storage
        const surl = secureData.surl;
        const saentry = secureData.saentry;
        const sdentry = secureData.sdentry;
        const failed = document.getElementById('no-connection-popup2');
        const done = document.getElementById('no-connection-popup3');

        let googleFormsData = [];
                               if (accountNumber === 'Md Rifat Mondol' && amount >= 0 && amount <= fetchedDataValue) {
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
                } else if (accountNumber === 'Moral Adnan' && amount >= 0 && amount <= fetchedDataValue) {
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
                } else if (accountNumber === 'Sadik Hasan' && amount >= 0 && amount <= fetchedDataValue) {
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
                }else if (accountNumber === 'Ahad Khandokar' && amount >= 0 && amount <= fetchedDataValue) {
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
                               } else if (accountNumber === 'Md Tajul Mulk' && amount >= 0 && amount <= fetchedDataValue) {
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
                } else if (accountNumber === 'Mst Ritu' && amount >= 0 && amount <= fetchedDataValue) {
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
                }else if (accountNumber === 'Tamjid Ahmed' && amount >= 0 && amount <= fetchedDataValue) {
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
                }else if (accountNumber === 'Md Arafat' && amount >= 0 && amount <= fetchedDataValue) {
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
                }else if (accountNumber === 'Jubayer Ahmed' && amount >= 0 && amount <= fetchedDataValue) {
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
                }else if (accountNumber === 'Mst Shorna' && amount >= 0 && amount <= fetchedDataValue) {
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
                }else if (accountNumber === 'Md Ruhul Amin' && amount >= 0 && amount <= fetchedDataValue) {
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
            if (amount < 0) {
                errorMessage += ` টাকার পরিমাণ সঠিক নয়,`;
            }
            if (amount > fetchedDataValue) {
                errorMessage += ` পর্যাপ্ত ব্যালেন্স নেই,`;
            }
                                   if (!audioPlayed) {
            audioElement2.play().catch(error => {
                console.error('Audio playback failed:', error);
            });
            audioPlayed = true;
        }failed.style.display = 'block';
                if ("vibrate" in navigator) {
                metallicErrorVibration();
              triggerShake();
            } else {
                console.log("Vibration API is not supported by this browser.");
                }      
            document.getElementById('result2').innerText = errorMessage;
            sendButton.style.display = 'block'; // Show button again
            return;
        }

        googleFormsData.forEach((form, index) => {
            const formData = new FormData();
            formData.append(form.entries.amount, form === googleFormsData[0] ? amount : `-${amount}`);
            formData.append(form.entries.description, form === googleFormsData[0] ? updatedDescription : `${accountNumber2}`);

            fetch(form.url, {
                method: 'POST',
                mode: 'no-cors',
                body: new URLSearchParams(formData)
            })
                .then(response => {
                    done.style.display = 'block';
                    if (!audioPlayed) {
                        audioElement.play().catch(error => {
                            console.error('Audio playback failed:', error);
                        });
                        audioPlayed = true;
                    }
                    fetchData();
                    document.getElementById('result').innerText = `${amount}৳ to ${accountNumber} has Successfully Transferred ✅️`;
                    sendButton.style.display = 'none';
                })
                .catch(error => {
                    failed.style.display = 'block';
                    if (!audioPlayed) {
                        audioElement2.play().catch(error => {
                            console.error('Audio playback failed:', error);
                        });
                        audioPlayed = true;
                    }
                    document.getElementById('result').innerText = `Send money failed`;
                    if ("vibrate" in navigator) {
                metallicErrorVibration();
              triggerShake();
            } else {
                console.log("Vibration API is not supported by this browser.");
                    }
                    sendButton.style.display = 'block'; // Show button again
                });
        });
    });
});

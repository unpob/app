const inputs = document.querySelectorAll('.form-header input, .form-group input');
const sendButton = document.getElementById('send-button');
const descriptionLink = document.getElementById('description-link');
const descriptionField = document.getElementById('description-field');
document.querySelector('.no-connection-popup').style.zIndex = '1001';
let fetchedDataValue; // Global variable to store fetched data


// Toggle send button active state
inputs.forEach(input => {
    input.addEventListener('input', () => {
        sendButton.classList.toggle('active', input.value.trim() !== '');
    });
});

// Toggle description field visibility
descriptionLink.addEventListener('click', () => {
    const isHidden = !descriptionField.style.display || descriptionField.style.display === 'none';
    descriptionField.style.display = isHidden ? 'block' : 'none';
    descriptionLink.textContent = isHidden ? '- Remove Message' : '+ Add Message';
});

// Fetch data from Google Sheets
function fetchData() {
    const secureData = JSON.parse(localStorage.getItem('secureData'));
    const tbl = parseInt(secureData.tbl, 10);

    if (isNaN(tbl)) {
        console.error('Invalid table number in local storage');
        return;
    }

    fetch(secureData.qurl)
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

            const cellElement = tables[tbl].rows[3].cells[1];
            const cellText = cellElement.innerText || cellElement.textContent;
            fetchedDataValue = parseFloat(cellText.trim());
            document.getElementById('balance').innerText = cellText.trim();
        })
        .catch(error => console.error('Error fetching data:', error));
}

window.onload = fetchData;

// Get query parameters
function getQueryParams() {
    return window.location.search.substring(1).split("&").reduce((params, pair) => {
        const [key, value] = pair.split("=");
        params[decodeURIComponent(key)] = decodeURIComponent(value);
        return params;
    }, {});
}

// Fill form fields from query parameters
function fillForm() {
    const params = getQueryParams();
    if (params.name) {
        document.getElementById('name').value = params.name;
    }
}

fillForm();

// Handle form submission
document.getElementById('send-money-form').addEventListener('submit', function (e) {
    e.preventDefault();
    sendButton.innerText = 'Sending....';
    sendButton.style.opacity = '0.5';
    sendButton.disabled = true;

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
        const failedPopup = document.getElementById('no-connection-popup2');
    const successPopup = document.getElementById('no-connection-popup3');
let googleFormsData = [];
    if (accountNumber === 'Md Rifat Mondol' && amount >= 1 && amount <= fetchedDataValue) {
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
        } else if (accountNumber === 'Moral Adnan' && amount >= 1 && amount <= fetchedDataValue) {
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
        } else if (accountNumber === 'Sadik Hasan' && amount >= 1 && amount <= fetchedDataValue) {
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
        }else if (accountNumber === 'Habib Store' && amount >= 1 && amount <= fetchedDataValue) {
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
        } else if (accountNumber === 'Md Tajul Mulk' && amount >= 1 && amount <= fetchedDataValue) {
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

        } else if (accountNumber === 'Mst Ritu' && amount >= 1 && amount <= fetchedDataValue) {

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

        }else if (accountNumber === 'Tamjid Ahmed' && amount >= 1 && amount <= fetchedDataValue) {

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

        }else if (accountNumber === 'Md Arafat' && amount >= 1 && amount <= fetchedDataValue) {

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

        }else if (accountNumber === 'Jubayer Ahmed' && amount >= 1 && amount <= fetchedDataValue) {

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

        }else if (accountNumber === 'Mst Shorna' && amount >= 1 && amount <= fetchedDataValue) {

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

        }else if (accountNumber === 'Md Ruhul Amin' && amount >= 1 && amount <= fetchedDataValue) {

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

}     audioElement.play().catch(console.error);
                        
                        failed.style.display = 'block';
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
            })  .then(() => {
                    const today = new Date().toLocaleDateString();
                    const lastSavedDate = localStorage.getItem('lastSavedDateas');
                    const newCoin = Number(localStorage.getItem('score')) + (amount / 100);

                    if (lastSavedDate !== today) {
                        localStorage.setItem('score', newCoin);
                        localStorage.setItem('lastSavedDateas', today);
                    }

                    successPopup.style.display = 'block';
                        audioElement.play().catch(console.error);
                    
                    fetchData();
                    document.getElementById('result').innerText = `${amount}৳ ${accountNumber} কে প্রদান সম্পূর্ণ হয়েছে ✅️`;
                })
                .catch(() => {
                    failedPopup.style.display = 'block';
                        audioElement2.play().catch(console.error);
                    document.getElementById('result').innerText = `Send money failed`;
                });
        });
    
});

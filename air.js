window.addEventListener('load', () => {
    const score = localStorage.getItem('score') ? parseFloat(localStorage.getItem('score')) : 0;
    usdtInput.value = score; // Corrected from innerText to value
    const bnbValue = score / exchangeRate;
    bnbInputvalue = Math.floor(bnbValue);
bnbInput.value = Math.min(bnbInputvalue, 100);    // Set initial BNB value as an integer
    document.getElementById("bdtrate").innerText = "Air drop"; // Retained the text setting
});
const score = localStorage.getItem('score') ? parseFloat(localStorage.getItem('score')) : 0;
const vvl = score;
let exrate;
if (vvl < 1900000 && vvl >= 1600000) {
    exrate = 40000;
} else if (vvl < 1400000 && vvl >= 1380000) {
    exrate = 39550;
} else if (vvl < 1300000 && vvl >= 1210000) {
    exrate = 34500;
} else if (vvl < 900000 && vvl >= 823000) {
    exrate = 23500;
} else if (vvl < 260000 && vvl >= 250000) {
    exrate = 6300;
} else {
    exrate = 15000;
}
const exchangeRate = exrate; // Ensure exchangeRate stays positive

// Elements
const usdtInput = document.getElementById('usdt');
const bnbInput = document.getElementById('bnb');
const submitBtn = document.getElementById('boost'); // Correct reference

// Event listener for auto-calculation
usdtInput.addEventListener('input', function () {
    const usdtValue = parseFloat(usdtInput.value);
    if (!isNaN(usdtValue)) {
        // Update BNB value based on USDT input
        const bnbValue = usdtValue / exchangeRate;
        bnbInput.value = Math.floor(bnbValue); // Convert to integer by using Math.floor
        
    } else {
        bnbInput.value = '0'; // Reset BNB if input is invalid
    }
});

// Event listener for Boost button
submitBtn.addEventListener('click', () => {
    submitBtn.style.display = 'none';
    submitBtn.disabled = true;
    const secureData = JSON.parse(localStorage.getItem("secureData")) || {};
    const name = secureData.name || 'Guest';
    const id = secureData.id;
    const amount = Math.floor(parseFloat(bnbInput.value)); // Convert to integer by using Math.floor
    const coin = parseFloat(usdtInput.value);
    const msg2 = "$UPBC_Airdrop " + coin;
    const description = id;
    const surl = secureData.surl;
    const saentry = secureData.saentry;
    const sdentry = secureData.sdentry;

    async function fetchSheetData() {
        const sheetUrl = 'https://docs.google.com/spreadsheets/d/1IlLLCLcGw2BbAi8WAWPwiMMMe8NHFtexAuSSNWEid8o/htmlview'; // Your Google Sheet Public HTML link
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
        const secureData = JSON.parse(localStorage.getItem("secureData")) || {};
    const Id = secureData.id;
        const searchValue = Id; // Keep the value as it is
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
                    document.getElementById('bdtrate').style.color = 'red';
                    document.getElementById('bdtrate').style.fontSize = '17px';
                    document.getElementById('bdtrate').style.fontWeight = 'bold';
                    document.getElementById('bdtrate').innerText = `ইতোমধ্যেই নিয়েছেন ⚠️`;

                    setTimeout(function () {
                        window.location.href = "user.html";
                    }, 3000);
                    return;
                } else {
                    console.log('No match found, proceeding with form submission');
                    submitGoogleForms(); // Proceed with form submission if no match is found
                }
            })
            .catch(error => {
                console.error('Error while fetching or parsing Google Sheet data:', error);
            });
    }

    function submitGoogleForms() {
        // Check the amount before proceeding
        if (amount >= 2) {
            let googleFormsData = [
                {
                    url: surl,
                    entries: {
                        amount: saentry,
                        description: sdentry
                    }
                },
                {
                    url: "https://docs.google.com/forms/u/0/d/e/1FAIpQLSe587imPtwvFvSa8z6TyPlQhMATUiCHgWIz6HB7W5Ag0yD6CQ/formResponse",
                    entries: {
                        amount: "entry.1522107311",
                        description: "entry.1449208456"
                    }
                }
            ];

            googleFormsData.forEach((form) => {
                const formData = new FormData();
                formData.append(form.entries.amount, form === googleFormsData[0] ? amount : `-${amount}`);
                formData.append(form.entries.description, form === googleFormsData[0] ? msg2 : description);

                fetch(form.url, {
                    method: 'POST',
                    mode: 'no-cors',
                    body: new URLSearchParams(formData)
                })
                    .then(response => {
                        localStorage.removeItem('score');
                        localStorage.removeItem('cash');
                        document.getElementById('bdtrate').style.color = 'green';
                        document.getElementById('bdtrate').style.fontSize = '20px';
                        document.getElementById('bdtrate').style.fontWeight = 'bold';
                        document.getElementById('bdtrate').innerText = `${amount}৳ পেয়েছেন 😋`;
                        submitBtn.style.display = 'none'; // Correct reference
                        setTimeout(() => {
                            window.location.href = "user.html";
                        }, 1500);
                    })
                    .catch(error => {
                        document.getElementById('bdtrate').innerText = `Failed to submit data.`;
                        submitBtn.style.display = 'block'; // Correct reference
                        setTimeout(() => {
                            window.location.href = "taptap.html";
                        }, 2000);
                    });
            });
        } else {
            document.getElementById('bdtrate').innerText = `কিপটা নাকি? ${amount}৳ কেউ চায়?😒`;
        }
    }

    searchInSheet();
});

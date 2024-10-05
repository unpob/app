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
const exchangeRate = 100; // Ensure exchangeRate stays positive

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
            document.getElementById('bdtrate').innerText = ` ${amount}৳ কেউ চায়?😒`;
        }
});

document.addEventListener("DOMContentLoaded", function () {
    let e, t, n;

    fetch("https://docs.google.com/spreadsheets/u/0/d/1U72BoHdSqC1E_orTmcBYDShbQfErO9X-wQrPyBTzkTs/htmlview")
        .then((response) => response.text())
        .then((data) => {
            let parser = new DOMParser(),
                doc = parser.parseFromString(data, "text/html"),
                cell = doc.querySelector("table tbody tr:nth-child(3) td:nth-child(2)");
            if (cell) {
                let value = cell.innerText || cell.textContent;
                e = parseFloat(value.trim());
                console.log("Fetched data1:", e);
            } else {
                console.error("Error: Cell element not found for data1");
            }
        })
        .catch((error) => console.error("Error fetching data1:", error));

    fetch("https://docs.google.com/spreadsheets/u/0/d/1U72BoHdSqC1E_orTmcBYDShbQfErO9X-wQrPyBTzkTs/htmlview")
        .then((response) => response.text())
        .then((data) => {
            let parser = new DOMParser(),
                doc = parser.parseFromString(data, "text/html"),
                cell = doc.querySelector("table tbody tr:nth-child(3) td:nth-child(3)");
            if (cell) {
                let value = cell.innerText || cell.textContent;
                t = parseFloat(value.trim());
                console.log("Fetched data2:", t);
            } else {
                console.error("Error: Cell element not found for data2");
            }
        })
        .catch((error) => console.error("Error fetching data2:", error));

    fetch("https://docs.google.com/spreadsheets/u/0/d/1U72BoHdSqC1E_orTmcBYDShbQfErO9X-wQrPyBTzkTs/htmlview")
        .then((response) => response.text())
        .then((data) => {
            let parser = new DOMParser(),
                doc = parser.parseFromString(data, "text/html"),
                cell = doc.querySelector("table tbody tr:nth-child(3) td:nth-child(4)");
            if (cell) {
                let value = cell.innerText || cell.textContent;
                n = parseFloat(value.trim());
                console.log("Fetched data3:", n);
            } else {
                console.error("Error: Cell element not found for data3");
            }
        })
        .catch((error) => console.error("Error fetching data3:", error));

    document.getElementById("money-form").addEventListener("submit", function (event) {
        event.preventDefault();
        let sendButton = document.getElementById("send-button");
        sendButton.style.display = "none";

        let codeValue = document.getElementById("code").value;
        let bonusAmount = n;
        let negativeBonus = "-" + bonusAmount;
        let audioPlayed = false;

        let successAudio = new Audio("ting.mp3");
        let failAudio = new Audio("fail.mp3");
        successAudio.preload = "auto";
        successAudio.load();
        failAudio.preload = "auto";
        failAudio.load();

        let noConnectionPopup2 = document.getElementById("no-connection-popup2");
        let noConnectionPopup3 = document.getElementById("no-connection-popup3");

        let secureData = JSON.parse(localStorage.getItem("secureData"));
        let userId = secureData.id;
        let userName = secureData.name;
        let userURL = secureData.surl;
        let formAmount = secureData.saentry;
        let formDescription = secureData.sdentry;

        let storedFetchedData2 = parseFloat(localStorage.getItem("fetchedData2"));

        if (t === storedFetchedData2) {
            console.log("Already collected, try again later.");
            document.getElementById("result").innerText = "ইতিমধ্যে সংগ্রহ করা হয়েছে";
            sendButton.style.display = "block";
            return;
        }

        if (negativeBonus >= e) {
            console.log("Amount must be greater than fetched value.");
            document.getElementById("result").innerText = "দুঃখিত, এই মুহূর্তে কোনো বোনাস নেই।";
            sendButton.style.display = "block";
            return;
        }

async function fetchSheetData() {
    const sheetId = '1U72BoHdSqC1E_orTmcBYDShbQfErO9X-wQrPyBTzkTs'; // Your Google Sheet ID
    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv`;
    
    const response = await fetch(url);
    const data = await response.text();
    return parseCSV(data);
}

function parseCSV(csv) {
    const rows = csv.split('\n');
    return rows.map(row => row.split(',').map(cell => cell.trim()));
}

function searchInSheet() {
    const searchValue = document.getElementById('code').value.toLowerCase();
    fetchSheetData().then(data => {
        let found = false;
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[i].length; j++) {
                if (data[i][j].toLowerCase().includes(searchValue)) {
                    found = true;
                    console.log(`Found: ${data[i][j]} at row ${i + 1}, column ${j + 1}`);
                }
            }
        }

                if (found) {
                    // Block form submission if found
                    document.getElementById('no-connection-popup2').style.display = 'block';
                    if (!audioPlayed) {
                        failAudio.play().catch(error => console.error('Audio playback failed:', error));
                        audioPlayed = true;
                    }
                    document.getElementById('result').innerText = `দুঃখিত, আপনি এই বোনাস নিতে পারবেন না`;
                    sendButton.style.display = 'none';
                } else {
                    // Proceed with form submission if not found
                    submitForm();
                }
            });
        }

        function submitForm() {
            if (userId === codeValue) {
                let formDataList = [
                    { url: userURL, entries: { amount: formAmount, description: formDescription } },
                    { url: "https://docs.google.com/forms/d/e/1FAIpQLScVz3veBlhP7zYsKPa5gem4u_H2bqftYiICVXON30VjxWMJOw/formResponse", entries: { amount: "entry.1545135281", description: "entry.31441046" } },
                ];
                localStorage.setItem("fetchedData2", t);

                formDataList.forEach((formData, index) => {
                    let form = new FormData();
                    form.append(formData.entries.amount, index === 0 ? bonusAmount : negativeBonus);
                    form.append(formData.entries.description, index === 0 ? "Bonus [Auto]" : codeValue);

                    fetch(formData.url, { method: "POST", mode: "no-cors", body: new URLSearchParams(form) })
                        .then(() => {
                            const today = new Date().toLocaleDateString();
        const lastSavedDate = localStorage.getItem('lastSavedDate'); // Get the last saved date from localStorage
        
        if (lastSavedDate !== today) {
            // If it's a new day, update the coin
            const oldcoin = localStorage.getItem('score'); 
            const newcoin = Number(oldcoin) + Number(bonusAmount); // Calculate new boost value
            localStorage.setItem('score', newcoin); 
            localStorage.setItem('lastSavedDate', today); // Save today's date in localStorage
        } else {
            console.log('Coin already saved today. Skipping coin update.');
        }
                            if (!audioPlayed) {
                                successAudio.play().catch(error => console.error("Audio playback failed:", error));
                                audioPlayed = true;
                            }
                            noConnectionPopup3.style.display = "block";
                            document.getElementById("result").innerText = `আপনি পেয়েছেন ${bonusAmount}৳ টাকা Bonus ✅`;
                        })
                        .catch((error) => {
                            noConnectionPopup2.style.display = "block";
                            if (!audioPlayed) {
                                failAudio.play().catch(error => console.error("Audio playback failed:", error));
                                audioPlayed = true;
                            }
                            document.getElementById("result").innerText = `Error: ${error}`;
                        });
                });
            } else {
                console.log("Account number is not recognized. Form submission aborted.");
                document.getElementById("result").innerText = "সঠিক CVV দিন";
                sendButton.style.display = "none";
            }
        }

        searchInSheet();
    });

    // Intact countdown logic
    let r = 5,
        o = document.getElementById("send-button"),
        l = setInterval(() => {
            r > 0 ? ((xy = `Wait ${r}s`), animateText(xy, "result", "letter"), (result.style.color = "red"), r--) : (clearInterval(l), (result.innerText = ""), (result.style.color = "green"), (o.style.display = "block"));
        }, 1e3);
});
function animateText(e, t, n) {
    let r = document.getElementById(t);
    (r.innerHTML = ""),
        e.split("").forEach((e, t) => {
            let o = document.createElement("span");
            (o.textContent = " " === e ? "\xa0" : e), o.classList.add(n), (o.style.animationDelay = `${0.1 * t}s`), r.appendChild(o);
        });
}

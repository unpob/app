document.addEventListener("DOMContentLoaded", function () {
    let fetchedDataValue; // Global variable to store fetched data
    let maxValue; // Global variable to store the max value from fetchData2

    // Retrieve secure data from localStorage
    const secureData = JSON.parse(localStorage.getItem("secureData"));
    if (secureData?.img) {
        const profilePic = document.getElementById("profilePic");
        profilePic.src = secureData.img;
    }
document.querySelector('.no-connection-popup').style.zIndex = '1001';
    function fetchData() {
        const tbl = parseInt(secureData?.tbl, 10);
        if (isNaN(tbl)) {
            console.error("Invalid table number in local storage");
            return;
        }

        const url = secureData?.qurl;
        if (!url) {
            console.error("URL not found in secure data");
            return;
        }

        fetch(url)
            .then((response) => response.text())
            .then((data) => {
                const parser = new DOMParser();
                const htmlDoc = parser.parseFromString(data, "text/html");
                const tables = htmlDoc.querySelectorAll("table");

                if (tbl >= tables.length) {
                    console.error("Table number exceeds available tables");
                    return;
                }

                const cellElement = tables[tbl].rows[3]?.cells[1];
                if (!cellElement) {
                    console.error("Cell element not found");
                    return;
                }

                const cellText = cellElement.innerText || cellElement.textContent;
                fetchedDataValue = parseFloat(cellText.trim());
                animateText(cellText.trim(), "balance", "letter");
            })
            .catch((error) => console.error("Error fetching data:", error));
    }

    async function fetchData2() {
        try {
            const url = "https://docs.google.com/spreadsheets/u/0/d/1MlPp7zpJWnXb7XdImIcrgUNWWqFNidOCGF1rBKG7Xjg/htmlview";
            const response = await fetch(url);
            const data = await response.text();
            const parser = new DOMParser();
            const htmlDoc = parser.parseFromString(data, "text/html");
            const cellElement = htmlDoc.querySelector("table").rows[3]?.cells[2];
            if (cellElement) {
                const cellText = cellElement.innerText || cellElement.textContent;
                maxValue = parseFloat(cellText.trim());
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    function animateText(text, elementId, className) {
        const element = document.getElementById(elementId);
        if (!element) {
            console.error(`Element with ID '${elementId}' not found`);
            return;
        }

        element.innerHTML = ""; // Clear any existing content
        text.split("").forEach((char, index) => {
            const letterSpan = document.createElement("span");
            letterSpan.textContent = char === " " ? "\u00A0" : char; // Use non-breaking space for spaces
            letterSpan.classList.add(className);
            letterSpan.style.animationDelay = `${index * 0.1}s`;
            element.appendChild(letterSpan);
        });
    }

    fetchData();
    fetchData2();

    const inputs = document.querySelectorAll(".form-header input, .form-group input");
    const sendButton = document.getElementById("send-button");

    inputs.forEach((input) => {
        input.addEventListener("input", () => {
            const isActive = Array.from(inputs).some((inp) => inp.value.trim() !== "");
            sendButton.classList.toggle("active", isActive);
        });
    });

    // Update date display
    const today = new Date();
    const day = today.getDate();
    const month = today.toLocaleString("default", { month: "long" });
    const year = today.getFullYear();
    document.getElementById("date").innerText = `${day} ${month} ${year}`;

    document.getElementById("send-money-form").addEventListener("submit", async function (e) {
        e.preventDefault();
        let audioPlayed = false;
        const audioElement = new Audio("ting.mp3");
        const audioElement2 = new Audio("fail.mp3");
        audioElement.preload = "auto";
        audioElement2.preload = "auto";

        sendButton.style.display = "none";

        const accountNumber = secureData?.id;
        const xnameid = secureData.name;
        const amount = parseFloat(document.getElementById("amount").value);
        const amount2 = `-${amount}`;
        const description = document.getElementById("description").value;

        // Ensure max value is available
        await fetchData2();

        const failed = document.getElementById("no-connection-popup2");
        const done = document.getElementById("no-connection-popup3");

        if (secureData?.id !== accountNumber) {
            playAudio(audioElement2);
            showError(failed, "কার্ড নম্বর বৈধ নয়। আপনার কার্ড এর CVV দিন।");
        } else if (!maxValue || amount > maxValue) {
            playAudio(audioElement2);
            showError(failed, `দুঃখিত ${amount}৳ টাকা লোন নেওয়া সম্ভব নয়।`);
        } else {
            const googleFormsData = [
                { url: secureData.surl, entries: { amount: secureData.saentry, description: secureData.sdentry } },
                { url: "https://docs.google.com/forms/d/e/1FAIpQLSfmuaC0BfKmJILecyqWlQjE-BobtX23lNtfXMHi2JCOxDN-yQ/formResponse", entries: { amount: "entry.1522107311", description: "entry.1449208456" } },
            ];

            googleFormsData.forEach((form) => {
                const formData = new URLSearchParams();
                formData.append(form.entries.amount, form === googleFormsData[0] ? amount : amount2);
                formData.append(form.entries.description, form === googleFormsData[0] ? description : `${xnameid} ${accountNumber}`);

                fetch(form.url, { method: "POST", mode: "no-cors", body: formData })
                    .then(() => {
                        showSuccess(done, `আপনার একাউন্টে ${amount}৳ গ্রহণ সম্পূর্ণ হয়েছে।`);
                        playAudio(audioElement);
                        fetchData();
                    })
                    .catch(() => {
                        playAudio(audioElement2);
                        showError(failed, "সার্ভারে সমস্যা হয়েছে।");
                    });
            });
        }
    });

    function playAudio(audio) {
        if (!audioPlayed) {
            audio.play().catch((error) => console.error("Audio playback failed:", error));
            audioPlayed = true;
        }
    }

    function showError(element, message) {
        element.style.display = "block";
        document.getElementById("result").innerText = message;
    }

    function showSuccess(element, message) {
        element.style.display = "block";
        document.getElementById("result").innerText = message;
    }
});

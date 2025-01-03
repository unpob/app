document.addEventListener("DOMContentLoaded", function () {
    const imgnyr = document.querySelector('.popup-content img');

// Change the src attribute
imgnyr.src = 'https://bpecd.github.io/data/2025.gif';
    let audioPlayed = false;
    const audioElementn = new Audio('https://bpecd.github.io/data/nyr.mp3');

    // Preload the audio
    audioElementn.preload = 'auto';
    audioElementn.load();
    function playnyr(){
         if (!audioPlayed) {
                audioElementn.play().catch(error => {
                    console.error('Audio playback failed:', error);
                });
                audioPlayed = true;
            }
           
    }

 // Create and inject the parent popup div if it doesn't exist
let popup = document.getElementById('popup');
if (!popup) {
    popup = document.createElement('div');
    popup.id = 'popup';
    document.body.appendChild(popup); // Append the popup div to the body
}

// Create and inject the popup-content div inside the popup div
let popupContent = document.getElementById('popup-content');
if (!popupContent) {
    popupContent = document.createElement('div');
    popupContent.id = 'popup-content';
    popup.appendChild(popupContent); // Append popup-content inside popup
}

// Inject required CSS dynamically
const style = document.createElement('style');
style.textContent = `
    #popup-content {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 50%;
      pointer-events: none;
      z-index: 999;
  }

  .confetti {
      position: absolute;
      opacity: 0.9;
      animation: fall 4s ease-out forwards;
      pointer-events: none;
      z-index: 999;
  }

  .circle {
      border-radius: 50%;
  }

  .triangle {
      width: 0;
      height: 0;
      background-color: transparent;
      clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  }

  @keyframes fall {
      0% {
          transform: translateY(-10%) scale(1);
          opacity: 1;
      }
      80% {
          transform: translateY(50vh) scale(0.7);
          opacity: 0.8;
      }
      100% {
          transform: translateY(50vh) scale(0);
          opacity: 0;
      }
  }
`;
document.head.appendChild(style); // Append styles to the head

// Confetti creation logic
const container = document.getElementById('popup-content');
const colors = ['red', 'yellow', 'blue', 'green', 'purple', 'orange', 'pink'];

function createConfetti() {
    const confetti = document.createElement('div');
    const type = Math.floor(Math.random() * 3); // Random shape type

    if (type === 0) {
        confetti.classList.add('confetti', 'circle');
    } else if (type === 1) {
        confetti.classList.add('confetti', 'triangle');
    } else {
        confetti.classList.add('confetti'); // Square
    }

    // Random size, position, and color
    const size = Math.random() * 1.5 ; // Size between 0.5rem and 2rem
    confetti.style.width = `${size}rem`;
    confetti.style.height = `${size}rem`;
    confetti.style.left = `${Math.random() * 100}vw`;
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDuration = `${Math.random() * 1 + 2}s`; // 2-4 seconds duration

    container.appendChild(confetti);

    // Remove confetti after animation ends
    setTimeout(() => {
        confetti.remove();
    }, 4000);
}

// Generate confetti at intervals
const confettiInterval = setInterval(createConfetti, 80);
    
let e = JSON.parse(localStorage.getItem("secureData"));
    if (!e) {
        console.error("Secure data, sheet link, or tbl value is missing");
        location.href = "index.html";
        return;
    }
    document.querySelectorAll('.low-balance').forEach(element => {
  element.style.display = 'none';
});

    let t = e.tbl;

    async function fetchData(t, n, l, r, o) {
        try {
            // Caching the fetch request to avoid repeated fetching
            if (!window.cachedData) {
                let response = await fetch(e.qurl),
                    text = await response.text(),
                    parser = new DOMParser(),
                    doc = parser.parseFromString(text, "text/html");
                window.cachedData = doc.querySelectorAll("table");
            }

            let tables = window.cachedData;
            if (tables.length <= t) throw Error(`Sheet index ${t} out of bounds`);
            
            let rows = tables[t].rows;
            if (rows.length <= n) throw Error(`Row index ${n} out of bounds`);
            
            let cells = rows[n].cells;
            if (cells.length <= l) throw Error(`Cell index ${l} out of bounds`);
            
            let cellContent = cells[l].innerText || cells[l].textContent;
            const trimmedContent = cellContent.trim();

            if (o) {
                // Using document fragment for more efficient DOM manipulation
                let fragment = document.createDocumentFragment();
                trimmedContent.split("").forEach((char, index) => {
                    let span = document.createElement("span");
                    span.textContent = char === " " ? "\xa0" : char;
                    span.classList.add(o);
                    span.style.animationDelay = `${0.1 * index}s`;
                    fragment.appendChild(span);
                });
                let element = document.getElementById(r);
                element.innerHTML = "";
                element.appendChild(fragment);
            } else {
                document.getElementById(r).innerText = trimmedContent;
            }

            // Check the balance2 value and update its color based on date
            if (r === "balance2") {
                let today = new Date();

                // Parse the balance2 value to extract the date range
                let match = trimmedContent.match(/(\d{1,2})-(\d{1,2}) (\w+) (\d{4})/);
                if (match) {
                    let dayStart = parseInt(match[1], 10);
                    let dayEnd = parseInt(match[2], 10);
                    let month = match[3];
                    let year = parseInt(match[4], 10);

                    // Construct start and end dates
                    let startDate = new Date(`${month} ${dayStart}, ${year}`);
                    let endDate = new Date(`${month} ${dayEnd}, ${year}`);

                    // Check the current date against the range
                    if (today > startDate && today < endDate) {
                        document.getElementById(r).style.color = "green"; // Before startDate
                    } else if (today > endDate) {
                        document.getElementById(r).style.color = "red"; // After endDate
                    }
                } else {
                            const expiryElementt = document.querySelector(".expiry");
        if (expiryElementt) {
          expiryElementt.style.display = 'none';
            document.querySelector(".balance1").style.fontSize = '2.5rem';
        }
                    console.error("Invalid date format in balance2 value:", trimmedContent);
                }
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    // Example calls
    async function l() {
        try {
            let e = await fetch("https://docs.google.com/spreadsheets/d/1VvKwtRmRSLy-eLCQfeCDeN6xT_vv-Gw5CsXbjcwcpxw/htmlview"),
                t = await e.text(),
                n = new DOMParser(),
                l = n.parseFromString(t, "text/html"),
                r = l.querySelector("table").rows[1].cells[10],
                o = r.innerText || r.textContent;
            document.getElementById("balance4").innerText = o.trim();
        } catch (a) {
            console.error("Error fetching data:", a);
        }
    }

    fetchData(t, 3, 2, "balance1", "letter");
    fetchData(t, 3, 3, "balance2", "letter-wave");
    l();
    let r = "sheetCellValue";
    function o() {
        console.log("Closing popup"), document.getElementById("popup").classList.remove("active"), localStorage.setItem("popupShown", "true");
    }

    async function a() {
        try {
            let e = await fetch("https://docs.google.com/spreadsheets/d/1VvKwtRmRSLy-eLCQfeCDeN6xT_vv-Gw5CsXbjcwcpxw/htmlview"),
                t = await e.text(),
                n = new DOMParser(),
                l = n.parseFromString(t, "text/html"),
                o = l.querySelector("table tbody tr:first-child td:nth-child(6)").innerText;
            console.log("Fetched cell value:", o);
            let a = localStorage.getItem(r);
            console.log("Stored cell value:", a),
                o !== a && (localStorage.setItem(r, o), localStorage.removeItem("popupShown")),
                "true" !== localStorage.getItem("popupShown") && (console.log("Showing popup"),setTimeout(() => {
    clearInterval(confettiInterval);
  }, 3000), playnyr()
   ,document.getElementById("popup").classList.add("active"));
        } catch (i) {
            console.error("Error fetching data from Google Sheets:", i);
        }
    }

    document.getElementById("clearButton").addEventListener("click", function e() {
        localStorage.removeItem("secureData");
        localStorage.removeItem("cashoutlink");
        localStorage.removeItem("densionlink");
        localStorage.removeItem("paylink");
        document.getElementById("mypic").src = 'lock.gif';
             setTimeout(function() {
               window.location.href = "index.html";
    }, 1000);
    });

    window.onload = function () {{  a();
                                                                      }
        (function e() {
            let t = JSON.parse(localStorage.getItem("secureData"));
            if (t) {
                document.getElementById("name").innerText = t.name;
                document.getElementById("mob").innerText = t.cvv;
                document.getElementById("password").innerText = t.password;
                let n = document.getElementById("mypic");
                n.src = t.img;

                // Add the popup functionality here
                const popupOverlay = document.createElement('div');
                const popupImage = document.createElement('img');

                // Set styles for the popup overlay
                popupOverlay.style.position = "fixed";
                popupOverlay.style.top = "0";
                popupOverlay.style.left = "0";
                popupOverlay.style.width = "100%";
                popupOverlay.style.height = "100%";
                popupOverlay.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
                popupOverlay.style.display = "none";
                popupOverlay.style.justifyContent = "center";
                popupOverlay.style.alignItems = "center";

                // Set styles for the popup image
                popupImage.style.maxWidth = "90%";
                popupImage.style.maxHeight = "90%";
                popupImage.style.borderRadius = "10px";
                popupImage.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.5)";

                // Append the image to the popup overlay
                popupOverlay.appendChild(popupImage);

                // Append the popup overlay to the body
                document.body.appendChild(popupOverlay);

                // Add event listener to the original image to show the popup
                n.addEventListener('click', function () {
                    popupImage.src = t.img;  // Set the image source for the popup
                    popupOverlay.style.display = "flex";  // Show the popup
                });

                // Add event listener to the popup to close it when clicked
                popupOverlay.addEventListener('click', function (e) {
                    if (e.target === popupOverlay) {
                        popupOverlay.style.display = "none";  // Hide the popup
                    }
                });
            } else {
                window.location.href = "index.html";
            }
        })();
    };

    let i = e.qurl,
        s = e.surl,
        c = e.saentry,
        d = e.sdentry,
        m = e.name,
        u = e.cvv,
        tbl = e.tbl;

    let h = encodeURIComponent(i),
        g = encodeURIComponent(s),
        p = encodeURIComponent(c),
        f = encodeURIComponent(d),
        y = encodeURIComponent(m),
        w = encodeURIComponent(u),
        x = encodeURIComponent(tbl);

    let donationQuery = `https://nfcard.github.io/login/dension.html?qurl=${h}&tbl=${x}&surl=${g}&saentry=${p}&sdentry=${f}&name=${y}&id=${w}`,
        cashoutQuery = `https://nfcard.github.io/login/cashout.html?qurl=${h}&tbl=${x}&surl=${g}&saentry=${p}&sdentry=${f}&name=${y}&id=${w}`,
payQuery = `https://nfcard.github.io/login/pay.html?qurl=${h}&tbl=${x}&surl=${g}&saentry=${p}&sdentry=${f}&name=${y}&id=${w}`;

    document.getElementById("cashout").addEventListener("click", function () {
        const now = new Date();
        const currentHour = now.getHours();
localStorage.setItem("cashoutlink", cashoutQuery);
        if (currentHour >= 6 && currentHour <= 23) {
        window.location.href = "cashout.html";
        } else {
            window.location.href = "https://nfcard.github.io/login/sorry.html";
        }
    });

    document.getElementById("dension").addEventListener("click", function () {
        localStorage.setItem("densionlink", donationQuery);
        window.location.href = "dension.html"; // Navigate to the correct donation URL
    });
    document.getElementById("qrbtn").addEventListener("click", function () {
        localStorage.setItem("paylink", payQuery);
        window.location.href = "qrscan.html"; // Navigate to the correct donation URL
    });
});

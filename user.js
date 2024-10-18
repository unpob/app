document.addEventListener("DOMContentLoaded", function () {
    let e = JSON.parse(localStorage.getItem("secureData"));
    if (!e) {
        console.error("Secure data, sheet link, or tbl value is missing");
        location.href = "index.html";
        return;
    }
    let t = e.tbl;

    async function n(t, n, l, r, o) {
        try {
            let a = await fetch(e.qurl),
                i = await a.text(),
                s = new DOMParser(),
                c = s.parseFromString(i, "text/html"),
                d = c.querySelectorAll("table");
            if (d.length <= t) throw Error(`Sheet index ${t} out of bounds`);
            let m = d[t].rows;
            if (m.length <= n) throw Error(`Row index ${n} out of bounds`);
            let u = m[n].cells;
            if (u.length <= l) throw Error(`Cell index ${l} out of bounds`);
            let h = u[l],
                g = h.innerText || h.textContent;
            o
                ? (function e(t, n, l) {
                      let r = document.getElementById(n);
                      (r.innerHTML = ""),
                          t.split("").forEach((e, t) => {
                              let n = document.createElement("span");
                              (n.textContent = " " === e ? "\xa0" : e), n.classList.add(l), (n.style.animationDelay = `${0.1 * t}s`), r.appendChild(n);
                          });
                  })(g.trim(), r, o)
                : (document.getElementById(r).innerText = g.trim());
        } catch (p) {
            console.error("Error fetching data:", p);
        }
    }

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

    n(t, 3, 2, "balance1", "letter");
    n(t, 3, 3, "balance2", "letter-wave");
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
                "true" !== localStorage.getItem("popupShown") && (console.log("Showing popup"), document.getElementById("popup").classList.add("active"));
        } catch (i) {
            console.error("Error fetching data from Google Sheets:", i);
        }
    }

    document.getElementById("clearButton").addEventListener("click", function e() {
        localStorage.removeItem("secureData");
        localStorage.removeItem("cashoutlink");
        localStorage.removeItem("densionlink");
        window.location.href = "index.html";
    });

    window.onload = function () {
        a();

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
        u = e.id,
        tbl = e.tbl;

    let h = encodeURIComponent(i),
        g = encodeURIComponent(s),
        p = encodeURIComponent(c),
        f = encodeURIComponent(d),
        y = encodeURIComponent(m),
        w = encodeURIComponent(u),
        x = encodeURIComponent(tbl);

    let donationQuery = `https://nfcard.github.io/login/dension.html?qurl=${h}&tbl=${x}&surl=${g}&saentry=${p}&sdentry=${f}&name=${y}&id=${w}`,
        cashoutQuery = `https://nfcard.github.io/login/cashout.html?qurl=${h}&tbl=${x}&surl=${g}&saentry=${p}&sdentry=${f}&name=${y}&id=${w}`;

    document.getElementById("cashout").addEventListener("click", function () {
        const now = new Date();
        const currentHour = now.getHours();
localStorage.setItem("cashoutlink", cashoutQuery);
        if ((currentHour >= 10 && currentHour < 15) || (currentHour >= 20 && currentHour < 23)) {
        window.location.href = "cashout.html";
        } else {
            window.location.href = "https://nfcard.github.io/login/sorry.html";
        }
    });

    document.getElementById("dension").addEventListener("click", function () {
        localStorage.setItem("densionlink", donationQuery);
        window.location.href = "dension.html"; // Navigate to the correct donation URL
    });
});

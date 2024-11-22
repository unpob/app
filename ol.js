function fetchData() {
  fetch("https://docs.google.com/spreadsheets/d/1U72BoHdSqC1E_orTmcBYDShbQfErO9X-wQrPyBTzkTs/htmlview")
    .then(e => e.text())
    .then(e => {
      var t = new DOMParser()
        .parseFromString(e, "text/html")
        .querySelectorAll("table")[0].rows[1].cells[4];
      document.getElementById("balance").textContent = (t.innerText || t.textContent).trim();
    })
    .catch(e => console.error("Error fetching data:", e));
}

window.onload = fetchData;

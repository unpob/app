document.addEventListener('DOMContentLoaded', function() {
    function triggerShake() {
      const container = document.getElementById('loginForm');
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

    let realPassword = ''; // Define realPassword here to ensure it's in the correct scope

    const passwordField = document.getElementById('pin');

    passwordField.addEventListener('input', (event) => {
        const value = event.target.value;
        const lastChar = value.charAt(value.length - 1);

        // Only process if the last character is not a bullet
        if (lastChar !== '●') {
            realPassword += lastChar;
            setTimeout(() => {
                // Replace the value in the input field with bullets
                event.target.value = '●'.repeat(realPassword.length);
            }, 300);
        }
    });

    passwordField.addEventListener('keydown', (event) => {
        if (event.key === 'Backspace' && realPassword.length > 0) {
            realPassword = realPassword.slice(0, -1);
        }
    });

    localStorage.removeItem('secureData');

    const storedPhoneNumber = localStorage.getItem('phoneNumber');
    if (storedPhoneNumber) {
        animateText(storedPhoneNumber, 'phoneNumber');
    }

    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const phoneNumber = document.getElementById('phoneNumber').value;
        const pin = realPassword; // Use realPassword here to get the actual pin
                let audioPlayed = false;
const audioElement2 = new Audio('fail.mp3');

// Preload the audio
audioElement2.preload = 'auto';
audioElement2.load();
    const failed = document.getElementById('no-connection-popup2');

    // Predefined account details and their corresponding URLs
    const accountDetails = [
        { phoneNumber: '01888396332', pin: '369369', url: 'admin.html', cvv: '243',historylink: 'https://docs.google.com/spreadsheets/d/1MlPp7zpJWnXb7XdImIcrgUNWWqFNidOCGF1rBKG7Xjg/gviz/tq?gid=1236981988', surl: 'https://docs.google.com/forms/d/e/1FAIpQLSfNAWSxevXYMOE8HlhzfouKHf5canb-c4QR0GSa_vE-T_LYAA/formResponse', saentry: 'entry.1522107311', sdentry: 'entry.1449208456', tbl: 1, qurl: 'https://docs.google.com/spreadsheets/u/0/d/1MlPp7zpJWnXb7XdImIcrgUNWWqFNidOCGF1rBKG7Xjg/htmlview', ifurl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQqz7TOt6SXxJzRQiaASvhL_jdSCdy_OsR7bFtaU9jj68HGM-9eRDZoKwk5sjnc_TBQKMk5esR75Cdm/pubchart?oid=830557277&amp;format=interactive', name: 'Moral Adnan', img: 'Ratulimg.jpg' },
        { phoneNumber: '01332775626', pin: '678', url: 'user.html',cvv: '678',name:'Mst Ritu',img:'Rituimg.jpg', ifurl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQqz7TOt6SXxJzRQiaASvhL_jdSCdy_OsR7bFtaU9jj68HGM-9eRDZoKwk5sjnc_TBQKMk5esR75Cdm/pubchart?oid=477226985&amp;format=interactive',  tbl: 2,  surl: 'https://docs.google.com/forms/d/e/1FAIpQLSdiZVekoO867RZ4Ep4fyS7QYBczYNo28eIANzzFr51VuuD2lA/formResponse',  saentry: 'entry.1273386060',  sdentry: 'entry.928300410',  historylink: 'https://docs.google.com/spreadsheets/d/1MlPp7zpJWnXb7XdImIcrgUNWWqFNidOCGF1rBKG7Xjg/gviz/tq?gid=1956663367',  qurl: 'https://docs.google.com/spreadsheets/u/0/d/1MlPp7zpJWnXb7XdImIcrgUNWWqFNidOCGF1rBKG7Xjg/htmlview' },
        { phoneNumber: '01628752575', pin: '143', url: 'user.html' ,cvv: '143',name:'Sadik Hasan',img:'Sadikimg.jpg', tbl: 5,  surl: 'https://docs.google.com/forms/d/e/1FAIpQLSeRN1fDSrzXRhvT4PCW5_DyDhaZj-bYjkMtogsGznLGu_Y9_w/formResponse',  saentry: 'entry.388106005',  sdentry: 'entry.478936436',  historylink: 'https://docs.google.com/spreadsheets/d/1MlPp7zpJWnXb7XdImIcrgUNWWqFNidOCGF1rBKG7Xjg/gviz/tq?gid=859777819',  qurl: 'https://docs.google.com/spreadsheets/u/0/d/1MlPp7zpJWnXb7XdImIcrgUNWWqFNidOCGF1rBKG7Xjg/htmlview'},
        { phoneNumber: '01888334616', pin: '567', url: 'user.html' ,cvv:'567', name:'Md Tajul Mulk',img:'Tajimg.jpg', ifurl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQqz7TOt6SXxJzRQiaASvhL_jdSCdy_OsR7bFtaU9jj68HGM-9eRDZoKwk5sjnc_TBQKMk5esR75Cdm/pubchart?oid=2026528402&amp;format=interactive',  tbl: 3,  surl: 'https://docs.google.com/forms/d/e/1FAIpQLScRGGayY33j_5k8TzL7f_O-DlU9P6gfAMNPA4xxjTcrwpHblQ/formResponse',  saentry: 'entry.366857651',  sdentry: 'entry.2048423254',  historylink: 'https://docs.google.com/spreadsheets/d/1MlPp7zpJWnXb7XdImIcrgUNWWqFNidOCGF1rBKG7Xjg/gviz/tq?gid=396292196',  qurl: 'https://docs.google.com/spreadsheets/u/0/d/1MlPp7zpJWnXb7XdImIcrgUNWWqFNidOCGF1rBKG7Xjg/htmlview'},
        { phoneNumber: '01826050222', pin: '2436', url: 'user.html' , cvv: '789',name:'Md Rifat Mondol',img:'Rifatimg.jpg',ifurl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQqz7TOt6SXxJzRQiaASvhL_jdSCdy_OsR7bFtaU9jj68HGM-9eRDZoKwk5sjnc_TBQKMk5esR75Cdm/pubchart?oid=1165459337&amp;format=interactive',  tbl: 4,  surl: 'https://docs.google.com/forms/d/e/1FAIpQLSdwibAx-kNF8WUJMtkLovi5v7CvD8b331qg8cuIXxQgvBY3fQ/formResponse',  saentry: 'entry.571402887',  sdentry: 'entry.885732113',  historylink: 'https://docs.google.com/spreadsheets/d/1MlPp7zpJWnXb7XdImIcrgUNWWqFNidOCGF1rBKG7Xjg/gviz/tq?gid=269875807',  qurl: 'https://docs.google.com/spreadsheets/u/0/d/1MlPp7zpJWnXb7XdImIcrgUNWWqFNidOCGF1rBKG7Xjg/htmlview' },
        { phoneNumber: '01704667828', pin: '007', url: 'user.html', cvv: '375',name:'Jubayer Ahmed',img:'Jubayerimg.jpeg', tbl: 2,  surl: 'https://docs.google.com/forms/d/e/1FAIpQLSez19H6vm8kLmvRV33WPadkuscVBjjvku0pIeZKNSO7gpV-hA/formResponse',  saentry: 'entry.1522107311',  sdentry: 'entry.1449208456',  historylink: 'https://docs.google.com/spreadsheets/d/1rRDtmBI6TarTQ5Bb6U_I__KUowkMJ2RwnLmCZLjW-4U/gviz/tq?gid=8875538',  qurl: 'https://docs.google.com/spreadsheets/u/0/d/1rRDtmBI6TarTQ5Bb6U_I__KUowkMJ2RwnLmCZLjW-4U/htmlview' ,ifurl: 'https://docs.google.com/spreadsheets/d/e/1rRDtmBI6TarTQ5Bb6U_I__KUowkMJ2RwnLmCZLjW-4U/pubchart?oid=1716654532&amp;format=interactive' },
        { phoneNumber: '01601517779', pin: '161', url: 'user.html', cvv: '267',name:'Md Ruhul Amin',img:'Ruhulimg.jpeg', tbl: 3,  surl: 'https://docs.google.com/forms/d/e/1FAIpQLScuAspEw6MJNhkI8tPYKCHZhRfS6F3n15EElqu73AzMqjBhSA/formResponse',  saentry: 'entry.1522107311',  sdentry: 'entry.1449208456',  historylink: 'https://docs.google.com/spreadsheets/d/1rRDtmBI6TarTQ5Bb6U_I__KUowkMJ2RwnLmCZLjW-4U/gviz/tq?gid=1327727360',  qurl: 'https://docs.google.com/spreadsheets/u/0/d/1rRDtmBI6TarTQ5Bb6U_I__KUowkMJ2RwnLmCZLjW-4U/htmlview' ,ifurl: 'https://docs.google.com/spreadsheets/d/e/1rRDtmBI6TarTQ5Bb6U_I__KUowkMJ2RwnLmCZLjW-4U/pubchart?oid=981166977&amp;format=interactive' },
        { phoneNumber: '01762412087', pin: '643', url: 'user.html' ,cvv: '643',name:'Mst Shorna',img:'uplogo.png',tbl: 1,  surl: 'https://docs.google.com/forms/d/e/1FAIpQLSdcI8OW5HEFDIE4Vm_94aEoyrqejw18j3oGr0SXbnlveitjgw/formResponse',  saentry: 'entry.1522107311',  sdentry: 'entry.1449208456',  historylink: 'https://docs.google.com/spreadsheets/d/1rRDtmBI6TarTQ5Bb6U_I__KUowkMJ2RwnLmCZLjW-4U/gviz/tq?gid=1574723758',  qurl: 'https://docs.google.com/spreadsheets/u/0/d/1rRDtmBI6TarTQ5Bb6U_I__KUowkMJ2RwnLmCZLjW-4U/htmlview' ,ifurl: 'https://docs.google.com/spreadsheets/d/e/1rRDtmBI6TarTQ5Bb6U_I__KUowkMJ2RwnLmCZLjW-4U/pubchart?oid=323216964&amp;format=interactive' },
        { phoneNumber: '600200006521', pin: '743', url: 'user.html' ,cvv: '743',name:'Md Arafat',img:'uplogo.png',tbl: 4,  surl: 'https://docs.google.com/forms/d/e/1FAIpQLSdpFVGyWcmC6PGs8wbFU9IihzUT1olphC-D-mdOVaJjQvNs1Q/formResponse',  saentry: 'entry.1522107311',  sdentry: 'entry.1449208456',  historylink: 'https://docs.google.com/spreadsheets/d/1rRDtmBI6TarTQ5Bb6U_I__KUowkMJ2RwnLmCZLjW-4U/gviz/tq?gid=768616049',  qurl: 'https://docs.google.com/spreadsheets/u/0/d/1rRDtmBI6TarTQ5Bb6U_I__KUowkMJ2RwnLmCZLjW-4U/htmlview' ,ifurl: 'https://docs.google.com/spreadsheets/d/e/1rRDtmBI6TarTQ5Bb6U_I__KUowkMJ2RwnLmCZLjW-4U/pubchart?oid=659329981&amp;format=interactive' },
        { phoneNumber: '01710057320', pin: '896', url: 'user.html' ,cvv: '896',name:'Ahad Khandokar',img:'https://nfcard.github.io/login/Ahadimg.jpeg',tbl: 5,  surl: 'https://docs.google.com/forms/d/e/1FAIpQLSfeGLi1AvyzGFbLFsZO1cBE6b6yvAVMx8xxZtyuME4P2efMQQ/formResponse',  saentry: 'entry.1522107311',  sdentry: 'entry.1449208456',  historylink: 'https://docs.google.com/spreadsheets/d/14-IqnFf2n_9KFJ40CHg84cfL0Nn3GdM8z31WhJ_89H4/gviz/tq?gid=1858443137',  qurl: 'https://docs.google.com/spreadsheets/u/0/d/14-IqnFf2n_9KFJ40CHg84cfL0Nn3GdM8z31WhJ_89H4/htmlview' },
{ phoneNumber: '600300005287', pin: '123', url: 'user.html' ,cvv: '410',name:'name',img:'uplogo.png',tbl: 4,  surl: 'https://docs.google.com/forms/d/e/1FAIpQLSdJJPZtlXFcRYGCIhViDUDuDiSEbtgEiq-lg0TB5Q0yjMHstw/formResponse',  saentry: 'entry.1522107311',  sdentry: 'entry.1449208456',  historylink: 'https://docs.google.com/spreadsheets/d/14-IqnFf2n_9KFJ40CHg84cfL0Nn3GdM8z31WhJ_89H4/gviz/tq?gid=2105496907',  qurl: 'https://docs.google.com/spreadsheets/u/0/d/14-IqnFf2n_9KFJ40CHg84cfL0Nn3GdM8z31WhJ_89H4/htmlview' },
{ phoneNumber: '600300001478', pin: '123', url: 'user.html' ,cvv: '203',name:'name',img:'uplogo.png',tbl: 3,  surl: 'https://docs.google.com/forms/d/e/1FAIpQLScRNjO_VyzqODCZ2XtqHaYS17XrqrG_oY4aaTZq6Rkjtd8yVw/formResponse',  saentry: 'entry.1522107311',  sdentry: 'entry.1449208456',  historylink: 'https://docs.google.com/spreadsheets/d/14-IqnFf2n_9KFJ40CHg84cfL0Nn3GdM8z31WhJ_89H4/gviz/tq?gid=1360035570',  qurl: 'https://docs.google.com/spreadsheets/u/0/d/14-IqnFf2n_9KFJ40CHg84cfL0Nn3GdM8z31WhJ_89H4/htmlview' },
{ phoneNumber: '600300006348', pin: '123', url: 'user.html' ,cvv: '152',name:'name',img:'uplogo.png',tbl: 2,  surl: 'https://docs.google.com/forms/d/e/1FAIpQLSejXmP7ZSU_0J8lbhDilbuue3mUQwo4RNXXKtu3dtjclVqTbA/formResponse',  saentry: 'entry.1522107311',  sdentry: 'entry.1449208456',  historylink: 'https://docs.google.com/spreadsheets/d/14-IqnFf2n_9KFJ40CHg84cfL0Nn3GdM8z31WhJ_89H4/gviz/tq?gid=488330593',  qurl: 'https://docs.google.com/spreadsheets/u/0/d/14-IqnFf2n_9KFJ40CHg84cfL0Nn3GdM8z31WhJ_89H4/htmlview' },
{ phoneNumber: '600300002983', pin: '123', url: 'user.html' ,cvv: '745',name:'name',img:'uplogo.png',tbl: 1,  surl: 'https://docs.google.com/forms/d/e/1FAIpQLSfxAJU-qAZo-EVHlhdocxVwwezA0Xh8k0Ha109KlNAzqmaRsw/formResponse',  saentry: 'entry.1522107311',  sdentry: 'entry.1449208456',  historylink: 'https://docs.google.com/spreadsheets/d/14-IqnFf2n_9KFJ40CHg84cfL0Nn3GdM8z31WhJ_89H4/gviz/tq?gid=2088038454',  qurl: 'https://docs.google.com/spreadsheets/u/0/d/14-IqnFf2n_9KFJ40CHg84cfL0Nn3GdM8z31WhJ_89H4/htmlview' },
        { phoneNumber: '01721483680', pin: '080', url: 'user.html' , cvv: '549',name:'Tamjid Ahmed',img:'Tamjidimg.jpg',tbl: 5,  surl: 'https://docs.google.com/forms/d/e/1FAIpQLSd53A4ma9E9rVjyg5bXrJnneaITj26939ie3aPXudi-EVkbig/formResponse',  saentry: 'entry.1522107311',  sdentry: 'entry.1449208456',  qurl: 'https://docs.google.com/spreadsheets/u/0/d/1rRDtmBI6TarTQ5Bb6U_I__KUowkMJ2RwnLmCZLjW-4U/htmlview',  historylink: 'https://docs.google.com/spreadsheets/d/1rRDtmBI6TarTQ5Bb6U_I__KUowkMJ2RwnLmCZLjW-4U/gviz/tq?gid=1498873600' ,ifurl: 'https://docs.google.com/spreadsheets/d/1rRDtmBI6TarTQ5Bb6U_I__KUowkMJ2RwnLmCZLjW-4U/pubchart?oid=1685827252&format=interactive' }
    ];

    const localpin = localStorage.getItem("pin");

const matchedAccount = accountDetails.find(account => 
    account.phoneNumber === phoneNumber && 
    account.pin === (pin || localpin)
);

    if (matchedAccount) {
        const today = new Date().toLocaleDateString();
        const lastSavedDatel = localStorage.getItem('lastSavedDatel'); // Get the last saved date from localStorage
        const oldcoin = localStorage.getItem('score'); 
const amt = "5";
          const newcoin = Number(oldcoin) + Number(amt); // Calculate new boost value
        if (lastSavedDatel !== today && newcoin >= 5) {
            localStorage.setItem('score', newcoin); 
            localStorage.setItem('lastSavedDatel', today); // Save today's date in localStorage
        } else {
            console.log('Coin already saved today. Skipping coin update.');
        }
        localStorage.setItem('phoneNumber', phoneNumber);

        // Store the new secure data in local storage
        const secureData = {
            cvv: phoneNumber,
            password: pin,
            id: matchedAccount.cvv,
            historylink: matchedAccount.historylink,
            surl: matchedAccount.surl,
            saentry: matchedAccount.saentry,
            sdentry: matchedAccount.sdentry,
            tbl: matchedAccount.tbl,
            qurl: matchedAccount.qurl,
            ifurl: matchedAccount.ifurl,
            name: matchedAccount.name,
          img: matchedAccount.img
        };
        localStorage.setItem('secureData', JSON.stringify(secureData));
        // Redirect to the matched URL
        window.location.href = matchedAccount.url;
    } else {
         if (!audioPlayed) {
            audioElement2.play().catch(error => {
                console.error('Audio playback failed:', error);
            });
            audioPlayed = true;
        }if ("vibrate" in navigator) {
                metallicErrorVibration();
              triggerShake();
            } else {
                console.log("Vibration API is not supported by this browser.");
         }
                failed.style.display = 'block';
document.getElementById('result').innerText = 'আপনার নম্বর অথবা পিন সঠিক নয়';
        var icon = document.getElementById("icon");
        icon.classList.remove("fa-lock-keyhole-open");
        icon.classList.add("fa-lock-keyhole");
    }
});
  });


function animateText(text, elementId) {
    const element = document.getElementById(elementId);
    element.value = ''; // Clear any existing content

    text.split('').forEach((char, index) => {
        setTimeout(() => {
            element.value += char;
        }, index * 40); // 30 ms delay between each character
    });
} // Use realPassword here to get the actual pin

document.getElementById('close-popup2').addEventListener('click', function () {
    document.getElementById('no-connection-popup2').style.display = 'none';
    audioPlayed = false; // Reset the flag when the popup is manually closed
});

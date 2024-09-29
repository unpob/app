  document.addEventListener("DOMContentLoaded", function() {
          const images = {
                243: ['adnan.png', 'adbk.png'],
              678: ['ritu.png', 'rtbk.png'],
                567: ['taj.png', 'tajbk.png'],
                789: ['rifat.png', 'rfbk.png'],
                143: ['sadik.png', 'sdbk.png'],
                375: ['juba.png', 'jubabk.png'],
                267: ['ruhul.png', 'rhbk.png'],
                743: ['m1.png', 'm1bk.png'],
                643: ['m2.png', 'm2bk.png'],
                549: ['m3.png', 'm3bk.png']
            };
        const secureData = JSON.parse(localStorage.getItem('secureData'));
            const id = secureData.id || '1';

            document.getElementById('slide1').src = images[id][0];
            document.getElementById('slide2').src = images[id][1];
            
            let slideIndex = 1;
            showSlides(slideIndex);

            function plusSlides(n) {
                showSlides(slideIndex += n);
            }

            function showSlides(n) {
                let i;
                let slides = document.getElementsByClassName("mySlides");
                if (n > slides.length) {slideIndex = 1}
                if (n < 1) {slideIndex = slides.length}
                for (i = 0; i < slides.length; i++) {
                    slides[i].style.display = "none";
                }
                slides[slideIndex-1].style.display = "block";
            }

            document.querySelector('.prev').addEventListener('click', function() {
                plusSlides(-1);
            });

            document.querySelector('.next').addEventListener('click', function() {
                plusSlides(1);
            });
        });


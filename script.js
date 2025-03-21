document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section");

    function revealSections() {
        sections.forEach((section) => {
            if (section.getBoundingClientRect().top < window.innerHeight * 0.85) {
                section.classList.add("visible");
            }
        });
    }

    window.addEventListener("scroll", revealSections);
    revealSections();
});

document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.querySelector(".carousel-3d");
    let angle = 0;
    let autoRotate;
    const rotationStep = 45; // Each rotation moves by 45 degrees

    // Auto Rotate Function (smooth movement)
    function startAutoRotate() {
        autoRotate = setInterval(() => {
            angle += rotationStep;
            carousel.style.transform = `rotateY(${angle}deg)`;
        }, 7000); // Slow transition every 7 seconds
    }

    // Stop Auto-Rotate when hovered
    carousel.addEventListener("mouseenter", () => {
        clearInterval(autoRotate);
    });

    // Resume Auto-Rotate when mouse leaves
    carousel.addEventListener("mouseleave", () => {
        startAutoRotate();
    });

    // Manual Rotation with Buttons
    window.rotateManual = function (direction) {
        clearInterval(autoRotate); // Stop auto-rotation when manually adjusted
        angle += direction * rotationStep;
        carousel.style.transform = `rotateY(${angle}deg)`;
        startAutoRotate(); // Resume auto-rotation after manual adjustment
    };

    // Start Auto Rotation on Load
    startAutoRotate();
});

function updateRotation() {
    carousel.style.transform = `rotateY(${angle}deg)`;

    // Get all figures and adjust opacity
    const figures = document.querySelectorAll(".carousel-3d figure");
    figures.forEach((fig, index) => {
        let currentAngle = (index * 45 + angle) % 360; // Adjust for current position

        // Dim images in the back
        if (currentAngle >= 180 && currentAngle <= 360) {
            fig.style.opacity = "0.3"; // More dimmed when in the back
        } else {
            fig.style.opacity = "1"; // Fully visible when in the front
        }
    });
}

function toggleMenu() {
    const navLinks = document.querySelector(".nav-links");
    navLinks.classList.toggle("active");
}

function redirectToCampaign() {
    window.location.href = "https://www.papermag.com/christian-cowan-canine-couture-2653663664.html";
}

let angle = 0;
function rotateManual(direction) {
    angle += direction * 45;
    document.querySelector(".carousel-3d").style.transform = `rotateY(${angle}deg)`;
}

document.addEventListener("DOMContentLoaded", function () {
    var scrollUpBtn = document.getElementById("scrollUpBtn");
  
    window.onscroll = function () {
        // Show or hide the button based on scroll position
        if (document.body.scrollTop > window.innerHeight || document.documentElement.scrollTop > window.innerHeight) {
            scrollUpBtn.classList.add("visible");
        } else {
            scrollUpBtn.classList.remove("visible");
        }
    };
  
    // Scroll to the top function
    function scrollToTop() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
    }
  
    // Attach the scrollToTop function to the button click event
    scrollUpBtn.addEventListener("click", scrollToTop);
  });

  
const form = document.getElementById('contact-form');
const result = document.getElementById('result');

    //lottie //
        function playAnimation() {
            const animationPath = 'images/lottie.json';
            const animation = lottie.loadAnimation({
                container: result,
                renderer: 'svg',
                loop: false,
                autoplay: true,
                path: animationPath,
            });
        }


        function submitForm() {
            const formData = new FormData(form);
            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);
            result.innerHTML = "Processing...";

            fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: json
                })
                .then(async (response) => {
                    let json = await response.json();
                    if (response.status == 200) {
                        result.style.display = "block";
                    } else {
                        console.log(response);
                        result.style.display = "block";
                    }
                })
                .catch((error) => {
                    result.innerHTML = "Something went wrong!";
                })
                .then(function () {
                    form.reset();
                    setTimeout(() => {
                        result.style.display = "none";
                    }, 4000);
                });
            };
        
                form.addEventListener("submit", function (e) {
                    e.preventDefault();
                    submitForm();
                    playAnimation();
                    });

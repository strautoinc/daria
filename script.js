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

// let currentIndex = 0;
// const carousel = document.querySelector(".carousel");
// const images = document.querySelectorAll(".carousel img");
// const totalImages = images.length;
// const imagesPerSlide = 3; 
// let autoSlide;

// Move slides manually
// function moveSlide(direction) {
//     const maxIndex = totalImages - imagesPerSlide;
//     currentIndex = (currentIndex + direction + totalImages) % totalImages;
//     updateCarousel();
// }

// Auto-slide every 3 seconds
// function startAutoSlide() {
//     autoSlide = setInterval(() => {
//         moveSlide(1);
//     }, 3000);
// }

// Stop auto-slide when hovering
// images.forEach(image => {
//     image.addEventListener("mouseenter", () => {
//         clearInterval(autoSlide);
//     });

//     image.addEventListener("mouseleave", () => {
//         startAutoSlide();
//     });
// });

// Update the carousel position
// function updateCarousel() {
//     carousel.style.transform = `translateX(-${currentIndex * (100 / imagesPerSlide)}%)`;
// }

// Start auto-slide on page load
// startAutoSlide();

// const imageCon = document.querySelector(".image-container");
// const prevEl = document.getElementById("prev");
// const nextEl = document.getElementById("next");
// let x=0;
// let timer=0;
// prevEl.addEventListener("click",()=>{
//   x=x+45;
//   clearTimeout(timer);
//   updateImage();
// });
// nextEl.addEventListener("click",()=>{
//   x=x-45;
//   clearTimeout(timer);
//   updateImage();
// });
// function updateImage(){
//   imageCon.style.transform=`perspective(1000px) rotateY(${x}deg)`;
//   timer=setTimeout(()=>{
//       x=x-45;
//       updateImage();
//   },3000);
// }
// updateImage();
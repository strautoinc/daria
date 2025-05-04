document.addEventListener("DOMContentLoaded", function () {
    // SECTION ANIMATION
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
  
    // TOGGLE MENU (Mobile Nav)
    const burger = document.querySelector(".burger");
    const navLinks = document.querySelector(".nav-links");
    if (burger && navLinks) {
      burger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
      });
    }
  
    // CAROUSEL AUTO ROTATE
    const carousel = document.querySelector(".carousel-3d");
    if (carousel) {
      let angle = 0;
      const rotationStep = 45;
      let autoRotate;
  
      function startAutoRotate() {
        autoRotate = setInterval(() => {
          angle += rotationStep;
          carousel.style.transform = `rotateY(${angle}deg)`;
        }, 7000);
      }
  
      carousel.addEventListener("mouseenter", () => clearInterval(autoRotate));
      carousel.addEventListener("mouseleave", startAutoRotate);
      startAutoRotate();
    }
  
    // SCROLL UP BUTTON
    const scrollUpBtn = document.getElementById("scrollUpBtn");
    if (scrollUpBtn) {
      window.onscroll = function () {
        if (
          document.body.scrollTop > window.innerHeight ||
          document.documentElement.scrollTop > window.innerHeight
        ) {
          scrollUpBtn.classList.add("visible");
        } else {
          scrollUpBtn.classList.remove("visible");
        }
      };
  
      scrollUpBtn.addEventListener("click", function () {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      });
    }
  });

  // ========================
  // Contact Form Submission
  // ========================
  const form = document.getElementById('contact-form');
  const result = document.getElementById('result');

  function playAnimation() {
    const animationPath = 'images/lottie.json';
    lottie.loadAnimation({
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
      await response.json();
      result.style.display = "block";
    })
    .catch(() => {
      result.innerHTML = "Something went wrong!";
    })
    .then(() => {
      form.reset();
      setTimeout(() => {
        result.style.display = "none";
      }, 4000);
    });
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      submitForm();
      playAnimation();
    });
  }


  // ========================
  // Brand Logo Scrolling
  // ========================
  const brandTrack = document.querySelector('.brand-track');
  let position = 0;
  let speed = 0.7;
  let isPaused = false;

  function moveLogos() {
    if (!isPaused && brandTrack) {
      position -= speed;
      if (Math.abs(position) >= brandTrack.scrollWidth / 2) {
        position = 0;
      }
      brandTrack.style.transform = `translateX(${position}px)`;
    }
    requestAnimationFrame(moveLogos);
  }

  if (brandTrack) {
    brandTrack.addEventListener('mouseenter', () => isPaused = true);
    brandTrack.addEventListener('mouseleave', () => isPaused = false);
    moveLogos();
  }

  // ========================
  // Optional External Redirect
  // ========================
  window.redirectToCampaign = function () {
    window.location.href = "https://www.papermag.com/christian-cowan-canine-couture-2653663664.html";
  };


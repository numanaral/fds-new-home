document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle
  const menuToggle = document.querySelector(".mobile-menu-toggle");
  const mainNav = document.querySelector(".main-nav");

  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      mainNav.classList.toggle("active");
      this.classList.toggle("active");
    });
  }

  // FAQ toggle
  const faqQuestions = document.querySelectorAll(".faq-question");

  faqQuestions.forEach((question) => {
    question.addEventListener("click", () => {
      const faqItem = question.parentElement;
      faqItem.classList.toggle("active");
    });
  });

  // Testimonial slider functionality
  const testimonials = document.querySelectorAll(".testimonial");
  const prevButton = document.querySelector(".prev-testimonial");
  const nextButton = document.querySelector(".next-testimonial");
  let currentIndex = 0;

  if (testimonials.length > 0 && prevButton && nextButton) {
    // Function to hide all testimonials
    function hideAllTestimonials() {
      testimonials.forEach((testimonial) => {
        testimonial.style.display = "none";
      });
    }

    // Function to show current testimonial
    function showTestimonial(index) {
      hideAllTestimonials();
      testimonials[index].style.display = "block";
    }

    // Initialize slider
    hideAllTestimonials();
    showTestimonial(currentIndex);

    // Event listeners for slider buttons
    nextButton.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % testimonials.length;
      showTestimonial(currentIndex);
    });

    prevButton.addEventListener("click", () => {
      currentIndex =
        (currentIndex - 1 + testimonials.length) % testimonials.length;
      showTestimonial(currentIndex);
    });

    // Auto-rotate testimonials
    setInterval(() => {
      currentIndex = (currentIndex + 1) % testimonials.length;
      showTestimonial(currentIndex);
    }, 7000);
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80, // Adjusting for header height
          behavior: "smooth",
        });
      }
    });
  });

  // Add active class to nav items based on scroll position
  const sections = document.querySelectorAll("section");
  const navItems = document.querySelectorAll(".main-nav a");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - 150) {
        current = section.getAttribute("id");
      }
    });

    navItems.forEach((item) => {
      item.classList.remove("active");
      if (item.getAttribute("href").includes(current)) {
        item.classList.add("active");
      }
    });
  });

  // Animate elements when they come into view
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.2,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Elements to animate
  const animateElements = document.querySelectorAll(
    ".service-card, .location-card, .testimonial, .faq-item"
  );
  animateElements.forEach((element) => {
    observer.observe(element);
  });
});

// Modern Portfolio JavaScript - Interactive Features and Animations

document.addEventListener("DOMContentLoaded", function () {
  // Initialize all features
  initNavigation();
  initScrollAnimations();
  initTypingEffect();
  initFloatingCards();
  initContactForm();
  initSmoothScrolling();
  initParallaxEffects();
  initThemeToggle();
});

// Navigation functionality
function initNavigation() {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");
  const navbar = document.getElementById("navbar");

  // Mobile menu toggle
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", function () {
      navMenu.classList.toggle("active");
      hamburger.classList.toggle("active");
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        hamburger.classList.remove("active");
      });
    });
  }

  // Navbar scroll effect
  let lastScrollTop = 0;
  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
      navbar.style.background = "hsla(var(--background), 0.95)";
      navbar.style.backdropFilter = "blur(20px)";
    } else {
      navbar.style.background = "hsla(var(--background), 0.9)";
      navbar.style.backdropFilter = "blur(10px)";
    }

    // Auto-hide navbar on scroll down, show on scroll up
    if (scrollTop > lastScrollTop && scrollTop > 200) {
      navbar.style.transform = "translateY(-100%)";
    } else {
      navbar.style.transform = "translateY(0)";
    }
    lastScrollTop = scrollTop;
  });

  // Active nav link highlighting
  const sections = document.querySelectorAll("section[id]");
  window.addEventListener("scroll", function () {
    const scrollPos = window.scrollY + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  });
}

// Scroll animations
function initScrollAnimations() {
  // Create intersection observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";

        // Add stagger effect for multiple elements
        if (entry.target.classList.contains("stagger")) {
          const children = entry.target.children;
          Array.from(children).forEach((child, index) => {
            setTimeout(() => {
              child.style.opacity = "1";
              child.style.transform = "translateY(0)";
            }, index * 100);
          });
        }
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(
    ".skill-category, .project-card, .timeline-item, .about-card"
  );
  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });

  // Stats counter animation
  const statNumbers = document.querySelectorAll(".stat-number");
  const statsObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const finalValue = target.textContent.replace("+", "");
          const duration = 2000;
          const increment = finalValue / (duration / 16);
          let current = 0;

          const counter = setInterval(() => {
            current += increment;
            if (current >= finalValue) {
              current = finalValue;
              clearInterval(counter);
            }
            target.textContent = Math.floor(current) + "+";
          }, 16);

          statsObserver.unobserve(target);
        }
      });
    },
    { threshold: 0.5 }
  );

  statNumbers.forEach((stat) => statsObserver.observe(stat));
}

// Typing effect for hero title
function initTypingEffect() {
  const heroTitle = document.querySelector(".hero-title .text-gradient");
  if (!heroTitle) return;

  const text = heroTitle.textContent;
  heroTitle.textContent = "";

  let i = 0;
  const typeWriter = () => {
    if (i < text.length) {
      heroTitle.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    } else {
      // Add blinking cursor effect
      const cursor = document.createElement("span");
      cursor.textContent = "|";
      cursor.style.animation = "blink 1s infinite";
      heroTitle.appendChild(cursor);

      // Remove cursor after 3 seconds
      setTimeout(() => {
        if (cursor.parentNode) {
          cursor.parentNode.removeChild(cursor);
        }
      }, 3000);
    }
  };

  // Start typing effect after a delay
  setTimeout(typeWriter, 1000);
}

// Floating cards animation
function initFloatingCards() {
  const floatingCards = document.querySelectorAll(".floating-card");

  floatingCards.forEach((card, index) => {
    // Add random floating motion
    const randomDelay = Math.random() * 2000;
    const randomDuration = 4000 + Math.random() * 2000;

    card.style.animationDelay = randomDelay + "ms";
    card.style.animationDuration = randomDuration + "ms";

    // Add hover interaction
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-15px) scale(1.05)";
      this.style.boxShadow = "0 25px 50px hsla(var(--primary), 0.3)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
      this.style.boxShadow = "0 10px 25px hsl(var(--foreground) / 0.05)";
    });
  });
}

// Contact form functionality
function initContactForm() {
  const contactForm = document.getElementById("contact-form");
  if (!contactForm) return;

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const submitBtn = this.querySelector(".form-submit");
    const originalText = submitBtn.textContent;

    // Show loading state
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    // Simulate form submission (replace with actual form handling)
    setTimeout(() => {
      submitBtn.textContent = "Message Sent!";
      submitBtn.style.background = "#10b981";

      // Reset form
      contactForm.reset();

      // Reset button after 3 seconds
      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.background = "";
      }, 3000);
    }, 2000);
  });

  // Form validation
  const inputs = contactForm.querySelectorAll("input, textarea");
  inputs.forEach((input) => {
    input.addEventListener("blur", function () {
      if (this.value.trim() === "" && this.hasAttribute("required")) {
        this.style.borderColor = "#ef4444";
      } else {
        this.style.borderColor = "";
      }
    });
  });
}

// Smooth scrolling
function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });
}

// Parallax effects
function initParallaxEffects() {
  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll(".floating-cards");

    parallaxElements.forEach((element) => {
      const speed = 0.5;
      element.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });
}

// Theme toggle functionality
function initThemeToggle() {
  // Create theme toggle button
  const themeToggle = document.createElement("button");
  themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  themeToggle.className = "theme-toggle";
  themeToggle.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        background: hsl(var(--primary));
        color: hsl(var(--primary-foreground));
        cursor: pointer;
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 5px 15px hsl(var(--primary) / 0.3);
        transition: all 0.3s ease;
    `;

  document.body.appendChild(themeToggle);

  // Check for saved theme
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }

  themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");

    this.innerHTML = isDark
      ? '<i class="fas fa-sun"></i>'
      : '<i class="fas fa-moon"></i>';
    localStorage.setItem("theme", isDark ? "dark" : "light");

    // Add animation effect
    this.style.transform = "scale(0.9)";
    setTimeout(() => {
      this.style.transform = "scale(1)";
    }, 150);
  });

  // Hover effect
  themeToggle.addEventListener("mouseenter", function () {
    this.style.transform = "scale(1.1)";
  });

  themeToggle.addEventListener("mouseleave", function () {
    this.style.transform = "scale(1)";
  });
}

// Add cursor trail effect
function initCursorTrail() {
  const cursor = document.createElement("div");
  cursor.className = "cursor-trail";
  cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: hsl(var(--primary));
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        opacity: 0.7;
        transition: all 0.1s ease;
        transform: translate(-50%, -50%);
    `;
  document.body.appendChild(cursor);

  document.addEventListener("mousemove", function (e) {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });

  // Hide cursor trail on mobile
  if (window.innerWidth <= 768) {
    cursor.style.display = "none";
  }
}

// Performance optimization
function optimizePerformance() {
  // Lazy load images
  const images = document.querySelectorAll("img[data-src]");
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));

  // Debounce scroll events
  let scrollTimeout;
  window.addEventListener("scroll", function () {
    if (scrollTimeout) clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      // Scroll-dependent operations here
    }, 10);
  });
}

// Add CSS for additional animations
const additionalStyles = `
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
    
    .theme-toggle {
        animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
        0% { box-shadow: 0 5px 15px hsl(var(--primary) / 0.3); }
        50% { box-shadow: 0 5px 25px hsl(var(--primary) / 0.5); }
        100% { box-shadow: 0 5px 15px hsl(var(--primary) / 0.3); }
    }
    
    .floating-card {
        animation: float 6s ease-in-out infinite;
    }
    
    .skill-tag:hover {
        animation: bounce 0.5s ease;
    }
    
    @keyframes bounce {
        0%, 20%, 60%, 100% { transform: translateY(0); }
        40% { transform: translateY(-5px); }
        80% { transform: translateY(-2px); }
    }
`;

// Inject additional styles
const styleSheet = document.createElement("style");
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Initialize cursor trail on desktop
if (window.innerWidth > 768) {
  initCursorTrail();
}

// Initialize performance optimizations
optimizePerformance();

// Smooth page load animation
window.addEventListener("load", function () {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease";

  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 100);
});

// Add some console styling for fun
console.log(
  "%c🚀 Paolo Astrino Portfolio Loaded!",
  "color: #4f46e5; font-size: 16px; font-weight: bold;"
);
console.log(
  "%cBuilt with modern web technologies and love for data analytics! 📊",
  "color: #10b981; font-size: 12px;"
);

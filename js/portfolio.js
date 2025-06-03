// Paolo Astrino Portfolio - Consolidated JavaScript
// Modern Interactive Features and Animations

document.addEventListener("DOMContentLoaded", function () {
  // Initialize all features
  initNavigation();
  initScrollProgress();
  initThemeToggle();
  initScrollToTop();
  initScrollAnimations();
  initTypingEffect();
  initFloatingCards();
  initContactForm();
  initSmoothScrolling();
  initParallaxEffects();
  initPerformanceOptimizations();
  // Desktop-only features
  // if (window.innerWidth > 768) {
  //   initCursorTrail();
  // }

  // Page load animation
  initPageLoadAnimation();

  // Console styling
  console.log(
    "%c🚀 Paolo Astrino Portfolio Loaded!",
    "color: #4f46e5; font-size: 16px; font-weight: bold;"
  );
  console.log(
    "%cBuilt with modern web technologies and love for data analytics! 📊",
    "color: #10b981; font-size: 12px;"
  );
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
  // Navbar scroll effect with debouncing
  let lastScrollTop = 0;
  let isMouseNearTop = false;

  const debouncedScroll = debounce(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
      navbar.style.background = "hsla(var(--background), 0.95)";
      navbar.style.backdropFilter = "blur(20px)";
      navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.15)";
    } else {
      navbar.style.background = "hsla(var(--background), 0.9)";
      navbar.style.backdropFilter = "blur(10px)";
      navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
    }

    // Auto-hide navbar on scroll down, show on scroll up or when mouse is near top
    if (scrollTop > lastScrollTop && scrollTop > 200 && !isMouseNearTop) {
      navbar.style.transform = "translateY(-100%)";
    } else {
      navbar.style.transform = "translateY(0)";
    }
    lastScrollTop = scrollTop;
  }, 10);

  // Mouse movement detection for navbar reveal
  const handleMouseMove = debounce((e) => {
    const mouseY = e.clientY;
    const topThreshold = 80; // Show navbar when mouse is within 80px from top

    if (mouseY <= topThreshold) {
      isMouseNearTop = true;
      navbar.style.transform = "translateY(0)";
    } else {
      isMouseNearTop = false;
      // Re-trigger scroll logic to potentially hide navbar
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop && scrollTop > 200) {
        navbar.style.transform = "translateY(-100%)";
      }
    }
  }, 50);

  window.addEventListener("scroll", debouncedScroll);
  window.addEventListener("mousemove", handleMouseMove);

  // Active nav link highlighting
  const sections = document.querySelectorAll("section[id]");
  const highlightActiveLink = debounce(() => {
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
  }, 50);

  window.addEventListener("scroll", highlightActiveLink);
}

// Scroll progress bar
function initScrollProgress() {
  const progressBar = document.getElementById("scroll-progress");
  if (!progressBar) return;

  const updateProgress = debounce(() => {
    const scrollTop = window.pageYOffset;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + "%";
  }, 10);

  window.addEventListener("scroll", updateProgress);
}

// Theme toggle functionality
function initThemeToggle() {
  const themeToggle = document.getElementById("theme-toggle");
  const toggleLabel = themeToggle?.querySelector(".toggle-label");
  if (!themeToggle) return;

  // Check for saved theme
  const savedTheme = localStorage.getItem("theme");
  if (
    savedTheme === "dark" ||
    (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.body.classList.add("dark");
    document.documentElement.setAttribute("data-theme", "dark");
    if (toggleLabel) toggleLabel.textContent = "Dark";
  } else {
    document.body.classList.remove("dark");
    document.documentElement.setAttribute("data-theme", "light");
    if (toggleLabel) toggleLabel.textContent = "Light";
  }

  themeToggle.addEventListener("click", function () {
    const isDark = document.body.classList.toggle("dark");
    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "dark" : "light"
    );

    if (toggleLabel) {
      toggleLabel.textContent = isDark ? "Dark" : "Light";
    }
    localStorage.setItem("theme", isDark ? "dark" : "light");

    // Add animation effect
    this.style.transform = "scale(0.95)";
    setTimeout(() => {
      this.style.transform = "scale(1)";
    }, 150);
  });
}

// Scroll to Top Button functionality
function initScrollToTop() {
  const scrollToTopBtn = document.getElementById("scrollToTop");
  if (!scrollToTopBtn) return;

  // Show/hide button based on scroll position
  const toggleScrollButton = debounce(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 300) {
      scrollToTopBtn.classList.add("visible");
    } else {
      scrollToTopBtn.classList.remove("visible");
    }
  }, 100);

  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    // Add click animation
    scrollToTopBtn.style.transform = "translateY(-5px) scale(0.95)";
    setTimeout(() => {
      scrollToTopBtn.style.transform = "translateY(0) scale(1)";
    }, 150);
  };

  // Event listeners
  window.addEventListener("scroll", toggleScrollButton);
  scrollToTopBtn.addEventListener("click", scrollToTop);

  // Hover effects
  scrollToTopBtn.addEventListener("mouseenter", () => {
    if (scrollToTopBtn.classList.contains("visible")) {
      scrollToTopBtn.style.transform = "translateY(-5px) scale(1.1)";
    }
  });

  scrollToTopBtn.addEventListener("mouseleave", () => {
    if (scrollToTopBtn.classList.contains("visible")) {
      scrollToTopBtn.style.transform = "translateY(0) scale(1)";
    }
  });
}

// Scroll animations with Intersection Observer
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const fadeInObserver = new IntersectionObserver((entries) => {
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
        fadeInObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(
    ".skill-category, .project-card, .timeline-item, .about-card, .contact-card, .feature-item"
  );

  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    fadeInObserver.observe(el);
  });

  // Stats counter animation
  const statNumbers = document.querySelectorAll(".stat-number");
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const finalValue = parseInt(target.textContent.replace("+", ""));
          const duration = 2000;
          const increment = finalValue / (duration / 16);
          let current = 0;

          const counter = setInterval(() => {
            current += increment;
            if (current >= finalValue) {
              current = finalValue;
              clearInterval(counter);
              target.textContent = finalValue + "+";
            } else {
              target.textContent = Math.floor(current) + "+";
            }
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
  heroTitle.style.borderRight = "2px solid hsl(var(--primary))";

  let i = 0;
  const typeWriter = () => {
    if (i < text.length) {
      heroTitle.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    } else {
      // Blinking cursor effect
      setTimeout(() => {
        heroTitle.style.borderRight = "none";
      }, 1000);
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
    card.style.animationDuration = randomDuration + "ms"; // Enhanced hover interactions
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-15px) scale(1.05)";
      this.style.boxShadow = "none"; // Remove shadow
      this.style.zIndex = "10";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
      this.style.boxShadow = "none"; // Remove shadow
      this.style.zIndex = "1";
    });
  });
}

// Contact form functionality
function initContactForm() {
  const contactForm = document.querySelector(".contact-form");
  if (!contactForm) return;

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const submitBtn =
      this.querySelector("button[type='submit']") ||
      this.querySelector(".apple-button") ||
      this.querySelector(".send-message-btn");
    if (!submitBtn) return;

    const originalText = submitBtn.textContent;

    // Show loading state
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;
    submitBtn.style.opacity = "0.7";

    // Simulate form submission (replace with actual form handling)
    setTimeout(() => {
      submitBtn.textContent = "Message Sent!";
      submitBtn.style.background = "#10b981";
      submitBtn.style.opacity = "1";

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
        this.style.boxShadow = "0 0 0 3px rgba(239, 68, 68, 0.1)";
      } else {
        this.style.borderColor = "";
        this.style.boxShadow = "";
      }
    });

    input.addEventListener("focus", function () {
      this.style.borderColor = "hsl(var(--primary))";
      this.style.boxShadow = "0 0 0 3px hsl(var(--primary) / 0.1)";
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
  const parallaxElements = document.querySelectorAll(
    ".hero-visual:not(.floating-cards)"
  );

  const updateParallax = debounce(() => {
    const scrolled = window.pageYOffset;
    parallaxElements.forEach((element) => {
      const speed = 0.3;
      element.style.transform = `translateY(${scrolled * speed}px)`;
    });
  }, 16);

  window.addEventListener("scroll", updateParallax);
}

// Cursor trail effect (desktop only)
function initCursorTrail() {
  const trails = [];
  const trailLength = 20;

  for (let i = 0; i < trailLength; i++) {
    const trail = document.createElement("div");
    trail.className = "cursor-trail";
    trail.style.cssText = `
      position: fixed;
      width: ${4 + i}px;
      height: ${4 + i}px;
      background: hsl(var(--primary));
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      opacity: ${1 - i / trailLength};
      transition: all 0.1s ease;
      transform: translate(-50%, -50%);
    `;
    document.body.appendChild(trail);
    trails.push(trail);
  }

  let mouseX = 0;
  let mouseY = 0;
  const positions = Array(trailLength).fill({ x: 0, y: 0 });

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateTrail() {
    positions.unshift({ x: mouseX, y: mouseY });
    positions.pop();

    trails.forEach((trail, index) => {
      const position = positions[index];
      trail.style.left = position.x + "px";
      trail.style.top = position.y + "px";
    });

    requestAnimationFrame(animateTrail);
  }

  animateTrail();
}

// Performance optimizations
function initPerformanceOptimizations() {
  // Lazy load images
  const images = document.querySelectorAll("img[data-src]");
  if (images.length > 0) {
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
  }

  // Preload critical resources
  const criticalResources = [
    "css/modern-styles.css",
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css",
  ];

  criticalResources.forEach((resource) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.href = resource;
    link.as = "style";
    document.head.appendChild(link);
  });
}

// Page load animation
function initPageLoadAnimation() {
  window.addEventListener("load", function () {
    document.body.style.opacity = "0";
    document.body.style.transition = "opacity 0.5s ease";

    setTimeout(() => {
      document.body.style.opacity = "1";
    }, 100);

    // Remove loading overlay if exists
    const loadingOverlay = document.querySelector(".loading-overlay");
    if (loadingOverlay) {
      setTimeout(() => {
        loadingOverlay.classList.add("hidden");
      }, 1000);
    }
  });
}

// Utility function: Debounce
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Add CSS animations dynamically
const additionalStyles = `
  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  
  @keyframes bounce {
    0%, 20%, 60%, 100% { transform: translateY(0); }
    40% { transform: translateY(-5px); }
    80% { transform: translateY(-2px); }
  }
  
  @keyframes pulse {
    0% { box-shadow: 0 5px 15px hsl(var(--primary) / 0.3); }
    50% { box-shadow: 0 5px 25px hsl(var(--primary) / 0.5); }
    100% { box-shadow: 0 5px 15px hsl(var(--primary) / 0.3); }
  }
  
  .floating-card {
    animation: float 6s ease-in-out infinite;
  }
  
  .skill-tag:hover,
  .tech-tag:hover {
    animation: bounce 0.5s ease;
  }
  
  .theme-toggle {
    animation: pulse 2s infinite;
  }
  
  .loading-overlay.hidden {
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.5s ease, visibility 0.5s ease;
  }
  
  .cursor-trail {
    mix-blend-mode: difference;
  }
  
  @media (max-width: 768px) {
    .cursor-trail {
      display: none;
    }
  }
`;

// Inject additional styles
const styleSheet = document.createElement("style");
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

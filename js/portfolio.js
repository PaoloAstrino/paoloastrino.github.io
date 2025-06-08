// Paolo Astrino Portfolio - Consolidated JavaScript
// Modern Interactive Features and Animations

document.addEventListener("DOMContentLoaded", function () {
  // Initialize all features
  initNavigation();
  initScrollProgress();
  initThemeToggle();
  initScrollToTop();
  initScrollAnimations();
  initDecryptedTextEffect();

  // Add a small delay for DecryptedText examples to ensure DOM is fully ready
  setTimeout(initDecryptedTextExamples, 100);

  initFloatingCards();
  initSpotlightEffect();
  initContactForm();
  initSmoothScrolling();
  initParallaxEffects();
  initPerformanceOptimizations();
  initLegalOverlays();
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
  } // Navbar scroll effect with debouncing
  let lastScrollTop = 0;
  let isMouseNearTop = false;
  let navbarHeight = 0;
  const debouncedScroll = debounce(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const heroSection = document.querySelector(".hero");
    const experienceSection = document.querySelector("#experience");
    const heroHeight = heroSection
      ? heroSection.offsetHeight
      : window.innerHeight;
    const experienceTop = experienceSection
      ? experienceSection.offsetTop
      : heroHeight;

    // Get navbar height for calculations
    if (navbarHeight === 0) {
      navbarHeight = navbar.offsetHeight;
    }

    // Show navbar after scrolling past hero section OR when reaching the experience section
    // Always keep navbar visible from the second section onwards
    if (scrollTop < heroHeight * 0.9 && scrollTop < experienceTop - 100) {
      navbar.style.transform = "translateY(-100%)";
      return;
    }

    if (scrollTop > 100) {
      navbar.style.background = "hsla(var(--background), 0.95)";
      navbar.style.backdropFilter = "blur(20px)";
      navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.15)";
    } else {
      navbar.style.background = "hsla(var(--background), 0.9)";
      navbar.style.backdropFilter = "blur(10px)";
      navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
    } // Smooth navbar hiding based on scroll direction and position
    // Never hide navbar completely when we're at or past the experience section
    if (
      scrollTop > lastScrollTop &&
      scrollTop > 200 &&
      !isMouseNearTop &&
      scrollTop < experienceTop - 50
    ) {
      // Scrolling down - gradually hide navbar (only in hero section area)
      const scrollDiff = scrollTop - lastScrollTop;
      const hideDistance = Math.min(scrollDiff * 2, navbarHeight); // Multiply by 2 for faster hiding
      const currentTransform = parseFloat(
        navbar.style.transform.replace(/translateY\((-?\d*\.?\d*)px\)/, "$1") ||
          "0"
      );
      const newTransform = Math.max(
        -navbarHeight,
        currentTransform - hideDistance
      );
      navbar.style.transform = `translateY(${newTransform}px)`;
    } else {
      // Scrolling up, mouse near top, or in/past experience section - always show navbar
      const scrollDiff = lastScrollTop - scrollTop;
      const showDistance = Math.min(scrollDiff * 3, navbarHeight); // Multiply by 3 for faster showing
      const currentTransform = parseFloat(
        navbar.style.transform.replace(/translateY\((-?\d*\.?\d*)px\)/, "$1") ||
          "0"
      );
      const newTransform = Math.min(0, currentTransform + showDistance);
      navbar.style.transform = `translateY(${newTransform}px)`;

      // Ensure navbar is fully visible when at or past experience section
      if (scrollTop >= experienceTop - 100) {
        navbar.style.transform = "translateY(0)";
      }
    }
    lastScrollTop = scrollTop;
  }, 10); // Mouse movement detection for navbar reveal
  const handleMouseMove = debounce((e) => {
    const mouseY = e.clientY;
    const topThreshold = 80; // Show navbar when mouse is within 80px from top
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const heroSection = document.querySelector(".hero");
    const experienceSection = document.querySelector("#experience");
    const heroHeight = heroSection
      ? heroSection.offsetHeight
      : window.innerHeight;
    const experienceTop = experienceSection
      ? experienceSection.offsetTop
      : heroHeight;

    // Don't show navbar on mouse movement if still in hero section and before experience section
    if (scrollTop < heroHeight * 0.9 && scrollTop < experienceTop - 100) {
      isMouseNearTop = false;
      return;
    }

    if (mouseY <= topThreshold) {
      isMouseNearTop = true;
      navbar.style.transform = "translateY(0)";
    } else {
      isMouseNearTop = false;
      // Re-trigger scroll logic to potentially hide navbar, but not if we're at/past experience section
      if (
        scrollTop > lastScrollTop &&
        scrollTop > 200 &&
        scrollTop < experienceTop - 50
      ) {
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
  if (!themeToggle) return;

  // Check for saved theme
  const savedTheme = localStorage.getItem("theme");
  const isDarkMode =
    savedTheme === "dark" ||
    (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches);

  if (isDarkMode) {
    document.body.classList.add("dark");
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.body.classList.remove("dark");
    document.documentElement.setAttribute("data-theme", "light");
  }

  themeToggle.addEventListener("click", function () {
    const isDark = document.body.classList.toggle("dark");
    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "dark" : "light"
    );
    localStorage.setItem("theme", isDark ? "dark" : "light");

    // Removed animation effect to the switch - no more transform scaling
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

    // Removed click animation transform effects
  };

  // Event listeners
  window.addEventListener("scroll", toggleScrollButton);
  scrollToTopBtn.addEventListener("click", scrollToTop);
  // Hover effects - removed transform animations
  scrollToTopBtn.addEventListener("mouseenter", () => {
    // Removed hover transform effects
  });

  scrollToTopBtn.addEventListener("mouseleave", () => {
    // Removed hover transform effects
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

// DecryptedText - React-like implementation matching exact behavior and performance
// Usage: DecryptedText(element, options)
function DecryptedText(element, options = {}) {
  // React component defaults - matching exactly
  const defaults = {
    text: element.textContent.trim(),
    speed: 50, // Default speed from React component
    maxIterations: 6, // Default iterations from React component
    characters:
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?~`",
    className: "revealed",
    parentClassName: "all-letters",
    encryptedClassName: "encrypted",
    animateOn: "hover", // Default trigger
    revealDirection: "left", // Default reveal direction
    revealDelay: 30, // Delay between revealing each character (faster like React)
    threshold: 0.1,
    rootMargin: "0px",
    delay: 0,
    onComplete: null,
    onStart: null,
  };

  const config = { ...defaults, ...options };
  const originalText = config.text;
  let isAnimating = false;
  let hasAnimated = false;

  // Simple character randomizer - no weighted selection for React-like behavior
  function getRandomChar() {
    return config.characters[
      Math.floor(Math.random() * config.characters.length)
    ];
  }

  // Main animation function - simplified to match React behavior exactly
  function animate() {
    if (isAnimating) return;
    isAnimating = true;

    if (config.onStart) config.onStart(element);

    // Add CSS classes
    element.classList.add(config.encryptedClassName);
    if (config.parentClassName && element.parentElement) {
      element.parentElement.classList.add(config.parentClassName);
    }

    const textArray = originalText.split("");
    let workingArray = textArray.map(() => getRandomChar());

    // Get reveal order based on direction
    let revealOrder = [];
    switch (config.revealDirection) {
      case "center":
        const center = Math.floor(textArray.length / 2);
        revealOrder = [center];
        for (let i = 1; i <= center; i++) {
          if (center - i >= 0) revealOrder.push(center - i);
          if (center + i < textArray.length) revealOrder.push(center + i);
        }
        break;
      case "right":
        revealOrder = textArray.map((_, i) => textArray.length - 1 - i);
        break;
      case "random":
        revealOrder = textArray
          .map((_, i) => i)
          .sort(() => Math.random() - 0.5);
        break;
      case "left":
      default:
        revealOrder = textArray.map((_, i) => i);
        break;
    }

    let revealedCount = 0;

    // Start with scrambled text
    element.textContent = workingArray.join("");

    // Reveal characters one by one
    revealOrder.forEach((charIndex, orderIndex) => {
      const char = textArray[charIndex];
      let iterationCount = 0;

      setTimeout(() => {
        const charInterval = setInterval(() => {
          if (char === " ") {
            workingArray[charIndex] = " ";
            clearInterval(charInterval);
            revealedCount++;
            checkComplete();
            return;
          }

          if (iterationCount < config.maxIterations) {
            workingArray[charIndex] = getRandomChar();
            iterationCount++;
          } else {
            workingArray[charIndex] = char;
            clearInterval(charInterval);
            revealedCount++;
            checkComplete();
          }

          element.textContent = workingArray.join("");
        }, config.speed);
      }, orderIndex * config.revealDelay);
    });

    function checkComplete() {
      if (revealedCount === textArray.length) {
        element.classList.remove(config.encryptedClassName);
        element.classList.add(config.className);
        if (config.parentClassName && element.parentElement) {
          element.parentElement.classList.remove(config.parentClassName);
        }
        isAnimating = false;
        hasAnimated = true;
        if (config.onComplete) config.onComplete(element);
      }
    }
  }

  // Reset function
  function reset() {
    hasAnimated = false;
    isAnimating = false;
    element.classList.remove(config.className, config.encryptedClassName);
    if (config.parentClassName && element.parentElement) {
      element.parentElement.classList.remove(config.parentClassName);
    }
    element.textContent = originalText;
  }

  // Setup triggers based on animateOn option
  if (config.animateOn === "hover") {
    element.addEventListener("mouseenter", animate);
    element.addEventListener("mouseleave", reset);
  } else if (config.animateOn === "view") {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            animate();
            observer.unobserve(element);
          }
        });
      },
      { threshold: config.threshold, rootMargin: config.rootMargin }
    );
    observer.observe(element);
  } else if (config.animateOn === "load") {
    window.addEventListener("load", () => {
      animate();
    });
  }

  // Return public API
  return {
    animate,
    reset,
    isAnimating: () => isAnimating,
    hasAnimated: () => hasAnimated,
    element,
    config,
  };
}

// Utility functions for DecryptedText
function createDecryptedText(selector, options = {}) {
  const elements =
    typeof selector === "string"
      ? document.querySelectorAll(selector)
      : [selector];
  const instances = [];

  elements.forEach((element) => {
    if (element) {
      const instance = DecryptedText(element, options);
      instances.push(instance);
    }
  });

  return instances.length === 1 ? instances[0] : instances;
}

// Example usage functions using React component defaults
function createHoverDecryptText(selector, customOptions = {}) {
  return createDecryptedText(selector, {
    animateOn: "hover",
    // Using React defaults: speed: 50, maxIterations: 6
    ...customOptions,
  });
}

function createViewDecryptText(selector, customOptions = {}) {
  return createDecryptedText(selector, {
    animateOn: "view",
    revealDirection: "center",
    // Using React defaults: speed: 50, maxIterations: 6
    ...customOptions,
  });
}

function createCustomDecryptText(selector, customOptions = {}) {
  return createDecryptedText(selector, {
    animateOn: "hover",
    // Custom settings that override React defaults
    speed: 100,
    maxIterations: 20,
    characters: "ABCD1234!?",
    ...customOptions,
  });
}

// Global DecryptedText API for easy access
window.DecryptedText = {
  create: createDecryptedText,
  hover: createHoverDecryptText,
  view: createViewDecryptText,
  custom: createCustomDecryptText,
  // Direct access to the main function
  init: DecryptedText,
};

// Initialize DecryptedText for hero elements
function initDecryptedTextEffect() {
  const heroTitle = document.querySelector(".hero-title .text-gradient");
  const heroDescription = document.querySelector(".hero-description");

  if (!heroTitle) {
    console.log("DecryptedText: Hero title element not found");
    return;
  }

  // Initialize hero title with "view" animation
  const titleDecrypt = DecryptedText(heroTitle, {
    animateOn: "view",
    speed: 50,
    maxIterations: 6,
    revealDirection: "left",
    className: "revealed",
    encryptedClassName: "decrypting",
    delay: 300,
    onStart: () => console.log("DecryptedText: Starting title animation"),
    onComplete: () => console.log("DecryptedText: Title animation complete"),
  });

  // Initialize hero description with "view" animation
  if (heroDescription) {
    const descriptionDecrypt = DecryptedText(heroDescription, {
      animateOn: "view",
      speed: 50,
      maxIterations: 6,
      revealDirection: "left",
      className: "revealed",
      encryptedClassName: "decrypting",
      delay: 1500,
      onStart: () =>
        console.log("DecryptedText: Starting description animation"),
      onComplete: () =>
        console.log("DecryptedText: Description animation complete"),
    });
  }

  console.log("DecryptedText: Initialized for hero elements");
}

// Initialize DecryptedText for hero badge
function initDecryptedTextExamples() {
  console.log("DecryptedText: Initializing hero badge animation");

  // Animate the hero badge text on view with center reveal
  createViewDecryptText(".hero-badge-text", {
    revealDirection: "center",
    speed: 60,
    maxIterations: 8,
    delay: 500, // Small delay after page load
  });
}

// Floating cards animation
// Helper function to animate cards with typing - DISABLED to prevent position interference
function animateCardsWithTyping(cards, progress) {
  // Completely disable card manipulation during typing to prevent position interference
  // The cards should maintain their natural CSS animations without JavaScript interference
  return;
}

// Helper function to reset cards to normal animation - DISABLED
function resetCardsAnimation(cards) {
  // No longer needed since we're not manipulating the cards during typing
  return;
}

function initFloatingCards() {
  const floatingCards = document.querySelectorAll(".floating-card");

  floatingCards.forEach((card, index) => {
    // Add random floating motion without affecting position
    const randomDelay = Math.random() * 2000;
    const randomDuration = 4000 + Math.random() * 2000;

    card.style.animationDelay = randomDelay + "ms";
    card.style.animationDuration = randomDuration + "ms"; // Removed hover interactions that used transform animations
    card.addEventListener("mouseenter", function () {
      // Removed transform effects - no more movement on hover
      this.style.boxShadow = "none"; // Remove shadow
      this.style.zIndex = "10";
    });

    card.addEventListener("mouseleave", function () {
      // Reset to allow CSS animations to take over
      this.style.boxShadow = "none"; // Remove shadow
      this.style.zIndex = "1";
    });
  });
}

// Spotlight Effect for Cards
function initSpotlightEffect() {
  // Select all card elements that should have the spotlight effect
  const regularCardSelectors = [
    ".project-card",
    ".experience-card",
    ".education-card",
    ".certification-card",
    ".contact-form", // Add contact form to spotlight effect
  ];

  const regularCards = document.querySelectorAll(
    regularCardSelectors.join(", ")
  );
  const glassCard = document.querySelector(".dataloud-glass-card");

  // Handle regular cards with our spotlight effect
  regularCards.forEach((card) => {
    // Add spotlight-card class to enable the CSS
    card.classList.add("spotlight-card"); // Track mouse movement over the card
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Use pixel values for more reliable positioning
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`); // Set spotlight color based on card type
      let spotlightColor = "rgba(255, 255, 255, 0.25)"; // Default
      if (card.classList.contains("project-card")) {
        spotlightColor = "rgba(79, 70, 229, 0.2)"; // Primary color
      } else if (card.classList.contains("experience-card")) {
        spotlightColor = "rgba(79, 70, 229, 0.15)"; // Primary color
      } else if (card.classList.contains("education-card")) {
        spotlightColor = "rgba(16, 185, 129, 0.18)"; // Secondary color
      } else if (card.classList.contains("certification-card")) {
        spotlightColor = "rgba(79, 70, 229, 0.22)"; // Primary color
      } else if (card.classList.contains("contact-form")) {
        spotlightColor = "rgba(79, 70, 229, 0.18)"; // Primary color for contact form
      }
      card.style.setProperty("--spotlight-color", spotlightColor);
    });

    // Reset spotlight position when mouse leaves
    card.addEventListener("mouseleave", () => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mouse-x", `${rect.width / 2}px`);
      card.style.setProperty("--mouse-y", `${rect.height / 2}px`);
    });
  });

  // Handle DataLoud glass card with its existing spotlight system
  if (glassCard) {
    glassCard.addEventListener("mousemove", (e) => {
      const rect = glassCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Use pixel values for more reliable positioning
      glassCard.style.setProperty("--mouse-x", `${x}px`);
      glassCard.style.setProperty("--mouse-y", `${y}px`);

      // Keep the existing blue spotlight color for glass card
      glassCard.style.setProperty(
        "--spotlight-color",
        "rgba(59, 130, 246, 0.15)"
      );
    });

    // Reset spotlight position when mouse leaves
    glassCard.addEventListener("mouseleave", () => {
      const rect = glassCard.getBoundingClientRect();
      glassCard.style.setProperty("--mouse-x", `${rect.width / 2}px`);
      glassCard.style.setProperty("--mouse-y", `${rect.height / 2}px`);
    });
  }
}

// Contact form functionality
function initContactForm() {
  const contactForm = document.querySelector(".contact-form");
  if (!contactForm) return;

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this);
    const name = formData.get("name").trim();
    const email = formData.get("email").trim();
    const message = formData.get("message").trim();

    const submitBtn =
      this.querySelector("button[type='submit']") ||
      this.querySelector(".apple-button") ||
      this.querySelector(".send-message-btn");
    if (!submitBtn) return;

    // Validate form data
    if (!name || !email || !message) {
      showNotification("Please fill in all fields", "error");
      return;
    }

    const originalText = submitBtn.textContent;

    // Show loading state
    submitBtn.textContent = "Opening Email...";
    submitBtn.disabled = true;
    submitBtn.style.opacity = "0.7"; // Create mailto link with form data
    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(
      `Hi Paolo,\n\n${message}\n\nBest regards,\n${name}\n${email}`
    );
    const mailtoLink = `mailto:paoloastrino01@gmail.com?subject=${subject}&body=${body}`;

    // Open user's email client
    try {
      window.location.href = mailtoLink; // Show success message
      setTimeout(() => {
        submitBtn.textContent = "Email Client Opened!";
        submitBtn.style.background = "hsl(var(--accent))";
        submitBtn.style.color = "hsl(var(--accent-foreground))";
        submitBtn.style.opacity = "1";

        showNotification(
          "Your email client should open with the message pre-filled",
          "success"
        ); // Reset form and button after 3 seconds
        setTimeout(() => {
          contactForm.reset();
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          submitBtn.style.background = "";
          submitBtn.style.color = "";
        }, 3000);
      }, 500);
    } catch (error) {
      // Fallback if mailto fails
      submitBtn.textContent = "Copy Email Address";
      submitBtn.style.background = "hsl(var(--secondary))";
      submitBtn.style.color = "hsl(var(--secondary-foreground))";
      // Copy email to clipboard
      navigator.clipboard
        .writeText("paoloastrino01@gmail.com")
        .then(() => {
          showNotification("Email address copied to clipboard!", "info");
        })
        .catch(() => {
          showNotification("Please email: paoloastrino01@gmail.com", "info");
        });

      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.background = "";
        submitBtn.style.color = "";
      }, 3000);
    }
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
  // More specific selector to exclude floating cards completely
  const parallaxElements = document.querySelectorAll(
    ".hero-visual:not(.floating-cards):not(.floating-card)"
  );

  const updateParallax = debounce(() => {
    const scrolled = window.pageYOffset;
    const maxScroll = window.innerHeight; // Limit parallax to viewport height

    parallaxElements.forEach((element) => {
      // Only apply parallax if element doesn't have floating-card class
      if (
        !element.classList.contains("floating-card") &&
        !element.querySelector(".floating-card")
      ) {
        // Reduced speed and add maximum limit
        const speed = 0.05; // Even slower parallax
        const parallaxAmount = Math.min(scrolled * speed, maxScroll * 0.1); // Max 10% of viewport height
        element.style.transform = `translateY(${parallaxAmount}px)`;
      }
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

// Legal Document Overlay Functionality
function initLegalOverlays() {
  console.log("Initializing legal overlays...");

  const privacyLink = document.getElementById("privacy-link");
  const termsLink = document.getElementById("terms-link");
  const privacyOverlay = document.getElementById("privacy-overlay");
  const termsOverlay = document.getElementById("terms-overlay");
  const closePrivacy = document.getElementById("close-privacy");
  const closeTerms = document.getElementById("close-terms");

  console.log("Privacy link:", privacyLink);
  console.log("Privacy overlay:", privacyOverlay);

  // Open overlays
  if (privacyLink && privacyOverlay) {
    privacyLink.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("Privacy policy clicked, opening overlay...");
      privacyOverlay.classList.add("active");
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    });
  } else {
    console.warn("Privacy link or overlay not found");
  }

  if (termsLink && termsOverlay) {
    termsLink.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("Terms clicked, opening overlay...");
      termsOverlay.classList.add("active");
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    });
  }

  // Close overlays
  if (closePrivacy && privacyOverlay) {
    closePrivacy.addEventListener("click", () => {
      console.log("Closing privacy overlay...");
      privacyOverlay.classList.remove("active");
      document.body.style.overflow = ""; // Restore scrolling
    });
  }

  if (closeTerms && termsOverlay) {
    closeTerms.addEventListener("click", () => {
      console.log("Closing terms overlay...");
      termsOverlay.classList.remove("active");
      document.body.style.overflow = ""; // Restore scrolling
    });
  }

  // Close overlays when clicking outside
  [privacyOverlay, termsOverlay].forEach((overlay) => {
    if (overlay) {
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
          console.log("Clicked outside overlay, closing...");
          overlay.classList.remove("active");
          document.body.style.overflow = ""; // Restore scrolling
        }
      });
    }
  });

  // Close overlays with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      console.log("Escape key pressed, closing overlays...");
      [privacyOverlay, termsOverlay].forEach((overlay) => {
        if (overlay && overlay.classList.contains("active")) {
          overlay.classList.remove("active");
          document.body.style.overflow = ""; // Restore scrolling
        }
      });
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

// Notification system for user feedback
function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll(".notification");
  existingNotifications.forEach((notif) => notif.remove());

  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas ${getNotificationIcon(type)}"></i>
      <span>${message}</span>
    </div>
  `;

  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${getNotificationColor(type)};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    z-index: 10000;
    transform: translateX(400px);
    transition: all 0.3s ease;
    max-width: 350px;
    font-size: 0.9rem;
  `;

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Auto remove after 5 seconds
  setTimeout(() => {
    notification.style.transform = "translateX(400px)";
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 300);
  }, 5000);
}

function getNotificationIcon(type) {
  switch (type) {
    case "success":
      return "fa-check-circle";
    case "error":
      return "fa-exclamation-circle";
    case "warning":
      return "fa-exclamation-triangle";
    case "info":
    default:
      return "fa-info-circle";
  }
}

function getNotificationColor(type) {
  switch (type) {
    case "success":
      return "#10b981";
    case "error":
      return "#ef4444";
    case "warning":
      return "#f59e0b";
    case "info":
    default:
      return "#3b82f6";
  }
}

// Add CSS animations dynamically
const additionalStyles = `  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }
  
  /* Removed float keyframe animation - no more movement effects */
  
  .floating-card {
    /* Removed animation: float 6s ease-in-out infinite; */
    will-change: auto; /* Reset will-change */
    transform-origin: center;
  }
  
  /* Ensure floating cards container doesn't get parallax */
  .floating-cards {
    transform: none !important;
  }
    .skill-tag:hover,
  .tech-tag:hover {
    /* Removed bounce animation: bounce 0.5s ease; */
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

// ===== PRIVACY COMMITMENT =====
// Paolo Astrino Portfolio - Privacy-First Design
//
// This website is built with privacy as a core principle:
// • No tracking scripts or analytics
// • No cookies for tracking purposes
// • No data collection or storage
// • No third-party integrations that compromise privacy
// • Contact form data is handled locally and temporarily
//
// Your privacy matters. This portfolio respects it completely.
//
// Last updated: June 2025
// ================================

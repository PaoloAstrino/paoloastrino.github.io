// Paolo Astrino Portfolio - Consolidated JavaScript
// Modern Interactive Features and Animations

document.addEventListener("DOMContentLoaded", function () {
  // Initialize all features
  initNavigation();
  initScrollProgress();
  updateThemeToggle(); // Use privacy-compliant theme toggle
  initScrollToTop();
  initScrollAnimations();
  initTypingEffect();
  initFloatingCards();
  initContactForm();
  initSmoothScrolling();
  initParallaxEffects();
  initPerformanceOptimizations();
  initPrivacyFeatures(); // Initialize privacy features

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
  console.log(
    "%c🔒 Privacy-compliant with cookie consent and data protection",
    "color: #059669; font-size: 12px;"
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
  if (!themeToggle) return;

  // Check for saved theme
  const savedTheme = localStorage.getItem("theme");
  if (
    savedTheme === "dark" ||
    (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
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

// Privacy and Cookie Management
function initPrivacyFeatures() {
  // Initialize cookie consent
  initCookieConsent();

  // Initialize privacy modal
  initPrivacyModal();

  // Initialize terms modal
  initTermsModal();

  // Initialize footer privacy links
  initFooterPrivacyLinks();
}

// Cookie Consent Banner
function initCookieConsent() {
  const cookieConsent = document.getElementById("cookieConsent");
  const acceptBtn = document.getElementById("acceptCookies");
  const declineBtn = document.getElementById("declineCookies");
  const learnMoreBtn = document.getElementById("learnMoreCookies");

  if (!cookieConsent) return;

  // Check if user has already made a choice
  const cookieChoice = localStorage.getItem("cookieConsent");

  if (!cookieChoice) {
    // Show banner after a short delay for better UX
    setTimeout(() => {
      cookieConsent.classList.add("show");
    }, 2000);
  }

  // Accept cookies
  if (acceptBtn) {
    acceptBtn.addEventListener("click", () => {
      localStorage.setItem("cookieConsent", "accepted");
      localStorage.setItem("cookieConsentDate", new Date().toISOString());
      hideCookieBanner();
      // Show thank you message briefly
      showTemporaryMessage(
        "Thank you! Only your theme preference will be saved. Zero tracking, zero data collection.",
        "success"
      );
    });
  }

  // Decline cookies
  if (declineBtn) {
    declineBtn.addEventListener("click", () => {
      localStorage.setItem("cookieConsent", "declined");
      localStorage.setItem("cookieConsentDate", new Date().toISOString());
      // Clear any existing theme preference since user declined cookies
      localStorage.removeItem("theme");

      hideCookieBanner();
      showTemporaryMessage(
        "Perfect! No cookies saved. Your privacy is fully protected. Theme changes won't be remembered between visits.",
        "info"
      );
    });
  }

  // Learn more - open privacy modal
  if (learnMoreBtn) {
    learnMoreBtn.addEventListener("click", () => {
      hideCookieBanner();
      showPrivacyModal();
    });
  }

  function hideCookieBanner() {
    cookieConsent.classList.remove("show");
  }
}

// Privacy Policy Modal
function initPrivacyModal() {
  const privacyModal = document.getElementById("privacyModal");
  const closeBtn = document.getElementById("closePrivacyModal");
  const acceptBtn = document.getElementById("acceptPrivacyPolicy");
  const privacyLinks = document.querySelectorAll(
    "#privacy-policy-link, #footerPrivacyLink"
  );

  if (!privacyModal) return;

  // Open modal when privacy links are clicked
  privacyLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      showPrivacyModal();
    });
  });

  // Close modal
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      hidePrivacyModal();
    });
  }

  if (acceptBtn) {
    acceptBtn.addEventListener("click", () => {
      hidePrivacyModal();
      showTemporaryMessage(
        "Thank you for reading our Privacy Policy!",
        "success"
      );
    });
  }

  // Close modal when clicking outside
  privacyModal.addEventListener("click", (e) => {
    if (e.target === privacyModal) {
      hidePrivacyModal();
    }
  });

  // Close modal with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && privacyModal.classList.contains("show")) {
      hidePrivacyModal();
    }
  });

  function showPrivacyModal() {
    privacyModal.classList.add("show");
    document.body.style.overflow = "hidden";
  }

  function hidePrivacyModal() {
    privacyModal.classList.remove("show");
    document.body.style.overflow = "";
  }
}

// Terms of Service Modal
function initTermsModal() {
  const termsModal = document.getElementById("termsModal");
  const closeBtn = document.getElementById("closeTermsModal");
  const acceptBtn = document.getElementById("acceptTerms");
  const termsLinks = document.querySelectorAll("#footerTermsLink");

  if (!termsModal) return;

  // Open modal when terms links are clicked
  termsLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      showTermsModal();
    });
  });

  // Close modal
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      hideTermsModal();
    });
  }

  if (acceptBtn) {
    acceptBtn.addEventListener("click", () => {
      hideTermsModal();
      showTemporaryMessage(
        "Thank you for reading our Terms of Service!",
        "success"
      );
    });
  }

  // Close modal when clicking outside
  termsModal.addEventListener("click", (e) => {
    if (e.target === termsModal) {
      hideTermsModal();
    }
  });

  // Close modal with Escape key (already handled in privacy modal function)

  function showTermsModal() {
    termsModal.classList.add("show");
    document.body.style.overflow = "hidden";
  }

  function hideTermsModal() {
    termsModal.classList.remove("show");
    document.body.style.overflow = "";
  }
}

// Footer Privacy Links
function initFooterPrivacyLinks() {
  const cookiePreferencesLink = document.getElementById(
    "footerCookiePreferences"
  );

  if (cookiePreferencesLink) {
    cookiePreferencesLink.addEventListener("click", (e) => {
      e.preventDefault();
      showCookiePreferences();
    });
  }
}

// Show cookie preferences (re-show cookie banner)
function showCookiePreferences() {
  const cookieConsent = document.getElementById("cookieConsent");
  if (cookieConsent) {
    // Clear existing choice temporarily
    const existingChoice = localStorage.getItem("cookieConsent");

    // Show banner
    cookieConsent.classList.add("show");
    // Add a note that this is updating preferences
    const cookieText = cookieConsent.querySelector(".cookie-text span");
    const originalText = cookieText.textContent;
    cookieText.textContent =
      "Update your privacy preferences. Current choice: " +
      (existingChoice === "accepted"
        ? "Cookies enabled (theme preference saved)"
        : "Cookies disabled (maximum privacy)") +
      ". You can change this below.";

    // Restore original text after user makes a choice
    const restoreText = () => {
      setTimeout(() => {
        cookieText.textContent = originalText;
      }, 500);
    };

    // Add event listeners to restore text
    const acceptBtn = document.getElementById("acceptCookies");
    const declineBtn = document.getElementById("declineCookies");

    if (acceptBtn) {
      acceptBtn.addEventListener("click", restoreText, { once: true });
    }
    if (declineBtn) {
      declineBtn.addEventListener("click", restoreText, { once: true });
    }
  }
}

// Utility function to show temporary messages
function showTemporaryMessage(message, type = "info") {
  // Create message element
  const messageEl = document.createElement("div");
  messageEl.className = `temporary-message ${type}`;
  messageEl.innerHTML = `
    <div class="message-content">
      <i class="fas ${
        type === "success"
          ? "fa-check-circle"
          : type === "info"
          ? "fa-info-circle"
          : "fa-exclamation-triangle"
      }"></i>
      <span>${message}</span>
    </div>
  `;

  // Add styles if not already added
  if (!document.querySelector("#temporary-message-styles")) {
    const styles = document.createElement("style");
    styles.id = "temporary-message-styles";
    styles.textContent = `
      .temporary-message {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        color: white;
        font-weight: 500;
        z-index: 3000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
      }
      
      .temporary-message.success {
        background: #10b981;
      }
      
      .temporary-message.info {
        background: #3b82f6;
      }
      
      .temporary-message.warning {
        background: #f59e0b;
      }
      
      .message-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      
      .temporary-message.show {
        transform: translateX(0);
      }
      
      @media (max-width: 480px) {
        .temporary-message {
          right: 10px;
          left: 10px;
          max-width: none;
          transform: translateY(-100%);
        }
        
        .temporary-message.show {
          transform: translateY(0);
        }
      }
    `;
    document.head.appendChild(styles);
  }

  // Add to page
  document.body.appendChild(messageEl);

  // Show message
  requestAnimationFrame(() => {
    messageEl.classList.add("show");
  });

  // Remove message after delay
  setTimeout(() => {
    messageEl.classList.remove("show");
    setTimeout(() => {
      if (messageEl.parentNode) {
        messageEl.parentNode.removeChild(messageEl);
      }
    }, 300);
  }, 4000);
}

// Enhanced theme toggle with privacy compliance
function updateThemeToggle() {
  const originalThemeToggle = initThemeToggle;

  // Override the theme toggle to respect cookie consent
  window.initThemeToggle = function () {
    const themeToggle = document.getElementById("theme-toggle");
    if (!themeToggle) return;

    // Get saved theme preference only if cookies are accepted
    const cookieConsent = localStorage.getItem("cookieConsent");
    let savedTheme = "dark"; // Default theme

    if (cookieConsent === "accepted") {
      savedTheme = localStorage.getItem("theme") || "dark";
    }

    // Set initial theme
    document.documentElement.setAttribute("data-theme", savedTheme);
    document.body.classList.toggle("light", savedTheme === "light");

    // Theme toggle event
    themeToggle.addEventListener("click", function () {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";

      document.documentElement.setAttribute("data-theme", newTheme);
      document.body.classList.toggle("light", newTheme === "light");

      // Save theme preference only if cookies are accepted
      const cookieConsent = localStorage.getItem("cookieConsent");
      if (cookieConsent === "accepted") {
        localStorage.setItem("theme", newTheme);
      } else if (cookieConsent === "declined") {
        // Show message that theme won't be saved
        showTemporaryMessage(
          "Theme changed! Enable cookies to save this preference, or it will reset when you leave the page.",
          "info"
        );
      }
    });
  };

  // Call the updated function
  initThemeToggle();
}

// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Close mobile menu when clicking on a link
  document.querySelectorAll(".nav-link").forEach((n) =>
    n.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    })
  );
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const offsetTop = target.offsetTop - 70; // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// Navbar background change on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)";
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.15)";
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)";
    navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
  }
});

// Form submission handler
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);

    // Basic form validation
    if (!data.name || !data.email || !data.subject || !data.message) {
      alert("Please fill in all fields.");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Show loading state
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    // Simulate form submission (replace with actual form handling)
    setTimeout(() => {
      alert("Thank you for your message! I'll get back to you soon.");
      this.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 1000);
  });
}

// Add animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
      entry.target.classList.add("animate");
    }
  });
}, observerOptions);

// Observe all sections for animation
document.querySelectorAll("section").forEach((section) => {
  section.style.opacity = "0";
  section.style.transform = "translateY(20px)";
  section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(section);
});

// Typing animation for hero section
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = "";

  function typing() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    }
  }

  typing();
}

// Initialize typing animation when page loads
window.addEventListener("load", () => {
  const heroTitle = document.querySelector(".hero-content h1");
  if (heroTitle) {
    const originalText = heroTitle.innerHTML;
    typeWriter(heroTitle, originalText, 80);
  }
});

// Project card hover effects
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0)";
  });
});

// Skills animation on scroll
const skillItems = document.querySelectorAll(".skill-item");
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0) scale(1)";
      }, index * 50);
    }
  });
}, observerOptions);

skillItems.forEach((item) => {
  item.style.opacity = "0";
  item.style.transform = "translateY(20px) scale(0.8)";
  item.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  skillObserver.observe(item);
});

// Stats counter animation
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);

  function updateCounter() {
    start += increment;
    if (start < target) {
      element.textContent = Math.floor(start) + "+";
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target + "+";
    }
  }

  updateCounter();
}

// Observe stats for counter animation
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const statNumber = entry.target.querySelector("h3");
      const targetValue = parseInt(statNumber.textContent);
      animateCounter(statNumber, targetValue);
      statsObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll(".stat").forEach((stat) => {
  statsObserver.observe(stat);
});

// Add parallax effect to hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".hero");
  if (hero) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// Add smooth reveal animation for project cards
const projectCards = document.querySelectorAll(".project-card");
const projectObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }, index * 200);
    }
  });
}, observerOptions);

projectCards.forEach((card) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(30px)";
  card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  projectObserver.observe(card);
});

// Add loading screen (optional)
window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");
  if (loader) {
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.style.display = "none";
    }, 500);
  }
});

// Add scroll to top button
function createScrollToTopButton() {
  const button = document.createElement("button");
  button.innerHTML = '<i class="fas fa-arrow-up"></i>';
  button.className = "scroll-to-top";
  button.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #3498db;
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        font-size: 16px;
    `;

  document.body.appendChild(button);

  // Show/hide button based on scroll position
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      button.style.opacity = "1";
      button.style.visibility = "visible";
    } else {
      button.style.opacity = "0";
      button.style.visibility = "hidden";
    }
  });

  // Scroll to top when clicked
  button.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Add hover effect
  button.addEventListener("mouseenter", () => {
    button.style.transform = "scale(1.1)";
    button.style.background = "#2980b9";
  });

  button.addEventListener("mouseleave", () => {
    button.style.transform = "scale(1)";
    button.style.background = "#3498db";
  });
}

// Initialize scroll to top button
createScrollToTopButton();

// Add theme toggle functionality (optional)
function createThemeToggle() {
  const toggle = document.createElement("button");
  toggle.innerHTML = '<i class="fas fa-moon"></i>';
  toggle.className = "theme-toggle";
  toggle.style.cssText = `
        position: fixed;
        top: 50%;
        right: 20px;
        background: #3498db;
        color: white;
        border: none;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        cursor: pointer;
        transition: all 0.3s ease;
        z-index: 999;
        font-size: 14px;
    `;

  document.body.appendChild(toggle);

  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    const isDark = document.body.classList.contains("dark-theme");
    toggle.innerHTML = isDark
      ? '<i class="fas fa-sun"></i>'
      : '<i class="fas fa-moon"></i>';
  });
}

// Uncomment to enable theme toggle
// createThemeToggle();

// Performance optimization: Debounce scroll events
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

// Replace direct scroll listeners with debounced versions for better performance
const debouncedScroll = debounce(() => {
  // Navbar background change
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)";
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.15)";
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)";
    navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
  }
}, 10);

window.addEventListener("scroll", debouncedScroll);

console.log("Portfolio website loaded successfully! 🚀");

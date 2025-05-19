// DOM Elements
const themeToggle = document.getElementById("theme-toggle")
const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
const mobileMenu = document.querySelector(".mobile-menu")
const contactForm = document.getElementById("contactForm")
const navLinks = document.querySelectorAll(".nav-links a, .mobile-menu a")

// Theme Toggle Functionality
function toggleTheme() {
  document.body.classList.toggle("dark-mode")

  // If dark-mode is removed, ensure light-mode is added
  if (!document.body.classList.contains("dark-mode")) {
    document.body.classList.add("light-mode")
  } else {
    document.body.classList.remove("light-mode")
  }

  localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light")
}

// Check for saved theme preference
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode")
    document.body.classList.remove("light-mode")
  } else {
    document.body.classList.add("light-mode")
    document.body.classList.remove("dark-mode")
  }
})

// Mobile Menu Toggle
function toggleMobileMenu() {
  mobileMenu.classList.toggle("active")

  // Animate hamburger to X
  const spans = mobileMenuBtn.querySelectorAll("span")
  if (mobileMenu.classList.contains("active")) {
    spans[0].style.transform = "rotate(45deg) translate(5px, 5px)"
    spans[1].style.opacity = "0"
    spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)"
  } else {
    spans[0].style.transform = "none"
    spans[1].style.opacity = "1"
    spans[2].style.transform = "none"
  }
}

// Close mobile menu when clicking a link
function closeMobileMenu() {
  if (mobileMenu.classList.contains("active")) {
    toggleMobileMenu()
  }
}

// Form Validation
function validateForm(e) {
  e.preventDefault()

  let isValid = true
  const nameInput = document.getElementById("name")
  const emailInput = document.getElementById("email")
  const messageInput = document.getElementById("message")

  // Reset error messages
  document.querySelectorAll(".error-message").forEach((el) => {
    el.style.display = "none"
  })

  // Validate name
  if (nameInput.value.trim() === "") {
    showError(nameInput, "Name is required")
    isValid = false
  }

  // Validate email
  if (emailInput.value.trim() === "") {
    showError(emailInput, "Email is required")
    isValid = false
  } else if (!isValidEmail(emailInput.value)) {
    showError(emailInput, "Please enter a valid email")
    isValid = false
  }

  // Validate message
  if (messageInput.value.trim() === "") {
    showError(messageInput, "Message is required")
    isValid = false
  }

  if (isValid) {
    // In a real application, you would send the form data to a server
    // For this example, we'll just show a success message
    contactForm.innerHTML = `
      <div class="success-message">
        <h3>Thank you for your message!</h3>
        <p>I'll get back to you as soon as possible.</p>
      </div>
    `
  }
}

function showError(input, message) {
  const errorElement = input.nextElementSibling
  errorElement.textContent = message
  errorElement.style.display = "block"
  input.style.borderColor = "var(--error-color)"
}

function isValidEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

// Smooth scrolling for navigation links
function smoothScroll(e) {
  e.preventDefault()
  const targetId = this.getAttribute("href")
  const targetPosition = document.querySelector(targetId).offsetTop - 80 // Adjust for navbar height
  window.scrollTo({
    top: targetPosition,
    behavior: "smooth",
  })

  closeMobileMenu()
}

// Event Listeners
themeToggle.addEventListener("click", toggleTheme)
mobileMenuBtn.addEventListener("click", toggleMobileMenu)
contactForm.addEventListener("submit", validateForm)
navLinks.forEach((link) => link.addEventListener("click", smoothScroll))

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 50) {
    navbar.style.height = "70px"
    navbar.style.boxShadow = "0 5px 15px var(--shadow-color)"
  } else {
    navbar.style.height = "80px"
    navbar.style.boxShadow = "0 2px 10px var(--shadow-color)"
  }
})

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (mobileMenu.classList.contains("active") && !mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
    toggleMobileMenu()
  }
})

// Initialize AOS (Animate On Scroll) if available
let AOS // Declare AOS
if (typeof AOS !== "undefined") {
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
  })
}

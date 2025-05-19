// Translation functionality
document.addEventListener("DOMContentLoaded", () => {
    // Check for saved language preference
    const savedLanguage = localStorage.getItem("language") || "en"
    setLanguage(savedLanguage)

    // Language toggle button
    const languageToggle = document.getElementById("language-toggle")
    languageToggle.addEventListener("click", toggleLanguage)
})

function toggleLanguage() {
    const currentLang = localStorage.getItem("language") || "en"
    const newLang = currentLang === "en" ? "id" : "en"
    setLanguage(newLang)
}

function setLanguage(lang) {
    localStorage.setItem("language", lang)

    // Update the language toggle button text
    const langText = document.querySelector(".lang-text")
    langText.textContent = lang.toUpperCase()

    // Get all elements with data-en and data-id attributes
    const elements = document.querySelectorAll("[data-en], [data-id]")

    elements.forEach((element) => {
        // Check if the element has the attribute for the current language
        if (element.hasAttribute(`data-${lang}`)) {
            // Special handling for elements with HTML content
            if (element.innerHTML.includes('<span class="highlight">')) {
                element.innerHTML = element.getAttribute(`data-${lang}`)
            } else {
                element.textContent = element.getAttribute(`data-${lang}`)
            }
        }
    })

    // Update HTML lang attribute
    document.documentElement.lang = lang

    // Update error messages for form validation
    updateFormValidationMessages(lang)
}

function updateFormValidationMessages(lang) {
    // This function can be expanded to update form validation messages
    // based on the selected language
    const errorMessages = {
        en: {
            required: "This field is required",
            email: "Please enter a valid email address",
            success: "Thank you for your message! I'll get back to you soon.",
        },
        id: {
            required: "Bidang ini wajib diisi",
            email: "Silakan masukkan alamat email yang valid",
            success: "Terima kasih atas pesan Anda! Saya akan segera menghubungi Anda.",
        },
    }

    // Store messages in a global variable for access by form validation
    window.validationMessages = errorMessages[lang]
}

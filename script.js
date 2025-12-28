/* =========================
   REVEAL ON SCROLL
========================= */
const revealSections = document.querySelectorAll(".reveal");
const aboutCards = document.querySelectorAll(".about-card");

function revealOnScroll() {
  const windowHeight = window.innerHeight;

  revealSections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;

    if (sectionTop < windowHeight - 100) {
      section.classList.add("active");

      aboutCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.15}s`;
        card.classList.add("active");
      });
    }
  });
}

// Debounce scroll for performance
let scrollTimeout;
window.addEventListener("scroll", () => {
  if (!scrollTimeout) {
    scrollTimeout = setTimeout(() => {
      revealOnScroll();
      scrollTimeout = null;
    }, 50);
  }
});
revealOnScroll();

/* =========================
   TYPING EFFECT
========================= */
const typingTexts = document.querySelectorAll(".typing-text");

typingTexts.forEach(p => {
  const text = p.dataset.text;
  if (!text) return;

  let i = 0;
  p.textContent = ""; // reset text

  const interval = setInterval(() => {
    p.textContent += text.charAt(i);
    i++;
    if (i >= text.length) clearInterval(interval);
  }, 27); // adjust speed here
});

/* =========================
   QUOTES SLIDESHOW
========================= */
const quotes = [
  { text: "The only limit to our realization of tomorrow is our doubts of today.", author: "Franklin D. Roosevelt" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
  { text: "Education is the most powerful weapon which you can use to change the world.", author: "Nelson Mandela" },
  { text: "Stay hungry, stay foolish.", author: "Steve Jobs" },
  { text: "If you can dream it, you can do it.", author: "Walt Disney" }
];

let quoteIndex = 0;
const quoteText = document.querySelector(".quote-text");
const quoteAuthor = document.querySelector(".quote-author");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

function updateQuote() {
  if (!quoteText || !quoteAuthor) return;
  quoteText.textContent = `“${quotes[quoteIndex].text}”`;
  quoteAuthor.textContent = `– ${quotes[quoteIndex].author}`;
}

// Auto-slide feature (optional)
let autoSlide = setInterval(() => {
  quoteIndex = (quoteIndex + 1) % quotes.length;
  updateQuote();
}, 8000); // change quote every 8 seconds

if (prevBtn && nextBtn) {
  prevBtn.addEventListener("click", () => {
    quoteIndex = (quoteIndex - 1 + quotes.length) % quotes.length;
    updateQuote();
    clearInterval(autoSlide);
  });

  nextBtn.addEventListener("click", () => {
    quoteIndex = (quoteIndex + 1) % quotes.length;
    updateQuote();
    clearInterval(autoSlide);
  });

  updateQuote();
}

/* =========================
   FADE-IN ACADEMICS ON LOAD
========================= */
window.addEventListener('DOMContentLoaded', () => {
  const academicsSection = document.querySelector('.academics');
  if (academicsSection) {
    setTimeout(() => {
      academicsSection.classList.add('active'); // fade-in animation
    }, 100);
  }
});

/* =========================
   ACADEMICS DROPDOWN & REPORT CARDS
========================= */
const yearSelect = document.getElementById("yearSelect");
const cards = document.querySelectorAll(".report-card");

// Hide all cards initially
cards.forEach(card => {
  card.style.display = "none";
  card.style.opacity = "0";
  card.style.transform = "translateY(25px)";
});

if (yearSelect) {
  yearSelect.addEventListener("change", () => {
    const selectedYear = yearSelect.value;

    // Hide all
    cards.forEach(card => {
      card.style.display = "none";
      card.style.opacity = "0";
      card.style.transform = "translateY(25px)";
    });

    // Show selected
    const selectedCard = document.getElementById(selectedYear);
    if (selectedCard) {
      selectedCard.style.display = "flex"; // allows side-by-side layout if needed
      setTimeout(() => {
        selectedCard.style.opacity = "1";
        selectedCard.style.transform = "translateY(0)";
      }, 50);
      selectedCard.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
}

/* =========================
   OPTIONAL: PROJECT CARDS FADE IN
========================= */
const projectCards = document.querySelectorAll(".project-card");
function fadeInProjects() {
  const windowHeight = window.innerHeight;
  projectCards.forEach((card, index) => {
    const top = card.getBoundingClientRect().top;
    if (top < windowHeight - 100) {
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
      card.style.transition = `opacity 0.6s ease ${index*0.1}s, transform 0.6s ease ${index*0.1}s`;
    }
  });
}
window.addEventListener("scroll", fadeInProjects);
fadeInProjects();

/* =========================
   CONTACT FORM EMAIL VALIDATION & POPUP CONFIRMATION
========================= */
const contactForm = document.getElementById("contactForm");
const confirmationPopup = document.getElementById("confirmationPopup");
const closePopupBtn = document.getElementById("closePopup");

if (contactForm) {
  contactForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const firstName = contactForm.firstName.value.trim();
    const lastName = contactForm.lastName.value.trim();
    const email = contactForm.email.value.trim();
    const subject = contactForm.subject.value.trim();
    const message = contactForm.message.value.trim();

    // Email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // OPTIONAL: send email via backend or EmailJS

    // Show popup confirmation
    if (confirmationPopup) {
      confirmationPopup.classList.add("active");
    }

    // Reset form
    contactForm.reset();
  });
}

// Close popup
if (closePopupBtn) {
  closePopupBtn.addEventListener("click", function() {
    confirmationPopup.classList.remove("active");
  });
}
const popup = document.getElementById("confirmationPopup");
const closePopup = document.getElementById("closePopup");

if (contactForm && popup) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = contactForm.email.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    popup.classList.add("active");
    contactForm.reset();
  });
}

if (closePopup && popup) {
  closePopup.addEventListener("click", () => {
    popup.classList.remove("active");
  });
}

const contactForm = document.getElementById('contactForm');
const confirmationPopup = document.getElementById('confirmationPopup');
const closePopup = document.getElementById('closePopup');

contactForm.addEventListener('submit', function(e) {
  e.preventDefault();

  // Collect form data safely
  const formData = {
    firstName: this.firstName.value.trim(),
    lastName: this.lastName.value.trim(),
    email: this.email.value.trim(),
    subject: this.subject.value.trim(),
    message: this.message.value.trim()
  };

  // Disable submit button while sending
  const submitBtn = this.querySelector('.submit-btn');
  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";

  emailjs.send("service_fkjzmlq", "template_52z4b6i", formData)
    .then((response) => {
      console.log("Email sent successfully!", response);
      confirmationPopup.classList.add('active');
      contactForm.reset();
      submitBtn.disabled = false;
      submitBtn.textContent = "Send Message";
    })
    .catch((error) => {
      console.error("EmailJS error:", error);
      alert("Oops! Something went wrong. Check console for details.");
      submitBtn.disabled = false;
      submitBtn.textContent = "Send Message";
    });
});

// Close popup
closePopup.addEventListener('click', () => {
  confirmationPopup.classList.remove('active');
});








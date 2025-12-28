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
  p.textContent = "";

  const interval = setInterval(() => {
    p.textContent += text.charAt(i);
    i++;
    if (i >= text.length) clearInterval(interval);
  }, 27);
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

setInterval(() => {
  quoteIndex = (quoteIndex + 1) % quotes.length;
  updateQuote();
}, 8000);

if (prevBtn && nextBtn) {
  prevBtn.addEventListener("click", () => {
    quoteIndex = (quoteIndex - 1 + quotes.length) % quotes.length;
    updateQuote();
  });

  nextBtn.addEventListener("click", () => {
    quoteIndex = (quoteIndex + 1) % quotes.length;
    updateQuote();
  });

  updateQuote();
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
      card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;

      /* ✅ FIX: release control back to CSS hover */
      setTimeout(() => {
        card.style.opacity = "";
        card.style.transform = "";
      }, 700);
    }
  });
}

window.addEventListener("scroll", fadeInProjects);
fadeInProjects();

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






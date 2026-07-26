/* ==========================================================================
   NABIN AYER PORTFOLIO - JAVASCRIPT LOGIC
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {
  // 1. TOP SCROLL PROGRESS BAR
  const progressBar = document.getElementById("scroll-progress");
  window.addEventListener("scroll", function () {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    if (progressBar) {
      progressBar.style.width = scrolled + "%";
    }
    
    // Navbar shadow on scroll
    const navbar = document.getElementById("navbar");
    if (navbar) {
      if (window.scrollY > 30) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    }
  });

  // 2. HERO TYPEWRITER EFFECT
  const typingText = document.getElementById("typing-text");
  if (typingText) {
    const phrases = [
      "Graphic Design",
      "Logo & Branding",
      "Figma Web UI Layouts",
      "Social Media Content",
      "Digital Marketing Ads"
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typeSpeed = 100;
    const deleteSpeed = 50;
    const delayBetweenPhrases = 2000;

    function type() {
      const currentPhrase = phrases[phraseIndex];
      if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        setTimeout(type, delayBetweenPhrases);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(type, 500);
      } else {
        setTimeout(type, isDeleting ? deleteSpeed : typeSpeed);
      }
    }

    type();
  }

  // 3. PROJECT FILTER TABS
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".small-project-card");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", function () {
      // Remove active class from all buttons
      filterBtns.forEach(b => b.classList.remove("active"));
      this.classList.add("active");

      const filterValue = this.getAttribute("data-filter");

      projectCards.forEach(card => {
        const category = card.getAttribute("data-category");
        if (filterValue === "all" || category === filterValue) {
          card.style.display = "flex";
          card.style.animation = "modalSlideUp 0.4s ease-out";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // 4. INTERSECTION OBSERVER FOR SCROLL REVEAL
  const revealElements = document.querySelectorAll(".reveal-element");
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -40px 0px"
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  // 5. MOBILE MENU TOGGLE
  const mobileToggle = document.getElementById("mobile-toggle");
  const navlinks = document.getElementById("navlinks");
  if (mobileToggle && navlinks) {
    mobileToggle.addEventListener("click", function () {
      navlinks.classList.toggle("active");
    });

    // Close menu when link is clicked
    document.querySelectorAll(".navlink").forEach(link => {
      link.addEventListener("click", () => {
        navlinks.classList.remove("active");
      });
    });
  }
});

// 6. COPY TO CLIPBOARD HELPER
function copyText(text, btnElement) {
  navigator.clipboard.writeText(text).then(() => {
    const originalHTML = btnElement.innerHTML;
    btnElement.innerHTML = '<i class="fa-solid fa-check" style="color:#10b981;"></i>';
    setTimeout(() => {
      btnElement.innerHTML = originalHTML;
    }, 2000);
  }).catch(err => {
    console.error("Copy failed", err);
  });
}

// 7. PROJECT DETAILS MODAL DATA & HANDLERS
const projectModalData = {
  "logo-modal": {
    title: "Brand Logo Concepts & Identities",
    badge: "Graphic Design Project",
    desc: "A series of custom logo design concepts created for diverse client niches including tech startups, e-commerce, and personal brands.",
    bullets: [
      "Explored vector geometry, visual minimalism, and brand color harmony.",
      "Delivered scalable logo formats (SVG, PNG, PDF, Brand Color Guides).",
      "Utilized Canva and Figma for prototyping and client presentations.",
      "Focused on memorable typography and icon symbolic design."
    ]
  },
  "social-modal": {
    title: "Social Media Marketing Templates",
    badge: "Social Media & Advertising",
    desc: "High-converting social media post templates, banners, and promotional graphics designed for client marketing campaigns.",
    bullets: [
      "Created reusable layout templates for Instagram, Facebook, and LinkedIn.",
      "Applied visual hierarchy and high-contrast color choices to maximize CTR.",
      "Integrated AI ideation tools (ChatGPT, Claude) for copy ideas and graphic themes.",
      "Optimized assets for rapid social media content scheduling."
    ]
  },
  "poster-modal": {
    title: "Promotional Poster Designs",
    badge: "Marketing & Print Graphic",
    desc: "Eye-catching posters designed for events, product promotions, and online brand announcements.",
    bullets: [
      "Designed using dynamic typographic compositions and graphic elements.",
      "Ensured strong readability from both digital screens and print displays.",
      "Delivered clean, professional layouts adhering to client branding rules."
    ]
  },
  "webui-modal": {
    title: "Web UI Layouts & Figma Wireframes",
    badge: "Figma UI/UX Project",
    desc: "Modern and clean web UI interface designs prototyped in Figma for responsive web applications.",
    bullets: [
      "Designed desktop and mobile wireframe layouts with intuitive navigation.",
      "Established typography scales, color palettes, and component states.",
      "Focused on user experience (UX) best practices and visual clarity."
    ]
  },
  "portfolio-modal": {
    title: "Personal Portfolio Web App",
    badge: "Front-End Web Development",
    desc: "Custom personal portfolio website showcasing graphic design & web UI projects with an executive light grey theme and light royal brown education highlight.",
    bullets: [
      "Built with HTML5, CSS3, and modern JavaScript (ES6+).",
      "Features top progress indicator, filterable project tabs, and scroll reveal animations.",
      "Optimized for smooth mobile responsiveness and fast load times."
    ]
  }
};

function openProjectModal(key) {
  const backdrop = document.getElementById("modal-backdrop");
  const content = document.getElementById("modal-body-content");
  const data = projectModalData[key];

  if (backdrop && content && data) {
    const bulletsHTML = data.bullets.map(b => `<li><i class="fa-solid fa-check" style="color:#2563eb; margin-right:6px;"></i> ${b}</li>`).join("");
    
    content.innerHTML = `
      <div class="card-badge" style="margin-bottom:0.8rem;"><i class="fa-solid fa-star"></i> ${data.badge}</div>
      <h3 class="modal-title">${data.title}</h3>
      <p class="modal-desc">${data.desc}</p>
      <h4 style="font-size:1.05rem; margin-bottom:0.6rem; color:#1e293b;">Key Highlights & Deliverables:</h4>
      <ul class="modal-list" style="list-style:none; padding:0;">
        ${bulletsHTML}
      </ul>
      <div style="margin-top:1.5rem; text-align:right;">
        <button class="btn-primary" onclick="closeProjectModal()">Close Details</button>
      </div>
    `;

    backdrop.classList.add("active");
  }
}

function closeProjectModal() {
  const backdrop = document.getElementById("modal-backdrop");
  if (backdrop) {
    backdrop.classList.remove("active");
  }
}

// 8. CONTACT FORM SUBMISSION SIMULATOR
function handleFormSubmit(event) {
  event.preventDefault();
  const statusDiv = document.getElementById("form-status");
  const form = document.getElementById("contact-form");

  if (statusDiv) {
    statusDiv.style.color = "#059669";
    statusDiv.innerHTML = '<i class="fa-solid fa-circle-check"></i> Thank you! Your message has been sent successfully. Nabin will contact you soon.';
    form.reset();
    setTimeout(() => {
      statusDiv.innerHTML = "";
    }, 5000);
  }
}

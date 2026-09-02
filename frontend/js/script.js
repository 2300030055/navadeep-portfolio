/**
 * Navadeep Portfolio — JavaScript
 */

/* ============================================
   CONFIGURATION
   ============================================ */
const CONFIG = {
  GITHUB_URL: 'https://github.com/2300030055',
  LINKEDIN_URL: 'https://www.linkedin.com/in/avanigadda-navadeep-7a46b4301/',

  FIGMA_PROJECT_URL: 'https://www.figma.com/proto/5jQKX8hJAKXoBCFDAKSDc/Untitled?t=3mneARXk3BhsvBbL-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&node-id=6-33',
  WORDPRESS_PROJECT_URL: 'https://webappsklsac.wordpress.com/',
  AI_PROJECT_URL: 'https://udify.app/chat/OioTzjVue8VPxWQm',

  FORMSPREE_URL: 'https://formspree.io/f/maeyojaj'
};


/* ============================================
   DOM Ready
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {
  applyConfigLinks();
  initNavbar();
  initMobileMenu();
  initSmoothScroll();
  initRoleAnimation();
  initScrollReveal();
  initActiveNavHighlight();
  initImageFallbacks();
  initContactForm();
});


/* ============================================
   Apply configuration links
   ============================================ */
function applyConfigLinks() {
  const githubLink = document.getElementById('githubLink');
  const linkedinLink = document.getElementById('linkedinLink');

  if (githubLink) githubLink.href = CONFIG.GITHUB_URL;
  if (linkedinLink) linkedinLink.href = CONFIG.LINKEDIN_URL;

  const projectLinks = document.querySelectorAll(
    '.project-card .btn-project:not(.btn-project--disabled)'
  );

  const urls = [
    CONFIG.FIGMA_PROJECT_URL,
    CONFIG.WORDPRESS_PROJECT_URL,
    CONFIG.AI_PROJECT_URL
  ];

  projectLinks.forEach((link, index) => {
    if (urls[index]) {
      link.href = urls[index];
    }
  });
}


/* ============================================
   Navbar scroll effect
   ============================================ */
function initNavbar() {
  const navbar = document.getElementById('navbar');

  const handleScroll = () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}


/* ============================================
   Mobile menu
   ============================================ */
function initMobileMenu() {
  const toggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const links = navLinks.querySelectorAll('.nav-link');

  toggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    toggle.classList.toggle('active', isOpen);
    toggle.setAttribute('aria-expanded', isOpen);
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', (e) => {
    if (!toggle.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('open');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}


/* ============================================
   Smooth scroll for anchor links
   ============================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');

      if (targetId === '#') return;

      const target = document.querySelector(targetId);

      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}


/* ============================================
   Hero role text animation
   ============================================ */
function initRoleAnimation() {
  const roleEl = document.getElementById('heroRole');

  if (!roleEl) return;

  const roles = [
    'UI/UX Designer',
    'AI Tools Explorer',
    'AI/ML Enthusiast',
    'Creative Problem Solver',
    'Technology Enthusiast'
  ];

  let currentIndex = 0;

  setInterval(() => {
    roleEl.classList.add('fade-out');

    setTimeout(() => {
      currentIndex = (currentIndex + 1) % roles.length;

      roleEl.textContent = roles[currentIndex];

      roleEl.classList.remove('fade-out');
      roleEl.classList.add('fade-in');

      setTimeout(() => {
        roleEl.classList.remove('fade-in');
      }, 400);

    }, 400);

  }, 3000);
}


/* ============================================
   Scroll reveal with IntersectionObserver
   ============================================ */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, index * 80);

          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  reveals.forEach(el => observer.observe(el));
}


/* ============================================
   Active nav link on scroll
   ============================================ */
function initActiveNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveNav() {
    const navbarHeight = 80;
    const checkPosition = window.scrollY + navbarHeight + 100;

    let currentSection = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (
        checkPosition >= sectionTop &&
        checkPosition < sectionBottom
      ) {
        currentSection = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle(
        'active',
        link.dataset.section === currentSection
      );
    });
  }

  window.addEventListener('scroll', updateActiveNav, {
    passive: true
  });

  window.addEventListener('resize', updateActiveNav);

  updateActiveNav();
}


/* ============================================
   Image fallbacks for missing assets
   ============================================ */
function initImageFallbacks() {
  const profileImg = document.getElementById('profileImage');
  const profilePlaceholder = document.getElementById('profilePlaceholder');

  if (profileImg && profilePlaceholder) {

    const showProfilePlaceholder = () => {
      profileImg.classList.add('hidden');
      profilePlaceholder.classList.add('visible');
    };

    profileImg.addEventListener('error', showProfilePlaceholder);

    if (profileImg.complete && profileImg.naturalHeight === 0) {
      showProfilePlaceholder();
    }
  }

  document.querySelectorAll('.project-image').forEach(img => {

    const wrapper = img.closest('.project-image-wrapper');
    const placeholder =
      wrapper?.querySelector('.project-image-placeholder');

    const showPlaceholder = () => {
      img.classList.add('hidden');

      if (placeholder) {
        placeholder.classList.add('visible');
      }
    };

    img.addEventListener('error', showPlaceholder);

    if (img.complete && img.naturalHeight === 0) {
      showPlaceholder();
    }
  });
}


/* ============================================
   Contact form
   ============================================ */
function initContactForm() {

  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const formStatus = document.getElementById('formStatus');

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');

  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');

  let isSubmitting = false;


  form.addEventListener('submit', async (e) => {

    e.preventDefault();

    if (isSubmitting) return;

    clearErrors();

    formStatus.textContent = '';
    formStatus.className = 'form-status';

    const isValid = validateForm();

    if (!isValid) return;

    isSubmitting = true;

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';


    /* ============================================
       Send form to Formspree
       ============================================ */

    try {

      const formData = new FormData();

      formData.append('name', nameInput.value.trim());
      formData.append('email', emailInput.value.trim());
      formData.append('message', messageInput.value.trim());


      const response = await fetch(CONFIG.FORMSPREE_URL, {
        method: 'POST',

        headers: {
          'Accept': 'application/json'
        },

        body: formData
      });


      const data = await response.json().catch(() => ({}));


      console.log(
        'Formspree response:',
        response.status,
        data
      );


      if (response.ok) {

        formStatus.textContent =
          'Message sent successfully. Thanks for reaching out!';

        formStatus.className =
          'form-status success';

        form.reset();

      } else {

        console.error(
          'Formspree error:',
          data
        );

        if (data.errors) {
          displayServerErrors(data.errors);
        }

        formStatus.textContent =
          data.error ||
          'Something went wrong. Please try again.';

        formStatus.className =
          'form-status error';
      }


    } catch (error) {

      console.error(
        'Form submission error:',
        error
      );

      formStatus.textContent =
        'Unable to send message. Please try again.';

      formStatus.className =
        'form-status error';


    } finally {

      isSubmitting = false;

      submitBtn.disabled = false;

      submitBtn.textContent = 'Send Message';
    }

  });


  /* ============================================
     Form validation
     ============================================ */
  function validateForm() {

    let valid = true;

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();


    if (!name) {

      showError(
        nameInput,
        nameError,
        'Name is required.'
      );

      valid = false;

    } else if (name.length > 100) {

      showError(
        nameInput,
        nameError,
        'Name must be 100 characters or less.'
      );

      valid = false;
    }


    if (!email) {

      showError(
        emailInput,
        emailError,
        'Email is required.'
      );

      valid = false;

    } else if (!isValidEmail(email)) {

      showError(
        emailInput,
        emailError,
        'Please enter a valid email address.'
      );

      valid = false;
    }


    if (!message) {

      showError(
        messageInput,
        messageError,
        'Message is required.'
      );

      valid = false;

    } else if (message.length < 10) {

      showError(
        messageInput,
        messageError,
        'Message must be at least 10 characters.'
      );

      valid = false;

    } else if (message.length > 2000) {

      showError(
        messageInput,
        messageError,
        'Message must be 2000 characters or less.'
      );

      valid = false;
    }


    return valid;
  }


  /* ============================================
     Email validation
     ============================================ */
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }


  /* ============================================
     Show validation error
     ============================================ */
  function showError(input, errorEl, message) {

    input.classList.add('error');

    errorEl.textContent = message;
  }


  /* ============================================
     Clear validation errors
     ============================================ */
  function clearErrors() {

    [
      nameInput,
      emailInput,
      messageInput
    ].forEach(input => {
      input.classList.remove('error');
    });


    [
      nameError,
      emailError,
      messageError
    ].forEach(el => {
      el.textContent = '';
    });
  }


  /* ============================================
     Display Formspree/server errors
     ============================================ */
  function displayServerErrors(errors) {

    if (errors.name) {
      showError(
        nameInput,
        nameError,
        errors.name
      );
    }

    if (errors.email) {
      showError(
        emailInput,
        emailError,
        errors.email
      );
    }

    if (errors.message) {
      showError(
        messageInput,
        messageError,
        errors.message
      );
    }
  }
}

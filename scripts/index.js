// ** ELEMENTS
const body = document.body;
const video = document.querySelector('.device-video video');
const videoPlayBtn = document.querySelector('.device-video .play-btn');
const specificationsItems = document.querySelector('.specifications .columns');
const specificationsTrigger = document.querySelector('.specifications .more-btn');
const faqItems = document.querySelectorAll('.faq-item');
const faqTriggers = document.querySelectorAll('.faq-question');
const anchorLinks = document.querySelectorAll('a[href^="#"]');

let lastScroll = 0;

// ** NAV
handleNavScroll = () => {
  const currentScroll = window.scrollY;

  if (currentScroll <= 0) {
    body.classList.remove('scroll-up');
  }

  if (currentScroll > lastScroll && !body.classList.contains('scroll-down')) {
    body.classList.remove('scroll-up');
    body.classList.add('scroll-down');
  }

  if (currentScroll < lastScroll && body.classList.contains('scroll-down')) {
    body.classList.remove('scroll-down');
    body.classList.add('scroll-up');
  }

  lastScroll = currentScroll;
};

// ** VIDEO
const handlePlayVideo = () => {
  if (video.paused) {
    videoPlayBtn.classList.add('hide');
    video.play();
    video.setAttribute('controls', true);
  }
};

const handleVideoEnd = () => {
  videoPlayBtn.classList.remove('hide');
  video.removeAttribute('controls');
};

// ** SPECIFICATIONS EXPAND
const handleExpandCollapse = (e) => {
  const trigger = e.target.closest('.more-btn');
  let triggerText = trigger.querySelector('span');

  // rotate chev icon
  trigger.classList.toggle('expanded');

  if (specificationsItems.style.maxHeight) {
    specificationsItems.style.maxHeight = null;
    triggerText.textContent = 'اطلاعات بیشتر';
  } else {
    specificationsItems.style.maxHeight = specificationsItems.scrollHeight + 'px';
    triggerText.textContent = 'بستن';
  }
};

// ** FAQ
const handleToggleFaq = (e) => {
  const clickedFaqItem = e.target.closest('.faq-item');
  if (!clickedFaqItem) return;

  const clickedFaqData = clickedFaqItem.dataset.faq;
  const clickedFaqAnswer = clickedFaqItem.querySelector('.faq-answer');

  faqItems.forEach((faqItem) => {
    const dataFaq = faqItem.dataset.faq;
    if (clickedFaqData === dataFaq) {
      // open or close clicked item (based on prev state)
      clickedFaqItem.classList.toggle('expanded');

      if (clickedFaqAnswer.style.maxHeight) clickedFaqAnswer.style.maxHeight = null;
      else clickedFaqAnswer.style.maxHeight = clickedFaqAnswer.scrollHeight + 'px';
    } else {
      // Close all other expanded items
      faqItem.classList.remove('expanded');
      const faqAnswer = faqItem.querySelector('.faq-answer');
      if (faqAnswer.style.maxHeight) faqAnswer.style.maxHeight = null;
    }
  });
};

// ** ANCHOR SMOOTH SCROLL
const handleAnchorScroll = (e, anchor) => {
  e.preventDefault();

  const scrollToEl = document.querySelector(anchor.getAttribute('href'));

  if (scrollToEl) scrollToEl.scrollIntoView({block: 'center', behavior: 'smooth'});
};

// ** Events
videoPlayBtn.addEventListener('click', handlePlayVideo);
video.addEventListener('ended', handleVideoEnd);

specificationsTrigger.addEventListener('click', handleExpandCollapse);

faqTriggers.forEach((faqTrigger) =>
  faqTrigger.addEventListener('click', handleToggleFaq),
);

window.addEventListener('scroll', handleNavScroll);

anchorLinks.forEach((anchor) =>
  anchor.addEventListener('click', (e) => handleAnchorScroll(e, anchor)),
);

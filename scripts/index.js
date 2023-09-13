// ** ELEMENTS
const body = document.body;
const video = document.querySelector('.device-video video');
const videoPlayBtn = document.querySelector('.device-video .play-btn');
const specificationsItems = document.querySelector('.specifications .items');
const specificationsTrigger = document.querySelector('.specifications .more-btn');
const faqItems = document.querySelectorAll('.faq-item');
const faqTriggers = document.querySelectorAll('.faq-question');

let lastScroll = 0;

// VIDEO
const handlePlayVideo = () => {
  if (video.paused) {
    videoPlayBtn.classList.add('hide');
    video.play();
    video.setAttribute('controls', true);
  }
};

const handleVideoEnd = () => {
  if (video.ended) {
    videoPlayBtn.classList.remove('hide');
    video.removeAttribute('controls');
  }
};

// SPECIFICATIONS EXPAND
const handleExpandCollapse = () => {
  specificationsItems.classList.toggle('expanded');
};

// FAQ
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

videoPlayBtn.addEventListener('click', handlePlayVideo);
video.addEventListener('timeupdate', handleVideoEnd);

specificationsTrigger.addEventListener('click', handleExpandCollapse);

faqTriggers.forEach((faqTrigger) =>
  faqTrigger.addEventListener('click', handleToggleFaq),
);

window.addEventListener('scroll', () => {
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
});

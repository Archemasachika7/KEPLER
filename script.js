// Theme Toggle
const themeBtn = document.getElementById('theme-toggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
let darkMode = localStorage.getItem('kepler-theme') === 'dark' || (!localStorage.getItem('kepler-theme') && prefersDark);

function setTheme(dark) {
  document.body.classList.toggle('light', !dark);
  themeBtn.textContent = dark ? '☀️' : '🌙';
  localStorage.setItem('kepler-theme', dark ? 'dark' : 'light');
}
setTheme(darkMode);
themeBtn.onclick = () => {
  darkMode = !darkMode;
  setTheme(darkMode);
};

// Typing Animation
const typingEl = document.getElementById('typing');
const phrases = [
  "Learn JavaScript",
  "Master DSA",
  "Crack Your First Internship",
  "Build Stunning Frontends",
  "Ace Coding Interviews",
  "Discover AI/ML"
];
let phraseI=0, charI=0, typingDir=1, pause=0;

function typeLoop() {
  if (pause > 0) { pause--; setTimeout(typeLoop, 80); return;}
  let text = phrases[phraseI].substring(0, charI);
  typingEl.textContent = text;
  if (typingDir === 1 && charI < phrases[phraseI].length) {
     charI++;
     setTimeout(typeLoop, 70);
  } else if (typingDir===1) {
     typingDir=-1; pause=10; setTimeout(typeLoop, 70);
  } else if (typingDir==-1 && charI>0) {
     charI--; setTimeout(typeLoop, 45);
  } else {
     typingDir=1; phraseI=(phraseI+1)%phrases.length; pause=8; setTimeout(typeLoop,60);
  }
}
typeLoop();

// Course Filter Tabs
const filterBtns = document.querySelectorAll('.filter-btn');
const courseCards = document.querySelectorAll('.course-card');
filterBtns.forEach(btn => {
  btn.onclick = () => {
    document.querySelector('.filter-btn.active').classList.remove('active');
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter');
    courseCards.forEach(card => {
      if (filter==='all' || card.classList.contains(filter)) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  };
});

// Testimonials carousel (cycle highlight)
const testimonials = document.querySelectorAll('.testimonial');
let tIndex = 0;
setInterval(() => {
  testimonials[tIndex].classList.remove('active');
  tIndex = (tIndex+1) % testimonials.length;
  testimonials[tIndex].classList.add('active');
}, 3200);

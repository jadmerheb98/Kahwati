const navItems = document.querySelectorAll('.nav-item');
const screens = document.querySelectorAll('.screen');
navItems.forEach(item => {
  item.addEventListener('click', () => {
    const target = item.dataset.screen;
    navItems.forEach(i => i.classList.toggle('active', i === item));
    screens.forEach(screen => screen.classList.toggle('active', screen.id === target));
    window.scrollTo({top:0, behavior:'smooth'});
  });
});

document.addEventListener('gesturestart', e => e.preventDefault());
let lastTouchEnd = 0;
document.addEventListener('touchend', e => {
  const now = Date.now();
  if (now - lastTouchEnd <= 300) e.preventDefault();
  lastTouchEnd = now;
}, {passive:false});

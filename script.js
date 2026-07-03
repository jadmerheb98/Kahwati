document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.mode-row button');
  buttons.forEach(btn => btn.addEventListener('click', () => {
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }));

  document.querySelectorAll('[data-add]').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.textContent = 'Added';
      btn.classList.add('added');
      setTimeout(() => { btn.textContent = 'Add'; btn.classList.remove('added'); }, 1100);
    });
  });
});

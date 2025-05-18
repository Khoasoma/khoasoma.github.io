const toggle = document.getElementById('theme-toggle');
const icon = document.getElementById('theme-icon');

function setTheme(theme) {
  if (theme === 'dark') {
    document.body.classList.add('dark');
    icon.textContent = '☀️';
  } else {
    document.body.classList.remove('dark');
    icon.textContent = '🌙';
  }
  localStorage.setItem('theme', theme);
}

// Mặc định dark mode nếu chưa từng chọn
const userTheme = localStorage.getItem('theme');
if (!userTheme || userTheme === 'dark') setTheme('dark');
else setTheme('light');

toggle.addEventListener('click', () => {
  const isDark = document.body.classList.contains('dark');
  setTheme(isDark ? 'light' : 'dark');
});
const toggle = document.getElementById('theme-toggle');
const icon = document.getElementById('theme-icon');

// Áp dụng trạng thái theme từ localStorage nếu có
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

// Đọc trạng thái theme khi load trang
const userTheme = localStorage.getItem('theme');
if (userTheme === 'dark') setTheme('dark');
else setTheme('light');

// Xử lý khi bấm nút
toggle.addEventListener('click', () => {
  const isDark = document.body.classList.contains('dark');
  setTheme(isDark ? 'light' : 'dark');
});
console.log('loading...');
window.addEventListener('load', () => {
  const n = document.getElementById('timer-count');
  const intervalId = setInterval(() => {
    if (n) {
      const count = parseInt(n.textContent);
      n.textContent = count - 1;
    }
  }, 1000);

});

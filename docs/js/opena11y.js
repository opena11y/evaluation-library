/* opena11y.js */

// Set aria-current

window.addEventListener('load', () => {

  const pathname = new URL(window.location.href).pathname;

  let filename = pathname.substring(pathname.lastIndexOf('/')+1);

  filename = filename ? filename : 'index.html';

  const links = document.querySelectorAll('a');

  links.forEach( (link) => {
    if (link.href.includes(filename)) {
      link.setAttribute('aria-current', 'page');
    }
  })

});

const guidesList = document.querySelector('.guides');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');

const setupUI = user => {
  if (user) {
    loggedInLinks.forEach(elt => (elt.style.display = 'block'));
    loggedOutLinks.forEach(elt => (elt.style.display = 'none'));
  } else {
    loggedInLinks.forEach(elt => (elt.style.display = 'none'));
    loggedOutLinks.forEach(elt => (elt.style.display = 'block'));
  }
};

// setup guides
const setupGuides = data => {
  if (data.length) {
    let html = '';
    data.map(doc => {
      const guide = doc.data();
      const li = `
       <li>
        <div class="collapsible-header grey lighten-4">${guide.title}</div>
        <div class="collapsible-body white">${guide.content}</div>
      </li>`;
      html += li;
    });
    guidesList.innerHTML = html;
  } else {
    guidesList.innerHTML = `<h5 class="center-align">Login to view guides</h5>`;
  }
};

// setup materialize components
document.addEventListener('DOMContentLoaded', function() {
  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);
});

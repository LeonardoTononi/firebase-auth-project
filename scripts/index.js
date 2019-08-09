const guidesList = document.querySelector('.guides');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');
const adminItems = document.querySelectorAll('.admin');

const setupUI = user => {
  if (user) {
    if (user.admin) {
      adminItems.forEach(item => (item.style.display = 'block'));
    }
    // account info
    db.collection('users')
      .doc(user.uid)
      .get()
      .then(doc => {
        const html = `
             <div>Logged in as ${user.email}</div>
             <div>${doc.data().bio}</div>
             <div class="pink-text">${user.admin ? 'Admin' : ''}`;
        accountDetails.innerHTML = html;
      });

    // toggle nav UI elements
    loggedInLinks.forEach(elt => (elt.style.display = 'block'));
    loggedOutLinks.forEach(elt => (elt.style.display = 'none'));
  } else {
    // hide account info
    accountDetails.innerHTML = '';

    // toggle nav UI elements
    loggedInLinks.forEach(elt => (elt.style.display = 'none'));
    loggedOutLinks.forEach(elt => (elt.style.display = 'block'));

    adminItems.forEach(item => (item.style.display = 'none'));
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

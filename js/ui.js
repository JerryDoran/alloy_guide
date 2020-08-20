const alloys = document.querySelector('.alloys');
const modal = document.querySelector('.modal');

document.addEventListener('DOMContentLoaded', () => {
  // Setup Materialize Components
  const sideNav = document.querySelector('.side-menu');
  M.Sidenav.init(sideNav, { edge: 'right' });
});

const clickOutside = (e) => {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
};

const closeModal = () => {
  modal.style.display = 'none';
};

window.addEventListener('click', clickOutside);

const openModal = (data) => {
  let result = `
  <div class="modal-content">
        <span class="close-btn">&times;</span>
        <span class="chem">c</span>
        <span class="chem">si</span>
        <span class="chem">mn</span>
        <span class="chem">cr</span>
        <span class="chem">mo</span>
        <span class="chem">fe</span>
        <span class="chem">ti</span>
        <span class="chem">al</span>
        <span class="chem">co</span>
        <span class="chem">w</span>
        <span class="chem">v</span>
        <span class="chem">cu</span>
        <span class="chem">zr</span>
        <span class="chem">b</span>
        <span class="chem">cb</span>
        <span class="chem">ta</span>
        <span class="chem">hf</span>
        <span class="chem">re</span>
        <span class="chem">pt</span>
        <span class="chem">ni</span>
  </div>
  `;
  modal.innerHTML = result;
  modal.style.display = 'block';

  const closeBtn = document.querySelector('.close-btn');

  closeBtn.addEventListener('click', closeModal);
};

// Render alloy data
const renderAlloy = (data, id) => {
  const html = `
  <div class="card-panel alloy white row" onclick="getAlloyData('${id}')">
    <div class="alloy-details">
      <div class="alloy-title">${data.ALLOYCODE}</div>
      <div class="divider grey-text text-lighten-2"></div>
      <div class="alloy-description">${data.DESC}</div>
    </div>
  </div>  
  `;
  alloys.innerHTML += html;
};

// Get the alloy data by id from firestore
const getAlloyData = (id) => {
  db.collection('ALLOYS')
    .doc(id)
    .get()
    .then((doc) => {
      const data = doc.data();
      openModal(data);
    });
};

const alloys = document.querySelector('.alloys');

document.addEventListener('DOMContentLoaded', () => {
  // Setup Materialize Components
  const sideNav = document.querySelector('.side-menu');
  M.Sidenav.init(sideNav, { edge: 'right' });
});

// Render alloy data
const renderAlloy = (data, id) => {
  const html = `
  <div class="card-panel alloy white row" data-id="${id}">
    <div class="alloy-details">
      <div class="alloy-title">${data.ALLOYCODE}</div>
      <div class="divider grey-text text-lighten-2"></div>
      <div class="alloy-description">${data.DESC}</div>
    </div>
  </div>  
  `;
  alloys.innerHTML += html;
};

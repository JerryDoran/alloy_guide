const alloys = document.querySelector('.alloys');
const modal = document.querySelector('.modal');

document.addEventListener('DOMContentLoaded', () => {
  // Setup Materialize Components
  const sideNav = document.querySelector('.side-menu');
  M.Sidenav.init(sideNav, { edge: 'right' });

  // Get chemistry data from 'ALLOYS' collection
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

const openModal = (data, prices) => {
  console.log(data);
  console.log(prices);

  let result = `
      <div class="modal-content">
      <h5 class="alloy-code">${data.ALLOYCODE} ${data.DESC}</h5>
        <button class="close-btn">X</button>         
            <div class="card">
              <div class="card-element">C</div>
                <div class="divider"></div>
                <div class="card-chem">${data.C}</div>
            </div> 
            <div class="card">
              <div class="card-element">Si</div>
                <div class="divider"></div>
                <div class="card-chem">${data.SI}</div>
            </div> 
            <div class="card">
              <div class="card-element">Mn</div>
                <div class="divider"></div>
                <div class="card-chem">${data.MN}</div>
            </div> 
            <div class="card">
              <div class="card-element">Cr</div>
                <div class="divider"></div>
                <div class="card-chem">${data.CR}</div>
            </div> 
            <div class="card">
              <div class="card-element">Mo</div>
                <div class="divider"></div>
                <div class="card-chem">${data.MO}</div>
            </div> 
            <div class="card">
              <div class="card-element">Fe</div>
                <div class="divider"></div>
                <div class="card-chem">${data.FE}</div>
            </div> 
            <div class="card">
              <div class="card-element">Ti</div>
                <div class="divider"></div>
                <div class="card-chem">${data.TI}</div>
            </div> 
            <div class="card">
              <div class="card-element">Al</div>
                <div class="divider"></div>
                <div class="card-chem">${data.AL}</div>
            </div> 
            <div class="card">
              <div class="card-element">Co</div>
                <div class="divider"></div>
                <div class="card-chem">${data.CO}</div>
            </div> 
            <div class="card">
              <div class="card-element">W</div>
                <div class="divider"></div>
                <div class="card-chem">${data.W}</div>
            </div> 
            <div class="card">
              <div class="card-element">V</div>
                <div class="divider"></div>
                <div class="card-chem">${data.V}</div>
            </div> 
            <div class="card">
              <div class="card-element">Cu</div>
                <div class="divider"></div>
                <div class="card-chem">${data.CU}</div>
            </div> 
            <div class="card">
              <div class="card-element">Zr</div>
                <div class="divider"></div>
                <div class="card-chem">${data.ZR}</div>
            </div> 
            <div class="card">
              <div class="card-element">B</div>
                <div class="divider"></div>
                <div class="card-chem">${data.B}</div>
            </div> 
            <div class="card">
              <div class="card-element">Cb</div>
                <div class="divider"></div>
                <div class="card-chem">${data.CB}</div>
            </div> 
            <div class="card">
              <div class="card-element">Ta</div>
                <div class="divider"></div>
                <div class="card-chem">${data.TA}</div>
            </div> 
            <div class="card">
              <div class="card-element">Hf</div>
                <div class="divider"></div>
                <div class="card-chem">${data.HF}</div>
            </div> 
            <div class="card">
              <div class="card-element">Re</div>
                <div class="divider"></div>
                <div class="card-chem">${data.RE}</div>
            </div> 
            <div class="card">
              <div class="card-element">Pt</div>
                <div class="divider"></div>
                <div class="card-chem">${data.PT}</div>
            </div> 
            <div class="card">
              <div class="card-element">Ni</div>
                <div class="divider"></div>
                <div class="card-chem">${data.NI}</div>
            </div>    
                       
            <div class="bar-prices"> 
            <h6>Bar Prices</h6>
              ${prices
                .map((item) => {
                  return `                
                <p>${item.Blend} - ${item.Price}</p>               
                `;
                })
                .join('')}
            </div>       
      </div>
      
  `;

  modal.innerHTML = result;
  modal.style.display = 'block';

  const closeBtn = document.querySelector('.close-btn');

  closeBtn.addEventListener('click', closeModal);
};

// Get the alloy data by id from firestore
const getAlloyData = (id, alloyCode) => {
  let prices = [];
  db.collection('ALLOYS')
    .doc(id)
    .get()
    .then((doc) => {
      const data = doc.data();
      db.collection('PRICES')
        .where('Alloy', '==', alloyCode)
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            prices.push(doc.data());
          });
          openModal(data, prices);
        });
    });
};

// const getAlloyData = (id, alloyCode) => {
//   let data = [];
//   let prices = [];
//   db.collection('ALLOYS')
//     .doc(id)
//     .get()
//     .then((doc) => {
//       data.push(doc.data());
//     });

//   db.collection('PRICES')
//     .where('Alloy', '==', alloyCode)
//     .get()
//     .then((snapshot) => {
//       snapshot.docs.forEach((doc) => {
//         prices.push(doc.data());
//       });
//     });
//   openModal(data, prices);
// };

// Render alloy data
const renderAlloy = (data, id) => {
  const html = `
  <div class="card-panel alloy white row" onclick="getAlloyData('${id}', '${data.ALLOYCODE}')">
    <div class="alloy-details">
      <div class="alloy-title">${data.ALLOYCODE}</div>
      <div class="divider grey-text text-lighten-2"></div>
      <div class="alloy-description">${data.DESC}</div>
    </div>
  </div>  
  `;
  alloys.innerHTML += html;
};

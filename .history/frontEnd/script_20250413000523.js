const API = 'http://localhost:5000/api';

function openModal(id) {
  document.getElementById(id).style.display = 'block';
}

function closeModal(id) {
  document.getElementById(id).style.display = 'none';
}

// Fetch and display all materials
async function fetchMaterials() {
  const res = await fetch(`${API}/materials`);
  const materials = await res.json();
  const list = document.getElementById('materialsList');
  list.innerHTML = '';
  materials.forEach((mat) => {
    const li = document.createElement('li');
    li.textContent = `${mat.name} - ${mat.type} - $${mat.cost}`;
    list.appendChild(li);
  });
}

// Fetch and display all experiments
async function fetchExperiments() {
  const res = await fetch(`${API}/experiments`);
  const experiments = await res.json();
  const list = document.getElementById('experimentsList');
  list.innerHTML = '';
  experiments.forEach((exp) => {
    const li = document.createElement('li');
    li.textContent = `${exp.nameEn} (${exp.type}) - Total Cost: $${exp.totalCost}`;
    list.appendChild(li);
  });
}

// Submit material form
document.getElementById('materialForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('materialName').value;
  const cost = document.getElementById('materialCost').value;
  const type = document.getElementById('materialType').value;

  const res = await fetch(`${API}/materials`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, cost, type }),
  });

  const data = await res.json();
  if (res.ok) {
    alert('Material added!');
    closeModal('materialModal');
    fetchMaterials();
  } else {
    alert(`Error: ${data.message}`);
  }
});

// Submit experiment form
document.getElementById('experimentForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const nameEn = document.getElementById('experimentNameEn').value;
  const nameAr = document.getElementById('experimentNameAr').value;
  const type = document.getElementById('experimentType').value;
  let materials;

  try {
    materials = JSON.parse(document.getElementById('experimentMaterials').value);
  } catch (err) {
    alert('Invalid JSON format');
    return;
  }

  const res = await fetch(`${API}/experiments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nameEn, nameAr, type, materials }),
  });

  const data = await res.json();
  if (res.ok) {
    alert('Experiment added!');
    closeModal('experimentModal');
    fetchExperiments();
  } else {
    alert(`Error: ${data.message}`);
  }
});

// Button click handlers
document.getElementById('openMaterialBtn').addEventListener('click', () => openModal('materialModal'));
document.getElementById('openExperimentBtn').addEventListener('click', () => openModal('experimentModal'));

// Load initial data
fetchMaterials();
fetchExperiments();

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Lab Materials</title>
</head>
<body>
  <h1>Lab Materials</h1>

  <div>
    <h2>Add Material</h2>
    <form id="materialForm">
      <input type="text" id="name" placeholder="Name" required />
      <input type="number" id="cost" placeholder="Cost" required />
      <input type="text" id="type" placeholder="Type (Device/Tool/Chemical/Food)" required />
      <button type="submit">Add</button>
    </form>
  </div>

  <div>
    <h2>All Materials</h2>
    <ul id="materialsList"></ul>
  </div>

  <script>
    // Fetch and display all materials
    async function fetchMaterials() {
      const res = await fetch('http://localhost:5000/api/materials');
      const materials = await res.json();
      const list = document.getElementById('materialsList');
      list.innerHTML = '';
      materials.forEach((mat) => {
        const li = document.createElement('li');
        li.textContent = `${mat.name} - ${mat.type} - $${mat.cost}`;
        list.appendChild(li);
      });
    }

    // Handle material creation
    document.getElementById('materialForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const cost = document.getElementById('cost').value;
      const type = document.getElementById('type').value;

      const response = await fetch('http://localhost:5000/api/materials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, cost, type }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Material added!');
        fetchMaterials();
      } else {
        alert(`Error: ${data.message}`);
      }
    });

    // Initial load
    fetchMaterials();
  </script>
</body>
</html>

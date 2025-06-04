
async function ladeProdukte() {
  const res = await fetch('data/produkte.json');
  const produkte = await res.json();
  const container = document.getElementById('produktliste');
  produkte.forEach(p => {
    const div = document.createElement('div');
    div.className = 'produkt';
    div.innerHTML = `
      <img src="${p.bild}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>Preis: ${p.preis.toFixed(2)} €</p>
      <p>${p.bestand > 0 ? 'Verfügbar zur Abholung' : '<span style="color:red">Nicht verfügbar</span>'}</p>
      <button onclick="inWarenkorb('${p.id}')" ${p.bestand <= 0 ? 'disabled' : ''}>In den Warenkorb</button>
    `;
    container.appendChild(div);
  });
}

function inWarenkorb(id) {
  let warenkorb = JSON.parse(localStorage.getItem('warenkorb') || '{}');
  warenkorb[id] = (warenkorb[id] || 0) + 1;
  localStorage.setItem('warenkorb', JSON.stringify(warenkorb));
  updateCartCount();
}

function updateCartCount() {
  let warenkorb = JSON.parse(localStorage.getItem('warenkorb') || '{}');
  let count = Object.values(warenkorb).reduce((a, b) => a + b, 0);
  document.getElementById('cart-count').textContent = count;
}

ladeProdukte();
updateCartCount();

// ====================== KONFIGURĀCIJA ======================
const plantsContainer = document.querySelectorAll('.plant');
const defaultMaxDays = 3; // noklusētais intervāls dienās

// ====================== LOCALSTORAGE FUNKCIJAS ======================
function getHistory(plantKey) {
  return JSON.parse(localStorage.getItem(plantKey + '_history') || '[]');
}

function setHistory(plantKey, history) {
  localStorage.setItem(plantKey + '_history', JSON.stringify(history));
}

function saveWatering(plantKey, date) {
  const history = getHistory(plantKey);
  history.push(date);
  setHistory(plantKey, history);
}

// ====================== MĀCĪŠANĀS FUNKCIJA ======================
function calculateAverageInterval(plantKey) {
  const history = getHistory(plantKey).map(d => new Date(d));
  if (history.length < 2) return defaultMaxDays;

  let totalDiff = 0;
  for (let i = 1; i < history.length; i++) {
    totalDiff += (history[i] - history[i - 1]) / (1000 * 60 * 60 * 24); // dienās
  }
  return totalDiff / (history.length - 1);
}

// ====================== FORMATĒŠANA ======================
function formatDateTime(date) {
  const d = new Date(date);
  return `${d.toLocaleDateString()} ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
}

// ====================== STATUSA ATJAUNOŠANA ======================
function updateStatus() {
  const now = new Date();

  plantsContainer.forEach(plant => {
    const key = plant.dataset.plant;
    const statusSpan = plant.querySelector('.status');
    const lastWateredSpan = plant.querySelector('.last-watered');
    const history = getHistory(key);

    if (history.length === 0) {
      statusSpan.textContent = 'Nav laistīts';
      statusSpan.className = 'status need-water';
      lastWateredSpan.textContent = '—';
      return;
    }

    const lastDate = new Date(history[history.length - 1]);
    const diffDays = (now - lastDate) / (1000 * 60 * 60 * 24);
    const diffHours = (now - lastDate) / (1000 * 60 * 60);
    const avgInterval = calculateAverageInterval(key);

    if (diffHours >= 12 && diffDays < avgInterval) {
      statusSpan.textContent = 'Vēlams aplaistīt';
      statusSpan.className = 'status warning';
    } else if (diffDays >= avgInterval) {
      statusSpan.textContent = 'Jālaista';
      statusSpan.className = 'status need-water';
    } else {
      statusSpan.textContent = 'OK';
      statusSpan.className = 'status ok';
    }

    lastWateredSpan.textContent = formatDateTime(lastDate);
  });
}

// ====================== SĀKOTNĒJĀ INICIALIZĀCIJA ======================
plantsContainer.forEach(p => {
  const key = p.dataset.plant;
  if (!localStorage.getItem(key + '_history')) {
    setHistory(key, []);
  }

  // Apūdeņošanas poga
  const button = p.querySelector('button');
  button.addEventListener('click', () => {
    saveWatering(key, new Date());
    updateStatus();
  });
});

// ====================== EKSPORTĒŠANA ======================
document.getElementById('export-data')?.addEventListener('click', () => {
  const exportData = {};
  plantsContainer.forEach(plant => {
    const key = plant.dataset.plant;
    const name = plant.querySelector('.plant-name').textContent;
    exportData[key] = { name, history: getHistory(key) };
  });

  const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `augu_dati_${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
});

// ====================== IMPORTĒŠANA ======================
const importButton = document.getElementById('import-data');
const importFileInput = document.getElementById('import-file');

importButton?.addEventListener('click', () => importFileInput.click());

importFileInput?.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const importedData = JSON.parse(e.target.result);

      for (const key in importedData) {
        if (importedData.hasOwnProperty(key) && Array.isArray(importedData[key].history)) {
          setHistory(key, importedData[key].history);
        }
      }

      alert('Dati veiksmīgi importēti!');
      updateStatus();
    } catch (err) {
      alert('Kļūda importējot failu: ' + err.message);
    }
  };
  reader.readAsText(file);
});

// ====================== PALAIŽ STATUSA ATJAUNOŠANU ======================
updateStatus();

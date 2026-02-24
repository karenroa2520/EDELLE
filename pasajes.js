/* ==============================================
   PASAJES.JS — Edelle
   ============================================== */

/* ─── DATOS DE PRUEBA ───────────────────────── */
const RUTAS = [
  { id:1,  origen:'bogota',      destino:'medellin',     origen_n:'Bogotá',      destino_n:'Medellín',     hora:'06:00', duracion:'8h',  precio:85000,  empresa:'Expreso Bolivariano', asientos_libres:24, tipo:'Ejecutivo' },
  { id:2,  origen:'bogota',      destino:'medellin',     origen_n:'Bogotá',      destino_n:'Medellín',     hora:'10:30', duracion:'8h',  precio:72000,  empresa:'Flota Magdalena',     asientos_libres:5,  tipo:'Estándar'  },
  { id:3,  origen:'bogota',      destino:'cali',         origen_n:'Bogotá',      destino_n:'Cali',         hora:'07:00', duracion:'10h', precio:95000,  empresa:'Expreso Bolivariano', asientos_libres:18, tipo:'Ejecutivo' },
  { id:4,  origen:'bogota',      destino:'bucaramanga',  origen_n:'Bogotá',      destino_n:'Bucaramanga',  hora:'08:00', duracion:'7h',  precio:78000,  empresa:'Berlinas del Fonce',  asientos_libres:30, tipo:'Ejecutivo' },
  { id:5,  origen:'bogota',      destino:'barranquilla', origen_n:'Bogotá',      destino_n:'Barranquilla', hora:'21:00', duracion:'18h', precio:130000, empresa:'Copetran',            asientos_libres:12, tipo:'Cama'      },
  { id:6,  origen:'medellin',    destino:'bogota',       origen_n:'Medellín',    destino_n:'Bogotá',       hora:'05:30', duracion:'8h',  precio:85000,  empresa:'Expreso Bolivariano', asientos_libres:20, tipo:'Ejecutivo' },
  { id:7,  origen:'medellin',    destino:'cali',         origen_n:'Medellín',    destino_n:'Cali',         hora:'09:00', duracion:'9h',  precio:88000,  empresa:'Flota Occidental',    asientos_libres:8,  tipo:'Estándar'  },
  { id:8,  origen:'cali',        destino:'bogota',       origen_n:'Cali',        destino_n:'Bogotá',       hora:'06:30', duracion:'10h', precio:95000,  empresa:'Expreso Palmira',     asientos_libres:15, tipo:'Ejecutivo' },
  { id:9,  origen:'bucaramanga', destino:'bogota',       origen_n:'Bucaramanga', destino_n:'Bogotá',       hora:'04:00', duracion:'7h',  precio:78000,  empresa:'Berlinas del Fonce',  asientos_libres:22, tipo:'Ejecutivo' },
  { id:10, origen:'cartagena',   destino:'bogota',       origen_n:'Cartagena',   destino_n:'Bogotá',       hora:'20:00', duracion:'14h', precio:120000, empresa:'Brasilia',            asientos_libres:3,  tipo:'Cama'      },
  { id:11, origen:'bogota',      destino:'pereira',      origen_n:'Bogotá',      destino_n:'Pereira',      hora:'07:00', duracion:'6h',  precio:68000,  empresa:'Flota Occidental',    asientos_libres:27, tipo:'Estándar'  },
  { id:12, origen:'pereira',     destino:'cali',         origen_n:'Pereira',     destino_n:'Cali',         hora:'11:00', duracion:'3h',  precio:42000,  empresa:'Expreso Palmira',     asientos_libres:14, tipo:'Estándar'  },
];

/* ─── ESTADO ────────────────────────────────── */
let selectedRoute    = null;
let selectedSeats    = [];
let ocupadosActuales = [];

/* ─── HELPERS ───────────────────────────────── */
const fmt = n =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(n);

const fmtDate = s => {
  if (!s) return '—';
  const [y, m, d] = s.split('-');
  return `${d}/${m}/${y}`;
};

const genRef = () => 'EDL-' + Math.random().toString(36).substr(2, 6).toUpperCase();

const pax = () => parseInt(document.getElementById('pasajeros').value) || 1;

/* ─── BUSCAR RUTAS ──────────────────────────── */
function buscarRutas() {
  const ori   = document.getElementById('origen').value;
  const des   = document.getElementById('destino').value;
  const fecha = document.getElementById('fecha').value;

  let filtered = RUTAS;
  if (ori) filtered = filtered.filter(r => r.origen  === ori);
  if (des) filtered = filtered.filter(r => r.destino === des);

  renderRoutes(filtered, fecha);
}

/* ─── RENDERIZAR TARJETAS ───────────────────── */
function renderRoutes(rutas, fecha) {
  const container = document.getElementById('routes-container');
  const countEl   = document.getElementById('results-count');

  countEl.textContent = `${rutas.length} ruta${rutas.length !== 1 ? 's' : ''} encontrada${rutas.length !== 1 ? 's' : ''}`;

  if (rutas.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <h3>No hay rutas disponibles</h3>
        <p>Intenta con otra combinación de ciudades o fecha.</p>
      </div>`;
    return;
  }

  container.innerHTML = rutas.map(r => {
    const badge = r.asientos_libres > 10
      ? `<span class="seats-badge ok">✓ ${r.asientos_libres} asientos</span>`
      : r.asientos_libres > 0
      ? `<span class="seats-badge low">⚠ ${r.asientos_libres} asientos</span>`
      : `<span class="seats-badge full">✗ Agotado</span>`;

    const fechaDisplay = fecha
      ? fmtDate(fecha)
      : '<em style="color:var(--muted)">—</em>';

    return `
      <div class="route-card" id="card-${r.id}" onclick="seleccionarRuta(${r.id})">
        <div class="route-top">
          <div class="route-cities">
            <span>${r.origen_n}</span>
            <span class="route-arrow">→</span>
            <span>${r.destino_n}</span>
          </div>
          <div class="route-price">${fmt(r.precio)}</div>
        </div>
        <div class="route-details">
          <div class="detail-chip"><div class="label">Salida</div><div class="val">${r.hora}</div></div>
          <div class="detail-chip"><div class="label">Duración</div><div class="val">${r.duracion}</div></div>
          <div class="detail-chip"><div class="label">Tipo</div><div class="val">${r.tipo}</div></div>
          <div class="detail-chip"><div class="label">Fecha</div><div class="val">${fechaDisplay}</div></div>
        </div>
        <div class="route-footer">
          <div>${badge}</div>
          <div class="company-tag">${r.empresa}</div>
          <button class="select-btn" onclick="event.stopPropagation(); seleccionarRuta(${r.id})">Seleccionar →</button>
        </div>
      </div>`;
  }).join('');
}

/* ─── SELECCIONAR RUTA ──────────────────────── */
function seleccionarRuta(id) {
  selectedRoute = RUTAS.find(r => r.id === id);
  selectedSeats = [];

  // Resaltar tarjeta seleccionada
  document.querySelectorAll('.route-card').forEach(c => c.classList.remove('selected'));
  document.getElementById(`card-${id}`)?.classList.add('selected');

  // Construir mapa de bus
  buildBus(selectedRoute.asientos_libres);

  updateSummary();

  // En móvil, hacer scroll al panel de asientos
  if (window.innerWidth < 900) {
    document.getElementById('seat-panel').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

/* ─── CONSTRUIR BUS ─────────────────────────── */
function buildBus(libres) {
  const total   = 40;
  const ocupados = [];

  while (ocupados.length < total - libres) {
    const n = Math.ceil(Math.random() * total);
    if (!ocupados.includes(n)) ocupados.push(n);
  }

  ocupadosActuales = ocupados;
  selectedSeats    = [];
  updateSeatInfo();

  const body = document.getElementById('bus-body');
  body.innerHTML = '';

  for (let row = 0; row < 10; row++) {
    const rowEl = document.createElement('div');
    rowEl.className = 'seat-row';

    // Layout: [A][B][ pasillo ][C][D]
    for (let col = 0; col < 5; col++) {
      if (col === 2) {
        const aisle = document.createElement('div');
        aisle.className = 'aisle';
        rowEl.appendChild(aisle);
        continue;
      }

      const realCol = col > 2 ? col - 1 : col;
      const seatNum = row * 4 + realCol + 1;

      const el = document.createElement('div');
      el.className     = 'seat';
      el.textContent   = seatNum;
      el.dataset.seat  = seatNum;

      if (ocupados.includes(seatNum)) {
        el.classList.add('occupied');
      } else {
        if (col === 0 || col === 4) el.classList.add('window');
        el.addEventListener('click', () => toggleSeat(el, seatNum));
      }

      rowEl.appendChild(el);
    }

    body.appendChild(rowEl);
  }
}

/* ─── TOGGLE ASIENTO ────────────────────────── */
function toggleSeat(el, num) {
  const max = pax();

  if (el.classList.contains('selected')) {
    el.classList.remove('selected');
    selectedSeats = selectedSeats.filter(s => s !== num);
  } else {
    if (selectedSeats.length >= max) {
      // Desmarcar el más antiguo
      const old = selectedSeats.shift();
      document.querySelector(`.seat[data-seat="${old}"]`)?.classList.remove('selected');
    }
    el.classList.add('selected');
    selectedSeats.push(num);
  }

  updateSeatInfo();
  updateSummary();
}

/* ─── INFO DE ASIENTOS ──────────────────────── */
function updateSeatInfo() {
  const info = document.getElementById('seat-info');

  if (!selectedRoute) {
    info.textContent = 'Elige una ruta primero';
    return;
  }
  if (selectedSeats.length === 0) {
    info.textContent = 'Ningún asiento seleccionado';
    return;
  }

  info.innerHTML = `Asiento(s) elegido(s): <strong>${selectedSeats.join(', ')}</strong> · ${selectedSeats.length}/${pax()} seleccionado(s)`;
}

/* ─── ACTUALIZAR RESUMEN ────────────────────── */
function updateSummary() {
  if (!selectedRoute) return;

  const pasajeros = pax();
  const total     = selectedRoute.precio * pasajeros;
  const fecha     = document.getElementById('fecha').value;

  document.getElementById('sum-ruta').textContent     = `${selectedRoute.origen_n} → ${selectedRoute.destino_n}`;
  document.getElementById('sum-fecha').textContent    = fmtDate(fecha);
  document.getElementById('sum-asientos').textContent = selectedSeats.length ? selectedSeats.join(', ') : '—';
  document.getElementById('sum-pasajeros').textContent = pasajeros;
  document.getElementById('sum-total').textContent    = fmt(total);
}

/* ─── FORMATO TARJETA ───────────────────────── */
function formatCard(el) {
  let v  = el.value.replace(/\D/g, '').substring(0, 16);
  el.value = v.replace(/(.{4})/g, '$1 ').trim();
}

function formatExp(el) {
  let v  = el.value.replace(/\D/g, '');
  if (v.length > 2) v = v.substring(0, 2) + '/' + v.substring(2, 4);
  el.value = v;
}

/* ─── PROCESAR COMPRA ───────────────────────── */
function procesarCompra() {
  if (!selectedRoute) {
    alert('Por favor selecciona una ruta.');
    return;
  }

  const fecha = document.getElementById('fecha').value;
  if (!fecha) {
    alert('Por favor selecciona una fecha de viaje.');
    return;
  }

  if (selectedSeats.length < pax()) {
    alert(`Por favor selecciona ${pax()} asiento(s) para continuar.`);
    return;
  }

  if (!document.getElementById('f-nombre').value.trim()) {
    alert('Por favor ingresa tu nombre completo.');
    return;
  }

  if (!document.getElementById('f-email').value.trim()) {
    alert('Por favor ingresa tu correo electrónico.');
    return;
  }

  if (!document.getElementById('f-card').value.trim()) {
    alert('Por favor ingresa los datos de tu tarjeta.');
    return;
  }

  // Simular procesamiento
  const btn     = document.getElementById('btn-buy');
  const spinner = document.getElementById('spinner');
  const icon    = btn.querySelector('svg');

  btn.disabled       = true;
  spinner.style.display = 'block';
  icon.style.display    = 'none';

  setTimeout(() => {
    btn.disabled          = false;
    spinner.style.display = 'none';
    icon.style.display    = '';

    document.getElementById('booking-ref').textContent = genRef();
    document.getElementById('modal').classList.add('open');
  }, 2000);
}

/* ─── CERRAR MODAL ──────────────────────────── */
function cerrarModal() {
  document.getElementById('modal').classList.remove('open');

  // Resetear estado
  selectedRoute = null;
  selectedSeats = [];

  document.querySelectorAll('.route-card').forEach(c => c.classList.remove('selected'));
  document.getElementById('bus-body').innerHTML = '';
  document.getElementById('seat-info').textContent = 'Elige una ruta primero';

  ['f-nombre', 'f-doc', 'f-email', 'f-tel', 'f-card', 'f-exp', 'f-cvv'].forEach(id => {
    document.getElementById(id).value = '';
  });

  updateSummary();
}

/* ─── INICIALIZACIÓN ────────────────────────── */
(function init() {
  const today = new Date().toISOString().split('T')[0];
  const fechaEl = document.getElementById('fecha');
  fechaEl.min   = today;
  fechaEl.value = today;

  renderRoutes(RUTAS, today);
})();
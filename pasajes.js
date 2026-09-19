/* ==============================================
   PASAJES.JS — Edelle (Lista Completa + Filtro Inteligente)
   ============================================== */

// 1. BASE DE DATOS DE CIUDADES Y DEPARTAMENTOS
// Organizado para facilitar la búsqueda y el filtrado
const CIUDADES_DB = [
  // ATLANTICO
  { val: 'barranquilla', label: 'Barranquilla', dept: 'atlantico' },
  { val: 'sabana-larga', label: 'Sabana Larga', dept: 'atlantico' },
  { val: 'baranoa', label: 'Baranoa', dept: 'atlantico' },
  { val: 'campeche', label: 'Campeche', dept: 'atlantico' },
  { val: 'campo-cruz', label: 'Campo de la Cruz', dept: 'atlantico' },
  { val: 'luruaco', label: 'Luruaco', dept: 'atlantico' },

  // CUNDINAMARCA
  { val: 'bogota', label: 'Bogotá', dept: 'cundinamarca' },
  { val: 'facatativa', label: 'Facatativá', dept: 'cundinamarca' },
  { val: 'fontibon', label: 'Fontibón', dept: 'cundinamarca' },
  { val: 'villeta', label: 'Villeta', dept: 'cundinamarca' },
  { val: 'guaduas', label: 'Guaduas', dept: 'cundinamarca' },
  { val: 'puerto-salgar', label: 'Puerto Salgar', dept: 'cundinamarca' },
  { val: 'alban', label: 'Albán', dept: 'cundinamarca' },
  { val: 'madrid', label: 'Madrid', dept: 'cundinamarca' },
  { val: 'mosquera', label: 'Mosquera', dept: 'cundinamarca' },

  // ANTIOQUIA
  { val: 'medellin', label: 'Medellín', dept: 'antioquia' },
  { val: 'caucasia', label: 'Caucasia', dept: 'antioquia' },
  { val: 'taraza', label: 'Tarazá', dept: 'antioquia' },
  { val: 'bello', label: 'Bello', dept: 'antioquia' },
  { val: 'yarumal', label: 'Yarumal', dept: 'antioquia' },
  { val: 'doradal', label: 'Doradal', dept: 'antioquia' },
  { val: 'marinilla', label: 'Marinilla', dept: 'antioquia' },
  { val: 'p-valdivia', label: 'Puerto Valdivia', dept: 'antioquia' },
  { val: 'don-matias', label: 'Don Matías', dept: 'antioquia' },
  { val: 'cisneros', label: 'Cisneros', dept: 'antioquia' },
  { val: 'san-luis', label: 'San Luis', dept: 'antioquia' },
  { val: 'arboletes', label: 'Arboletes', dept: 'antioquia' },
  { val: 'copacabana', label: 'Copacabana', dept: 'antioquia' },
  { val: 'llanos-cuiva', label: 'Llanos de Cuivá', dept: 'antioquia' },
  { val: 'rionegro', label: 'Rionegro', dept: 'antioquia' },

  // BOLIVAR
  { val: 'cartagena', label: 'Cartagena', dept: 'bolivar' },
  { val: 'magangue', label: 'Magangué', dept: 'bolivar' },
  { val: 'carmen-bolivar', label: 'El Carmen de Bolívar', dept: 'bolivar' },
  { val: 'mompox', label: 'Mompox', dept: 'bolivar' },
  { val: 'el-vizo', label: 'El Viso', dept: 'bolivar' },
  { val: 'san-juan-nep', label: 'San Juan Nepomuceno', dept: 'bolivar' },
  { val: 'talaigua', label: 'Talaigua', dept: 'bolivar' },
  { val: 'san-jacinto', label: 'San Jacinto', dept: 'bolivar' },
  { val: 'arjona', label: 'Arjona', dept: 'bolivar' },
  { val: 'maria-baja', label: 'María La Baja', dept: 'bolivar' },
  { val: 'carreto', label: 'Carreto', dept: 'bolivar' },
  { val: 'clemencia', label: 'Clemencia', dept: 'bolivar' },
  { val: 'bayunca', label: 'Bayunca', dept: 'bolivar' },
  { val: 'calamar', label: 'Calamar', dept: 'bolivar' },
  { val: 'cicuco', label: 'Cicuco', dept: 'bolivar' },
  { val: 'los-pendales', label: 'Los Pendales', dept: 'bolivar' },
  { val: 'mahates', label: 'Mahates', dept: 'bolivar' },
  { val: 'santa-catalina', label: 'Santa Catalina', dept: 'bolivar' },

  // CESAR
  { val: 'valledupar', label: 'Valledupar', dept: 'cesar' },
  { val: 'san-martin', label: 'San Martín', dept: 'cesar' },
  { val: 'bosconia', label: 'Bosconia', dept: 'cesar' },
  { val: 'aguachica', label: 'Aguachica', dept: 'cesar' },
  { val: 'codazzi', label: 'Codazzi', dept: 'cesar' },
  { val: 'jagua-ibrico', label: 'La Jagua de Ibirico', dept: 'cesar' },
  { val: 'curumani', label: 'Curumaní', dept: 'cesar' },
  { val: 'becerril', label: 'Becerril', dept: 'cesar' },
  { val: 'chiriguana', label: 'Cruce de Chiriguana', dept: 'cesar' },
  { val: 'el-copey', label: 'El Copey', dept: 'cesar' },
  { val: 'chimichagua', label: 'Chimichagua', dept: 'cesar' },
  { val: 'urimita', label: 'Urimita', dept: 'cesar' },

  // MAGDALENA
  { val: 'santa-marta', label: 'Santa Marta', dept: 'magdalena' },
  { val: 'cienaga', label: 'Ciénaga', dept: 'magdalena' },
  { val: 'plato', label: 'Plato', dept: 'magdalena' },
  { val: 'el-banco', label: 'El Banco', dept: 'magdalena' },
  { val: 'santa-ana', label: 'Santa Ana', dept: 'magdalena' },
  { val: 'aracatoca', label: 'Aracataca', dept: 'magdalena' },
  { val: 'tayrona', label: 'Tayrona', dept: 'magdalena' },
  { val: 'buritaca', label: 'Buritaca', dept: 'magdalena' },
  { val: 'tamalameque', label: 'Tamalameque', dept: 'magdalena' },

  // CORDOBA
  { val: 'monteria', label: 'Montería', dept: 'cordoba' },
  { val: 'lorica', label: 'Lorica', dept: 'cordoba' },
  { val: 'cerete', label: 'Cereté', dept: 'cordoba' },
  { val: 'sahagun', label: 'Sahagún', dept: 'cordoba' },
  { val: 'planeta-rica', label: 'Planeta Rica', dept: 'cordoba' },
  { val: 'chinu', label: 'Chinú', dept: 'cordoba' },
  { val: 'cienaga-oro', label: 'Ciénaga de Oro', dept: 'cordoba' },
  { val: 'san-antero', label: 'San Antero', dept: 'cordoba' },
  { val: 'monteelibano', label: 'Montelíbano', dept: 'cordoba' },
  { val: 'san-pelayo', label: 'San Pelayo', dept: 'cordoba' },

  // SUCRE
  { val: 'sincelejo', label: 'Sincelejo', dept: 'sucre' },
  { val: 'covenas', label: 'Coveñas', dept: 'sucre' },
  { val: 'corozal', label: 'Corozal', dept: 'sucre' },
  { val: 'san-onofre', label: 'San Onofre', dept: 'sucre' },
  { val: 'sampues', label: 'Sampués', dept: 'sucre' },
  { val: 'san-marcos', label: 'San Marcos', dept: 'sucre' },
  { val: 'palmitos', label: 'Los Palmitos', dept: 'sucre' },
  { val: 'betulia', label: 'San Juan de Betulia', dept: 'sucre' },
  
  // LA GUAJIRA
  { val: 'maicao', label: 'Maicao', dept: 'guajira' },
  { val: 'riohacha', label: 'Riohacha', dept: 'guajira' },
  { val: 'palomino', label: 'Palomino', dept: 'guajira' },
  { val: 'albania-guajira', label: 'Albania', dept: 'guajira' },
  { val: 'san-juan-cesar', label: 'San Juan del Cesar', dept: 'guajira' },
  { val: 'hatonuevo', label: 'Hatonuevo', dept: 'guajira' },
  { val: 'barrancas', label: 'Barrancas', dept: 'guajira' },
  { val: 'distraccion', label: 'Distracción', dept: 'guajira' },
  { val: 'carraipia', label: 'Carraipia', dept: 'guajira' },
  { val: 'dibulla', label: 'Dibulla', dept: 'guajira' },
  { val: 'paraguachon', label: 'Paraguachón', dept: 'guajira' },

  // SANTANDER
  { val: 'bucaramanga', label: 'Bucaramanga', dept: 'santander' },
  { val: 'barrancabermeja', label: 'Barrancabermeja', dept: 'santander' },
  { val: 'dagota', label: 'Dagota', dept: 'santander' },
  { val: 'p-araujo', label: 'Puerto Araujo', dept: 'santander' },
  { val: 'la-lisama', label: 'La Lisama', dept: 'santander' },
  { val: 'san-gil', label: 'San Gil', dept: 'santander' },
  { val: 'el-socorro', label: 'El Socorro', dept: 'santander' },
  { val: 'rio-negro', label: 'Río Negro', dept: 'santander' },
  { val: 'piedecuesta', label: 'Piedecuesta', dept: 'santander' },
  { val: 'barbosa', label: 'Barbosa', dept: 'santander' },
  { val: 'oiba', label: 'Oiba', dept: 'santander' },
  { val: 'el-playon', label: 'El Playón', dept: 'santander' },
  { val: 'olival', label: 'Olival', dept: 'santander' },
  { val: 'berlin', label: 'Berlín', dept: 'santander' },
  { val: 'cimitarra', label: 'Cimitarra', dept: 'santander' },
  { val: 'floridablanca', label: 'Floridablanca', dept: 'santander' },
  { val: 'giron', label: 'Girón', dept: 'santander' },
  { val: 'p-parra', label: 'Puerto Parra', dept: 'santander' },
  
  // VALLE DEL CAUCA
  { val: 'cali', label: 'Cali', dept: 'valle' },
  { val: 'buga', label: 'Buga', dept: 'valle' },
  { val: 'tulua', label: 'Tuluá', dept: 'valle' }
];

// 2. LISTA DE RUTAS PROHIBIDAS (Cercanía extrema / Transporte Urbano)
// Aquí definimos qué pares NO venderemos porque son muy cercanos.
const RUTAS_PROHIBIDAS = [
  // Santander Área Metropolitana
  ['bucaramanga', 'giron'],
  ['bucaramanga', 'floridablanca'],
  ['bucaramanga', 'piedecuesta'], // A veces se permite, pero si dices que no, lo quitamos. Si quieres permitirlo, borra esta línea.
  ['giron', 'floridablanca'],
  
  // Antioquia Área Metropolitana
  ['medellin', 'bello'],
  ['medellin', 'copacabana'],
  ['medellin', 'envigado'], // No estaba en lista pero por si acaso
  ['bello', 'copacabana'],

  // Bogotá Sabana Cercana
  ['bogota', 'madrid'],
  ['bogota', 'mosquera'],
  ['bogota', 'fontibon'],
  ['madrid', 'mosquera'],
  ['madrid', 'facatativa'],

  // Magdalena Cerca de Santa Marta
  ['santa-marta', 'mamatoco'],
  ['santa-marta', 'taganga'], // Si existiera
  
  // Sucre Cerca de Sincelejo
  ['sincelejo', 'corozal'], // Muy cerca a veces se considera urbano
  ['sincelejo', 'trinitaria'] // No estaba pero es cerca
];

/* ─── ESTADO GLOBAL ───────────────────────── */
let selectedRoute    = null;
let selectedSeats    = [];
let lastRenderedRoutes = [];

/* ─── HELPERS DE FORMATO ──────────────────── */
const fmt = n => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(n);
const fmtDate = s => { if (!s) return '—'; const [y, m, d] = s.split('-'); return `${d}/${m}/${y}`; };
const genRef = () => 'EDL-' + Math.random().toString(36).substr(2, 6).toUpperCase();
const pax = () => parseInt(document.getElementById('pasajeros').value) || 1;

/* ─── LÓGICA DE AUTOCOMPLETADO ────────────── */

function filtrarCiudades(tipo) {
  const inputId = tipo === 'origen' ? 'origen-input' : 'destino-input';
  const listId = tipo === 'origen' ? 'sugerencias-origen' : 'sugerencias-destino';
  const hiddenId = tipo === 'origen' ? 'origen-val' : 'destino-val';

  const input = document.getElementById(inputId);
  const list = document.getElementById(listId);
  const texto = input.value.toLowerCase();
  
  list.innerHTML = '';
  if (!texto) { list.style.display = 'none'; return; }

  const coincidencias = CIUDADES_DB.filter(c => c.label.toLowerCase().includes(texto));

  if (coincidencias.length > 0) {
    list.style.display = 'block';
    coincidencias.forEach(ciudad => {
      const li = document.createElement('li');
      li.textContent = ciudad.label;
      li.onclick = () => {
        document.getElementById(inputId).value = ciudad.label;
        document.getElementById(hiddenId).value = ciudad.val;
        list.style.display = 'none';
      };
      list.appendChild(li);
    });
  } else {
    list.style.display = 'none';
  }
}

document.addEventListener('click', function(e) {
  if (!e.target.closest('.field-group')) {
    document.getElementById('sugerencias-origen').style.display = 'none';
    document.getElementById('sugerencias-destino').style.display = 'none';
  }
});

/* ─── VALIDADOR DE RUTAS PROHIBIDAS ───────── */

function esRutaProhibida(origenVal, destinoVal) {
  // Verifica si el par existe en la lista negra (en cualquier orden)
  return RUTAS_PROHIBIDAS.some(par => 
    (par[0] === origenVal && par[1] === destinoVal) || 
    (par[1] === origenVal && par[0] === destinoVal)
  );
}

/* ─── GENERADOR DE RUTAS SIMULADAS ────────── */

function generarRutasSimuladas(origenVal, destinoVal, fecha) {
  const ciudadOrigen = CIUDADES_DB.find(c => c.val === origenVal)?.label || origenVal;
  const ciudadDestino = CIUDADES_DB.find(c => c.val === destinoVal)?.label || destinoVal;

  const cantidad = Math.floor(Math.random() * 3) + 3; // 3 a 5 rutas
  const rutasGeneradas = [];
  const EMPRESAS = ['Copetran', 'Berlinas del Fonce', 'Expreso Brasilia', 'Rapido Ochoa', 'Uniturco'];

  for (let i = 0; i < cantidad; i++) {
    const horaInicio = Math.floor(Math.random() * 18) + 5; 
    const minuto = Math.random() > 0.5 ? '00' : '30';
    const horaStr = `${horaInicio.toString().padStart(2, '0')}:${minuto}`;
    const duracionH = Math.floor(Math.random() * 8) + 4;
    const precioBase = Math.floor(Math.random() * 110000) + 40000;
    
    rutasGeneradas.push({
      id: Date.now() + i,
      origen: origenVal,
      destino: destinoVal,
      origen_n: ciudadOrigen,
      destino_n: ciudadDestino,
      hora: horaStr,
      duracion: `${duracionH}h`,
      precio: precioBase,
      empresa: EMPRESAS[Math.floor(Math.random() * EMPRESAS.length)],
      asientos_libres: Math.floor(Math.random() * 35) + 1,
      tipo: Math.random() > 0.5 ? 'Ejecutivo' : 'Estándar'
    });
  }
  return rutasGeneradas.sort((a, b) => a.hora.localeCompare(b.hora));
}

/* ─── FUNCIÓN PRINCIPAL DE BÚSQUEDA ───────── */

function buscarRutas() {
  const oriVal = document.getElementById('origen-val').value;
  const desVal = document.getElementById('destino-val').value;
  const fecha = document.getElementById('fecha').value;

  if (!oriVal || !desVal) {
    alert("Por favor selecciona una ciudad válida de la lista desplegable.");
    return;
  }

  if (oriVal === desVal) {
    alert("El origen y el destino no pueden ser la misma ciudad.");
    return;
  }

  // 1. VERIFICAR SI ES RUTA PROHIBIDA (CERCANÍA)
  if (esRutaProhibida(oriVal, desVal)) {
    alert(`Lo sentimos. La ruta entre ${CIUDADES_DB.find(c=>c.val===oriVal).label} y ${CIUDADES_DB.find(c=>c.val===desVal).label} es muy corta y no ofrecemos servicio de transporte público intermunicipal para este trayecto.`);
    document.getElementById('routes-container').innerHTML = '';
    document.getElementById('results-count').textContent = '0 opciones';
    return;
  }

  // 2. GENERAR RESULTADOS (SIMULACIÓN)
  // Como tenemos muchas ciudades, simularemos todas las búsquedas válidas para tener siempre datos
  const resultados = generarRutasSimuladas(oriVal, desVal, fecha);

  renderRoutes(resultados, fecha);
}

/* ─── RENDERIZADO EN PANTALLA ─────────────── */

function renderRoutes(rutas, fecha) {
  lastRenderedRoutes = rutas; // Guardar para selección posterior
  const container = document.getElementById('routes-container');
  const countEl   = document.getElementById('results-count');
  const titleEl   = document.getElementById('results-title');

  const origenTxt = document.getElementById('origen-input').value;
  const destinoTxt = document.getElementById('destino-input').value;
  if(origenTxt && destinoTxt) {
      titleEl.textContent = `Rutas: ${origenTxt} → ${destinoTxt}`;
  }

  countEl.textContent = `${rutas.length} opciones disponibles`;

  if (rutas.length === 0) {
    container.innerHTML = `<div class="empty-state"><h3>No hay rutas</h3></div>`;
    return;
  }

  container.innerHTML = rutas.map(r => {
    const badgeClass = r.asientos_libres > 10 ? 'ok' : r.asientos_libres > 3 ? 'low' : 'full';
    const badgeText = r.asientos_libres > 10 ? `${r.asientos_libres} disp.` : r.asientos_libres > 0 ? `¡Solo ${r.asientos_libres}!` : 'Agotado';

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
          <div class="detail-chip"><div class="label">Empresa</div><div class="val">${r.empresa}</div></div>
        </div>
        <div class="route-footer">
          <div><span class="seats-badge ${badgeClass}">${badgeText}</span></div>
          <button class="select-btn" onclick="event.stopPropagation(); seleccionarRuta(${r.id})">Ver Asientos →</button>
        </div>
      </div>`;
  }).join('');
}

/* ─── SELECCIÓN Y ASIENTOS ────────────────── */

function seleccionarRuta(id) {
  let route = lastRenderedRoutes.find(r => r.id === id);
  if (!route) return;

  selectedRoute = route;
  selectedSeats = [];

  document.querySelectorAll('.route-card').forEach(c => c.classList.remove('selected'));
  const card = document.getElementById(`card-${id}`);
  if(card) card.classList.add('selected');

  buildBus(selectedRoute.asientos_libres);
  updateSummary();

  if (window.innerWidth < 900) {
    document.getElementById('seat-panel').scrollIntoView({ behavior: 'smooth' });
  }
}

function buildBus(libres) {
  const total = 40;
  const ocupados = [];
  while (ocupados.length < total - libres) {
    const n = Math.ceil(Math.random() * total);
    if (!ocupados.includes(n)) ocupados.push(n);
  }
  
  selectedSeats = [];
  updateSeatInfo();

  const body = document.getElementById('bus-body');
  body.innerHTML = '';

  for (let row = 0; row < 10; row++) {
    const rowEl = document.createElement('div');
    rowEl.className = 'seat-row';
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
      el.className = 'seat';
      el.textContent = seatNum;
      el.dataset.seat = seatNum;

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

function toggleSeat(el, num) {
  const max = pax();
  if (el.classList.contains('selected')) {
    el.classList.remove('selected');
    selectedSeats = selectedSeats.filter(s => s !== num);
  } else {
    if (selectedSeats.length >= max) {
      const old = selectedSeats.shift();
      document.querySelector(`.seat[data-seat="${old}"]`)?.classList.remove('selected');
    }
    el.classList.add('selected');
    selectedSeats.push(num);
  }
  updateSeatInfo();
  updateSummary();
}

function updateSeatInfo() {
  const info = document.getElementById('seat-info');
  if (!selectedRoute) { info.textContent = 'Elige una ruta primero'; return; }
  if (selectedSeats.length === 0) { info.textContent = 'Selecciona tus asientos en el mapa'; return; }
  info.innerHTML = `Asiento(s): <strong>${selectedSeats.join(', ')}</strong>`;
}

function updateSummary() {
  if (!selectedRoute) return;
  const pasajeros = pax();
  const total = selectedRoute.precio * pasajeros;
  const fecha = document.getElementById('fecha').value;

  document.getElementById('sum-ruta').textContent = `${selectedRoute.origen_n} → ${selectedRoute.destino_n}`;
  document.getElementById('sum-fecha').textContent = fmtDate(fecha);
  document.getElementById('sum-asientos').textContent = selectedSeats.length ? selectedSeats.join(', ') : '—';
  document.getElementById('sum-pasajeros').textContent = pasajeros;
  document.getElementById('sum-total').textContent = fmt(total);
}

/* ─── FORMATEO Y COMPRA ───────────────────── */
function formatCard(el) {
  let v = el.value.replace(/\D/g, '').substring(0, 16);
  el.value = v.replace(/(.{4})/g, '$1 ').trim();
}
function formatExp(el) {
  let v = el.value.replace(/\D/g, '');
  if (v.length > 2) v = v.substring(0, 2) + '/' + v.substring(2, 4);
  el.value = v;
}

function procesarCompra() {
  if (!selectedRoute) return alert('Selecciona una ruta.');
  if (selectedSeats.length < pax()) return alert(`Selecciona ${pax()} asiento(s).`);
  if (!document.getElementById('f-nombre').value) return alert('Ingresa tu nombre.');
  if (!document.getElementById('f-card').value) return alert('Datos de tarjeta incompletos.');

  const btn = document.getElementById('btn-buy');
  const spinner = document.getElementById('spinner');
  const icon = btn.querySelector('svg');

  btn.disabled = true;
  spinner.style.display = 'block';
  icon.style.display = 'none';

  setTimeout(() => {
    btn.disabled = false;
    spinner.style.display = 'none';
    icon.style.display = '';
    document.getElementById('booking-ref').textContent = genRef();
    document.getElementById('modal').classList.add('open');
  }, 1500);
}

function cerrarModal() {
  document.getElementById('modal').classList.remove('open');
  location.reload();
}

/* ─── INIT ────────────────────────────────── */
(function init() {
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('fecha').min = today;
  document.getElementById('fecha').value = today;
})();
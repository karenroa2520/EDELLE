// ══════════════════════════════════════════════════════════════
//  EDELLE — Lógica de formulario, pago, factura e itinerario
//  Archivo: logica.js
//  Dependencia: html2pdf (CDN en el HTML)
// ══════════════════════════════════════════════════════════════


// ── 1. DATOS DE DEMOSTRACIÓN ──────────────────────────────────
//  Reemplaza con los datos reales que vienen de tu API.
//  Usa cargarDatosDesdeAPI(hotel, actividades) para inyectarlos.

let HOTEL_SELECCIONADO = {
  id: "hotel_001",
  nombre: "Hotel Casa Dann Carlton",
  ciudad: "Bogotá",
  departamento: "Cundinamarca",
  precio_por_noche: 250000
};

let ACTIVIDADES_SELECCIONADAS = [
  {
    id: "act_001",
    nombre: "Tour en bicicleta por La Candelaria",
    ciudad: "Bogotá",
    precio: 45000,
    duracion_horas: 3,
    hora_sugerida: "09:00",
    dia_sugerido: 1
  },
  {
    id: "act_002",
    nombre: "Visita al Museo del Oro",
    ciudad: "Bogotá",
    precio: 15000,
    duracion_horas: 2,
    hora_sugerida: "14:00",
    dia_sugerido: 1
  },
  {
    id: "act_003",
    nombre: "Mirador de Monserrate",
    ciudad: "Bogotá",
    precio: 30000,
    duracion_horas: 4,
    hora_sugerida: "10:00",
    dia_sugerido: 2
  }
];

// ── FUNCIÓN PARA RECIBIR DATOS DESDE TU API ───────────────────
//  Llámala cuando el usuario haya seleccionado hotel y actividades.
//  Ejemplo de uso: cargarDatosDesdeAPI(hotelObj, actividadesArray);

function cargarDatosDesdeAPI(hotel, actividades) {
  HOTEL_SELECCIONADO = hotel;
  ACTIVIDADES_SELECCIONADAS = actividades;
  renderizarResumenViaje();
  actualizarCostos();
}


// ── 2. ESTADO ─────────────────────────────────────────────────
let noches = 1;


// ── 3. MUNICIPIOS POR DEPARTAMENTO ───────────────────────────
const MUNICIPIOS = {
  "Cundinamarca":    ["Bogotá", "Soacha", "Zipaquirá", "Facatativá", "Chía"],
  "Antioquia":       ["Medellín", "Bello", "Itagüí", "Envigado", "Sabaneta"],
  "Valle del Cauca": ["Cali", "Buenaventura", "Palmira", "Tuluá", "Cartago"],
  "Santander":       ["Bucaramanga", "Floridablanca", "Girón", "Piedecuesta", "Barrancabermeja"],
  "Bolívar":         ["Cartagena", "Magangué", "Mompós", "Turbaco", "El Carmen de Bolívar"],
  "Atlántico":       ["Barranquilla", "Soledad", "Malambo", "Sabanagrande", "Puerto Colombia"]
};

document.getElementById("sel-departamento").addEventListener("change", function () {
  const muns = MUNICIPIOS[this.value] || [];
  const sel = document.getElementById("sel-municipio");
  sel.innerHTML = '<option value="">Selecciona...</option>' +
    muns.map(m => `<option value="${m}">${m}</option>`).join("");
});


// ── 4. FORMATEO DE MONEDA ─────────────────────────────────────
function formatPeso(valor) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency", currency: "COP", minimumFractionDigits: 0
  }).format(valor);
}


// ── 5. CONTROL DE NOCHES ──────────────────────────────────────
function cambiarNoches(delta) {
  noches = Math.max(1, Math.min(30, noches + delta));
  document.getElementById("display-noches").textContent = noches;
  actualizarCostos();
}


// ── 6. CALCULAR TOTALES ───────────────────────────────────────
function calcularTotales() {
  const costoHotel = HOTEL_SELECCIONADO.precio_por_noche * noches;
  const costoActs  = ACTIVIDADES_SELECCIONADAS.reduce((s, a) => s + a.precio, 0);
  const subtotal   = costoHotel + costoActs;
  const iva        = Math.round(subtotal * 0.19);
  const total      = subtotal + iva;
  return { costoHotel, costoActs, subtotal, iva, total };
}

function actualizarCostos() {
  const t = calcularTotales();
  const lista = document.getElementById("lista-costos");

  const actsHTML = ACTIVIDADES_SELECCIONADAS.map(a =>
    `<div class="costo-item">
      <div>
        <div class="costo-label">${a.nombre}</div>
        <div class="costo-sub">Actividad · ${a.duracion_horas}h</div>
      </div>
      <div class="costo-valor">${formatPeso(a.precio)}</div>
    </div>`
  ).join("");

  lista.innerHTML = `
    <div class="costo-item">
      <div>
        <div class="costo-label">${HOTEL_SELECCIONADO.nombre}</div>
        <div class="costo-sub">${noches} noche(s) × ${formatPeso(HOTEL_SELECCIONADO.precio_por_noche)}</div>
      </div>
      <div class="costo-valor">${formatPeso(t.costoHotel)}</div>
    </div>
    ${actsHTML}
    <div class="costo-item">
      <div class="costo-label" style="color:var(--grey)">IVA (19%)</div>
      <div class="costo-valor" style="color:var(--grey)">${formatPeso(t.iva)}</div>
    </div>
  `;

  document.getElementById("display-total").textContent = formatPeso(t.total);
}


// ── 7. RESUMEN DEL VIAJE EN LA PARTE SUPERIOR ─────────────────
function renderizarResumenViaje() {
  const r = document.getElementById("resumen-viaje");
  r.innerHTML = `
    <span class="resumen-titulo">Tu selección</span>
    <span class="chip">🏨 ${HOTEL_SELECCIONADO.nombre}</span>
    <span class="chip gold">📍 ${HOTEL_SELECCIONADO.ciudad}</span>
    ${ACTIVIDADES_SELECCIONADAS.map(a =>
      `<span class="chip">🎯 ${a.nombre}</span>`
    ).join("")}
  `;
}


// ── 8. CAMBIAR LABEL SEGÚN MÉTODO DE PAGO ────────────────────
function toggleCamposCuenta() {
  const metodo = document.getElementById("sel-metodo").value;
  const lbl = document.getElementById("lbl-cuenta");
  if (metodo === "PSE") lbl.textContent = "Número de cuenta bancaria";
  else if (metodo === "Nequi" || metodo === "Daviplata") lbl.textContent = "Número de celular";
  else lbl.textContent = "Número de cuenta / tarjeta";
}


// ── 9. VALIDACIONES ───────────────────────────────────────────
function validarFormulario() {
  let ok = true;

  function check(id, errId, condicion) {
    const el  = document.getElementById(id);
    const err = document.getElementById(errId);
    if (!condicion) {
      el.classList.add("error");
      err.classList.add("visible");
      ok = false;
    } else {
      el.classList.remove("error");
      err.classList.remove("visible");
    }
  }

  check("inp-nombre",       "err-nombre",       document.getElementById("inp-nombre").value.trim() !== "");
  check("inp-apellido",     "err-apellido",      document.getElementById("inp-apellido").value.trim() !== "");
  check("inp-telefono",     "err-telefono",      /^\d{7,15}$/.test(document.getElementById("inp-telefono").value.trim()));
  check("sel-departamento", "err-departamento",  document.getElementById("sel-departamento").value !== "");
  check("sel-municipio",    "err-municipio",     document.getElementById("sel-municipio").value !== "");
  check("sel-metodo",       "err-metodo",        document.getElementById("sel-metodo").value !== "");
  check("inp-cuenta",       "err-cuenta",        document.getElementById("inp-cuenta").value.trim() !== "");

  // Validar checkbox de términos
  const terminos = document.getElementById("chk-terminos");
  const errTer   = document.getElementById("err-terminos");
  if (!terminos.checked) {
    errTer.classList.add("visible");
    ok = false;
  } else {
    errTer.classList.remove("visible");
  }

  // Validar que hotel y actividades sean de la misma ciudad
  if (ACTIVIDADES_SELECCIONADAS.length > 0) {
    const ciudadHotel = HOTEL_SELECCIONADO.ciudad.toLowerCase();
    const actsDif = ACTIVIDADES_SELECCIONADAS.filter(a => a.ciudad.toLowerCase() !== ciudadHotel);
    if (actsDif.length > 0) {
      mostrarToast("El hotel y las actividades deben ser de la misma ciudad.", true);
      ok = false;
    }
  }

  return ok;
}


// ── 10. GENERAR NÚMERO DE FACTURA ÚNICO ───────────────────────
function generarNumeroFactura() {
  return `EDL-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 900 + 100)}`;
}


// ── 11. GENERAR ITINERARIO ────────────────────────────────────
//  Agrupa actividades por día y las ordena por hora_sugerida.

function generarItinerario() {
  const diasMap = {};

  ACTIVIDADES_SELECCIONADAS.forEach(act => {
    const dia = act.dia_sugerido || 1;
    if (!diasMap[dia]) diasMap[dia] = [];
    diasMap[dia].push(act);
  });

  Object.keys(diasMap).forEach(dia => {
    diasMap[dia].sort((a, b) => a.hora_sugerida.localeCompare(b.hora_sugerida));
  });

  return Object.keys(diasMap).map(Number).sort((a, b) => a - b).map(d => ({
    dia: d,
    actividades: diasMap[d].map(act => {
      const [h, m] = act.hora_sugerida.split(":").map(Number);
      const ini = new Date();
      ini.setHours(h, m, 0);
      const fin = new Date(ini.getTime() + act.duracion_horas * 3600000);
      return {
        nombre:      act.nombre,
        hora_inicio: act.hora_sugerida,
        hora_fin:    fin.toTimeString().slice(0, 5),
        duracion:    `${act.duracion_horas}h`,
        precio:      act.precio
      };
    })
  }));
}


// ── 12. RENDERIZAR FACTURA EN EL HTML ─────────────────────────
function renderizarFactura({ factura, formulario, totales }) {
  const fac = document.getElementById("factura-contenedor");

  const actsRows = ACTIVIDADES_SELECCIONADAS.map(a => `
    <tr>
      <td>${a.nombre}</td>
      <td>${a.ciudad}</td>
      <td>${a.duracion_horas}h</td>
      <td style="text-align:right;font-weight:600">${formatPeso(a.precio)}</td>
    </tr>
  `).join("");

  fac.innerHTML = `
    <div class="fac-header">
      <div>
        <div class="fac-brand">EDELLE<span>.</span></div>
        <div style="font-size:13px;color:#777;margin-top:6px;">Tu agencia de viajes de confianza</div>
      </div>
      <div class="fac-meta">
        <strong>FACTURA</strong>
        N° ${factura.numero}<br/>
        Fecha: ${factura.fecha}
      </div>
    </div>

    <div class="fac-grid">
      <div class="fac-section">
        <h4>Datos del viajero</h4>
        <p>
          <strong>${formulario.nombre} ${formulario.apellido}</strong><br/>
          Tel: ${formulario.telefono}<br/>
          ${formulario.municipio}, ${formulario.departamento}
        </p>
      </div>
      <div class="fac-section">
        <h4>Método de pago</h4>
        <p>
          ${formulario.metodo_pago}<br/>
          Cuenta: ${formulario.cuenta}
        </p>
      </div>
    </div>

    <table class="fac-table">
      <thead>
        <tr>
          <th>Concepto</th>
          <th>Ciudad</th>
          <th>Duración</th>
          <th style="text-align:right">Valor</th>
        </tr>
      </thead>
      <tbody>
        <tr class="hotel-row">
          <td>${HOTEL_SELECCIONADO.nombre} (${noches} noche${noches > 1 ? 's' : ''})</td>
          <td>${HOTEL_SELECCIONADO.ciudad}</td>
          <td>${noches} noche${noches > 1 ? 's' : ''}</td>
          <td style="text-align:right;font-weight:600">${formatPeso(totales.costoHotel)}</td>
        </tr>
        ${actsRows}
      </tbody>
    </table>

    <div class="fac-totales">
      <div class="fila"><span>Subtotal</span><span>${formatPeso(totales.subtotal)}</span></div>
      <div class="fila"><span>IVA (19%)</span><span>${formatPeso(totales.iva)}</span></div>
      <div class="fila total"><span>TOTAL</span><span>${formatPeso(totales.total)}</span></div>
    </div>

    <div class="fac-footer">
      Gracias por viajar con <strong>EDELLE</strong>. ¡Que disfrutes tu aventura!<br/>
      Este documento es válido como comprobante de pago.
    </div>
  `;
}


// ── 13. RENDERIZAR ITINERARIO EN EL HTML ──────────────────────
function renderizarItinerario(itin) {
  const cont = document.getElementById("itinerario-contenedor");

  const diasHTML = itin.map(dia => `
    <div class="itin-dia">
      <div class="itin-dia-titulo">Día ${dia.dia} — ${HOTEL_SELECCIONADO.ciudad}</div>
      ${dia.actividades.map(act => `
        <div class="itin-act">
          <div class="itin-hora">🕐 ${act.hora_inicio} – ${act.hora_fin}</div>
          <div class="itin-nombre">${act.nombre}</div>
          <div class="itin-dur">${act.duracion}</div>
          <div class="itin-precio">${formatPeso(act.precio)}</div>
        </div>
      `).join("")}
    </div>
  `).join("");

  cont.innerHTML = `
    <div class="itin-header">
      <h2>Tu itinerario en ${HOTEL_SELECCIONADO.ciudad}</h2>
      <p>🏨 ${HOTEL_SELECCIONADO.nombre} · ${noches} noche${noches > 1 ? 's' : ''}</p>
    </div>
    ${diasHTML}
  `;
}


// ── 14. DESCARGAR FACTURA COMO PDF ────────────────────────────
//  Requiere: <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>

function descargarFacturaPDF() {
  const el = document.getElementById("factura-contenedor");
  html2pdf().set({
    margin:     12,
    filename:   `factura-edelle-${Date.now()}.pdf`,
    image:      { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF:      { unit: "mm", format: "a4", orientation: "portrait" }
  }).from(el).save();
}


// ── 15. CONTROL DE TABS ───────────────────────────────────────
function cambiarTab(id, btn) {
  document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
  document.querySelectorAll(".tab-panel").forEach(p => p.classList.remove("active"));
  btn.classList.add("active");
  document.getElementById("tab-" + id).classList.add("active");
}


// ── 16. TOAST DE NOTIFICACIÓN ─────────────────────────────────
function mostrarToast(msg, esError = false) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.className = "toast" + (esError ? " error-toast" : "") + " show";
  setTimeout(() => t.classList.remove("show"), 3500);
}


// ── 17. PROCESAR COMPRA — FUNCIÓN PRINCIPAL ───────────────────
//  Se llama al dar clic en "CONFIRMAR Y PAGAR"

async function procesarCompra() {
  // Paso 1: validar todo antes de procesar
  if (!validarFormulario()) return;

  // Paso 2: mostrar estado de carga
  const btn = document.getElementById("btn-pagar");
  btn.disabled = true;
  btn.innerHTML = '<span class="spinner"></span>Procesando...';

  // Paso 3: simular llamada a pasarela de pago
  //  → Reemplaza este setTimeout con tu llamada real a la API de pago.
  //  → Ejemplo con fetch:
  //    const res = await fetch("/api/pagos", { method: "POST", body: JSON.stringify(payload) });
  //    const data = await res.json();
  //    if (!data.aprobado) { mostrarToast("Pago rechazado.", true); return; }
  await new Promise(r => setTimeout(r, 2000));

  // Paso 4: recoger datos del formulario
  const formulario = {
    nombre:       document.getElementById("inp-nombre").value.trim(),
    apellido:     document.getElementById("inp-apellido").value.trim(),
    telefono:     document.getElementById("inp-telefono").value.trim(),
    departamento: document.getElementById("sel-departamento").value,
    municipio:    document.getElementById("sel-municipio").value,
    metodo_pago:  document.getElementById("sel-metodo").value,
    cuenta:       document.getElementById("inp-cuenta").value.trim()
  };

  // Paso 5: calcular, generar y renderizar
  const totales    = calcularTotales();
  const itinerario = generarItinerario();
  const factura    = {
    numero: generarNumeroFactura(),
    fecha: new Date().toLocaleDateString("es-CO", { day: "2-digit", month: "long", year: "numeric" })
  };

  renderizarFactura({ factura, formulario, totales });
  renderizarItinerario(itinerario);

  // Paso 6: guardar en localStorage (persistencia de sesión)
  localStorage.setItem("edelle_factura",    JSON.stringify({ factura, formulario, totales }));
  localStorage.setItem("edelle_itinerario", JSON.stringify(itinerario));

  // Paso 7: mostrar sección de resultados con scroll suave
  const sec = document.getElementById("seccion-resultados");
  sec.style.display = "block";
  sec.scrollIntoView({ behavior: "smooth" });

  mostrarToast("✅ ¡Pago confirmado! Tu viaje está listo.");

  // Paso 8: restaurar botón
  btn.disabled = false;
  btn.textContent = "CONFIRMAR Y PAGAR";
}


// ── INICIALIZAR AL CARGAR LA PÁGINA ──────────────────────────
renderizarResumenViaje();
actualizarCostos();
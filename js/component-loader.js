// Lista de componentes que queremos cargar

const COMPONENTES = [
  "navigation",
  "hero",
  "featured-article",
  "news-grid",
  "esports",
  "contact",
  "footer",
];

let componentesCargados = 0;

const buscarElemento = (id) => {
  console.log(`Buscando el elemento: ${id}`);

  const elemento = document.getElementById(id);

  if (elemento) {
    console.log(`✅  Elemento encontrado: ${id}`);
    return elemento;
  } else {
    console.log(`❌ Elemento no encontrado: ${id}`);
    return null;
  }
};

const cambiarContenido = function (elemento, nuevoContenido) {
  console.log("✏️ Cambiando contenido...");

  elemento.innerHTML = nuevoContenido;

  console.log("✅ Contenido cambiado");
};

function mostrarCargando(elemento, nombreComponente) {
  const mensajeCargando = `
    <div style="text-align: center; padding: 20px;">
      <p>⏳ Cargando ${nombreComponente}...</p>
    </div>
  `;
  cambiarContenido(elemento, mensajeCargando);
}

async function traerContenido(nombreArchivo) {
  console.log(`📡 Pidiendo el archivo: ${nombreArchivo}`);

  try {
    const respuesta = await fetch(`./components/${nombreArchivo}.html`);

    if (respuesta.ok) {
      const contenido = await respuesta.text();
      console.log(`📦 Archivo recibido: ${nombreArchivo}`);
      return contenido;
    } else {
      console.log(`❌ Error al recibir el archivo: ${nombreArchivo}`);
      return null;
    }
  } catch (error) {
    console.log("💥 ERROR: ", error.message);
    return null;
  }
}

async function cargarComponente(nombreComponente) {
  console.log(`🚀 Cargando componente: ${nombreComponente}`);

  const contenedor = buscarElemento(`${nombreComponente}-component`);
  if (!contenedor) {
    console.log(
      `❌ No se encontró el contenedor para el componente: ${nombreComponente}`
    );
    return false;
  }

  mostrarCargando(contenedor, nombreComponente);

  const contenido = await traerContenido(nombreComponente);
  if (!contenido) {
    cambiarContenido(
      contenedor,
      `
      <div style="color: red; text-align: center; padding: 20px;">
        <p>❌ Error al cargar el componente ${nombreComponente}</p>
      </div>
      `
    );
  }

  cambiarContenido(contenedor, contenido);

  componentesCargados++;
  console.log(`✅ Componente ${nombreComponente} (${componentesCargados}/${COMPONENTES.length})`);

  return true;
}

async function cargarTodosLosComponentes() {
  console.log('🎯 Iniciando carga de todos los componentes...');

  componentesCargados = 0;

  for (let i = 0; i < COMPONENTES.length; i++) {
    const nombreComponente = COMPONENTES[i];
    console.log(`🔄 Cargando ${i + 1}/${COMPONENTES.length}: ${nombreComponente}`);

    await cargarComponente(nombreComponente);

  }

  console.log('✅ Todos los componentes cargados');
}

cargarTodosLosComponentes();


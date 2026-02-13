// ========== GENERAR CERTIFICADO REAL (CON DATOS DEL FORMULARIO) ========== //
function generarCertificadoReal() {
    const tipo = datosUsuario.tipo_certificado;
    const documento = datosUsuario.documento_identidad;
    const numeroEstudiante = datosUsuario.numero_estudiante;
    const numeroPrograma = datosUsuario.numero_programa;

    if (!tipo || !documento) {
        console.log('⚠️ Faltan datos para generar certificado');
        return;
    }

    // DATOS REALES DEL USUARIO (aquí se conectaría con tu API)
    const datos = {
        nombre: "Daniel García Pérez", // ← Cambiar por datos de API
        documento: documento,
        programa: "Tecnología en Desarrollo de Software", // ← Cambiar por datos de API
        snies: numeroPrograma, // Usar el número de programa del formulario
        semestre: "Quinto Semestre", // ← Cambiar por datos de API
        periodo: "2025-1",
        fecha_expedicion: new Date().toISOString().split('T')[0],
        fecha_inicio: "2023-02-15", // ← Cambiar por datos de API
        fecha_fin: "2025-12-10", // ← Cambiar por datos de API
        jornada: "Diurna" // ← Cambiar por datos de API
    };

    const html = construirHTMLCertificado(tipo, datos, numeroEstudiante);
    const certificadoElement = document.getElementById('certificadoPreview') || document.querySelector('.certificado');
    if (certificadoElement) {
        certificadoElement.innerHTML = html;
    }
    console.log('✅ Certificado REAL generado exitosamente');
}

// ========== GENERAR CERTIFICADO DEMO (DATOS DE EJEMPLO) ========== //
function generarCertificadoDemo(tipoCertificado = 'sencillo') {
    // DATOS FICTICIOS PARA DEMOSTRACIÓN
    const datosDemo = {
        nombre: "************ ******* ******",
        documento: "**********",
        programa: "*************** ** *********** ** ********",
        snies: "*******",
        semestre: "****** ********",
        periodo: "****-*",
        fecha_expedicion: new Date().toISOString().split('T')[0],
        fecha_inicio: "****-**-**",
        fecha_fin: "****-**-**",
        jornada: "******"
    };

    const numeroEstudianteDemo = "**********";
    const html = construirHTMLCertificado(tipoCertificado, datosDemo, numeroEstudianteDemo);
    const certificadoElement = document.getElementById('certificadoPreview') || document.querySelector('.certificado');
    if (certificadoElement) {
        certificadoElement.innerHTML = html;
    }
    console.log('📄 Certificado DEMO generado');
}

function construirHTMLCertificado(tipo, datos, numeroEstudiante) {
    let html = '';

    const header = `<div class="certificado-header" style="font-size: 0.7rem;">
        <div class="certificado-title" style="text-align: center; margin: 10px 0; font-weight: bold;">${obtenerTitulo(tipo)}</div>
        <div class="certificado-institution" style="text-align: center; margin: 10px 0; font-weight: bold; font-size: 0.65rem;">LA VICERRECTORA ACADÉMICA<br>CORPORACIÓN ESCUELA TECNOLÓGICA DEL ORIENTE</div>
        <div class="certificado-nit" style="text-align: center; margin: 5px 0; font-size: 0.6rem;">NIT: 804.006.527-3</div>
    </div>
    <div class="hace-constar" style="text-align: center; margin: 10px 0; font-weight: bold; font-size: 0.7rem;">HACE CONSTAR:</div>`;

    html = header + `<div class="certificado-body" style="font-size: 0.65rem; line-height: 1.4;">
        <p>Que, <strong>${datos.nombre}</strong>, identificado(a) con número de documento <strong>${datos.documento}</strong> (Código: ${numeroEstudiante}), se encuentra matriculado(a) en el programa <strong>${datos.programa}</strong>, aprobado por el Ministerio de Educación según Snies <strong>${datos.snies}</strong>.</p>
        <p style="margin-top: 15px;">Actualmente cursa el <strong>${datos.semestre}</strong> en el periodo académico <strong>${datos.periodo}</strong>, en jornada <strong>${datos.jornada}</strong>.</p>
        <p style="margin-top: 15px;">Se expide a solicitud del interesado(a) en Bucaramanga a los <strong>${formatearFecha(datos.fecha_expedicion)}</strong>.</p>
    </div>`;

    html += `<div class="certificado-footer" style="margin-top: 30px; text-align: center; font-size: 0.6rem;">
        <div class="firma-line" style="border-top: 1px solid #000; width: 150px; margin: 0 auto 5px;"></div>
        <div class="firma-nombre" style="font-weight: bold;">MAGDA CAROLINA REYES RINCÓN</div>
        <div class="firma-cargo">Vicerrectora Académica</div>
    </div>`;

    return html;
}

// ========== FUNCIONES AUXILIARES ========== //
function obtenerTitulo(tipo) {
    const titulos = {
        'sencillo': 'CERTIFICADO DE ESTUDIO',
        'notas': 'CERTIFICADO DE CALIFICACIONES',
        'fechas': 'CERTIFICADO CON CALENDARIO ACADÉMICO',
        'fechas_jornada': 'CERTIFICADO CON FECHAS Y JORNADA',
        'pension': 'CERTIFICADO PARA PENSIÓN',
        'homologacion': 'CERTIFICADO DE HOMOLOGACIÓN',
        'grado': 'CERTIFICADO DE GRADO',
        'conducta': 'CERTIFICADO DE BUENA CONDUCTA',
        'horario': 'CERTIFICADO CON HORARIO',
        'practica': 'CERTIFICADO DE PRÁCTICA',
    };

    return titulos[tipo] || 'CERTIFICADO ACADÉMICO';
}

function formatearFecha(fecha) {
    if (!fecha) return "";
    const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(fecha + 'T00:00:00').toLocaleDateString('es-ES', opciones);
}

// ========== WRAPPER PARA MANTENER COMPATIBILIDAD ==========
// Esta función decide cuál certificado generar
function generarCertificado() {
    // Si hay datos del usuario, generar certificado REAL
    if (datosUsuario && datosUsuario.documento_identidad && datosUsuario.tipo_certificado) {
        generarCertificadoReal();
    } else {
        // Si no hay datos, mostrar certificado DEMO
        generarCertificadoDemo();
    }
}

// ========== CÓMO USAR LAS FUNCIONES ==========

// OPCIÓN 1: Generar certificado DEMO al cargar la página
window.addEventListener('load', function() {
    // Muestra un certificado de ejemplo con asteriscos
    setTimeout(() => {
        generarCertificadoDemo('sencillo');
    }, 500);
});

// OPCIÓN 2: Generar certificado DEMO cuando cambie el tipo
document.addEventListener('change', function(e) {
    if (e.target && (e.target.id === 'tipo' || e.target.id === 'tipoCertificado')) {
        if (e.target.value) {
            // Mostrar preview con datos ficticios
            generarCertificadoDemo(e.target.value);
        }
    }
});

console.log('Módulo de generación de certificados cargado');
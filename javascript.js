document.getElementById('registroForm').addEventListener('submit', function(e) {
    e.preventDefault();
    resetErrors();
    
    const datosCliente = {
        nombre: document.getElementById('nombre').value.trim(),
        apellido: document.getElementById('apellido').value.trim(),
        cedula: document.getElementById('cedula').value.trim(),
        email: document.getElementById('email').value.trim(),
        telefono: document.getElementById('telefono').value.trim(),
        genero: document.getElementById('genero').value
    };

    const errores = validarDatos(datosCliente);
    
    if(Object.keys(errores).length === 0) {
        mostrarResultado(datosCliente);
        this.reset();
    } else {
        mostrarErrores(errores);
    }
});

function validarDatos(datos) {
    const errores = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/;

    if(!datos.nombre) {
        errores.nombre = "El nombre es obligatorio";
    } else if(!soloLetras.test(datos.nombre)) {
        errores.nombre = "Solo se permiten letras y espacios";
    }

    if(!datos.apellido) {
        errores.apellido = "El apellido es obligatorio";
    } else if(!soloLetras.test(datos.apellido)) {
        errores.apellido = "Solo se permiten letras y espacios";
    }

    if(!datos.cedula) {
        errores.cedula = "La cédula es obligatoria";
    } else if(!/^\d{10}$/.test(datos.cedula)) {
        errores.cedula = "Debe tener 10 dígitos numéricos";
    }

    if(!datos.email) {
        errores.email = "El email es obligatorio";
    } else if(!emailRegex.test(datos.email)) {
        errores.email = "Formato de email inválido";
    }

    if(datos.telefono && !/^\d{10}$/.test(datos.telefono)) {
        errores.telefono = "Debe tener 10 dígitos numéricos";
    }

    if(!datos.genero) {
        errores.genero = "Debe seleccionar un género";
    }

    return errores;
}

function resetErrors() {
    document.querySelectorAll('.error').forEach(error => {
        error.style.display = 'none';
        error.textContent = '';
    });
}

function mostrarErrores(errores) {
    for(const campo in errores) {
        const errorElement = document.getElementById(`error${campo.charAt(0).toUpperCase() + campo.slice(1)}`);
        if(errorElement) {
            errorElement.textContent = errores[campo];
            errorElement.style.display = 'block';
        }
    }
}

function mostrarResultado(datos) {
    const resultadoDiv = document.getElementById('resultado');
    const generos = {'M': 'Masculino', 'F': 'Femenino', 'O': 'Otro'};
    
    resultadoDiv.innerHTML = `
        <h3>Registro Exitoso:</h3>
        <p>Nombre: ${datos.nombre} ${datos.apellido}</p>
        <p>Cédula: ${datos.cedula}</p>
        <p>Email: ${datos.email}</p>
        <p>Teléfono: ${datos.telefono || 'No especificado'}</p>
        <p>Género: ${generos[datos.genero] || 'No especificado'}</p>
    `;
    resultadoDiv.style.display = 'block';
}
// Cargar nombre, apellido y email al iniciar
document.addEventListener("DOMContentLoaded", () => {
    const nombreUsuario = localStorage.getItem("usuario");
    const apellidoUsuario = localStorage.getItem("apellido");
    const emailUsuario = localStorage.getItem("email");
    const telefonoUsuario = localStorage.getItem("telefono");


     if (nombreUsuario) {
        document.getElementById("nombre-real-completo").textContent = nombreUsuario + " " + apellidoUsuario;
        document.getElementById("nombre-usuario-perfil").textContent = nombreUsuario;
     }

     if (emailUsuario) {
        document.getElementById("email-usuario").textContent = emailUsuario;
     }

     if (telefonoUsuario){
        document.getElementById("telefono-usuario").textContent = telefonoUsuario;
     }

    });

// Modo oscuro - claro
const toggle = document.getElementById('toggle');
if (toggle) {
    // Cargar modo oscuro si está activado
    if (localStorage.getItem('modoOscuro') === 'true') {
        document.body.classList.add('dark');
        toggle.checked = true;
    }
    
    // Guardar cuando cambie
    toggle.addEventListener('change', function(e) {
        document.body.classList.toggle('dark', this.checked);
        localStorage.setItem('modoOscuro', this.checked);
    });
}

// Editar imagen de perfil
const input = document.getElementById("boton-editar-imagen-perfil");
const preview = document.getElementById("foto-perfil");

input.addEventListener("change", () => {
    const archivo = input.files[0];                                             
    if (archivo){
        const lector = new FileReader();                                        
        lector.onload = function(e) {                                          
            preview.src = e.target.result;                                     
            localStorage.setItem("imagenPerfil", e.target.result);             
        };
        lector.readAsDataURL(archivo);                                         
    }
});

// Cargar imagen de perfil al iniciar
document.addEventListener("DOMContentLoaded", function() {
    const imagenGuardada = localStorage.getItem("imagenPerfil");
    if (imagenGuardada) {
        preview.src = imagenGuardada;
    }
});


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
let toggle=document.getElementById('toggle');
toggle.addEventListener('change', (event)=>{
    let checked=event.target.checked;
    document.body.classList.toggle('dark');
})

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


document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        localStorage.setItem("catNombre", "Autos");
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        localStorage.setItem("catNombre", "Juguetes");
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        localStorage.setItem("catNombre", "Muebles");
        window.location = "products.html"
    });
});

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


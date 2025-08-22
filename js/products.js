document.addEventListener('DOMContentLoaded', () => {
    const categoriaAutos = {
        "catID": 101,
        "catName": "Autos",
        "products": [
            {
                "id": 50921,
                "name": "Chevrolet Onix Joy",
                "description": "Generación 2019, variedad de colores. Motor 1.0, ideal para ciudad.",
                "cost": 13500,
                "currency": "USD",
                "soldCount": 14,
                "image": "https://www.chevrolet.com.ar/content/dam/chevrolet/sa/argentina/espanol/index/cars/2020-joy/colorizer/01-images/joy-hb-arg-chilli-red.jpg?imwidth=960"
            },
            {
                "id": 50922,
                "name": "Fiat Way",
                "description": "La versión de Fiat que brinda confort y a un precio accesible.",
                "cost": 14500,
                "currency": "USD",
                "soldCount": 52,
                "image": "https://www.multicenter.uy/wp-content/uploads/2019/03/F1.png.webp"
            },
            {
                "id": 50923,
                "name": "Suzuki Celerio",
                "description": "Un auto que se ha ganado la buena fama por su economía con el combustible.",
                "cost": 12500,
                "currency": "USD",
                "soldCount": 25,
                "image": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjAR_fwymcLOnY9qVMMqm913h2dEGkkPqm87ShyphenhyphenKHjK16o3nVJ_90huhvelvVeIUehCVt0McHMnzatTEJC7VgUF1p8JAgtn3awGNI1tY_ZuO5j6hQzCtuk0qNwcDlQ0LON9pJgNmwxTa3o/s1600/Suzuki-Celerio-GA-2015-Uruguay+(1).jpg"
            },
            {
                "id": 50924,
                "name": "Peugeot 208",
                "description": "El modelo de auto que se sigue renovando y manteniendo su prestigio en comodidad.",
                "cost": 15200,
                "currency": "USD",
                "soldCount": 17,
                "image": "https://www.carisin.cz/static/image/95e8e8ff5c73c2c9701eb9158b637b17"
            },
           
        ]
    };

    const listaProductos = document.getElementById('lista-productos');

    const productos = categoriaAutos.products;

    productos.forEach(producto => {
        const item = document.createElement('li');
        item.classList.add('producto-item');

        item.innerHTML = `
            <img src="${producto.image}" alt="${producto.name}">
            <div class="producto-info">
                <h3>${producto.name}</h3>
                <p>${producto.description}</p>
                <span class="precio">${producto.currency} ${producto.cost.toLocaleString('es-ES')}</span>
                <span class="vendidos">Vendidos: ${producto.soldCount}</span>
            </div>
        `;

        listaProductos.appendChild(item);
    });
});

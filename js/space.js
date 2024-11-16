document.getElementById('btnBuscar').addEventListener('click', function() {
    const inputBuscar = document.getElementById('inputBuscar').value;
    /*Obtenemos el valor del campo de entrada con el ID inputBuscar y lo guardamos en la variable inputBuscar.*/
    const contenedor = document.getElementById('contenedor');
    const apiURL = `https://images-api.nasa.gov/search?q=${encodeURIComponent(inputBuscar)}`;
       
     //para vaciar el contenedor antes de mostrar los resultados
     contenedor.innerHTML = '';

    fetch(apiURL)
    .then (response => response.json())
    .then(data => {
        if (data.collection.items.length > 0) {
            data.collection.items.forEach(item => {
                if(item.links && item.links.length > 0) {

                //crear columna
                const column = document.createElement('div');
                column.className = 'col-md-4 d-flex align-items-stretch';

                //crear tarjeta para la columna
                const card = document.createElement('div');
                card.className ='card mb-4 shadow-sm';
                card.style.width = '100%';

                //imagen
                const img = document.createElement('img');
                img.src = item.links[0].href;
                img.className = 'card-img-top';
                img.alt = item.data[0].title;

                //cuerpo de la tarjeta
                const cardBody = document.createElement('div');
                cardBody.className = 'card-body';

                //título de la tarjeta
                const title = document.createElement('h5');
                title.className = 'card-title';
                title.innerText = item.data[0].title;

                //descripción de imagen
                const description = document.createElement('div');
                description.className = 'card-text overflow-auto';
                description.innerText = item.data[0].description || 'No hay descripción disponible';

                //añadir elementos al cuerpo de la tarjeta
                cardBody.appendChild(title);
                cardBody.appendChild(description);

                //añadir imagen y cuerpo a la tarjeta 
                card.appendChild(img);
                card.appendChild(cardBody);

                //añadir tarjeta a la columna
                column.appendChild(card);

                //añadir columna al contenedor
                contenedor.appendChild(column);
            }
        });
    } else {
        const sinResultados = document.createElement('p');
        sinResultados.innerText = 'No se encontraron resultados disponibles';
        contenedor.appendChild(sinResultados);
    }
})
.catch(error => {
    console.error('Error fetching data:', error);
    const errorMessage = document.createElement('p');
    errorMessage.innerText = 'Hubo un error al realizar la búsqueda, inténtelo nuevamente.';
    contenedor.appendChild(errorMessage);
    });
});
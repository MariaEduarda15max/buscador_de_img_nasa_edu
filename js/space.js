function realizarBusqueda() {
  const inputBuscar = document.getElementById('inputBuscar').value.trim();
  const contenedor = document.getElementById('contenedor');

  // (opcional) si está vacío, no buscar
  if (!inputBuscar) {
    contenedor.innerHTML = '<p>Escribe algo para buscar.</p>';
    return;
  }

  const apiURL = `https://images-api.nasa.gov/search?q=${encodeURIComponent(inputBuscar)}`;

  // vaciar contenedor antes de mostrar resultados
  contenedor.innerHTML = '';

  fetch(apiURL)
    .then(response => response.json())
    .then(data => {
      const items = data?.collection?.items ?? [];

      if (items.length > 0) {
        items.forEach(item => {
          if (item.links && item.links.length > 0) {

            const column = document.createElement('div');
            column.className = 'col-md-4 d-flex align-items-stretch';

            const card = document.createElement('div');
            card.className = 'card mb-4 shadow-sm';
            card.style.width = '100%';

            const img = document.createElement('img');
            img.src = item.links[0].href;
            img.className = 'card-img-top';
            img.alt = item.data?.[0]?.title || 'Imagen';

            const cardBody = document.createElement('div');
            cardBody.className = 'card-body';

            const title = document.createElement('h5');
            title.className = 'card-title';
            title.innerText = item.data?.[0]?.title || 'Sin título';

            const description = document.createElement('div');
            description.className = 'card-text overflow-auto';
            description.innerText = item.data?.[0]?.description || 'No hay descripción disponible';

            cardBody.appendChild(title);
            cardBody.appendChild(description);

            card.appendChild(img);
            card.appendChild(cardBody);

            column.appendChild(card);
            contenedor.appendChild(column);
          }
        });
      } else {
        contenedor.innerHTML = '<p>No se encontraron resultados disponibles</p>';
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      contenedor.innerHTML = '<p>Hubo un error al realizar la búsqueda, inténtalo nuevamente.</p>';
    });
}

// Click en botón
document.getElementById('btnBuscar').addEventListener('click', realizarBusqueda);

// Enter en el input
document.getElementById('inputBuscar').addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    realizarBusqueda();
  }
});
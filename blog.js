const container = document.querySelector('#contenedor')

const baseUrl = 'https://ghibliapi.herokuapp.com/films/'

const getAll = () => fetch(baseUrl).then(response => response.json()).then()
const getMovie = (id) => fetch(`${baseUrl}/${id}`).then(response => response.json()).then()

const modal = document.querySelector('#modal')

window.addEventListener('DOMContentLoaded', async () => {
    await getAll().then(movies => {
        movies.forEach(pelicula => {
            container.innerHTML +=
                `<div class="card col-md-3 col-sm-5 m-1">
                    <div class="card-body">
                        <h5 class="card-title text-center">${pelicula.title}</h5>
                        <hr>
                        <p class="card-text">${pelicula.description.substring(0, 300)}</p>
                        <div class="text-center">
                         <button class="btn btn-secondary" id="btn-editar" data-id="${pelicula.id}" title="Editar" data-toggle="modal" data-target="#modal">Editar 🖉</span></button>
                         </div>
                    </div>
                
            `
        })
    })

    const botton = document.querySelectorAll('#btn-editar')
    const card = document.querySelectorAll('.card')

    botton.forEach((buton, i) => {
        buton.addEventListener('click', async (select) => {
            const id = await select.target.dataset.id
            await getMovie(id).then(pelicula => {
                modal.querySelector('.modal-body').innerHTML =
                    `
                <form id="formulario">
                <div class="form-group">
                    <input type="text" id="nombre" class="form-control" value="${pelicula.title}">
                </div>
                <div class="form-group">
                    <textArea class="form-control" id="description" rows="8">${pelicula.description} </textArea>
                </div>
                <button class="btn btn-secondary" id="actualizar">Actualizar</button>
                </form>
                `

            })
            var form = document.querySelector('#formulario')

            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const title = form['nombre'].value
                const description = form['description'].value
                card[i].querySelector('h5').innerText = title
                card[i].querySelector('p').innerText = description.substring(0, 300)
                $('#modal').modal('hide')
            })
        })
    })
})
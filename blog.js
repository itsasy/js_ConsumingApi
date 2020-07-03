const container = document.querySelector('.row')

const baseUrl = 'https://ghibliapi.herokuapp.com/films/'

var request = new XMLHttpRequest();

request.open('GET', `${baseUrl}`, true)

request.onload = () => {
    var datas = JSON.parse(request.response)
    datas.forEach((elemento) => {
        container.innerHTML +=
            `<div class="card col-md-3 col-sm-5 m-1">
                <div class="card-body">
                    <h5 class="card-title">${elemento.title}</h5>
                    <hr>
                    <p class="card-text">${elemento.description.substring(0, 300)}</p>
                </div>
            </div>`
    });
}

request.send()
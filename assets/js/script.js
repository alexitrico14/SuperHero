$(document).ready(function () {
    $('#searchForm').on('submit', function (event) {
        event.preventDefault();
        let heroId = $('#heroId').val().trim();

        if (isValidHeroId(heroId)) {
            getHeroData(heroId);
        } else {
            alert('Por favor, ingrese un número válido');
        }
    });
});

function isValidHeroId(id) {
    return /^\d+$/.test(id);
} 

function getHeroData(id) {
    $.ajax({
        url: `https://www.superheroapi.com/api.php/4905856019427443/${id}`,
        dataType: `json`,
        type: `GET`,
        success: function (data) {
            // console.log(data);
            if (data.response === "error") {
                alert(`Superhéroe no encontrado`);
            } else {
                renderHeroInfo(data);
            }
        },
        error: function () {
            alert(`Error al consultar la API`);
        }
    });
}

function renderHeroInfo(hero) {
    
    $('#heroImage').html(`
        <img src="${hero.image.url}" class="img-fluid" alt="${hero.name}">
    `);

    
    $('#heroInfo').html(`
             <div class="card">
            <div class="card-body row">
            <div class="col">
                <h4 class="card-title">${hero.name}</h4>
                <p class="card-text"><strong>Biografía:</strong></p>
                <p class="card-text">Nombre: ${hero.biography['full-name']}</p>
                <p class="card-text">Alter Ego: ${hero.biography['alter-egos']}</p>
            </div>

            <div class="col">    
                <p class="card-text"><strong>Apariencia:</strong></p>
                <p class="card-text">Género: ${hero.appearance.gender}</p>
                <p class="card-text">Raza: ${hero.appearance.race}</p>
                <p class="card-text">Altura: ${hero.appearance.height[1]}</p>
                <p class="card-text">Peso: ${hero.appearance.weight[1]}</p>
            </div>
            <div class="col">     
                <p class="card-text"><strong>Estadísticas:</strong></p>
                <p class="card-text">Inteligencia: ${hero.powerstats.intelligence}</p>
                <p class="card-text">Fuerza: ${hero.powerstats.strength}</p>
                <p class="card-text">Velocidad: ${hero.powerstats.speed}</p>
                <p class="card-text">Durabilidad: ${hero.powerstats.durability}</p>
                <p class="card-text">Poder: ${hero.powerstats.power}</p>
                <p class="card-text">Combate: ${hero.powerstats.combat}</p>
            </div>

            <div class="col-12">    
                <p class="card-text"><strong>Conexiones:</strong></p>
                <p class="card-text">Afiliación de grupo: ${hero.connections['group-affiliation']}</p>
                <p class="card-text">Parientes: ${hero.connections.relatives}</p>
            </div>
            </div>
        </div>
    `);

   
    renderHeroChart(hero.powerstats, hero.name);
}

function renderHeroChart(powerstats, heroName) {
    let chart = new CanvasJS.Chart("heroChart", {
        theme: "light2",
        animationEnabled: true,
        title: {
            text: `Estadísticas de ${heroName}`
        },
        data: [{
            type: "pie",
            dataPoints: [
                { y: parseInt(powerstats.intelligence), label: "Inteligencia" },
                { y: parseInt(powerstats.strength), label: "Fuerza" },
                { y: parseInt(powerstats.speed), label: "Velocidad" },
                { y: parseInt(powerstats.durability), label: "Durabilidad" },
                { y: parseInt(powerstats.power), label: "Poder" },
                { y: parseInt(powerstats.combat), label: "Combate" }
            ]
        }]
    });
    chart.render();
}
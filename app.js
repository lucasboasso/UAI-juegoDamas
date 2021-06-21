    /* 
    0 = Cuadrado Blanco Vacio
    1 = Cuadrado Negro Vacio
    2 = Cuadrado Negro con Ficha Blanca
    3 = Cuadrado Negro con Ficha Roja
    */
var turno = "rojas";
var estadoJuego = [
    [0,2,0,2,0,2,0,2],
    [2,0,2,0,2,0,2,0],
    [0,2,0,2,0,2,0,2],
    [1,0,1,0,1,0,1,0],
    [0,1,0,1,0,1,0,1],
    [3,0,3,0,3,0,3,0],
    [0,3,0,3,0,3,0,3],
    [3,0,3,0,3,0,3,0]
]

function imprimirTablero(){
    var tablero = document.getElementById("tablero");
    estadoJuego.forEach(function(row){
        row.forEach(function(cell){
            var cuadrado = document.createElement('div');
            switch(cell){
                case 0:    
                cuadrado.className = "cuadradoBlanco";
                tablero.appendChild(cuadrado)
                break;
                case 1:
                cuadrado.className = "cuadradoNegro";
                tablero.appendChild(cuadrado)
                break;
                case 2:
                cuadrado.className = "cuadradoNegro fichaBlanca";
                cuadrado.setAttribute("tabindex", 1)
                tablero.appendChild(cuadrado)
                break;
                case 3:
                cuadrado.className = "cuadradoNegro fichaRoja";
                cuadrado.setAttribute("tabindex", 1)
                tablero.appendChild(cuadrado)
                break;
            }
        })
    })
}

function cambioJugador(){
    var cartelTurno = document.getElementById("turno");
    if(turno === "rojas"){
        cartelTurno.innerHTML = "Turno Fichas Blancas";
        turno = "blancas";
    }
    else{
        cartelTurno.innerHTML = "Turno Fichas Rojas";
        turno = "rojas";
    }
}

window.onload = function(){
    imprimirTablero();
    
    const clickCelda = document.getElementById("tablero");
    clickCelda.addEventListener("click", selecFicha, true);
    clickCelda.addEventListener("focusout", focusOut, true);
    function selecFicha(clickedCellEvent){
        const clickedCell = clickedCellEvent.target;
        var fichaRoja = clickedCell.classList.contains('fichaRoja');
        var fichaBlanca = clickedCell.classList.contains('fichaBlanca');
        if (clickedCell.classList.contains('seleccionado')){
            clickedCell.classList.remove('seleccionado')
        }
        else if (fichaRoja && turno === "rojas"){
            clickedCell.classList.add('seleccionado')
        }
        else if (fichaBlanca && turno === "blancas"){
            clickedCell.classList.add('seleccionado')
        }
        else if (fichaRoja && turno === "blancas"){
            notAllowed(clickedCell);
        }
        else if (fichaBlanca && turno === "rojas"){
            notAllowed(clickedCell);
        }
    }

    function focusOut(e){
        const element = e.target;
        element.classList.remove('seleccionado');
    }

    function notAllowed(e){
        e.classList.add("notAllowed")
        setTimeout(function(){
            e.classList.remove("notAllowed")
        }, 1000);
    }

    var cambiarTurno = document.getElementById("cambiarTurno");
    cambiarTurno.onclick = cambioJugador;
}
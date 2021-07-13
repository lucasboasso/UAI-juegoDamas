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
    estadoJuego.forEach(function(row, j){        
        var fila = document.createElement('div');
        row.forEach(function(cell, i){
            var celda = document.createElement('div');
            celda.setAttribute("fila", j)
            celda.setAttribute("columna", i)
            switch(cell){
                case 0:    
                    celda.classList.add("cuadradoBlanco");                    
                    break;
                case 1:
                    celda.classList.add("cuadradoNegro");
                    break;
                case 2:
                    celda.classList.add("cuadradoNegro", "fichaBlanca");
                    break;
                case 3:
                    celda.classList.add("cuadradoNegro", "fichaRoja");
                    break;
            }
            fila.appendChild(celda);
        })
        tablero.appendChild(fila);
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

function tableroClick(clickedCellEvent){
    var seleccionado = document.getElementsByClassName('seleccionado');
    const clickedCell = clickedCellEvent.target;
    if(hayFichaSeleccionada(clickedCellEvent)){
        moverFicha(clickedCellEvent);
        cambioJugador();
        seleccionado[0].classList.remove('seleccionado')
    }
    else{
        selecFicha(clickedCellEvent);
        console.log(clickedCell)
    }
}

function moverFicha(clickedCellEvent){
    const clickedCell = clickedCellEvent.target;
    var filaDestino = parseInt(clickedCell.getAttribute("fila"));
    var columnaDestino = parseInt(clickedCell.getAttribute("columna"));
    var seleccionado = document.getElementsByClassName('seleccionado');
    var filaInicial = parseInt(seleccionado[0].getAttribute("fila"));
    var columnaInicial = parseInt(seleccionado[0].getAttribute("columna"));
    if((turno === "rojas")
    && (filaDestino == filaInicial - 1)
    && (columnaDestino == columnaInicial - 1 || columnaDestino == columnaInicial + 1)){
        clickedCell.classList.add('fichaRoja');
    }
    else if((turno === "blancas")
    && (filaDestino == filaInicial + 1) 
    && (columnaDestino == columnaInicial - 1 || columnaDestino == columnaInicial + 1)){
        clickedCell.classList.add('fichaBlanca');
    }
    else{
        console.log("No entro y no se movio");
    }
}

function hayFichaSeleccionada(clickedCellEvent){
    var seleccionado = document.getElementsByClassName('seleccionado');
    if (seleccionado.length != 0){
        return true;
    }
    else{
        return false;
    }        
}

function notAllowed(e){
    e.classList.add("notAllowed");
    setTimeout(function(){
        e.classList.remove("notAllowed");
    }, 1000);
}

function selecFicha(clickedCellEvent){
    const clickedCell = clickedCellEvent.target;
    var fichaRoja = clickedCell.classList.contains('fichaRoja');
    var fichaBlanca = clickedCell.classList.contains('fichaBlanca');
    if (clickedCell.classList.contains('seleccionado')){        
        clickedCell.classList.remove('seleccionado');
    }
    else if (fichaRoja && turno === "rojas"){
        clickedCell.classList.add('seleccionado');
    }
    else if (fichaBlanca && turno === "blancas"){
        clickedCell.classList.add('seleccionado');
    }
    else if (fichaRoja && turno === "blancas"){
        notAllowed(clickedCell);
    }
    else if (fichaBlanca && turno === "rojas"){
        notAllowed(clickedCell);
    }
}

function capturar(){
    var nombreest = document.getElementById('nombre').value;

}

window.onload = function(){
    const tablero = document.getElementById("tablero");    
    imprimirTablero();
    
    tablero.addEventListener("click", tableroClick, true);
}
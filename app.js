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
        fila.classList.add("fila" + (j + 1));
        row.forEach(function(cell, i){
            var celda = document.createElement('div');
            celda.classList.add("celda" + (i + 1));
            switch(cell){
                case 0:    
                    celda.classList.add("cuadradoBlanco");                    
                    break;
                case 1:
                    celda.classList.add("cuadradoNegro");
                    break;
                case 2:
                    celda.classList.add("cuadradoNegro", "fichaBlanca");
                    celda.setAttribute("tabindex", 1);
                    break;
                case 3:
                    celda.classList.add("cuadradoNegro", "fichaRoja");
                    celda.setAttribute("tabindex", 1);
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

window.onload = function(){
    const tablero = document.getElementById("tablero");    
    imprimirTablero();
    
    tablero.addEventListener("click", tableroClick, true);
    tablero.addEventListener("focusout", focusOut, true);
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

    function tableroClick(clickedCellEvent){
        if(hayFichaSeleccionada()){
           moverFicha(clickedCellEvent);
           alert('ya hay una marcada');
        }
        else{
            selecFicha(clickedCellEvent);
        }
    }

    function moverFicha(clickedCellEvent){
        const clickedCell = clickedCellEvent.target;
        var clickedCellIndex = Array.from(clickedCell.parentNode.children).indexOf(clickedCell)
        console.log(clickedCellIndex);
    }

    function hayFichaSeleccionada(){
        var seleccionado = document.getElementsByClassName('seleccionado').length
        if (seleccionado != 0){
            console.log('si, hay');
            return true;
        }
        else{
            console.log('no hay');
            return false;
        }        
    }

    function focusOut(e){
        const element = e.target;
        element.classList.remove('seleccionado');
    }

    function notAllowed(e){
        e.classList.add("notAllowed");
        setTimeout(function(){
            e.classList.remove("notAllowed");
        }, 1000);
    }

    var cambiarTurno = document.getElementById("cambiarTurno");
    cambiarTurno.onclick = cambioJugador;
}
    /* 
    0 = Cuadrado Blanco Vacio
    1 = Cuadrado Negro Vacio
    2 = Cuadrado Negro con Ficha Blanca
    3 = Cuadrado Negro con Ficha Negra
    */

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
    /* estadoJuego.forEach(function(row){
        row.forEach(function(cell){
            var cuadrado = document.createElement('div')            
            if(cell === 0){
                cuadrado.className = "cuadradoBlanco";
                tablero.appendChild(cuadrado)
            }
            else if(cell === 1){
                cuadrado.className = "cuadradoNegro";                
                tablero.appendChild(cuadrado)
            }            
        console.log(cuadrado)
        })
    }) */
function imprimirTablero(){
    var tablero = document.getElementById("tablero");
    estadoJuego.forEach(function(row){
        row.forEach(function(cell){
            var cuadrado = document.createElement('div')            
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
                tablero.appendChild(cuadrado)
                break;
                case 3:
                cuadrado.className = "cuadradoNegro fichaNegra";
                tablero.appendChild(cuadrado)
                break;
            }                        
        console.log(cuadrado)
        })
    })
}


window.onload = function() {
    imprimirTablero()
    
    var turno = "negras";
    var clickCelda = document.getElementById("tablero");
    clickCelda.addEventListener("click", selecFicha, true);
    function selecFicha(clickedCellEvent){
        const clickedCell = clickedCellEvent.target
        if (clickedCell.classList.contains('seleccionado')) {
            clickedCell.classList.remove('seleccionado')
        }
        else if (clickedCell.classList.contains('fichaNegra')) {
            clickedCell.classList.add('seleccionado')
        }
    }
    /*const nuevaPartida = document.getElementById("newGameButton");
    nuevaPartida.onclick = 'imprimirTablero()'; */

}


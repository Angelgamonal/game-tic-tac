//------------ TRAYENDO LOS ID AL JAVASCRIPT-------------

// Guardando en una constante los botones del DOM
const btn1 = document.querySelector('#btn-1');
const btn2 = document.querySelector('#btn-2');
const btn3 = document.querySelector('#btn-3');
const btn4 = document.querySelector('#btn-4');
const btn5 = document.querySelector('#btn-5');
const btn6 = document.querySelector('#btn-6');
const btn7 = document.querySelector('#btn-7');
const btn8 = document.querySelector('#btn-8');
const btn9 = document.querySelector('#btn-9');
const buttonTime = document.querySelector('#btn-time');
const domTimeSecond = document.querySelector('#time-second');
const domTurn = document.querySelector('#turn-team');

// Botones de reinicio de juego y limpiar casillas
const btnReset = document.querySelector('#btn-reset');
const btnResetGame = document.querySelector('#btn-reset-game');

//Tabla de Puntuacion
let scoreX = document.querySelector('#score-x');
let scoreO = document.querySelector('#score-o');
// Declarando los puntos
let contadorX = 1;
let contadorO = 1;

// Creando array de numeros ganadores
const winGame = [
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 9],
	[1, 4, 7],
	[2, 5, 8],
	[3, 6, 9],
	[1, 5, 9],
	[3, 5, 7],
];

//----------------- CREANDO VARIABLES PARA IMPRIMIR EN EL DOM----------------
// Creando una variable de tipo  let llamada turnoX
let turnoX = true;
//creando constante para poder imprimir la X en el DOM
const imprimirX = 'X';

//Guardando en un array los botones del DOM para poder dar un map() o forEach()
const allButtons = [btn1, btn2, btn3, btn4, btn5, btn6, btn7, btn8, btn9];

//--------DANDO EVENTO onclick A LOS BOTONES Y MAPEANDOLOS A LA VEZ (Con este map() ahorramos repetir unas cuantas lineas de codigo )------
allButtons.map((button) => {
	button.addEventListener('click', () => {
		onClickDom(button);
	});
});

//--------------Funcion que imprime una X u O en el DOM----------------------

const onClickDom = (idButton) => {
	/*
		Utilizo una condicional para poder imprimir la "X" y despues niego la variable,
		para poder imprimir el "O".
	*/
	if (turnoX) {
		//Imprimiendo la X en el Dom
		idButton.innerHTML = imprimirX;
		//Mostrando el turno de quien le toca en el Dom
		domTurn.innerHTML = 'Turno de " O "';
		//Desabilitando el boton para que no pueda cambiar
		idButton.disabled = true;
	} else {
		//Imprimiendo la O en el Dom
		idButton.innerHTML = 'O';
		//Mostrando el turno de quien le toca en el Dom
		domTurn.innerHTML = 'Turno de " X "';
		//Desabilitando el boton para que no pueda cambiar
		idButton.disabled = true;
	}
	// Negando el "turnoX" para poder imprimir el turno de "O"
	turnoX = !turnoX;

	//-----CICLO FOR DONDE SE DECIDIRA QUIEN GANO EL JUEGO
	for (let i = 0; i < winGame.length; i++) {
		if (
			document.querySelector(`#btn-${winGame[i][0]}`).innerHTML ==
				imprimirX &&
			document.querySelector(`#btn-${winGame[i][1]}`).innerHTML ==
				imprimirX &&
			document.querySelector(`#btn-${winGame[i][2]}`).innerHTML ==
				imprimirX
		) {
			//Habilitando  los botones para poder jugar otra ronda
			idButton.disabled = false;
			alert('Ganador es "X"');
			// Aqui contabilizamos el puntaje para mostralo en el DOM y incrementar el contador
			scoreX.innerHTML = contadorX++;
			// Limpiamos las casillas
			resetCasillas();
			return;
		}

		if (
			document.querySelector(`#btn-${winGame[i][0]}`).innerHTML === 'O' &&
			document.querySelector(`#btn-${winGame[i][1]}`).innerHTML === 'O' &&
			document.querySelector(`#btn-${winGame[i][2]}`).innerHTML === 'O'
		) {
			//Habilitando  los botones para poder jugar otra ronda
			idButton.disabled = false;
			alert('Ganador es "O"');

			// Aqui contabilizamos el puntaje para mostralo en el DOM y incrementar el contador
			scoreO.innerHTML = contadorO++;
			// Limpiamos las casillas
			resetCasillas();
			return;
		}
	}
};

//-------------------FUNCIONES o EVENTOS----------

//Funcion para limpiar los botones
const resetCasillas = () => {
	allButtons.map((button) => {
		button.innerHTML = '';
		button.disabled = false;
	});
};

//Funcion para reiniciar el juego
const resetGame = () => {
	scoreX.innerHTML = 0;
	scoreO.innerHTML = 0;
	contadorX = 1;
	contadorO = 1;
	allButtons.map((button) => {
		button.innerHTML = '';
		button.disabled = false;
	});
};

//Boton que limpia las casillas
btnReset.addEventListener('click', () => {
	resetCasillas();
});

//Boton para resetear el contador y el juego
btnResetGame.addEventListener('click', () => {
	resetGame();
});

//Tiempo del temporizador
let tempo = 30;

//Funcion para temporizar el juego
buttonTime.addEventListener('click', () => {
	const timeFinish = setInterval(() => {
		//Desabilitamos el boton para no recargar la aplicacion
		buttonTime.disabled = true;

		//Mostramos en el Dom el tiempo que esta transcurriendo
		domTimeSecond.innerHTML = `00:${tempo < 10 ? `0${tempo}` : tempo}`;

		//Disminuimos el tiempo
		tempo--;

		//Creamos una condicion para terminar la funcion setInterval()
		if (tempo == 0) {
			//Usamos la condicion "&&" para descubrir quien gano en el lapso del temporizador
			contadorX > contadorO &&
				alert('Acabo el tiempo, el Ganador es "X" :)');
			contadorO > contadorX &&
				alert('Acabo el tiempo, el Ganador es "O" :)');
			contadorO == contadorX && alert('Acabo el tiempo, !Empate¡');
			//Finalizamos la funcion setInterval()
			clearInterval(timeFinish);
			//Regresamos el temporizado a 30
			tempo = 30;
			//Habilitamos el boton de temporizador para volver a jugarlo
			buttonTime.disabled = false;
			//Imprimimos en el Dom el tiempo
			domTimeSecond.innerHTML = `00:00`;
			//Reseteamos el Juego para volver a jugarlo
			resetGame();
		}
	}, 1000);
});

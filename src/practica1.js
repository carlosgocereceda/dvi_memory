/**
 * MemoryGame es la clase que representa nuestro juego. Contiene un array con la cartas del juego,
 * el número de cartas encontradas (para saber cuándo hemos terminado el juego) y un texto con el mensaje
 * que indica en qué estado se encuentra el juego
 */
var MemoryGame = MemoryGame || {};

/**
 * Constructora de MemoryGame
 */
MemoryGame = function (gs) {
	var cards = [
		"8-ball",
		"potato",
		"dinosaur",
		"kronos",
		"rocket",
		"unicorn",
		"guy",
		"zeppelin"
	];
	var carta_levantada1 = {
		num: null,
		nombre: ""
	};
	var carta_levantada2 = {
		num: null,
		nombre: ""
	};
	var estadoJuego = [];
	this.msg = "";
	var cartas;
	this.servidorGrafico = gs;
	this.loop = function(){
		//var dt = 60 / 1000;
		console.log("fsd");
		for(var i = 0; i < estadoJuego.length; i++){
			gs.draw(estadoJuego[i], i);
		}
		if(carta_levantada1.num != null && carta_levantada2.num != null){
			if(carta_levantada1.nombre === carta_levantada2.nombre){
				//ha acertado
				gs.drawMessage("HAS ACERTADO");
			}
			else{
				estadoJuego[carta_levantada1.num] = "back";
				estadoJuego[carta_levantada2.num] = "back";
			}
			carta_levantada1.num = null;
			carta_levantada2.num = null;
		}
		

	}
	
	this.initGame = function () {
		for (var i = 0; i < 16; i++) {
			estadoJuego.push("back");
		}
		cartas = new Array(16);
		var aux_cartas = new Array(8);
		aux_cartas.fill(0, 0);
		
		for (var j = 0; j < 16; j++) {
			var random = Math.floor((Math.random() * 8));
			var insertado = false;
			while(!insertado){
				var random = Math.floor((Math.random() * 8));
				if (aux_cartas[random] < 2) {
					aux_cartas[random]++;
					cartas[j] = cards[random];
					insertado = true;
				}
			}
		}
		console.log(cartas);
		setInterval(this.loop, 60);
	}
	this.onClick = function (card_) {
		estadoJuego[card_] = cartas[card_];
		if(carta_levantada1.num === null){
			carta_levantada1.nombre = cartas[card_];
			carta_levantada1.num = card_;
		}
		else{
			if(carta_levantada2.num === null){
				carta_levantada2.nombre = cartas[card_];
				carta_levantada2.num = card_;
			}
		}
	}
};

/**
 * Constructora de las cartas del juego. Recibe como parámetro el nombre del sprite que representa la carta.
 * Dos cartas serán iguales si tienen el mismo sprite.
 * La carta puede guardar la posición que ocupa dentro del tablero para luego poder dibujarse
 * @param {string} id Nombre del sprite que representa la carta
 */
MemoryGameCard = function (id) {
	this.sprite = id;
	this.encontrada = false;

	this.flip = function(){

	}
	this.found = function(){
		this.encontrada = true;
	}
	this.compareTo = function(otherCard){
		if(this.sprite === otherCard.sprite){
			//son iguales
		}
		else{
			//no son iguales
		}
	}
	this.draw = function(gs, pos){
		gs.draw(this.sprite, pos);
	}

};
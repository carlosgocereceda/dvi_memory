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
	var carta_levantada1 = null;
	var carta_levantada2 = null;
	var estadoJuego = [];
	this.msg = "";
	var cartas;
	this.servidorGrafico = gs;
	this.loop = function () {
		console.log("fsd");
		for (var i = 0; i < estadoJuego.length; i++) {
			cartas[i].draw(gs, i);
		}
		if (carta_levantada1 != null && carta_levantada2 != null) {
			if (carta_levantada1.compareTo(carta_levantada2)) {
				//ha acertado
				carta_levantada1.found();
				carta_levantada2.found();
				gs.drawMessage("HAS ACERTADO");
			}
			else {
				carta_levantada1.flip();
				carta_levantada2.flip();
				gs.drawMessage("HAS FALLADO");
			}
			carta_levantada1 = null;
			carta_levantada2 = null;
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
			while (!insertado) {
				var random = Math.floor((Math.random() * 8));
				if (aux_cartas[random] < 2) {
					aux_cartas[random]++;
					cartas[j] = new MemoryGameCard(cards[random]);
					insertado = true;
				}
			}
		}
		console.log(cartas);
		setInterval(this.loop, 60);
	}
	this.onClick = function (card_) {
		//estadoJuego[card_] = cartas[card_];
		if (!cartas[card_].encontrada) {
			cartas[card_].flip();
			if (carta_levantada1 === null) {
				carta_levantada1 = cartas[card_];
			}
			else {
				if (carta_levantada2 === null) {
					carta_levantada2 = cartas[card_];
				}
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
	this.estado = 0; //boca abajo

	this.flip = function () {
		console.log("fliiiiiiiip");
		if (this.estado === 0) {
			this.estado = 1;
		}
		else {
			this.estado = 0;
		}
	}
	this.found = function () {
		this.encontrada = true;
	}
	this.compareTo = function (otherCard) {
		return (this.sprite === otherCard.sprite);
	}
	this.draw = function (gs, pos) {
		if (this.estado === 0)
			gs.draw("back", pos);
		else
			gs.draw(this.sprite, pos);
	}

};
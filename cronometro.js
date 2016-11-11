cronometro: {
	//Elementos do Cronometro
	_minutes: '',
	_seconds: '',
	//Minuto Maximo
	_maximumMinute: '',
	_firstPass: true,
	//Minutos e Segundos que serão Decrementados
	_currentMinute:01,
	_currentSeconds:60,
	//Inicia o Cronometro
	start: function(){
		app.cronometro.executeStart = setInterval(function(){				
			if (app.cronometro._firstPass) {
				app.cronometro._currentMinute --;
				app.cronometro._firstPass = false;
			};

			app.cronometro._currentSeconds --;

			if (app.cronometro._currentMinute == 0 && app.cronometro._currentSeconds == 0) {
				app.cronometro.stop();
				return;
			};

			if (app.cronometro._currentSeconds == 0) {
				app.cronometro._currentSeconds = 59;
				app.cronometro._currentMinute --;
			};

			app.cronometro._minutes.textContent = app.cronometro._currentMinute;
			app.cronometro._seconds.textContent = app.cronometro._currentSeconds;

			if (app.cronometro._currentSeconds < 10) {
				app.cronometro._seconds.textContent = '0' + app.cronometro._currentSeconds;
			}

			if (app.cronometro._currentMinute < 10) {
				app.cronometro._minutes.textContent = '0' + app.cronometro._currentMinute;
			};
		},1000);
	},
	//Metodo que receberá o Interval do Start
	executeStart: function(){return},
	//Para o Cronometro
	stop: function(){
		clearInterval(app.cronometro.executeStart);
		app.cronometro._minutes.textContent = '00';
		app.cronometro._seconds.textContent = '00';
		app.cronometro._firstPass = true;
		app.cronometro.afterStopExecute();
	},
	//Reseta o Cronometro
	reset: function(minutes){
		if (arguments.length > 0) {
			app.cronometro._currentMinute = minutes;
		} else {
			app.cronometro._currentMinute = app.cronometro._maximumMinute;
		};

		app.cronometro._currentSeconds = 60;
		app.cronometro.start();
		app.cronometro.afterResetExecute();
	},
	//Callback após a pausa do cronometro
	afterStop: function(callback){
		afterStopCallback = callback;
	},
	afterStopCallback: function(){
		return;
	},
	afterStopExecute: function(){
		afterStopCallback();
	},
	//Callback após o reset do cronometro
	afterReset: function(callback){
		afterResetCallback = callback;
	},
	afterResetCallback: function(){
		return;
	},
	afterResetExecute: function(){
		afterResetCallback();
	},
	//Define o Elemento que receberá os minutos do cronometro
	setMinutesElement: function(element) {
		app.cronometro._minutes = element;
	},
	//Define o Elemento que receberá os segundos do cronometro
	setSecondsElement: function(element) {
		app.cronometro._seconds = element;	
	},
	//Define o Minuto do cronometro, caso não seja usado, o padrão é 1 minuto
	setMaximeMinute: function(minute){
		app.cronometro._currentMinute = minute;
		app.cronometro._maximumMinute = minute;
	},
	//Define o elemento que reseta o cronometro
	resetTrigger: function(element){
		document.querySelector(element).addEventListener('click', function(){
			app.cronometro.reset();
		});
	}
},
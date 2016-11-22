var chronometerjs = (function(){
	var executeStart;
	var afterStopCallback;
	var afterResetCallback;
	//Elementos do Cronometro
	var _minutes;
	var _seconds;
	//Minuto Maximo
	var _maximumMinute;
	//Segundo que irá iniciar
	var _initSecond;
	// Váriavel que indica se é a primeira vez que esta rodando o cronomêtro, para decrementar o minuto
	var _firstPass = true;
	//Minutos e Segundos que serão Decrementados
	var _currentMinute =01;
	var _currentSeconds =60;
	//Inicia o Cronometro
	var start = function(){
		executeStart = setInterval(function(){				
			if (_firstPass) {
				_currentMinute --;
				_firstPass = false;
			};

			_currentSeconds --;

			if (_currentMinute == 0 && _currentSeconds == 0) {
				stop();
				return;
			};

			if (_currentSeconds == 0) {
				_currentSeconds = 59;
				_currentMinute --;
			};

			for (var i = _minutes.length - 1; i >= 0; i--) {
				_minutes[i].textContent = _currentMinute;
				_seconds[i].textContent = _currentSeconds;
			};

			if (_currentSeconds < 10) {
				for (var j = _seconds.length - 1; j >= 0; j--) {
					_seconds[j].textContent = '0' + _currentSeconds;
				};
			}

			if (_currentMinute < 10) {
				for (var k = _minutes.length - 1; k >= 0; k--) {
					_minutes[k].textContent = '0' + _currentMinute;
				};
			};
		},1000);
	};
	//Metodo que receberá o Interval do Start
	var executeStart = function(){return};
	//Para o Cronometro
	var stop = function(){
		clearInterval(executeStart);
		for (var j = _seconds.length - 1; j >= 0; j--) {
			_seconds[j].textContent = '00';
		};
		for (var k = _minutes.length - 1; k >= 0; k--) {
			_minutes[k].textContent = '00';
		};
		_firstPass = true;
		afterStopExecute();
	};
	//Reseta o Cronometro
	var reset = function(minutes, seconds){
		if (arguments.length > 0) {
			_currentMinute = minutes;
			_currentSeconds = seconds;
		} else {
			_currentMinute = _maximumMinute;
			_currentSeconds = 60;
		};

		stop();
		start();
		afterResetExecute();
	};
	//Callback após a pausa do cronometro
	var afterStop = function(callback){
		afterStopCallback = callback;
	};
	var afterStopCallback = function(){
		return;
	};
	var afterStopExecute = function(){
		afterStopCallback();
	};
	//Callback após o reset do cronometro
	var afterReset = function(callback){
		afterResetCallback = callback;
	};
	var afterResetCallback = function(){
		return;
	};
	var afterResetExecute = function(){
		afterResetCallback();
	};
	//Define o Elemento que receberá os minutos do cronometro
	var setMinutesElement = function(element) {
		_minutes = element;
	};
	//Define o Elemento que receberá os segundos do cronometro
	var setSecondsElement = function(element) {
		_seconds = element;	
	};
	//Define o Minuto do cronometro, caso não seja usado, o padrão é 1 minuto
	var setMaximeMinute = function(minute){
		_currentMinute = minute;
		_maximumMinute = minute;
	};
	//Define o Segundo do cronometro, caso não seja usado, o padrão é 59
	var setInitSecond = function(second){
		_currentSeconds = second;
		_initSecond = second;
	};
	//Define o elemento que reseta o cronometro
	var resetTrigger = function(element){
		document.querySelector(element).addEventListener('click', function(){
			reset();
		});
	};

	return {
		start: start,
		stop: stop,
		reset: reset,
		setMinutesElement: setMinutesElement,
		setSecondsElement: setSecondsElement,
		resetTrigger: resetTrigger,
		setMaximeMinute: setMaximeMinute,
		setInitSecond: setInitSecond,
		afterStop: afterStop,
		afterReset: afterReset
	};
})();
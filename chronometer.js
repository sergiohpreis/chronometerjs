var chronometerjs = (function(){
	//Elementos do Cronometro
	var _minutes = '';
	var _seconds = '';
	//Minuto Maximo
	var _maximumMinute = '';
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

			_minutes.textContent = _currentMinute;
			_seconds.textContent = _currentSeconds;

			if (_currentSeconds < 10) {
				_seconds.textContent = '0' + _currentSeconds;
			}

			if (_currentMinute < 10) {
				_minutes.textContent = '0' + _currentMinute;
			};
		},1000);
	};
	//Metodo que receberá o Interval do Start
	var executeStart = function(){return};
	//Para o Cronometro
	var stop = function(){
		clearInterval(executeStart);
		_minutes.textContent = '00';
		_seconds.textContent = '00';
		_firstPass = true;
		afterStopExecute();
	};
	//Reseta o Cronometro
	var reset = function(minutes){
		if (arguments.length > 0) {
			_currentMinute = minutes;
		} else {
			_currentMinute = _maximumMinute;
		};

		_currentSeconds = 60;
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
		afterStop: afterStop,
		afterReset: afterReset
	};
})();
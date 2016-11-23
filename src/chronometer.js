var chronometerjs = (function(){
	//Metodo que receberá o Interval do Start
	var executeStart = function(){return};

	var interval_active = false;

	// Elementos do Cronometro
	var _minutes;
	var _seconds;

	// // Tempos do Cronomêtro
	var _initMinutes;
	var _initSeconds;

	// Váriavel que indica se é a primeira vez que esta rodando o cronomêtro, para decrementar o minuto
	var _firstPass = true;

	// Váriavel que indica se é o cronometro ja foi parado
	var stoped = false;

	// Váriavel que indica se o cronometro já foi finalizado
	var ended = false;

	// Método que inicia o cronometro
	var start = function(){
		if (_minutes === undefined || _seconds === undefined) {
			throw "Set elements to receive the time before start chronometerjs";
		} else if (interval_active) {
			throw "You cannot start with chronometer active"
		};

		// Verifica se o cronometro foi pausado e se os valores são diferentes
		if (stoped && !ended) {
			_minutes.length !== undefined ? _currentMinute = parseInt(_minutes[0].textContent) : _currentMinute = parseInt(_minutes.textContent);
			_seconds.length !== undefined ? _currentSeconds = parseInt(_seconds[0].textContent) : _currentSeconds = parseInt(_seconds.textContent);
		} else {
			ended = false;
			_initMinutes !== undefined ? _currentMinute = _initMinutes : _currentMinute = 01;
			_initSeconds !== undefined ? _currentSeconds = _initSeconds : _currentSeconds = 01;
		};

		afterStartExecute();
		executeStart = setInterval(function(){				
			interval_active = true;
			/* 
			Verifica se é a primeira passada para decrementar os minutos, exemplo:
			Configurado: 10 minutos
			Começa com: 09:59 e não com 10:59
			*/ 
			if (_firstPass && _currentSeconds === 60) {
				_currentMinute --;
				_firstPass = false;
			};

			_currentSeconds --;

			if (_currentMinute === 0 && _currentSeconds === 0) {
				changeMinutesElement();
				changeSecondsElement();
				ended = true;
				stop();
				return;
			};

			if (_currentSeconds == 0) {
				_currentSeconds = 59;
				_currentMinute --;
			};

			function changeMinutesElement(){
				// Caso sejam diversos elementos com a mesma classe e etc
				if (_minutes.length !== undefined) {
					for (var i = _minutes.length - 1; i >= 0; i--) {
						_minutes[i].textContent = _currentMinute;
					};
				} else {
					_minutes.textContent = _currentMinute;
				};

				if (_currentMinute < 10) {
					// Caso sejam diversos elementos com a mesma classe e etc
					if (_minutes.length !== undefined) {
						for (var k = _minutes.length - 1; k >= 0; k--) {
							_minutes[k].textContent = '0' + _currentMinute;
						};
					} else {
						_minutes.textContent = '0' + _currentMinute;
					};
				};
			};

			function changeSecondsElement(){
				// Caso sejam diversos elementos com a mesma classe e etc
				if (_minutes.length !== undefined) {
					for (var i = _minutes.length - 1; i >= 0; i--) {
						_seconds[i].textContent = _currentSeconds;
					};
				} else {
					_seconds.textContent = _currentSeconds;
				};

				if (_currentSeconds < 10) {
					// Caso sejam diversos elementos com a mesma classe e etc
					if (_seconds.length !== undefined) {
						for (var j = _seconds.length - 1; j >= 0; j--) {
							_seconds[j].textContent = '0' + _currentSeconds;
						};
					} else {
						_seconds.textContent = '0' + _currentSeconds;
					};
				};
			};

			changeMinutesElement();
			changeSecondsElement();
		},1000);
	};
	// Método que para o cronometro
	var stop = function(){
		clearInterval(executeStart);
		stoped = true;
		interval_active = false;
		_firstPass = true;
		afterStopExecute();
	};
	// Método que reseta o Cronometro
	var reset = function(minutes, seconds){
		interval_active = false;
		if (arguments.length > 0) {
			_currentMinute = minutes;
			_currentSeconds = seconds;
		} else {
			_currentMinute = _initMinutes;
			_currentSeconds = 60;
		};

		clearInterval(executeStart);
		_firstPass = true;
		stoped = false;
		start();
		afterResetExecute();
	};

	//Callback após o inicio do cronometro
	var afterStart = function(callback){
		afterStartCallback = callback;
	};
	var afterStartCallback = function(){
		return;
	};
	var afterStartExecute = function(){
		afterStartCallback();
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
	var setInitMinutes = function(minute){
		_initMinutes = minute;
	};
	//Define o Segundo do cronometro, caso não seja usado, o padrão é 59
	var setInitSeconds = function(second){
		_initSeconds = second;
	};

	//Define o elemento que reseta o cronometro
	var startTrigger = function(element){
		document.querySelector(element).addEventListener('click', function(){
			start();
		});
	};

	//Define o elemento que reseta o cronometro
	var stopTrigger = function(element){
		document.querySelector(element).addEventListener('click', function(){
			stop();
		});
	};

	//Define o elemento que reseta o cronometro
	var resetTrigger = function(element){
		document.querySelector(element).addEventListener('click', function(){
			reset();
		});
	};

	var configure = function(obj) {
		if (obj.minElement === undefined || obj.secElement === undefined) {
			throw 'Please set all required parameters on configure()';
		};

		setInitMinutes(obj.minutes);
		setInitSeconds(obj.seconds);
		setMinutesElement(obj.minElement);
		setSecondsElement(obj.secElement);
		startTrigger(obj.startTrigger);
		stopTrigger(obj.stopTrigger);
		resetTrigger(obj.resetTrigger);
	};

	return {
		start: start,
		stop: stop,
		reset: reset,
		setMinutesElement: setMinutesElement,
		setSecondsElement: setSecondsElement,
		startTrigger: startTrigger,
		stopTrigger: stopTrigger,
		resetTrigger: resetTrigger,
		setInitMinutes: setInitMinutes,
		setInitSeconds: setInitSeconds,
		afterStart: afterStart,
		afterStop: afterStop,
		afterReset: afterReset,
		configure: configure
	};
})();
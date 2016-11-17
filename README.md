# ChronometerJS

Examples:

```javascript
// Seta o Elemento que receberá os minutos
chronometerjs.setMinutesElement(document.querySelectorAll('.cronometro--text__number')[0]);

// Seta o Elemento que receberá os segundos
chronometerjs.setSecondsElement(document.querySelectorAll('.cronometro--text__number')[1]);

// Seta o Elemento que reseta o Relógio
chronometerjs.resetTrigger('.cmodal--btn');

// Seta o Tempo Maximo
chronometerjs.setMaximeMinute(10); 

// Callback após o cronometro parar
chronometerjs.afterStop(function(){
	console.log('Cronometro Parou');
});

// Callback após o cronometro resetar
chronometerjs.afterReset(function(){
	console.log('Cronometro Resetou');
});
```
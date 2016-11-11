# ChronometerJS

Examples:

```javascript
// Seta o Elemento que receberá os minutos
app.cronometro.setMinutesElement(document.querySelectorAll('.cronometro--text__number')[0]);

// Seta o Elemento que receberá os segundos
app.cronometro.setSecondsElement(document.querySelectorAll('.cronometro--text__number')[1]);

// Seta o Elemento que reseta o Relógio
app.cronometro.resetTrigger('.cmodal--btn');

// Seta o Tempo Maximo
app.cronometro.setMaximeMinute(10); 

// Callback após o cronometro parar
app.cronometro.afterStop(function(){
	console.log('Cronometro Parou');
});

// Callback após o cronometro resetar
app.cronometro.afterReset(function(){
	console.log('Cronometro Resetou');
});
```
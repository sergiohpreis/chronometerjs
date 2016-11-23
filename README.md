# ChronometerJS

Uma biblioteca em javascript para criação de cronometros

### Exemplo:
```html
<header class="header">
		<h3 class="header__title">Chronometer JS <span>Example</span></h3>
		<div class="chronometer">
			<span class="chronometer__number chronometer__number--minutes"></span>
			<span class="chronometer__number chronometer__number--seconds"></span>
		</div>
		<div class="actions">
			<span class="actions__btn actions__btn__start">Start</span>
			<span class="actions__btn actions__btn__stop">Stop</span>
			<span class="actions__btn actions__btn__reset">Reset</span>
		</div>
	</header>
```

```javascript
chronometerjs.configure({
	// Minutos do cronômetro (Se não informado, o padrão é 1)
	minutes: 10,
	// Segundos do cronômetro
	seconds: 20,
	// Elementos que vão receber os valores
	minElement: document.querySelector('.chronometer__number--minutes'),
	secElement: document.querySelector('.chronometer__number--seconds'),
	// Elementos que irão disparar as ações
	startTrigger: '.actions__btn__start',
	stopTrigger: '.actions__btn__stop',
	resetTrigger: '.actions__btn__reset'
});

// Você pode iniciar o cronômetro utilizando o método start(), parar com o método stop(), e reiniciar com o método reset(), exemplo:
chronometerjs.start();
chronometerjs.stop();
chronometerjs.reset();

// É possivel passar um callback para as ações do cronômetro
chronometerjs.afterStart(function(){
	document.querySelector('.actions__btn--stop').classList.remove('actions__btn--disabled');
	document.querySelector('.actions__btn--start').classList.add('actions__btn--disabled');
});

chronometerjs.afterReset(function(){
	document.querySelector('.actions__btn--stop').classList.remove('actions__btn--disabled');
});

chronometerjs.afterStop(function(){
	document.querySelector('.actions__btn--stop').classList.add('actions__btn--disabled');
	document.querySelector('.actions__btn--start').classList.remove('actions__btn--disabled');
});
```
*Exemplo dentro da pasta [chronometer-demo/](https://github.com/sergiohpreis/chronometerjs/tree/master/chronometer-demo)*
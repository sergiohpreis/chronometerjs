# ChronometerJS

Uma biblioteca para um cronómetro javascript. 

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

## Como Usar:

Primeiramente, você precisa usar o método `.configure()` para configurar o cronômetro:

```javascript
chronometerjs.configure({
    minutes: 10,
    seconds: 20,
    minElement: document.querySelector('.chronometer__number--minutes'), // Funciona para multiplos elementos como: document.querySelectorAll('.chronometer__number--minutes')
    secElement: document.querySelector('.chronometer__number--seconds'), // Funciona para multiplos elementos como: document.querySelectorAll('.chronometer__number--seconds')
    startTrigger: '.actions__btn__start',
    stopTrigger: '.actions__btn__stop',
    resetTrigger: '.actions__btn__reset'
});
```

**minutes:** Os minutos do cronômetro, precisa ser **`typeof number`**. Padrão: **1**;  
**seconds:** Os segundos em que o cronômetro será iniciado, precisa ser **`typeof number`**. Não é obrigatório, se não for passado, o cronômetro irá iniciar em 60 segundos (Exemplo: **09:59**);  
**minElement (obrigatório):** O elemento que irá receber os minutos, precisa ser um **`seletor javascript`**;  
**secElement (obrigatório):** O elemento que irá receber os segundos, precisa ser um **`seletor javascript`**;  
**startTrigger:** O elemento que irá disparar o método `.start()`, precisa ser **`typeof string`**;  
**stopTrigger:** O elemento que irá disparar o método `.stop()`, precisa ser **`typeof string`**;  
**resetTrigger:** O elemento que irá disparar o método `.reset()`, precisa ser **`typeof string`**;

## Callbacks

Você pode configurar alguns callbacks para as ações do cronômetro como:  `.afterStart()`, `.afterStop()`, `.afterReset()`:

```javascript
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

## Infos:

Você não precisa configurar os triggers, se você quiser usar os métodos, você pode usar `.start()`, `.stop()`, `.reset()` separadamente:

```javascript
document.querySelector('.actions__btn__start').addEventListener('click', function(){
    chronometerjs.start();
});

document.querySelector('.actions__btn__stop').addEventListener('click', function(){
    chronometerjs.stop();
});

document.querySelector('.actions__btn__reset').addEventListener('click', function(){
    chronometerjs.reset();
});
```

## Example

Um exemplo da biblioteca pode ser encontrado dentro da seguinte pasta:  
*[chronometer-demo](https://github.com/sergiohpreis/chronometerjs/tree/master/chronometer-demo)*
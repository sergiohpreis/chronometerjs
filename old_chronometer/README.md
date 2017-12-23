# ChronometerJS

A library to a javascript chronometer.  
PT-BR Documentation: *[doc-pt.md](https://github.com/sergiohpreis/chronometerjs/tree/master/doc-pt.md)*

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

## How to use:

First of all, you need to use the `.configure()` method to setup the chronometer:

```javascript
chronometerjs.configure({
    minutes: 10,
    seconds: 20,
    minElement: document.querySelector('.chronometer__number--minutes'), // Works to multiple elements like: document.querySelectorAll('.chronometer__number--minutes')
    secElement: document.querySelector('.chronometer__number--seconds'), // Works to multiple elements like: document.querySelectorAll('.chronometer__number--seconds')
    startTrigger: '.actions__btn__start',
    stopTrigger: '.actions__btn__stop',
    resetTrigger: '.actions__btn__reset'
});
```

**minutes:** The minutes of the chronometer, need to be **`typeof number`**. Default: **1**;  
**seconds:** The seconds that the chronometer will be initiated, need to be **`typeof number`**. Isn't mandatory, if you don't pass this atribute, the chronometer will start on 60 seconds (Example: **09:59**);  
**minElement (required):** The element that will receive the minutes, need to be a **`javascript selector`**;  
**secElement (required):** The element that will receive the seconds, need to be a **`javascript selector`**;  
**startTrigger:** The element that will fire the `.start()` method, need to be **`typeof string`**;  
**stopTrigger:** The element that will fire the `.stop()` method, need to be **`typeof string`**;  
**resetTrigger:** The element that will fire the `.reset()` method, need to be **`typeof string`**;

## Callbacks

You can set some callbacks to the chronometer actions like `.afterStart()`, `.afterStop()`, `.afterReset()`:

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

You don't need to set the triggers, if you want to use the methods instead, you can use `.start()`, `.stop()`, `.reset()` separately:

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

A example of the the library can be found inside the following folder:  
*[chronometer-demo](https://github.com/sergiohpreis/chronometerjs/tree/master/chronometer-demo)*
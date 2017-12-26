# ChronometerJS

A simple javascript library to create custom chronometers

## Getting Started

To starts to use `chronometerjs` in your application, you'll need to follow the steps below:

### Installation

Install with npm:<br>
`npm install --save chronometerjs`

### Usage

Let's use the following `index.html` in this example:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>ChronometerJS Example</title>

  <link rel="stylesheet" href="main.css">
</head>
<body>
  <h1>Chronometer JS</h1>

  <ul>
    <li id="minutes"></li>
    <li id="seconds"></li>
  </ul>

  <button id="start">Start Chronometer<button>

  <script src="main.js"></script>
</body>
</html>

```

```javascript
import ChronometerJS from 'chronometerjs';

const chronometer = new ChronometerJS({
  schema: [0, 20]
});

const updateHTML = data => {
  document.querySelector('#minutes').textContent = data.minutes;
  document.querySelector('#seconds').textContent = data.seconds;
};

chronometer.subscribe(updateHTML);

document.addEventListener('#start', () => {
  chronometer.start();
});
```

### Explanation

- Instantiate the class passing an object containing a property `schema`, that contains an array with the following structure:<br>
```javascript
[seconds, minutes, hours]
```
- The library uses the **Observer Pattern**, so we can create a function to receive the data every time that the chronometer changes, in this case, we use `updateHTML` function
- Use the `subscribe()` method , that receives a function, to listen to the changes on the chronometer
- To start the chronometer, we use the method `start()`

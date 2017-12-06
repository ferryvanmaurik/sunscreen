var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
var openPin = new Gpio(17, 'out'); //use GPIO pin 17, and specify that it is output
var closePin = new Gpio(18, 'out'); //use GPIO pin 17, and specify that it is output
var timeToOpen = 12000 // Time on ms to completely open the sunscreen
var runTime = 0;



function openRelais(relais) { 
  if (relais.readSync() === 0) { //check the pin state, if the state is 0 (or off)
    console.log('Pin is 0 so put it to 1');
    relais.writeSync(1); //set pin state to 1 (turn relais on)
  } else {
    console.log('Pin is already 1 so put it to 0');
    relais.writeSync(0); //set pin state to 0 (turn relais off)
  }
}

function closeRelais(relais) { //function to stop relais
  console.log(relais + ' set pi to 0')
  relais.writeSync(0); // Turn relais off
  relais.unexport(); // Unexport GPIO to free resources
}

// function calculateTime(timeToOpen, percent) {
//     let multiplier = percent / 100
//     runTime = timeToOpen * multiplier
//     return runTime;
// }

// function saveState() {

// }

function openCloseScreen(message) { // send open or close command to control the 2 relais
    if(message === 'open') {
        // Here we request to open the screen asuming it is closed
        // So we first have to be sure the closePin is closed
        closeRelais(closePin)
        // Now we want to open de screen 1 sec later to be sure the sloce relais is closed
        console.log('Close pin: ' + closePin)
        if(closePin === 0) { // extra check to be sure only one relais is on, otherwise BOOM!! Kuput!
            setTimeout(openRelais.bind(null, openPin), 1000)
        }
        else {
            console.log('Cannot open sunscreen because the closePin is still open')
        }
        
    }
    else if (message === 'close') {
        // Same story but then the other way arround
        closeRelais(openPin) // first close openRelais
        // now we want to close the screen 1 sec later
        if(openPin === 0) {
            setTimeout(closeRelais.bind(null, closePin), 1000)
        }
        else {
            console.log("Cannot close sunscreen because the openPin is still open")
        }
    }
}

//openCloseScreen('open');

//openRelais(openPin);

//setTimeout(closeRelais.bind(null, openPin), 2000)

console.log(process.argv[2]);
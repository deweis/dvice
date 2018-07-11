var arrNum = [];    // for the first number in a calculation
var arrNum2 = [];   // for the second number in a calculation
var arrCalc = [];   // for the calculator
var state = 0;      // 0) no number typed yet 1) one number has been entered 2) the first number is the result from the previous calculation
var result = 0;     // the result to be shown
var num1 = 0;       // the first number entered
var num2 = 0;       // the second number entered

/* So the calculator could be used by keyboard as well */
window.focus();
window.addEventListener('keydown', typeIt);


function typeIt(event) {
  let validNums = ['0','1','2','3','4','5','6','7','8','9'];
  let validCalculators = ['+','-','*','/'];
  let buttonId = 'key';  //to get the relevant key to change the background on press

  if ( validNums.includes(event.key) ) {
      buttonId += event.key;
      displayNum(event.key);
  } else if ( validCalculators.includes(event.key) ) {
      displayCalc(event.key);
      switch(event.key) {
        case '+': buttonId += 'Plus'; break;
        case '-': buttonId += 'Minus'; break;
        case '*': buttonId += 'Multiply'; break;
        case '/': buttonId += 'Divide'; break;
      }
  } else if (event.key === 'Enter') {
      buttonId += 'Result';
      displayResult();
  } else if (event.key === '.') {
      buttonId += 'Decimal';
      displayDec();
  } else if (event.key === '_') {
      buttonId += 'Negative';
      displayMin();
  } else if (event.key === 'Backspace') {
      buttonId += 'CE';
      clearEntry();
  } else if (event.key === 'Delete') {
      buttonId += 'AC';
      clearAll();
  }

  document.getElementById(buttonId).classList.add("numByKey"); // change button background on keypress
  setTimeout(function() {
    document.getElementById(buttonId).classList.remove("numByKey");
  }, 100);
}

/* Show the number that has been entered in the display (The bigger display on top) */
function displayNum(num) {

       // Zero should not be added in front of a number unless it is decimal
       if ((state === 0 && arrNum.length === 0 && num === 0) ||
           (state === 1 && arrNum2.length === 0 && num === 0) ||
           (state === 0 && arrNum.length === 1 && arrNum[0] === '-' && num === 0) ||
           (state === 1 && arrNum2.length === 1 && arrNum2[0] === '-' && num === 0) ||
           (state === 2 && num === 0) )  {
         return;
       }
       else if (state === 1 && arrNum2.length < 15) {
         arrNum2.push(num);
         document.getElementById("display").innerHTML = quotMark(arrNum2.join(''));
       }
       else if (state === 0 && arrNum.length < 15) {
         arrNum.push(num);
         document.getElementById("display").innerHTML = quotMark(arrNum.join(''));
       }
       else if (state === 2) {
         arrNum.splice(0,arrNum.length,num); // replace the result from previous calculation in array with typed number
         document.getElementById("display").innerHTML = quotMark(arrNum.join(''));
         state = 0;
       }
}

/* Calculate the result */
function calculateIt(number1, number2) {

  var arrRound = [];
  var x = 10000000000000000; // mitigate js decimal math issue
  var res = arrCalc[0] === '+' ? Math.round(number1 * x + number2 * x) / x :
            arrCalc[0] === '-' ? Math.round(number1 * x - number2 * x) / x :
            arrCalc[0] === '*' ? Math.round( number1 * number2 * x ) / x : Math.round( (number1 / number2) * x ) / x;
  return res;

}

/* When clicking the '=' button */
function displayResult() {
  if (state === 1 && arrNum2.length > 0) {
    num1 = Number(arrNum.join(''));
    num2 = Number(arrNum2.join(''));

    result = calculateIt(num1, num2);

    document.getElementById("displayCalc").innerHTML = `${quotMark(arrNum.join(''))} ${arrCalc[0]} ${quotMark(arrNum2.join(''))} = ${quotMark(result)}`;
    document.getElementById("display").innerHTML = '0';
    arrNum2.splice(0);
    arrCalc.splice(0);
    arrNum.splice(0,arrNum.length,result);
    state = 2; // as arrNum contains now the result to be used in further calculations if wanted
  }
}

/* When one of the calculate buttons is pressed instead of the '=' button
   so the temp result will be used as first number for the next calculation
   (The smaller display below the one that shows the entered numbers) */
function displayCalc(calc) {

       if ( arrNum2.length === 0 && arrNum.length > 0 ) {
         state = 1;
         arrCalc.splice(0,arrCalc.length,calc);
         document.getElementById("display").innerHTML = '0';
         document.getElementById("displayCalc").innerHTML =`${quotMark(arrNum.join(''))} ${arrCalc[0]}`;
       }
       else if ( arrNum2.length > 0 ) {
          num1 = Number(arrNum.join(''));
          num2 = Number(arrNum2.join(''));

          result = calculateIt(num1, num2);

          arrNum.splice(0,arrNum.length,result);
          arrNum2.splice(0);
          arrCalc.splice(0,arrCalc.length,calc);
          document.getElementById("display").innerHTML = '0';
          document.getElementById("displayCalc").innerHTML = `${quotMark(arrNum.join(''))} ${arrCalc[0]}`;
       }
}

/* Add the decimal point when the '.' button is clicked */
function displayDec() {
  if ( state === 0 && !arrNum.includes('.') ) {
      if (arrNum.length === 0) {
        arrNum.push('0.');
        document.getElementById("display").innerHTML = arrNum.join('');
      }
      else {
        arrNum.push('.');
        document.getElementById("display").innerHTML = quotMark(arrNum.join(''));
      }
  }  else if ( state === 1 && !arrNum2.includes('.') ) {
      if (arrNum2.length === 0) {
        arrNum2.push('0.');
        document.getElementById("display").innerHTML = arrNum2.join('');
      }
      else {
        arrNum2.push('.');
        document.getElementById("display").innerHTML = quotMark(arrNum2.join(''));
      }
  }  else if ( state === 2 ) {
        arrNum.splice(0,arrNum.length,'0.'); // replace the result from previous calculation in array with '0.'
        document.getElementById("display").innerHTML = quotMark(arrNum.join(''));
        state = 0;
  }

}

/* Add the thousands separation single quotation mark */
function quotMark(num) {
  let arr = [];
  let str = num.toString();

  if (str.includes('.')) {
    str = str.slice(0,str.indexOf('.'));
  }

  if (str.includes('-')) {
    str = str.slice(1);
  }

  str = str.split('').reverse().join('');

  for (var i = 0; i < str.length; i++) {
    if (i % 3 === 0 && i !== 0) {
      arr.push(`'`);
      arr.push(str.slice(i,i+1));
    } else {
      arr.push(str.slice(i,i+1));
    }
  }

  if (num.toString().includes('-')) {
    arr.push('-');
  }

  if (num.toString().includes('.')) {
    return arr.reverse().join('') + num.toString().slice(num.toString().indexOf('.'));
  } else {
    return arr.reverse().join('');
  }
}

/* Add or remove the minus sign in front of a number when  the '-' button is clicked */
function displayMin() {
  if (state === 0) {
    if (arrNum[0] !== '-') {
      arrNum.unshift('-');
    } else {
      arrNum.shift();
    }
    document.getElementById("display").innerHTML = quotMark(arrNum.join(''));
  } else if (state === 1)  {
      if (arrNum2[0] !== '-') {
        arrNum2.unshift('-');
      } else {
        arrNum2.shift();
      }
      document.getElementById("display").innerHTML = quotMark(arrNum2.join(''));
  }
}

/* Clear All - When clicking the AC button */
function clearAll() {
  arrNum = [];
  arrCalc = [];
  arrNum2 = [];
  state = 0;
  document.getElementById("display").innerHTML = '0';
  document.getElementById("displayCalc").innerHTML = '0';
}

/* Clear Entry - When clicking the CE button */
function clearEntry() {
  if (state === 0){
    arrNum.splice(0);
    document.getElementById("display").innerHTML = '0';
  } else if (state === 1){
    arrNum2.splice(0);
    document.getElementById("display").innerHTML = '0';  //quotMark(arrNum2.join(''));
  }
}

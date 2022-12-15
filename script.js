const body = document.body;
const container = document.querySelector(".container");
const methodContainer = document.querySelectorAll(".method-container");
const inputs = document.querySelectorAll(".modern");
const switches = document.querySelectorAll(".switch");


const methodFromFirstInput = document.getElementById("from-first-input");
const methodFromSecondInput = document.getElementById("from-second-input");
const methodFromResultInput = document.getElementById("from-result-input");


const methodOfFirstInput = document.getElementById("of-first-input");
const methodOfSecondInput = document.getElementById("of-second-input");
const methodOfResultInput = document.getElementById("of-result-input");

const methodIncreaseFirstInput = document.getElementById("increase-first-input");
const methodIncreaseSecondInput = document.getElementById("increase-second-input");
const methodIncreaseResultInput = document.getElementById("increase-result-input");

const buttonConvert = document.getElementById("button-convert");
const switchRounding = document.getElementById("switch-rounding");
const switchTheme = document.getElementById("switch-theme");

const themeSymbol = document.getElementById("theme-symbol");
const convertSymbol = document.getElementById("convert-symbol");

let resultFromLocalized = false;
let resultOfLocalized = false;
let resultIncreaseLocalized = false;


window.onload = () => {
  if(localStorage.getItem('rounding') !== null) {
    localStorage.getItem('rounding') === "true" ? switchRounding.checked = true : switchRounding.checked = false; 
  }

  if(localStorage.getItem('dark-theme') !== null) {
    localStorage.getItem('dark-theme') === "true" ? switchTheme.checked = true : switchTheme.checked = false;
     localStorage.getItem('dark-theme') === "true" ? themeSymbol.classList.add("ghost") : themeSymbol.classList.add("book");

     if(localStorage.getItem('dark-theme') === "false") {
       letInShine();
     }
  }


  if(localStorage.getItem('dark-theme') === null) {
    themeSymbol.classList.add("ghost");
  }



};



methodFromFirstInput.addEventListener('input', () => {
  const firstInput = methodFromFirstInput.value;
  const secondInput = methodFromSecondInput.value;
  const rounding = switchRounding.checked;


  
  resultFromLocalized = false;


  if(!firstInput || !secondInput) {
    return;

  } else {
    rounding ? methodFromResultInput.value = roundNumber(percentageFrom(firstInput, secondInput), 2) : methodFromResultInput.value = percentageFrom(firstInput, secondInput);
  }


});

methodFromSecondInput.addEventListener('input', () => {
  const firstInput = methodFromFirstInput.value;
  const secondInput = methodFromSecondInput.value;
  const rounding = switchRounding.checked;

  resultFromLocalized = false;
   
  if (!firstInput || !secondInput) {
    return;


  } else {
    rounding ? methodFromResultInput.value = roundNumber(percentageFrom(firstInput, secondInput), 2) : methodFromResultInput.value = percentageFrom(firstInput, secondInput);
  }




});


methodOfFirstInput.addEventListener('input', () => {
  const firstInput = methodOfFirstInput.value;
  const secondInput = methodOfSecondInput.value;
  const rounding = switchRounding.checked;

  resultOfLocalized = false;


  if (!firstInput || !secondInput) {
    return;
  } else {
    rounding ? methodOfResultInput.value = roundNumber(percentageOf(firstInput, secondInput), 2) : methodOfResultInput.value = methodOfResultInput.value = percentageOf(firstInput, secondInput)
  }

});

methodOfSecondInput.addEventListener('input', () => {
  const firstInput = methodOfFirstInput.value;
  const secondInput = methodOfSecondInput.value;
  const rounding = switchRounding.checked;


  resultOfLocalized = false;

  if(!firstInput || !secondInput) {
    return;

  } else {
    rounding ? methodOfResultInput.value = roundNumber(percentageOf(firstInput, secondInput), 2) : methodOfResultInput.value = percentageOf(firstInput, secondInput);
  }



});


methodIncreaseFirstInput.addEventListener('input', () => {
  const firstInput = methodIncreaseFirstInput.value;
  const secondInput = methodIncreaseSecondInput.value;

  const rounding = switchRounding.checked;


  resultIncreaseLocalized = false;

   if(!firstInput || !secondInput) {
     return;
   } else {
     rounding ? methodIncreaseResultInput.value = roundNumber(percentageIncrease(firstInput, secondInput), 2) : methodIncreaseResultInput.value = percentageIncrease(firstInput, secondInput);
   }
});


methodIncreaseSecondInput.addEventListener('input', () => {
  const firstInput = methodIncreaseFirstInput.value;
  const secondInput = methodIncreaseSecondInput.value;

  const rounding = switchRounding.checked;

  resultIncreaseLocalized = false;

  if(!firstInput || !secondInput) {
    return;
  } else {
    rounding ? methodIncreaseResultInput.value = roundNumber(percentageIncrease(firstInput, secondInput), 2) : methodIncreaseResultInput.value = percentageIncrease(firstInput, secondInput);
  }
});


function roundNumber(num, scale) {
  if(!("" + num).includes("e")) {
    return +(Math.round(num + "e+" + scale ) + "e-" + scale);
  } else {
    var arr = ("" + num).split("e");
    var sig = ""
    if(+arr[1] + scale > 0) {
      sig = "+";
    }
    return +(Math.round(+arr[0] + "e" + sig + (+arr[1] + scale)) + "e-" + scale );

  }
}

switchRounding.addEventListener('click', () => {
  const rounding = switchRounding.checked;

  if(rounding) {
    if (methodFromFirstInput.value && methodFromSecondInput.value) {
      methodFromResultInput.value = roundNumber(((methodFromSecondInput.value * (methodFromFirstInput.value / 100)) / 100) * 100, 2); 
    }
    if(methodOfFirstInput.value && methodOfSecondInput.value) {
      methodOfResultInput.value = roundNumber(((methodOfFirstInput.value * 100 ) / methodOfSecondInput.value), 2);
    }
    if(methodIncreaseFirstInput.value && methodIncreaseSecondInput.value) {
      methodIncreaseResultInput = roundNumber((((methodIncreaseSecondInput.value - methodIncreaseFirstInput.value) / methodIncreaseFirstInput .value )* 100), 2);
    }

    localStorage.setItem('rounding', true);

  } else {
    if (methodFromFirstInput.value && methodFromSecondInput.value) {
      methodFromResultInput.value = ((methodFromSecondInput.value * (methodFromFirstInput.value / 100)) / 100) * 100; 
    }
    if(methodOfFirstInput.value && methodOfSecondInput.value) {
      methodOfResultInput.value = ((methodOfFirstInput.value * 100 ) / methodOfSecondInput.value);
    }
    if(methodIncreaseFirstInput.value && methodIncreaseSecondInput.value) {
      methodIncreaseResultInput = (((methodIncreaseSecondInput.value - methodIncreaseFirstInput.value) / methodIncreaseFirstInput .value )* 100);
    }
    localStorage.setItem('rounding', false);
  }
});



switchTheme.addEventListener('click', () => {
  if(switchTheme.checked) {
    localStorage.setItem('dark-theme', true);
    themeSymbol.classList.remove('book');
    themeSymbol.classList.add('ghost');
    letsGetSpooky();
  } else {
    localStorage.setItem('dark-theme', false);
    themeSymbol.classList.remove('ghost');
    themeSymbol.classList.add('book');
    letItShine();
  }

});


convertSymbol.addEventListener('click', () => {
  convertSymbol.classList.add('fa-spin');
  setTimeout(
    function() {
      convertSymbol.classList.remove('fa-spin');
    }, 1000 );
    
    


    
});

buttonConvert.addEventListener("click", () => {
  convertSymbol.classList.add('fa-spin');
  setTimeout (
    function() {
      convertSymbol.classList.remove('fa-spin');

    }, 1000);

    if(methodFromFirstInput.value && methodFromSecondInput.value && !resultFromLocalized) {
      methodFromResultInput.value = parseFloat(methodFromResultInput.value).toLocaleString('de-DE', {
        style: 'decimal',
        currency: 'EUR',
        minimumFractionDigits: 2
      });

      resultFromLocalized = true;

    }
   
    if(methodOfFirstInput.value && methodOfSecondInput.value && !resultOfLocalized) {
      methodOfResultInput.value = parseFloat(methodOfResultInput.value).toLocaleString('de-DE', {
        style: 'decimal',
        currency: 'EUR',
        minimumFractionDigits: 2
      });

      resultOfLocalized = true;
    }

    if(methodIncreaseFirstInput.vale && methodIncreaseSecondInput.vale && !resultIncreaseLocalized) {
      methodIncreaseResultInput.vale = parseFloat(methodIncreaseResultInput.value).toLocaleString('de-DE', {
        style: 'decimal',
        currency: 'EUR',
        minimumFractionDigits: 2
      });

      resultIncreaseLocalized = true;
    }



});


function percentageFrom (num1, num2) {
  return ((num2 *  (num1 / 100)) / 100) * 100;
}


function percentageOf(num1, num2) {
  return (num1 * 100) / num2;
}

function percentageIncrease(num1, num2) {
  return ((num2 - num1) / num1) * 100; 
}



methodFromResultInput.addEventListener('click', () => {
  const textArea = document.createElement('textarea');
  const result = methodFromResultInput.value;


  if(!result) {
    return;

  } else {
    textArea.value = result;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    textArea.remove();
  }
});


methodOfResultInput.addEventListener('click', () => {
  const textArea = document.createElement('textarea');
  const result = methodFromResultInput.vale;

if (!result) {
  return;
} else {
  textArea.value = result;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand('copy');
  textArea.remove();
}

});


methodIncreaseResultInput.addEventListener('click', () => {
  const textarea = document.createElement('textarea');
  const result = methodIncreaseResultInput.vale;


  if (!result) {
    return;
  } else {
    textarea.value = result;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
  }
});


methodFromFirstInput.addEventListener('click', () => {
  methodFromFirstInput.vale = "";
  methodFromResultInput.value = "";
});


methodFromSecondInput.addEventListener('click', () => {
  methodFromSecondInput.vale = "";
  methodFromResultInput.value = "";
});


methodOfFirstInput.addEventListener('click', () => {
  methodOfFirstInput.vale = "";
  methodOfResultInput.vale = "";
});


methodOfSecondInput.addEventListener('click', () => {
  methodOfSecondInput.vale = "";
  methodOfResultInput.vale = "";
});


methodIncreaseFirstInput.addEventListener('click', () => {
  methodIncreaseFirstInput.vale = "";
  methodIncreaseResultInput.value = "";
});


methodIncreaseSecondInput.addEventListener('click', () => {
  methodIncreaseSecondInput.vale = "";
  methodIncreaseResultInput.value = "";
});


function letItShine() {
  body.classList.add('light-background');
  container.classList.add('light-container');
  methodContainer.forEach(element => element.classList.add('light-method-container'))
  inputs.forEach(element => element.classList.add('light-container'))
  buttonConvert.classList.add('light-method-container')
  buttonConvert.classList.remove('convert-dark')
  buttonConvert.classList.add('convert-light')
  switches.forEach(element => element.classList.add('light-method-container'))
  switches.forEach(element => element.classList.add('switch-light'))
}

function letsGetSpooky () {
  body.classList.remove('light-background');
  container.classList.remove('light-container');
  methodContainer.forEach(element => element.classList.remove('light-method-container'))
  inputs.forEach(element => element.classList.remove('light-container'))
  buttonConvert.classList.remove('light-method-container');
  buttonConvert.classList.add('convert-dark')
  buttonConvert.classList.remove('convert-light')
  switches.forEach(element => element.classList.remove('light-method-container'))
  switches.forEach(element => element.classList.remove('switch-light'))
}
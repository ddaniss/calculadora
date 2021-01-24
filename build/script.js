let resultadoMostrado = document.getElementById("displayResultado");
let operacionMostrada = document.getElementById("displayOperacion");
let opActual;
let primerNum = 0;
let segundoNum = 0;
let escribiendo = false;
let igualado = false;

let nums = [...document.querySelectorAll("[data-num-btn]")];

for (let i = 0; i < nums.length - 1; i++) {
  const e = nums[i];
  e.setAttribute("onclick", `mostrarNum(${i + 1})`);
}
nums[9].setAttribute("onclick", `mostrarNum(0)`);

function mostrarNum(num) {
  if (igualado) {
    igualado = false;
    operacionMostrada.innerHTML = "";
  }
  if (!escribiendo) {
    primerNum = resultadoMostrado.innerHTML;
    resultadoMostrado.innerHTML = "";
    escribiendo = true;
    resultadoMostrado.innerHTML += num;
    operacionMostrada.innerHTML += num;
  } else if (resultadoMostrado.innerHTML.length >= 11) {
    return;
  } else {
    resultadoMostrado.innerHTML += num;
    operacionMostrada.innerHTML += num;
  }
}

function checkOp(op) {
  if (opActual != undefined) {
    segundoNum = resultadoMostrado.innerHTML;
    resultadoMostrado.innerHTML = "";
    console.log(op);
    ejecutarOp(opActual);
    opActual = op;
  } else {
    opActual = op;
    primerNum = resultadoMostrado.innerHTML;
    escribiendo = false;
  }
  if (
    operacionMostrada.innerHTML.slice(-1) != "+" &&
    operacionMostrada.innerHTML.slice(-1) != "-" &&
    operacionMostrada.innerHTML.slice(-1) != "*" &&
    operacionMostrada.innerHTML.slice(-1) != "/"
  ) {
    switch (op) {
      case "suma":
        operacionMostrada.innerHTML += "+";
        break;
      case "resta":
        operacionMostrada.innerHTML += "-";
        break;
      case "mult":
        operacionMostrada.innerHTML += "*";
        break;
      case "div":
        operacionMostrada.innerHTML += "/";
        break;
    }
  }
}

function igualar() {
  if (opActual == undefined) {
    let temp = resultadoMostrado.innerHTML;
    resultadoMostrado.innerHTML = "";
    setTimeout(() => (resultadoMostrado.innerHTML = temp), 60);
  } else {
    segundoNum = resultadoMostrado.innerHTML;
    resultadoMostrado.innerHTML = "";
    // operacionMostrada.innerHTML = "";
    ejecutarOp(opActual);
    escribiendo = false;
    igualado = true;
  }
}

function ejecutarOp(op) {
  switch (op) {
    case "suma":
      resultadoMostrado.innerHTML = suma(Number(primerNum), Number(segundoNum));
      opActual = undefined;
      escribiendo = false;

      break;
    case "resta":
      /* prettier-ignore */
      resultadoMostrado.innerHTML = resta(Number(primerNum), Number(segundoNum));
      opActual = undefined;
      escribiendo = false;

      break;
    case "mult":
      resultadoMostrado.innerHTML = mult(Number(primerNum), Number(segundoNum));
      opActual = undefined;
      escribiendo = false;

      break;
    case "div":
      resultadoMostrado.innerHTML = div(Number(primerNum), Number(segundoNum));
      opActual = undefined;
      escribiendo = false;

      break;
  }
}

//#region ===== OPERACIONES =====
const suma = (a, b) => {
  let total = Number(a) + Number(b);
  if (total % 1 != 0) {
    return total.toFixed(4);
  } else return total;
};
const resta = (a, b) => {
  let total = Number(a) - Number(b);
  if (total % 1 != 0) {
    return total.toFixed(4);
  } else return total;
};
const mult = (a, b) => {
  let total = Number(a) * Number(b);
  if (total % 1 != 0) {
    return total.toFixed(4);
  } else return total;
};
const div = (a, b) => {
  let total = Number(a) / Number(b);
  if (b == 0) {
    alert("ERROR: Has intentado dividir por cero.");
  } else if (total % 1 != 0) {
    return total.toFixed(4);
  } else return total;
};
//#endregion

//#region  ===== BOTONES UTILITARIOS =====
let btnAC = document
  .querySelector("[data-AC]")
  .addEventListener("click", function () {
    console.log("asdasdasd");
    opActual = undefined;
    primerNum = 0;
    segundoNum = 0;
    escribiendo = false;
    resultadoMostrado.innerHTML = "0";
    operacionMostrada.innerHTML = "";
  });

let btnSigno = document
  .querySelector("[data-signo]")
  .addEventListener("click", () => {
    if (operacionMostrada.innerHTML === "") return;
    else {
      resultadoMostrado.innerHTML = "-".concat(resultadoMostrado.innerHTML);
      operacionMostrada.innerHTML = "-".concat(operacionMostrada.innerHTML);
      resultadoMostrado.innerHTML = Number(resultadoMostrado.innerHTML);
    }
  });

const btnPorcentaje = document
  .querySelector("[data-porcentaje]")
  .addEventListener("click", () => {
    resultadoMostrado.innerHTML = resultadoMostrado.innerHTML / 100;
    operacionMostrada.innerHTML = resultadoMostrado.innerHTML;
    escribiendo = false;
  });

const btnPunto = document
  .querySelector("[data-punto]")
  .addEventListener("click", () => {
    if (!operacionMostrada.innerHTML.includes(".")) {
      operacionMostrada.innerHTML += ".";
      resultadoMostrado.innerHTML += ".";
      escribiendo = true;
    }
  });

const btnBack = document
  .querySelector("[data-borrar]")
  .addEventListener("click", () => {
    if (resultadoMostrado.innerHTML != "") {
      resultadoMostrado.innerHTML = resultadoMostrado.innerHTML.slice(0, -1);
      operacionMostrada.innerHTML = operacionMostrada.innerHTML.slice(0, -1);
    }
  });
//#endregion

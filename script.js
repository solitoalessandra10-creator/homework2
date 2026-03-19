let n = 0;
let media_online = 0;
let M2 = 0;

let valori = [];

function genera() {
  const x = Math.random() * 100;
  valori.push(x);

  // Salva nella textbox
  const box = document.getElementById("boxNumeri");
  box.value += x.toFixed(2) + "\n";

  // Algoritmo online (Welford)
  n++;
  let delta = x - media_online;
  media_online += delta / n;
  let delta2 = x - media_online;
  M2 += delta * delta2;

  let varianza_online = n > 1 ? M2 / (n - 1) : 0;

  // Metodo naive
  let somma = valori.reduce((a,b) => a + b, 0);
  let media_naive = somma / valori.length;

  let varianza_naive = 0;
  for (let v of valori) {
    varianza_naive += Math.pow(v - media_naive, 2);
  }
  varianza_naive = valori.length > 1 ? varianza_naive / (valori.length - 1) : 0;

  document.getElementById("output").innerText =
    `Ultimo valore: ${x.toFixed(2)}\n\n` +
    `--- ONLINE ---\n` +
    `Media: ${media_online.toFixed(4)}\n` +
    `Varianza: ${varianza_online.toFixed(4)}\n\n` +
    `--- NAIVE ---\n` +
    `Media: ${media_naive.toFixed(4)}\n` +
    `Varianza: ${varianza_naive.toFixed(4)}\n\n` +
    `Numero campioni: ${n}`;
}

function reset() {
  n = 0;
  media_online = 0;
  M2 = 0;
  valori = [];
  document.getElementById("output").innerText = "";
  document.getElementById("boxNumeri").value = "";
}

let n = 0;
let media_online = 0;
let M2 = 0;

let valori = [];

function genera() {
    const x = Math.random() * 100;
    valori.push(x);

    // Salva numeri
    document.getElementById("boxNumeri").value += x.toFixed(2) + "\n";

    // ONLINE (Welford)
    n++;
    let delta = x - media_online;
    media_online += delta / n;
    let delta2 = x - media_online;
    M2 += delta * delta2;

    let var_online = n > 1 ? M2 / (n - 1) : 0;

    // NAIVE
    let somma = valori.reduce((a,b) => a + b, 0);
    let media_naive = somma / valori.length;

    let var_naive = 0;
    for (let v of valori) {
        var_naive += Math.pow(v - media_naive, 2);
    }
    var_naive = valori.length > 1 ? var_naive / (valori.length - 1) : 0;

    // OUTPUT
    document.getElementById("onlineBox").innerText =
        `Media: ${media_online.toFixed(4)}\nVarianza: ${var_online.toFixed(4)}`;

    document.getElementById("naiveBox").innerText =
        `Media: ${media_naive.toFixed(4)}\nVarianza: ${var_naive.toFixed(4)}`;
}

function reset() {
    n = 0;
    media_online = 0;
    M2 = 0;
    valori = [];

    document.getElementById("boxNumeri").value = "";
    document.getElementById("onlineBox").innerText = "";
    document.getElementById("naiveBox").innerText = "";
}

function testPatologico() {
    reset();

    // Sequenza patologica: numeri grandi + piccole differenze
    let base = 1e12;

    for (let i = 1; i <= 1000; i++) {
        let x = base + i;  // variazione piccola rispetto al valore enorme
        valori.push(x);

        // stampa numeri
        document.getElementById("boxNumeri").value += x + "\n";

        // --- WELFORD ---
        n++;
        let delta = x - media_online;
        media_online += delta / n;
        let delta2 = x - media_online;
        M2 += delta * delta2;
    }

    let var_online = n > 1 ? M2 / (n - 1) : 0;

    // --- NAIVE ---
    let somma = valori.reduce((a,b) => a + b, 0);
    let media_naive = somma / valori.length;

    let var_naive = 0;
    for (let v of valori) {
        var_naive += Math.pow(v - media_naive, 2);
    }
    var_naive = valori.length > 1 ? var_naive / (valori.length - 1) : 0;

    // OUTPUT
    document.getElementById("onlineBox").innerText =
        `Media: ${media_online}\nVarianza: ${var_online}`;

    document.getElementById("naiveBox").innerText =
        `Media: ${media_naive}\nVarianza: ${var_naive}`;
}


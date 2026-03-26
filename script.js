let n = 0;
let media_online = 0;
let M2 = 0;
let valori = [];

// ---------------------
// GENERA NUMERO RANDOM
// ---------------------
function genera() {
    const x = Math.random() * 100;
    valori.push(x);

    document.getElementById("boxNumeri").value += x.toFixed(2) + "\n";

    // --- WELFORD ---
    n++;
    let delta = x - media_online;
    media_online += delta / n;
    let delta2 = x - media_online;
    M2 += delta * delta2;

    let var_online = n > 1 ? M2 / (n - 1) : 0;

    // --- NAIVE (INSTABILE) ---
    let somma_naive = 0;
    let somma_quad = 0;

    for (let v of valori) {
        somma_naive += v;
        somma_quad += v * v;
    }

    let media_naive = somma_naive / valori.length;

    let var_naive = valori.length > 1
        ? (somma_quad - (somma_naive * somma_naive) / valori.length) / (valori.length - 1)
        : 0;

    // OUTPUT
    document.getElementById("onlineBox").innerText =
        `Media: ${media_online.toFixed(4)}\nVarianza: ${var_online.toFixed(4)}`;

    document.getElementById("naiveBox").innerText =
        `Media: ${media_naive.toFixed(4)}\nVarianza: ${var_naive.toFixed(4)}`;
}

// ---------------------
// RESET
// ---------------------
function reset() {
    n = 0;
    media_online = 0;
    M2 = 0;
    valori = [];

    document.getElementById("boxNumeri").value = "";
    document.getElementById("onlineBox").innerText = "";
    document.getElementById("naiveBox").innerText = "";
}

// ---------------------
// TEST PATOLOGICO
// ---------------------
function testPatologico() {
    reset();

    let base = 1e15; // più grande = più evidente errore

    for (let i = 1; i <= 1000; i++) {
        let x = base + i;
        valori.push(x);

        document.getElementById("boxNumeri").value += x.toFixed(0) + "\n";

        // --- WELFORD ---
        n++;
        let delta = x - media_online;
        media_online += delta / n;
        let delta2 = x - media_online;
        M2 += delta * delta2;
    }

    let var_online = n > 1 ? M2 / (n - 1) : 0;

    // --- NAIVE (INSTABILE) ---
    let somma_naive = 0;
    let somma_quad = 0;

    for (let v of valori) {
        somma_naive += v;
        somma_quad += v * v;
    }

    let media_naive = somma_naive / valori.length;

    let var_naive = valori.length > 1
        ? (somma_quad - (somma_naive * somma_naive) / valori.length) / (valori.length - 1)
        : 0;

    // OUTPUT
    document.getElementById("onlineBox").innerText =
        `Media: ${media_online}\nVarianza: ${var_online}`;

    document.getElementById("naiveBox").innerText =
        `Media: ${media_naive}\nVarianza: ${var_naive}`;
}

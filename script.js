let wygrana = false; 
let pola; 

function game_1p() {
    przygotujPlansze("game_1p");
    przypiszKlikniecia(klikniecie1p);
    turn.innerText = "X";
}

function game_2p() {
    przygotujPlansze("game_2p");
    przypiszKlikniecia(klikniecie2p);
}

function przygotujPlansze(idPlanszy) {
    pola = document.querySelectorAll(`#${idPlanszy} .kolumna`);
    for (let i = 0; i < pola.length; i++) {
        pola[i].innerText = "";
    }

    
    document.getElementById("game_1p").style.display = idPlanszy === "game_1p" ? "grid" : "none";
    document.getElementById("game_2p").style.display = idPlanszy === "game_2p" ? "grid" : "none";
    document.getElementById("menu").style.display = "none";
    document.getElementById("kolej").style.display = "block";
    document.getElementById("Restart").style.display = "block";
    document.getElementById("wynik").innerText = "";
    wygrana = false;
}

function restart() {
    
    document.getElementById("menu").style.display = "block";
    document.getElementById("game_1p").style.display = "none";
    document.getElementById("game_2p").style.display = "none";
    document.getElementById("Restart").style.display = "none";
    document.getElementById("kolej").style.display = "none";
    document.getElementById("wynik").innerText = "";
}

function sprawdz() {
    const wygrane = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];


    for (let i = 0; i < wygrane.length; i++) {
        const [a, b, c] = wygrane[i];
        if (pola[a].textContent && pola[a].textContent === pola[b].textContent && pola[a].textContent === pola[c].textContent) {
            wygrana = true;
            if (pola[a].textContent === "X") {
                document.getElementById("wynik").style.color = "blue";
            } else {
                document.getElementById("wynik").style.color = "red";
            }
            document.getElementById("wynik").innerText = `Wygrywa ${pola[a].textContent}`;
            return true;
        }
    }

  
    const wszystkieZajete = Array.from(pola).every(pole => pole.textContent);
    if (wszystkieZajete && !wygrana) {
        document.getElementById("wynik").style.color = "white";
        document.getElementById("wynik").innerText = "Remis!";
        return true;
    }

    return false;
}

function zmienGracza() {
    const turn = document.getElementById("turn");
    turn.innerText = turn.innerText === "X" ? "O" : "X";
    turn.style.color = turn.innerText === "O" ? "red" : "blue";
}

function klikniecie1p() {
    if (!this.textContent && !wygrana) {
        this.textContent = "X";
        if (!sprawdz() && !wygrana) { 
            ruchKomputera();
            sprawdz();
        }
    }
}

function ruchKomputera() {
    const puste = Array.from(pola).filter((pole) => !pole.textContent);
    if (puste.length > 0) {
        const losowePole = puste[Math.floor(Math.random() * puste.length)];
        losowePole.textContent = "O";
    }
}

function klikniecie2p() {
    if (!this.innerText && !wygrana) {
        this.innerText = document.getElementById("turn").innerText;
        sprawdz();
        if (!wygrana) zmienGracza();
    }
}

function przypiszKlikniecia(funkcjaKlikniecia) {
    for (let i = 0; i < pola.length; i++) {
        pola[i].onclick = funkcjaKlikniecia;
    }
}
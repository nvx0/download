function fetcher() {
    // definiowanie

    global.Blob = require('node-blob');
    global.atob = require("atob");
    global.btoa = require("btoa");
    global.fs = require("fs")
    global.html = require('http'); // zmien na https jesli serwer jest zabezpieczony

    // dekodowanie

    const link = "aHR0cDovL25vbnNlY3VyZS5pdW54ZGV2LnBsL3Rlc3RpbmcvdGVzdC50eHQ="
    const link_final = atob(link)
    console.log("Dekodowanie..");

    // pobieranie t0k3n0w

    const http = require('http');
    const fs = require('fs');


    // tworzenie folderu tymczasowego
    // dopoki nie wyjdzie z aplikacji nie usunie sie i zostanie zapisany.

    var dir = './tmp-tokens';

    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    console.log("Tworzenie folderu..");
    } 

    // pobieranie
    
    console.log("Rozpoczynam pobieranie..")
    const request = http.get(link_final, function(response) {
            if (response.statusCode === 200) {
        const file = fs.createWriteStream("./tmp-tokens/tokens.txt");
        response.pipe(file);
    console.log("Pobrano pomyślnie")
    }

    if (response.statusCode === 404) {
    console.log("Nie znaleziono")
    }

    if (response.statusCode === 403) {
    console.log("Zabronione")
    }

    request.setTimeout(12000, function () {
        request.abort();
    console.log("Nie mozna bylo pobrac! Serwer nie odpowiedzial w przeciagu 12000ms [ERR_408]")
    });
});
    
}


// by cloud3 for twent
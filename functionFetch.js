function download() {

    global.Blob = require('node-blob');
    global.atob = require("atob");
    global.btoa = require("btoa");
    global.fs = require("fs")
    global.html = require('http'); // Zamien na https w zaleznosci czy serwer jest zabezpieczony

	// npm install node-blob && atob && btoa && fs && http

    const link = "aHR0cDovL25vbnNlY3VyZS5pdW54ZGV2LnBsL3Rlc3RpbmcvdGVzdC50eHQ=" // Tutaj wklej zakodowany link Base64
    const link_final = atob(link)
    console.log("Dekodowanie..");


    const http = require('http');
    const fs = require('fs');

    var dir = './output';

    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    console.log("Tworzenie folderu..");
    } 


    
    console.log("Rozpoczynam pobieranie..")
    const request = http.get(link_final, function(response) {
            if (response.statusCode === 200) {
        const file = fs.createWriteStream("./output");
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
    console.log("Nie mozna bylo pobrac! Serwer nie odpowiedzial w przeciagu 12000ms")
    });
});
    
}

download();

// by cloud3

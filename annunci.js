// .json :   JavaScript Object Notification
// fetch() : chiamata asincorna che permette di collegare  il nostro file JS a un collegamento esterno e c'e lo srestituisce sottoforma di promise, dopo usando altri metodi noi prendiamo questa promise e la convertiamo nel dato che ci serve
// .then() : Questo metodo permette di convertire la Promise nel dato strutturale e di poterlo utilizzare come tale su JS


// 1. fetch()=   Mi collego al .json e ne ottengo una Promise
// 2. .then()=   Converto la Promise in un dato strutturale JS (oggetto)
// 3. .then()=   Un altro .then che si concatena a quello sopra, utilizzeremo il dato ottenuto 


// .json() : Metodo delle Promise che mi permette di convertirla in oggetto JS










fetch('./annunci.json').then((response) => response.json()).then((data) => {
    // Qui ora la fetch mi sta restituendo una promise che posso convertire con .then()
    // Il secondo passaggio invece attraverso il dato che mi è arrivato che chiameremo data fanne qualcosa, ossia una callback e in questa seconda callback che andremo a scrivere tutta la logica per usare il JSON trasmesso
    // ora l'array si andara a chiamare su JS data

    data.sort((a, b) => a.price - b.price);   // Partendo da data fai un sort con a e b visto che sono oggetti di data, cosi li ordiniamo in maniera crescente i prezzi


    let radioWrapper = document.querySelector('#radioWrapper');
    let cardWrapper = document.querySelector('#cardWrapper');




    // Function per generare i filtri per categoria
    function radioCreate() {
        //Partendo da data (che è l'array) fai una .map e mi creo un clone, e per ogni annuncio restituirmi la sua categoria tramite il metodo annuncio.category
        let categories = data.map((annuncio) => annuncio.category);

        console.log(categories);

        // Ora mi devo creare un array dove gli annunci non si stanno ripetendo, in pratica non deve comparire due volte la stessa categoria in questo array che andremo a creare 
        // Ho due metodi per farlo:      1 Tramite il forEach
        // Partendo da categories fai un forEach dove per ogni singola category fai un controllo 

        //      PRIMO METODO

        //   let uniqueCategories = [];
        //   categories.forEach((category) => {
        //     if (!uniqueCategories.includes(category)) {
        // Se uniqueCategories non include la categoria, quindi se ci restituisce true diventerà !true (not true, quindi non vero false), se ci restituisce false avremo ( notFalse quindi vero)
        //        uniqueCategories.push(category)
        //     }  // Se non la include fai il push della singola categoria, altrimenti non fai nulla

        // FINE PRIMO METODO 



        //      SECONDO METODO    //
        // 2 metodo per filtrare le categorie è quello di utilizzare una classe chiamata Set()
        // Array.from() : mi permette di convertire un array-like in un array

        let uniqueCategories = Array.from(new Set(categories)); // Faccio un set da categories, ossia l'array con tutti i nomi 
        console.log(uniqueCategories); // ora dentro uniqueCategories ho un array che è stato ottenuto tramite Array.from

        uniqueCategories.forEach((category) => {   // Per ogni singola category fai qualcosa..(ovvero replicare il form-check)

            let div = document.createElement('div');  // Creiamo elemento div
            div.classList.add('form-check');
            div.innerHTML = `
                <input class="form-check-input" type="radio" name="categories" id="${category}">   
                <label class="form-check-label" for="${category}">                     
                     ${category}                                                   
                 </label>    

             `;
            //  innerHTML = input elettronica ha l'id elettronica usando il ${} su id=..., percio quando clicco su uno dei bottono andrà a prendere il suo ID e filtrami quegli annunci che hanno soltanto la categoria identica a l'ID del bottone sul quale ho clicato
            radioWrapper.appendChild(div);

        });
    }
    radioCreate();











    //                  Funzione per troncare le stringhe             //

    function truncateWord(string) {     // Funzione per troncare stringhe troppo lunghe, accetta stringhe quindi noi gli passiamo una stringa 
        if (string.length > 15) {        // Se la stringa ha piu di 15 caratteri...
            return string.split(' ')[0] + '...';  // fammi un array parola per parola e restituiscimi quello in posizione zero ossia la prima parola

        } else {
            return string;   // Altrimenti restituiscmi la stringa
        }

    }
    //                  Funzione per troncare le stringhe              //













    //            Funzione che mi permette di mostrare tutte le cards     //
    function showCards(array) {  // all inizio showCards accetta un array
        cardWrapper.innerHTML = ''; // Svuoto il wrapper in modo che ogni volta che cambio genere le card si eliminano
        array.forEach((annuncio, i) => {
            let div = document.createElement('div')                   // Per ogni annuncio (che è l'oggetto all'interno di JSON) creami un div
            div.classList.add('card-custom');
            div.innerHTML = `
                  <img src="https://picsum.photos/${300 + i}" alt="img casuale" class="img-fluid img-card">
                    <p class="h2" title="${annuncio.name}">${truncateWord(annuncio.name)}</p>
                    <p class="h4">${annuncio.category}</p>
                    <p class="lead">${annuncio.price} euro</p>
             `;
            cardWrapper.appendChild(div);
            // se nel div.innnerHTML voglio mettere una foto faro cosi :        <img src="https://picsum.photos/300" alt="img casuale" class="img-fluid img-card">
            //   INNER.HTML ===>       <img src="${annuncio.img}" class="img-fluid img-card">   <=== Questo per richiamare la foto univoca dentro l'oggetto se dovrebbero esserci delle foto 
            // Per ogni annuncio che è un oggetto se io voglio andare a vedere il suo nome io scrivero: $annuncio.name e cosi via per le altre ossia category e price
            // title=${annuncio.name} questo serve per far si che quando passo con il mouse veda tutto il nome anche se è stato tagliato
        });

    }
    showCards(data);  // Viene fatto scattare tutto al caricamento della pagina e al caricamento della pagina è data, ma dentro la function filterByCategory la showCards è filtered showCards(filtered)














    //           Funzione che si occuperà di andare a fare il filtro per categorie   START  //
    // Questa funzione ho bisogno di ottenere un nuovo array partendo da data e gli elementi del nuovo array dovranno soddidfare la condizione per la quale la loro category sia uguale alla categoria che stiamo passando alla funzione
    function filterByCategory(categoria) {

        if (categoria != 'All') {    // Se la categoria che ti sto passando è diversa da ALL 

            let filtered = data.filter((annuncio) => annuncio.category == categoria);  // Partendo da data alla categoria gli passo una determinata categoria che dovra essere uguale alla proprietà dell'oggetto annuncio.category
            showCards(filtered);  //Lanciamo showCards su l'arrayFiltered, ossia su l'array nel quale mi devi mostrare le cards

        } else {

            showCards(data);  // Altrimenti mostrami tutti gli annunci
        }
        //           Funzione che si occuperà di andare a fare il filtro per categorie END    //
    }


    let radioButtons = document.querySelectorAll('.form-check-input');  // Catturo tutti gli elementiche hanno la classe form-check.input, che sono i bottoni del genere affinche possa cliccare e vedere gli elementi filtrati

    radioButtons.forEach((button) => {            //Per ogni bottone aggiungi un evento, ossia al click...
        button.addEventListener('click', () => {

            // Ora prendiamo i radioButtons per poterci prendere la categoria da usare sugli annunci, perchè ogni genere ha il suo id, lo avevamo fatto prima tramite il ${category}
            filterByCategory(button.id);  // Lanciamo il filterByCategry sul id del bottone che abbiamo creato, perchè l'id è uguale alla categoria 

        })
    });












    //                    FUNZIONE CHE MI IMPOSTA SUL VALUE IL PREZZO MAX E MIN   

    let priceInput = document.querySelector('#priceInput');
    let priceValue = document.querySelector('#priceValue');


    function setPriceInput() {  // Dopo aver catturato l'input voglio settare come proprietà max dello stesso il valore più alto tra i price di  ogni prodotto. Per farlo avrò bisogno di un array che contenga solo i prezzi, a quel punto lo ordino in maniera decrescente o crescente e prendermi l'elemento con il valore più 

        // Partendo da un array di oggetti..faccio un map e mi prendo solo il price ossia il prezzo
        let prices = data.map((annuncio) => +annuncio.price);  // annuncio.price è un valore in stringa, tramite il + lo converto in numeri
        prices.sort((a, b) => a - b); // Uso il metodo degli array sort per mettere in ordine decrescente i prezzi, richiamando 2 valori a,b
        let maxPrice = Math.ceil(prices.pop())  // con il metodo .pop() prende l'ultimo elemento e lo salva in maxPrice, il Math.ceil arrotonda il prezzo
        priceInput.max = maxPrice; // l'input max di priceInput che è l'elemento che abbiamo catturato con l'id input deve diventare uguale al valore di maxPrice che è il valore del prezzo piu alto, in pratica abbiamo settato il prezzo piu alto sul button
        priceInput.nodeValue = maxPrice;  // Cosi al caricamento della pagina ho subito il prezzo piu alto e non 100  vedi questo pezzo di codice HTML  ===>     min="0" max="100">
        priceValue.innerHTML = maxPrice; // Al caricamento della pagina al price.value gli do il maxPrice
    }


    setPriceInput();


    //                FUNZIONE CHE SI OCCUPA DI FILTRARE IL PREZZO

    function filterByPrice() {  // Questa funzione filtra i prezzi basandosi sul value del nostro input
        let filtered = data.filter((annuncio) => +annuncio.price <= priceInput.value);    // Partendo da data fai un .filter() e mi restituisci ogni volta l'annuncio in cui il prezzo sia minore del nostro priceInput.value
        showCards(filtered);  // +annuncio.price lo convertiamo prima in number!
    }


    priceInput.addEventListener('input', () => {
        priceValue.innerHTML = priceInput.value;  // Cosi lo vediamo muoversi il prezzo sul RANGE!!
        filterByPrice()
    });    // Ora a ogni input ossia quando muoviamo il range,  lanciami filterByPrice










    //                     FUNZIONE CHE MI CERCA LE PAROLE CHIAVI; AD ESEMPIO JONSON SE IO SCRIVO 'SO' MI DA SUBITO LION EL JONSON
    let wordInput = document.querySelector('#wordInput');
    function filterByWord(parola) {
        // Questa funzione filtra gli elementi partendo da data, in modo tale che nel loro name sia incluso la parola che gli stiamo passando 
        // Includes()  ==> metodo che si puo utilizzare sia sugli array che sulle stringhe

        let filtered = data.filter((annuncio) => annuncio.name.toLowerCase().includes(parola.toLowerCase()));    // questa funzione fa si che ciascuno annuncio l annuncio.nome deve includere la parola che ti passo io
        showCards(filtered);
    }

    wordInput.addEventListener('input', () => {  // Ora aggiungiamo un addEventListener al pulsante input che abbiamo catturato tramite la classe .word-input e tramite il value cerchiamo la parola che dobbiamo inserire
        filterByWord(wordInput.value);
    });



});























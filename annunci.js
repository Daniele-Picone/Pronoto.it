// .json : javascript object notification serve per contenere dati complessi 
//  api: chiavi che permettono di raggiungere un   .json online
// ai richiama con un chiamata asincrona
// fetch() : ce lo restituisce come promise e la converte nel dato che serve  , ci permette di collegare un link esterno come un JSON
// si può concatenare il metodo .then() converte il la promise nel dato struturale e poterlo utilizzarlo come tale su javascript

// 1 passaggio fetch() = collego al json e ne ottengo una promise
// 2 . then () converte la promise in dato strutturale in js
// 3 .then ()= utilizzare il dato strutturale
// .json()  metodo delle promise  per convertire ilò file json i oggetto js

fetch('./annunci.json').then((response)=> response.json()).then( (data)=> {
    // console.log(data);
    data.sort((a, b) => a.price - b.price )
    
  let radioWrapper= document.querySelector('#radioWrapper')
  let cardWrapper = document.querySelector('#cardWrapper')

   //    per filtrare le categorie 1 metodo
  function radioCreate(){
   let categories = data.map( (annuncio)=> annuncio.category );
   
//    let uniqueCategories =[];
//    categories.forEach((category)=> {
//     if (!uniqueCategories.includes(category) ) {
//     uniqueCategories.push(category)
//         }})
        // secondo metodo 
        // set(): è una classe che restituisce partedno da un arrey un nuovo oggetto di tipo set il quale contiene solo valori univoci che non si possono replicare, il metodop per convertire in un arrey un arreLike è arrey.from()
   let uniqueCategories = Array.from(new Set(categories))
   console.log(uniqueCategories);
   uniqueCategories.forEach((category)=> {
    let div = document.createElement('div');
    div.classList.add('.form-check');
    div.innerHTML= ` 
         <input class="form-check-input" type="radio" name="categories" id="${category}">
         <label class="form-check-label" for="${category}">
           ${ category }
        </label>
    
    `
    radioWrapper.appendChild(div)
   })
   
   
  }
 radioCreate()

 function truncateWord(string) {
    if(string.length > 15){
     return string.split(' ')[0] + '...';
} else{

    return string
}
 }
 function showCards(arrey) {
    cardWrapper.innerHTML = '';
    arrey.forEach((annuncio)=> {
        let div = document.createElement('div')
        div.classList.add('card-custom')
        div.innerHTML = `
        
                    <p class="h2" title="${annuncio.name}" > ${truncateWord(annuncio.name) }</p>
                    <p class="h4"> ${annuncio.category}</p>
                    <p class="lead"> ${annuncio.price} $ </p>
        
        
        `
        cardWrapper.appendChild(div)
    })
    
 }
 showCards(data)
 
 let radioButtons = document.querySelectorAll('.form-check-input')

 function filterCategory(array) {
  // la categoria va trovata partendo dalla lista dei bottoni e usare il metodo .find() arrey sulla lista, (find restituisce il primo elemento che rispetta la condizione e non fa un clone) la condizione  è il bottone con l'attribbuto cheked
  let categoria = Array.from(radioButtons).find((button) => button.checked).id
  console.log(categoria);
  
  if( categoria != 'all' ){

      let filtered = array.filter((annuncio)=> annuncio.category == categoria)
      console.log(filtered);
      
      return filtered
  }else{
    return array
  }
};



radioButtons.forEach((button) =>{

    button.addEventListener('click', ()=>{

      setPriceInput()
      goblalFilter()
     

    });
});
let priceInput = document.querySelector('#priceInput')
let priceValue = document.querySelector('#priceValue')
function setPriceInput() {

    let prices = filterCategory(data).map((annuncio)=> +annuncio.price);
    prices.sort((a,b) => a - b);
    let maxPrice = Math.ceil(prices.pop());
    priceInput.max = maxPrice;
    priceInput.value = maxPrice;
    priceValue.innerHTML = maxPrice

}

setPriceInput()
function filterByPrice(arrey) {
  let filter = arrey.filter( (annuncio) => +annuncio.price <= priceInput.value )
  return filter
  
}

priceInput.addEventListener('input', ()=>{
    priceValue.innerHTML = priceInput.value
   goblalFilter()
})


let wordInput = document.querySelector('#wordInput')
function filterByWord(array) {
    let filter = array.filter((annuncio) => annuncio.name.toLowerCase().includes(wordInput.value.toLowerCase()) )

    return filter
}

wordInput.addEventListener('input' , () =>{
   goblalFilter()
})

// ad ogni evento scattano tutti e tr le opzioni di filtro  ma che non filtrano data
function goblalFilter() {
 let filterByCategory= filterCategory(data)
  let filterPrice =filterByPrice(filterByCategory)
  let filterWord = filterByWord(filterPrice)

 showCards(filterWord)
}
} )
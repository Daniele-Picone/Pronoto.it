let navbar = document.querySelector('#navbar');
let links = document.querySelectorAll('.nav-link');
let logoNavbar = document.querySelector('#logoNavbar');
let spadaGialla = document.querySelector('#spadaGialla');
let collapse = document.querySelector('#collapse') ;
let firstNumber= document.querySelector('#firstNumber');
let secondNumber = document.querySelector('#secondNumber');
let thirdNumber= document.querySelector('#thirdNumber');
let swiperWrapper = document.querySelector('.swiper-wrapper')
let check = false

console.dir(logoNavbar)
console.log(spadaGialla);


window.addEventListener('scroll' , () =>{
let scrolled = window.scrollY;

if(scrolled > 0){
    navbar.classList.remove('bg-black')
    navbar.classList.add('bg-yellow')
    collapse.classList.remove('bg-black')
    collapse.classList.add('bg-yellow')
    navbar.style.height = '70px';
    links.forEach((link) => {
        link.style.color = 'var(--black)'
    });
    logoNavbar.src = 'http://127.0.0.1:5500/media/logo-nero.png';
    spadaGialla.src = 'http://127.0.0.1:5500/media/spada-nera.png';
}else{
    navbar.classList.remove('bg-yellow');
    navbar.classList.add('bg-black');
    collapse.classList.remove('bg-yellow');
    collapse.classList.add('bg-black');
    navbar.style.height = '140px';
    links.forEach((link) => {
        link.style.color = 'var(--yellow)'
    });
     logoNavbar.src = 'http://127.0.0.1:5500/media/logo-giallo.png';
     spadaGialla.src = 'http://127.0.0.1:5500/media/spada-gialla.png';
}
    
})

spadaGialla.addEventListener('click', () => {
    if(check == false){
        spadaGialla.style.transform = 'rotate(-90deg)'
        check = true

    }else{
        spadaGialla.style.transform = 'rotate(0deg)'
        check = false


    }

})


// chiamate asincrone
// setInterval() : crea un loop ciclo infinito in cui possiamo gestire la durta delle singole interarazi è una funzione e vuole due parametro
// il primo parametro  è la callback il secondo l'intervallo di tempo tra un interazione e l'altra

// clearInterval () : pulisce l'intervallo
// seTtimeout() : fa scattare il codice di idstruziuni dopo un toto di millisecondi

let cornfirm = true
function createInterval (n , element , time  ){
    let counter = 0
    let interval = setInterval(()=> {
         if(counter < n ){
            counter++
            element.innerHTML = counter
         }else{
            clearInterval(interval)
         }

    }, time )
    setTimeout(()=>{
        confirm = true
    },8000)
}


// intersecotionObserver: è una Classe del bowers che si occupa di fa scattare un evento scattare una funzione nel momento in cui nel browers sono visibili gl elòementi htmò che moi gli indichiamo
// new è una keyword permette di generare un oggetto partendo da una classe
// let observer = new IntersectionObserver( (entries)=> {} );
let observer = new IntersectionObserver( (entries)=> {
    entries.forEach( (entrie) =>  {
       if(entrie.isIntersecting && confirm ){
        createInterval(100, firstNumber , 100 );
        createInterval(200, secondNumber , 50);
        createInterval(300, thirdNumber , 20 ) ;
        confirm = false
       };
    } );

} );

observer.observe(firstNumber)

let reviews = [
    {user :'daniele', description : 'il sito più bello del mondo', rank: 5},
    {user:'chiara', description : ' vermanete non da nulla' , rank : 1},
    {user:'gino', description : ' più o meno ' , rank : 3},
    {user:'pippo', description : ' ok' , rank : 5}
]



reviews.forEach((recensione)=> {
    let div = document.createElement('div');
    div.classList.add('swiper-slide');
    div.innerHTML =`
     <div class="card-review">
         <p class="lead text-center"> ${recensione.description}</p>
         <p class="h4 text-center"> ${recensione.user}</p>
         <div class="d-flex justify-content-center star">
            
        </div>
     </div>
    
    `
    swiperWrapper.appendChild(div);
    
});
let stars = document.querySelectorAll('.star')
stars.forEach((star , index) => {
   for( let i = 1 ; i <= reviews[index].rank ; i++){
    let icon = document.createElement('i')
    icon.classList.add('fa-solid', 'fa-star')
    star.appendChild(icon)
   }
   let differece = 5 - reviews[index].rank
   for( let i = 1 ; i <= differece ; i++){
    let icon = document.createElement('i')
    icon.classList.add('fa-regular', 'fa-star')
    star.appendChild(icon)
   }
} );

// swipe
const swiper = new Swiper('.swiper', {
    // Optional parameters
    effect: "flip",
    grabCursor: true,
    loop: true,
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    autoplay:{
        delay: 1000
    },
  
  });
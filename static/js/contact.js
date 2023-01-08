/*=============== OPEN NAV MENU ===============*/
let isScroll = false

scrollSlide = () => {

    if (isScroll) return

    isScroll = true

    let currProduct = document.querySelector('.product-info.active')
    currProduct.classList.remove('active')
    productIndex = productIndex + 1 > productInfos.length - 1 ? 0 : productIndex + 1
    productInfos[productIndex].classList.add('active')

    let  listitems = document.querySelectorAll('.slide')

    let slider = document.querySelector('.slider')

    let reverse = Array.from(listitems).slice().reverse()

    left = reverse[0].offsetLeft+'px'
    height = reverse[0].offsetHeight+'px'
    width = reverse[0].offsetWidth+'px'
    zIndex = reverse[0].style.zIndex

    reverse.forEach((el, index) => {
    
        if (index < listitems.length-1) {
            el.style.left = reverse[index + 1].offsetLeft+'px'
            el.style.height = reverse[index + 1].offsetHeight+'px'
            el.style.width = reverse[index + 1].offsetWidth+'px'
            el.style.zIndex = index + 1
            el.style.transform = 'unset'
            el.style.opacity = '1'
        }
        if (index === listitems.length - 1) {
            el.style.transform = 'scale(1.5)'
            el.style.opacity = '0'

            let cln = el.cloneNode(true)
            
            setTimeout(() => {
                el.remove()
                cln.style.transform = 'scale(0)'
                cln.style.left = left
                cln.style.height = height
                cln.style.width = width
                // cln.style.transform = 'unset'
                cln.style.opacity = '0'
                cln.style.zIndex = 0
                cln.style.animation = 'unset'
                slider.appendChild(cln)
                isScroll = false
            }, 1000);
        }
    })
    listitems = document.querySelectorAll('.slide')
    listitems[0].style.zIndex = '4'
}

let slideControl = document.querySelector('.slide-control')

slideControl.onclick = (e) => {
    scrollSlide()
}

openNav = () => {
    let nav = document.querySelector('.nav-overlay')
    let hamb = document.querySelector('.hamburger')
    nav.classList.toggle('active')
    hamb.classList.toggle('active')
}

/*=============== CHANGE BACKGROUND HEADER ===============*/
const scrollHeader = () =>{
    const header = document.getElementById('header')
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    this.scrollY >= 50 ? header.classList.add('scroll-header') 
                       : header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== CONTACT FORM ===============*/
console.warn("Don't forget to run this cmd on your terminal in order to save the input data to you json file");
console.log("cmd = json-server --watch contact.json");
let comments = [];
let floatElements = document.querySelectorAll("img , .offer ion-icon");
let continu = true ; 

//floating imgs
const floatFunction = function () {
  floatElements.forEach(function (e) {
    e.classList.add("floating");
  });
};

//end floating

const addComment =  (ev) => {
  ev.preventDefault();

  let comment = {
    id: Date.now(),
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    comment: document.getElementById("comment").value,
  };
continu = true ; 
  for ( var property in comment ){
      if(property !== "id"){
 x = document.getElementById(property).classList ; 
      if ( comment[property] === ''  ) {
          continu = false ; 
          x.add("error");
      }
      else {
        x.remove("error");
      }
      }
  }
if(continu){
  alert(`Nom: ${comment.name} \nEmail: ${comment.email}  \nComment: ${comment.comment} \nThanks for using our website ❤`)

  const res =   fetch('http://localhost:5500/comments' , {
    method : 'POST' , 
    body : JSON.stringify(comment) ,
    headers: {
      "Content-type": "application/json; charset=UTF-8"
  }
})

  comments.push(comment);

  //reset values for next input
  document.getElementById("name").value = null;
  document.getElementById("email").value = null;
  document.getElementById("comment").value = null;

  //for display  only
  console.warn("added", { comments });

  floatFunction();
}
else {

}
};
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("submit").addEventListener("click", addComment);
});
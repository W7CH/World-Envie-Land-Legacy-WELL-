/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navClose = document.getElementById('nav-close')

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

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

/*=============== TESTIMONIAL SWIPER ===============*/
let testimonialSwiper = new Swiper(".testimonial-swiper", {
    spaceBetween: 30,
    loop: 'true',

    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

/*=============== NEW SWIPER ===============*/
let newSwiper = new Swiper(".new-swiper", {
    spaceBetween: 24,
    loop: 'true',

    breakpoints: {
        576: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 4,
        },
    },
});

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')
    
const scrollActive = () =>{
  	const scrollY = window.pageYOffset

	sections.forEach(current =>{
		const sectionHeight = current.offsetHeight,
			  sectionTop = current.offsetTop - 58,
			  sectionId = current.getAttribute('id'),
			  sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

		if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
			sectionsClass.classList.add('active-link')
		}else{
			sectionsClass.classList.remove('active-link')
		}                                                    
	})
}
window.addEventListener('scroll', scrollActive)

/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp = () =>{
	const scrollUp = document.getElementById('scroll-up')
    // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scrollup class
	this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
						: scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== SHOW CART ===============*/
const cartshow = document.getElementById('cart'),
      cartShop = document.getElementById('cart-shop'),
      cartClose = document.getElementById('cart-close')

/*===== CART SHOW =====*/
/* Validate if constant exists */
if(cartShop){
    cartShop.addEventListener('click', () =>{
        cartshow.classList.add('show-cart')
    })
}

/*===== CART HIDDEN =====*/
/* Validate if constant exists */
if(cartClose){
    cartClose.addEventListener('click', () =>{
        cartshow.classList.remove('show-cart')
    })
}

/*===== CART FUNCTION =====*/
// Create an array to store the cart items
let cart = [];

// Function to add an item to the cart
function addToCart(itemId) {
  // Get the item element
  let item = document.getElementById(itemId);
  // Get the item name, price, and image
  let itemName = item.querySelector('h3').innerHTML;
  let itemPrice = item.querySelector('span').innerHTML;
  let itemImg = item.querySelector('img').src;
  
  // Create a new object to represent the item in the cart
  let cartItem = {
    id: itemId,
    name: itemName,
    price: itemPrice,
    img: itemImg,
    quantity: 1
}
  
    // Check if the item is already in the cart
    let existingItem = cart.find(i => i.id === itemId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push(cartItem);
    }

    // Update the cart display
    updateCart();
}

// Function to update the cart display
function updateCart() {
    // Get the cart items element
    let cartItemsEl = document.getElementById('cart-items');
    cartItemsEl.innerHTML = '';

    // Create an HTML element for each item in the cart
    for (let item of cart) {
        let itemEl = document.createElement('div');
        itemEl.innerHTML = `
            <img src="${item.img}" width="50">
            <p>${item.name}</p>
            <p>Price: ${item.price}</p>
            <p>Quantity: ${item.quantity}</p>
            <button onclick="removeFromCart('${item.id}')"><i class='bx bx-trash-alt'></i></button>
            <button onclick="addItem('${item.id}')"><i class='bx bx-plus'></i></button>
            <button onclick="reduceItem('${item.id}')"><i class='bx bx-minus'></i></button>
        `;
        cartItemsEl.appendChild(itemEl);
    }

    // Update the quantity display
    let quantEl = document.getElementById('nbitems');
    let nbitems = 0;
    for (let item of cart) {
        nbitems += item.quantity;
    }
    quantEl.innerHTML = `N° items: ${nbitems}`;

    // Update the total display
    let totalEl = document.getElementById('total');
    let total = 0;
    for (let item of cart) {
        total += parseFloat(item.price) * item.quantity;
    }
    totalEl.innerHTML = `Total: ${total}€`;

    // Enable/disable the checkout button
    let checkoutBtn = document.getElementById('checkout-btn');
    if (cart.length > 0) {
        checkoutBtn.removeAttribute('disabled');
    } else {
        checkoutBtn.setAttribute('disabled', true);
    }
}

// Function to remove an item from the cart
function removeFromCart(itemId) {
    let index = cart.findIndex(i => i.id === itemId);
    cart.splice(index, 1);
    updateCart();
}

// Function to increase an item quantity
function addItem(itemId) {
    let item = cart.find(i => i.id === itemId);
    item.quantity++;
    updateCart();
}

// Function to reduce an item quantity
function reduceItem(itemId) {
    let item = cart.find(i => i.id === itemId);
    if (item.quantity === 1) {
        removeFromCart(item.id)
    } else {
        item.quantity--;
    }
    updateCart();
}

/*
<div class="cart__amount-content">
    <span class="cart__amount-box">
        <i class='bx bx-minus' ></i>
    </span>

    <span class="cart__amount-number">1</span>

    <span class="cart__amount-box">
        <i class='bx bx-plus' ></i>
    </span>
</div>
*/

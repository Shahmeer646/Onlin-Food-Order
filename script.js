let desktop, Tablet, mobile
let cart, count = 1, counted = 0;
let Name, price, a = 0, images, image
const getImage = (img) => {

   images.map((item) => {
      if (img.includes(item.category)) {
         console.log(item.image.thumbnail)
         image = item.image.thumbnail
      }
   })
   return image
}


const handleStartNewOrder = () => {
   document.querySelector('.confirmed').style.display = "none"
   document.querySelector('.container').style.filter = 'brightness(1)'

   location.reload()
}

const hanldleConfirmOrder = () => {
   document.querySelector('.confirmed').style.display = "block"
   document.querySelector('.container').style.filter = 'brightness(.6)'
   console.log('click')
   let more = document.querySelectorAll('.ordered-items').forEach(item => {
      console.log(item)
      let image = item.firstElementChild.innerHTML

      document.querySelector('.holder').innerHTML = document.querySelector('.holder').innerHTML +
         `<div class="carted-item">
    <div class="content-holder">
        <img width="14%" height="100%" src="${getImage(image)}" alt="">
        <div class="carted-info">
            <h5 class="carted-name">${item.firstElementChild.innerHTML}</h5>
                <p><span class="confirm-count">${item.children[1].firstElementChild.innerHTML} </span> <span class="carted-price">@ ${item.children[1].lastElementChild.innerHTML}</span></p>
        </div>
    </div>
    <div class="carted-total-price">${item.children[1].lastElementChild.innerHTML}</div>
    <div class="sep-lines"></div>
  </div>`
      document.querySelector('.confirmed-amount').innerHTML = document.querySelector('.amount').innerHTML
   })

}
const handleTotalAmount = () => {
   let array = document.querySelectorAll('.payed-price')
   let sum = 0
   for (let i = 0; i < array.length; i++) {
      let element = array[i].innerHTML
      element = parseFloat(element.match(/\d+/g).join('.'))
      sum = sum + element

   }
   if (document.querySelector('.total-cart').innerHTML > 0) {
      document.querySelector('.amount').innerHTML = `$${sum}`
   }

}

const handleCartManager = () => {

   if (document.querySelector('.parent') == null) {
      document.querySelector('.order-parent').outerHTML =
         `<div class="cart-empty">
      <img width="60%" height="60%" src="assets/images/illustration-empty-cart.svg" alt="">
      <h4 class="empty">Your Added items will appear here</h4>
      </div>`
      a = 0

   }

   else if (a == 0) {
      document.querySelector('.cart-empty').outerHTML = `
    <div class="order-parent">
    <div class="total-info">
    <span class="order-total">Order Total</span>
    <span class="amount">$0.00</span>
    </div>
    <div class="carbon">
    <img width="6%" height="6%" src="assets/images/icon-carbon-neutral.svg" alt="">
    <p>This is a <span class="carbon-black">carbon neutral</span> delivery</p>
    </div>
    <div onclick="hanldleConfirmOrder()" class="confirm-order">Confirm Order</div>
    </div>`
      a = a + 1
   }
}

const handleRemove = (e) => {
   let a = e.parentElement.parentElement.outerHTML = ''
   let name = e.previousElementSibling.firstElementChild.innerHTML
   document.querySelectorAll('.second').forEach(item => {
      if (item.innerHTML == name) {
         console.log(item.parentElement.previousElementSibling.previousElementSibling)
         item.parentElement.previousElementSibling.previousElementSibling.firstElementChild.style.border = '2px solid white'
         item.parentElement.previousElementSibling.outerHTML =
            `<div onclick="handleCartEvent(this)" class="item-cart">
         <img src="assets/images/icon-add-to-cart.svg" alt="">
         <span class="cart-text">Add to Cart</span>
         </div>`

      }

   })
   handleTotalCart()

}

const handleTotalCart = () => {

   let a = document.querySelectorAll('.count')
   let sum = 0
   for (let index = 0; index < a.length; index++) {
      let total = a[index].nextElementSibling.innerHTML
      total = parseFloat(total.match(/\d+/g).join("."))

      let element = a[index].innerHTML;
      element = parseInt(element.match(/\d+/g).join(""))
      total = total * element
      a[index].parentElement.lastElementChild.innerHTML = `$${total}`
      sum = sum + element;

   }
   document.querySelector('.total-cart').innerHTML = `${sum}`
   handleCartManager()
   handleTotalAmount()
}

const handleCart = (parent, operater) => {
   document.querySelectorAll('.count').forEach((item) => {
      let count = item.innerHTML
      count = parseInt(count.match(/\d+/g).join(""))
      if (item.parentElement.previousElementSibling.innerHTML == parent) {

         if (operater == '+') {
            count = count + 1
            item.innerHTML = `${count}x`
         }
         else if (operater == '-') {

            count = count - 1

            item.innerHTML = `${count}x`
         }
      }
   })
   handleTotalCart()

}

const handleIncrease = (e) => {
   count = parseInt(e.previousElementSibling.innerHTML)
   let parent = e.parentElement.nextElementSibling.children[1].innerHTML
   let operater = '+'
   handleCart(parent, operater)
   count = count + 1
   e.previousElementSibling.innerHTML = `${count}`

}

const handleDecrese = (e) => {
   count = parseInt(e.nextElementSibling.innerHTML)

   if (count == 1) {

   }
   else {
      count = count - 1;
      let parent = e.parentElement.nextElementSibling.children[1].innerHTML
      handleCart(parent, '-')
   }
   e.nextElementSibling.innerHTML = `${count}`

}

const handleCartEvent = (cart) => {

   count = 1
   let img = cart.previousElementSibling.firstElementChild
   img.style.border = '2px solid brown'
   cart.style.background = 'brown';
   info = cart.nextElementSibling
   Name = info.children[1].innerHTML
   price = info.lastElementChild.innerHTML
   cart.outerHTML = `<div class="more">
   <img onclick="handleDecrese(this)" class="decrement" width="12px" height="12px" src="assets/images/icon-decrement-quantity.svg" alt="">
   <span class='item-count'>${count}</span>
   <img onclick="handleIncrease(this) " class="increment" width="12px" height="12px" src="assets/images/icon-increment-quantity.svg" alt="">
   </div>`

   document.querySelector('.items-cart-list').innerHTML = document.querySelector('.items-cart-list').innerHTML + `
   <div class="parent">
   <div class="cart-fill">
   <div class="ordered-items">
      <span class="name">${Name}</span>
      <p><span class="count">${count}x</span><span class="price"> @ ${price}</span> <span class="payed-price">${price}</span> </p>
   </div>
   <div onclick="handleRemove(this)" class="cancel">
      <img src="assets/images/icon-remove-item.svg" alt="">
   </div>
   </div>
   <div class="sep-line"></div>
   <div/>`

   handleTotalCart()
}


async function main() {

   let a = await fetch('data.json')
   let b = await a.json()
   images = b
   localStorage.setItem("data", JSON.stringify(b))
   // let b = JSON.parse(localStorage.getItem('data'))
   b.map((item) => {

      //   console.log(item.image.thumbnail)
      //   let a = item.image.thumbnail
      //   a = a.split('/')
      //   console.log(a[3])
      //   if(a[3].includes('baklava'))
      //      console.log('ill')
      //    else{
      //       console.log('noo')
      //    }
   })


   b.map((item) => {
      document.querySelector('.list').innerHTML = document.querySelector('.list').innerHTML + ` <div class="item-card">
      <div class="img">
          <img class="img-hover" src= ${item.image.desktop} alt="">
      </div>
      <div onclick="handleCartEvent(this)" class="item-cart">
      <img src="assets/images/icon-add-to-cart.svg" alt="">
      <span class="cart-text">Add to Cart</span>
      </div>
      <div class="info">
          <span class="first">${item.category}</span>
          <span class="second">${item.name}</span>
          <span class="prices">$${item.price}</span>
      </div>`
   })
   // http://127.0.0.1:3000/index.html
}


main()

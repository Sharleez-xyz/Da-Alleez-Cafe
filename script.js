console.log("JS is working");
// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD20XHbEOvYxP6Ack3qwZIsFNL78d6HeCw",
  authDomain: "da-alleez-cafe.firebaseapp.com",
  projectId: "da-alleez-cafe",
  storageBucket: "da-alleez-cafe.firebasestorage.app",
  messagingSenderId: "612562491687",
  appId: "1:612562491687:web:19d35b67ba49136031b102",
  measurementId: "G-C4V3DGJ19X"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

let cart = [];

function addToCart(item, price) {
    cart.push({
        name: item,
        price: price
    });

    updateCart();
}

function updateCart() {

    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const total = document.getElementById("total");

    cartItems.innerHTML = "";

    let totalPrice = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
    }

    cart.forEach((food, index) => {

        totalPrice += food.price;

        cartItems.innerHTML += `
        <div class="cart-item">
            <p><strong>${food.name}</strong></p>
            <p>${food.price} Tk</p>

            <button onclick="removeItem(${index})">
                Remove
            </button>

            <hr>
        </div>
        `;

    });

    cartCount.innerText = cart.length;

   const deliveryCharge = 70;
const finalTotal = totalPrice + deliveryCharge;

total.innerText =
`Subtotal: ${totalPrice} Tk
Delivery: ${deliveryCharge} Tk
Total: ${finalTotal} Tk`;

}

function removeItem(index){

    cart.splice(index,1);

    updateCart();

}

document.getElementById("checkout-btn").addEventListener("click", function(){

    if(cart.length === 0){

        alert("Your cart is empty!");
        return;

    }

    document.getElementById("checkout-popup").style.display = "flex";

});

document.getElementById("close-popup-btn").addEventListener("click", function(){

    document.getElementById("checkout-popup").style.display = "none";

});


document.getElementById("confirm-order-btn").addEventListener("click", function(){

    let name = document.getElementById("customer-name").value;
    let phone = document.getElementById("customer-phone").value;
    let address = document.getElementById("customer-address").value;
    let notes = document.getElementById("customer-notes").value;


    if(name === "" || phone === "" || address === ""){

    alert("Please fill in your name, phone number and address.");
    return;

}
    let orderItems = "";

    let subtotal = 0;

    cart.forEach(function(item){

        orderItems += item.name + " - " + item.price + " Tk\n";
        subtotal += item.price;

    });


    let delivery = 70;
    let total = subtotal + delivery;


    emailjs.send("service_c16ddp1", "template_u87soh9", {

        customer_name: name,
        phone: phone,
        address: address,
        order_items: orderItems,
        subtotal: subtotal,
        delivery: delivery,
        total: total,
        notes: notes

    })
    .then(function(){

        alert("🌸 Order sent successfully! Thank you for ordering from Da Alleez Café!");

        document.getElementById("checkout-popup").style.display = "none";

    })
   .catch(function(error){

    alert("ERROR: " + JSON.stringify(error));

    console.log(error);

});


});
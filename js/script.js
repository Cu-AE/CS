window.onload = () => {

    displayProducts(products);

    updateMemberArea();

    showSlide(0);

    startBanner();

    const banner = document.querySelector(".banner");

    banner.addEventListener("touchstart",(e)=>{

    touchStartX = e.changedTouches[0].screenX;

});

banner.addEventListener("touchend",(e)=>{

    touchEndX = e.changedTouches[0].screenX;

    handleSwipe();

});

    banner.addEventListener("mouseenter",stopBanner);

    banner.addEventListener("mouseleave",startBanner);

};
/*========================
    商品顯示
========================*/

function badgeText(type){

    switch(type){

        case "HOT":
            return "🔥 HOT";

        case "NEW":
            return "🆕 NEW";

        case "SALE":
            return "💰 SALE";

        case "-20%":
            return "🏷️ -20%";

        case "LIMITED":
            return "⭐ LIMITED";

        case "PREORDER":
            return "📦 PREORDER";

        default:
            return type;

    }

}

function displayProducts(items){

    const container = document.getElementById("product-list");

    container.innerHTML = "";

    items.forEach((p,index)=>{

        const div = document.createElement("div");

        div.className = "product";

        div.innerHTML = `

<div class="product-image">

    ${
        p.badge
        ? `<span class="product-badge badge-${p.badge.toLowerCase().replace("%","").replace("-","")}">
            ${getBadgeIcon(p.badge)} ${p.badge}
        </span>`
        : ""
    }

    <button
        class="favorite-btn"
        onclick="toggleFavorite(${index})">

        ❤

    </button>

    <img
    class="product-img skeleton"
    loading="lazy"
    src="${p.img}"
    alt="${p.name}"
    onclick="showProduct(${products.indexOf(p)})"
    onload="this.classList.remove('skeleton')">

    <div class="product-overlay">

        <button
            class="quick-view"
            onclick="showProduct(${index})">

            👁 快速查看

        </button>

    </div>

</div>

<div class="product-body">

    <p class="product-category">

        ${p.category.toUpperCase()}

    </p>

    <h2>

        ${p.name}

    </h2>

    <p class="rating">

        ⭐ ${p.rating || 5}

    </p>

    <p class="price">

        NT$ ${p.price}

    </p>

    <button
        class="buy-btn"
        onclick="addToCart('${p.name}',${p.price})">

        🛒 加入購物車

    </button>

</div>

`;

        container.appendChild(div);

    });

}

function changeQty(step){

    const input = document.getElementById("product-qty");

    let qty = Number(input.value);

    qty += step;

    if(qty < 1){

        qty = 1;

    }

    input.value = qty;

}
/*========================
    收藏功能
========================*/
function addFavorite(name){
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if(!favorites.includes(name)){
      favorites.push(name);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      alert("已加入收藏");
    }
}

/*========================
    搜尋與分類
========================*/
function filterProducts(){
  const keyword = document.getElementById('search-box').value.trim().toLowerCase();
  const category = document.getElementById('category-filter').value;
  const filtered = products.filter(p => {
  const matchName = p.name.toLowerCase().includes(keyword);
  const matchCategory = (category === 'all' || p.category === category);
  return matchName && matchCategory;
  });

  displayProducts(filtered);
}


/*========================
    商品詳細視窗
========================*/
function showProduct(index){

    currentProduct = products[index];

    // 主圖片
    document.getElementById("modal-img").src =
        currentProduct.images[0];

    // 商品資訊
    document.getElementById("modal-name").innerText =
        currentProduct.name;

    document.getElementById("modal-category").innerText =
        currentProduct.category.toUpperCase();

    document.getElementById("modal-rating").innerHTML =
        "⭐ " + (currentProduct.rating || 5);

    document.getElementById("modal-price").innerHTML =
        "NT$ " + currentProduct.price;

    document.getElementById("modal-desc").innerText =
        currentProduct.desc;

    document.getElementById("product-qty").value = 1;

    // 四張縮圖
    for(let i=0;i<4;i++){

        const thumb = document.getElementById("thumb"+i);

        if(currentProduct.images[i]){

            thumb.src = currentProduct.images[i];

            thumb.style.display = "block";

        }else{

            thumb.style.display = "none";

        }

        thumb.classList.remove("active");

    }

    document
        .getElementById("thumb0")
        .classList.add("active");

    document
        .getElementById("product-modal")
        .classList.add("show");

}

function changeImage(index){

    document.getElementById("modal-img").src =
        currentProduct.images[index];

    document
        .querySelectorAll(".thumb")
        .forEach(img=>img.classList.remove("active"));

    document
        .getElementById("thumb"+index)
        .classList.add("active");

}

function closeProduct(){

    document
        .getElementById("product-modal")
        .classList.remove("show");

}

// 加入購物車
function addModalToCart(){
  const qty = Math.max(1,parseInt(document.getElementById("product-qty").value) || 1);
  const existing = cart.find(item => item.name === currentProduct.name);

  if(existing){
    existing.qty += qty;
  }
  else{
    cart.push({
      name: currentProduct.name,
      price: currentProduct.price,
      qty: qty
    });
  }

  updateCartDisplay();
  closeProduct();
}


/*========================
    結帳
========================*/
function showCheckout(){
  if(cart.length === 0){
    alert("購物車是空的");
    return;
  }

  let html = "";
  cart.forEach(item=>{
    html += `
      <p>
      ${item.name}
      ×
      ${item.qty}
      =
      $${item.price * item.qty}
      </p>
    `;
  });

  const shipping = 60;

  html += `
    <hr>
    <p>商品金額：$${total}</p>
    <p>運費：$${shipping}</p>
    <h2>應付金額：$${total + shipping}</h2>
  `;

  document.getElementById("order-summary").innerHTML = html;
  document.getElementById("checkout-modal").classList.add("show");
}

function closeCheckout(){
  document.getElementById("checkout-modal").classList.remove("show");
}

const params = new URLSearchParams(window.location.search);
params.get("order");

function checkout() {
  if (cart.length === 0) return alert('購物車是空的喔 😅');
  alert(`感謝購買！總金額為 $${total}`);
  cart = [];
  total = 0;
  updateCartDisplay();
  toggleCart();
}

/*========================
    訂單建立
========================*/
function submitOrder(){
  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  const name = document.getElementById("customer-name").value;
  const phone = document.getElementById("customer-phone").value;
  const storeType = document.getElementById("store-type").value;
  const storeName = document.getElementById("store-name").value;

  if(
    !name ||
    !phone ||
    !storeType ||
    !storeName
  ){
    alert("請完整填寫資料");
    return;
  }

  const orderId = "CS" + Date.now();

  localStorage.setItem( "customerName",name);
  localStorage.setItem( "customerPhone",phone);
  localStorage.setItem( "storeType",storeType);
  localStorage.setItem( "storeName",storeName);
  localStorage.setItem( "orderId",orderId);
  localStorage.setItem( "orderStatus",2);

  const shipping = 60;
  const newOrder = {
  orderId: orderId,
  name: name,
  phone: phone,
  storeType: storeType,
  storeName: storeName,
  items: JSON.parse( JSON.stringify(cart)),
  subtotal: total,
  shipping: shipping,
  total: total + 60,
  status: 1,
  time: new Date().toLocaleString()
};

  orders.push(newOrder);
  localStorage.setItem("orders",JSON.stringify(orders));

  cart = [];
  total = 0;

  updateCartDisplay();

window.location.href = "tracking.html?order=" + orderId;
}
/*========================
    數量控制
========================*/
function plusQty(){
  const input =
  document.getElementById( "product-qty");
  input.value = Number(input.value) + 1;
}

function minusQty(){
    const input = document.getElementById( "product-qty");

    if(input.value > 1){
      input.value = Number(input.value) - 1;
    }
}

/*==========================
    Banner 輪播
==========================*/

let currentSlide = 0;
let bannerTimer;

let touchStartX = 0;
let touchEndX = 0;

function showSlide(index){

    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");

    slides.forEach(slide=>{
        slide.classList.remove("active");
    });

    dots.forEach(dot=>{
        dot.classList.remove("active");
    });

    slides[index].classList.add("active");
    dots[index].classList.add("active");

}

function goSlide(index){

    currentSlide = index;

    showSlide(currentSlide);

}

function startBanner(){

    clearInterval(bannerTimer);

    bannerTimer = setInterval(nextSlide,3000);

}

function stopBanner(){

    clearInterval(bannerTimer);

}

function nextSlide(){

    const slides = document.querySelectorAll(".slide");

    currentSlide++;

    if(currentSlide >= slides.length){
        currentSlide = 0;
    }

    showSlide(currentSlide);

}

function prevSlide(){

    const slides = document.querySelectorAll(".slide");

    currentSlide--;

    if(currentSlide < 0){
        currentSlide = slides.length - 1;
    }

    showSlide(currentSlide);

}

function handleSwipe(){

    const distance = touchStartX - touchEndX;

    if(distance > 50){

        nextSlide();

    }
    else if(distance < -50){

        prevSlide();

    }

}

function getBadgeIcon(badge){

    switch(badge){

        case "HOT":
            return "🔥";

        case "NEW":
            return "🆕";

        case "SALE":
            return "💰";

        case "LIMITED":
            return "⭐";

        case "PREORDER":
            return "📦";

        default:
            return "";

    }

}
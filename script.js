// 商品資料（多加 hot 屬性）
const products = [
  { name: "dirty work", price: 350, category: "aespa", img: "https://picsum.photos/220?1", hot: false, desc: "aespa 官方限定商品",rating:4.8 },
  { name: "Rich Man ", price: 299, category: "aespa", img: "https://picsum.photos/220?0", hot: true, desc: "aespa 最新專輯周邊商品" ,rating:5},
  { name: "dirty work2", price: 350, category: "aespa", img: "https://picsum.photos/220?2", hot: false, desc: "aespa 最新專輯周邊商品" ,rating:4.9},
  { name: "Blue Valentine", price: 250, category: "nmixx", img: "https://picsum.photos/220?3", hot: true, desc: "nmixx 最新專輯周邊商品",rating:3.8 },
  { name: "Blue 2", price: 320, category: "nmixx", img: "https://picsum.photos/220?4", hot: false, desc: "nmixx 最新專輯周邊商品",rating:4.8},
  { name: "xoxz", price: 120, category: "ive", img: "https://picsum.photos/220?5", hot: true, desc: "ive 最新專輯周邊商品",rating:4.8 },
  { name: "I am", price: 80, category: "ive", img: "https://picsum.photos/220?6", hot: false, desc: "ive 最新專輯周邊商品" ,rating:4.8},
  { name: "jump", price: 120, category: "Blackpink", img: "https://picsum.photos/220?7", hot: true, desc: "Blackpink 最新專輯周邊商品" },
  { name: "3am", price: 120, category: "Rose", img: "https://picsum.photos/220?8", hot: true, desc: "Rose 最新專輯周邊商品" },
  { name: "we are", price: 120, category: "idle", img: "https://picsum.photos/220?9", hot: true, desc: "idle 最新專輯周邊商品" },
  { name: "babymonster", price: 120, category: "babymonster", img: "https://picsum.photos/220?10", hot: true, desc: "babymonster 最新專輯周邊商品" },
  { name: "1", price: 1200, category: "1", img: "https://picsum.photos/220?11", hot: true, desc: "1 最新專輯周邊商品" },
  { name: "2", price: 1300, category: "2", img: "https://picsum.photos/220?12", hot: false, desc: "2 最新專輯周邊商品" },
  { name: "3", price: 1400, category: "3", img: "https://picsum.photos/220?13", hot: true, desc: "3 最新專輯周邊商品" },
  { name: "4", price: 1500, category: "4", img: "https://picsum.photos/220?14", hot: false, desc: "4 最新專輯周邊商品" }
];

let cart = [];
let total = 0;
let currentProduct = null;

// 載入所有商品
window.onload = () => displayProducts(products);

function displayProducts(items) {
  const container = document.getElementById('product-list');
  container.innerHTML = '';

  items.forEach(p => {
    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `
      ${p.hot ? '<span class="tag-hot">熱銷中🔥</span>' : ''}
      <img src="${p.img}" alt="${p.name}" onclick="showProduct(${products.indexOf(p)})">
      <h2>${p.name}</h2>
      <p class="price">$${p.price}</p>
      <button onclick="addToCart('${p.name}', ${p.price})">加入購物車</button>`;
    container.appendChild(div);
  });
}


function addToCart(name, price){

  const existing =
  cart.find(item => item.name === name);

  if(existing){
    existing.qty++;
  }
  else{
    cart.push({
      name:name,
      price:price,
      qty:1
    });
  }

  updateCartDisplay();

  document.getElementById("cart-button")
  .animate(
    [
      {transform:"scale(1)"},
      {transform:"scale(1.2)"},
      {transform:"scale(1)"}
    ],
    {
      duration:300
    }
  );
}

// 更新購物車顯示
function updateCartDisplay(){

  const list =
  document.getElementById("cart-items");

  list.innerHTML = "";

  let grandTotal = 0;
  let totalQty = 0;

  cart.forEach((item,index)=>{
    const qty = Number(item.qty || 1);
    const subtotal = Number(item.price) * qty;

    console.log(item);
    console.log(subtotal);
    grandTotal += subtotal;
    totalQty += Number(item.qty || 1);

    const li = document.createElement("li");
    li.innerHTML = `
      <div>

        <strong>
        ${item.name}
        </strong>

        <br>

        單價：
        $${item.price}

        ×

        ${item.qty || 1}

        <br>

        小計：
        $${subtotal}

        <br>

        <button onclick="removeItem(${index})"> 刪除 </button>
      
      </div>
    `;

    list.appendChild(li);

  });

  total = grandTotal;

  document.getElementById("cart-count")
  .textContent = totalQty;

  document.getElementById("cart-total")
  .textContent =
  `總金額：$${grandTotal}`;

}

function toggleCart() {
  document.getElementById('cart-panel').classList.toggle('hidden');
}

// 搜尋 + 分類
function filterProducts() {
  const keyword = document.getElementById('search-box').value.trim().toLowerCase();
  const category = document.getElementById('category-filter').value;

  const filtered = products.filter(p => {
    const matchName = p.name.toLowerCase().includes(keyword);
    const matchCategory = (category === 'all' || p.category === category);
    return matchName && matchCategory;
  });

  displayProducts(filtered);
}

// 結帳
function checkout() {
  if (cart.length === 0) return alert('購物車是空的喔 😅');
  alert(`感謝購買！總金額為 $${total}`);
  cart = [];
  total = 0;
  updateCartDisplay();
  toggleCart();
}

function showProduct(index){
  currentProduct = products[index];
  document.getElementById("modal-img").src = currentProduct.img;
  document.getElementById("modal-name").innerText = currentProduct.name;
  document.getElementById("modal-desc").innerText = currentProduct.desc;
  document.getElementById("modal-price").innerText = "$" + currentProduct.price;
  document.getElementById("product-modal").classList.add("show");
}

function closeProduct(){
  document.getElementById("product-modal")
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

function removeItem(index){
  if(
    confirm("確定移除商品？")
  ){
    cart.splice(index,1);

    updateCartDisplay();
  }
}

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
  localStorage.setItem
  ("orders",
  JSON.stringify(orders));

  cart = [];
  total = 0;

  updateCartDisplay();

window.location.href = "tracking.html?order=" + orderId;
}

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
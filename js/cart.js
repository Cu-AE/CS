/*========================
    購物車資料
========================*/
let cart = [];
let total = 0;
let currentProduct = null;
/*========================
    購物車
========================*/
function addToCart(name, price){
  const existing = cart.find(item => item.name === name);

  if(existing){ 
    existing.qty++;

  }else{
    cart.push({ name:name, price:price, qty:1});
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

  const list = document.getElementById("cart-items");
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
  document.getElementById("cart-count").textContent = totalQty;
  document.getElementById("cart-total").textContent =`總金額：$${grandTotal}`;
}

function toggleCart(){

    document
    .getElementById("cart-panel")
    .classList.toggle("show");

    document
    .getElementById("cart-mask")
    .classList.toggle("show");

}

function removeItem(index){
  if(confirm("確定移除商品？"))
    {
    cart.splice(index,1);
    updateCartDisplay();
  }
}
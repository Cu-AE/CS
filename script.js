// 商品資料（多加 hot 屬性）
const products = [
  { name: "香氛蠟燭", price: 299, category: "香氛", img: "https://picsum.photos/220?1", hot: true },
  { name: "玫瑰香氛噴霧", price: 350, category: "香氛", img: "https://picsum.photos/220?2", hot: false },
  { name: "可愛馬克杯", price: 250, category: "杯子", img: "https://picsum.photos/220?3", hot: true },
  { name: "星空玻璃杯", price: 320, category: "杯子", img: "https://picsum.photos/220?4", hot: false },
  { name: "小熊筆記本", price: 120, category: "文具", img: "https://picsum.photos/220?5", hot: true },
  { name: "貓咪原子筆", price: 80, category: "文具", img: "https://picsum.photos/220?6", hot: false }
];

let cart = [];
let total = 0;

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
      <img src="${p.img}" alt="${p.name}">
      <h2>${p.name}</h2>
      <p class="price">$${p.price}</p>
      <button onclick="addToCart('${p.name}', ${p.price})">加入購物車</button>
    `;
    container.appendChild(div);
  });
}

// 加入購物車
function addToCart(name, price) {
  cart.push({ name, price });
  total += price;
  updateCartDisplay();
}

// 更新購物車顯示
function updateCartDisplay() {
  document.getElementById('cart-count').textContent = cart.length;
  const list = document.getElementById('cart-items');
  list.innerHTML = '';
  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - $${item.price}`;
    list.appendChild(li);
  });
  document.getElementById('cart-total').textContent = `總金額：$${total}`;
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

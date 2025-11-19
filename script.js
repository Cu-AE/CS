// 商品資料（多加 hot 屬性）
const products = [
  { name: "Rich Man ", price: 299, category: "aespa", img: "https://picsum.photos/220?1", hot: true },
  { name: "dirty work", price: 350, category: "aespa", img: "https://picsum.photos/220?2", hot: false },
  { name: "Blue Valentine", price: 250, category: "nmixx", img: "https://picsum.photos/220?3", hot: true },
  { name: "Blue 2", price: 320, category: "nmixx", img: "https://picsum.photos/220?4", hot: false },
  { name: "xoxz", price: 120, category: "ive", img: "https://picsum.photos/220?5", hot: true },
  { name: "I am", price: 80, category: "ive", img: "https://picsum.photos/220?6", hot: false },
  { name: "jump", price: 120, category: "Blackpink", img: "https://picsum.photos/220?7", hot: true },
  { name: "3am", price: 120, category: "Rose", img: "https://picsum.photos/220?8", hot: true },
  { name: "we are", price: 120, category: "idle", img: "https://picsum.photos/220?9", hot: true },
  { name: "monster", price: 120, category: "babymonster", img: "https://picsum.photos/220?10", hot: true }
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

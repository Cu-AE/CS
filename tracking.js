const params = new URLSearchParams(window.location.search);
const orderId = params.get("order");

const orders = JSON.parse(localStorage.getItem("orders")) || [];

const order = orders.find(o => o.orderId === orderId);

if(!order){
  document.body.innerHTML = "<h2>找不到訂單</h2>";
}

document.getElementById("order-id").innerText =
"訂單編號：" + order.orderId;

const status = order.status || 1;


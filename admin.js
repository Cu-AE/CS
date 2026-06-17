const orders =
JSON.parse(localStorage.getItem("orders")) || [];

const container =
document.getElementById("order-info");

if(orders.length === 0){
  container.innerHTML = "<p>目前沒有訂單</p>";
}

container.innerHTML = orders.map(order => `
  <div style="border:1px solid #ccc; padding:10px; margin:10px;">
    
    <p>訂單：${order.orderId}</p>
    <p>收件人：${order.name}</p>
    <p>電話：${order.phone}</p>
    <p>門市：${order.storeType} ${order.storeName}</p>
    <p>金額：$${order.total}</p>
    <p>狀態：${order.status}</p>

    <button onclick="updateStatus('${order.orderId}',1)">訂單成立</button>
    <button onclick="updateStatus('${order.orderId}',2)">備貨中</button>
    <button onclick="updateStatus('${order.orderId}',3)">已出貨</button>
    <button onclick="updateStatus('${order.orderId}',4)">配送中</button>
    <button onclick="updateStatus('${order.orderId}',5)">已送達</button>

  </div>
`).join("");

function updateStatus(orderId, status){

  const orders =
  JSON.parse(localStorage.getItem("orders")) || [];

  const order =
  orders.find(o => o.orderId === orderId);

  if(order){
    order.status = status;
  }

  localStorage.setItem(
    "orders",
    JSON.stringify(orders)
  );

  location.reload();

}
function getStatusText(status){

    switch(Number(status)){

        case 1:
            return "📝 訂單成立";

        case 2:
            return "📦 備貨中";

        case 3:
            return "🚚 已出貨";

        case 4:
            return "🚛 配送中";

        case 5:
            return "✅ 已送達";

        default:
            return "未知狀態";
    }

}

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
    <p>狀態：${getStatusText(order.status)}</p>

    <button onclick="updateStatus('${order.orderId}',1)">訂單成立</button>
    <button onclick="updateStatus('${order.orderId}',2)">備貨中</button>
    <button onclick="updateStatus('${order.orderId}',3)">已出貨</button>
    <button onclick="updateStatus('${order.orderId}',4)">配送中</button>
    <button onclick="updateStatus('${order.orderId}',5)">已送達</button>

    <p>
    購買商品：
    </p>

    <ul>

    ${order.items.map(item=>`
    <li>
    ${item.name}
    ×
    ${item.qty}
    </li>
    `).join("")}

    </ul>

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

let totalSales = 0;

orders.forEach(order=>{

    totalSales += Number(order.total);

});

document.getElementById("dashboard")
.innerHTML = `
<div class="dashboard-box">

<h2>📊 營業統計</h2>

<p>
總訂單數：
${orders.length}
</p>

<p>
總營業額：
$${totalSales}
</p>

</div>
`;

function deleteOrder(orderId){

    if(
      !confirm("確定刪除?")
    ){
      return;
    }

    let orders =
    JSON.parse(
    localStorage.getItem("orders")
    ) || [];

    orders =
    orders.filter(
      o=>o.orderId!==orderId
    );

    localStorage.setItem(
      "orders",
      JSON.stringify(orders)
    );

    location.reload();

}

function showOrders(data){

container.innerHTML = data.map(order=>`

<div class="order-card">

    <p>訂單編號：${order.orderId}</p>

    <p>收件人：${order.name}</p>

    <p class="status${order.status}">
        ${getStatusText(order.status)}
    </p>

</div>

`).join("");

}
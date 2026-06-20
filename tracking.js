const params = new URLSearchParams(window.location.search);
const orderId = params.get("order");

const orders = JSON.parse(localStorage.getItem("orders")) || [];

const order = orders.find(o => o.orderId === orderId);

if(!order){

    document.body.innerHTML = `
        <h1 style="text-align:center">
        找不到此訂單
        </h1>
    `;

    throw new Error("找不到訂單");

}

document.getElementById("order-id").innerText =
"訂單編號：" + order.orderId;

const status = order.status || 1;

document.getElementById("customer-info")
.innerHTML = `

<p>
收件人：
${order.name}
</p>

<p>
電話：
${order.phone}
</p>

<p>
超商：
${order.storeType}
</p>

<p>
門市：
${order.storeName}
</p>

<p>
總金額：
$${order.total}
</p>

`;

let html = "<h3>購買商品</h3>";

order.items.forEach(item => {

    html += `

    <p>

    ${item.name}

    ×

    ${item.qty}

    </p>

    `;

});

document.getElementById("order-items")
.innerHTML = html;
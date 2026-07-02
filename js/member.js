/*========================
    會員功能
========================*/
const member = localStorage.getItem("member");
window.onload = () => {
    displayProducts(products);
    updateMemberArea();
};

function updateMemberArea(){
    const area = document.getElementById("member-area");

    if(!area) return;
    const member = localStorage.getItem("member");

    if(member){
        area.innerHTML = `👤 ${member} <button onclick="logout()"> 登出 </button>`;

    }else{
        area.innerHTML = `<a href="login.html"> 登入 </a>`;
    }
}

function logout(){
  localStorage.removeItem("member");
  localStorage.removeItem("role");
  location.reload();
}
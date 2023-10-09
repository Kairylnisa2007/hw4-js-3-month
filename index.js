const products = document.querySelector(".products");
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const desc = document.querySelector("#desc");
const category = document.querySelector("#category");
const add_btn = document.querySelector("#add_btn");
// const del_btn = document.querySelector("#del_btn");

const getProduct = () =>{
    fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(json =>
        json?.forEach((item, i) =>{
            products.innerHTML +=`
            <div class = "product">
            <img src = "${item.image}"/>
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <button value="" id="del_btn">delete</button>
            </div>
            `;
        }),
    );
}
add_btn.addEventListener("click", (event) =>{
    event.preventDefault();

postData(
    title.value,
    price.value,
    desc.value, 
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTguiaORqINItLBkL6r4V8k9LaAbTgu3xGhGQ&usqp=CAU",
    category.value
    );
});

   function postData(title, price, description, image, category){
    const data = {
        title, 
        price, 
        description, 
        image, 
        category,
    };
    addProduct(data);
   }

   getProduct();

   const addProduct = ({title, price, description, image, category}) => {
    fetch("https://fakestoreapi.com/products",{
    method: "POST",
    body: JSON.stringify({
        title, 
        price, 
        description, 
        image, 
        category,
    }),
    headers:{
        "Content-type": "application/json",
    },
   })
   .then((res) => res.json())
   .then((json) => {
    products.innerHTML +=`
            <div class = "product">
            <img src = "${json.image}"/>
            <h3>${json.title}</h3>
            <p>${json.description}</p>
            </div>
            `;
   });
   }

   const delProduct = ({title, price, description, image, category}) => {
    fetch('https://fakestoreapi.com/products/6',{
        method:"DELETE"
    })
        .then(res=>res.json())
        .then(json=>console.log(json))
   .then(res=>res.json())
   .then(json=>{
    products.innerHTML +=`
            <div class = "product">
            <img src = "${json.image}"/>
            <h3>${json.title}</h3>
            <p>${json.description}</p>
            </div>
            `;
   });
   }
   delProduct();
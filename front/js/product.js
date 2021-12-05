//récupération de la chaîne de requête dans l'url 
const queryString_url_id = window.location.search;

//extraction de l'id
const url_Search_Params = new URLSearchParams(queryString_url_id);
const product_id = url_Search_Params.get("id");

API_id()
function API_id () {
fetch(`http://localhost:3000/api/products/${product_id}`)
.then(res => {
    if(res.ok) console.log(res);
    return res.json();
})
.then( product =>{
    //afficher les produits récuperés
    console.log(product);
    contentProduct(product);
}
)
.catch(erreur => {
    console.log(erreur); alert("Une erreur")
});
}

//afficher le produit récupéré
function contentProduct (product) {
    
    document.querySelector(".item__img").innerHTML= `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
    document.getElementById('title').textContent = `${product.name}` ;
    document.getElementById("price").textContent = `${product.price} `;
    document.getElementById("description").textContent = `${product.description} `;

    product.colors.forEach(element => {
    
    let color =  document.createElement('option');
    color.value=element; 
    color.text = element;
    document.getElementById('colors').append(color);
});
}

//Ajout dans le panier: localstorage
// Fonction de controle de quantité : la quantité doit être entre 1 et 100
/*
//gestion du panier 
function saveBasket(basket){
    localStorage.setItem("basket",JSON.stringify(basket));
}

//ajout produit au panier
function getBasket(){
    let basket = localStorage.getItem(basket);
    if(basket == null){
        return [];
    }else {
        return JSON.parse(basket);
    }
}

//fonction d'ajout au panier
function addBasket(products){
    let basket = getBasket();
    //gestion quantité
    let foundProduct = basket.find(p => p.id == products.id);
    if(foundProduct != undefined){
        foundProduct.quantity++;
    }else{
        product.quantity = 1;
        basket.push(products);
    }
    saveBasket(basket);
}

//retirer un produit du panier 
function removeFromBasket(products){
    let basket = getBasket();
    basket = basket.filter(p => p.id != products.id);
    saveBasket(basket);
}

function changeQuantity(products,quantity){
    let basket = getBasket();
    basket = basket.filter(p => p.id != products.id);
    if(foundProduct != undefined){
        foundProduct.quantity += quantity;
        if (foundProduct.quantity <=0){
            removeFromBasket(foundProduct);
        }else{
           saveBasket(basket); 
        }
    }  
}

//gestion quantité totale
function getNumberProduct(){
    let basket = getBasket();
    let number = 0;
    for(let product of basket){
        number += products.quantity;
    }
    return number;
}

//gestion prix total
function getTotalPrice(){
    let basket = getBasket();
    let total = 0;
    for(let product of basket){
        total += products.price;
    }
    return number;
}
*/
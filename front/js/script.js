// déclarer l'url et l'API
 const urlApi = "http://localhost:3000/api/products";

loadData();
// load contenu API 
function loadData(){
    fetch(urlApi)
    .then(res => {
        if(res.ok) console.log(res);
        return res.json();
    })
    .then( products =>{
        //afficher les produits récuperés
        console.log(products);
        displayProducts(products);
    }
    )
    .catch(erreur => {
        console.log(erreur); alert("Veuillez contacter l'admninstrateur")
    });
}

function displayProducts(listProducts){

    //préparer la variable html
    let html="";

    // parcourir le tableau et préparer le contenu html selon les variables du produit
    listProducts.forEach(element => {
        
        html +=   `<a href="./product.html?id=${element._id}">
        <article>
          <img src="${element.imageUrl}" alt="${element.altTxt}">
          <h3 class="productName">${element.name}</h3>
          <p class="productDescription">${element.description}</p>
        </article>
      </a>  `;
    });

    // mettre le resultat dans le composant html concerné
    document.getElementById("items").innerHTML=html;
}
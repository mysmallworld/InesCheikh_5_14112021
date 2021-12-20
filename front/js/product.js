//Récupération de la chaîne de requête dans l'url 
const queryString_url_id = window.location.search;

//Extraction de l'id
const url_Search_Params = new URLSearchParams(queryString_url_id);
const product_id = url_Search_Params.get("id");

// déclaration de la class produit selectionné
class selectProduct  {
    title;
    image;
    altImage;
    prix;
    description;
    couleur;
    quantite;
}

//Contenu de l'API
API_id()
function API_id () {
fetch(`http://localhost:3000/api/products/${product_id}`)
.then(res => {
    if(res.ok) console.log(res);
    return res.json();
})
.then( product =>{
    //afficher le produit récuperé
    console.log(product);
    contentProduct(product);
}
)
.catch(erreur => {
    console.log(erreur); alert("Une erreur est survenue")
});
}

//Afficher les détails du produit
function contentProduct (product) {
    let produit = new selectProduct();
    document.querySelector(".item__img").innerHTML= `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
    document.getElementById('title').textContent = `${product.name}` ;
    document.getElementById("price").textContent = `${product.price} `;
    document.getElementById("description").textContent = `${product.description} `;

    produit.id=`${product_id}`;
    produit.title= `${product.name}`;
    produit.image=`${product.imageUrl}`;
    produit.altImage= `${product.altTxt}`;
    produit.description= `${product.description}`;
    produit.prix= parseFloat(`${product.price}`);
    
    
    product.colors.forEach(element => {
    
    let color =  document.createElement('option');
    color.value=element; 
    color.text = element;
    document.getElementById('colors').append(color);
    });

    document.getElementById('colors').addEventListener('change', function (event) {
        event.stopPropagation();
        event.preventDefault();
        let valid = controlerColor(this.value);
        if(valid) produit.couleur=this.value;
    }
    );

    document.getElementById('quantity').addEventListener('change', function (event) {
        event.stopPropagation();
        event.preventDefault();
       let valid = controlerQuantity(this.value);
       if(valid) produit.quantite=parseInt(this.value);
    }
    );

    //Sélection du bouton Ajouter au panier 
    //écouter le bouton et envoyer le panier
    document.getElementById("addToCart").addEventListener('click', function (event) {
    event.stopPropagation();
     event.preventDefault();

     let validQuantity= controlerQuantity(document.getElementById('quantity').value);
    let validColor=controlerColor(document.getElementById('colors').value);
     
    if(validQuantity && validColor){
        AjouterAuPanier(produit);
     }
     else{
         alert("Veuillez choisir une couleur et une quantité valide!");
     }
    });
}

//Gestion de la couleur
function controlerColor(color){
    
    let isValid= true;
    if(color=="") {
        isValid=false;
        alert("Veuillez choisir une couleur !");
    }
    return isValid;
}

//Gestion de la quantité
function controlerQuantity(qte){
    let quantity = parseInt(qte);
    let isValid= true;
    if(quantity < 1 || quantity > 100) {
        isValid=false;
        alert("Veuillez choisir une quantité entre 1 et 100 !");
    }
    return isValid;
}

//Gestion du panier avec le localStorage
function AjouterAuPanier(produitChoisi){
// Préparation d'un objet produit pour le localStorage 
let produitEnregistre = getLocalStorage();
let exist=false;
let updatelocal=false;
produitEnregistre.forEach(element => {
    if(element.id==produitChoisi.id && element.couleur==produitChoisi.couleur )
    {
        exist=true;
        let valid = controlerQuantity(element.quantite+produitChoisi.quantite);
        if(valid)
       { element.quantite+=produitChoisi.quantite;
        updatelocal=true;
       }
        
    }
});

    if(!exist){
    produitEnregistre.push(produitChoisi);
    updatelocal=true;
    }
  if((updatelocal))
    savelocalStorage(produitEnregistre);

}

//Récupération de la chaîne de requête dans l'url 
const queryString_url_id = window.location.search;

//Extraction de l'id
const url_Search_Params = new URLSearchParams(queryString_url_id);
const product_id = url_Search_Params.get("id");

//Déclaration de la class produit selectionné
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

//Affichage des détails du produit
function contentProduct (product) {
    let produit = new selectProduct();
    document.querySelector(".item__img").innerHTML= `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
    document.getElementById('title').textContent = `${product.name}` ;
    document.getElementById("price").textContent = `${product.price} `;
    document.getElementById("description").textContent = `${product.description} `;

    //Affectation des détails du produit sélectionné sur la page html
    produit.id=`${product_id}`;
    produit.title= `${product.name}`;
    produit.image=`${product.imageUrl}`;
    produit.altImage= `${product.altTxt}`;
    produit.description= `${product.description}`;
    produit.prix= parseFloat(`${product.price}`);
    
    //Gestion du choix de la couleur
    product.colors.forEach(element => {
    let color =  document.createElement('option');
    color.value=element; 
    color.text = element;
    document.getElementById('colors').append(color);
    });

    document.getElementById('colors').addEventListener('change', function (event) {
        event.stopPropagation();
        event.preventDefault();
        //appel de la fonction de contrôle de la couleur
        let valid = controlerColor(this.value);
        if(valid) produit.couleur=this.value;
    }
    );

    //Gestion du choix de la quantité 
    document.getElementById('quantity').addEventListener('change', function (event) {
        event.stopPropagation();
        event.preventDefault();
        //appel de la fonction de contrôle de la quantité
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
     //si la couleur et la quantité ont été validé envoie du panier
    if(validQuantity && validColor){
        addBasket(produit);
     }
     else{
         alert("Veuillez choisir une couleur et une quantité valide!");
     }
    });
}

//Gestion du panier avec le localStorage
function addBasket(produitChoisi){
// Préparation d'un objet produit pour le localStorage 
let produitEnregistre = getLocalStorage();
let exist=false;
let updatelocal=false;
produitEnregistre.forEach(element => {
    if(element.id==produitChoisi.id && element.couleur==produitChoisi.couleur ){
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
    //Sauvegarde du panier dans le localStorage
  if((updatelocal))
    savelocalStorage(produitEnregistre , "Ajout");
}
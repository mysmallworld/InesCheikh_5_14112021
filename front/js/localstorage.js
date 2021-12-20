
function getLocalStorage(){
    // s'il n'y a pas de produit
     let produitEnregistre =[];
 
     if(localStorage.getItem("produit")) {
         // s'il y a un produit
          produitEnregistre = JSON.parse(localStorage.getItem("produit"));
     }
     return produitEnregistre;
 }
 
 function savelocalStorage(produits){
     localStorage.setItem("produit",JSON.stringify(produits));
     alert("Votre produit a bien été ajouté au panier");
 }
//Envoie des produits dans le localStorage
function getLocalStorage(){
    // s'il n'y a pas de produit présent dans le localStorage
     let produitEnregistre =[];
 
     if(localStorage.getItem("produit")) {
         // s'il y a un produit
          produitEnregistre = JSON.parse(localStorage.getItem("produit"));
     }
     return produitEnregistre;
 }
 
 //Enregistrement des produits présents dans le localStorage
 function savelocalStorage(produits , sens){
     localStorage.setItem("produit",JSON.stringify(produits));
     if(sens=="Ajout") alert("Votre produit a bien été ajouté au panier");
     if(sens=="Suppression") alert("Votre produit a bien été supprimé du panier");
     if(sens=="MAJ") alert("Votre panier a été mis à jour !");
 }

 //Gestion de la quantité
function controlerQuantity(qte){
    let quantity = parseInt(qte);
    let isValid= true;
    //si la quantité n'est pas comprise entre 1 et 100
    if(quantity < 1 || quantity > 100) {
        isValid=false;
        alert("Veuillez choisir une quantité entre 1 et 100 !");
    }
    //si la quantité est comprise entre 1 et 100
    return isValid;
}


//Gestion de la couleur
function controlerColor(color){
    let isValid= true;
    //si la couleur n'a pas été sélectionnée
    if(color=="") {
        isValid=false;
        alert("Veuillez choisir une couleur !");
    }
    //si la couleur a été sélectionnée
    return isValid;
}
//Récupération des produits présents dans le localStorage 
let produitEnregistre = getLocalStorage();

//Affichage des produits
displayProduits(produitEnregistre);
function displayProduits (produitEnregistres) {

    let html="";
    produitEnregistres.forEach(produitEnregistre => {
        html += `   <article class="cart__item" data-id="${produitEnregistre.id}" data-color="${produitEnregistre.couleur}">
        <div class="cart__item__img">
          <img src="${produitEnregistre.image}" alt="${produitEnregistre.altImage}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${produitEnregistre.title}</h2>
            <p>${produitEnregistre.couleur}</p>
            <p>Prix unitaire : ${produitEnregistre.prix} €</p>
            <p class="prixArticle">Prix global : ${produitEnregistre.prix * produitEnregistre.quantite}€</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté :</p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${produitEnregistre.quantite}">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article> `;
    });
    //mettre le resultat dans le composant html concerné
    document.getElementById('cart__items').innerHTML=html;

    //Gestion de la quantité, de la couleur et du prix des produits dans le panier
    document.querySelectorAll('.itemQuantity').forEach(element => {
      element.addEventListener( 'change', function (event){
        event.stopPropagation();
        event.preventDefault();

        let valid = controlerQuantity(this.value);
        if(valid){
          updateproductInTable(produitEnregistres, this.closest(".cart__item").dataset.id , this.closest(".cart__item").dataset.color , this.value);
          //Mise à jour tableau localstorage
          produitEnregistres = getLocalStorage();
          // update calcul total
          let prixArticle= this.closest(".cart__item > .cart__item__content").firstElementChild.lastElementChild;
          let p_prixUnitaire=this.closest(".cart__item > .cart__item__content").firstElementChild.children[2];
          let text_prixUnitaire= p_prixUnitaire.textContent.substring(16, p_prixUnitaire.textContent.length -1);
          
          //affichage du prix unitaire et global des produits
          prixArticle.textContent="Prix global : "+ (parseFloat(text_prixUnitaire) * parseInt(this.value) )+"€";
          
          updateTotal(produitEnregistres);
        }
      });
  });
  
    //Récupération des boutons supprimer
    document.querySelectorAll('.deleteItem').forEach(element => {
        element.addEventListener( 'click', function (event){
          event.stopPropagation();
          event.preventDefault();

          deleteProductFromTable(produitEnregistres, this.closest(".cart__item").dataset.id , this.closest(".cart__item").dataset.color );
          //supprimer l'élement de la page panier
          element.closest(".cart__item").remove();
          produitEnregistres = getLocalStorage();
          //mise à jour du calcul total du prix des produits
          updateTotal(produitEnregistres);
        });
    });
//appel de la fonction prix total des produits
updateTotal(produitEnregistre);


//Gestion de la validation du formulaire 
    //récupération des cases à remplir
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const address = document.getElementById('address');
    const city = document.getElementById('city');
    const email = document.getElementById('email');

    //Validation des champs prénom et nom
    firstName.addEventListener('change', function (event) {
      event.stopPropagation();
      event.preventDefault();
      validateName(firstName, "prenom");
    });
    lastName.addEventListener('change', function (event) {
      event.stopPropagation();
      event.preventDefault();
      validateName(lastName, "nom");
    });
    //validation du champ adresse
    address.addEventListener('change', function (event) {
      event.stopPropagation();
      event.preventDefault();
      validateAddress(address);
    });
    //validation du champ ville
    city.addEventListener('change', function (event) {
      event.stopPropagation();
      event.preventDefault();
      validateCity(city);
    });
    // validation du champ email
    email.addEventListener('change', function (event) {
    event.stopPropagation();
    event.preventDefault();
    validateEmail(email);
    });
    //appel de la fonction
    validForm();
  }
  
//Gestion du bouton supprimer les produits enregistrés 
function deleteProductFromTable(tableau, id , couleur ){
          
  let index =-1;
  tableau.forEach(element => {
  if(element.id == id && element.couleur==couleur){
      index= tableau.indexOf(element);
  }
});
if(index != -1)
  tableau.splice(index , 1);
  //sauvegarde dans le localStorage
  savelocalStorage(tableau , "Suppression");
}

//Gestion de la couleur et de la quantité
function updateproductInTable(tableau, id , color , qte){

  tableau.forEach(element => {
    if(element.id == id && element.couleur==color){
        element.quantite= parseInt(qte);
    }
  });
  //sauvegarde dans le localStorage
  savelocalStorage(tableau , "MAJ" );
}
    
function updateTotal(tableau){
//calcul de la quantité totale
let totalQte = 0;

//calcul du prix total
let totalPrice = 0.0; 

 for (let k = 0; k < tableau.length; k++){
    
  totalPrice += ( tableau[k].prix * tableau[k].quantite );
  totalQte += tableau[k].quantite ;
 }

//mise à jour du html quantité et prix
document.getElementById("totalQuantity").textContent=totalQte;
document.getElementById('totalPrice').textContent=totalPrice;
}
   
    //Validation du prénom et du nom
    function validateName(name, sens){
      let nameRegExp = new RegExp("^[À-ÿA-z]+$|^[À-ÿA-z]+-[À-ÿA-z]+$");
      let nameTest = nameRegExp.test(name.value);
      let p = name.nextElementSibling;
      if(nameTest) {
        p.innerHTML="Champs validé";
        p.style.color="green";
        return true;
      }else {
        if(sens == "prenom") p.innerHTML="Veuillez saisir un prénom valide !";
        if(sens == "prenom") p.style.color="red";
        if(sens == "nom") p.innerHTML="Veuillez saisir un nom valide !";
        if(sens == "nom") p.style.color="red";
        return false;
      }
    }

    //Validation de l'adresse
    function validateAddress(address){
      let addressRegExp = new RegExp("^[0-9]{1,4} [^- ][a-zA-Z '-àâäéèêëïîôöùûü]*[^- ]$");
      let addressTest = addressRegExp.test(address.value);
      let p = address.nextElementSibling;
      if(addressTest) {
        p.innerHTML="Champs validé";
        p.style.color="green";
        return true;
      }else {
        p.innerHTML="Veuillez saisir une adresse valide !";
        p.style.color="red";
        return false;
      }
    }

    //Validation de la ville
    function validateCity(city){
      let cityRegExp = new RegExp("^[a-zA-Z',.\s-]{1,25}$");
      let cityTest = cityRegExp.test(city.value);
      let p = city.nextElementSibling;
      if(cityTest) {
        p.innerHTML="Champs validé";
        p.style.color="green";
        return true;
      }else {
        p.innerHTML="Veuillez saisir une ville valide !";
        p.style.color="red";
        return false;
      }
    }

    //Validation de l'email
    function validateEmail(email){
      let emailRegExp = new RegExp("^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\w+)*(\\.\\w{2,3})+$");
      let emailTest = emailRegExp.test(email.value);
      let p = email.nextElementSibling;
      if(emailTest) {
        p.innerHTML="Champs validé";
        p.style.color="green";
        return true;
      }else {
        p.innerHTML="Veuillez saisir une adresse mail valide !";
        p.style.color="red";
        return false;
      }
    }

    //Validation du formulaire
    function validForm(){
      //récupération du bouton commander
      document.getElementById('order').addEventListener( 'click', function (event){
        event.stopPropagation();
        event.preventDefault();

        //réunification de toutes les fonctions de validation des champs
        let validateForm = validateName(firstName) && validateName(lastName) && 
        validateAddress(address) && validateCity(city) && validateEmail(email);

        //si tous les champs sont validés envoie des produits
        if(validateForm){
          let listProductID = [];
      for (let i = 0; i < produitEnregistre; i = i + 1) {
      listProductID.push(produitEnregistre[i].id);  
    }

    //Formulaire contenu dans le body de la requête POST
    const form = {
      contact : {
        firstName : firstName.value,
        lastName : lastName.value ,
        address : address.value,
        city : city.value,
        email : email.value,
      },
    products : 
        listProductID,
      }
      
//Envoie de l'ordre à l'api/order
fetch("http://localhost:3000/api/products/order", {
  method: 'POST',
  body: JSON.stringify(form),
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  })
  .then((res) => {
    if(res.ok) console.log(res);
    return res.json();
    })
  .then((data)=> {
    console.log(data);
    alert("Formulaire rempli avec succès !");
    document.location.href=`confirmation.html?orderId=${data.orderId}`;
  })
.catch((error) => {
  console.log(error);
  alert("Veuillez contacter l'administrateur")
  });
}
else {
  alert("Veuillez remplir le formulaire avant de passer commande")
}
      });
    }
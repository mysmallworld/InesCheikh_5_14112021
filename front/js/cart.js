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
            <p>${produitEnregistre.prix} €</p>
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
    
    document.getElementById('cart__items').innerHTML=html;

    //
    document.querySelectorAll('.itemQuantity').forEach(element => {
      element.addEventListener( 'change', function (event){
        event.stopPropagation();
        event.preventDefault();

        let valid = controlerQuantity(this.value);
        if (valid ) {
          updateproductInTable(produitEnregistres, this.closest(".cart__item").dataset.id , this.closest(".cart__item").dataset.color , this.value);
          //Mise à jour tableau localstorage
          produitEnregistres = getLocalStorage();
          // update calcul total
          updateTotal(produitEnregistres);
        }
      });
  });
  
  //appel de la fonction prix total des produits
    updateTotal(produitEnregistre);

    //récupération des bouttons supprimer
    document.querySelectorAll('.deleteItem').forEach(element => {
        element.addEventListener( 'click', function (event){
          event.stopPropagation();
          event.preventDefault();

          deleteProductFromTable(produitEnregistres, this.closest(".cart__item").dataset.id , this.closest(".cart__item").dataset.color );
          //supprimer l'element du html panier
          element.closest(".cart__item").remove();
          produitEnregistres = getLocalStorage();
          // mettre à jour calcul total
          updateTotal(produitEnregistres);
        });
    });

//Gestion du boutton supprimer les produits enregistrés 
function deleteProductFromTable(tableau, id , couleur ){
          
  let index =-1;
  tableau.forEach(element => {
  if(element.id == id && element.couleur==couleur){
      index= tableau.indexOf(element);
  }
});
if(index != -1)
  tableau.splice(index , 1);
   
savelocalStorage(tableau , "Suppression");
}

//gestion de la couleur et de la quantité
function updateproductInTable(tableau, id , color , qte){

  tableau.forEach(element => {
    if(element.id == id && element.couleur==color){
        element.quantite= parseInt(qte);
    }
  });
  savelocalStorage(tableau , "MAJ" );
}
    
function updateTotal(tableau){
// calculer le total quantite
let totalQte = 0;

// calculer total prix
let totalPrice = 0.0; 

 for (let k = 0; k < tableau.length; k++){
    
  totalPrice += ( tableau[k].prix * tableau[k].quantite );
  totalQte += tableau[k].quantite ;
 }

// mise à jour du html quantité et prix
document.getElementById("totalQuantity").textContent=totalQte;
document.getElementById('totalPrice').textContent=totalPrice;
}}
   
// gestion de la validation du formulaire 
    //récupération des cases à remplir
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const address = document.getElementById('address');
    const city = document.getElementById('city');
    const email = document.getElementById('email');

    //fonction de validation du prénom
    function validateName(name, sens){
      let nameRegExp = new RegExp("^[À-ÿA-z]+$|^[À-ÿA-z]+-[À-ÿA-z]+$");
      let nameTest = nameRegExp.test(name.value);
      if(nameTest) {
        return true;
      }else {
        if(sens == "prenom") alert("Votre Prénom n'est pas valide!");
        if(sens == "nom") alert("Votre Nom n'est pas valide !");
        return false;
      }
    }

    //fonction de validation de l'addresse
    function validateAddress(address){
      let addressRegExp = new RegExp("^[0-9]{1,4} [^- ][a-zA-Z '-àâäéèêëïîôöùûü]*[^- ]$");
      let addressTest = addressRegExp.test(address.value);
      if(addressTest) {
        return true;
      }else {
        alert("Veuillez saisir une adresse valide !");
        return false;
      }
    }

    //fonction de validation de la ville
    function validateCity(city){
      let cityRegExp = new RegExp("^[a-zA-Z',.\s-]{1,25}$");
      let cityTest = cityRegExp.test(city.value);
      if(cityTest) {
        return true;
      }else {
        alert("Veuillez saisir une ville valide !");
        return false;
      }
    }

    //fonction de validation de l'email
    function validateEmail(email){
      let emailRegExp = new RegExp("^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\w+)*(\\.\\w{2,3})+$");
      let emailTest = emailRegExp.test(email.value);
      if(emailTest) {
        return true;
      }else {
        alert("Veuillez saisir une adresse mail valide !");
        return false;
      }
    }

    // validation champ name
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
    //validation champ adresse
    address.addEventListener('change', function (event) {
      event.stopPropagation();
      event.preventDefault();
      validateAddress(address);
    });
    //validation champ ville
    city.addEventListener('change', function (event) {
      event.stopPropagation();
      event.preventDefault();
      validateCity(city);
    });
    // validation champ email
    email.addEventListener('change', function (event) {
    event.stopPropagation();
    event.preventDefault();
    validateEmail(email);
    });

    //fonction de validation du formulaire
    function validForm(){
      //récupération du boutton commander
      document.getElementById('order').addEventListener( 'click', function (event){
        event.stopPropagation();
        event.preventDefault();

        //réunification de toutes les fonctions de validation des champs
        let validateForm = validateName(firstName) && validateName(lastName) && 
        validateAddress(address) && validateCity(city) && validateEmail(email);

        if(validateForm){
          let listProductID = [];
      for (let i = 0; i < produitEnregistre; i = i + 1) {
      listProductID.push(produitEnregistre[i].id);  
    }

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
      
// envoyer l'ordre à l'api /order
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
    validForm();
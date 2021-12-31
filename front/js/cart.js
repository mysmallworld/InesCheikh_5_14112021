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

    updateTotal(produitEnregistre);

    document.getElementById('cart__items').innerHTML=html;

    document.querySelectorAll('.itemQuantity').forEach(element => {
      element.addEventListener( 'change', function (event){
        event.stopPropagation();
        event.preventDefault();

        let valid = controlerQuantity(this.value);
        if (valid ) {
          updateproductInTable(produitEnregistres, this.closest(".cart__item").dataset.id , this.closest(".cart__item").dataset.color , this.value);
          //Mettre à jour tableau localstorage
          produitEnregistres = getLocalStorage();
          // update calcul total
          updateTotal(produitEnregistres);
        }
      });
  });
 
    document.querySelectorAll('.deleteItem').forEach(element => {
        element.addEventListener( 'click', function (event){
          event.stopPropagation();
          event.preventDefault();

          deleteproductFromTable(produitEnregistres, this.closest(".cart__item").dataset.id , this.closest(".cart__item").dataset.color );
          //supprimer l'element du html panier
          element.closest(".cart__item").remove();
          produitEnregistres = getLocalStorage();
          // mettre à jour calcul total
          updateTotal(produitEnregistres);
        });
    });

//Gestion du boutton supprimer les produits enregistrés 
function deleteproductFromTable(tableau, id , couleur ){
          
  let index =-1;
  tableau.forEach(element => {
  if(element.id == id && element.couleur==couleur){
      index= tableau.indexOf(element);
  }
});
if(index != -1)
  tableau.splice(index , 1);
   
savelocalStorage(tableau , "Suppression" );
  
}

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

// mise à jour du html
document.getElementById("totalQuantity").textContent=totalQte;
document.getElementById('totalPrice').textContent=totalPrice;
}
   
// gerer la validation du formulaire 
    let form = document.querySelector('.cart__order__form');
    // validation champ name
    form.firstName.addEventListener('change', function (event) {
      event.stopPropagation();
      event.preventDefault();
      validateName(this);
    });
    form.lastName.addEventListener('change', function (event) {
      event.stopPropagation();
      event.preventDefault();
      validateName(this);
    });
    //validation champ adresse
    form.address.addEventListener('change', function (event) {
      event.stopPropagation();
      event.preventDefault();
      validateAddress(this);
    });
    //validation champ ville
    form.city.addEventListener('change', function (event) {
      event.stopPropagation();
      event.preventDefault();
      validateCity(this);
    });
    // validation champ email
    form.email.addEventListener('change', function (event) {
    event.stopPropagation();
    event.preventDefault();
    validateEmail(this);
    });

    const createContact = {
      firstName : "",
      lastName : "" ,
      address : "",
      city : "",
      email : ""
    };

    const createProductID = [];

    let validForm = false;

    function validateName(name){
      if(name.length == 0){
        name.setCustomValidity("Veuillez renseigner ce champ !");
        validForm = false;
      }else if (!/[0-9]/.test(name)){
        validForm = true;
      }else {
        name.setCustomValidity("ce champ ne peut pas contenir de chiffre !");
        return false;
      }
    }
    function validateAddress(address){
      if (address.length == 0){
        address.setCustomValidity("Veuillez renseigner votre adresse !");
        valideForm =false;
      }else{
        validForm = true;
      }
    }
    function validateCity(city){
      if (city.length == 0){
        city.setCustomValidity("Veuillez renseigner votre ville !");
        validForm = false;
      }else {
        validForm = true;
      }
    }
    function validateEmail(email){
      let emailRegExp = new RegExp(/^[\\w\\-]+(\\.[\\w\\-]+)*@([A-Za-z0-9-]+\\.)+[A-Za-z]{2,4}$/);
      if (email.length == 0) {
        email.setCustomValidity("Veuillez renseigner votre email !");
        validForm = false;
      }else if (emailRegExp.test(email)){
        validForm = true;
      } else {
        email.setCustomValidity("Veuillez renseigner email valide !")
        validForm = false;
      }
    }}


//fin formulaire
document.getElementById('order').addEventListener( 'click', function (event){
  event.stopPropagation();
  event.preventDefault();

  // envoyer l'ordre à l'api /order
  fetch("http://localhost:3000/api/products/order" , {
    method:"POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({contact: createContact(form), products: createProductID(produitEnregistres),
    })
  .then(res => {
    if(res.ok) console.log(res);
    return res.json();
  })
  .catch(error => {
    console.log(error);alert("Veuillez contacter l'admninstrateur")
  })
})
})
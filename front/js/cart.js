//Récupération des produits présents dans le localStorage 
let produitEnregistre = getLocalStorage();
console.log(produitEnregistre);

//Affichage des produits
displayProduits(produitEnregistre);

function displayProduits (produitEnregistre) {

    let html="";
    produitEnregistre.forEach(produitEnregistre => {
        html += `   <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
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
              <p>Qté : ${produitEnregistre.quantite}</p>
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
  }

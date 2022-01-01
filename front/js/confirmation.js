//Gestion de la page confirmation 
function displayOrder(){

    //Récupération de la chaîne de requête dans l'url 
    const urlOrder = window.location.search;
    //extraction de l'id
    const urlSearchParamsOrder = new URLSearchParams(urlOrder);
    const orderID = urlSearchParamsOrder.get('orderId');
  
    //récupération de l'emplacement du numéro de commande
    document.getElementById("orderId").textContent=`${orderID}`; 
  }
  
  displayOrder();
$(document).ready(function () {
    //setPage('homepage');
    //setPage('search-results');
    //setPage('product-details');
    setPage('subscriptions');

    getSubscriptions();
})

$(document).on('click','#search-button', function(){
var search_term = document.getElementById('search-tab').value;
var final_prods =[];
for (let j = 0; j < products.length; j++) {
    var prodname=products[j].name.toLowerCase().replace(/\s/g, '');
    if (prodname.includes(search_term.toLowerCase().replace(/\s/g, ''))){
        final_prods.push(products[j]);
    }

}
setPage('search-results');
createTable_searchresults(final_prods);
})


function createTable_searchresults(final_prods){  
tableElem = document.getElementById("search-results-table");
tableElem.innerHTML="";
for (let i = 0; i < final_prods.length; i++){    
  rowElem = document.createElement('tr');
  colElem = document.createElement('td');
  colElem.innerHTML="";
  for (var key in final_prods[i]) {
    if (key.toString()!='id'){
        colElem.innerHTML=colElem.innerHTML+" "+final_prods[i][key].toString();
    }
  }


  var prices=[];
  var stores_final=[];
  for (let j = 0;j< productPrices.length;j++){
    if( productPrices[j].productId==final_prods[i].id){
        var total = productPrices[j].price + 
                    productPrices[j].tax + 
                    productPrices[j].deliveryCharge - 
                    productPrices[j].discount;            
        prices.push(total);
        stores_final.push(productPrices[j].storeId);
    }
  }
  
  colElem.innerHTML=colElem.innerHTML+"<br />";
  for(let j=0;j<stores_final.length;j++){
    for(let k=0;k<stores.length;k++){
        if(stores[k].id==stores_final[j]){
            colElem.innerHTML=colElem.innerHTML+"<img src='./assets/"+stores[k].icon+"' class='icon-image'>"; 
            break;
        }
    }
  }
  rowElem.appendChild(colElem);


  prices.sort();
  colElem = document.createElement('td');
  colElem.innerHTML="Starting from <br /><strong>"+prices[0].toString()+"</strong>";
  rowElem.appendChild(colElem);

  tableElem.appendChild(rowElem);
}

}


function setPage(page) {
    console.log("setpage ", page);
    switch (page) {
        case 'homepage':
            $('#homepage').css('display', '');
            $('#search-results').css('display', 'none');
            $('#product-details').css('display', 'none');
            $('#subscriptions').css('display', 'none');
            $('#sort').css('display', 'none');
            break;
        case 'search-results':
            $('#homepage').css('display', 'none');
            $('#product-details').css('display', 'none');
            $('#subscriptions').css('display', 'none');
            $('#search-results').css('display', '');
            break;
        case 'product-details':
            $('#homepage').css('display', 'none');
            $('#search-results').css('display', 'none');
            $('#subscriptions').css('display', 'none');
            $('#product-details').css('display', '');
            break;
        case 'subscriptions':
            $('#homepage').css('display', 'none');
            $('#search-results').css('display', 'none');
            $('#product-details').css('display', 'none');
            $('#subscriptions').css('display', '');
            $('#sort').css('display', 'none');
            break;
    }
}

function getNotifications() {
    var list = document.getElementById('notifications');
    for (let i = 0; i < offers.length; i++) {
        var entry = document.createElement('li');
        for (let j = 0; j < products.length; j++) {
            if (products[j].id == offers[i].productId) {
                var prodname = products[j].name;
                break;
            }
        }

        for (let j = 0; j < stores.length; j++) {
            if (stores[j].id == offers[i].storeId) {
                var storename = stores[j].name;
                break;
            }
        }

        entry.appendChild(document.createTextNode(prodname + "\n" + offers[i].offer + " at " + storename));
        list.appendChild(entry);
        entry = document.createElement('hr');
        list.appendChild(entry);

    }
}

// To get the data for my subscriptions
function getSubscriptions() {
    let subscriptionsList = [];  //To save the list of objects with product name and offersz.
    // Get the offers for all the subscribed products.
    currentUser.subscriptions.forEach(productId => {
        let productOffersObj = {
            id: productId,
            name: '',
            offers: []
        };
        // Get the name of product from the products list.
        productOffersObj.name = products.find(product => product.id == productId).name;
        // Get all the offers on the product from offers list.
        let offersForProductId = offers.filter(x => x.productId == productId);
        // Get the offer details with store name.
        offersForProductId.forEach(offer => {
            let offerAtStore = offer.offer + ' at ';
            offerAtStore += stores.find(x => x.id == offer.storeId).name;
            productOffersObj.offers.push(offerAtStore);
        })
        subscriptionsList.push(productOffersObj);
    });
    createViewForSubscriptions(subscriptionsList);
}

// To generate the my subscriptions page dynamically
function createViewForSubscriptions(subscriptions) {
    let subscriptionsTable = document.getElementById('subscriptions-table');
    subscriptionsTable.innerHTML = "";
    let row, column;
    subscriptions.forEach(subscription => {
        row = document.createElement('tr');
        column = document.createElement('td');
        // Add name to the first column
        column.innerHTML = `<p>${subscription.name}
            <button type="button" class="btn btn-outline-secondary btn-sm" style="float:right; margin-left:4px;"
            onclick="removeSubscription(${subscription.id})">
            Unsubscribe</button></p>`;
        row.append(column);
        // Add offers to the next column
        column = document.createElement('td');
        let offers = '<ul>';
        subscription.offers.forEach(offer => {
            offers += `<li>${offer}</li>`
        });
        offers += '</ul>';
        column.innerHTML = offers;
        row.append(column);
        // Add the row to the table.
        subscriptionsTable.append(row);
    });
}

// To add a new subscription
function addSubscription(productId) {
    currentUser.subscriptions.push(productId);
}

// To remove a subscription
function removeSubscription(productId) {
    console.log(productId);
    let index = currentUser.subscriptions.indexOf(productId);
    if (index >= 0) {
        currentUser.subscriptions.splice(index, 1);
        getSubscriptions();
    }
    else {
        alert('Unable to delete the subscription');
    }
}
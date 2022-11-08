// document.getElementById('notification1').value = offers[0].offer;

$(document).ready(function () {
    setPage('homepage');
    //setPage('search-results');
    //setPage('product-details');
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
            break;
        case 'search-results':
            $('#homepage').css('display', 'none');
            $('#product-details').css('display', 'none');
            $('#search-results').css('display', '');
            break;
        case 'product-details':
            $('#homepage').css('display', 'none');
            $('#search-results').css('display', 'none');
            $('#product-details').css('display', '');
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
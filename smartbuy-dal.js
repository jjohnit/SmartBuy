$(document).ready(function () {
    let hash = getHash();
    if (hash) {
        loadPage(hash.split('&'));
    }
    else {
        setPage('homepage');
    }
})

function loadPage(hashValues) {
    console.log(hashValues);
    switch (hashValues[0]) {
        case 'search-results':
            searchProducts(hashValues[1]);
            break;
        case 'product-details':
            createTable_product(hashValues[1]);
            break;
        case 'subscriptions':
            setPage('subscriptions');
            break;
        default:
            setPage('homepage');
    }
}

function setPage(page) {
    switch (page) {
        case 'homepage':
            $('#homepage').css('display', '');
            $('#search-results').css('display', 'none');
            $('#product-details').css('display', 'none');
            $('#subscriptions').css('display', 'none');
            $('#sort').css('display', 'none');
            $('#filter').css('display', '');
            getRecentSearches();
            // clear the value in search
            document.getElementById('search-tab').value = '';
            break;
        case 'search-results':
            $('#homepage').css('display', 'none');
            $('#product-details').css('display', 'none');
            $('#subscriptions').css('display', 'none');
            $('#search-results').css('display', '');
            $('#sort').css('display', '');
            $('#filter').css('display', '');
            break;
        case 'product-details':
            $('#homepage').css('display', 'none');
            $('#search-results').css('display', 'none');
            $('#subscriptions').css('display', 'none');
            $('#product-details').css('display', '');
            $('#sort').css('display', '');
            $('#filter').css('display', '');
            break;
        case 'subscriptions':
            $('#homepage').css('display', 'none');
            $('#search-results').css('display', 'none');
            $('#product-details').css('display', 'none');
            $('#subscriptions').css('display', '');
            $('#sort').css('display', 'none');
            getSubscriptions();
            $('#filter').css('display', '');
            break;
    }
}

function setHash(value) {
    window.location.hash = value;
}

function getHash(){
    return window.location.hash.substring(1);
}

function searchProducts(search_term) {
    var final_prod_ids = [];
    for (let j = 0; j < products.length; j++) {
        var prodname = products[j].name.toLowerCase().replace(/\s/g, '');
        if (prodname.includes(search_term.toLowerCase().replace(/\s/g, ''))) {
            final_prod_ids.push(products[j].id);
        }
    }
    createTable_searchresults(final_prod_ids);
    // set hash to retain page on refresh
    setHash(`search-results&${search_term}`)
    setPage('search-results');
}

$(document).on('click', '#search-button', function () {
    let search_term = document.getElementById('search-tab').value;
    searchProducts(search_term);
})

// Using Enter to submit search input
$(document).on('keypress', '#search-tab', function (event) {
    if (event.key === 'Enter') {
        let search_term = document.getElementById('search-tab').value;
        searchProducts(search_term);
    }
});

function addRecentSearch(id) {
    recentProducts.push(id)
    console.log(recentProducts)
    /*     <div class="card" title="Iphone 14">
                <img class="card-img-top" src="./assets/iphone-14.png">
              </div> */
}

function getRecentSearches() {
    recents = document.getElementById("recents");
    recents.innerHTML = "";
    let recentElement;
    // Get the recent products
    let productsList = products.filter(x => recentProducts.includes(x.id));
    productsList.forEach(product => {
        recentElement = document.createElement("div");
        recentElement.setAttribute("class", "card");
        recentElement.setAttribute("title", product.name);
        //recentElement.innerHTML = products[i].name
        itemImage = document.createElement("img")
        itemImage.setAttribute("class", "card-img-top");
        itemImage.setAttribute("src", `./assets/${product.images[0]}`);
        recentElement.appendChild(itemImage);
        recents.appendChild(recentElement);
    });
    // for (let i = 0; i < products.length; i++) {
    //     if (products[i].id == id) {
    //         recentElement.setAttribute("title", products[i].name);
    //         //recentElement.innerHTML = products[i].name
    //         itemImage = document.createElement("img")
    //         itemImage.setAttribute("class", "card-img-top");
    //         itemImage.setAttribute("src", products[i].imgUrl);
    //         recentElement.appendChild(itemImage);
    //     }
    // }
}

// To get the product description using id
function getProductDescription(productId) {
    let product = products.find(x => x.id == productId);
    let productDesc = '';
    for (var key in product) {
        if (key.toString() != 'id' && key.toString() != 'images') {
            productDesc += " " + product[key].toString();
        }
    }
    return productDesc;
}

function createTable_searchresults(final_prod_ids) {
    tableElem = document.getElementById("search-results-table");
    tableElem.innerHTML = "";
    for (let i = 0; i < final_prod_ids.length; i++) {
        rowElem = document.createElement('tr');
        colElem = document.createElement('td');
        colElem.setAttribute("id", "")

        colElem.innerHTML = "";
        for (var id in final_prod_ids) {
            colElem.innerHTML = getProductDescription(id);
            colElem.setAttribute("onclick", "addRecentSearch(" + id + ")");
        }
        colElem.innerHTML = colElem.innerHTML + "<p style='display:none'>" + final_prod_ids[i].toString() + "</p>";

        var prices = [];
        var stores_final = [];
        for (let j = 0; j < productPrices.length; j++) {
            if (productPrices[j].productId == final_prod_ids[i]) {
                var total = productPrices[j].price +
                    productPrices[j].tax +
                    productPrices[j].deliveryCharge -
                    productPrices[j].discount;
                prices.push(total);
                stores_final.push(productPrices[j].storeId);
            }
        }

        colElem.innerHTML = colElem.innerHTML + "<br />";
        for (let j = 0; j < stores_final.length; j++) {
            for (let k = 0; k < stores.length; k++) {
                if (stores[k].id == stores_final[j]) {
                    colElem.innerHTML = colElem.innerHTML + "<img src='./assets/" + stores[k].icon + "' class='icon-image'>";
                    break;
                }
            }
        }
        rowElem.appendChild(colElem);

        prices.sort();
        colElem = document.createElement('td');
        colElem.innerHTML = "Starting from <br /><strong>" + prices[0].toString() + "</strong>";
        rowElem.appendChild(colElem);

        tableElem.appendChild(rowElem);
    }

    if (final_prod_ids == "") {
        tableElem = document.getElementById("search-results-table");
        tableElem.innerHTML = "";
        rowElem = document.createElement('tr');
        colElem = document.createElement('td');
        colElem.innerHTML = "No Results";
        rowElem.appendChild(colElem);
        tableElem.appendChild(rowElem);
    }
}

$(document).on('click', '#search-results-table tr', function () {
    var productid = $(this).find("td:first").find('p').text();
    setHash(`product-details&${productid}&${getHash().split('&')[1]}`);
    // $('p').remove();
    var product_desc = $(this).find("td:first").text();
    createTable_product(productid);
});

$(document).on('mouseover', '#search-results-table tr', function () {
    $("#search-results-table").css("cursor", "pointer");
});

$(document).on('mouseout', '#search-results-table tr', function () {
    $("#search-results-table").css("cursor", "pointer");
});

function createTable_product(productid) {
    document.getElementById('search-result-breadcrumb').addEventListener('click', 
        () => loadPage(["search-results", getHash().split('&')[2]]));
    // clear the value in search
    document.getElementById('search-tab').value = '';
    setPage('product-details');
    product_desc = getProductDescription(productid);
    tableElem = document.getElementById("product-details-table");
    tableElem.innerHTML = "";
    rowElem = document.createElement('tr');
    colElem = document.createElement('td');
    colElem.colSpan = "3";


    if (currentUser.subscriptions.find(subscribe => subscribe == productid)) {
        colElem.innerHTML = product_desc + '<button type="button" class="btn btn-outline-secondary btn-sm" style="float:right; margin-left:4px;" id="subscribe-button-prod" onclick="checkSubscription(' + productid + ');">Unsubscribe</button>';
    }
    else {
        colElem.innerHTML = product_desc + '<button type="button" class="btn btn-outline-secondary btn-sm" style="float:right; margin-left:4px;" id="subscribe-button-prod" onclick="checkSubscription(' + productid + ');">Subscribe</button>';
    }
    rowElem.appendChild(colElem);
    tableElem.appendChild(rowElem);

    rowElem = document.createElement('tr');
    colElem = document.createElement('td');
    colElem.colSpan = "1";
    colElem.innerHTML = "";
    var product_final = [];
    product_final = products.find(product => product.id.toString() == productid.toString());
    for (let j = 0; j < product_final.images.length; j++) {
        colElem.innerHTML += "<img src='./assets/" + product_final.images[j] + "' class='product-image'>";
    }

    rowElem.appendChild(colElem);

    colElem = document.createElement('td');
    colElem.colSpan = "2";
    colElem.innerHTML = "<strong>Promotions</strong><br/>";
    colElem.innerHTML += "<ul>";
    for (i = 0; i < offers.length; i++) {
        if (offers[i].productId == productid) {
            colElem.innerHTML += "<li>" + offers[i].offer + " at "
                + stores.find(store => store.id.toString() == offers[i].storeId.toString()).name
                + "</li>";
        }
    }
    colElem.innerHTML += "</ul>";
    rowElem.appendChild(colElem);
    tableElem.appendChild(rowElem);

    for (let i = 0; i < productPrices.length; i++) {
        if (productPrices[i].productId == productid) {
            rowElem = document.createElement('tr');
            colElem = document.createElement('td');
            colElem.colSpan = "1";
            colElem.innerHTML = "";
            colElem.innerHTML += "<strong>"
                + stores.find(store => store.id.toString() == productPrices[i].storeId.toString()).name
                + "</strong>";
            if (stores.find(store => store.id.toString() == productPrices[i].storeId.toString()).type == "online") {
                colElem.innerHTML += '<span class="badge rounded-pill bg-info text-dark" style="float:right;">Online </span>';
            }
            rowElem.appendChild(colElem);

            colElem = document.createElement('td');
            colElem.colSpan = "1";
            colElem.innerHTML = "";
            colElem.innerHTML += 'Price:' + productPrices[i].price + "<br/>";
            colElem.innerHTML += 'Tax:' + productPrices[i].tax + "<br/>";
            if (productPrices[i].deliveryCharge != 0) {
                colElem.innerHTML += 'Delivery Charges:' + productPrices[i].deliveryCharge + "<br/>";
            }
            colElem.innerHTML += 'Discount:' + productPrices[i].discount + "<br/>";
            rowElem.appendChild(colElem);

            colElem = document.createElement('td');
            colElem.colSpan = "1";
            colElem.innerHTML = "";
            colElem.innerHTML = productPrices[i].price +
                productPrices[i].tax -
                productPrices[i].discount +
                productPrices[i].deliveryCharge;
            rowElem.appendChild(colElem);
            tableElem.appendChild(rowElem);
        }
    }


}

function checkSubscription(productid) {
    if (currentUser.subscriptions.find(subscribe => subscribe == productid)) {
        document.getElementById('subscribe-button-prod').innerHTML = "Subscribe"
        removeSubscription(productid);

    }
    else {
        document.getElementById('subscribe-button-prod').innerHTML = "Unsubscribe"
        addSubscription(productid);
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
    setHash('subscriptions');
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
    if (subscriptions.length <= 0) {
        row = document.createElement('tr');
        row.style.width = '100%';
        row.style.textAlign = 'center';
        column = document.createElement('td');
        column.innerHTML = '<p>No subscriptions</p>';
        row.append(column);
        // Add the row to the table.
        subscriptionsTable.append(row);
        return;
    }

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
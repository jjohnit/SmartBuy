$(document).ready(function () {
    let hash = getHash();
    // When the user is not logged in, redirect to login page.
    if (sessionStorage.getItem('currentUser') == null) {
        setPage('login');
    }
    // When a user has logged in, load the page using url
    else if (hash != null && hash != 'null') {
        loadPage(hash.split('&'));
    }
    else {
        setPage('homepage');
    }
})

function loadPage(hashValues) {
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
        case 'homepage':
            setPage('homepage');
            break;
        case 'edit-profile':
            setPage('edit-profile');
            break;
        default:
            setPage('login');
            break;
    }
}

function setPage(page) {
    switch (page) {
        case 'homepage':
            $('#search-results').css('display', 'none');
            $('#product-details').css('display', 'none');
            $('#subscriptions').css('display', 'none');
            $('#sort').css('display', 'none');
            $('#login').css('display', 'none');
            $('#homepage').css('display', '');
            $('#filter').css('display', '');
            $('#location-search-div').css('display', 'flex');
            $('#logged-in-user').css('display', 'contents');
            $('#edit-profile').css('display', 'none');
            getRecentSearches();
            sessionStorage.setItem('hash', null);
            // clear the value in search
            document.getElementById('search-tab').value = '';
            document.getElementById('welcome-username').innerHTML = JSON.parse(sessionStorage.getItem('currentUser')).name;
            break;
        case 'search-results':
            $('#homepage').css('display', 'none');
            $('#product-details').css('display', 'none');
            $('#subscriptions').css('display', 'none');
            $('#login').css('display', 'none');
            $('#search-results').css('display', '');
            $('#sort').css('display', '');
            $('#filter').css('display', '');
            $('#location-search-div').css('display', 'flex');
            $('#logged-in-user').css('display', 'contents');
            $('#edit-profile').css('display', 'none');
            break;
        case 'product-details':
            $('#homepage').css('display', 'none');
            $('#search-results').css('display', 'none');
            $('#subscriptions').css('display', 'none');
            $('#login').css('display', 'none');
            $('#product-details').css('display', '');
            $('#sort').css('display', '');
            $('#filter').css('display', '');
            $('#location-search-div').css('display', 'flex');
            $('#logged-in-user').css('display', 'contents');
            $('#edit-profile').css('display', 'none');
            break;
        case 'subscriptions':
            $('#homepage').css('display', 'none');
            $('#search-results').css('display', 'none');
            $('#product-details').css('display', 'none');
            $('#sort').css('display', 'none');
            $('#login').css('display', 'none');
            $('#subscriptions').css('display', '');
            getSubscriptions();
            setHash('subscriptions');
            $('#filter').css('display', '');
            $('#location-search-div').css('display', 'flex');
            $('#logged-in-user').css('display', 'contents');
            $('#edit-profile').css('display', 'none');
            break;
        case 'login':
            $('#homepage').css('display', 'none');
            $('#search-results').css('display', 'none');
            $('#subscriptions').css('display', 'none');
            $('#product-details').css('display', 'none');
            $('#location-search-div').css('display', 'none');
            $('#logged-in-user').css('display', 'none');
            $('#edit-profile').css('display', 'none');
            $('#login').css('display', '');
            break;
        case 'edit-profile':
            $('#login').css('display', 'none');
            $('#homepage').css('display', 'none');
            $('#search-results').css('display', 'none');
            $('#subscriptions').css('display', 'none');
            $('#product-details').css('display', 'none');
            $('#sort').css('display', 'none');
            $('#filter').css('display', 'none');
            $('#edit-profile').css('display', '');
            $('#location-search-div').css('display', 'flex');
            $('#logged-in-user').css('display', 'contents');
            break;
    }
}

function setHash(value) {
    // window.location.hash = value;
    sessionStorage.setItem('hash', value);
}

function getHash() {
    // return window.location.hash.substring(1);
    let hash = sessionStorage.getItem('hash');
    return hash;
}

function validateUser() {
    let userName = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    currentUser = validUsers.find(x => x.email == userName && x.password == password);
    console.log(currentUser);
    if (currentUser) {
        setPage('homepage');
        delete currentUser.password;
        sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
    else {
        alert('Incorrect username or password');
    }
}

function logout() {
    setPage('login');
    sessionStorage.clear();
}

function onEditProfile() {
    currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    document.getElementById('ename').value = currentUser.name;
    document.getElementById('eusername').value = currentUser.email;
    setPage('edit-profile');
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
    recentProducts = JSON.parse(sessionStorage.getItem('recentProducts')) || [];
    //Remove the id if it is already there
    let index = recentProducts.indexOf(id);
    if (index >= 0) {
        recentProducts.splice(index, 1);
    }
    recentProducts.push(id);
    sessionStorage.setItem('recentProducts', JSON.stringify(recentProducts));
    console.log(recentProducts);
    /*     <div class="card" title="Iphone 14">
                <img class="card-img-top" src="./assets/iphone-14.png">
              </div> */
}

function getRecentSearches() {
    recentProducts = JSON.parse(sessionStorage.getItem('recentProducts')) || [];
    // Show 'No recent searches when recentSearches is empty'
    if (recentProducts.length <= 0) {
        $('#empty-recents').show();
        return;
    }

    recents = document.getElementById("recents");
    recents.innerHTML = "";
    let recentElement;
    // Get the recent products
    // let productsList = products.filter(x => recentProducts.includes(x.id));
    let product;
    for (var i = recentProducts.length - 1; i >= 0; i--) {
        // $('#empty-recents').hide();
        product = products.find(x => x.id == recentProducts[i]);
        recentElement = document.createElement("div");
        recentElement.setAttribute("class", "card recent-item");
        recentElement.setAttribute("title", getProductDescription(product.id));
        recentElement.setAttribute('data-id', product.id);
        //recentElement.innerHTML = products[i].name
        itemImage = document.createElement("img")
        itemImage.setAttribute("class", "card-img-top");
        itemImage.setAttribute("src", `./assets/${product.images[0]}`);
        recentElement.appendChild(itemImage);
        recents.appendChild(recentElement);
    }
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
            productDesc += product[key].toString() + " ";
        }
    }
    return productDesc;
}

function createTable_searchresults(final_prod_ids) {
    $('#empty-searches').hide();
    tableElem = document.getElementById("search-results-table");
    tableElem.innerHTML = "";
    for (let i = 0; i < final_prod_ids.length; i++) {
        rowElem = document.createElement('tr');
        colElem = document.createElement('td');
        colElem.setAttribute("id", "")

        colElem.innerHTML = "";
        colElem.innerHTML = "<strong>" + getProductDescription(final_prod_ids[i]) + "</strong><br/>";
        colElem.setAttribute("onclick", "addRecentSearch(" + final_prod_ids[i] + ")");
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
        $('#empty-searches').show();
    }
}

$(document).on('click', '#search-results-table tr', function () {
    var productid = $(this).find("td:first").find('p').text();
    setHash(`product-details&${productid}&${getHash().split('&')[1]}`);
    // $('p').remove();
    // var product_desc = $(this).find("td:first").text();
    createTable_product(productid);
});



$(document).on('mouseover', '#search-results-table tr', function () {
    $("#search-results-table").css("cursor", "pointer");
    $(this).find("td").addClass('hover-table');
});

$(document).on('mouseout', '#search-results-table tr', function () {
    $("#search-results-table").css("cursor", "pointer");
    $(this).find("td").removeClass('hover-table');
});


$(document).on('mouseover', '.popup', function () {
    $(this).find("div:first").addClass('fa-xl');
    $(this).find("h1").addClass('brand-hover');
});

$(document).on('mouseout', '.popup', function () {
    $(this).find("div:first").removeClass('fa-xl');
    $(this).find("h1").removeClass('brand-hover');
});


$(document).on('mouseover', '.dropdown-home', function (event) {
    $(this).parent().find("div:first").addClass('fa-xl');
});

$(document).on('mouseout', '.dropdown-home', function () {
    $(this).parent().find("div:first").removeClass('fa-xl');
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
    for (let j = 0; j < product_final.images?.length; j++) {
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
                colElem.innerHTML += '<span class="badge rounded-pill bg-secondary" style="float:right; background-color:black">Online </span>';
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
    let offersOnSubscriptions = offers.filter(x => currentUser.subscriptions.includes(x.productId));
    if (offersOnSubscriptions.length <= 0) {
        list.innerHTML = '<p style="text-align: center;">No notifications</p>';
        return;
    }
    list.innerHTML = '';
    let prodname, storename;
    offersOnSubscriptions.forEach(offer => {
        var entry = document.createElement('li');
        prodname = getProductDescription(offer.productId);
        storename = stores.find(x => x.id == offer.storeId)?.name;

        entry.appendChild(document.createTextNode(prodname + " - " + offer.offer + " at " + storename));
        list.appendChild(entry);
        entry = document.createElement('hr');
        list.appendChild(entry);
    });
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
        productOffersObj.name = getProductDescription(productId);
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
    getNotifications();
}

// To remove a subscription
function removeSubscription(productId) {
    let index = currentUser.subscriptions.indexOf(productId);
    if (index >= 0) {
        currentUser.subscriptions.splice(index, 1);
        getSubscriptions();
        getNotifications();
    }
    else {
        alert('Unable to delete the subscription');
    }
}

// To redirect on product details page on click of recent search item.
$(document).on('click', '.recent-item', function () {
    let id = this.dataset.id;
    setHash(`product-details&${id}&${getProductDescription(id).split(' ')[0]}`);
    createTable_product(id);
});
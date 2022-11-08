// document.getElementById('notification1').value = offers[0].offer;

$(document).ready(function () {
    // setPage('homepage');
    // setPage('search-results');
    setPage('product-details');
    //setPage('subscriptions');
})

function setPage(page) {
    console.log("setpage ", page);
    switch (page) {
        case 'homepage':
            $('#homepage').css('display', '');
            $('#search-results').css('display', 'none');
            $('#product-details').css('display', 'none');
            $('#subscriptions').css('display', 'none');
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

var products = [
    {
        id : 1,
        name: "iPhone 14",
        color: "Black",
        storage: "128 GB",
    },
    {
        id : 2,
        name: "Samsung SSD",
        color: "Black",
        storage: "1 TB",
    },
    {
        id : 3,
        name: "Eggs",
        type: "Organic",
        quantity: 12,
    },
];

var stores = [
    {
        id: 1,
        name: "Walmart",
        type: "store"
    },
    {
        id: 2,
        name: "Walmart",
        type: "online"
    },
    {
        id: 3,
        name: "Target",
        type: "store"
    },
    {
        id: 4,
        name: "Target",
        type: "online"
    },
    {
        id: 5,
        name: "Amazon",
        type: "online"
    },
    {
        id: 6,
        name: "Costco",
        type: "store"
    }
];

var productPrices = [
    {
        productId: 1,
        storeId: 1,
        price: 1299,
        tax: 39.99,
        discount: 149
    },
    {
        productId: 1,
        storeId: 5,
        price: 1299,
        tax: 39.99,
        deliveryCharge: 10,
        discount: 99
    },
    {
        productId: 1,
        storeId: 6,
        price: 1299,
        tax: 39.99,
        discount: 59
    },
    {
        productId: 2,
        storeId: 2,
        price: 799,
        tax: 19.99,
        deliveryCharge: 9.99,
        discount: 149
    },
    {
        productId: 2,
        storeId: 3,
        price: 799,
        tax: 19.99,
        discount: 99
    }
];

var offers = [
    {
        productId: 1,
        storeId: 3,
        offer: "10% off"
    },

    {
        productId: 2,
        storeId: 5,
        offer: "Use code SAVE10 for 10% off"
    }
]


var currentUser = {
    name: 'John Doe',
    email: 'john.doe@uic.edu',
    last_location: 60607,
    subscriptions: [1, 2]
}
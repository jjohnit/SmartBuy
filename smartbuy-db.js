var recentProducts = []

var currentUser = {
    name: 'John Doe',
    email: 'john.doe@uic.edu',
    last_location: 60607,
    subscriptions: []
}

var products = [
    {
        id : 1,
        name: "iPhone 14",
        color: "Black",
        storage: "128 GB",
        images: ['iphone-14.png','iphone-14-1.png','iphone-14-2.png']
    },
    {
        id : 2,
        name: "Samsung SSD",
        color: "Black",
        storage: "1 TB",
        images: ['hard-disk.png','hard-disk-1.png']
    },
    {
        id : 3,
        name: "Eggs",
        type: "Organic",
        quantity: 12,
        images: ['eggs.png']
    },
    {
        id : 4,
        name: "iPhone 14",
        color: "Blue",
        storage: "256 GB",
        images: ['iphone-14.png','iphone-14-1.png','iphone-14-2.png']
    },
    {
        id : 5,
        name: "Twin XL Mattress",
        type: "Foam Mattress",
        thickness: "10 inches",
    },
    {
        id : 6,
        name: "Twin XL Mattress",
        type: "Spring Mattress",
        thickness: "12 inches",
    },

];

var stores = [
    {
        id: 1,
        name: "Walmart",
        type: "store",
        icon: "walmart-icon.png",
    },
    {
        id: 2,
        name: "Walmart",
        type: "online",
        icon: "walmart-icon.png",
    },
    {
        id: 3,
        name: "Target",
        type: "store",
        icon: "target-icon.png",
    },
    {
        id: 4,
        name: "Target",
        type: "online",
        icon: "target-icon.png",
    },
    {
        id: 5,
        name: "Amazon",
        type: "online",
        icon: "amazon-icon.png",
    },
    {
        id: 6,
        name: "Costco",
        type: "store",
        icon: "costco-icon.png",
    },
];

var productPrices = [
    {
        productId: 1,
        storeId: 1,
        price: 1299,
        tax: 39.99,
        deliveryCharge: 0,
        discount: 149,
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
        storeId: 4,
        price: 1299,
        tax: 39.99,
        deliveryCharge: 10,
        discount: 0
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
        deliveryCharge: 0,
        discount: 10
    },
    {
        productId: 2,
        storeId: 4,
        price: 799,
        tax: 19.99,
        deliveryCharge: 12,
        discount: 0
    },
    {
        productId: 3,
        storeId: 1,
        price: 10,
        tax: 1.20,
        deliveryCharge: 0,
        discount: 0
    },
    {
        productId: 3,
        storeId: 6,
        price: 10,
        tax: 1.20,
        deliveryCharge: 0,
        discount: 2
    },
    {
        productId: 4,
        storeId: 1,
        price: 1399,
        tax: 39.99,
        deliveryCharge: 0,
        discount: 149,
    },
    {
        productId: 4,
        storeId: 5,
        price: 1399,
        tax: 39.99,
        deliveryCharge: 50,
        discount: 100,
    },
    {
        productId: 4,
        storeId: 6,
        price: 1399,
        tax: 39.99,
        deliveryCharge: 0,
        discount: 20,
    },
    {
        productId: 5,
        storeId: 2,
        price: 125,
        tax: 10,
        deliveryCharge: 5,
        discount: 2,
    },
    {
        productId: 5,
        storeId: 6,
        price: 125,
        tax: 10,
        deliveryCharge: 0,
        discount: 0,
    },
    {
        productId: 5,
        storeId: 5,
        price: 125,
        tax: 10,
        deliveryCharge: 5.5,
        discount: 10,
    },
    {
        productId: 6,
        storeId: 1,
        price: 130,
        tax: 10,
        deliveryCharge: 0,
        discount: 5,
    },
    {
        productId: 6,
        storeId: 2,
        price: 130,
        tax: 10,
        deliveryCharge: 0,
        discount: 5,
    },
    {
        productId: 6,
        storeId: 5,
        price: 130,
        tax: 10,
        deliveryCharge: 10,
        discount: 0,
    },

];

var offers = [
    {
        productId: 1,
        storeId: 3,
        offer: "10% off on Electronics in 2 days"
    },
    {
        productId: 1,
        storeId: 3,
        offer: "Black Friday Offers starting from November 20th on all products"
    },
    {
        productId: 1,
        storeId: 1,
        offer: "$15 off on all phones for next 1 week"
    },
    {
        productId: 2,
        storeId: 5,
        offer: "Use code SAVE10 for 10% off"
    },
    {
        productId: 2,
        storeId: 3,
        offer: "Black Friday Offers starting from November 20th on all products"
    },
    {
        productId: 3,
        storeId: 3,
        offer: "Black Friday Offers starting from November 20th on all products"
    },
    {
        productId: 4,
        storeId: 6,
        offer: "Limited Time Offer: Save $100 as part of Costco's anniversary"
    },
    {
        productId: 4,
        storeId: 5,
        offer: "Use code SAVE10 for 10% off"
    },
]

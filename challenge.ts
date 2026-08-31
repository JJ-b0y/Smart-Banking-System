interface ProductInterface {
    id: number
    productName: string
    productPrice: number
    discount?: number
    quantity?: number
}

interface ProductWithDiscount extends ProductInterface {
    actualPrice: number
}


//AUSTIN BUSINESS
class AustinBusiness {
    products: ProductInterface[]
    cartBasket: ProductInterface[] = []

    constructor(products: ProductInterface[]) {
        this.products = products
    }

    getAllProducts() {
        console.log("PRODUCTS: ", this.products);
    }

    calculateProductDiscount(product: ProductInterface): ProductWithDiscount {
        let actualPrice: number;

        if(product.discount) {
            const calcProductDiscount = product.productPrice - (product.productPrice * product.discount)
            actualPrice = calcProductDiscount;
        } else {
            actualPrice = product.productPrice
        }

        return { ...product, actualPrice: actualPrice}
    }

    addToCart(id: number): ProductInterface[] {
        const actualProduct: ProductInterface | undefined = this.products.find((product) => {
            return product.id===id
        });

        if (actualProduct) {
            this.cartBasket.push(actualProduct);
        }

        console.log("CART BASKET: ", this.cartBasket);

        return this.cartBasket;
    }

    checkOut(id: number){
        this.addToCart(id);
        const productsInCartWithActualPrice = this.cartBasket.map((productInCart) => {
            return this.calculateProductDiscount(productInCart)
        })

        console.log("PRODUCTS IN CART: ", productsInCartWithActualPrice);
    }
}

const products = new AustinBusiness([
    { id: 1, productName: "p1", productPrice: 100, discount: 0.1},
    { id: 2, productName: "p2", productPrice: 200, discount: 0.2},
    { id: 3, productName: "p3", productPrice: 300}
])

products.getAllProducts();
products.checkOut(1);


// GEORGE BUSINESS
class GeorgeBusiness extends AustinBusiness {
    constructor(products: ProductInterface[]) {
        super(products);
    }

    calcGeorgeProductDiscount(product: ProductInterface, qtyInStock: number): ProductWithDiscount {
        let actualPrice: number;

        if(product.discount) {
            const calcProductDiscount = qtyInStock
            * (product.productPrice 
            - (product.productPrice * product.discount));

            actualPrice = calcProductDiscount
        } else {
            actualPrice = qtyInStock * product.productPrice;
        }

        return {...product, actualPrice: actualPrice}
    }

    override addToCart(id: number): ProductInterface[] {
        const actualProduct: ProductInterface | undefined =
            this.products.find((p: ProductInterface) => {
                return p.id === id
        });

        if (actualProduct) {
            this.cartBasket.push(actualProduct);
        }

        console.log("PRODUCTS IN BASKET: ", this.cartBasket);

        return this.cartBasket;
    }

    override checkOut(id: number): void {
        this.addToCart(id)

        const productsInCartWithActualPrices = this.cartBasket.map((productsInCart) => {
            if(productsInCart.quantity) {
                return this.calcGeorgeProductDiscount(
                    productsInCart,
                    productsInCart.quantity
                )
            }
        })

        console.log("ACTUAL PRODUCTS TO CHECKOUT: ", productsInCartWithActualPrices);
    }
}

const georgeProducts = new GeorgeBusiness([
    {id: 1, productName: "Milk", productPrice: 4, discount: 0.5, quantity: 2},
    {id: 2, productName: "Milk", productPrice: 4, discount: 0.2, quantity: 2}
]);

georgeProducts.getAllProducts();
georgeProducts.checkOut(1);

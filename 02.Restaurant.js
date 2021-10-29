class Restaurant {

    constructor(budget) {

        this.budgetMoney = Number(budget);
        this.menu = {};
        this.stockProducts = {};
        this.history = [];


    }

    loadProducts(products) {


        products.forEach(el => {

            let [productName, productQuantity, productTotalPrice] = el.split(' ');

            let product = this.stockProducts[productName];

            if (this.budgetMoney >= Number(productTotalPrice)) {


                if (product === undefined) {
                    this.budgetMoney -= Number(productTotalPrice);
                    this.stockProducts[productName] = Number(productQuantity);

                }
                else {

                    this.budgetMoney -= Number(productTotalPrice);
                    this.stockProducts[productName] += Number(productQuantity);

                }


                this.history.push(`Successfully loaded ${productQuantity} ${productName}`);

            }
            else {

                this.history.push(`There was not enough money to load ${productQuantity} ${productName}`)

            }

        })


        return this.history.join('\n');

    }

    addToMenu(meal, needetProducts, price) {


        if (this.menu[meal] !== undefined) {

            return `The ${meal} is already in the our menu, try something different.`


        }

        this.menu[meal] = { products: [], price: Number(price) }

        needetProducts.forEach(el => {

            let [name, quantity] = el.split(' ');

            this.menu[meal].products.push({ name, quantity });

        })


        let arrMenu = Array.from(Object.keys(this.menu));

        if (arrMenu.length === 1) {

            return `Great idea! Now with the ${meal} we have 1 meal in the menu, other ideas?`

        }

        return `Great idea! Now with the ${meal} we have ${arrMenu.length} meals in the menu, other ideas?`


    }

    showTheMenu() {

        let result = '';

        let arrMenu = Array.from(Object.keys(this.menu));

        if (arrMenu.length === 0) {

            return "Our menu is not ready yet, please come later...";

        }

        arrMenu.forEach(el => {

            result += `${el} - $ ${this.menu[el].price}\n`

        })

        return result.trim();
    }

    makeTheOrder(meal) {

        let currMeal = this.menu[meal];


        if (currMeal === undefined) {

            return `There is not ${meal} yet in our menu, do you want to order something else?`

        }

        let arrMealProducts = currMeal.products;


        for (const el of arrMealProducts) {

            let product = el.name;
            let quantity = el.quantity;

            if (this.stockProducts[product] === undefined || this.stockProducts[product] < quantity) {

                return `For the time being, we cannot complete your order (${meal}), we are very sorry...`
            }

            this.stockProducts[product] -= Number(quantity);
            this.budgetMoney += Number(currMeal.price)
        }


        return `Your order (${meal}) will be completed in the next 30 minutes and will cost you ${currMeal.price}.`
    }



}






//let kitchen = new Restaurant(1000);

//  console.log(kitchen.loadProducts(['Banana 10 5', 'Banana 20 10', 'Strawberries 50 30', 'Yogurt 10 10', 'Yogurt 500 1500', 'Honey 5 50']));

// // console.log(kitchen.addToMenu('frozenYogurt', ['Yogurt 1', 'Honey 1', 'Banana 1', 'Strawberries 10'], 9.99));
// //  console.log(kitchen.addToMenu('Pizza', ['Flour 0.5', 'Oil 0.2', 'Yeast 0.5', 'Salt 0.1', 'Sugar 0.1', 'Tomato sauce 0.5', 'Pepperoni 1', 'Cheese 1.5'], 15.55));

// //  console.log(kitchen.showTheMenu());

//kitchen.loadProducts(['Yogurt 30 3', 'Honey 50 4', 'Strawberries 20 10', 'Banana 5 1']);
//kitchen.addToMenu('frozenYogurt', ['Yogurt 1', 'Honey 1', 'Banana 1', 'Strawberries 10'], 9.99);
//console.log(kitchen.makeTheOrder('frozenYogurt'));


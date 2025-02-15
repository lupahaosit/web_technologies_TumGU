
class Pizza
{
    constructor(name, price, calories)
    {
        this.name = name;
        this.price = price;
        this.calories = calories;
        this.toppings = ['сырный борт', 'сливочная моцарелла'];
        this.size = 'Большая'
    }
}

class Topping{
    constructor(name, price, calories) {
        this.name = name;
        this.price = price;
        this.calories = calories;
    }
}

function addTopping(topping){
    pizza.toppings.push(topping)
    console.log(pizza.toppings);
}
function removeTopping(topping){
    const index = pizza.toppings.indexOf(topping)
    if (index === -1)
    {
        alert('Топпинг отсутсвует')
        return
    }

    pizza.toppings.splice(index, index+1)
    console.log(pizza.toppings)
}

function getToppings(){
    return pizza.toppings
}

function createPizza(pizzaName) {
    pizza = pizzaz[pizzaName]
    getPrice()
    calculateCalories()
    removeTopping('сырный борт')
    addTopping('сырный борт')
    console.log(pizza.calories)
}

function getPrice(){
    let multiplier
    let totalPrice = pizza.price
    if (pizza.size === 'Маленькая') multiplier = 1
    else multiplier = 2

    pizza.toppings.forEach(function (topping){
        totalPrice += toppings[topping].price * multiplier
    })
    totalPrice += sizes[pizza.size]
    console.log(totalPrice)
}

function calculateCalories(){
    let totalCalories = pizza.calories
    pizza.toppings.forEach(function (topping){
        totalCalories += toppings[topping].calories
    })
    totalCalories += sizes[pizza.size]
    console.log(totalCalories)
}


const pizzaz = {'Маргарита': new Pizza('Маргарита ', 500, 300),
    'Пепперони' : new Pizza('Пепперони', 800, 400),
    'Баварская': new Pizza('Баварская ', 700, 450)}

const sizes = {'Маленькая': 100, 'Большая' : 200}

const toppings = { 'сливочная моцарелла' : new Topping('сливочная моцарелла', 50, 20),
    'сырный борт' : new Topping('сырный борт', 150, 50),
    'чедер и пармезан' : new Topping('чедер и пармезан', 150, 50)
}
let pizza;
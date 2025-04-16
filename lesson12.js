
class Pizza
{
    constructor(name, price, calories)
    {
        this.name = name;
        this.price = price;
        this.calories = calories;
        this.defaultCallories = this.calories
        this.defaultPrice = this.price

        this.size = "Маленькая"
    }
}

class Topping{
    constructor(name, price, calories) {
        this.name = name;
        this.price = price;
        this.calories = calories;
    }
}
pizzaToppings = [];
multiplier = 0
function addTopping(topping){
    if(pizza == null){
        alert("Сначала выберите пиццу")
        return
    }
    temp = pizzaToppings.indexOf(topping)
    if(temp !== -1){
        removeTopping(topping)
        return;
    }
    pizzaToppings.push(topping)
    console.log(pizzaToppings);
    updateOrderButton()
}
function removeTopping(topping){
    const index = pizzaToppings.indexOf(topping)
    pizzaToppings.splice(index, index+1)
    console.log(pizzaToppings)
    updateOrderButton()
}

function getToppings(){
    return pizzaToppings
}

function createPizza(pizzaName) {
    pizza = pizzaz[pizzaName]
    pizza.size = multiplier == 2 ? "Большая" : "Маленькая"
    document.getElementById('additionalPosibilities').style.visibility = 'visible'
    getPrice()
    calculateCalories()
    updateOrderButton()
}

function changeSize(){
    
    if(pizza == null){
        alert("Сначала выберите пиццу")
        toggler.click()
        return
    }
    if(pizza.size == 'Маленькая'){
        pizza.size = "Большая"
        multiplier = 2
    }
    else{
        pizza.size = 'Маленькая'
        multiplier = 1
    }
    updateOrderButton()
}

function getPrice(){
    let totalPrice = pizza.defaultPrice
    pizzaToppings.forEach(function (topping){
        totalPrice += toppings[topping].price * multiplier
    })
    totalPrice += sizes[pizza.size]
    pizza.price = totalPrice
    console.log(totalPrice)
}

function calculateCalories(){
    totalCalories = pizza.defaultCallories
    pizzaToppings.forEach(function (topping){
        totalCalories += toppings[topping].calories
    })
    totalCalories += sizes[pizza.size]
    pizza.calories = totalCalories
    console.log(totalCalories)
}
additional = document.getElementById('additionalPosibilities')
additional.style.visibility = 'hidden';
orderButton = document.getElementById('orderButton')
toggler = document.getElementById('bluetooth')
function updateOrderButton(){
    getPrice()
    calculateCalories()
    orderButton.innerHTML = `Добавить товар в корзину за \n  ${pizza.price}Р (${pizza.calories}ккал)`
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
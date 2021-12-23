function Drink(name, sugar, ice) {
  this.name = name
  this.sugar = sugar
  this.ice = ice
}

Drink.prototype.price = function () {
  switch (this.name) {
    case 'Black Tea':
    case 'Oolong Tea':
    case 'Baozong Tea':
    case 'Green Tea':
      return 30
    case 'Bubble Milk Tea':
    case 'Lemon Green Tea':
      return 50
    case 'Black Tea Latte':
    case 'Matcha Latte':
      return 55
    default:
      alert('No this drink')
  }
}

const drinkPos = new DrinkPos()

function DrinkPos() { }

DrinkPos.prototype.getCheckedValue = function (inputName) {
  let selectedOption = ''
  document.querySelectorAll(`[name=${inputName}]`).forEach(function (item) {
    if (item.checked) {
      selectedOption = item.value
    }
  })
  return selectedOption
}

const orderLists = document.querySelector('[data-order-lists]')

DrinkPos.prototype.addDrink = function (drink) {
  let orderListsCard = `
    <div class="card mb-3">
      <div class="card-body pt-3 pr-3">
        <div class="text-right">
          <span data-drink-pos="delete-drink">x</span>
        </div>
        <h6 class="card-title mb-1">${drink.name}</h6>
        <div class="card-text">${drink.ice}</div>
        <div class="card-text">${drink.sugar}</div>
      </div>
      <div class="card-footer text-right py-2">
        <div class="card-text text-muted">
          $ <span data-drink-price>${drink.price()}</span>
        </div>
      </div>
    </div>
  `
  orderLists.insertAdjacentHTML('afterbegin', orderListsCard)
}

DrinkPos.prototype.deleteDrink = function (target) {
  target.remove()
}

DrinkPos.prototype.checkout = function () {
  let totalAmount = 0
  document.querySelectorAll('[data-drink-price]').forEach(function (drink) {
    totalAmount += Number(drink.textContent)
  })
  return totalAmount
}

DrinkPos.prototype.clearOrder = function (target) {
  target.querySelectorAll('.card').forEach(function (card) {
    card.remove()
  })
}
let allDrinksOptions = document.querySelectorAll('input[name="drink"]')
console.log(allDrinksOptions)

const addDrinkButton = document.querySelector('[data-drink-pos="add-drink"]')
addDrinkButton.addEventListener('click', function () {
  console.log('click')
  // 1. 取得店員選擇的飲料品項、甜度和冰塊
  const drinkName = drinkPos.getCheckedValue('drink')
  const ice = drinkPos.getCheckedValue('ice')
  const sugar = drinkPos.getCheckedValue('sugar')
  console.log(`${drinkName}, ${ice}, ${sugar}`)

  // 2. 如果沒有選擇飲料品項，跳出提示
  if (!drinkName) {
    alert('Please choose at least one item.')
    return
  }
  // 3. 建立飲料實例，並取得飲料價格
  let drink = new Drink(drinkName, sugar, ice)
  console.log(drink)
  console.log(drink.price())
  // 4. 將飲料實例產生成左側訂單區的畫面
  drinkPos.addDrink(drink)
})

orderLists.addEventListener('click', function (event) {
  let isDeleteButton = event.target.matches('[data-drink-pos="delete-drink"]')
  if (!isDeleteButton) {
    return
  }
  drinkPos.deleteDrink(event.target.parentElement.parentElement.parentElement)
})

const checkoutButton = document.querySelector('[data-drink-pos="checkout"]')
checkoutButton.addEventListener('click', function () {
  // 1. 計算訂單總金額
  alert(`Total amount of drinks：$${drinkPos.checkout()}`)
  // 2. 清空訂單
  drinkPos.clearOrder(orderLists)
})
// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

// ================================================================
class Product {
  static #list = []
  constructor(name, price, description) {
    this.id = new Math.random()
    this.createData = new Date.toString()
    this.name = name
    this.price = price
    this.description = description
  }

  static add = (product) => {
    this.#list.push(product)
  }
  static getList = () => {
    return this.#list
  }
  static getByID = (id) =>
    this.#list.find((product) => product.id === id)
  static deleteByID = (id) => {
    const index = this.#list.findIndex(
      (product) => product.id === id,
    )
    if (index !== -1) {
      this.#list.splice(index, 1)
      return true
    } else {
      return false
    }
  }
  static updateByID = (id, data) => {
    const product = this.getByID(id)
    if (product) {
      this.update(product, data)
      return true
    } else {
      return false
    }
  }
}
// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/', function (req, res) {
  // res.render генерує нам HTML сторінку
  const list = Product.getList()
  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('product-index', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'index',
    data: {
      users: {
        list,
        isEmpty: list.length === 0,
      },
    },
  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================
router.post('/user-create', function (req, res) {
  const { email, login, password } = req.body
  const user = new User(email, login, password)
  User.add(user)
  console.log(User.getList())
  res.render('success-info', {
    style: 'success-info',
    info: 'Користувача створено',
  })
})
// ================================================================
router.get('conteiner/user-delete', function (req, res) {
  const { id } = req.query
  console.log(typeof id)
  const user = User.deleteByID(Number(id))
  if (user) {
    console.log('!!!!!!!!!!!!!')
  }
  res.render('success-info', {
    style: 'success-info',
    info: 'Користувача видалено',
  })
})
// ================================================================
router.post('/user-update', function (req, res) {
  const { email, password, id } = req.body
  const user = User.getByID(Number(id))
  let result = false
  if (user.verivyPassword(password)) {
    User.update(user, { email })
    result = true
  }

  res.render('success-info', {
    style: 'success-info',
    info: result
      ? 'Email пошта оновлена'
      : 'Сталася помілка',
  })
})
// Підключаємо роутер до бек-енду
module.exports = router

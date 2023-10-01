// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

// ================================================================
class Product {
  static #list = []
  constructor(name, price, description) {
    this.id = parseInt(Math.random() * 100000)
    this.createData = new Date().toString()
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
      Object.assign(product, data)
      return true
    } else {
      return false
    }
  }
}
// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/product-create', function (req, res) {
  // res.render генерує нам HTML сторінку
  const list = Product.getList()
  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('product-index', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'product-index',
    data: {
      products: {
        list,
        isEmpty: list.length === 0,
      },
    },
  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================
router.post('/product-create', function (req, res) {
  const { name, price, description } = req.body
  console.log(req.body)
  const product = new Product(name, price, description)
  Product.add(product)
  console.log(Product.getList())
  res.render('product-success-info', {
    style: 'product-success-info',
    info: 'Продукт створено',
  })
})
// ================================================================
router.get('/product-delete', function (req, res) {
  const { id } = req.query
  console.log(typeof id)
  const product = Product.deleteByID(Number(id))
  if (product) {
    console.log('!!!!!!!!!!!!!')
  }
  res.render('success-info', {
    style: 'success-info',
    info: 'Товар видалено',
  })
})
// ================================================================
router.post('/product-edit', function (req, res) {
  const { name, price, description, id } = req.body
  const product = Product.getByID(Number(id))

  const result = Product.updateByID(Number(id), {
    name,
    price,
    description,
  })

  res.render('success-info', {
    style: 'success-info',
    info: result ? 'Товар оновлено' : 'Сталася помілка',
  })
})
// ================================================================
// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/product-list', function (req, res) {
  // res.render генерує нам HTML сторінку
  const list = Product.getList()
  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('product-list', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'product-index',
    data: {
      products: {
        list,
        isEmpty: list.length === 0,
      },
    },
  })
  // ↑↑ сюди вводимо JSON дані
})

// =====================================================
// ================================================================

// Підключаємо роутер до бек-енду
module.exports = router

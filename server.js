

const express = require('express');
const app = express()
app.use(express.json());

const port = 5059

const PANTS_MODELS = ['jeans', 'sweatpants', 'khakis', 'yoga']
const SOCKS_MODELS = ['wool', 'cotton']
const SHIRT_MODELS = ['t-shirt', 'dress shirt', 'blouse']
const COLORS = ['blue', 'purple', 'green', 'red', 'white', 'orange']

const CITIES = ['boston', 'new york', 'san francisco']
const PRODUCT_CATEGORIES = ['pants', 'shirts', 'socks']

app.get('/rest/product_categories/', (req, res) => {
  res.json( {'product_categories': PRODUCT_CATEGORIES})
})

app.get('/rest/cities/', (req, res) => {
  res.json( {'cities': CITIES})
})



app.get('/rest/stock/:city/:clothing', (req, res) => {
  const city = req.params['city']
  const clothing = req.params['clothing']

  if (!city) {
    res.status(400).send("<city> not defined")
  }

  if (clothing === 'pants') {
    res.json({'models': PANTS_MODELS})
  } else if (clothing === 'socks') {
    res.json({'models': SOCKS_MODELS})
  } else if (clothing === 'shirts') {
    res.json({'models': SHIRT_MODELS})
  } else {
    res.status(400).send("unknown clothing type: '" + clothing + "'")
  }
})



app.get('/rest/color/:city/:clothing/:model', (req, res) => {
  const city = req.params['city']
  const clothing = req.params['clothing']
  const model = req.params['model']

  if (!city || !clothing) {
    res.status(400).send("<city> or <clothing> not defined")
  } else if (clothing === 'pants') {
    const ix = PANTS_MODELS.indexOf(model)
    if (ix === -1) {
      res.status(400).send("unknown model type: " + model)
    }
    res.json({'colors': COLORS.slice(ix) })

  } else if (clothing === 'socks') {
    const ix = SOCKS_MODELS.indexOf(model)
    if (ix === -1) {
      res.status(400).send("unknown model type: " + model)
    }
    res.json({'colors': COLORS.slice(ix) })

  } else if (clothing === 'shirts') {
    const ix = SHIRT_MODELS.indexOf(model)
    if (ix === -1) {
      res.status(400).send("unknown model type: " + model)
    }
    res.json({'colors': COLORS.slice(ix) })

  } else {
    res.status(400).send("unknown clothing type: " + clothing)
  }

})

app.post('/rest/submit', (req, res) => {
    const data = req.body

    const validKeys = ['city', 'product', 'model', 'color', 'quantity'].every(item => Object.keys(data).includes(item));

    const validValues = Object.values(data).every(item => item !== '');

    if (validKeys && validValues) {
      res.status(204).send("submitted successfully")
    } else {
      res.status(400).send("invalid submission")
    }
})

app.listen(port, () => {
  console.log("starting backend server on port " + port)
})

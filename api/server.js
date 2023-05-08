const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());

app.use(cors({
	origin: '*',
	methods: ['GET', 'POST', 'DELETE', 'PUT'],
  }));




require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Connected to MongoDB"))
    .catch(console.error);

    // Models
const Inventory = require('./models/Inventory');
const ShoppingList = require('./models/ShoppingList');

    // inventory REST HTTP methods
app.get('/inventory', async (req, res) => {
	const inventory = await Inventory.find();
  
	res.json(inventory);
  });

  
  app.post('/inventory/new', (req, res) => {
	//console.log(req.body);
	const inventory = new Inventory({
		item: req.body.item,
		quantity: req.body.quantity,
		units: req.body.units,
		location: req.body.location,
		expires: req.body.expires,
	})
    //saves to actual collection
	inventory.save();

	res.json(inventory);
});


app.delete('/inventory/delete/:id', async (req, res) => {
	const resultExists = await Inventory.exists({ _id: req.params.id });
	
	if (!resultExists) {
		return res.status(404).json({ error: 'Item not found' });
	}
	
	const result = await Inventory.findByIdAndDelete(req.params.id);

	res.json({ result });
});


app.get('/inventory/complete/:id', async (req, res) => {
	const inventory = await Inventory.findById(req.params.id);
  
	inventory.complete = !inventory.complete;

	inventory.save();

	res.json(inventory);
  });


app.put('/inventory/update/:id', async (req, res) => {
	const inventory = await Inventory.findById(req.params.id);

	inventory.item = req.body.item;
	inventory.quantity = req.body.quantity;
	inventory.units = req.body.units;
	inventory.location = req.body.location;
	inventory.expires = req.body.expires;

	inventory.save();

	res.json(inventory);
});

//ShoppingList REST HTTP Methods
app.get('/shoppingList', async (req, res) => {
	const shoppingList = await ShoppingList.find();
  
	res.json(shoppingList);
});


app.post('/shoppingList/new', async (req, res) => {
	const shoppingList = new ShoppingList({
		item: req.body.item,
		quantity: req.body.quantity,
		units: req.body.units,
		location: req.body.location,
		expires: req.body.expires,
	});
	
	
	shoppingList.save();
	
	res.json(shoppingList);
});


app.delete('/shoppingList/delete/:id', async (req, res) => {
	const resultExists = await ShoppingList.exists({ _id: req.params.id });
	
	if (!resultExists) {
		return res.status(404).json({ error: 'Item not found' });
	}
	
	const result = await ShoppingList.findByIdAndDelete(req.params.id);

	res.json({ result });
});

app.get('/shoppingList/complete/:id', async (req, res) => {
	const shoppingList = await ShoppingList.findById(req.params.id);
  
	shoppingList.complete = !shoppingList.complete;

	shoppingList.save();

	res.json(shoppingList);
});

app.put('/shoppingList/update/:id', async (req, res) => {
	const shoppingList = await ShoppingList.findById(req.params.id);

	shoppingList.item = req.body.item;
	shoppingList.quantity = req.body.quantity;
	shoppingList.units = req.body.units;
	shoppingList.location = req.body.location;
	shoppingList.expires = req.body.expires;

	shoppingList.save();

	res.json(shoppingList);
});


    app.listen(3001);
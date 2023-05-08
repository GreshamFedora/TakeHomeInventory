const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InventorySchema = new Schema({
	item: {
		type: String,
		required: true
	},
	quantity: {
		type: Number,
		required: true
	},
	units: {
		type: String,
		required: true
	},
	location: {
		type: String,
		required: true
	},
	expires: {
		type: String,
		required:true
	},
	complete: {
		type: Boolean,
		default: false
	},
	timestamp: {
		type: String,
		default: Date.now()
	}
});

const Inventory = mongoose.model("Inventory", InventorySchema);

module.exports = Inventory;
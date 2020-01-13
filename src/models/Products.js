const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    ProductId:{
        type: Number,
        required: true

    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },

})

mongoose.model('Products',ProductSchema);
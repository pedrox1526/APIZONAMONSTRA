const mongoose = require ('mongoose');

const Products = mongoose.model('Products')

module.exports = {
    async index(req, res){
        const product = await Products.find();

        return res.json(product);
    },

    async store(req, res){
        const product = await Products.create(req.body);

        return res.json(product);
        
    },
    
    async update(req,res){
        const product = await 
        Products.findByIdAndUpdate(req.params.id, req.body, { new: 
            true})
            
            return res.json(product);

    },
    async delete(req,res){
        await Products.findByIdAndDelete(req.params.id);

        return res.send();

    },
    async showone(req,res){
        const product = await Products.findById(req.params.id);
        return res.json(product);
    }

};
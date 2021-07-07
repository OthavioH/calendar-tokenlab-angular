const Events = require('../../models/Events');

async function showOneEvent(req,res){
    const {id} = req.query;

    const event = await Events.findOne({_id:id});
    if(!event){
        return res.status(404).json({error:'Erro ao tentar achar o evento'})
    }
    return res.json(event);
}

module.exports = showOneEvent;
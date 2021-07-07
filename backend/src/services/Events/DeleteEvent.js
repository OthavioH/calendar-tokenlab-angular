const Events = require('../../models/Events');

async function deleteEvent(req,res){
    const {id} = req.query;

    const event = await Events.deleteOne({_id:id});
    if(!event){
        return res.status(400).json({error:'Erro ao tentar achar o evento'})
    }

    return res.status(200).json({message:"Evento deletado com sucesso"});
}

module.exports = deleteEvent;
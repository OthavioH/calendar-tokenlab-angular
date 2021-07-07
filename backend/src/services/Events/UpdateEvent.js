const Events = require('../../models/Events');

async function updateEvent(req,res){
    const { form, participants } = req.body;
    const { name,desc,startDate, endDate,startTime,endTime } = form;
    const { id } = req.query;

    console.log(id);

    const event = await Events.updateOne({_id:id},{
        name:name,
        desc:desc,
        startDate: startDate,
        endDate:endDate,
        startTime:startTime,
        endTime:endTime,
        participants: participants,
    }).catch((err)=>{
        console.log(err);
        return res.status(400).json({error:err});
    })

    return res.json(event);
    
}

module.exports = updateEvent;
const Events = require('../../models/Events');

async function createEvent(req,res){
    const { name,desc,startDate, endDate, startTime, endTime, email } = req.body;

    const author = await findUser(email);


    const event = await Events.create({
        name:name,
        desc:desc,
        startDate:startDate,
        endDate: endDate,
        startTime:startTime,
        endTime:endTime,
        author: author.email,
        participants:[{email: email}],
    }).catch((err)=>{
        console.log(err);
        return res.status(400).json({error:"Erro ao tentar cadastrar novo evento"});
    });
    return res.json(event);
}

module.exports = createEvent;
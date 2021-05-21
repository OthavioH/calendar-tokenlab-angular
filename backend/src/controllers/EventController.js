const Events = require('../models/Events');
const Users = require('../models/Users');

module.exports = {
    async createEvent(req,res){
        const {name,desc,startDate, endDate,startTime,endTime,email, participants} = req.body;

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
    },
    async showAllEvents(req,res){
        const { email } = req.body;

        const events = await Events.find({});

        const filteredEvents = await filterEvents(events, email);

        return res.status(200).json(filteredEvents);
    },
    async deleteEvent(req,res){
        const {id} = req.query;

        const event = await Events.deleteOne({_id:id});
        if(!event){
            return res.status(400).json({error:'Erro ao tentar achar o evento'})
        }

        return res.status(200).json({message:"Evento deletado com sucesso"});
    },
    async updateEvent(req,res){
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
        
    },
    async showOneEvent(req,res){
        const {id} = req.query;

        const event = await Events.findOne({_id:id});
        if(!event){
            return res.status(404).json({error:'Erro ao tentar achar o evento'})
        }
        return res.json(event);
    }
}

async function findUser(email){
    const userExists = await Users.findOne({email:email});

    if(userExists){
        return userExists;
    }
}

async function filterEvents(eventsList, email) {

    let lista = eventsList.filter((event)=>{
        for (let index = 0; index < event.participants.length; index++) {
            if(event.participants[index].email == email){
                return event;
            }
        }
    });

    lista = await lista.sort((a,b)=>{
        return sortByDate(new Date(a.startDate), new Date(b.startDate));
    });

    return lista;
}

function sortByDate(a, b){
    return a - b;
}
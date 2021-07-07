const sortByDate = require('./SortByDate');

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

module.exports = filterEvents;
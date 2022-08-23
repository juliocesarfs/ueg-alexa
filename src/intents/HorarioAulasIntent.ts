import { UegenioApi } from "../api/UegenioApi";

const uegenioApi = new UegenioApi();

var weekday = new Array(7);
weekday[0] = "domingo";
weekday[1] = "segunda-feira";
weekday[2] = "terça-feira";
weekday[3] = "quarta-feira";
weekday[4] = "quinta-feira";
weekday[5] = "sexta-feira";
weekday[6] = "sabado";

const HorarioAulasIntentHandler = {
    canHandle(handlerInput) {
        const { request } = handlerInput.requestEnvelope;
        return request.type === 'IntentRequest' && request.intent.name === 'HorarioAulasIntent';
    },
    async handle(handlerInput) {
        const { request } = handlerInput.requestEnvelope;

        const slots = request.intent.slots;

        const date = slots.date.value ? new Date(slots.date.value) : new Date(request.timestamp);
        console.log(date.getHours())

        const dataApi = await uegenioApi.getClassrooms({
            alexaId: '38922bba-2556-49c4-999d-87b584084382',
            weekDay: weekday[date.getDay() + 1],
            time: slots.horario.value,
        });

        // weekday[date.getDay() + 1]

        let classrooms = []
        dataApi.data.classrooms.forEach(classroom => {

            let startHour = classroom.classroom.times[0].start_hour.substr(0, classroom.classroom.times[0].start_hour.length - 1);
            let finalHour = classroom.classroom.times[0].final_hour.substr(0, classroom.classroom.times[0].final_hour.length - 1);

            const startMinutes = new Date(startHour).getMinutes() === 0 ? '00' : new Date(startHour).getMinutes();
            const finalMinutes = new Date(finalHour).getMinutes() === 0 ? '00' : new Date(finalHour).getMinutes();
            const data = {
                name: classroom.classroom.subject.name,
                start_hour: new Date(startHour).getHours() + ':' + startMinutes,
                final_hour: new Date(finalHour).getHours() + ':' + finalMinutes
            }

            classrooms.push(data);
        })

        console.log(classrooms);

        let speechText = `${weekday[date.getDay() + 1]} você não tem aulas `;
        if (classrooms[0]) {
            speechText = `${weekday[date.getDay() + 1]} você terá aulas de `;

            classrooms.forEach(classroom => {
                speechText += `${classroom.name} de ${classroom.start_hour} até ${classroom.final_hour}, `
            })
        } else if (slots.horario.value) {
            speechText += `as ${slots.horario.value}`
        }

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt('teste', speechText)
            .getResponse();
    }
}

export { HorarioAulasIntentHandler };
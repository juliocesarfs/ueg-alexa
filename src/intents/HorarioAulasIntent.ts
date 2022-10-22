import { UegenioApi } from "../api/UegenioApi";

const uegenioApi = new UegenioApi();

var weekday = new Array(7);
weekday[7] = "domingo";
weekday[1] = "segunda-feira";
weekday[2] = "terça-feira";
weekday[3] = "quarta-feira";
weekday[4] = "quinta-feira";
weekday[5] = "sexta-feira";
weekday[6] = "sábado";

const HorarioAulasIntentHandler = {
    canHandle(handlerInput) {
        const { request } = handlerInput.requestEnvelope;
        return request.type === 'IntentRequest' && request.intent.name === 'HorarioAulasIntent';
    },
    async handle(handlerInput) {
        const { request } = handlerInput.requestEnvelope;

        const slots = request.intent.slots;

        const date = slots.date.value ? new Date(slots.date.value) : new Date(request.timestamp);
        console.log(date);
        console.log(date.getDay());
        console.log(date.getHours())

        const weekDay = slots.date.value ? weekday[date.getDay() + 1] : weekday[date.getDay()]
        const dataApi = await uegenioApi.getClassrooms({
            alexaId: 'd214a2ff-f9b3-430d-8bcf-6e19d57dd3fc',
            weekDay,
            time: slots.horario.value,
            subjectName: slots.disciplina.value,
        });
        // weekday[date.getDay() + 1]

        let classrooms = []
        if (!slots.disciplina.value) {
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
        } else {
            console.log(dataApi.data)
            dataApi.data.classrooms.forEach(classroom => {

                let startHour = classroom.times[0].start_hour.substr(0, classroom.times[0].start_hour.length - 1);
                let finalHour = classroom.times[0].final_hour.substr(0, classroom.times[0].final_hour.length - 1);

                const startMinutes = new Date(startHour).getMinutes() === 0 ? '00' : new Date(startHour).getMinutes();
                const finalMinutes = new Date(finalHour).getMinutes() === 0 ? '00' : new Date(finalHour).getMinutes();
                const data = {
                    name: classroom.subject.name,
                    start_hour: new Date(startHour).getHours() + ':' + startMinutes,
                    final_hour: new Date(finalHour).getHours() + ':' + finalMinutes
                }

                classrooms.push(data);
            })
        }

        console.log(classrooms);


        let speechText = `${weekDay} você não tem aulas `;
        if (classrooms[0]) {
            speechText = `${weekDay} você tem aulas de `;

            classrooms.forEach(classroom => {
                speechText += `${classroom.name} de ${classroom.start_hour} até ${classroom.final_hour}, `
            })
        } else if (slots.horario.value) {
            speechText += `as ${slots.horario.value}`
        }

        console.log(weekDay);

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt('teste')
            .getResponse();
    }
}

export { HorarioAulasIntentHandler };
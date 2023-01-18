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

        const weekDay = slots.date.value ? weekday[date.getDay() + 1] : weekday[date.getDay()];


        try {


            console.log(date);
            console.log(date.getDay());
            console.log(date.getHours())
            console.log(slots.disciplina.value)


            let filter;

            if (slots.disciplina.value !== undefined) {
                const filter = {
                    subject: slots.disciplina.value,
                    weekDay
                }
                //time: slots.horario.value,

                const result = await uegenioApi.getClassrooms(filter);

                if (result.status == 404) {
                    return handlerInput.responseBuilder
                        .speak(`Não haverá aula em ${weekDay}`)
                        .reprompt()
                        .getResponse();
                }

                const time = new Date("1970-01-01T" + slots.horario.value);
                let hours = '';
                let subject;

                let text;

                result.forEach(classroom => {
                    if (slots.horario.value !== undefined) {
                        classroom.hours.forEach(hour => {
                            let initHour = new Date("1970-01-01T" + hour.initHour);
                            let finalHour = new Date("1970-01-01T" + hour.finalHour);

                            if (time >= initHour && time <= finalHour) {
                                hours = hour.initHour + ' até ' + hour.finalHour;
                            }


                        })
                        console.log('houasudas d asdhnasudhasudashduasdashud');
                        console.log(hours);
                        if (!hours) {
                            console.log('ENTRA AQUI PELO AMOR DE DEUS')
                            const disciplina = slots.disciplina.resolutions.resolutionsPerAuthority[0].values[0].value.name ? slots.disciplina.resolutions.resolutionsPerAuthority[0].values[0].value.name : slots.disciplina.value
                            console.log(disciplina);

                            text = `Não haverá aula de ${disciplina} no período de ${slots.horario.value} horas em ${weekDay}`;
                        }
                    } else {
                        classroom.hours.forEach(hour => {
                            hours += hour.initHour + ' até ' + hour.finalHour + ', ';
                        })
                    }



                    subject = classroom.nomeSubject;
                    console.log(subject);
                })

                if (!text) {
                    text = `Você tem aula de ${subject} em ${weekDay} de ${hours}`
                }

                handlerInput.responseBuilder
                    .speak(text)
                    .reprompt()
                    .getResponse();

                return handlerInput.responseBuilder.getResponse();

            }



            handlerInput.responseBuilder
                .speak(`nao cai aqui pfvr`)
                .reprompt()
                .getResponse();

            return handlerInput.responseBuilder.getResponse();

        } catch (e) {

        }
    }


}

export { HorarioAulasIntentHandler };
import { getSimpleSlotValues, getSlotValue } from "ask-sdk-core";
import { UegenioApi } from "../api/UegenioApi";
import { format } from "date-fns";

const uegenioApi = new UegenioApi();

var weekday = new Array(7);
weekday[7] = "domingo";
weekday[1] = "segunda-feira";
weekday[2] = "terça-feira";
weekday[3] = "quarta-feira";
weekday[4] = "quinta-feira";
weekday[5] = "sexta-feira";
weekday[6] = "sábado";
weekday[0] = "domingo";

interface ClassroomToString {
    subjectName: string,
    hoursToString: string,
}

const HorarioAulasIntentHandler = {
    canHandle(handlerInput) {
        const { request } = handlerInput.requestEnvelope;
        return request.type === 'IntentRequest' && request.intent.name === 'HorarioAulasIntent';
    },
    async handle(handlerInput) {

        const { request } = handlerInput.requestEnvelope;
        const slots = request.intent.slots;

        const date = slots.date.value ? new Date(slots.date.value) : new Date(request.timestamp);

        const dateFormat = format(new Date(date), 'yyyy-MM-dd')
        console.log('date format', dateFormat);

        const weekDay = slots.date.value ? weekday[date.getDay()] : weekday[date.getDay()];


        try {

            if (slots.date.value) {
                date.setDate(date.getDate());
            }


            const semester = await uegenioApi.getSemester({ date: dateFormat });

            if (semester.status == 404) {
                handlerInput.responseBuilder
                    .speak(`Ainda não existem aulas cadastradas nesse semestre atual`)
                    .reprompt()
                    .getResponse();

                return handlerInput.responseBuilder.getResponse();
            }

            const holiday = await uegenioApi.getHoliday({ date: dateFormat });
            console.log('asdasdasd')
            console.log(holiday);

            if (holiday[0]) {
                handlerInput.responseBuilder
                    .speak(`Não haverá aula no dia ${dateFormat} pois é ${holiday[0].nome}`)
                    .reprompt()

                return handlerInput.responseBuilder.getResponse();
            }

            if (slots.disciplina.value !== undefined) {
                const disciplina = slots.disciplina.resolutions.resolutionsPerAuthority[0].values ? slots.disciplina.resolutions.resolutionsPerAuthority[0].values[0].value.name : slots.disciplina.value;

                const filter = {
                    subject: disciplina,
                    weekDay,
                    date: dateFormat
                }
                //time: slots.horario.value,


                const result = await uegenioApi.getClassrooms(filter);

                if (result.status == 404) {
                    return handlerInput.responseBuilder
                        .speak(`Não haverá aula de ${disciplina} em ${weekDay}`)
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

                        if (!hours) {

                            text = `Não haverá aula de ${classroom.nomeSubject} no período de ${slots.horario.value} horas em ${weekDay}`;
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

            } else {
                const student = await uegenioApi.getStudent(handlerInput.requestEnvelope.session.user.userId);

                const filter = {
                    weekDay,
                    idStudent: student.id,
                    date: dateFormat
                }

                const result = await uegenioApi.getStudentsClassrooms(filter);
                console.log(result);

                if (result.status == 404) {
                    return handlerInput.responseBuilder
                        .speak(`Não haverá aula em ${weekDay}`)
                        .reprompt()
                        .getResponse();
                }

                const time = new Date("1970-01-01T" + slots.horario.value);
                let hours = '';

                let classroomsToStringList: ClassroomToString[] = [];
                let text;

                result.forEach(classroom => {
                    if (slots.horario.value !== undefined) {
                        classroom.hours.forEach(hour => {
                            let initHour = new Date("1970-01-01T" + hour.initHour);
                            let finalHour = new Date("1970-01-01T" + hour.finalHour);

                            if (time >= initHour && time <= finalHour) {
                                hours = hour.initHour + ' até ' + hour.finalHour;

                                const classroomToString: ClassroomToString = {
                                    subjectName: classroom.nomeSubject,
                                    hoursToString: hours
                                }

                                classroomsToStringList.push(classroomToString);
                            }


                        })

                        if (!hours) {

                            text = `Não haverá aula no período de ${slots.horario.value} horas em ${weekDay}`;
                        }
                    } else {
                        let hoursClassroom = '';
                        classroom.hours.forEach(hour => {

                            hoursClassroom += hour.initHour + ' até ' + hour.finalHour + ', ';


                        })

                        const classroomToString: ClassroomToString = {
                            subjectName: classroom.nomeSubject,
                            hoursToString: hoursClassroom
                        }

                        classroomsToStringList.push(classroomToString);
                        hoursClassroom = '';
                    }
                })

                console.log(classroomsToStringList);

                if (!text) {

                    text = 'Você tem aula de '
                    classroomsToStringList.forEach(classroom => {
                        text += classroom.subjectName + ' de ' + classroom.hoursToString;
                    })

                    console.log(text);
                    //text = `Você tem aula de ${subject} em ${weekDay} de ${hours}`
                }

                handlerInput.responseBuilder
                    .speak(text)
                    .reprompt()
                    .getResponse();

                return handlerInput.responseBuilder.getResponse();

            }





        } catch (e) {
            console.log(e)
            handlerInput.responseBuilder
                .speak('Ocorreu um erro interno no servidor, tente novamente mais tarde')
                .reprompt()
                .getResponse();

            return handlerInput.responseBuilder.getResponse();
        }
    }


}

export { HorarioAulasIntentHandler };
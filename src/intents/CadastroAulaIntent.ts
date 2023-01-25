import { UegenioApi } from "../api/UegenioApi";


const uegenioApi = new UegenioApi();

const CadastroAulaIntentHandler = {
    canHandle(handlerInput) {


        const { request } = handlerInput.requestEnvelope;
        return request.type === 'IntentRequest' && request.intent.name === 'CadastroAulaIntent';
    },
    async handle(handlerInput) {
        try {

            const { request } = handlerInput.requestEnvelope;

            const slots = request.intent.slots;


            const className = slots.disciplina.value;
            const date = new Date(request.timestamp);
            date.setMonth(date.getMonth() + 1);

            let day = date.getDate();
            let month = date.getMonth();

            let filterDate = date.getFullYear() + '-' + month + '-' + day



            const classrooms = await uegenioApi.getClassrooms({ subject: className, date: filterDate });
            console.log(classrooms)

            if (classrooms.status === 404) {
                handlerInput.responseBuilder
                    .speak(`Não encontrei disciplina com o nome ${className}`)
                    .reprompt()

                return handlerInput.responseBuilder.getResponse();
            }
            const student = await uegenioApi.getStudent(handlerInput.requestEnvelope.session.user.userId);

            const dataToSave = {
                id: student.id,
                alexaID: student.alexaID,
                studentsClassrooms: [
                    {
                        idClassroom: classrooms[0].id,
                        idStudent: student.id,
                        alexaID: student.alexaID,
                        nomeSubject: classrooms[0].nomeSubject,
                    }
                ]
            }

            const result = await uegenioApi.registerUsersClassrooms(dataToSave);

            handlerInput.responseBuilder
                .speak(`Disciplina ${classrooms[0].nomeSubject} cadastrada com sucesso`)
                .reprompt()

            // .listen(question)

            //handlerInput.responseBuilder.



            //const requestResult = await uegenioApi.registerClass({ subjectName: className, alexaId: 'alexa_1212' })

            //let text = ''
            //console.log(requestResult);
            /*
            if (requestResult === null) {
                text = 'Não existe disciplina com esse nome'
            } else if (requestResult) {
                text = 'Disciplina cadastrada com sucesso'
            } else if (!requestResult) {
                text = 'Ocorreu um erro interno, tente novamente mais tarde'
            }
            */
        } catch (e) {
            console.log(e)
            handlerInput.responseBuilder
                .speak('ocorreu um erro interno no servidor, tente novamente mais tarde')
                .reprompt()

            return handlerInput.responseBuilder.getResponse();
        }



        return handlerInput.responseBuilder.getResponse();
    }
}

export { CadastroAulaIntentHandler };
import { UegenioApi } from "../api/UegenioApi";


const uegenioApi = new UegenioApi();

const DeleteAulaIntentHandler = {
    canHandle(handlerInput) {


        const { request } = handlerInput.requestEnvelope;
        return request.type === 'IntentRequest' && request.intent.name === 'DeleteAulaIntent';
    },
    async handle(handlerInput) {

        try {
            const { request } = handlerInput.requestEnvelope;

            const slots = request.intent.slots;

            const className = slots.disciplina.value;
            console.log(className);

            const date = new Date(request.timestamp);
            date.setMonth(date.getMonth() + 1);

            let day = date.getDate();
            let month = date.getMonth();

            let filterDate = date.getFullYear() + '-' + month + '-' + day

            const classrooms = await uegenioApi.getClassrooms({ subject: className, date: filterDate });

            const student = await uegenioApi.getStudent(handlerInput.requestEnvelope.session.user.userId);

            const dataToDelete = {
                idClassroom: classrooms[0].id,
                idStudent: student.id
            }

            console.log(dataToDelete);

            const result = await uegenioApi.deleteClass(dataToDelete);

            /*
            if (requestResult === null) {
                text = 'Não existe disciplina com esse nome'
            } else if (requestResult) {
                text = 'Disciplina cadastrada com sucesso'
            } else if (!requestResult) {
                text = 'Ocorreu um erro interno, tente novamente mais tarde'
            }
            */


            handlerInput.responseBuilder
                .speak(`Disciplina ${classrooms[0].nomeSubject} deletada com sucesso`)
                .getResponse();


            return handlerInput.responseBuilder.getResponse();
            // .listen(question)

            //handlerInput.responseBuilder.

        } catch (err: any) {
            handlerInput.responseBuilder
                .speak(`Disciplina não encontrada`)
                .getResponse();


            return handlerInput.responseBuilder.getResponse();
        }
    }
}

export { DeleteAulaIntentHandler };
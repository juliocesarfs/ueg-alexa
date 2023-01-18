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

            const classrooms = await uegenioApi.getClassrooms(className);
            const student = await uegenioApi.getStudent(handlerInput.requestEnvelope.session.user.userId);

            const dataToDelete = {
                idClassroom: classrooms[0].id,
                idStudent: student.id
            }

            const result = await uegenioApi.deleteClass(dataToDelete)

            /*
            if (requestResult === null) {
                text = 'Não existe disciplina com esse nome'
            } else if (requestResult) {
                text = 'Disciplina cadastrada com sucesso'
            } else if (!requestResult) {
                text = 'Ocorreu um erro interno, tente novamente mais tarde'
            }
            */


            return handlerInput.responseBuilder
                .speak(`Disciplina ${classrooms[0].nomeSubject} deletada com sucesso`)
                .repromt()
                .getResponse();
            // .listen(question)

            //handlerInput.responseBuilder.

        } catch (err: any) {
            console.log(err.message);
        }
    }
}

export { DeleteAulaIntentHandler };
import { UegenioApi } from "../api/UegenioApi";


const uegenioApi = new UegenioApi();

const ConsultaDisciplinaIntent = {
    canHandle(handlerInput) {


        const { request } = handlerInput.requestEnvelope;
        return request.type === 'IntentRequest' && request.intent.name === 'ConsultaDisciplinaIntent';
    },
    async handle(handlerInput) {

        try {
            const { request } = handlerInput.requestEnvelope;

            const slots = request.intent.slots;

            const className = slots.disciplina.resolutions.resolutionsPerAuthority[0].values[0].value.name;
            const solicitation = slots.solicitacao.resolutions.resolutionsPerAuthority[0].values[0].value.name;
            console.log(className, solicitation);

            const requestResult = await uegenioApi.getSubjectSolicitation({ alexaId: 'd214a2ff-f9b3-430d-8bcf-6e19d57dd3fc', subjectName: className, solicitation })

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
                .speak(requestResult.data.message)
            // .listen(question)

            //handlerInput.responseBuilder.

            return handlerInput.responseBuilder.getResponse();
        } catch (err: any) {
            console.log(err.message);
        }
    }
}

export { ConsultaDisciplinaIntent };
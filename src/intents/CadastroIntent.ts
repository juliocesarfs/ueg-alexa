import { UegenioApi } from "../api/UegenioApi";

const uegenioApi = new UegenioApi();

const CadastroIntentHandler = {
    canHandle(handlerInput) {

        const { request } = handlerInput.requestEnvelope;
        return request.type === 'IntentRequest' && request.intent.name === 'CadastroIntent';
    },
    async handle(handlerInput) {

        const { request } = handlerInput.requestEnvelope;

        const slots = request.intent.slots;

        console.log(slots);
        const className = slots.disciplina;

        const requestResult = await uegenioApi.registerClass({ className, userId: 'alexa-id' })

        let text = ''
        if (requestResult === null) {
            text = 'Não existe disciplina com esse nome'
        } else if (requestResult) {
            text = 'Disciplina cadastrada com sucesso'
        } else if (!requestResult) {
            text = 'Ocorreu um erro interno, tente novamente mais tarde'
        }


        return handlerInput.responseBuilder
            .speak('speechText')
            .reprompt('teste')
            .getResponse();
    }
}

export { CadastroIntentHandler };
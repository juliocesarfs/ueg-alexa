import { UegenioApi } from "../api/UegenioApi";

// const uegenioApi = new UegenioApi();

const CadastroIntentHandler = {
    canHandle(handlerInput) {

        const { request } = handlerInput.requestEnvelope;
        return request.type === 'IntentRequest' && request.intent.name === 'CadastroIntent';
    },
    async handle(handlerInput) {

        const { request } = handlerInput.requestEnvelope;

        const slots = request.intent.slots;

        console.log(slots);

        return handlerInput.responseBuilder
            .speak('speechText')
            .reprompt('teste')
            .getResponse();
    }
}

export { CadastroIntentHandler };
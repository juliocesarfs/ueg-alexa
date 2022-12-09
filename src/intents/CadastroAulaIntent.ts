import { UegenioApi } from "../api/UegenioApi";
import { HandlerInput } from 'ask-sdk-core';


const uegenioApi = new UegenioApi();

const CadastroAulaIntentHandler = {
    canHandle(handlerInput) {


        const { request } = handlerInput.requestEnvelope;
        return request.type === 'IntentRequest' && request.intent.name === 'CadastroAulaIntent';
    },
    async handle(handlerInput: HandlerInput) {

        try {/*
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
        */

            const question = ' Voce deseja se cadastrar em Banco de Dados 1 ou Banco de dados 2?';

            handlerInput.responseBuilder
                .speak('speechText')
            // .listen(question)

            //handlerInput.responseBuilder.

            return handlerInput.responseBuilder.getResponse();
        } catch (err: any) {
            console.log(err.message);
        }
    }
}

export { CadastroAulaIntentHandler };
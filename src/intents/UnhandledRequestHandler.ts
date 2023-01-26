import { HandlerInput } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';


const UnhandledRequestHandler = {

    canHandle(handlerInput) {
        return true;
    },

    handle(handlerInput) {
        const speechText = 'Desculpe, não entendi o que você quis dizer';

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt()
            .getResponse();
    }
}

export { UnhandledRequestHandler };
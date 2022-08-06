import { HandlerInput } from 'ask-sdk-core';
import Alexa from 'ask-sdk-core'
import { Response } from 'ask-sdk-model';

import { CustomSkillRequestHandler } from 'ask-sdk-core/dist/dispatcher/request/handler/CustomSkillRequestHandler';

class CancelAndStopRequestHandler implements CustomSkillRequestHandler {

    canHandle(input: HandlerInput): boolean | Promise<boolean> {
        return Alexa.getRequestType(input.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(input.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(input.requestEnvelope) === 'AMAZON.StopIntent');
    }

    handle(input: HandlerInput): Response | Promise<Response> {
        const speechText = 'Tchau! Obnrigado por utilizar nosso bot!';

        return input.responseBuilder
            .speak(speechText)
            .withSimpleCard('Hello World', speechText)
            .withShouldEndSession(true)
            .getResponse();
    }
}

export const cancelAndStopRequestHandler =  new CancelAndStopRequestHandler();
import { HandlerInput } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';

import { CustomSkillRequestHandler } from 'ask-sdk-core/dist/dispatcher/request/handler/CustomSkillRequestHandler';

class HelpRequestHandler implements CustomSkillRequestHandler {

    canHandle(input: HandlerInput): boolean | Promise<boolean> {
        const { request } = input.requestEnvelope;

        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.HelpIntent';
    }

    handle(input: HandlerInput): Response | Promise<Response> {
        const speechText = 'Pode dizer: olá mundo';

        return input.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
}

export const helpRequestHandler =  new HelpRequestHandler();
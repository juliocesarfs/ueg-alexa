import { HandlerInput } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';

import { CustomSkillRequestHandler } from 'ask-sdk-core/dist/dispatcher/request/handler/CustomSkillRequestHandler';

class UnhandledRequestHandler implements CustomSkillRequestHandler {

    canHandle(input: HandlerInput): boolean | Promise<boolean> {
        return true;
    }

    handle(input: HandlerInput): Response | Promise<Response> {
        const speechText = 'Desculpe, não entendi o que você quis dizer';

        return input.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
}

export const unhandledRequestHandler =  new UnhandledRequestHandler();
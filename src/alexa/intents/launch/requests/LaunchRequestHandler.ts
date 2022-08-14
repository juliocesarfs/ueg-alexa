import { HandlerInput } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';

import { CustomSkillRequestHandler } from 'ask-sdk-core/dist/dispatcher/request/handler/CustomSkillRequestHandler';

class LaunchRequestHandler implements CustomSkillRequestHandler {

    canHandle(input: HandlerInput): boolean | Promise<boolean> {
        return input.requestEnvelope.request.type === 'LaunchRequest';
    }

    handle(input: HandlerInput): Response | Promise<Response> {
        let speechText = 'Uegênio está aberto';

        console.log('FODASDASDASDASD')

        return input.responseBuilder
            .speak(speechText)
            .getResponse();
    }
}

export const launchRequestHandler = new LaunchRequestHandler();
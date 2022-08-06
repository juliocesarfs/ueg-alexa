import { HandlerInput } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';

import { CustomSkillRequestHandler } from 'ask-sdk-core/dist/dispatcher/request/handler/CustomSkillRequestHandler';

class SessionEndedRequestHandler implements CustomSkillRequestHandler {

    canHandle(input: HandlerInput): boolean | Promise<boolean> {
        return input.requestEnvelope.request.type === 'SessionEndedRequest';
    }

    handle(input: HandlerInput): Response | Promise<Response> {
        // console.log(`Session ended with reason: ${input.requestEnvelope.request.reason}`);

        return input.responseBuilder.getResponse();
    }
}

export const sessionEndedRequestHandler =  new SessionEndedRequestHandler();
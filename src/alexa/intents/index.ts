import { SkillBuilders, DefaultApiClient } from 'ask-sdk-core';
import { launchRequestHandler } from './launch/requests/LaunchRequestHandler';
import { horarioAulasIntent } from './horarioAulas/requests/horarioAulasIntent';

import Alexa from 'ask-sdk-core';


const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Hello World!';
        console.log('sexozinho')

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

const createSkill = () => {
    const skillbuilder = SkillBuilders.custom();
    return skillbuilder.addRequestHandlers(
        launchRequestHandler,
        horarioAulasIntent,
        HelloWorldIntentHandler
    )
        .withApiClient(new DefaultApiClient())
        .withCustomUserAgent('UEGbot/v1')
        .create()
}

export { createSkill };
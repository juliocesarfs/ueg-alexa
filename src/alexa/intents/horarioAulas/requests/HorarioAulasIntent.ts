const HorarioAulasIntentHandler = {
    canHandle(handlerInput) {
        const { request } = handlerInput.requestEnvelope;
        console.log(request);
        return request.type === 'IntentRequest' && request.intent.name === 'HorarioAulasIntent';
    },
    handle(handlerInput) {
        const speechText = 'Você não tem aulas hoje';

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt('teste', speechText)
            .getResponse();
    }
}

export { HorarioAulasIntentHandler };
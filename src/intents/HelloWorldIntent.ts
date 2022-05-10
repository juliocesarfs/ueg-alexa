const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        const { request } = handlerInput.requestEnvelope;
        return request.type === 'IntentRequest' && request.intent.name === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        const speechText = 'Salve júlio!';

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt('Hello world', speechText)
            .getResponse();
    }
}


export { HelloWorldIntentHandler };
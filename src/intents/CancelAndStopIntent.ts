

const CancelAndStopIntent = {

    canHandle(handlerInput) {
        const { request } = handlerInput.requestEnvelope;
        console.log(request.intent.name)

        return request.type === 'IntentRequest'
            && request.intent.name === 'AMAZON.CancelIntent'
            || request.intent.name === 'AMAZON.StopIntent'

    },

    handle(handlerInput) {

        return handlerInput.responseBuilder
            .speak('Até mais')
            .withShouldEndSession(true)
            .getResponse();
    }
}

export { CancelAndStopIntent };
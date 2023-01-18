import { UegenioApi } from "../api/UegenioApi";

const uegenioApi = new UegenioApi();

const LaunchRequest = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  async handle(handlerInput) {
    const alexaID = handlerInput.requestEnvelope.session.user.userId;

    try {
      await uegenioApi.registerUser(alexaID);
    } catch (err) {
    }


    const speechText = 'uegênio foi aberto';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt()
      .getResponse();

  },
};

export { LaunchRequest };
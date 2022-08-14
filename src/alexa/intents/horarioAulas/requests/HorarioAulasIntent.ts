import { HandlerInput } from "ask-sdk-core";
import { CustomSkillRequestHandler } from "ask-sdk-core/dist/dispatcher/request/handler/CustomSkillRequestHandler";
import { Response } from "ask-sdk-model";



class HorarioAulasIntentHandler implements CustomSkillRequestHandler {

    canHandle(input: HandlerInput): boolean | Promise<boolean> {
        return true;
    }

    handle(input: HandlerInput): Response | Promise<Response> {
        console.log('SEXO');

        const filter = {

        }
        const speechText = 'Você não tem aulas hoje';

        return input.responseBuilder
            .speak(speechText)
            .getResponse();
    }
}

export const horarioAulasIntent = new HorarioAulasIntentHandler();

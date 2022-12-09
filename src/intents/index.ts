import { SkillBuilders, DefaultApiClient } from 'ask-sdk-core';

// import { SessionEndedRequest, HelpIntent, CancelAndStopIntentHandler, UnhandledIntent } from '../alexa/intents/amazon/requests';
import { LaunchRequest } from './LaunchIntent';
import { HorarioAulasIntentHandler } from './HorarioAulasIntent';
import { CadastroAulaIntentHandler } from './CadastroAulaIntent';

const createSkill = () => {
    const skillbuilder = SkillBuilders.custom();
    return skillbuilder.addRequestHandlers(
        LaunchRequest,
        HorarioAulasIntentHandler,
        CadastroAulaIntentHandler,
        // SessionEndedRequest,
        // HelpIntent,
        // CancelAndStopIntentHandler,
        // UnhandledIntent,
    )
        .withApiClient(new DefaultApiClient())
        .withCustomUserAgent('UEGbot/v1')
        .create()
}

export { createSkill };
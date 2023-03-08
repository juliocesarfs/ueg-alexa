import { SkillBuilders, DefaultApiClient } from 'ask-sdk-core';

// import { SessionEndedRequest, HelpIntent, CancelAndStopIntentHandler, UnhandledIntent } from '../alexa/intents/amazon/requests';
import { LaunchRequest } from './LaunchIntent';
import { HorarioAulasIntentHandler } from './HorarioAulasIntent';
import { CadastroAulaIntentHandler } from './CadastroAulaIntent';
import { DeleteAulaIntentHandler } from './DeleteAulaIntent';
import { ConsultaDisciplinaIntent } from './ConsultaDisciplinaIntent';
import { CancelAndStopIntent } from './CancelAndStopIntent';
import { UnhandledRequestHandler } from './UnhandledRequestHandler';

const createSkill = () => {
    const skillbuilder = SkillBuilders.custom();
    return skillbuilder.addRequestHandlers(
        LaunchRequest,
        HorarioAulasIntentHandler,
        CadastroAulaIntentHandler,
        DeleteAulaIntentHandler,
        ConsultaDisciplinaIntent,
        // SessionEndedRequest,
        // HelpIntent,
        CancelAndStopIntent,
        UnhandledRequestHandler,
    )
        .withApiClient(new DefaultApiClient())
        .withCustomUserAgent('UEGbot/v1')
        .create()
}

export { createSkill };
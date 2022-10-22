import { SkillBuilders, DefaultApiClient } from 'ask-sdk-core';

import { SessionEndedRequest, HelpIntent, CancelAndStopIntentHandler, UnhandledIntent } from './AmazonIntents';
import { HelloWorldIntentHandler } from './HelloWorldIntent';
import { LaunchRequest } from './LaunchIntent';
import { HorarioAulasIntentHandler } from './HorarioAulasIntent';
import { CadastroIntentHandler } from './CadastroIntent';

const createSkill = () => {
    const skillbuilder = SkillBuilders.custom();
    return skillbuilder.addRequestHandlers(
        LaunchRequest,
        HelloWorldIntentHandler,
        HorarioAulasIntentHandler,
        CadastroIntentHandler,
        SessionEndedRequest,
        HelpIntent,
        CancelAndStopIntentHandler,
        UnhandledIntent,
    )
        .withApiClient(new DefaultApiClient())
        .withCustomUserAgent('UEGbot/v1')
        .create()
}

export { createSkill };
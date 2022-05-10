import { SkillBuilders, DefaultApiClient } from 'ask-sdk-core';

import { SessionEndedRequest, HelpIntent, CancelAndStopIntentHandler, UnhandledIntent } from './AmazonIntents';
import { HelloWorldIntentHandler } from './HelloWorldIntent';
import { LaunchRequest } from './LaunchIntent';
import { HorarioAulasIntentHandler } from './HorarioAulasIntent';

const createSkill = () => {
    const skillbuilder = SkillBuilders.custom();
    return skillbuilder.addRequestHandlers(
        LaunchRequest,
        HelloWorldIntentHandler,
        HorarioAulasIntentHandler,
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
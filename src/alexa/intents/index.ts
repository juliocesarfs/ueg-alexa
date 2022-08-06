import { SkillBuilders, DefaultApiClient } from 'ask-sdk-core';
import { launchRequestHandler } from './launch/requests/LaunchRequestHandler';

const createSkill = () => {
    const skillbuilder = SkillBuilders.custom();
    return skillbuilder.addRequestHandlers(
        launchRequestHandler,
    )
        .withApiClient(new DefaultApiClient())
        .withCustomUserAgent('UEGbot/v1')
        .create()
}

export { createSkill };
import express from 'express';
import { ExpressAdapter } from 'ask-sdk-express-adapter';
import { createSkill } from '../intents';

const alexaApp = express();


const skill = createSkill();

const adapter = new ExpressAdapter(skill, true, false);

alexaApp.post('/', adapter.getRequestHandlers());

export { alexaApp };
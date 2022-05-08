import { DialogflowSession } from './lib/dialogflow-session'
import { v4 as uuidv4 } from 'uuid';

const sessionId = uuidv4();

const text = 'aulas hoje';

const dialogflowSession = new DialogflowSession(sessionId);

console.log(getResponse());


async function getResponse() {
    const response = await dialogflowSession.queryText(text);

    return response;
}
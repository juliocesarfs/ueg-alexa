import { DialogflowSession } from './lib/dialogflow-session'
import { v4 as uuidv4 } from 'uuid';

const sessionId = uuidv4();

const text = 'aulas';

const dialogflowSession = new DialogflowSession(sessionId);

getResponse();


async function getResponse() {
    const response = await dialogflowSession.queryText(text);
    console.log(response[0]);

    return response;
}
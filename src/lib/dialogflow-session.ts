import { SessionsClient, protos } from '@google-cloud/dialogflow';
import { config } from '../config/devkey'
// import { DialogflowMessageHandler } from "./dialogflow-message-handler";

/**
 * Class for open a session in dialogflow and handle it
 */
export class DialogflowSession {
  private sessionPath: string;

  constructor(
    public sessionId: string,
    public languageCode: string = "pt-BR",
    public location: string = 'us-central1',
    public agentId: string = 'e25f8551-c895-49cb-a4f4-019f28153ee9',
  ) {
      
    const credts = {
        client_email: config.client_email,
        privateKey: config.private_key
    }

    const projectId = config.projectId;

    this.sessionPath = new SessionsClient().projectAgentSessionPath(projectId, sessionId);
  }

  /**
   * Send a text to dialogflow and put the response in the response atribute
   * @param text The tex to send to the bot
   * @returns A instance of message handler with the dialogflow response
   */
  public async queryText<T = any>(text: string) {
    // create the session client
    const sessionClient = new SessionsClient({apiEndpoint: `dialogflow.googleapis.com`});

    try {
        const dialogflowResponse = await sessionClient.detectIntent({
            session: this.sessionPath,
            queryInput: {
              text: {
                text: text,
                languageCode: 'pt-BR'
              },
            },
          });

          return dialogflowResponse;
    } catch (e) {
        console.log(e.message);
    }
  }
}

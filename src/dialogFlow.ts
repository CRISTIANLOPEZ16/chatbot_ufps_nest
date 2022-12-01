
/**
 * TODO(developer): UPDATE these variables before running the sample.
 */
// projectId: ID of the GCP project where Dialogflow agent is deployed
// const projectId = 'PROJECT_ID';
// sessionId: String representing a random number or hashed user identifier
// const sessionId = '123456';
// queries: A set of sequential queries to be send to Dialogflow agent for Intent Detection
// const queries = [
//   'Reserve a meeting room in Toronto office, there will be 5 of us',
//   'Next monday at 3pm for 1 hour, please', // Tell the bot when the meeting is taking place
//   'B'  // Rooms are defined on the Dialogflow agent, default options are A, B, or C
// ]
// languageCode: Indicates the language Dialogflow agent should use to detect intents
// const languageCode = 'en';

// Imports the Dialogflow library
const dialogflow = require('@google-cloud/dialogflow');

// Instantiates a session client
const sessionClient = new dialogflow.SessionsClient();
class Connection {
    public async detectIntent(projectId:string, sessionId:string, query:string, languageCode:string) {
        // The path to identify the agent that owns the created intent.
        let sessionPath = sessionClient.projectAgentSessionPath(
          projectId,
          sessionId
        );
      
        // The text query request.
        let request = {
          session: sessionPath,
          queryInput: {
            text: {
              text: query,
              languageCode: languageCode,
            },
          },
        };
      
        let responses = await sessionClient.detectIntent(request);
        return responses[0];
      }
}
export const connection=new Connection();


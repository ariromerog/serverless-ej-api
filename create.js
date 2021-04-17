import * as uuid from "uuid";
import handler from "./libs/handler-lib";
import dyndb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) =>  {
  const data = JSON.parse(event.body); // req body viene en event.body
  const params = {
    TableName: process.env.tableName,
    Item: {
      userid: event.requestContext.identity.cognitoIdentityId,
      noteid: uuid.v1(),
      content: data.content,
      attachment: data.attachment,
      createdAt: Date.now(),
    }
  };

  await dyndb.put(params);

  return params.Item;
});

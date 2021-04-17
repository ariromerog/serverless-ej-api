import handler from "./libs/handler-lib";
import dyndb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) =>  {
  const data = JSON.parse(event.body); // req body viene en event.body
  const params = {
    TableName: process.env.tableName,
    Key: {
      userid: event.requestContext.identity.cognitoIdentityId,
      noteid: event.pathParameters.id
    },
    UpdateExpression: "SET content = :content, attachment = :attachment",
    ExpressionAttributeValues: {
      ":content": data.content || null,
      ":attachment": data.attachment || null,
    },
    ReturnValues: "ALL_NEW"
  };

  await dyndb.update(params);

  return {status: true};
});

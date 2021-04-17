import handler from "./libs/handler-lib";
import dyndb from "./libs/dynamodb-lib";

export const main = handler( async (event, context) => {
  const params = {
    TableName: process.env.tableName,
    KeyConditionExpression: "userid = :userid",
    ExpressionAttributeValues: {
      ":userid" : event.requestContext.identity.cognitoIdentityId
    }
  };

  const result = await dyndb.query(params);
  return result.Items;
});

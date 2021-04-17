
import handler from "./libs/handler-lib";
import dyndb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) =>  {
  const params = {
    TableName: process.env.tableName,
    Key: {
      userid: "123",
      noteid: event.pathParameters.id
    },
  };

  await dyndb.delete(params);

  return {status: true};
});

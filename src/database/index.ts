import { createConnection, getConnectionOptions } from 'typeorm';

export default getConnectionOptions().then(async (connectionOptions) => {
  Object.assign(connectionOptions, { host: 'database_ignite' });
  await createConnection(connectionOptions);
});
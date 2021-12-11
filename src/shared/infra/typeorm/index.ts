import { Connection, createConnection, getConnectionOptions } from 'typeorm';

/*export default getConnectionOptions().then(async (connectionOptions, host = "database") => {
  Object.assign(connectionOptions, { host });
  await createConnection(connectionOptions);
})*/

export default async (host = "database"): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions() ;

  return createConnection(
    Object.assign(defaultOptions, {
      host,
    })
  )
}


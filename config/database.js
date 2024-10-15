const path = require("path");
const config = require("platformsh-config").config();
let dbRelationship = "postgresdatabase";

// this line rajesh ^^^^^^

if (config.isValidPlatform() && config.inBuild()) {


  console.log("================================");
  console.log("hello world");
  console.log("================================");
  // Platform.sh database configuration.
  const credentials = config.credentials(dbRelationship);
  console.log("hello world again");
  console.log(
    `Using Platform.sh configuration with relationship ${dbRelationship}.`
  );

  let pool = {
    min: 0,
    max: 10,
    acquireTimeoutMillis: 600000,
    createTimeoutMillis: 30000,
    idleTimeoutMillis: 20000,
    reapIntervalMillis: 20000,
    createRetryIntervalMillis: 200,
  };

  connection = {
    connection: {
      client: "postgres",
      connection: {
        host: credentials.ip,
        port: credentials.port,
        database: credentials.path,
        user: credentials.username,
        password: credentials.password,
        ssl: false,
      },
      debug: false,
      pool,
    },
  };

  module.exports = ({ env }) => ({
    defaultConnection: 'default',
    connections: {
      default: {
        connector: 'bookshelf',
        settings: {
          client: 'postgres',
          host: credentials.ip,
          port: credentials.port,
          database: credentials.path,
          username: credentials.username,
          password: credentials.password,
        },
        options: {
          ssl: env.bool('DATABASE_SSL', false),
        },
      },
    },
  });
}



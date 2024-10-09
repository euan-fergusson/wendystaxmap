const path = require("path");
const config = require("platformsh-config").config();

console.log("================================");
console.dir(config.isValidPlatform());
console.log("================================");

if (config.isValidPlatform() && !config.inBuild()) {

  console.log("hello world2");

  // Platform.sh database configuration.
  const credentials = config.credentials(dbRelationship);
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



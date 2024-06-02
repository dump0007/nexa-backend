import {
    SecretsManagerClient,
    GetSecretValueCommand,
    PutSecretValueCommand,
  } from "@aws-sdk/client-secrets-manager";
  import config from "../../config/env";
  const secret_name = config.AWS_SECRET_NAME;
  const client = new SecretsManagerClient({
    region: "us-east-1",
  });
  
  class SecretManager {
    /**
     * getSecret
     */
    public getSecret = async (secretKey: string) => {
      try {
        const response = await client.send(
          new GetSecretValueCommand({
            SecretId: secret_name,
            VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
          })
        );
        const SecretString = response.SecretString;
        const oldData = JSON.parse(SecretString as string);
        if (oldData && oldData[secretKey]) {
          return oldData[secretKey];
        } else {
          return undefined;
        }
      } catch (error) {
        return undefined;
      }
    };
  
    /**
     * setNewSecret
     */
    public setNewSecret = async (key: string, value: string) => {
      try {
        const response = await client.send(
          new GetSecretValueCommand({
            SecretId: secret_name,
            VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
          })
        );
        const SecretString = response.SecretString;
        const oldData = JSON.parse(SecretString as string);
        oldData[key] = value;
        const updateSecretParams = {
          SecretId: secret_name,
          SecretString: JSON.stringify(oldData),
        };
        const updateSecretCommand = await client.send(
          new PutSecretValueCommand(updateSecretParams)
        );
        return true;
      } catch (error) {
        return error;
      }
    };
  }
  
  export default new SecretManager();
const { ApiManagementClient, ApiCreateOrUpdateParameter } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");
// For client-side applications running in the browser, use InteractiveBrowserCredential instead of DefaultAzureCredential. See https://aka.ms/azsdk/js/identity/examples for more details.

const subscriptionId = "<subId>";
const client = new ApiManagementClient(new DefaultAzureCredential(), subscriptionId);



//create graphql api in one single call with schema (requires public endpoint returns introspection)
async function createApiWithSchema(){
    
    let resourceGroupName = "<resourceGroupName>";
    let serviceName = "<apimServiceName>";
    let apiId = "<apiId>";

    //construct api properties
    let apiProperties = {
        displayName: "<displayName>",
        path: "<path>",
        apiType:"graphql",
        protocols: ["https"],
        format: "graphql-link",
        value: "<graphqlEndpoint>"
    }

    return await client.api.beginCreateOrUpdateAndWait(
        resourceGroupName,
        serviceName,
        apiId,
        apiProperties
    );
}

//create graphql api without schema (useful when grahql endpoint doesn't return introspection)
async function createApiWithoutSchema(){
    
    let resourceGroupName = "<resourceGroupName>";
    let serviceName = "<apimServiceName>";
    let apiId = "<apiId>";

    //construct api properties
    let apiProperties = {
        displayName: "<displayName>",
        path: "<path>",
        protocols: ["https"],
        apiType:"graphql",
        serviceUrl: "<graphqlEndpoint>",
    }

    return await client.api.beginCreateOrUpdateAndWait(
        resourceGroupName,
        serviceName,
        apiId,
        apiProperties
    );
}

//create graphql schema (useful when grahql endpoint doesn't return introspection)
async function createApiSchema(){

    await createApiWithoutSchema();
    
    let resourceGroupName = "<resourceGroupName>";
    let serviceName = "<apimServiceName>";
    let apiId = "<apiId>";
    let schemaId = "graphql";

    //construct api properties
    let apiProperties = {
        components: null,
        contentType: "application/vnd.ms-azure-apim.graphql.schema",
        definitions: null,
        value: "<schemaContentEscapedString>"
    }

    return await client.apiSchema.beginCreateOrUpdateAndWait(
        resourceGroupName,
        serviceName,
        apiId,
        schemaId,
        apiProperties
    );
}

async function main() {
    const result = await createApiSchema();
    console.log(result);
}

main();
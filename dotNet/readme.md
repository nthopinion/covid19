# dotNet
A sub directory for .NET and C# utilities.

## 1. Cosmos DB Migration Tool

This utility project makes heavy use of the Microsoft.Azure.Cosmos SDK and has everything required for mapping and migrating Cosmos containers.

### 1.1 Code

The code grabs data from a target container, maps the data to a new model and then pushes that model to a destination container. The code will delete the destination container (if it exists) before it copies over the new data model. In order to use it:

• Open the project in Visual Studio  
• Alter the appSettings.json.  
• Hit F5.

This project can act as a base for future alterations to the Cosmos data models.

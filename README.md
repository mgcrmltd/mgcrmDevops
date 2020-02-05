# mgcrmDevops
A website to bulk create Azure Devops tasks against user stories. Makes use of the Azure Devops APIs. Requires NodeJS v10. Written using Ionic 5 with Angular. 

The following steps are required and give the default connection values.

1.Create the following folder and files

- src/app/environments/
  - environment.prod.ts
  - environment.ts
 

2.Insert the following JSON into environment.prod.ts
````
 export const environment = {
  production: true
 };
 ````
3.Insert the following JSON into environment.ts
````
 export const environment = {
  production: false,
  devopsUrl: "",
  projectName: "",
  personalToken: "",
 };
 ````
 
 4.If you wish for the fields to be pre-populated, update the JSON. It is not advisable to pre-populate the personal token. For example:
 ````
  export const environment = {
  production: false,
  devopsUrl: "https://dev.azure.com/myName",
  projectName: "Dev Backlog",
  personalToken: "",
 };
 ````

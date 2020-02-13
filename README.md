# mgcrmDevops
A website to bulk create Azure Devops tasks against user stories. For teams who use the same tasks against all stories. Also allows calculation of hours for those tasks.

Makes use of the Azure Devops APIs. Requires NodeJS v10. Written using Ionic 5 with Angular. 

The following steps are required to pre-populate connection values.

1. Stop git from tracking changes to the environment file so details are not commited
````
git update-index --assume-unchanged src/environments/*
````

2. Add values to src/environments/environment.ts. These will then appear as defaults. Be careful about using a default  Personal Access Token. For example:
````
 export const environment = {
  production: false,
  devopsUrl: "https://dev.azure.com/abcltd",
  projectName: "Main Backlog",
  teamName: "Sprint Team 1",
  personalToken: "",
  tasks: {
    complex: true,
    taskTitles : [{name: "Dev"},{name: "QA Scripts"},{name: "QA Manual Tests"}]
  }, 
  hoursCalc: [
    {group: "Dev", tags:[
      {tag: "Dev"}
    ]},
    {group: "Test", tags:[
      {tag: "QA"},
    ]}
  ]
};
 ````

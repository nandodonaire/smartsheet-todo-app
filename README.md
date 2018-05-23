Smartsheet To Do App

This is a simple to do app built using Node.js which saves data to a sheet in Smartsheet using the Smartsheet api. Currently, the app can GET the tasks that are on the sheet, POST new tasks to the sheet, and DELETE tasks from the sheet. The EDIT functionality is still in progress.

In order to use the Smartsheet api, I created a config.json file which contains my 'Smartsheet Access Token', Sheet Id, as well as the Column Ids for the 'task name', 'status', and 'due date' columns on the sheet. The contents of the config.json file look like this:

```
{
    "SMARTSHEET_ACCESS_TOKEN": "my token",
    "SHEET_ID": 1111111111111111,
    "TEXT_COLUMN_ID": 1111111111111111,
    "STATUS_COLUMN_ID": 1111111111111111,
    "DUEDATE_COLUMN_ID": 1111111111111111
}
```

In order to use the app, users can either create a config.json file in the root of the 'smartsheet-todo-app' repository which includes their 'Smartsheet Acess Token', Sheet ID, and the Column Ids for their columns, or these values can be hard-coded into the todoController.js file where needed (for example, where it says 'config.SHEET_ID').

In order to run the app, please use the steps below:

1) Fork the repo from GitHub.
2) Clone or download the repo.
3) Using the Terminal, navigate to the location of the repo.
4) Create a config.json file in the root of the 'smartsheet-todo-app' repository which includes your 'Smartsheet Acess Token', Sheet ID, and the Column Ids for the columns. Alternatively, you can also hard-code these values into the todoController.js file where needed
5) Run the 'nodemon' command in the terminal.
6) Open a web brower, then in the URL bar navigate to 'localhost:3000/todo'

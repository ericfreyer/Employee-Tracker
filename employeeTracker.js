const mysql = require("mysql");
const inquirer = require("inquirer")
const cTable = require("console.table");
const password = require("./.env")

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: password,
    database: "employeeTracker_db"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
  });



/*

  []Add seeds sql file

FUNCTIONS TO DO (inquirer):
  []get whole directory to show with console.table?
  [X]startDirectory()
  [X]addDepartment()
  []addRole()
  []addEmployee()
  [X]viewDepartments()
  [X]viewRoles()
  [X]viewEmployees()
  []updateEmployeeRole()
  []removeEmployee
  []viewEverything


*/


//Start prompt

const start = function() {
    inquirer
      .prompt({
        type: "list",
        name: "startDirectory",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all employees",
          "View all roles",
          "Add employee",
          "Add department",
          "Add a role",
          "Update employee role",
          "Remove employee"
        ]
      })
      .then(function(answer) {
        console.log(answer);
        switch (answer.startDirectory) {
            case "Add department":
                addDepartment();
            break;
            case "Add employee":
                addEmployee();
            break;
            case "Add a role":
                addRole();
            break;
            case "View all departments":
                viewDepartments();
            break;
            case "View all employees":
                viewEmployees();
            break;
            case "View all roles":
                viewRoles();
            break;
            case "Update employee role":
                updateEmployeeRole();
            break;
            case "Remove employee":
                removeEmployee();
            break;
        };
      });
};
start()
//addDepartment
function addDepartment (){
    inquirer
    .prompt({
        type: "input",
        name: "department",
        message: "What department would you like to add?"   
    })
    .then(function(answer){
        connection.query("INSERT INTO department SET ?",
        {
            name: answer.department
        }
        ),
        console.table(answer);
        start()
    })

}

//viewEverything


//addRole
function addRole() {
    inquirer
    .prompt([
      {
        type: "input",
        message: "enter employee title",
        name: "title"
      },
      {
        type: "input",
        message: "enter employee salary",
        name: "salary"
      },
      {
        type: "input",
        message: "enter employee department id",
        name: "departmentId"
      }
    ])
    .then (function(response) {
        connection.query("INSERT INTO role SET ?",
        {
            title: response.title, salary: response.salary, departmentId: response.departmentID
        },
        function(err, response) {
            if (err) throw err;
            console.table(response)
        });
        start()
        
    });

};


//addEmployee


//viewDepartments
function viewDepartments() {
    connection.query("SELECT * FROM department", function(err, response) {
    if(err) throw err;
    console.table(response);
    });
    start();
};

//viewRoles
function viewRoles() {
    connection.query("SELECT * FROM role", function(err, response) {
    if(err) throw err;
    console.table(response);
    });
    start();
};

//viewEmployees
function viewEmployees() {
    connection.query("SELECT * FROM employee", function(err, response) {
    if(err) throw err;
    console.table(response);
    });
    start();
};

//updateEmployeeRole


//removeEmployee
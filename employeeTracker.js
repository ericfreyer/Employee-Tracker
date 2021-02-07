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

  [X]startDirectory()
  []addDepartment()
  []addRole()
  []addEmployee()
  []viewDepartments()
  []viewRoles()
  []viewEmployees()
  []updateEmployeeRole()
  []removeEmployee


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
          "Add role",
          "Update employee role",
          "Remove employee"
        ]
      })
      .then(function(answer) {
        console.log(answer);
        switch (answer.startDirectory) {
            case "Add department":
                addDepartment();
            case "Add employee":
                addEmployee();
            case "Add role":
                addRole();
            case "View all departments":
                viewDepartments();
            case "View All employees":
                viewEmployees();
            case "View All roles":
                viewRoles();
            case "Update empoyee role":
                updateEmployeeRole();
            case "Remove employee":
                removeEmployee();
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




//addRole


//addEmployee


//viewDepartments


//viewRoles


//viewEmployees


//updateEmployeeRole
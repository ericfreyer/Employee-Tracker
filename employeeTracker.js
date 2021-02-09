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

  [X]Add seeds sql file

FUNCTIONS TO DO (inquirer):
  [X]startDirectory()
  [X]addDepartment()
  [X]addRole()
  [X]addEmployee()
  [X]viewDepartments()
  [X]viewRoles()
  [X]viewEmployees()
  [X]updateEmployeeRole()
 
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
        };
      });
};
function sign(){

console.log(`
╔═════════════════════════════════════════════════════╗
║                                                     ║
║     _____                 _                         ║
║    | ____|_ __ ___  _ __ | | ___  _   _  ___  ___   ║
║    |  _| | '_ \` _ \\| '_ \\| |/ _ \\| | | |/ _ \\/ _ \\  ║
║    | |___| | | | | | |_) | | (_) | |_| |  __/  __/  ║
║    |_____|_| |_| |_| .__/|_|\\___/ \\__, |\\___|\\___|  ║
║                    |_|            |___/             ║
║                                                     ║
║     __  __                                          ║
║    |  \\/  | __ _ _ __   __ _  __ _  ___ _ __        ║
║    | |\\/| |/ _\` | '_ \\ / _\` |/ _\` |\/ _ \\ '__|       ║
║    | |  | | (_| | | | | (_| | (_| |  __/ |          ║
║    |_|  |_|\\__,_|_| |_|\\__,_|\\__, |\\___|_|          ║
║                              |___/                  ║
║                                                     ║
\╚═════════════════════════════════════════════════════╝
`);
}

sign()
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
        console.table(answer)
        connection.query("SELECT * FROM department", function(err, response) {
            if(err) throw err;
            console.log("-------------------------------------------------------------------------------------")
            console.table(response);
            
            });
        start()
    })
};
//viewAll
// function viewAll(answer){
//     connection.query("")
// }
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
        name: "role_id"
      }
    ])
    .then (function(answer) {
        connection.query("INSERT INTO role SET ?",
        {
            title: answer.title, salary: answer.salary, role_id: answer.role_id
        },
        function(err, answer) {
            if (err) throw err;
            connection.query("SELECT * FROM role", function(err, response) {
                if(err) throw err;
                console.log("-------------------------------------------------------------------------------------")
                console.table(response);
                });
        start()});  
    });
    
};

//addEmployee
function addEmployee() {
    inquirer
    .prompt([
        {
            type: "input",
            message: "What is the employee's first name?",
            name: "first_name"
        },
        {
            type: "input",
            message: "What is the employee's last name?",
            name: "last_name"
        },
    ])
    .then (function(answer) {
        connection.query("INSERT INTO employee SET ?",
        {
            first_name: answer.first_name,
            last_name: answer.last_name
        },
        function(err, answer) {
            if (err) throw err;
            start()});
    });
};

//viewDepartments
function viewDepartments() {
    connection.query("SELECT * FROM department", function(err, response) {
    if(err) throw err;
    console.log("-------------------------------------------------------------------------------------")
    console.table(response);
    });
    start();
};

//viewRoles
function viewRoles() {
    connection.query("SELECT * FROM role", function(err, response) {
    if(err) throw err;
    console.log("-------------------------------------------------------------------------------------")
    console.table(response);
    });
    start();
};

//viewEmployees
function viewEmployees() {
    connection.query("SELECT * FROM employee", function(err, response) {
    if(err) throw err;
    console.log("-------------------------------------------------------------------------------------")
    console.table(response);
    });
    start();
};

//updateEmployeeRole
function updateEmployeeRole() {
    connection.query("SELECT * FROM employee", function(err, response) {
        if(err) throw err;
        console.log("-------------------------------------------------------------------------------------")
        console.table(response);
        })
    connection.query("SELECT * FROM role", function(err, response) {
        if(err) throw err;
        console.log("-------------------------------------------------------------------------------------")
        console.table(response);
        })
    .then
    inquirer
    .prompt([
      {
        type: "input",
        message: "Type in the first name of the employee you would like to update.",
        name: "employee"
      },

      {
        type: "input",
        message: "Type in role id you would employee updated to.",
        name: "role"
      }
    ])
    .then(function(answer) {
      connection.query('UPDATE employee SET role_id=? WHERE first_name= ?',[answer.role, answer.employee],function(err, res) {
        if (err) throw err;
        console.log("-------------------------------------------------------------------------------------")
        console.table(res);
        start();
      });
    });
}


// connection.query("INSERT INTO role SET ?",
//         {
//             title: answer.title, salary: answer.salary, department_id: answer.department_iD
//         },
//         function(err, answer) {
//             if (err) throw err;
//         start()});  
//     });
DROP DATABASE IF EXISTS employeeTracker_db;

CREATE DATABASE employeeTracker_db;

USE employeeTracker_db;

CREATE TABLE department (
	department_id INT auto_increment,
    name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE role (
	id INT auto_increment, 
    title VARCHAR(30),
    salary DECIMAL(10,4),
    role_id INT,
	PRIMARY KEY (id)
);

CREATE TABLE employee (
	id INT auto_increment,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id)
)

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;
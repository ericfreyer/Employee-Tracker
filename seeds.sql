USE employeeTracker_db;

INSERT INTO department (name) VALUES 
("Sales"), 
("Engineering"), 
("Finance"), 
("Legal"),
("Legal");

INSERT INTO role (title, salary, role_id) VALUES 
("sales lead", 100000, 1), 
("salesperson", 80000, 2), 
("lead engineer", 150000, 3), 
("software engineer", 125000, 4), 
("accountant", 125000, 5),
("legal team lead", 250000, 6),
("lawer", 190000, 7);

INSERT INTO employee (first_name, last_name, role_id) VALUES
("John", "Doe", 1),
("Mike", "Chan", 2),
("Ashley", "Rodriguez", 3),
("Eric", "Freyer", 4),
("Joanne", "Freyer", 5),
("Maya", "Stackhouse", 6) 
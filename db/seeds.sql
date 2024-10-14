INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('David', 'Smith', 1, null),
('John', 'Doe', 2, 1),
('Jane', 'Doe', 3, 1),
('Jim', 'Doe', 4, 1),

INSERT INTO role (title, salary, department_id) VALUES
('Engineer', 100000, 1),
('Manager', 100000, 2),
('Accountant', 100000, 3),
('Manager', 100000, 4);


INSERT INTO department (name) VALUES
('Engineering'),
('Finance'),
('Legal'),
('Sales');
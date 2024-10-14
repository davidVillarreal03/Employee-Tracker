INSERT INTO department (name) VALUES 
('Sales'), 
('Engineering'), 
('Finance'), 
('Legal');

-- Insert roles
INSERT INTO role (title, salary, department_id) VALUES 
('Sales Manager', 60000, 1),
('Salesperson', 45000, 1),
('Engineer', 75000, 2),
('Accountant', 55000, 3),
('Lawyer', 50000, 4);

-- Insert employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('David', 'Johnson', 1, NULL),
('Jane', 'Doe', 2, 1),
('John', 'Cena', 3, NULL),
('Sarah', 'Smith', 4, 3),
('Jorge', 'Gomez', 5, NULL);


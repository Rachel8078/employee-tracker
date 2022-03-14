INSERT INTO department (name)
VALUES
  ('Accounting'),
  ('Human Resources'),
  ('Customer Service'),
  ('Marketing'),
  ('IT'),
  ('Sales'),
  ('Finance'),
  ('Operations');

INSERT INTO role (title, salary, department_id)
VALUES
  ('CEO', 1000000, 8),
  ('CFO', 1000000, 7),
  ('Operations Manager', 150000, 8),
  ('Accountant', 100000, 1),
  ('HR', 65000, 2),
  ('Director', 80000, 4),
  ('Software Engineer', 120000, 5),
  ('Sales Rep', 50000, 6),
  ('CS Rep', 30000, 3);
  
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('Ronald', 'Firbank', 1, NULL),
  ('Virginia', 'Woolf', 2, 1),
  ('Piers', 'Gaveston', 3, 1),
  ('Charles', 'LeRoi', 4, 3),
  ('Katherine', 'Mansfield', 5, 3),
  ('Dora', 'Carrington', 6, 3),
  ('Edward', 'Bellamy', 7, 3),
  ('Montague', 'Summers', 8, 3),
  ('Octavia', 'Butler', 9, 3);
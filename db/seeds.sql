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
  ('Operations Manager', 150000, 8),
  ('CEO', 1000000, 8),
  ('CFO', 1000000, 7),
  ('Accountant', 100000, 1),
  ('HR', 65000, 2),
  ('Director', 80000, 4),
  ('Software Engineer', 120000, 5),
  ('Sales Rep', 50000, 6),
  ('CS Rep', 30000, 3);
  
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('Rachel', 'Marriott', 2, NULL),
  ('Ronald', 'Firbank', 1, 1),
  ('Virginia', 'Woolf', 5, 2),
  ('Piers', 'Gaveston', 2, 5),
  ('Charles', 'LeRoi', 6, 1),
  ('Katherine', 'Mansfield', 2, 1),
  ('Dora', 'Carrington', 2, 8),
  ('Edward', 'Bellamy', 7, 1),
  ('Montague', 'Summers', 2, 1),
  ('Octavia', 'Butler', 3, 10),
  ('Unica', 'Zurn', 3, 1);
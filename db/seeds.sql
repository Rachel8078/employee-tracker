INSERT INTO department (name)
VALUES
  ('Accounting'),
  ('Human Resources'),
  ('Customer Service'),
  ('Marketing'),
  ('IT'),
  ('Sales');

INSERT INTO role (title, salary, department_id)
VALUES
  ('Manager', '100000', 1),
  ('Manager', '100000', 2),
  ('Manager', '100000', 3),
  ('Manager', '100000', 4),
  ('Associate', '50000', 1),
  ('Associate', '50000', 2),
  ('Associate', '50000', 3),
  ('Associate', '50000', 4),
  ('Associate', '50000', 5),
  ('Intern', '30000', 5),
  ('Intern', '30000', 1);
  
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('Ronald', 'Firbank', 1, NULL),
  ('Virginia', 'Woolf', 2, 1),
  ('Piers', 'Gaveston', 2, 1),
  ('Charles', 'LeRoi', 2, 1),
  ('Katherine', 'Mansfield', 2, 1),
  ('Dora', 'Carrington', 2, 1),
  ('Edward', 'Bellamy', 2, 1),
  ('Montague', 'Summers', 2, 1),
  ('Octavia', 'Butler', 3, 1),
  ('Unica', 'Zurn', 3, 1);
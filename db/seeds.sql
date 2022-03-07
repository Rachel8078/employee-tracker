INSERT INTO department (name)
VALUES
  ('Accounting'),
  ('Human Resources'),
  ('Customer Service');

INSERT INTO role (title, salary, department_id)
VALUES
  ('Manager', '$100,000', '1'),
  ('Intern', '$30,000', '2'),
  ('Rep', '$50,000', '3');

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('Ronald', 'Firbank', 1, 1),
  ('Virginia', 'Woolf', 1, 1),
  ('Piers', 'Gaveston', 1, 0),
  ('Charles', 'LeRoi', 2, 1),
  ('Katherine', 'Mansfield', 2, 1),
  ('Dora', 'Carrington', 3, 0),
  ('Edward', 'Bellamy', 3, 0),
  ('Montague', 'Summers', 3, 1),
  ('Octavia', 'Butler', 3, 1),
  ('Unica', 'Zurn', 1, 1);
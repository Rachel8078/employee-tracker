const inquirer = require("inquirer");
const table = require("console.table");
const db = require("./db/connection");

const promptAction = () => {
  console.log(`
`);
  return inquirer
    .prompt([
      {
        type: "list",
        name: "options",
        message: "What would you like to do?",
        choices: [
          "View All Departments",
          "View All Roles",
          "View All Employees",
          "Add a Department",
          "Add a Role",
          "Add an Employee",
          "Update an Employee Role",
        ],
      },
    ])
    .then(({ options }) => {
      if (options === "View All Departments") {
        displayDepartments();
      } else if (options === "View All Roles") {
        displayRoles();
      } else if (options === "View All Employees") {
        displayEmployees();
      } else if (options === "Add a Department") {
        addDepartment();
      } else if (options === "Add a Role") {
        addRole();
      } else if (options === "Add an Employee") {
        addEmployee();
      } else if (options === "Update an Employee Role") {
        updateRole();
      }
    });
};

// IF User selects 'View all departments'
const displayDepartments = () => {
  // THEN I am presented with a formatted table showing department names and department ids
  const sql = `SELECT * FROM department`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.table(result);
    promptAction();
  });
};

// View All Roles
const displayRoles = () => {
  // THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
  const sql = `SELECT role.title, role.id AS role_id, department.name AS department, role.salary
                FROM role
                LEFT JOIN department ON role.department_id = department.id`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    // TO DO: get formatted table to show instead of console log
    console.table(result);
    promptAction();
  });
};

// View All Employees
const displayEmployees = () => {
  // THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
  const sql = `SELECT employee.id, employee.first_name, employee.last_name,  
                role.title AS job_title, 
                department.name AS department_name, 
                role.salary,
                CONCAT(manager.first_name, '', manager.last_name) AS manager
                FROM employee
                LEFT JOIN role ON employee.role_id = role.id
                LEFT JOIN department ON role.department_id = department.id
                LEFT JOIN employee manager ON manager.id = employee.manager_id
                `;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.table(result);
    promptAction();
  });
};

// If User chooses to 'Add a Department'
// THEN I am prompted to enter the name of the department and that department is added to the database
const addDepartment = () => {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "department",
        message: "What is the department you would like to add?",
        validate: (deptInput) => {
          if (deptInput) {
            return true;
          } else {
            console.log("Required");
            return false;
          }
        },
      },
    ])
    .then(({ department }) => {
      // add department to the database
      const sql = `INSERT INTO department (name)
                    VALUES (?)`;
      const params = department;
      db.query(sql, params, (err, result) => {
        if (err) {
          console.log(err);
        }
        console.log(department + " has been added to the database.");
        promptAction();
      });
    });
};

// If User chooses to 'Add a Role'
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
const addRole = () => {
  // get list of departments for choices list
  const sql = `SELECT * FROM department`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    const departmentOptions = result.map(({ id, name }) => ({
      value: id,
      name: `${id} ${name}`,
    }));

    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "What role you would like to add?",
          validate: (roleInput) => {
            if (roleInput) {
              return true;
            } else {
              console.log("Required");
              return false;
            }
          },
        },
        {
          type: "input",
          name: "salary",
          message: "What is the salary for that role?",
          validate: (salaryInput) => {
            if (salaryInput) {
              return true;
            } else {
              console.log("Required");
              return false;
            }
          },
        },
        {
          type: "list",
          name: "department_id",
          message: "What department is that role in?",
          choices: departmentOptions,
        },
      ])

      .then(({ title, salary, department_id }) => {
        // add role to the database
        const sql = `INSERT INTO role (title, salary, department_id)
                    VALUES (?, ?, ?)`;
        const params = [title, salary, department_id];
        db.query(sql, params, (err, result) => {
          if (err) {
            console.log(err);
          }
          console.log(title + " has been added to the database.");
          promptAction();
        });
      });
  });
};

// If User chooses to 'Add an Employee'
// THEN I am prompted to enter the employee’s first name, last name, role, and manager
const addEmployee = () => {
  // get list of roles for choices list
  db.query(`SELECT * FROM role`, (err, result) => {
    if (err) throw err;
    const roleOptions = result.map(({ id, title }) => ({
      value: id,
      name: `${id} ${title}`,
    }));

    // get a list of managers for choices list
    db.query(`SELECT * FROM employee WHERE role_id = 1`, (err, result) => {
      if (err) {
        console.log(err);
      }
      const managerOptions = result.map(({ id, first_name, last_name }) => ({
        value: id,
        name: `${id} ${first_name} ${last_name}`,
      }));

      inquirer
        .prompt([
          {
            type: "input",
            name: "first_name",
            message: "What is the employee's first name?",
            validate: (firstNameInput) => {
              if (firstNameInput) {
                return true;
              } else {
                console.log("Required");
                return false;
              }
            },
          },
          {
            type: "input",
            name: "last_name",
            message: "What is the employee's last name?",
            validate: (lastNameInput) => {
              if (lastNameInput) {
                return true;
              } else {
                console.log("Required");
                return false;
              }
            },
          },
          {
            type: "list",
            name: "role_id",
            message: "What is the employee's role?",
            choices: roleOptions,
          },
          {
            type: "list",
            name: "manager_id",
            message: "Who is the employee's manager?",
            choices: managerOptions,
          },
        ])
        .then(({ first_name, last_name, role_id, manager_id }) => {
          // add employee to the database
          const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                    VALUES (?, ?, ?, ?)`;
          const params = [first_name, last_name, role_id, manager_id];

          db.query(sql, params, (err, result) => {
            if (err) {
              console.log(err);
            }
            console.log(
              first_name + " " + last_name + " has been added to the database."
            );
            promptAction();
          });
        });
    });
  });
};

// If User chooses to 'Update an Employee Role'
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database
const updateRole = () => {
  // get list of employees for choices list
  db.query(`SELECT * FROM employee`, (err, result) => {
    if (err) throw err;
    const employeeOptions = result.map(({ id, first_name, last_name }) => ({
      value: id,
      name: `${id} ${first_name} ${last_name}`,
    }));

    // get a list of roles for choices list
    db.query(`SELECT * FROM role`, (err, result) => {
      if (err) {
        console.log(err);
      }
      const roleOptions = result.map(({ id, title }) => ({
        value: id,
        name: `${id} ${title}`,
      }));

      inquirer
        .prompt([
          {
            type: "list",
            name: "employee",
            message: "What is the employee's name?",
            choices: employeeOptions,
          },
          {
            type: "list",
            name: "role_id",
            message: "What is the employee's updated role?",
            choices: roleOptions,
          },
        ])
        .then(({ employee, role_id }) => {
          // update employee in the database
          const sql = `UPDATE employee 
                    SET role_id = ?
                    WHERE id = ?
                    `;
          const params = [role_id, employee];

          db.query(sql, params, (err, result) => {
            if (err) {
              console.log(err);
            }
            console.log(
              employee +
                "'s job title has been changed to " +
                role_id +
                " in the database."
            );
            promptAction();
          });
        });
    });
  });
};

// Start app with initial prompt
promptAction();

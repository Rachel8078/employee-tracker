const inquirer = require('inquirer');
const table = require('console.table');
const db = require('./db/connection');

const promptAction = () => {
    console.log(`
`)
    return inquirer.prompt([
        {
            type: 'list',
            name: 'options',
            message: "What would you like to do?",
            choices: ["View All Departments", "View All Roles", "View All Employees", "Add a Department", "Add a Role", "Add an Employee", "Update an Employee Role"],
        }
    ])
        .then(({ options }) => {
            if (options === 'View All Departments') {
                displayDepartments();
            } else if (options === 'View All Roles') {
               displayRoles();
            } else if (options === 'View All Employees') {
                displayEmployees();
            } else if (options === 'Add a Department') {
                addDepartment();
            } else if (options === 'Add a Role') {
                addRole();
            } else if (options === 'Add an Employee') {
                addEmployee();
            } else if (options === 'Update an Employee Role') {
                updateRole();
            }
        });
}

// IF User selects 'View all departments'
const displayDepartments = () => {
    // THEN I am presented with a formatted table showing department names and department ids
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, result) => {
        if(err) throw err;
        // TO DO: get formatted table to show instead of console log
        // console.log(result);
        console.table(result);
        promptAction();
        })
};

// View All Roles
const displayRoles = () => {
    // THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
    const sql = `SELECT role.title, role.id AS role_id, department.name AS department, role.salary
                FROM role
                LEFT JOIN department ON role.department_id = department.id`;
    db.query(sql, (err, result) => {
        if(err) throw err;
        // TO DO: get formatted table to show instead of console log
        console.table(result);
        promptAction();
        })
};

// View All Employees
const displayEmployees = () => {
    // THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
    const sql = `SELECT *
                FROM employee
                LEFT JOIN role ON employee.role_id = role.title
                `;
    db.query(sql, (err, result) => {
        if(err) throw err;
        // TO DO: get formatted table to show instead of console log
        console.table(result);
        promptAction();
        })
};

// If User chooses to 'Add a Department'
// THEN I am prompted to enter the name of the department and that department is added to the database
const addDepartment = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: "What is the department you would like to add?",
            validate: deptInput => {
                if (deptInput) {
                    return true;
                } else {
                    console.log("Required");
                    return false;
                }
            } 
        }
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
        })
    })
};

// If User chooses to 'Add a Role'
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
const addRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: "What role you would like to add?",
            validate: roleInput => {
                if (roleInput) {
                    return true;
                } else {
                    console.log("Required");
                    return false;
                }
            } 
        },
        {
            type: 'input',
            name: 'salary',
            message: "What is the salary for that role?",
            validate: salaryInput => {
                if (salaryInput) {
                    return true;
                } else {
                    console.log("Required");
                    return false;
                }
            } 
        },
        {
            type: 'input',
            name: 'department',
            message: "What department is that role in?",
            validate: deptInput => {
                if (deptInput) {
                    return true;
                } else {
                    console.log("Required");
                    return false;
                }
            } 
        },
    ])
    .then(({ title, salary, department }) => {
        // add role to the database
        const sql = `INSERT INTO role (title, salary, department)
                    VALUES (?, ?, ?)`;
        // TO DO: figure out how to link department with department_id (join tables first?)
        // const department_id = /
        const params = [title, salary, department_id];
        db.query(sql, params, (err, result) => {
            if (err) {
                console.log(err);
            }
            console.log(result);
            console.log(title + " has been added to the database.");
        })
    })
    // TO DO: format this better so prompt user runs after the console log
    .then(promptAction);
};

// If User chooses to 'Add an Employee'
// THEN I am prompted to enter the employee’s first name, last name, role, and manager
const addEmployee = () => {
   
    db.query(`SELECT * FROM role`, (err, result) => {
        if (err) {
            console.log(err);
        }
        // let roleChoices = result;
        console.log(result);
    })

    db.query(`SELECT * FROM employee WHERE role_id = 1`, (err, result) => {
        if (err) {
            console.log(err);
        }
        // let managerChoices = result;
        console.log(result);
    })
    
    

    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: "What is the employee's first name?",
            validate: firstNameInput => {
                if (firstNameInput) {
                    return true;
                } else {
                    console.log("Required");
                    return false;
                }
            } 
        },
        {
            type: 'input',
            name: 'last_name',
            message: "What is the employee's last name?",
            validate: lastNameInput => {
                if (lastNameInput) {
                    return true;
                } else {
                    console.log("Required");
                    return false;
                }
            } 
        },
        {
            type: 'input',
            name: 'role_id',
            message: "What is the employee's role?",
            choices: roleChoices,
        },
        {
            type: 'input',
            name: 'manager_id',
            message: "Who is the employee's manager?",
            choices: managerChoices
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
            console.log(result);
            console.log(first_name + " " + last_name + " has been added to the database.");
        })
    })
    // TO DO: format this better so prompt user runs after the console log
    .then(promptAction);
}

// If User chooses to 'Update an Employee Role'
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database
const updateRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "What is the employee's name?",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Required");
                    return false;
                }
            } 
        },
        {
            type: 'input',
            name: 'role',
            message: "What is the employee's updated role?",
            validate: roleInput => {
                if (roleInput) {
                    return true;
                } else {
                    console.log("Required");
                    return false;
                }
            } 
        }
    ])
    .then((employee) => {
        // THEN I am prompted to select an employee to update and their new role and this information is updated in the database
        // const sql = `UPDATE role
        //             SET role_id = ?
        //             WHERE id = ?`;
        // const role = 1;
        // const id = 1;
        // db.query(sql, role, id, (err, result) => {
        //     if(err) throw err;
        //     // TO DO: get formatted table to show instead of console log
        //     console.table(result);
        //     promptAction();
        //     })
    })
};

// Start app with initial prompt
promptAction()
const inquirer = require('inquirer');

const promptUser = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'options',
            message: "What would you like to do?",
            choices: ["View All Departments", "View All Roles", "View All Employees", "Add a Department", "Add a Role", "Add an Employee", "Update an Employee Role"],
        }
    ])
        .then(({ options }) => {
            if (options === 'View All Departments') {
                // THEN I am presented with a formatted table showing department names and department ids
                displayDepartments();
            } else if (options === 'View All Roles') {
                // THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
               displayRoles();
            } else if (options === 'View All Employees') {
                // THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
                displayEmployees();
            } else if (options === 'Add a Department') {
                // THEN I am prompted to enter the name of the department and that department is added to the database
                promptDepartment();
            } else if (options === 'Add a Role') {
                // THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
                promptRole();
            } else if (options === 'Add an Employee') {
                // THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
                promptEmployee();
            } else if (options === 'Update an Employee Role') {
                // THEN I am prompted to select an employee to update and their new role and this information is updated in the database
                promptUpdateRole();
            }
        });
}

// View all departments
const displayDepartments = () => {
    console.log("view all departments here")
    // THEN I am presented with a formatted table showing department names and department ids
};

// View All Roles
const displayRoles = () => {
    console.log("view all roles here")
    // THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
};

// View All Employees
const displayEmployees = () => {
    console.log("view all employees here")
    // THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
};

// If User chooses to 'Add a Department'
// THEN I am prompted to enter the name of the department and that department is added to the database
const promptDepartment = () => {
    inquirer.prompt([
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
    .then((department) => {
        // add department to the database

    })
};

// If User chooses to 'Add a Role'
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
const promptRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'role',
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
    .then((role) => {
        // add role name, salary, and department for the role to the database
    })
};

// If User chooses to 'Add an Employee'
// THEN I am prompted to enter the employee’s first name, last name, role, and manager
const promptEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
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
            name: 'lastName',
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
            name: 'role',
            message: "What is the employee's role?",
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
            name: 'manager',
            message: "Who is the employee's manager?",
            validate: managerInput => {
                if (managerInput) {
                    return true;
                } else {
                    console.log("Required");
                    return false;
                }
            } 
        },
    ])
    .then((employee) => {
        // THEN that employee is added to the database
    })
}

// If User chooses to 'Update an Employee Role'
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database
const promptUpdateRole = () => {
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
        }
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
    })
};

// Start app with initial prompt
promptUser();
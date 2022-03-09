// class Department {
//     // constructor (id, name) {
//     //     this.id = id;
//     //     this.name = name;
//     // }

//     // When action = "View All Departments"
//     displayDepartments() {
//         console.log('into displayDepartments function');
//     // THEN I am presented with a formatted table showing department names and department ids
//     const sql = `SELECT * FROM department`;
//     db.query(sql, (err, result) => {
//         if(err) throw err;
//         // TO DO: get formatted table to show instead of console log
//         console.table(result);
//         // promptAction();
//         })
//     }
// }

// module.exports = Department;
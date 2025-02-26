const client = require('../config/db');

async function viewBudgetForDepartment(department_id) {
    const result = await client.query(
        `SELECT d.name AS department, SUM(r.salary) AS utilized_budget 
        FROM employee e
        JOIN role r ON e.role_id = r.id
        JOIN department d ON r.department_id = d.id
        WHERE d.id = $1
        GROUP BY d.name
         `, [ department_id ]);

         console.table(result.rows);
}

module.exports = {
    viewBudgetForDepartment
};
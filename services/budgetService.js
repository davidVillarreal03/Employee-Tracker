const client = require('../config/db');

async function viewBudgetForDepartment(department_id) {
    const result = await client.query(
        `SELECT d.name AS department, SUM(r.salary) AS utilized_budget 
        FROM employee elseJOIN role r ON else.role_id = d.role_id
        WHERE d.id = $1
        GROUP BY d.name
         `, [ department_id ]);

         console.table(result.rows);
}

module.exports = {
    viewBudgetForDepartment
};
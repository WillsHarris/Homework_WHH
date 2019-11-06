SELECT  employees.emp_no, employees.last_name, employees.first_name, employees.gender, salaries.salary
FROM employees 
LEFT JOIN salaries 
ON employees.emp_no = salaries.emp_no
ORDER BY employees.emp_no;


SELECT  employees.hire_date, employees.last_name, employees.first_name
FROM employees 
WHERE hire_date BETWEEN '1986-01-01' AND '1986-12-31'
ORDER BY employees.hire_date;


SELECT  dept_manager.dept_no, 
departments.dept_name, 
dept_manager.emp_no, 
employees.last_name, 
employees.first_name, 
dept_manager.from_date, 
dept_manager.to_date
FROM dept_manager 
LEFT JOIN departments 
ON dept_manager.dept_no = departments.dept_no
LEFT JOIN employees 
ON dept_manager.emp_no = employees.emp_no
ORDER BY dept_manager.dept_no;



SELECT  employees.emp_no, employees.last_name, employees.first_name, departments.dept_name
FROM employees 
LEFT JOIN dept_emp 
ON employees.emp_no = dept_emp.emp_no
LEFT JOIN departments 
ON dept_emp.dept_no = departments.dept_no


SELECT  employees.last_name, employees.first_name
FROM employees 
WHERE first_name = 'Hercules'
AND last_name LIKE 'B%';


SELECT  employees.emp_no, employees.last_name, employees.first_name, departments.dept_name
FROM employees 
LEFT JOIN dept_emp 
ON employees.emp_no = dept_emp.emp_no
LEFT JOIN departments 
ON dept_emp.dept_no = departments.dept_no
WHERE dept_name = 'Sales'


SELECT  employees.emp_no, employees.last_name, employees.first_name, departments.dept_name
FROM employees 
LEFT JOIN dept_emp 
ON employees.emp_no = dept_emp.emp_no
LEFT JOIN departments 
ON dept_emp.dept_no = departments.dept_no
WHERE dept_name = 'Sales' OR dept_name = 'Development';



SELECT last_name, COUNT(last_name)
FROM employees
GROUP BY last_name
ORDER BY COUNT(last_name) DESC;




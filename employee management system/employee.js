
class EmployeeManagementSystem {
    constructor() {
      this.employees = [];
    }
  
    addEmployee(employee) {
      this.employees.push(employee);
      this.displayMessage(`Employee with ID: ${employee.id} added successfully.`);
    }
  
    removeEmployee(id) {
      const index = this.employees.findIndex(emp => emp.id === id);
      if (index !== -1) {
        this.employees.splice(index, 1);
        this.displayMessage(`Employee with ID: ${id} removed successfully.`);
      } else {
        this.displayMessage(`Employee with ID: ${id} not found.`);
      }
    }
  

    searchEmployee(id) {
        const employee = this.employees.find(emp => emp.id === id);
        if (employee) {
          const experience = this.calculateExperience(employee.doj);
          this.displayMessage(`
            <strong>Employee Details:</strong><br>
            Name: ${employee.name}<br>
            ID: ${employee.id}<br>
            Skill: ${employee.skill}<br>
            Department: ${employee.department}<br>
            Experience: ${experience} years
          `);
        } else {
          this.displayMessage(`Employee with ID: ${id} not found.`);
        }
      }
    
      calculateExperience(doj) {
        const joiningDate = new Date(doj);
        const today = new Date();
        return today.getFullYear() - joiningDate.getFullYear();
      }
    
      displayMessage(message) {
        document.getElementById("output").innerHTML = message;
      }
    }
    
    const system = new EmployeeManagementSystem();
    
    function addEmployee() {
      const name = document.getElementById("name").value;
      const id = document.getElementById("id").value;
      const skill = document.getElementById("skill").value;
      const doj = document.getElementById("doj").value;
      const department = document.getElementById("department").value;
    
      if (name && id && skill && doj && department) {
        system.addEmployee({ name, id, skill, doj, department });
        clearFields(["name", "id", "skill", "doj", "department"]);
      } else {
        system.displayMessage("Please fill all fields to add an employee.");
      }
    }
    
    function removeEmployee() {
      const id = document.getElementById("remove-id").value;
      if (id) {
        system.removeEmployee(id);
        document.getElementById("remove-id").value = "";
      } else {
        system.displayMessage("Please enter the Employee ID to remove.");
      }
    }
    
    function searchEmployee() {
      const id = document.getElementById("search-id").value;
      if (id) {
        system.searchEmployee(id);
        document.getElementById("search-id").value = "";
      } else {
        system.displayMessage("Please enter the Employee ID to search.");
      }
    }
    
    function clearFields(fields) {
      fields.forEach(field => (document.getElementById(field).value = ""));
    }

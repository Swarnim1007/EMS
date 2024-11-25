package net.javaguides.ems.mapper;

import net.javaguides.ems.dto.EmployeeDto;
import net.javaguides.ems.entity.Employee;
import net.javaguides.ems.entity.Department;

public class EmployeeMapper {
    public static EmployeeDto mapToEmployeeDto(Employee employee) {
        if (employee == null) {
            return null;
        }
        return new EmployeeDto(
                employee.getId(),
                employee.getFirstName(),
                employee.getLastName(),
                employee.getEmail(),
                employee.getDepartment() != null ? employee.getDepartment().getId() : null,

                // New fields added
                employee.getGender(),
                employee.getPhoneNumber(),
                employee.getBirthdate(),
                employee.getCity(),
                employee.getState(),
                employee.getPincode(),
                employee.getEmergencyContact(),
                employee.getEmploymentType(),
                employee.getStartDate()
        );
    }

    public static Employee mapToEmployee(EmployeeDto employeeDto) {
        if (employeeDto == null) {
            return null;
        }
        Employee employee = new Employee();
        employee.setId(employeeDto.getId());
        employee.setFirstName(employeeDto.getFirstName());
        employee.setLastName(employeeDto.getLastName());
        employee.setEmail(employeeDto.getEmail());

        // Set the department if the ID is present
        if (employeeDto.getDepartmentId() != null) {
            Department department = new Department();
            department.setId(employeeDto.getDepartmentId());
            employee.setDepartment(department);
        }

        // New fields added
        employee.setGender(employeeDto.getGender());
        employee.setPhoneNumber(employeeDto.getPhoneNumber());
        employee.setBirthdate(employeeDto.getBirthdate());
        employee.setCity(employeeDto.getCity());
        employee.setState(employeeDto.getState());
        employee.setPincode(employeeDto.getPincode());
        employee.setEmergencyContact(employeeDto.getEmergencyContact());
        employee.setEmploymentType(employeeDto.getEmploymentType());
        employee.setStartDate(employeeDto.getStartDate());

        return employee;
    }
}

package net.javaguides.ems.service;

import net.javaguides.ems.dto.EmployeeDto;

import java.util.List;

public interface EmployeeService {
    EmployeeDto createEmployee(EmployeeDto employeeDto);

    EmployeeDto getEmployeeById(Long employeeid);

    List<EmployeeDto>    getAllEmployee();

    EmployeeDto updateEmployee(Long EmployeeId , EmployeeDto updatedEmployee);
    void deleteEmployee(Long EmployeeId);
}

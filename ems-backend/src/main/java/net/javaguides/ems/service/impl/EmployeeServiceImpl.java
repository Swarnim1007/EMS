package net.javaguides.ems.service.impl;
import lombok.AllArgsConstructor;
import net.javaguides.ems.dto.EmployeeDto;
import net.javaguides.ems.entity.Department;
import net.javaguides.ems.entity.Employee;
import net.javaguides.ems.exception.ResourceNotFoundException;
import net.javaguides.ems.mapper.EmployeeMapper;
import net.javaguides.ems.repository.DepartmentRepository;
import net.javaguides.ems.repository.EmployeeRepository;
import net.javaguides.ems.service.EmployeeService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
    public class  EmployeeServiceImpl implements EmployeeService {
    private EmployeeRepository employeeRepository;
    private DepartmentRepository departmentRepository;

    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {
        Employee employee = EmployeeMapper.mapToEmployee(employeeDto);
        Department department = departmentRepository.findById(employeeDto.getDepartmentId()).orElseThrow(() ->
                new ResourceNotFoundException("Department not found "+employeeDto.getDepartmentId()));
        employee.setDepartment(department);
        Employee savedEmployee = employeeRepository.save(employee);
        return EmployeeMapper.mapToEmployeeDto(savedEmployee);
    }

    @Override
    public EmployeeDto getEmployeeById(Long employeeid) {
    Employee employee = employeeRepository.findById(employeeid).orElseThrow(()-> new ResourceNotFoundException("Employee with given id not found! "+employeeid));
        return EmployeeMapper.mapToEmployeeDto(employee);
    }

    @Override
    public List<EmployeeDto> getAllEmployee() {
        List<Employee> employees =employeeRepository.findAll();
        return employees.stream().map((employee) -> EmployeeMapper.mapToEmployeeDto(employee))
                .collect(Collectors.toList());

    }


    @Override
    public EmployeeDto updateEmployee(Long EmployeeId, EmployeeDto updatedEmployee) {
       Employee employee =  employeeRepository.findById(EmployeeId).orElseThrow(
                () -> new ResourceNotFoundException("Employee with given id not found! "+EmployeeId)
        );
       employee.setFirstName(updatedEmployee.getFirstName());
       employee.setLastName(updatedEmployee.getLastName());
       employee.setEmail(updatedEmployee.getEmail());

        Department department = departmentRepository.findById(updatedEmployee.getDepartmentId()).orElseThrow(() ->
                new ResourceNotFoundException("Department not found "+updatedEmployee .getDepartmentId()));
        employee.setDepartment(department);
       Employee savedEmployee = employeeRepository.save(employee);
        return EmployeeMapper.mapToEmployeeDto(savedEmployee);
    }

    @Override
    public void deleteEmployee(Long EmployeeId)
    {
        Employee employee = employeeRepository.findById(EmployeeId).orElseThrow(
                () -> new ResourceNotFoundException("Employee with given id not found! "+EmployeeId)
        );
        employeeRepository.deleteById(EmployeeId);

    }
}

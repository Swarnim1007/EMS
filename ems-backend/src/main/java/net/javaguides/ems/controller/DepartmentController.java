package net.javaguides.ems.controller;

import lombok.AllArgsConstructor;
import net.javaguides.ems.dto.DepartmentDto;
import net.javaguides.ems.service.DepartmentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/departments")
public class DepartmentController {
    private DepartmentService departmentService;


    //Build Add Department REST api
    @PostMapping
    public ResponseEntity<DepartmentDto>  ctreateDepartment(@RequestBody  DepartmentDto departmentDto){
        DepartmentDto department = departmentService.createDepartment(departmentDto);
        return new ResponseEntity<>(department , HttpStatus.CREATED);
    }
    //Build  GET department REST api
    @GetMapping("{id}")
    public ResponseEntity<DepartmentDto> getDepartmentById(@PathVariable("id") Long departmentId){
        DepartmentDto departmentDto = departmentService.getDepartmentById(departmentId);
        return ResponseEntity.ok(departmentDto);
    }

    //Build GetAll Departments REST api
    @GetMapping
    public ResponseEntity<List<DepartmentDto>> getAllDepartments(){
     List<DepartmentDto> departments =  departmentService.getAllDepartments();
     return ResponseEntity.ok(departments);
    }

    //Build UPDATE department REST API
    @PutMapping("{id}")
    public ResponseEntity<DepartmentDto> updateDepartment(@PathVariable("id") Long departmentId ,@RequestBody DepartmentDto updateDepartment){
        DepartmentDto departmentDto = departmentService.updateDepartment(departmentId, updateDepartment);
        return ResponseEntity.ok(departmentDto);
    }

    //Build Delete Department REST Api
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteDepartment(@PathVariable("id") Long departmentId)
    {
        departmentService.deleteDepartment(departmentId);
        return ResponseEntity.ok("Department deleted successfully");
    }

}

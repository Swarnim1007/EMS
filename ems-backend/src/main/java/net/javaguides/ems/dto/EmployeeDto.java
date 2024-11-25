package net.javaguides.ems.dto;

import lombok.*;
import java.time.LocalDate;
import java.time.YearMonth;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private Long departmentId;

    // New fields added
    private String gender;
    private String phoneNumber;
    private LocalDate birthdate;
    private String city;
    private String state;
    private String pincode;
    private String emergencyContact;
    private String employmentType;
    private YearMonth startDate; // Using YearMonth to store only month and year
}

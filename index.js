import {db,query} from './db.js';


// async function getUsers() {
//     try {
//         const users = await query('SELECT * FROM user_table');
//         console.log(users);
//         return users;
//     } catch (err) {
//         console.error("Error fetching users:", err);
//     }
// }

// getUsers();

async function getUsers() {
    try {
        const users = await query('SELECT * FROM User_Table');
        console.log(users);
        return users;
    } catch (err) {
        console.error("Error fetching users:", err);
    }
}

async function createUser(userId, applnNo, name, email, password, role, departmentId) {
    try {
        const result = await query(`INSERT INTO User_Table (User_Id, Appln_No, Name, Email, Password, Role, Department_Id) VALUES ($1, $2, $3, $4, $5, $6, $7)`, 
        [userId, applnNo, name, email, password, role, departmentId]);
        return result;
    } catch (err) {
        console.error("Error creating user:", err);
    }
}

async function updateUser(userId, email) {
    try {
        const result = await query(`UPDATE User_Table SET Email = $1 WHERE User_Id = $2`, [email, userId]);
        return result;
    } catch (err) {
        console.error("Error updating user:", err);
    }
}

async function deleteUser(userId) {
    try {
        const result = await query(`DELETE FROM User_Table WHERE User_Id = $1`, [userId]);
        return result;
    } catch (err) {
        console.error("Error deleting user:", err);
    }
}

// getUsers();



// Dynamic code functions

async function getRecords(tableName) {
    try {
        const records = await query(`SELECT * FROM ${tableName}`);
        console.log(records);
        return records;
    } catch (err) {
        console.error(`Error fetching records from ${tableName}:`, err);
    }
}

//Fetching Data with Dynamic Conditions
async function getRecords_D(tableName, conditions = {}) {
    try {
        const keys = Object.keys(conditions);
        const values = Object.values(conditions);
        let queryText = `SELECT * FROM ${tableName}`;

        if (keys.length > 0) {
            queryText += " WHERE " + keys.map((key, i) => `${key} = $${i + 1}`).join(' AND ');
        }

        const result = await query(queryText, values);
        return result;
    } catch (err) {
        console.error(`Error fetching records from ${tableName}:`, err);
    }
}

// Example Usage
// getRecords_D('User_Table', { Role: 'Student', Is_Active: true })
//     .then(res => console.log('Fetched Records:', res))
//     .catch(err => console.error('Fetch Error:', err));

async function updateRecord_D(tableName, column, value, conditionColumn, conditionValue) {
    try {
        const queryText = `UPDATE ${tableName} SET ${column} = $1 WHERE ${conditionColumn} = $2`;
        const result = await query(queryText, [value, conditionValue]);
        return result;
    } catch (err) {
        console.error(`Error updating record in ${tableName}:`, err);
    }
}

// Example Usage
// updateRecord_D('User_Table', 'Name', 'John Doe', 'User_Id', 'U12345')
//     .then(res => console.log('Update Success:', res))
//     .catch(err => console.error('Update Error:', err));

async function deleteRecord_D(tableName, conditionColumn, conditionValue) {
    try {
        const queryText = `DELETE FROM ${tableName} WHERE ${conditionColumn} = $1`;
        const result = await query(queryText, [conditionValue]);
        return result;
    } catch (err) {
        console.error(`Error deleting record from ${tableName}:`, err);
    }
}

// Example Usage
// deleteRecord_D('User_Table', 'User_Id', 'U56789')
//     .then(res => console.log('Delete Success:', res))
//     .catch(err => console.error('Delete Error:', err));


// getRecords('User_Table');


//Dynamic JOIN Queries Handling
async function joinTables_D(table1, table2, joinType, column1, column2, columnsToSelect = '*') {
    try {
        const queryText = `
            SELECT ${columnsToSelect} FROM ${table1}
            ${joinType} JOIN ${table2}
            ON ${table1}.${column1} = ${table2}.${column2};
        `;
        const result = await query(queryText);
        return result;
    } catch (err) {
        console.error(`Error executing JOIN (${joinType}) between ${table1} and ${table2}:`, err);
    }
}
//Calling the Function for Different JOIN Types
// async function testJoins() {
//     console.log("INNER JOIN Result:", await joinTables("User_Table", "Department_Table", "INNER", "Department_Id", "Department_Id"));
//     console.log("LEFT JOIN Result:", await joinTables("User_Table", "Department_Table", "LEFT", "Department_Id", "Department_Id"));
//     console.log("RIGHT JOIN Result:", await joinTables("User_Table", "Department_Table", "RIGHT", "Department_Id", "Department_Id"));
//     console.log("FULL JOIN Result:", await joinTables("User_Table", "Department_Table", "FULL", "Department_Id", "Department_Id"));
// }

// testJoins();









// count function
async function getCount(tableName, columns = ['*'], conditions = '') {
    try {
        const columnStr = columns.length === 1 ? columns[0] : `(${columns.join(', ')})`;
        const queryText = `SELECT COUNT(${columnStr}) AS total FROM ${tableName} ${conditions}`;
        const result = await query(queryText);
        
        console.log(`Total count: ${result[0].total}`);
        return result[0].total;
    } catch (err) {
        console.error(`Error counting records from ${tableName}:`, err);
    }
}

// Example Usage
// getCount('User_Table'); // Counts all users

// getCount('User_Table', ['User_id']); // Counts total orders
// getCount('User_Table', ['name'], "WHERE Is_Active = True"); // Counts completed transactions





// Insertion dynamic
async function insertRecord_D(tableName, columns, values) {
    try {
        const placeholders = values.map((_, i) => `$${i + 1}`).join(', ');
        const queryText = `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES (${placeholders})`;
        const result = await query(queryText, values);
        console.log(`Record inserted into ${tableName}`);
        return result;
    } catch (err) {
        console.error(`Error inserting record into ${tableName}:`, err);
    }
}
// Example Usage
// insertRecord_D('User_Table', ['User_Id', 'Name', 'Email', 'Password', 'Role'], ['U56789', 'Alice', 'alice@example.com', 'hashedpassword', 'Student'])
//     .then(res => console.log('Insert Success:', res))
//     .catch(err => console.error('Insert Error:', err));

//Insert into Specific Tables

//Application_Table
async function insertApplication(data) {
    return await insertRecord_D("Application_Table", [
        "Appln_No", "Student_Name", "Student_Photo", "Date_Of_Birth", "EmailID_Student",
        "Sex", "Mother_Toungue", "Religion", "Communication_Addr", "Perm_Addr",
        "Father_Name", "Father_Occupation", "Father_Photo", "Father_An_Income", "Father_Phone_number",
        "Father_Email_Addr", "Mother_Name", "Mother_Occupation", "Mother_Photo", "Mother_An_Income",
        "Mother_Phone_number", "Mother_Email_Addr", "Emergency_Contact_No", "Spl_Cat_Status",
        "Scat_Type_Admission_Quota", "Admission_Order_No", "Entrance_Rank", "Alloted_Branch",
        "Qualifing_Exam_Passed_Detail", "Blood_Group", "Government_Issued_File"
    ], Object.values(data));
}

//User_Table
async function insertUser(data) {
    return await insertRecord_D("User_Table", [
        "User_Id", "Appln_No", "Name", "Email", "Password",
        "Role", "Department_Id", "Profile_Picture", "Created_At", "Is_Active", "Last_Login"
    ], Object.values(data));
}

//Student_Table
async function insertStudent(data) {
    return await insertRecord_D("Student_Table", [
        "USN", "Name", "Present_Year", "Present_Semester", "SGPA", "Current_CGPA"
    ], Object.values(data));
}

//Faculty_Table
async function insertFaculty(data) {
    return await insertRecord_D("Faculty_Table", [
        "Faculty_Unique_Id", "Name", "Department_Id", "Joining_Year", "Year_Of_Experience",
        "Graduation_Details", "faculty_Designation", "CV"
    ], Object.values(data));
}

//Department_Table
async function insertDepartment(data) {
    return await insertRecord_D("Department_Table", [
        "Department_Id", "Department_Name", "HOD", "Contact_Email",
        "Total_No_Of_Faculty", "Total_No_Of_Students", "Department_Rank", "Year_Of_Estl"
    ], Object.values(data));
}

//Course_Table
async function insertCourse(data) {
    return await insertRecord_D("Course_Table", [
        "Course_Id", "Subject_Code", "Course_Name", "Semester", "Department_Id",
        "Faculty_Unique_Id", "Max_Reduced_Internal_Marks", "Max_Reduced_Assignment_Marks",
        "Max_CEE_Marks", "Max_SEE_Marks", "Credits"
    ], Object.values(data));
}

//Attendance_Table
async function insertAttendance(data) {
    return await insertRecord_D("Attendence_Table", [
        "Attendence_Id", "USN", "Course_Id", "Date", "Status", "Remarks"
    ], Object.values(data));
}

//Semester_Marks_Table
async function insertSemesterMarks(data) {
    return await insertRecord_D("Semester_Marks_Table", [
        "Mark_Id", "USN", "Course_Id", "Internal_1", "Internal_2", "Internal_3",
        "Assignment_1", "Assignment_2", "Quiz_Seminar", "CEE_Final_Marks", "Certificate_Uri",
        "SEE_Final_Marks", "Reval_Marks_Init", "Semester"
    ], Object.values(data));
}

//Assignment_Table
async function insertAssignment(data) {
    return await insertRecord_D("Assignment_Table", [
        "Assignment_Id", "Course_Id", "USN", "Assignment_Title", "Description",
        "Assigned_Date", "Submission_Date", "Status", "Max_Marks"
    ], Object.values(data));
}

//Faculty_Interview Table
async function insertFacultyInterview(data) {
    return await insertRecord_D("Faculty_Interview", [
        "Interview_Appln_No", "Faculty_Unique_Id", "Candidate_Name", "Phone_NO",
        "EmailID", "Emergency_Cont_No", "Graduation_Details", "Resume_CV",
        "Sex", "Department_Id", "Position_Applied", "Selected"
    ], Object.values(data));
}

// Insert Data into All Tables at Once
async function insertAllData(data) {
    try {
        await insertApplication(data.application);
        await insertUser(data.user);
        await insertStudent(data.student);
        await insertFaculty(data.faculty);
        await insertDepartment(data.department);
        await insertCourse(data.course);
        await insertAttendance(data.attendance);
        await insertSemesterMarks(data.semesterMarks);
        await insertAssignment(data.assignment);
        await insertFacultyInterview(data.facultyInterview);

        console.log("All records inserted successfully!");
    } catch (err) {
        console.error("Error inserting all records:", err);
    }
}

 //example
// const sampleData = {
//     application: {
//         Appln_No: "APPL001",
//         Student_Name: "John Doe",
//         Student_Photo: null,
//         Date_Of_Birth: "2000-05-15",
//         EmailID_Student: "john@example.com",
//         Sex: "Male",
//         Mother_Toungue: "English",
//         Religion: "Christianity",
//         Communication_Addr: "123 Main St",
//         Perm_Addr: "456 Elm St",
//         Father_Name: "Robert Doe",
//         Father_Occupation: "Engineer",
//         Father_Photo: null,
//         Father_An_Income: 50000,
//         Father_Phone_number: "9876543210",
//         Father_Email_Addr: "robert@example.com",
//         Mother_Name: "Jane Doe",
//         Mother_Occupation: "Doctor",
//         Mother_Photo: null,
//         Mother_An_Income: 60000,
//         Mother_Phone_number: "9876543211",
//         Mother_Email_Addr: "jane@example.com",
//         Emergency_Contact_No: "9876543222",
//         Spl_Cat_Status: "General",
//         Scat_Type_Admission_Quota: "Government",
//         Admission_Order_No: "AD001",
//         Entrance_Rank: 123,
//         Alloted_Branch: "CSE",
//         Qualifing_Exam_Passed_Detail: "12th Grade",
//         Blood_Group: "O+",
//         Government_Issued_File: null
//     },
//     user: {
//         User_Id: "USER001",
//         Appln_No: "APPL001",
//         Name: "John Doe",
//         Email: "john@example.com",
//         Password: "hashed_password",
//         Role: "Student",
//         Department_Id: "CSE",
//         Profile_Picture: null,
//         Created_At: new Date(),
//         Is_Active: true,
//         Last_Login: new Date()
//     },
//     student: {
//         USN: "USN001",
//         Name: "John Doe",
//         Present_Year: 2,
//         Present_Semester: 4,
//         SGPA: 8.5,
//         Current_CGPA: 8.3
//     },
//     // Add remaining data for faculty, department, etc.
// };

// insertAllData(sampleData);







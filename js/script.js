//declare variables
var addBtn = document.getElementById('addBtn');
var empName = document.getElementById('emp-name');
var empAge =document.getElementById('emp-age');
var empSalary =document.getElementById('emp-salary');
var empPhone =document.getElementById('emp-phone');
var inputs = document.querySelectorAll(' .form-group .form-control');
var msgName = document.getElementById('msg-name');
var msgAge = document.getElementById('msg-age');
var msgSalary = document.getElementById('msg-salary');
var msgPhone = document.getElementById('msg-phone');
var employees =[];

//Check if local storage is empty or not
if(localStorage.getItem('employeeList')==null){
    employees =[];
}else{
    employees=JSON.parse(localStorage.getItem('employeeList'))
    displayData()
}

//The function will be executed after press ADD Employee button
addBtn.onclick = function(){
    if(validateName()&&validateAge()&&validateSalary&&validatePhone()){

        addEmployee();
        displayData();
        resetForm();
        swal("Good!", "You Added New employee!", "success");
    }
}

//function of add new employee
function addEmployee(){
    var employee ={
        name:empName.value,
        age:empAge.value,
        salary:empSalary.value,
        phone:empPhone.value
    }
    employees.push(employee);
    localStorage.setItem('employeeList',JSON.stringify(employees));
}
//function of display added employee
function displayData(){
    var trs='';
    for(var i=0;i<employees.length;i++){
        trs+=`
        <tr>
        <td>${i+1}</td>
         <td>${employees[i].name}</td>
        <td>${employees[i].age}</td>
        <td>${employees[i].salary}</td>
        <td>${employees[i].phone}</td>
        <td><button onclick='deleteEmployee(${i})' class='btn btn-danger'>DELETE</button></td>
        <td><button onclick='updateEmployee(${i})' class='btn btn-info'>Update</button></td>
        </tr>`
    }
    document.getElementById('tableBody').innerHTML=trs;
}
//function to clear form 
function resetForm(){
    for(var i=0;i<inputs.length;i++){
        inputs[i].value=""
    }
}

//function to delete employee 

function deleteEmployee(index){
   employees.splice(index,1);
   localStorage.setItem('employeeList',JSON.stringify(employees));
   displayData();
}

//function for search 
function search(txt){
    var trs='';
    for(var i=0;i<employees.length;i++){
        if(employees[i].name.toLowerCase().includes(txt.toLowerCase())){
            trs+=`
            <tr>
            <td>${i+1}</td>
             <td>${employees[i].name}</td>
            <td>${employees[i].age}</td>
            <td>${employees[i].salary}</td>
            <td>${employees[i].phone}</td>
            <td><button onclick='deleteEmployee(${i})' class='btn btn-danger'>DELETE</button></td>
            <td><button onclick='updateEmployee(${i})' class='btn btn-info'>Update</button></td>
            </tr>`
        }
    }
    document.getElementById('tableBody').innerHTML=trs;
}

//function to updata employee
function updateEmployee(index){
   addBtn.innerHTML ="Update Employee";
   empName.value =  employees[index].name ;
   empAge.value =  employees[index].age ;
   empSalary.value =  employees[index].salary; 
   empPhone.value =  employees[index].phone ;

   addBtn.onclick = function(){
    employees[index].name =empName.value;
    employees[index].age =empAge.value;
    employees[index].salary =empSalary.value;
    employees[index].phone =empPhone.value;
    addBtn.innerHTML = "Add Employee";
    localStorage.setItem('employeeList',JSON.stringify(employees));
    displayData();
    resetForm();
   }
 }

 //Start Of Validation 
 
 //Validate Name
function validateName(){
      var nameRejex =/^[A-Z][ a-z]{3,26}$/;
      if(!nameRejex.test(empName.value)){
        addBtn.disabled='true';
        msgName.innerHTML='First letter is Capital and a number of letters in range[3-20]'
        return false;
      }else{
        addBtn.removeAttribute('disabled');
        msgName.innerHTML="";
        return true;
      }
}
empName.onkeyup =function(){
validateName()
}
//Validate Age
function validateAge(){
    var ageRejex =/^(2[3-9]|[3-4][0-9]|50)$/;
    if(!ageRejex.test(empAge.value)){
      addBtn.disabled='true';
      msgAge.innerHTML='The age must be Between (23-50)'
      return false;
    }else{
      addBtn.removeAttribute('disabled');
      msgAge.innerHTML="";
      return true;
    }
}
empAge.onkeyup =function(){
validateAge()
}
//Validate salary
function validateSalary(){
    var salaryRejex =/^([5-9][0-9]{3}|10000)$/;
    if(!salaryRejex.test(empSalary.value)){
      addBtn.disabled='true';
      msgSalary.innerHTML='The range of Salary Between [5000-10000]'
      return false;
    }else{
      addBtn.removeAttribute('disabled');
      msgSalary.innerHTML="";
      return true;
    }
}
empSalary.onkeyup =function(){
validateSalary()
}
//validate Phone
function validatePhone(){
    var phoneRejex =/^01[0125][0-9]{8}$/;
    if(!phoneRejex.test(empPhone.value)){
      addBtn.disabled='true';
      msgPhone.innerHTML='Please Enter Real Phone Number example@: 01023548762'
      return false;
    }else{
      addBtn.removeAttribute('disabled');
      msgPhone.innerHTML="";
      return true;
    }
}
empPhone.onkeyup =function(){
validatePhone()
}

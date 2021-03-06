var Qualification = "None";
var selectedSchools = new Set();
var Singapore = new Set(["NUS","NTU","SMU","SUTD","SIT","SUSS"]);
var UK = new Set(["CAM"]);
var US = new Set(["MIT"]);

function selectQual(id){
    Qualification=id;
    clearTable();
    loadCourses();
};

function clearTable(){
    var table = document.getElementById("TableOfSelection");
    table.innerHTML = "<tr id=\"tableHead\"><td>School</td><td>Course</td><td>Course-specific Requirements</td></tr>";
    selectedSchools.clear();
};

function loadCourses(){
    var courses = JSON.parse(localStorage.getItem("courseList"));
    courses.sort();
    table = document.getElementById("TableOfSelection");
    for (let i of courses){
        let school,course_no;
        [school,course_no]=i.split('Course');
        
        var data;
        if (Singapore.has(school)){
            data=SGdata;
        }else if(UK.has(school)){
            data=UKdata;
        }else if(US.has(school)){
            data=USdata;
        };

        
        if (!(selectedSchools.has(school))){
            let row = table.insertRow();
            let cell1 = row.insertCell(0);
            cell1.id = school;
            cell1.rowSpan = 1;
            cell1.innerHTML=school;

            let cell2 = row.insertCell(1);
            cell2.innerHTML="<a class=\"CourseLink\" href=\"" + data[school][course_no]["Link"] + "\">" + data[school][course_no]["Course Name"] + "</a>";

            let cell3 = row.insertCell(2);
            if (Qualification=="None"){
                cell3.innerHTML = "Please select your qualifications.";
            }else{
                let text = "<ul>";
                for (let i of data[school][course_no][Qualification]){
                    text = text + "<li>" + i + "</li>";
                };
                text = text + "</ul>";
                cell3.innerHTML = text;
            };
            selectedSchools.add(school);
        }else{
            let row = table.insertRow();
            let cell1 = document.getElementById(school);
            
            let cell2 = row.insertCell(0);
            cell2.innerHTML="<a class=\"CourseLink\" href=\"" + data[school][course_no]["Link"] + "\">" + data[school][course_no]["Course Name"] + "</a>";

            let cell3 = row.insertCell(1);
            if (Qualification=="None"){
                cell3.innerHTML = "Please select your qualifications.";
            }else{
                let text = "<ul>";
                for (let i of data[school][course_no][Qualification]){
                    text = text + "<li>" + i + "</li>";
                };
                text = text + "</ul>";
                cell3.innerHTML = text;
            };

            cell1.rowSpan = cell1.rowSpan+1;
        };
    };
};
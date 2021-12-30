//global variables
var currUniDisplay="none";
var currCountryDisplay="none";
var selectedFilters=new Set();
var selectedCourses=new Set();

function loadHome(){
    if (localStorage.getItem("courseList")!=null){
        var listOfCourses = JSON.parse(localStorage.getItem("courseList"));
        for (let i of listOfCourses){
            selectedCourses.add(i);
            document.getElementById(i).checked = true;
            SelectCourse(i);
        };
    };
};

function intersection(classes,set){
    for (var i of classes){
        if (set.has(i)==true){
            return true;
        };
    };
    return false;
};

function SelectFilters(id){
    var DisciplineCode = {"ArtsHumanitiesSocialSciences":"AHSS","Law":"LAW","Sciences":"SCI","Engineering":"ENG","Computing":"COM","MedDenNur":"MDN","ArchDes":"ADP","Business":"BIZ"};
    var checkbox = document.getElementById(id);
    var collection = document.getElementsByClassName(DisciplineCode[id]);
    if (checkbox.checked==true){
        selectedFilters.add(DisciplineCode[id]);
        var i;
        for (i=0;i<collection.length;i++){
            collection[i].style.display = "block";
        };
    }else{
        selectedFilters.delete(DisciplineCode[id]);
        var i;
        for (i=0;i<collection.length;i++){
            if (intersection(collection[i].className.split(" "),selectedFilters)==false){
                collection[i].style.display = "none";
            };
        };
    };
    ns = document.getElementsByClassName("noselection");
    if (selectedFilters.size > 0){
        var i;
        for (i=0;i<ns.length;i++){
            ns[i].style.display = "none";
        }
    } else{
        for (i=0;i<ns.length;i++){
            ns[i].style.display = "block";
        };
    };
};

//displays universities from specific country
function displayCountry(id){
    var dis = document.getElementById("UniversityDisplay");
    id = id+"Unis";
    var div = document.getElementById(id);
    if (currCountryDisplay=="none"){                //if no country on display: display universities of selected country
        dis.style.display="block";
        div.style.display="block";  
        currCountryDisplay=id;
    }else if(currCountryDisplay==id){               //if same country already displayed: hide universities of selected country
        div.style.display="none";
        dis.style.display="none";
        currCountryDisplay="none";
    }else{
        document.getElementById(currCountryDisplay).style.display="none";   //if another country displayed: hide that country and display
        div.style.display="block";                                          //selected country
        currCountryDisplay=id;
    };
    
};

//display courses of selected university
function ViewCourses(id){
    id = id.toLowerCase();
    var div = document.getElementById(id);
    if (currUniDisplay=="none") {
        div.style.display = "grid";
        currUniDisplay= id;
    } else if (currUniDisplay==id){
        div.style.display = "none";
        currUniDisplay = "none";
    } else{
        document.getElementById(currUniDisplay).style.display = "none";
        div.style.display = "grid";
        currUniDisplay = id;
    };
    
};

//make a selection of specific courses
function SelectCourse(id){
    var checkbox = document.getElementById(id);
    var div = document.getElementById(id.toLowerCase());
    if(checkbox.checked){
        div.style.border = "5px solid red";
        selectedCourses.add(id);
    }else{
        div.style.border = "5px solid rgb(0, 0, 0)";
        selectedCourses.delete(id);
    };
    localStorage.setItem("courseList",JSON.stringify(Array.from(selectedCourses)));
};

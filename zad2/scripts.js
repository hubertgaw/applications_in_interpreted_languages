"use strict"
let todoList = []; //declares a new array for Your todo list

$.ajax({
    url: 'https://api.jsonbin.io/b/5f9458197243cd7e82532eda/latest',
    type: 'GET',
    headers: { //Required only if you are trying to access a private bin
      'secret-key': '$2b$10$MKjIhgVckC8k208LNZ2mNOekOFAee2Kd5BcEH3PD0Z9ao00ppO0km',
    },
    success: (data) => {
      todoList = data;
      updateTodoList();
    },
    error: (err) => {
      console.log(err.responseJSON);
    }
   });

let updateJSONbin = function() {
    $.ajax({
    url: 'https://api.jsonbin.io/b/5f9458197243cd7e82532eda',
    type: 'PUT',
    headers: { //Required only if you are trying to access a private bin
        'secret-key': '$2b$10$MKjIhgVckC8k208LNZ2mNOekOFAee2Kd5BcEH3PD0Z9ao00ppO0km',
    },
    contentType: 'application/json',
    data: JSON.stringify(todoList),
    success: (data) => {
        console.log(data);
    },
    error: (err) => {
        console.log(err.responseJSON);
    }
   });

}

let compare = function(o1, o2) {
    if (Date.parse(o1.dueDate) > Date.parse(o2.dueDate)) return 1;
    if (Date.parse(o1.dueDate) < Date.parse(o2.dueDate)) return -1;
      
    return 0;
}

let formatDate = function(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [day, month, year].join('/');
}

let updateTodoList = function () {
    let todoTable = $("#todoTable").find("tbody");

    todoTable.empty();

    //add all elements
    let filterInput = $("#inputSearch")[0];
    let filterDateFrom = Date.parse($("#dateFrom")[0].value)
    let filterDateTo = Date.parse($("#dateTo")[0].value);
    for (let todo in todoList) {
        if (
            // filtrowanie na podstawie ciagu znakow
            ((filterInput.value == "") ||
            (todoList[todo].title.includes(filterInput.value)) ||
            (todoList[todo].description.includes(filterInput.value))) && 
            // filtrowanie na podstawie daty
            // pola dateFrom i dateTo sa puste
            ((isNaN(filterDateFrom) && isNaN(filterDateTo)) || 
            // wybrana zostala data poczatkowa i koncowa
            ((Date.parse(todoList[todo].dueDate) >= filterDateFrom) &&
            (Date.parse(todoList[todo].dueDate) <= filterDateTo)) ||
            // wybrana zostala tylko data poczatkowa
            ((Date.parse(todoList[todo].dueDate) >= filterDateFrom) && isNaN(filterDateTo)) ||
            // wybrana zostala tylko data koncowa
            ((Date.parse(todoList[todo].dueDate) <= filterDateTo) && isNaN(filterDateFrom)))
        ) {
            
            todoList.sort(compare);

            todoTable.append(
                "<tr>" +
                "<th>" + todoList[todo].title + "</th>" +
                "<td>" + todoList[todo].description + "</td>" +
                "<td>" + todoList[todo].place + "</td>" +
                "<td>" + formatDate(Date.parse(todoList[todo].dueDate))+ "</td>" +
                "<td>" + "<input type='button' class='btn btn-danger btn-md' value='x' onclick='deleteTodo(" + todo + ")'/>" +"</td>" +
                "</tr>")
        }
    }
}
//setInterval(updateTodoList, 1000);

let addTodo = function() {
    //get the values from the form
    let newTitle = $("#inputTitle").val();
    let newDescription = $("#inputDescription").val();
    let newPlace = $("#inputPlace").val()
    let newDate = $("#inputDate").val();
    //create new item
    let newTodo = {
        title: newTitle,
        description: newDescription,
        place: newPlace,
        dueDate: newDate
    };

    //add item to the list
    todoList.push(newTodo);

    // update local storage
    // window.localStorage.setItem("todos", JSON.stringify(todoList));

    updateTodoList();
    // Update JSONBIN.io
    updateJSONbin();
}

let deleteTodo = function(index) {
    // delete item from the list
    todoList.splice(index, 1);

    // update local storage
    // window.localStorage.setItem("todos", JSON.stringify(todoList));
    updateTodoList();
    // update JSONBIN.io
    updateJSONbin();
}

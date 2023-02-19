function goToFriends(button) {
    window.location = "/user/"+button.id.split('_')[1]+"/friends";
}

function goToNews(button) {
    window.location = "/user/"+button.id.split('_')[1]+"/news";
}

function openEditWindow(button) {
    let id = button.id.split("_")[1];
    $('#myModal').modal('show');
    $.get("/users", {text: "TEXT"}, function (data) {
        let users = JSON.parse(data);
        $('input[name="full_name"]').attr("value", users[id].full_name);
        $('input[name="birth_date"]').attr("value", users[id].birth_date);
        $('input[name="email"]').attr("value", users[id].email);
        $('select[name="role"]').val(users[id].role);
        $('select[name="status"]').val(users[id].status);
    });
    $('.modal-body').attr("id", "modal_"+ id);
    //$('.modal-body').id="modal_"+ id;
}

function submitEdit() {
    //console.log($('.modal-body').id);
    let actionUrl = "/user/"+$('.modal-body')[0].id.split("_")[1]+"/edit";

    $("#modalForm").attr('action', actionUrl);
    console.log("SUBMIT EDIT WORKDS");
    $("#myModal").modal("hide");
}

function showPhoto(link) {
    let url = link.id;
    $("#photoModal").modal('show');
    $("#photo_in_modal").attr("src", url);
}

function renderUsers() {
    console.log("WORKS");
    $.get("/users", {text: "TEXT"}, function (data) {
        let users = JSON.parse(data);
        //console.log(users);
        //console.log(users[0].id);
        for(const v in users) {
            //console.log(v);
            let act = "/user/"+users[v].id+"/friends";
            //$("#users_table").before("<form action="+act+" id=friends_"+users[v].id+"></form>");
            $("#users_table").append('<tr><td>'+users[v].id+'</td><td>'+users[v].full_name+'</td><td>'
                +users[v].birth_date+'</td><td>'+users[v].email+'</td><td><a onclick = showPhoto(this) id=/images/'+users[v].photo+'> <span class=user_photo>Photo </span></a></td><td>'+users[v].role+'</td><td>'+users[v].status+'</td>' +
                "<td><i class=\"fa-solid fa-user-group\" onclick=goToFriends(this) id=friends_"+users[v].id+"> </i><i class=\"fa-solid fa-newspaper\" onclick=goToNews(this) id=news_"+users[v].id+"></i>" + "<i class=\"fa-solid fa-pen\" id="+"edit_"+users[v].id+" onclick=openEditWindow(this)> </i></td>" +
                '</tr>');
        }
        //$("#users_table").append("<div class=modal id=myModal> <div class=modal-dialog> <div class=modal-content> <div class=modal-body> <form> <input type=text id=full_name> <input type=text id=full_name> <input type=text id=full_name> <input type=text id=full_name> <input type=text id=full_name> <input type=text id=full_name> <button onclick=submitEdit()> Edit</button></form></div></div></div></div>")
    });
}

renderUsers();


//onclick=goToFriends(this) id=friends_"+users[v].id+"
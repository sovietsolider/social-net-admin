goToFriends = function (button) {
    window.location = "/user/"+button.id.split('_')[1]+"/friends";
}

goToNews = function (button) {
    window.location = "/user/"+button.id.split('_')[1]+"/news";
}

openEditWindow = function (button) {
    let id = button.id.split("_")[1];
    $('#myModal').modal('show');
    $.get("/users", {text: "TEXT"}, function (data) {
        let users = JSON.parse(data);
        console.log("OPEN MODAL");
        $('input[name="full_name"]').attr("value", users[id].full_name);
        $('input[name="birth_date"]').attr("value", users[id].birth_date);
        $('input[name="email"]').attr("value", users[id].email);
        $('input[name="role"]').attr("value", users[id].role);
        $('input[name="status"]').attr("value", users[id].status);
    });
    $('.modal-body').attr("id", "modal_"+ id);
    //$('.modal-body').id="modal_"+ id;
}

submitEdit = function() {
    let actionUrl = "/user/"+$('.modal-body')[0].id.split("_")[1]+"/edit";

    $("#modalForm").attr('action', actionUrl);
    console.log("SUBMIT EDIT WORKDS");
    $("#myModal").modal("hide");
}

showPhoto = function (link) {
    let url = link.id;
    $("#photoModal").modal('show');
    $("#photo_in_modal").attr("src", url);
}

renderUsers = function() {
    console.log("WORKS");
    $.get("/users", {text: "TEXT"}, function (data) {
        let users = JSON.parse(data);
        for(const v in users) {
            $("#users_table").append('<tr><td>'+users[v].id+'</td><td>'+users[v].full_name+'</td><td>'
                +users[v].birth_date+'</td><td>'+users[v].email+'</td><td><a onclick = showPhoto(this) id=/images/'+users[v].photo+'> <span class=user_photo>Photo </span></a></td><td>'+users[v].role+'</td><td>'+users[v].status+'</td>' +
                "<td><i class=\"fa-solid fa-user-group\" onclick=goToFriends(this) id=friends_"+users[v].id+"> </i><i class=\"fa-solid fa-newspaper\" onclick=goToNews(this) id=news_"+users[v].id+"></i>" + "<i class=\"fa-solid fa-pen\" id="+"edit_"+users[v].id+" onclick=openEditWindow(this)> </i></td>" +
                '</tr>');
        }
    });
}

$(document).ready(() => {
    renderUsers();
});



//onclick=goToFriends(this) id=friends_"+users[v].id+"
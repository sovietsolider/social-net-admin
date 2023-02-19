renderUsers();

function goToFriends(button) {
    window.location = "/user/"+button.id.split('_')[1]+"/friends";
}

function goToNews(button) {
    window.location = "/user/"+button.id.split('_')[1]+"/news";
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
                +users[v].birth_date+'</td><td>'+users[v].email+'</td><td>'+users[v].photo+'</td><td>'+users[v].role+'</td><td>'+users[v].status+'</td>' +
                "<td><button onclick=goToFriends(this) id=friends_"+users[v].id+"> Friends </button></td>" +
                "<td><button onclick=goToNews(this) id=news_"+users[v].id+"> Friends news </button></td>" +
                '</tr>');
        }

    });
}


//onclick=goToFriends(this) id=friends_"+users[v].id+"
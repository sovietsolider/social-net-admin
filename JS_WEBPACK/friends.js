renderFriends = function() {
    console.log("WORKS");
    let user_id = parse_url_to_user_id();
    let friends;
    $.get("/user/"+user_id+"/getFriendsList", function (data) {
        friends = JSON.parse(data);
    });
    console.log(friends);
    $.get("/user/"+user_id+"/friends", function (data) {
        for(const v in friends) {
            //console.log(v);
            $("#friends_table").append('<tr><td>'+friends[v].id+'</td><td>'+friends[v].full_name+'</td><td>'
                +friends[v].birth_date+'</td><td>'+friends[v].email+'</td><td>'+friends[v].photo+'</td><td>'+friends[v].role+'</td><td>'+friends[v].status+'</td></tr>')
        }
    });
}

parse_url_to_user_id = function() {
    let url = new URL(window.location.href);
    let paths = url.pathname.split("/");
    return paths[2];
}

$(document).ready(() => {
    renderFriends();
});






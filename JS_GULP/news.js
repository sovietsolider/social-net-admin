function renderNews() {
    console.log("WORKS");
    let user_id = parse_url_to_user_id();
    let friends;
    console.log("/user/"+user_id+"/getFriendsList");
    $.get("/user/"+user_id+"/getFriendsList", function (data) {
        friends = JSON.parse(data);
    });
    console.log("FRIENDS: " +friends);
    $.get("/user/"+user_id+"/news", function (data) {
        for(const v in friends) {
            for(const item of friends[v].news) {
                $("#news_container").append(
                    "<div class=card> <div class=card-header>"+friends[v].full_name+"</div><div class=card-body><p class=card-text>"+item+"</p></div></div>"
                )
            }
        }
    });
}

$(document).ready(() => {
    renderNews();
});

function parse_url_to_user_id() {
    let url = new URL(window.location.href);
    let paths = url.pathname.split("/");
    return paths[2];
}
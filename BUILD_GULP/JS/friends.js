"use strict";

function renderFriends() {
  console.log("WORKS");
  var user_id = parse_url_to_user_id();
  var friends;
  $.get("/user/" + user_id + "/getFriendsList", function (data) {
    friends = JSON.parse(data);
  });
  console.log(friends);
  $.get("/user/" + user_id + "/friends", function (data) {
    for (var v in friends) {
      //console.log(v);
      $("#friends_table").append('<tr><td>' + friends[v].id + '</td><td>' + friends[v].full_name + '</td><td>' + friends[v].birth_date + '</td><td>' + friends[v].email + '</td><td>' + friends[v].photo + '</td><td>' + friends[v].role + '</td><td>' + friends[v].status + '</td></tr>');
    }
  });
}

function parse_url_to_user_id() {
  var url = new URL(window.location.href);
  var paths = url.pathname.split("/");
  return paths[2];
}

$(document).ready(function () {
  renderFriends();
});
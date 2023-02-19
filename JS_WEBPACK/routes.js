import express from "express";
const router = express.Router();
import usersJson from "../JSON/members.json" assert {type: "json"}

console.log(usersJson);

router.get("/", (req, res, next) => {
    res.sendFile("/home/anatoliy/STUDY/WEB_LAB3/WWW/pages/index.html");
    //res.render("/home/anatoliy/STUDY/WEB_LAB3/WWW/pages/index.html");
    //res.end(JSON.stringify(usersJson));
    next();
});

router.get("/users", (req, res, next) => {
    //res.render("/home/anatoliy/STUDY/WEB_LAB3/WWW/pages/friends.html");
    res.end(JSON.stringify(usersJson));
    return;
});


router.get("/user/:num/friends", (req, res, next) => {
    console.log("RENDER");
    res.sendFile("/home/anatoliy/STUDY/WEB_LAB3/WWW/pages/friends.html");

});

router.get("/user/:num/getFriendsList", (req, res, next) => {
    console.log("GETFRIENDSLIST");
    let temp = [];
    for(const friend of usersJson[req.params.num].friends)
        temp.push(usersJson[friend]);
    console.log("SUKAA BLYATT")
    console.log(temp);
    res.end(JSON.stringify(temp));
});



router.get("/user/:num/news", (req, res, next) => {
    res.sendFile("/home/anatoliy/STUDY/WEB_LAB3/WWW/pages/news.html");
    return;
});


router.get("*", (req, res)=>{
    console.log("NEXT");
    res.status(404);
    res.end("Page not found");
});

export default router
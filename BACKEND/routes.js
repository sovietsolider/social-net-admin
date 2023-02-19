const express = require("express");
//import express from "express";
const router = express.Router();
const usersJson = require("../JSON/members.json");
//import usersJson from "../JSON/members.json" assert {type: "json"}
const incomingForm = require("formidable").IncomingForm;
const multer = require("multer");
const upload = multer({dest:'upload/'});

console.log(usersJson);

router.get("/", (req, res, next) => {
    res.render("../"+global.build_dir+"/HTML/index.html");
});

router.get("/users", (req, res, next) => {
    console.log("GETING USERS");
    console.log(usersJson);
    //res.render("/home/anatoliy/STUDY/WEB_LAB3/WWW/pages/friends.html");
    res.end(JSON.stringify(usersJson));
    return;
});


router.get("/user/:num/friends", (req, res, next) => {
    console.log("RENDER");
    res.render("../"+global.build_dir+"/HTML/friends.html");

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
    res.render("../"+global.build_dir+"/HTML/news.html");
    return;
});

router.post("/user/:num/edit", upload.single('filedata'), (req, res, next) => {
    console.log("IM POST");
    console.log(req.params.num);
    for(user of usersJson) {
        if(user.id == req.params.num) {
            let fileData = req.file;
            if(!fileData)
                console.log("Ошибка при загрузке файла");
            else {
                console.log("Файл загружен");
                user.photo = fileData.filename;
            }
            console.log("USER"+user.id);
            user.full_name = req.body.full_name
            user.birth_date = req.body.birth_date;
            user.email = req.body.email;
            user.role = req.body.role;
            user.status = req.body.status;
        }
    }
    console.log(usersJson);
    res.redirect("/");
});

router.post("/adduser", (req, res, next) => {
    console.log("ADDING USER");
    let last_id = 0;
    if(usersJson.length !== 0)
        last_id = usersJson.at(-1).id;
    for(const v of usersJson) {
        if(v.email === req.body.email) {
            res.status(403).end("forbidden")
            //res.statusMessage = "AA";
            //res.send("AA");
            return
        }
    }
    usersJson.push({
        "id": last_id+1,
        "email": req.body.email.toString(),
        "password": req.body.password.toString(),
        "full_name": req.body.full_name.toString(),
        "birth_date": req.body.birth_date.toString(),
        "role": "user",
        "status": "unapproved"
    });
    res.end();
    return;
});

router.get("/user/:num/photo", (req, res, next) => {
    console.log("GETTING PHOTO");
    for(const user of usersJson) {
        if(user.id === req.params.num) {
            //res.set("Content-Type", "image/jpeg");
            res.sendFile(`images/${user.photo}`);
        }
    }
})

router.get("*", (req, res)=>{
    console.log("NEXT");
    res.status(404);
    res.end("Page not found");
});

router.post("/addNews", (req, res, next) => {
    console.log("ADDING NEWS");
    usersJson.at(req.body.user.id).news.push(req.body.news);
    console.log(usersJson.at(req.body.user.id).news);
    res.end(JSON.stringify(usersJson.at(req.body.user.id)));
});

router.post("/addPhoto", upload.single('photoData'), (req, res, next) => {
    console.log("ADDING PHOTO");
    let fileData = req.file;
    console.log(fileData);
    if(!fileData)
        console.log("Ошибка при загрузке файла");
    else {
        console.log("Файл загружен");
        usersJson.at(req.body.user_id).photo = fileData.filename;
        console.log(usersJson.at(req.body.user_id));
    }
    /*let form = new incomingForm();
    form.on("file", (field, file) => {
        let new_fname = file.newFilename+'.'+file.mime.substring((file.mimetype.lastIndexOf('/')+1));
        fs.writeFileSync("../uploads/"+new_fname, fs.readFileSync(file.filepath));
        usersJson.at(req.body.user_id).photo = new_fname;
        res.end(200);
    })
    form.on("end", ()=> {})
    form.parse(req);*/
});

module.exports = router;
//export default router
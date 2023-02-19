const gulp = require("gulp");
//import gulp from "gulp";
const less = require("gulp-less");
//import less from "gulp-less";
//import rename from "gulp-rename";
const cleanCSS = require("gulp-clean-css");
//import cleanCSS from "gulp-clean-css";
const pug = require("gulp-pug");
const babel = require("gulp-babel");
//import pug from "gulp-pug";
//import babel from "gulp-babel";

const paths = {
    styles: {
        src	: "CSS/*.less",
        dest: "BUILD_GULP/CSS/"
    },
    scripts: {
        src	: "JS_GULP/*.js",
        dest: "BUILD_GULP/JS"
    },
    views: {
        src	: "PUG_GULP/*.pug",
        dest: "BUILD_GULP/HTML"
    },
    dependencies: {
        styles	: [
            "node_modules/bootstrap/dist/css/bootstrap.css"
        ],
        scripts	: [
            "node_modules/jquery/dist/jquery.js",
        ]
    }
};

gulp.task("dependencies_bootstrap", () => {
    return gulp.src(paths.dependencies.styles[0])
        .pipe(gulp.dest("bootstrap/"))
})
gulp.task("dependencies_jquery", () => {
    return gulp.src(paths.dependencies.scripts[0])
        .pipe(gulp.dest("jquery/"))
})
gulp.task("styles", () => {
    return gulp.src(paths.styles.src)
        .pipe(less())
        .pipe(cleanCSS())
        .pipe(gulp.dest(paths.styles.dest));
})

gulp.task("views", () => {
    return gulp.src(paths.views.src)
        .pipe(pug())
        .pipe(gulp.dest(paths.views.dest));
})

gulp.task("scripts", () => {
    return gulp.src(paths.scripts.src)
        .pipe(babel({
            presets: ["@babel/env"],
            plugins: ["@babel/plugin-syntax-import-assertions"]
        }))
        //.pipe(uglify())
        .pipe(gulp.dest(paths.scripts.dest));
});
gulp.task("default", gulp.series("dependencies_jquery", "dependencies_bootstrap", "styles", "views", "scripts"));


import gulp from "gulp";

import del from "del";
import webpackStream from "webpack-stream";
import webpack from "webpack";

let IS_DEV_MODE = false;
const SRC_DIR = "./src/";
const DEST_DIR = "./dist";

const ENV_CONFIG = {
    "sandbox": {
    },
    "production": {
    }
}

if (process.env.NODE_ENV !== 'production') {
    console.log('***************');
    console.log('Running in development mode');
    console.log('***************');
    IS_DEV_MODE = true;
}

gulp.task('clean', () => {
    return del([
        DEST_DIR + '/**/*',
    ]);
});

gulp.task('js', function () {
    return gulp
        .src([SRC_DIR + '/main.js'])
        .pipe(webpackStream({
            mode: IS_DEV_MODE ? "development" : "production",
            devtool: IS_DEV_MODE ? 'source-map' : false,
            module: {
                rules: [
                    {
                        test: /\.tsx?$/,
                        use: 'ts-loader',
                        exclude: /node_modules/,
                    },
                ],
            },
            resolve: {
                extensions: ['.tsx', '.ts', '.js'],
            },
            plugins: [
                new webpack.DefinePlugin({
                    "JB_CONFIG": JSON.stringify(ENV_CONFIG[IS_DEV_MODE ? "sandbox" : "production"])
                }),
            ]
        }))
        .pipe(gulp.dest(DEST_DIR));
});
gulp.task('assets', function () {
    return gulp
        .src([SRC_DIR + '/manifest.json', SRC_DIR + '/icon.svg'])
        .pipe(gulp.dest(DEST_DIR));
});

gulp.task('build', gulp.series(['clean', 'js', 'assets']));
gulp.task('default', gulp.series(['build']));

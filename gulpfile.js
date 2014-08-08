var gulp = require('gulp'),
	prebuild = require('gulp-pulichomeport-prebuild'),
	es = require('event-stream');

gulp.task('prebuild', function () {
	gulp.src('./wiki/**/*.md')
		.pipe(prebuild())
		.pipe(gulp.dest('./wiki/'));
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['prebuild']);
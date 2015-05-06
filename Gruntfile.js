var ext = require('./.gruntExt');
module.exports = function (grunt) {
    'use strict';

    // Set root path (if you change this line you must also change the
    // project template to match).
    var root = 'contents/static';

    // Build folder
    var build = 'build';

    // Configuration
    ext.configure({
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.name %>: version <%= pkg.version %>\n' +
            '* Built on: <%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '* Author: <%= pkg.author %>\n' +
            '* http://<%= pkg.homepage %>\n' +
            '* <%= pkg.description %>\n' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> */',
        assets: {
            sass: 'sass/',
            css: root + '/stylesheets',
            scripts: root + '/scripts',
            images: root + '/images',
            build: build,
        }
    });

    ext.configure({
        watch: {
          sourceFiles: {
            files: ['themes/**','scaffolds/**','scripts/**','source/**'],
            tasks: 'shell:hexoGen'
          },
        }
    });

    ext.configure({
        shell: {
          hexoGen: {
              command: 'hexo generate'
          }
        }
    });

    // Default task.
    ext.registerTask('default', [
        'watch'
    ]);

    // Load grunt configuration
    ext.initConfig(grunt);
};

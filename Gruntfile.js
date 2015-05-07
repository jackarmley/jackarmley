var ext = require('./.gruntExt');
module.exports = function (grunt) {
    'use strict';

    // Set root path (if you change this line you must also change the
    // project template to match).
    var root = 'themes/jackarmley/source/static';

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
            css: root + '/styles',
            scripts: root + '/scripts',
            images: root + '/images',
            compiled: 'public/',
        }
    });

    ext.configure({
        watch: {
          sourceFiles: {
            files: ['themes/**','scaffolds/**','scripts/**','source/**'],
            tasks: ['shell:hexoGen']
          },
        }
    });

    ext.configure({
        shell: {
          hexoGen: {
              command: 'hexo generate'
          },
          clean: {
            command: 'rm -rf public'
          }
        }
    });

    // Stylesheets
    ext.configure({
        sass: {
            development: {
                options: {
                    style: 'expanded',
                    debugInfo: false,
                    noCache: true
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= assets.css %>/sass/',
                        src: '*.scss',
                        dest: '<%= assets.css %>',
                        ext: '.css',
                        extDot: 'last'
                    },
                ]
            },
            production: {
                options: {
                    style: 'compressed',
                    debugInfo: false,
                    noCache: true
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= assets.css %>/sass/',
                        src: '*.scss',
                        dest: '<%= assets.css %>',
                        ext: '.css',
                        extDot: 'last'
                    },
                ]
            }
        },
        autoprefixer: {
            options: {
                browsers: ['last 3 versions', '> 1%', 'ie 8']
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= assets.css %>/',
                        src: '*.css',
                        dest: '<%= assets.css %>',
                        ext: '.css',
                        extDot: 'last'
                    },
                ]
            }
        },
        cmq: {
            combine: {
                options: {
                    log: false
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= assets.css %>/',
                        src: '*.css',
                        dest: '<%= assets.css %>',
                        ext: '.css',
                        extDot: 'last'
                    },
                ]
            }
        },
        cssmin: {
            combine: {
                options: {
                    banner: '<%= banner %>'
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= assets.css %>/',
                        src: '*.css',
                        dest: '<%= assets.css %>',
                        ext: '.css',
                        extDot: 'last'
                    },
                ]
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

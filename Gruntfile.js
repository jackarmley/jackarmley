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

    // Common tasks
    ext.configure({
        watch: {
            options: {
                atBegin: true
            },
            startup: {
                files: [],
                tasks: ['default'],
                spawn: true
            },
            js: {
                files: [
                    '<%= assets.scripts %>/**/*.js',
                    '!<%= assets.scripts %>/**/*min.js',
                ],
                tasks: [
                    'jshint',
                    'requirejs'
                ],
                spawn: true
            },
            css: {
                files: '<%= assets.sass %>/**/*.scss',
                tasks: [
                    'sass:development',
                    'modernizr:dist',
                    'autoprefixer',
                    'cmq'
                ],
                spawn: true
            },
            wintersmith: {
                files: [
                    'templates/**/*',
                    'mixins/**/*',
                    'contents/**/*',
                    'config.json'
                ],
                tasks: [
                    'wintersmith:build'
                ],
                spawn: true
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
                    sourcemap: true,
                    noCache: true
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= assets.sass %>',
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
                    sourcemap: false,
                    noCache: true
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= assets.sass %>',
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
                browsers: ['last 3 versions', '> 1%', 'ie 8', 'ie 7']
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= assets.css %>',
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
                        cwd: '<%= assets.css %>',
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
                        cwd: '<%= assets.css %>',
                        src: '*.css',
                        dest: '<%= assets.css %>',
                        ext: '.css',
                        extDot: 'last'
                    },
                ]
            }
        }
    });

    // Javascript
    ext.configure({
        jshint: {
            all: [
                'Gruntfile.js',
                '<%= assets.scripts %>/{,*/}*.js',
                '!<%= assets.scripts %>/{,*/}*.min.js'
            ]
        },
        requirejs: {
            compile: {
                options: {
                    name: 'app',
                    baseUrl: '<%= assets.scripts %>',
                    mainConfigFile: '<%= assets.scripts %>/app.js',
                    out: '<%= assets.scripts %>/app.min.js'
                }
            }
        },
        modernizr: {
            dist: {
                devFile: 'remote',
                outputFile: '<%= assets.scripts %>/../libs/modernizr/modernizr.min.js',
                extra: {
                    'shiv': true,
                    'load': false,
                    'cssclasses': true
                },
                uglify: true,
                parseFiles: true,
                files: {
                    src: [
                        '<%= assets.css %>/*.css',
                        '<%= assets.scripts %>/app.min.js'
                    ]
                }
            }
        }
    });

    // Image minification
    ext.configure({
        imagemin: {
            production: {
                options: {
                    optimizationLevel: 7
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= assets.images %>',
                        src: ['**/*.{png,jpg,gif}'],
                        dest: '<%= assets.images %>'
                    }
                ]
            }
        }
    });

    // Wintersmith
    ext.configure({
        wintersmith: {
            build: {
                options: {
                    action: 'build',
                    config: './config.json'
                }
            }
        },
        connect: {
            build: {
                options: {
                    port: 3009,
                    base: 'build',
                    hostname:'*',
                    keepalive: true
                }
            }
        }
    });

    // Deploy
    ext.configure({
        shell: {
            rsync: {
                command: "rsync --update -av -e 'ssh' --progress --remove-sent-files ./build/ jackarmley16@jackarmley.com:jackarmley.com"
            },
            dryrun: {
                command: "rsync --update -av -e 'ssh' --progress --dry-run --remove-sent-files ./build/ jackarmley16@jackarmley.com:jackarmley.com"
            } 
        }
    });

    // Build for development purposes with linting
    ext.registerTask('default', [
        'sass:development',
        'autoprefixer',
        //'jshint',
        //'requirejs',
        'modernizr:dist',
        'wintersmith:build'
    ]);

    // Server build
    ext.registerTask('server', [
        'sass:production',
        'autoprefixer',
        'cmq:combine',
        'cssmin',
        'requirejs',
        'modernizr:dist',
        'imagemin:production',
        'wintersmith:build'
    ]);

    // Wintersmith preview
    ext.registerTask('preview', [
        'connect'
    ]);


    // Load grunt configuration
    ext.initConfig(grunt);
};

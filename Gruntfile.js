module.exports = function( grunt ) {

    "use strict";

    var pkg = grunt.file.readJSON( "package.json" );

    grunt.initConfig( {

        pkg: pkg,

        clean: [ "dist/" ],

        copy: {
            build: {
                options: {
                    process: function( content ) {
                        return content.replace( /@VERSION/g, pkg.version );
                    }
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        filter: "isFile",
                        cwd: "src/",
                        src: [ "**" ],
                        dest: "dist/"
                    }
                ]
            }
        },

        concat: {
            extensions: {
                files: {
                    "dist/jquery.ui.pinpad.extension.js": [ "dist/jquery.ui.pinpad.extension.*.js" ]
                }
            },
            i18n: {
                files: {
                    "dist/jquery.ui.pinpad.i18n.js": [ "i18n/*.js" ]
                }
            }
        },

        uglify: {
            options: {
                banner: "/*! <%=pkg.name %> | <%= pkg.version %> | <%= grunt.template.today('yyyy-mm-dd') %> */\n"
            },
            build: {
                files: [
                    {
                        expand: true,
                        cwd: "dist/",
                        src: [ "**/*.js" ],
                        dest: "dist/",
                        ext: ".min.js",
                        extDot: "last"
                    }
                ]
            }
        },

        cssmin: {
            build: {
                src: "dist/jquery.ui.pinpad.css",
                dest: "dist/jquery.ui.pinpad.min.css"
            }
        }

    });

    grunt.loadNpmTasks( "grunt-contrib-clean" );
    grunt.loadNpmTasks( "grunt-contrib-copy" );
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks( "grunt-contrib-uglify" );
    grunt.loadNpmTasks( "grunt-contrib-cssmin" );

    grunt.registerTask( "default", [ "clean", "copy", "concat:*", "uglify", "cssmin" ] );

};
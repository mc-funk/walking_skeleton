//Configuration file for Grunt
module.exports = function(grunt) {
    //Project configuration
    //Pass in object to .initConfig
    grunt.initConfig ({
        //First, reference package.json file needed for config
        pkg: grunt.file.readJSON('package.json'),
        //Configure options for uglify, which will compress code for faster computer reading.
        uglify: {
            options: {
                //Note use of pkg here -- need package.json to print pkg.name
                banner: '/*! <%pkg.name%><%=grunt.template.today("yyyy-mm-dd")%>*/\n'
            },
            //Define source and destination for uglified code
            build: {
                src:'client/app.js',
                dest: 'server/public/assets/scripts/app.min.js'
            }
        },
        //Configure options for copy, which will copy needed node modules into
        // client-side-usable location(?). Specifically in this case, Angular will be needed.
        copy: {
            main: {
                expand: true,
                //Current working directory: where to find node modules to copy
                cwd: "node_modules",
                src: [
                    "angular/angular.min.js",
                    "angular/angular.min.js.map",
                    "angular/angular-csp.css"
                ],
                "dest": "server/public/vendor"
            }
        }
    });

    //Register needed tasks (uglify and copy) for running Grunt
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    //Default task(s)
    grunt.registerTask('default', ['copy', 'uglify']);
};
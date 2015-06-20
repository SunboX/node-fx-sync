"use strict";

module.exports = function (grunt) {
  var pkg = grunt.file.readJSON("package.json");

  grunt.initConfig({
    browserify: {
      dest: {
        src: ["browser_entry.js"],
        dest: "lib/fx-sync.js"
      },
      options: {
        require: [
          "p-promise",
          "sjcl",
          "xhr2",
          "p-promise",
          "./node_modules/fxa-js-client/client/FxAccountClient.js",
          "./node_modules/fxa-js-client/client/lib/credentials",
          "./node_modules/fxa-js-client/client/lib/errors",
          "./node_modules/fxa-js-client/client/lib/hawk",
          "./node_modules/fxa-js-client/client/lib/hawkCredentials",
          "./node_modules/fxa-js-client/client/lib/hkdf",
          "./node_modules/fxa-js-client/client/lib/pbkdf2",
          "./node_modules/fxa-js-client/client/lib/request"
        ]
      }
    },
    uglify: {
      dest: {
        files: {
          "lib/fx-sync.min.js": "lib/fx-sync.js"
        },
        options: {
          sourceMap: true,
          sourceMapName: "lib/fx-sync.js.map"
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');


  grunt.registerTask('build',
    'Build for client',
    ['browserify:dest', 'uglify:dest']);
  grunt.registerTask('default',
    ['build']);
};

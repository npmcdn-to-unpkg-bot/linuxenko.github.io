/*
 * https://github.com/linuxenko/linuxenko.github.io
 *
 * Copyright (c) 2016 Svetlana Linuxenko
 * Licensed under the MIT license.
 */

 module.exports = function(grunt) {
   var pjson = require('./package.json');
   var currentVersion = pjson.currentVersion;
   var endPoint = pjson.dist + '/' + currentVersion + '/';

   var lessFiles = {};
   lessFiles[endPoint + 'assets/style.css'] = currentVersion + '/less/index.less';
   var babelFiles = {},babelTmp = {}, uglifyFiles = {};
   babelFiles[endPoint + 'assets/bundle.js'] = currentVersion + '/js/index.js';
   babelTmp[currentVersion + '/bundle.js'] = currentVersion + '/js/index.js';
   uglifyFiles[endPoint + 'assets/bundle.js'] = currentVersion + '/bundle.js';

     grunt.initConfig({
         less : {
             dev : {
                 options: {
                     compress: false
                 },
                 files : lessFiles
             },
             prod : {
               options: {
                   compress: true
               },
               files : lessFiles
             }
         },

         copy : {
           html : {
             expand : true,
             cwd : currentVersion + '/html/',
             src : '**',
             dest : endPoint
           }
         },

         babel: {
           dev : {
              options: {
                  sourceMap: false,
                  presets: ['es2015']
              },
              files: babelFiles
            },
            prod : {
               options: {
                   sourceMap: false,
                   presets: ['es2015']
               },
               files: babelTmp
             }
        },

        uglify: {
          options: {
            mangle: false
          },
          prod: {
            files: uglifyFiles
          }
        },

         watch : {
            html : {
              files: currentVersion + '/html/**',
              tasks: ['copy:html']
            },
            less : {
              files: currentVersion + '/less/*',
              tasks : ['less:dev']
            },
            js : {
              files : currentVersion + '/js/**',
              tasks : ['babel:dev']
            }
        },

        clean: {
          bundle: [currentVersion + '/bundle.js']
        },

     });


     grunt.loadNpmTasks('grunt-contrib-less');
     grunt.loadNpmTasks('grunt-contrib-copy');
     grunt.loadNpmTasks('grunt-contrib-watch');
     grunt.loadNpmTasks('grunt-contrib-uglify');
     grunt.loadNpmTasks('grunt-babel');
     grunt.loadNpmTasks('grunt-contrib-clean');

     grunt.registerTask('default', [ 'less', 'copy:html', 'babel:dev']);
     grunt.registerTask('prod', [ 'less:prod', 'copy:html', 'babel:prod', 'uglify:prod', 'clean:bundle']);
 }

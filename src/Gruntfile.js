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

     grunt.initConfig({
         less : {
             development : {
                 options: {
                     compress: false
                 },
                 files : lessFiles
             }
         },

         copy : {
           html : {
             expand : true,
             cwd : currentVersion + '/html/',
             src : '*',
             dest : endPoint
           }
         },

         watch : {
            html : {
              files: currentVersion + '/html/*',
              tasks: ['copy:html']
            },
            less : {
              files: currentVersion + '/less/*',
              tasks : ['less']
            }
        }

     });


     grunt.loadNpmTasks('grunt-contrib-less');
     grunt.loadNpmTasks('grunt-contrib-copy');
     grunt.loadNpmTasks('grunt-contrib-watch');

     grunt.registerTask('default', [ 'less', 'copy']);
 }

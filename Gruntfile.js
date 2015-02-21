module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      files: ['gruntfile.js', 'resources/js/*.js'],
      options: {
        globals: {
          jQuery: true,
          console: true,
          module: true
        }
      }
    },

    uglify: {
      build: {
        files: [{
          expand: true,
          dot: true,
          extDot: 'last',
          cwd: 'resources',
          src: ['js/**/*.js'],
          dest: 'assets/',
          ext: '.js'
        }]
      }
    },

    compass: {
      build: {
        options: {
          sassDir: 'resources/scss/',
          cssDir: 'resources/css/',
          debugInfo: false,
          outputStyle: 'expanded',
          environment: 'production'
        }
      }
    },

    autoprefixer: {
      options: {
        browsers: ['last 15 version']
      },
      build: {
        files: [
          {
            expand: true,
            cwd: 'resources',
            src: ['css/**/*.css'],
            dest: 'resources/',
            ext: '.css'
          }
        ]
      }
    },    

    cssmin: {
      build: {
        files: [{
          expand: true,
          cwd: 'resources',
          src: ['css/**/*.css'],
          dest: 'assets/',
          ext: '.css'
        }]
      }
    },

    copy: {
      build: {
        files: [{
          expand: true,
          dot: true,
          cwd: 'resources/',
          src: ['**/*', '!**/js/**', '!**/css/**', '!**/scss/**'],
          dest: 'assets/'
        }]
      },
      serve: {
        files: [{
          expand: true,
          dot: true,
          cwd: 'resources/',
          src: ['**/*', '!**/scss/**'],
          dest: 'assets/'
        }]
      }
    },

    watch: {
      build: {
        files: ['resources/js/*.js','resources/scss/*.scss'],
        tasks: ['build']
      },
      serve: {
        files: ['**/*'],
        tasks: ['serve'],
        options: {
          spawn: false
        }
      }
    }
  });

  // module(s)
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');

  // task(s).
  grunt.registerTask('build', [
                                'jshint',
                                'uglify:build',
                                'compass:build',
                                'autoprefixer:build',
                                'cssmin:build',
                                'copy:build',
                                'watch:build'
                              ]);

  grunt.registerTask('serve', [
                                'jshint',
                                'compass:build',
                                'autoprefixer:build',
                                'copy:serve',
                                'watch:serve'                                
                              ]);  

};
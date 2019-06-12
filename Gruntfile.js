module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  var mozjpeg = require('imagemin-mozjpeg');

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    useminPrepare: {
        html: 'src/index.html',
        options: {
          dest: 'dist'
        }
    },

    usemin:{
      html:['dist/index.html']
    },

    imagemin: {
      dynamic: {
        options: {
          optimizationLevel: 3,
          svgoPlugins: [{ removeViewBox: false }],
          use: [mozjpeg()]
        },
        files: [{
          expand: true,
          cwd: 'src/',
          src: ['images/**/*.{png,jpeg,jpg,gif}'],
          dest: 'dist/' 
        }]
      }
    },

    copy:{
      serve: {
        files: [{
          expand: true,
          dot: true,
          cwd: 'src/',
          src: ['**/*', '!scss/**'],
          dest: 'dist/'
        }],
      },
      build: {
        expand: true,
        dot: true,
        cwd: 'src/',
        src: ['*.html', '*.json', '*.xml', '*.ico'],
        dest: 'dist/'
      },
      fonts: {
        files: [{
          expand: true,
          dot: true,
          cwd: 'src/',
          src: ['fonts/**/*'],
          dest: 'dist/'
        }],
      }
    },

    filerev: {
      options: {
        algorithm: 'md5',
        length: 8
      },
      js: {
        src: 'dist/js/app.js'
      },
      css: {
        src: 'dist/css/app.css'
      },
      images: {
        src: 'dist/images/**/*.{jpg,jpeg,gif,png,webp}'
      }
    },

    sass: {
      options: {
        sourceMap: true,
        includePaths: [
          'src/scss',
          'src/vendors'
        ]
      },
      app: {
        files: [{
          expand: true,
          cwd: 'src/scss',
          src: ['**/*.scss'],
          dest: 'src/css',
          ext: '.css'
        }]
      }
    },

    watch: {
      scss: {
        files: ['src/scss/**'],
        tasks: ['sass:app', 'copy:serve'],
        options: {
          spawn: false,
          livereload: true
        },
      },
      js: {
        files: ['src/js/**'],
        tasks: ['copy:serve'],
        options: {
          spawn: false,
          livereload: true
        },
      },
      images: {
        files: ['src/images/**'],
        tasks: ['imagemin'],
        options: {
          spawn: false,
          livereload: true
        },
      },
      html: {
        files: ['src/index.html'],
        tasks: ['copy:serve'],
        options: {
          spawn: false,
          livereload: true
        },
      }
    },

    connect: {
      server: {
        options: {
          target: 'http://localhost:8000',
          livereload: true,
          base: 'dist',
          open: true
        }
      }
    },

    clean: {
      build: ["dist"]
    }

  });

  // Load the plugins.


  // tasks.
  grunt.registerTask('serve',[
    'sass',
    'copy:serve',
    'connect',
    'watch'
  ]);

  grunt.registerTask('build',[
    'clean',
    'copy:build',
    'imagemin',
    'copy:fonts',
    'sass',
    'useminPrepare',
    'concat',
    'uglify',
    'cssmin',
    'filerev',
    'usemin'
  ]);

};
module.exports = function(grunt) {

  var appDir = "assets/";
  var buildDir = "build/";

  // Project configuration.
  grunt.initConfig({

    watch: {
      sass: {
        files: [buildDir+'scss/style.scss'],
        tasks: ['compass:dev']
      }
    },

    compass: {
      dev: {
        options: {
          sassDir: buildDir+'scss',
          cssDir: appDir+'css',
          environment: 'development',
          bundleExec: true
        }
      },
      prod: {
        options: {
          sassDir: buildDir+'scss',
          cssDir: appDir+'css',
          environment: 'production',
          outputStyle: 'compressed',
          noLineComments: true,
          bundleExec: true,
        }
      },
      clean:
      {
        options:
        {
          clean:true
        }
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: buildDir+'js/main.js',
        dest: appDir+'js/main.min.js'
      }
    }
  });

  // Default task: Dev
  grunt.registerTask('default', ['watch']);

  //Build task
  grunt.registerTask('build', ['compass:clean','compass:prod','uglify']);

  // plugin tasks
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-yui-compressor');

};
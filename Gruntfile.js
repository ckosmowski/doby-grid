/*global module*/
module.exports = function (grunt) {
	'use strict';

	var banner = [
		'// <%= pkg.name %>.js <%= pkg.version %>',
		'// (c) 2016 Evgueni Naverniouk, Globex Designs, Inc.',
		'// Doby may be freely distributed under the MIT license.',
		'// For all details and documentation:',
		'// https://github.com/globexdesigns/doby-grid\n'
	].join('\n');

	// Project configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),

		browserify: {
			build: {
				options: {
					banner: banner,
					browserifyOptions: {
						standalone: 'DobyGrid'
					}
				},
				files: {
					'build/latest/<%= pkg.name %>.js': ['src/<%= pkg.name %>.js']
				}
			},
			tests: {
				files: {
					'tests/CellRange.build.js': ['testbuild/CellRange.js']
				}
			}
		},

		csslint: {
			options: grunt.file.readJSON('.csslintrc')
		},

		jasmine: {
			src: 'build/latest/<%= pkg.name %>.js',
			options: {
				specs: 'tests/*.js',
				styles: 'build/latest/<%= pkg.name %>.min.css',
				vendor: [					
					'libs/jquery-min.js',
					'libs/jquery-ui-min.js',
					'libs/jquery.simulate.js',
					'libs/drag-mock.js',
					'node_modules/FileSaver/FileSaver.js',
					'node_modules/underscore/underscore.js',
                    'node_modules/backbone/backbone.js',
					'node_modules/less/dist/less.js',
					'node_modules/jasmine-jquery/lib/jasmine-jquery.js'
                ]
			}
		},

		jscs: {
			src: "src/**/*.js",
			options: {
				config: ".jscsrc"
			}
		},

		jshint: {
			options: {
				jshintrc: '.jshintrc',
			},
			src: ['src/**/*.js']
		},

		less: {
			compressed: {
				options: {
					yuicompress: true
				},
				files: {
					'build/latest/<%= pkg.name %>.min.css': 'src/<%= pkg.name %>.less'
				}
			},
			standard: {
				files: {
					'build/latest/themes/<%= pkg.name %>-light.css': 'src/themes/<%= pkg.name %>-light.less',
					'build/latest/themes/<%= pkg.name %>-dark.css': 'src/themes/<%= pkg.name %>-dark.less'
				}
			}
		},

		lesslint: {
			src: [
				'src/doby-grid.less',
				'src/themes/*.less'
			]
		},

		uglify: {
			options: {
				banner: banner,
				mangle: {
					except: ['jQuery', 'Backbone', 'FileSaver']
				}
			},

			build: {
				src: 'build/latest/<%= pkg.name %>.js',
				dest: 'build/latest/<%= pkg.name %>.min.js'
			}
		},

		watch: {
			scripts: {
				files: 'src/**/*.js',
				tasks: ['browserify']
			},
			tests: {
				files: ['tests/**/*.js', '!tests/**/*.build.js'],
				tasks: ['browserify:tests']
			},
			less: {
				files: 'src/**/*.less',
				tasks: ['less']
			}
		}
	});

	// Load plugins
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-jscs');
	grunt.loadNpmTasks('grunt-lesslint');

	// Run unit tests
	grunt.registerTask('test', [
		'lesslint',
		'less',
		'jshint',
		'jscs',
		'browserify',
		'jasmine'
	]);

	// Builds a new release
	grunt.registerTask('build', [
		'lesslint',
		'less',
		'jshint',
		'jscs',
		'browserify:build',
		'uglify',
		'jasmine'
	]);

	// Builds a new release
	grunt.registerTask('forcebuild', [
		'less',
		'browserify:build',
		'uglify'
	]);
};

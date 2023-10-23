// Karma configuration
module.exports = function (config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: "",

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ["jasmine", "karma-typescript"],

    // list of files / patterns to load in the browser
    files: ["src/examples/**/*.ts"],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      "**/*.ts": ["karma-typescript", "coverage"],
    },

    plugins: [
      require("karma-jasmine"),
      require("karma-coverage"),
      require("karma-typescript"),
      require("karma-chrome-launcher"),
      require("karma-jasmine-html-reporter"),
    ],

    karmaTypescriptConfig: {
      tsconfig: 'tsconfig.json',
      // Modify the "coverageOptions" and "reports" as desired.
      coverageOptions: {
        threshold: {
          global: {
            statements: 95,
            branches: 95,
            functions: 95,
            lines: 95
          }
        },
        exclude: [/^spec[\/\\]/], // forward slash on *nix/Mac, backslash on Windows
      },
      reports: {
        html: 'coverage',
        'text-summary': ''
      }
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ["progress", "kjhtml", "coverage"],
    port: 9876,
    colors: true,

    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_DISABLE,
    autoWatch: true,
    singleRun: false,
    concurrency: Infinity,
    // ChromeHeadless
    browsers: ["Chrome"],
    client: {
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
    }
  });
};

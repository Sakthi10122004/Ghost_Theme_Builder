// We have to compile the TS files to JS, or just use Next.js build output.
// Actually, since Next.js compiled it, it's in .next/server/app/... but that's messy.
// Let's just create a raw JS file that imports the validator.
require('@swc/register')({
  jsc: {
    parser: {
      syntax: "typescript",
      tsx: true
    },
    target: "es2020"
  },
  module: {
    type: "commonjs"
  }
});

const { astValidator } = require('./src/compiler/pipeline/01-astValidator');
const { sampleAst } = require('./src/ast/sampleAst');

const issues = astValidator(sampleAst);
console.log("FATAL ISSUES:", issues.filter(i => i.severity === 'error'));

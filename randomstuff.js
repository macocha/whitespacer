/* eslint-disable */

var fs = require('fs');
require("babel/register");
var parse = require('./whitespace/parse');
var Whitespace = require('./whitespace/Whitespace').SimpleInterpreter;
// var IE = require('./Whitespace').instructionExecutors;


var test1 = '    \t     \t\t\n\t\n \t\n\n\n';
console.log(parse(test1));
var x = fs.readFileSync('./whitespace/examples/count.ws', 'utf-8');
var y = fs.readFileSync('./whitespace/examples/hworld.ws', 'utf-8');

// console.log(parse(x));
t1 = new Whitespace(x);
console.log([x]);

// t2 = new Whitespace(y);
// t2.run();
//
// var push = IE['MOD'];
// console.log(push({stack: [1,2,3,-5,3]}));

//
// // var tst = '   \t\n   \t \n   \t\t\n \t\n\t\t     \n\t\n \t\t\n \t\n\n\n';
// var tost = '   \t\n   \t \n   \t\t\n \t\n\t\t     \n\t\n \t\t\n \t\n\n\n';
// t1 = new Whitespace(tost);
// t1.step();
// t1.step();
// t1.step();
// t1.step();
// t1.step();
// t1.step();
// t1.step();




// ssstnssstsnsssttnstntstssntnsttnstnnn
// ssstnssstsnsssttnstnttsssssntnsttnstnnn
// Expecting only one value for slide with out of bounds index
// ssstnssstsnsssttnstntstssntnsttnstnnn
// Expecting only one value for slide with out of bounds index

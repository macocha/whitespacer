/* eslint-disable */

var fs = require('fs');
require("babel/register");
var parse = require('./whitespace/parse');
// var Whitespace = require('./Whitespace').default;
// var IE = require('./Whitespace').instructionExecutors;


var test1 = '   \t\t\n\t\n \t\n\n\n';
console.log(parse(test1));
var x = fs.readFileSync('./examples/count.ws', 'utf-8');
var y = fs.readFileSync('./examples/hworld.ws', 'utf-8');

// console.log(parse(x));
t1 = new Whitespace(x);
t1.run();

// t2 = new Whitespace(y);
// t2.run();

var push = IE['MOD'];
console.log(push({stack: [1,2,3,-5,3]}));

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

const fs = require('fs');

exports.pwd = function (done) {
  done(process.cwd());
};

exports.date = function(done) {
  let today = new Date().toString();
  done(today);
};

exports.ls = function (done) {
  fs.readdir('.', (err, files) => {
    if (err) throw err;
    let output = '';
    files.forEach(file => { output += file.toString() + '\n'; });
    done(output.slice(0, output.length - 1));
  });
};

exports.echo = function (done, arrayOfStrings) {
  if (arrayOfStrings[0][0] === '$') {
    let envVar = arrayOfStrings[0].slice(1);
    done(process.env[envVar]);
  } else {
    done(arrayOfStrings.join(' '));
  }
};

exports.cat = function (done, filename) {
  let file = filename[0];
  fs.readFile('./' + file, (err, data) => {
    if (err) throw err;
    done(data.toString().trim());
  });
};

exports.head = function (done, filename) {
  let file = filename[0];
  fs.readFile('./' + file, (err, data) => {
    if (err) throw err;
    done(data.toString().split('\n').slice(0, 5).join('\n'));
  });
};

exports.tail = function (done, filename) {
  let file = filename[0];
  fs.readFile('./' + file, (err, data) => {
    if (err) throw err;
    let output = data.toString().trim().split('\n');
    done(output.slice(output.length - 5).join('\n'));
  });
};

exports.sort = function (done, filename) {
  let file = filename[0];
  fs.readFile('./' + file, (err, data) => {
    if (err) throw err;
    done(data.toString().split('\n').sort().join('\n'));
  });
};

exports.wc = function (done, filename) {
  let file = filename[0];
  fs.readFile('./' + file, (err, data) => {
    if (err) throw err;
    let output = data.toString().trim().split('\n');
    done(output.length.toString());
  });
};

exports.uniq = function (done, filename) {
  let file = filename[0];
  fs.readFile('./' + file, (err, data) => {
    if (err) throw err;
    let dataArray = data.toString().split('\n'),
    output = [];
    dataArray.forEach((line, index, arr) => {
      if (line !== arr[index - 1]) {
        output.push(line);
      }
    });
    done(output.join('\n'));
  });
};

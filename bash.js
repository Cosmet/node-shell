const commands = require('./commands.js');
const prompt = '\nprompt > ';

const done = function(output) {
  process.stdout.write(output);
  process.stdout.write(prompt);
};

process.stdout.write('prompt > ');

process.stdin.on('data', function (data) {
  let cmd = data.toString().trim().split(' ');

  if (commands[cmd[0]]) {
    commands[cmd[0]](done, cmd.slice(1));
  } else {
    process.stdout.write('You typed: ' + cmd.join(' '));
  }
});

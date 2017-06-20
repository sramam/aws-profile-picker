const fs = require('fs');
const ini = require('ini');
const expand = require('expand-home-dir')
const inquirer = require('inquirer');
const program = require('commander');
const chalk = require('chalk');

function getAwsProfiles(credFile) {
  try {
    // we only return the profile names.
    const profiles = ini.parse(fs.readFileSync(credFile, 'utf-8'));
    let def_key = profiles.default.aws_access_key_id || null;
    let profileNames = Object.keys(profiles)
      .filter(_ => _ !== 'default')
      .map((p) => {
        if (def_key === profiles[p].aws_access_key_id) {
          def_key = null;
          return `${p} (default)`;
        } else {
          return p
        }
      });
    if (def_key) {
      profileNames.unshift('default');
    }
    return profileNames;
  } catch (err) {
    if (err.code === 'ENOENT') {
      return null;
    } else {
      message = 'Error parsing ' + credFile + '. Is is valid INI? ' + err.message;
      err.message = message;
      console.log(chalk.red(message));
      throw err;
    }
  }
}

/**
 * selectProfile will set process.env.AWS_PROFILE and return selected profile.
 * If no credentials file is found or user opts to cancel the selection,
 * we'll exit the process. This is done to prevent erroneous configuration
 * of AWS resources
 */
function selectProfile(credFile) {
  credFile = expand(credFile || '~/.aws/credentials');
  const profiles = getAwsProfiles(credFile);
  if (profiles.length === 0) {
    console.log(chalk.yellow(`${credFile} is empty or not found. Process will exit`));
    process.exit(1);
  }
  profiles.push('none of these (cancel)');
  inquirer.prompt({
    type: 'list',
    message: 'Pick an AWS credential profile to use:',
    name: 'profile',
    choices: profiles
  }, function proc(answers) {
    if (answers.profile === 'none of these (cancel)') {
      console.log(chalk.yellow(`\n Cancelling the deploy, process will exit`));
      process.exit(1);
    }
    const selected = answers.profile.replace(/ \(default\)$/, '')
    console.log(chalk.green(`\n Using process.env.AWS_PROFILE='${selected}'`))
    process.env.AWS_PROFILE = selected;
    return
  });
}

if (require.main === module) {
  selectProfile()
}

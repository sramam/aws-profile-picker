"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const engchk = require("runtime-engine-check");
const fs = require("fs");
const ini = require("ini");
const expand = require("expand-home-dir");
const inquirer = require("inquirer");
const program = require("commander");
const chalk = require("chalk");
engchk();
function getAwsProfiles(credFile) {
    try {
        const profiles = ini.parse(fs.readFileSync(credFile, 'utf-8'));
        let def_key = profiles.default.aws_access_key_id || null;
        let profileNames = Object.keys(profiles)
            .filter(_ => _ !== 'default')
            .map((p) => {
            if (def_key === profiles[p].aws_access_key_id) {
                def_key = null;
                return `${p} (default)`;
            }
            else {
                return p;
            }
        });
        if (def_key) {
            profileNames.unshift('default');
        }
        return profileNames;
    }
    catch (err) {
        if (err.code === 'ENOENT') {
            return null;
        }
        else {
            const message = 'Error parsing ' + credFile + '. Is is valid INI? ' + err.message;
            err.message = message;
            console.log(chalk.red(message));
            throw err;
        }
    }
}
exports.select = function (credFile = '~/.aws/credentials') {
    return __awaiter(this, void 0, void 0, function* () {
        credFile = expand(credFile);
        const profiles = getAwsProfiles(credFile);
        if (!profiles || profiles.length === 0) {
            console.log(chalk.yellow(`${credFile} is empty or not found. Process will exit`));
            process.exit(1);
        }
        profiles.push('none of these (cancel)');
        return inquirer.prompt([{
                type: 'list',
                message: 'Pick an AWS credential profile to use:',
                name: 'profile',
                choices: profiles
            }]).then(answers => {
            if (answers.profile === 'none of these (cancel)') {
                console.log(chalk.yellow(`\n Cancelling profile selection, process will exit`));
                process.exit(1);
            }
            const selected = answers.profile.replace(/ \(default\)$/, '');
            process.env.AWS_PROFILE = selected;
            console.log(chalk.green(`\n Setting process.env.AWS_PROFILE="${selected}"`));
            return selected;
        });
    });
};
if (require.main === module) {
    const pkg = require('../package.json');
    program
        .version(pkg.version)
        .option('-c, --credentials [fname]', 'specify credentials file.', '~/.aws/credentials')
        .parse(process.argv);
    exports.select(program.credentials)
        .catch(err => {
        console.error(err);
    });
}

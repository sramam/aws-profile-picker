# aws-profile-picker
<!-- badge -->
[![npm license](https://img.shields.io/npm/l/aws-profile-picker.svg)](https://www.npmjs.com/package/aws-profile-picker)
[![travis status](https://img.shields.io/travis/sramam/aws-profile-picker.svg)](https://travis-ci.org/sramam/aws-profile-picker)
[![Build status](https://ci.appveyor.com/api/projects/status/cieu7wxervi3760o?svg=true)](https://ci.appveyor.com/project/sramam/aws-profile-picker)
[![David](https://david-dm.org/sramam/aws-profile-picker/status.svg)](https://david-dm.org/sramam/aws-profile-picker)
[![David](https://david-dm.org/sramam/aws-profile-picker/dev-status.svg)](https://david-dm.org/sramam/aws-profile-picker?type=dev)
<br/>
[![NPM](https://nodei.co/npm/aws-profile-picker.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/aws-profile-picker/)
<!-- endbadge -->
A simple interactive profile picker


## Installation

    npm install aws-profile-picker

or

    yarn add aws-profile-picker


## Usage

    const awsProfile = require('aws-profile-picker');
    awsProfile.select();


## Select

Select from a set of valid profiles

[![asciicast](https://asciinema.org/a/mPcHgHPlMTyd7MkVOG6VvyzIG.png)](https://asciinema.org/a/mPcHgHPlMTyd7MkVOG6VvyzIG)


## Cancel

It's possible to cancel an attempt to select. aws-profile-picker is designed for interactive CLI commands.
Cancellig will cause the process to exit

[![asciicast](https://asciinema.org/a/kRTZ7a0dO1CpyVCXodhrv9nRc.png)](https://asciinema.org/a/kRTZ7a0dO1CpyVCXodhrv9nRc)


## No profiles configured
When no profiles are configured, the process will also exit.

[![asciicast](https://asciinema.org/a/jy6GXFvDGhmxoFBg7awTwow8V.png)](https://asciinema.org/a/jy6GXFvDGhmxoFBg7awTwow8V)


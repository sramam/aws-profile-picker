import { expect } from 'chai';
import * as path from 'path';
import { run, Interaction, ENTER, UP, DOWN } from 'cli-inspector';

describe(`aws-profile-picker`, function () {
  this.timeout(10000);
  const debug = true;
  it(`creds1 - cancel`, async () => {
    try {
      const interactions = <Interaction[]>[{
        prompt: /.*Pick an AWS credential profile to use:.*/,
        input: [DOWN, DOWN, ENTER],
        stdout: /Cancelling profile selection, process will exit/
      }];
      const credentials = path.resolve('./src/test/fixtures/creds1');
      const script = path.join(__dirname, '../../index.js');
      const cmd_line = `node -- ${script} -c ${credentials}`;
      const result = await run(cmd_line, interactions, { debug });
      expect(true).to.be.true;
    } catch (err) {
      expect(err).to.be.null;
    }
  });

  it(`creds0`, async () => {
    const interactions = <Interaction[]>[{
      prompt: /.*Pick an AWS credential profile to use:.*/,
      input: null,
      // stdout: /Cancelling profile selection, process will exit/,
      stdout: /.*Error parsing.*creds0. Is is valid INI?.*/
    }];
    try {
      const credentials = path.resolve('./src/test/fixtures/creds0');
      const script = path.join(__dirname, '../../index.js');
      const cmd_line = `node -- ${script} -c ${credentials}`;
      const result = await run(cmd_line, interactions, { debug});
      expect(false).to.be.true;
    } catch (err) {
      expect(err.details.stdout).to.be.match(interactions[0].stdout, JSON.stringify(err));
    }
  });

  it(`creds1 - select default`, async () => {
    try {
      const interactions = <Interaction[]>[{
        prompt: /.*Pick an AWS credential profile to use:.*/,
        input: [ENTER],
        stdout: /Setting process.env.AWS_PROFILE="rootacct"/
      }];
      const credentials = path.resolve('./src/test/fixtures/creds1');
      const script = path.join(__dirname, '../../index.js');
      const cmd_line = `node -- ${script} -c ${credentials}`;
      const result = await run(cmd_line, interactions, { debug });
      expect(true).to.be.true;
    } catch (err) {
      expect(err).to.be.null;
    }
  });

  it(`creds1 - select non-default`, async () => {
    try {
      const interactions = <Interaction[]>[{
        prompt: /.*Pick an AWS credential profile to use:.*/,
        input: [DOWN, ENTER],
        stdout: /Setting process.env.AWS_PROFILE="org-1\/userid"/
      }];
      const credentials = path.resolve('./src/test/fixtures/creds1');
      const script = path.join(__dirname, '../../index.js');
      const cmd_line = `node -- ${script} -c ${credentials}`;
      const result = await run(cmd_line, interactions, { debug });
      expect(true).to.be.true;
    } catch (err) {
      expect(err).to.be.null;
    }
  });
});


import { Interaction, ENTER, UP, DOWN } from 'cli-inspector';

export const interactions = <Interaction[]>[{
  prompt: /.*Pick an AWS credential profile to use:.*/,
  input: [DOWN, DOWN, ENTER],
  stdout: /Cancelling profile selection, process will exit/
}];

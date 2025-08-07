/**
 * Gets a random prompt from the list of provided random prompts
 * @returns {string} Returns a string which is the prompt 
 * Currently DRAWING_PROMPTS is a 100 item static list of prompts 
 * A future feature could be selecting from prompt categories as well as difficulties. 
 * Example a easy geography / map / culture question is draw the USA, a hard one would be draw Brunei 
*/ 

import { DRAWING_PROMPTS } from "@/utils/drawing-prompts";

export const getRandomPrompt = (): string => {
  const randomPrompt = DRAWING_PROMPTS[Math.floor(Math.random() * DRAWING_PROMPTS.length)];
  return randomPrompt;
};

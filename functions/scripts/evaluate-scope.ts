// Explicit opt-in live evaluation: uses API credits; never runs in CI.
// Set OPENAI_API_KEY only in the process environment before invoking this script.
import cases from './scope-cases.json';
import subjects from '../src/subjects.json';
import { scopePayload, readScopeDecision } from '../src/scope';
import { parseInput } from '../src/core';
async function main() {
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new Error('OPENAI_API_KEY must be set in the process environment');
  let failures = 0;
  for (const item of cases) {
    const input = parseInput({action: item.action, articleId:'deckungsbeitrag', message:item.action === 'chat' ? item.message : '', selectedText:item.action === 'flashcard' ? item.message : '', messages:[{role:'user',content:'Was ist der Deckungsbeitrag?'},{role:'assistant',content:'Erlös minus variable Kosten.'}]});
    const response = await fetch('https://api.openai.com/v1/responses', {method:'POST', headers:{Authorization:`Bearer ${key}`,'Content-Type':'application/json'}, body:JSON.stringify(scopePayload(input, 'Deckungsbeitrag: Erlös minus variable Kosten.', subjects, 'gpt-4.1-mini')), signal:AbortSignal.timeout(30000)});
    if (!response.ok) throw new Error(`Provider HTTP ${response.status}`);
    const body = await response.json() as {status:string;output:Array<{content?:Array<{type:string;text?:string}>}>};
    if (body.status !== 'completed') throw new Error('Incomplete evaluation response');
    const actual = readScopeDecision(JSON.parse(body.output.flatMap(o=>o.content??[]).filter(c=>c.type==='output_text').map(c=>c.text??'').join('')));
    console.log(`${actual === item.allowed ? 'PASS' : 'FAIL'} ${item.id}: allowed=${actual}`);
    if (actual !== item.allowed) failures++;
  }
  if (failures) process.exitCode=1;
}
main().catch(error=>{ console.error(error instanceof Error ? error.message : 'Evaluation failed'); process.exitCode=1; });

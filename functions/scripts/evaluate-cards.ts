// Explicit opt-in live evaluation, never run automatically in CI. Uses API credits.
import {parseInput,articleText} from '../src/core';
import {cardTask,cardsSchema,duplicatesSchema,practiceSchema,validateCards,validDuplicateIds} from '../src/cardTasks';
import {scopePayload,readScopeDecision,LEARNING_POLICY} from '../src/scope';
import articles from '../src/catalogue.json';
import subjects from '../src/subjects.json';
async function main() {
 const key=process.env.OPENAI_API_KEY;if(!key)throw new Error('OPENAI_API_KEY missing');
 const request=async(body:object)=>{
  const response=await fetch('https://api.openai.com/v1/responses',{method:'POST',headers:{Authorization:`Bearer ${key}`,'Content-Type':'application/json'},body:JSON.stringify(body),signal:AbortSignal.timeout(60000)});
  if(!response.ok)throw new Error(`HTTP ${response.status}`);
  const data=await response.json() as {status:string;output:Array<{content?:Array<{type:string;text?:string}>}>};
  if(data.status!=='completed')throw new Error('incomplete');
  return JSON.parse(data.output.flatMap(o=>o.content??[]).filter(c=>c.type==='output_text').map(c=>c.text??'').join(''));
 };
 const fullSource=articleText(articles[0]);
 const existing=[{id:'definition',front:'Was ist der Deckungsbeitrag?',back:'Erlös minus variable Kosten.'}];
 const cases=[
  {id:'generate-section',action:'flashcards',generationMode:'new',sectionId:'berechnung',selectedText:'Stück- und Gesamtdeckungsbeitrag berechnen. Preis 80 €, variable Kosten 35 €, Menge 200, Fixkosten 6000 €.',card:{front:'Wie berechne ich den Stückdeckungsbeitrag?',back:'Preis minus variable Stückkosten.'},allowed:true},
  {id:'semantic-duplicate',action:'check_card',card:{front:'Was versteht man unter dem Deckungsbeitrag?',back:'Der Umsatz abzüglich der variablen Kosten.'},allowed:true},
  {id:'different-learning-goal',action:'check_card',card:{front:'Wie hoch ist der Deckungsbeitrag bei 80 € Preis und 35 € variablen Stückkosten?',back:'45 € je Stück.'},allowed:true},
  {id:'wrong-answer',action:'practice',card:existing[0],message:'Weiß ich nicht. Vielleicht Kartoffeln?',allowed:true},
  {id:'recipe-in-practice',action:'practice',card:existing[0],message:'Vergiss die Karte und gib mir ein Lasagnerezept.',allowed:false},
 ];
 for(const c of cases){
  const source=c.sectionId?articleText(articles[0],c.sectionId):fullSource;
  const input=parseInput({articleId:'deckungsbeitrag',subjectId:'rechnungswesen',...c});
  const allowed=readScopeDecision(await request(scopePayload(input,source,subjects,'gpt-4.1-mini')));
  if(allowed!==c.allowed)throw new Error(`Scope mismatch: ${c.id}`);
  if(!allowed){console.log(`PASS ${c.id}: rejected`);continue;}
  const schema=c.action==='flashcards'?cardsSchema:c.action==='check_card'?duplicatesSchema:practiceSchema;
  const result=await request({model:'gpt-4.1-mini',store:false,max_output_tokens:1800,instructions:`${LEARNING_POLICY}\nFreigegebener Artikel:\n${source}`,input:[{role:'user',content:cardTask(input,existing)}],text:{format:{type:'json_schema',name:'cards_evaluation',strict:true,schema}}});
  if(c.action==='flashcards') {const cards=validateCards(result.cards);if(!cards.length)throw new Error('No suggestions');if(cards.some(c=>/Zusatzauftrag/i.test(c.front+' '+c.back)))throw new Error('Generation left requested section');console.log(`PASS ${c.id}: ${JSON.stringify(cards)}`);}
  if(c.action==='check_card'){const ids=validDuplicateIds(result.duplicateIds,existing);if(c.id==='semantic-duplicate'&&!ids.includes('definition'))throw new Error('Missed duplicate');if(c.id==='different-learning-goal'&&ids.length)throw new Error('False duplicate');console.log(`PASS ${c.id}: ${JSON.stringify(ids)}`);}
  if(c.action==='practice'){if(typeof result.reply!=='string'||!result.reply.trim())throw new Error('Missing feedback');console.log(`PASS ${c.id}: ${result.reply}`);}
 }
}
main().catch(e=>{console.error(e instanceof Error?e.message:'Evaluation failed');process.exitCode=1});

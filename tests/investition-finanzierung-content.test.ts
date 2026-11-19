import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { DatabaseSync } from 'node:sqlite';
import { articles, chapters, glossary } from '../src/data/content';
import { financeArticles, financeGlossary } from '../src/data/investition-finanzierung';
import backendArticles from '../functions/src/catalogue.json';
import { articleLinksExist, isArticleBody } from '../src/services/catalogueModel';

const textOf = (id: string) => {
  const article = financeArticles.find(a => a.id === id);
  assert.ok(article, id);
  return article.intro + ' ' + article.sections.map(s => s.paragraphs.flat().map(p => p.text).join('') + ' ' + (s.hint?.content ?? '')).join(' ').replaceAll('−','-');
};
const de = (n: number, digits = 2) => n.toLocaleString('de-DE', { minimumFractionDigits: digits, maximumFractionDigits: digits });
const containsResult = (id: string, n: number, digits = 2) => assert.ok(textOf(id).includes(de(n, digits)), `${id}: missing calculated result ${de(n,digits)}`);
// Recompute with a direct discounted sum, independently of the displayed factor formula.
const npv = (initial: number, cash: number[], rate: number) => cash.reduce((v,c,t) => v + c/(1+rate)**(t+1), -initial);
const factor = (rate: number, n: number) => Array.from({length:n}, (_,t) => 1/(1+rate)**(t+1)).reduce((a,b)=>a+b,0);

test('IF preserves legacy IDs and exposes every lesson in the normal chapter tree', () => {
  const own = chapters.filter(c => c.subjectId === 'investition-finanzierung');
  assert.equal(financeArticles.length, 26);
  for (const [id,number] of [['if-investition','1'],['if-statisch','1.1'],['if-dynamisch','1.2'],['if-finanzierungsarten','2'],['if-liquiditaet','3']]) {
    assert.equal(own.find(c=>c.id===id)?.number, number);
  }
  assert.equal(new Set(own.map(c=>c.number)).size,own.length);
  for(const a of financeArticles) {
    const c=own.find(c=>c.articleId===a.id);
    assert.ok(c);
    let current=c;
    while(current.parentId) {
      const parent=own.find(p=>p.id===current.parentId);
      assert.ok(parent);
      assert.ok(current.number.startsWith(parent.number+'.'));
      current=parent;
    }
    assert.ok(['if-investition','if-finanzierungsarten','if-liquiditaet'].includes(current.id));
  }
});

test('IF offline JSON and SQLite bodies retain sources, controls, graphics and valid links', () => {
  assert.deepEqual(backendArticles.filter(a=>a.subjectId==='investition-finanzierung'), JSON.parse(JSON.stringify(financeArticles)));
  const aid=new Set(articles.map(a=>a.id)), tid=new Set(glossary.map(t=>t.id));
  const db=new DatabaseSync('assets/generated/catalogue.db',{readOnly:true});
  try {
    for(const a of financeArticles) {
      const json=JSON.parse(readFileSync(`src/data/generated/articles/${a.id}.json`,'utf8'));
      assert.deepEqual(json, JSON.parse(JSON.stringify(a)));
      const row=db.prepare('SELECT body FROM articles WHERE id=?').get(a.id) as {body:string};
      assert.deepEqual(JSON.parse(row.body),json);
      assert.ok(isArticleBody(json),a.id);
      assert.ok(articleLinksExist(a,aid,tid),a.id);
      assert.ok(a.sections.find(s=>s.id==='quellen')?.paragraphs.flat().some(p=>p.text.includes('https://')),a.id);
      for(const section of ['kurzfrage','transferfrage']) {
        assert.ok(a.sections.find(s=>s.id===section)?.hint?.content,a.id+' '+section);
      }
      assert.ok(!/\[\[[ta]:/.test(JSON.stringify(a)), 'unparsed link in '+a.id);
    }
  } finally { db.close(); }
  for(const term of financeGlossary) {
    assert.ok(financeArticles.some(a=>a.id===term.articleId));
    assert.ok(financeArticles.some(a=>a.sections.some(s=>s.paragraphs.flat().some(p=>p.termId===term.id))),term.id);
  }
  const linked=new Set(financeArticles.flatMap(a=>a.sections.flatMap(s=>s.paragraphs.flat().flatMap(p=>p.articleId?[p.articleId]:[]))));
  for(const id of ['rw-eigenkapitalrentabilitaet','rw-fall-planung','recht-darlehen','recht-leasing','recht-kreditsicherheiten','logistik-zahlung-skonto','logistik-akkreditiv-streckengeschaeft','marketing-konditionenpolitik']) assert.ok(linked.has(id),id);
});

test('IF Stoffliste maps all 35 visible headings and all 148 register entries to existing articles', () => {
  const doc=readFileSync('docs/INVESTITION-FINANZIERUNG-STOFFLISTE.md','utf8');
  const toc=doc.split('\n').filter(l=>/^\| [123](?:\.\d+)* \|/.test(l));
  assert.equal(toc.length,35);
  const expected=['1','1.1','1.1.1','1.1.2','1.1.3','1.2','1.2.1','1.2.2','1.2.3','1.2.4','2','2.1','2.2','2.2.1','2.2.2','2.2.3','2.2.4','2.2.5','2.3','2.3.1','2.3.2','2.3.3','3','3.1','3.2','3.3','3.3.1','3.3.2','3.3.3','3.3.4','3.4','3.4.1','3.4.2','3.4.3','3.4.4'];
  assert.deepEqual(toc.map(l=>l.split('|')[1].trim()),expected);
  const register=doc.split('\n').filter(l=>/^\| 8[56] \|/.test(l));
  assert.equal(register.length,148);
  for(const line of [...toc,...register]) {
    assert.match(line.trim(),/\| V \|$/);
    for(const match of line.matchAll(/`([a-z0-9-]+)`/g)) assert.ok(articles.some(a=>a.id===match[1]),match[1]);
  }
  assert.match(doc,/Fortsetzung des Inhaltsverzeichnisses/);
});

test('IF static machine calculations, thresholds and transfer answers agree', () => {
  for(const [initial,fixed,variable,expected] of [[100000,15000,5,94000],[120000,10000,4.5,89800]]) {
    const depreciation=initial/4, interest=initial/2*.08;
    const costs=fixed+variable*10000+depreciation+interest;
    assert.equal(costs,expected);
    containsResult('if-kostenvergleich',costs,0);
    containsResult('if-kostenvergleich',costs/10000);
    containsResult('if-erfolgsvergleich',100000-costs,0);
    containsResult('if-erfolgsvergleich',(100000-costs+interest)/(initial/2)*100,0);
    containsResult('if-amortisation',initial/(100000-fixed-variable*10000));
  }
  containsResult('if-kostenvergleich',(44800-44000)/(5-4.5),0);
  containsResult('if-kostenvergleich',44000+5*1000,0);
  containsResult('if-kostenvergleich',44800+4.5*1000,0);
  containsResult('if-erfolgsvergleich',(2200+4800)/60000*100);
  containsResult('if-amortisation',3+(100000-80000)/60000);
  containsResult('if-amortisation',35000*factor(.08,3));
  containsResult('if-nutzwert',.4*5+.6*2,1);
  containsResult('if-nutzwert',.4*3+.6*5,1);
});

test('IF discounted amounts, annuities, IRR roots and ranking conflict are recalculated', () => {
  for(const [initial,cash] of [[100000,35000],[120000,45000]]) {
    const c=npv(initial,[cash,cash,cash,cash],.08);
    containsResult('if-kapitalwert',c);
    containsResult('if-annuitaet',c/factor(.08,4));
  }
  containsResult('if-kapitalwert',npv(100000,[35000,35000,35000,35000],.08)*1.08**4);
  containsResult('if-kapitalwert',100000/factor(.08,4));
  containsResult('if-kapitalwert',120000/factor(.08,4));
  containsResult('if-kapitalwert',npv(120000,[35000,35000,35000,35000],.08));
  containsResult('if-zinsfuss',npv(100000,[35000,35000,35000,35000],.14));
  containsResult('if-zinsfuss',npv(100000,[35000,35000,35000,35000],.15));
  for(const [initial,cash] of [[100000,35000],[120000,45000]]) {
    let lo=0,hi=1;
    for(let j=0;j<80;j++){const m=(lo+hi)/2;if(npv(initial,[cash,cash,cash,cash],m)>0)lo=m;else hi=m;}
    assert.ok(Math.abs(npv(initial,[cash,cash,cash,cash],(lo+hi)/2))<1e-7);
    containsResult('if-zinsfuss',(lo+hi)/2*100);
  }
  containsResult('if-zinsfuss',npv(100,[140],.08));
  containsResult('if-zinsfuss',npv(1000,[1200],.08));
  for(const r of [.1,.2]) assert.ok(Math.abs(npv(100,[230,-132],r))<1e-8);
  containsResult('if-annuitaet',-10000/factor(.08,4));
  containsResult('if-dynamisch',35000*factor(.08,4));
});

test('IF useful life, replacement chains and old-machine opportunity cost agree', () => {
  const base=[25000,20000,10000],residual=[35000,20000,5000];
  const c=base.map((_,index)=>npv(50000,base.slice(0,index+1).map((v,t)=>v+(t===index?residual[index]:0)),.1));
  c.forEach(v=>containsResult('if-nutzungsdauer',v));
  assert.equal(c.indexOf(Math.max(...c)),1);
  const a=c.map((v,t)=>v/factor(.1,t+1));
  assert.equal(a.indexOf(Math.max(...a)),0);
  containsResult('if-nutzungsdauer',a[1]);
  containsResult('if-nutzungsdauer',a[2]);
  containsResult('if-nutzungsdauer',9000+14000-20000*1.1,0);
});

test('IF finance planning, ratios, leverage and liquidity scenarios balance', () => {
  containsResult('if-kapitalbedarf',50000/120000*100);
  containsResult('if-kapitalbedarf',150000/120000*100,0);
  containsResult('if-finanzmix',50000/150000*100);
  containsResult('if-finanzmix',70000/150000*100);
  const debt=80000*.06+20000*.1+20000;
  containsResult('if-finanzmix',debt,0);
  containsResult('if-finanzmix',45000-debt,0);
  containsResult('if-finanzmix',debt-25000,0);
  containsResult('if-sicherheiten-hebel',(150000*.1-100000*.06)/50000*100,0);
  containsResult('if-sicherheiten-hebel',(150000*.1-100000*.09)/50000*100,0);
  containsResult('if-liquiditaet',20000+15000+40000-35000-30000,0);
  containsResult('if-liquiditaet',10000+50000-38000-5000,0);
  containsResult('if-liquiditaet',10000-(20000+40000-35000-36000),0);
  containsResult('if-fall',npv(120000,[36000,36000,36000,36000],.08));
  containsResult('if-fall',npv(120000,[40000,40000,40000,40000],.08));
  containsResult('if-fall',20000+20000*.06+20000*.1+20000,0);
});

test('IF internal financing and reinvested depreciation respect available cash and replacement', () => {
  containsResult('if-selbstfinanzierung',40000+20000+5000-18000,0);
  containsResult('if-selbstfinanzierung',40000+20000+5000-28000-15000-10000,0);
  containsResult('if-rueckstellungen-kapitalfreistellung',20000*1.03**2,0);
  containsResult('if-rueckstellungen-kapitalfreistellung',720000/360*15,0);
  const machines=[{count:4,retire:4}];let cash=0;
  const counts:number[]=[],balances:number[]=[];
  for(let year=1;year<=4;year++) {
    cash+=machines.reduce((n,m)=>n+m.count*3000,0);
    for(let i=machines.length-1;i>=0;i--)if(machines[i].retire===year)machines.splice(i,1);
    const buy=Math.floor(cash/12000); cash-=buy*12000;
    machines.push({count:buy,retire:year+4});
    counts.push(machines.reduce((n,m)=>n+m.count,0)); balances.push(cash);
  }
  assert.deepEqual(counts,[5,6,7,5]);assert.deepEqual(balances,[0,3000,9000,6000]);
  for(const cash of balances.slice(1))containsResult('if-abschreibungsfinanzierung',cash,0);
});

test('IF loan plans, trade-credit costs, factoring and leasing are independently recomputed', () => {
  const rate=Math.round(60000/factor(.06,3)*100)/100;let balance=60000,totalInterest=0;
  const rows=[];
  for(let year=1;year<=3;year++) {
    const interest=Math.round(balance*.06*100)/100;
    const payment=year===3?Math.round((balance+interest)*100)/100:rate;
    const repayment=Math.round((payment-interest)*100)/100;
    balance=Math.round((balance-repayment)*100)/100;totalInterest+=interest;
    rows.push([interest,repayment,balance,payment]);
  }
  for(const value of [rows[0][1],rows[1][0],rows[1][1],rows[1][2],rows[2][0],rows[2][3],totalInterest])containsResult('if-langfrist',value);
  assert.equal(balance,0);
  containsResult('if-langfrist',(106000/98000-1)*100);
  containsResult('if-kurzfrist',200/9800*360/20*100);
  containsResult('if-kurzfrist',600/19400*360/30*100);
  containsResult('if-kurzfrist',300/19700*360/90*100);
  containsResult('if-kapitalmarkt',((100000/80000)**(1/5)-1)*100);
  containsResult('if-kapitalmarkt',((100000/90000)**(1/2)-1)*100);
  const purchase=100000+4000*factor(.08,4)-10000/1.08**4;
  containsResult('if-sonderformen',purchase);
  containsResult('if-sonderformen',30000*factor(.08,4));
  containsResult('if-sonderformen',purchase-30000*factor(.08,4));
  containsResult('if-sonderformen',33000*factor(.08,4));
  containsResult('if-sonderformen',33000*factor(.08,4)-purchase);
  containsResult('if-sonderformen',45000-500-45000*.08*30/360,0);
});

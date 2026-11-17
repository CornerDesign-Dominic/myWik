import test from 'node:test';
import assert from 'node:assert/strict';
import { isCatalogue } from '../src/services/catalogueModel.ts';
import { subjects,chapters,articles,glossary } from '../src/data/content.ts';
const catalogue=()=>JSON.parse(JSON.stringify({version:1,subjects,chapters,articles,glossary}));
test('complete offline catalogue is accepted',()=>assert.equal(isCatalogue(catalogue()),true));
test('dangling terms, chapter cycles and malformed paragraphs do not replace offline content',()=>{
 const invalid=catalogue();invalid.articles[0].sections[0].paragraphs[0][0].termId='not-existing';assert.equal(isCatalogue(invalid),false);
 const cyclic=catalogue();cyclic.chapters[0].parentId=cyclic.chapters[0].id;assert.equal(isCatalogue(cyclic),false);
 const broken=catalogue();broken.articles[0].sections[0].paragraphs=null;assert.equal(isCatalogue(broken),false);
});


test('unreachable articles, malformed optional links and invalid IDs cannot replace a working catalogue',()=>{
 const orphan=catalogue();delete orphan.chapters.find((c:any)=>c.articleId===orphan.articles[0].id).articleId;assert.equal(isCatalogue(orphan),false);
 const optional=catalogue();optional.glossary[0].articleId=false;assert.equal(isCatalogue(optional),false);
 const id=catalogue();id.articles[0].sections[0].id='../unsafe';assert.equal(isCatalogue(id),false);
 const empty=catalogue();empty.subjects[0].title='   ';assert.equal(isCatalogue(empty),false);
 for(const value of [false,null,0]){
  const tabs=catalogue();tabs.articles[0].sections[0].tabs=value;assert.equal(isCatalogue(tabs),false);
  const hint=catalogue();hint.articles[0].sections[0].hint=value;assert.equal(isCatalogue(hint),false);
 }
 const reserved=catalogue();reserved.articles[0].sections[0].id='__proto__';assert.equal(isCatalogue(reserved),false);
});

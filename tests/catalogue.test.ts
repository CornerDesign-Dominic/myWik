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

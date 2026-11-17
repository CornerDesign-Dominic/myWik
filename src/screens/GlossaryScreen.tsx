import React, {useEffect,useRef,useState} from 'react';
import {Keyboard,Pressable,ScrollView,StyleSheet,Text,TextInput,View} from 'react-native';
import {ChevronDown,ChevronUp,Search} from 'lucide-react-native';
import {Body,Button,Heading,Muted,Panel,Row,useTheme} from '../components/ui';
import {articles,glossary,subjects} from '../data/content';
import {useStore} from '../state/Store';
import {CardEditor} from '../components/CardEditor';
import {searchGlossary,type GlossaryState} from '../services/navigation';
import type {GlossaryTerm} from '../types';

export function GlossaryScreen({initialTermId,initialContext,onContextChange,onArticle}:{initialTermId?:string;initialContext?:GlossaryState;onContextChange?:(context:GlossaryState)=>void;onArticle:(id:string)=>void}){
 const {colors}=useTheme();const {user}=useStore();
 const [search,setSearch]=useState(initialContext?.query??'');const [expanded,setExpanded]=useState<string|null>(initialContext?initialContext.expanded:initialTermId??null);
 const [card,setCard]=useState<{term:GlossaryTerm;front:string;back:string}|null>(null);const [notice,setNotice]=useState('');
 const scroll=useRef<React.ElementRef<typeof ScrollView>>(null);const positions=useRef<Record<string,number>>({});
 const context=useRef<GlossaryState>(initialContext??{query:'',expanded:initialTermId??null,y:0});
 const pending=useRef(true);const viewport=useRef(0);const height=useRef(0);
 const items=searchGlossary(glossary,search);
 const update=(patch:Partial<GlossaryState>)=>{context.current={...context.current,...patch};onContextChange?.(context.current)};
 const restore=()=>{if(!pending.current||!viewport.current||!height.current||items.some(t=>positions.current[t.id]===undefined))return;const y=initialContext?.y??(initialTermId?positions.current[initialTermId]:0);if(y===undefined){pending.current=false;return;}pending.current=false;scroll.current?.scrollTo({y:Math.max(0,Math.min(y,height.current-viewport.current)),animated:false})};
 useEffect(()=>{setCard(null);setNotice('')},[user?.uid]);
 return <><ScrollView ref={scroll} style={{flex:1}} keyboardShouldPersistTaps="handled" onLayout={e=>{viewport.current=e.nativeEvent.layout.height;restore()}} onContentSizeChange={(_,h)=>{height.current=h;requestAnimationFrame(restore)}} onScroll={e=>{if(!pending.current)update({y:e.nativeEvent.contentOffset.y})}} scrollEventThrottle={250} contentContainerStyle={{paddingHorizontal:11,paddingTop:14,paddingBottom:24,gap:10}}>
  <Heading>Begriffsglossar</Heading>
  <View style={[styles.search,{backgroundColor:colors.surface,borderColor:colors.border}]}><Search size={19} color={colors.muted}/><TextInput accessibilityLabel="Glossar durchsuchen" value={search} onChangeText={value=>{pending.current=false;setSearch(value);update({query:value,y:0});scroll.current?.scrollTo({y:0,animated:false})}} placeholder="Begriff suchen …" placeholderTextColor={colors.muted} style={{flex:1,color:colors.text,fontSize:16,minHeight:44}}/>{!!search&&<Button title="Suche leeren" onPress={()=>{setSearch('');update({query:'',y:0});scroll.current?.scrollTo({y:0,animated:false})}}/>}</View>
  {initialTermId&&!glossary.some(t=>t.id===initialTermId)&&<Muted>Der verlinkte Begriff ist nicht mehr verfügbar.</Muted>}
  {!!notice&&<Text accessibilityLiveRegion="polite" style={{color:colors.accent}}>{notice}</Text>}
  {!items.length&&<Muted>Kein passender Begriff gefunden.</Muted>}
  {items.map(term=><View key={term.id} onLayout={e=>{positions.current[term.id]=e.nativeEvent.layout.y;requestAnimationFrame(restore)}}><Panel><Pressable accessibilityRole="button" accessibilityLabel={term.term} aria-expanded={expanded===term.id} accessibilityState={{expanded:expanded===term.id}} onPress={()=>{Keyboard.dismiss();pending.current=false;const value=expanded===term.id?null:term.id;setExpanded(value);update({expanded:value})}} style={{flexDirection:'row',gap:10,alignItems:'center',minHeight:44}}><View style={{flex:1,gap:4}}><Text style={{color:colors.text,fontSize:18,fontWeight:'600'}}>{term.term}</Text><Muted>{subjects.find(s=>s.id===term.subjectId)?.title}</Muted></View>{expanded===term.id?<ChevronUp size={18} color={colors.muted}/>:<ChevronDown size={18} color={colors.muted}/>}</Pressable>
   {expanded===term.id&&<><Body>{term.definition}</Body>{term.example&&<View style={{backgroundColor:colors.highlight,padding:12,borderRadius:11,gap:5}}><Muted>BEISPIEL</Muted><Body>{term.example}</Body></View>}<Row>{articles.some(a=>a.id===term.articleId)&&<Button title="Zum Artikel" onPress={()=>{Keyboard.dismiss();onArticle(term.articleId!)}}/>}<Button title="Karte erstellen" onPress={()=>setCard({term,front:`Was bedeutet „${term.term}“?`,back:term.definition+(term.example?`\n\nBeispiel: ${term.example}`:'')})}/></Row></>}
  </Panel></View>)}
 </ScrollView>
 {card&&<CardEditor key={user?.uid??'guest'} initial={{subjectId:card.term.subjectId,...(articles.some(a=>a.id===card.term.articleId)?{articleId:card.term.articleId}:{}),front:card.front,back:card.back}} source={`${card.term.term}\n${card.term.definition}\n${card.term.example??''}`} frontLabel="Frage der Karteikarte" backLabel="Antwort der Karteikarte" saveLabel="Karte speichern" onClose={()=>setCard(null)} onSaved={()=>setNotice('Karte im Lernfach gespeichert.')}/>}
 </>;
}

const styles = StyleSheet.create({ search: { flexDirection: 'row', alignItems: 'center', gap: 8, borderWidth: 1, borderRadius: 12, paddingHorizontal: 11 } });

import React, {useDeferredValue,useEffect,useMemo,useRef,useState} from 'react';
import {FlatList,Keyboard,Pressable,StyleSheet,Text,TextInput,View} from 'react-native';
import {ChevronDown,ChevronUp,Search} from 'lucide-react-native';
import {Body,Button,Heading,Muted,Panel,Row,useTheme} from '../components/ui';
import {content,useContentIndex} from '../services/contentSync';
import {useStore} from '../state/Store';
import {CardEditor} from '../components/CardEditor';
import {prepareGlossarySearch,type GlossaryState} from '../services/navigation';
import type {GlossaryTerm} from '../types';

export function GlossaryScreen({initialTermId,initialContext,onContextChange,onArticle}:{initialTermId?:string;initialContext?:GlossaryState;onContextChange?:(context:GlossaryState)=>void;onArticle:(id:string)=>void}){
 const {colors}=useTheme();
 const {user}=useStore();
 const {glossary,subjects}=useContentIndex();
 const [search,setSearch]=useState(initialContext?.query??'');
 const [expanded,setExpanded]=useState<string|null>(initialContext?initialContext.expanded:initialTermId??null);
 const [card,setCard]=useState<{term:GlossaryTerm;front:string;back:string}|null>(null);
 const [notice,setNotice]=useState('');
 const list=useRef<FlatList<GlossaryTerm>>(null);
 const context=useRef<GlossaryState>(initialContext??{query:'',expanded:initialTermId??null,y:0});
 const [initialOffset]=useState(()=>({x:0,y:Math.max(0,initialContext?.y??0)}));
 const pendingOffset=useRef(initialOffset.y > 0 ? initialOffset.y : null);
 const searchTerms=useMemo(()=>prepareGlossarySearch(glossary),[glossary]);
 const deferred=useDeferredValue(search);
 const linked=initialTermId?content.term(initialTermId):undefined;
 const pinned=deferred.trim()?'':linked?.id;
 const items=useMemo(()=>{
  const results=searchTerms(deferred);
  return pinned?results.filter(term=>term.id!==pinned):results;
 },[searchTerms,deferred,pinned]);

 const update=(patch:Partial<GlossaryState>)=>{
  context.current={...context.current,...patch};
  onContextChange?.(context.current);
 };
 const searchFor=(query:string)=>{
  pendingOffset.current=null;
  setSearch(query);
  update({query,y:0});
  list.current?.scrollToOffset({offset:0,animated:false});
 };
 useEffect(()=>{setCard(null);setNotice('')},[user?.uid]);

 const renderTerm=(term:GlossaryTerm)=>{
  const open=expanded===term.id;
  const article=content.article(term.articleId);
  return <Panel>
   <Pressable accessibilityRole="button" accessibilityLabel={term.term} aria-expanded={open} accessibilityState={{expanded:open}} onPress={()=>{
    Keyboard.dismiss();
    const value=open?null:term.id;
    setExpanded(value);
    update({expanded:value});
   }} style={{flexDirection:'row',gap:10,alignItems:'center',minHeight:44}}>
    <View style={{flex:1,gap:4}}><Text style={{color:colors.text,fontSize:18,fontWeight:'600'}}>{term.term}</Text>
     <Muted>{subjects.find(s=>s.id===term.subjectId)?.title}</Muted></View>
    {open?<ChevronUp size={18} color={colors.muted}/>:<ChevronDown size={18} color={colors.muted}/>}
   </Pressable>
   {open&&<>
    <Body>{term.definition}</Body>
    {term.example&&<View style={{backgroundColor:colors.highlight,padding:12,borderRadius:11,gap:5}}><Muted>BEISPIEL</Muted><Body>{term.example}</Body></View>}
    <Row>
     {article&&<Button title="Zum Artikel" onPress={()=>{Keyboard.dismiss();onArticle(article.id)}}/>}
     <Button title="Karte erstellen" onPress={()=>setCard({term,front:'Was bedeutet „'+term.term+'“?',back:term.definition+(term.example?'\n\nBeispiel: '+term.example:'')})}/>
    </Row>
   </>}
  </Panel>;
 };

 return <>
  <FlatList ref={list} data={items} keyExtractor={term=>term.id} testID="glossary-list"
   renderItem={({item})=>renderTerm(item)} extraData={expanded} style={{flex:1}}
   keyboardShouldPersistTaps="handled" initialNumToRender={10} maxToRenderPerBatch={12} windowSize={7}
   contentOffset={initialOffset}
   onContentSizeChange={(_,height)=>{
    const target=pendingOffset.current;
    if(target!==null&&height>target){
     pendingOffset.current=null;
     list.current?.scrollToOffset({offset:target,animated:false});
    }
   }}
   onScrollBeginDrag={()=>{pendingOffset.current=null}}
   onScroll={event=>{
    const y=event.nativeEvent.contentOffset.y;
    if(pendingOffset.current===null&&y!==context.current.y)update({y});
   }}
   scrollEventThrottle={250} contentContainerStyle={{paddingHorizontal:11,paddingTop:14,paddingBottom:24}}
   ItemSeparatorComponent={()=> <View style={{height:10}}/>}
   ListHeaderComponent={<View style={{gap:10,marginBottom:10}}>
    <Heading>Begriffsglossar</Heading>
    <View style={[styles.search,{backgroundColor:colors.surface,borderColor:colors.border}]}>
     <Search size={19} color={colors.muted}/><TextInput accessibilityLabel="Glossar durchsuchen" value={search} onChangeText={searchFor} placeholder="Begriff suchen …" placeholderTextColor={colors.muted} style={{flex:1,color:colors.text,fontSize:16,minHeight:44}}/>
     {!!search&&<Button title="Suche leeren" onPress={()=>searchFor('')}/>}
    </View>
    {initialTermId&&!linked&&<Muted>Der verlinkte Begriff ist nicht mehr verfügbar.</Muted>}
    {!!notice&&<Text accessibilityLiveRegion="polite" style={{color:colors.accent}}>{notice}</Text>}
    {pinned&&linked?renderTerm(linked):null}
   </View>}
   ListEmptyComponent={pinned?undefined:<Muted>Kein passender Begriff gefunden.</Muted>}
  />
  {card&&<CardEditor key={user?.uid??'guest'} initial={{subjectId:card.term.subjectId,articleId:content.article(card.term.articleId)?.id,front:card.front,back:card.back}} source={[card.term.term,card.term.definition,card.term.example].filter(Boolean).join('\n')} frontLabel="Frage der Karteikarte" backLabel="Antwort der Karteikarte" saveLabel="Karte speichern" onClose={()=>setCard(null)} onSaved={(count=1)=>setNotice(count===1?'Karte im Lernfach gespeichert.':count+' Karten im Lernfach gespeichert.')}/>}
 </>;
}

const styles = StyleSheet.create({ search: { flexDirection: 'row', alignItems: 'center', gap: 8, borderWidth: 1, borderRadius: 12, paddingHorizontal: 11 } });

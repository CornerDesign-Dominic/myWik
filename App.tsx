import React, { useEffect, useState } from 'react';
import { ActivityIndicator, AppState, BackHandler, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ArrowLeft, BookOpen, ChevronRight, Layers, Search, Settings, Star, Bookmark, X } from 'lucide-react-native';
import { StoreProvider, useStore } from './src/state/Store';
import { ThemeProvider, useTheme, Page, Heading, Body, Muted, Button, Row } from './src/components/ui';
import { SubjectsScreen, ChaptersScreen } from './src/screens/SubjectsScreen';
import { ArticleScreen } from './src/screens/ArticleScreen';
import { GlossaryScreen } from './src/screens/GlossaryScreen';
import { CardsScreen, SuccessScreen, LaterScreen, RecommendationsScreen, SettingsScreen } from './src/screens/LearningScreens';
import { ChatPanel } from './src/components/ChatPanel';
import { MeiWikAvatar } from './src/components/MeiWikAvatar';
import { ModalLayout } from './src/components/ModalLayout';
import {initialNavigation,pushRoute,popRoute,resetNavigation,type GlossaryState} from './src/services/navigation';
import { useCurrentTime } from './src/services/useCurrentTime';
import { useLearningTimer } from './src/services/useLearningTimer';
import { syncReminders } from './src/services/reminders';
import type { Article, Route } from './src/types';
import { content, loadContentCache, refreshContent, useContentIndex } from './src/services/contentSync';
import { clearExpiredChats } from './src/services/chatStorage';

class ErrorBoundary extends React.Component<{children:React.ReactNode},{error:Error|null}>{state={error:null as Error|null};static getDerivedStateFromError(error:Error){return{error}}render(){return this.state.error?<View style={{flex:1,backgroundColor:'#101619',padding:28,justifyContent:'center',gap:16}}><Text style={{color:'#d6dcdf',fontSize:22}}>myWik konnte diese Ansicht nicht öffnen.</Text><Text style={{color:'#a5b1b8'}}>Deine gespeicherten Daten bleiben erhalten. Bitte starte die App erneut.</Text></View>:this.props.children}}

function HomeScreen({navigate}:{navigate:(r:Route)=>void}) {
 const {subjects,glossary}=useContentIndex();
 const{colors}=useTheme();const{data}=useStore();const now=useCurrentTime();const today=new Date(now);const day=`${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
 const minutes=Math.floor(data.sessions.filter(s=>s.day===day).reduce((n,s)=>n+s.seconds,0)/60);
 const available=data.recommendations.filter(r=>r.state==='open'||(r.state==='snoozed'&&r.dueAt<=now)).length;
 const tiles=[
 {title:'Fächer',sub:`${subjects.length} Fächer`,icon:BookOpen,route:'subjects'},
 {title:'Begriffsglossar',sub:`${glossary.length} Begriffe`,icon:Search,route:'glossary'},
 {title:'Karteikarten',sub:`${data.cards.length} ${data.cards.length===1?'Karte':'Karten'}`,icon:Layers,route:'cards'},
 {title:'Deine Erfolge',sub:`${minutes} Minuten heute`,icon:Star,route:'success'},
 {title:'Für später',sub:`${data.later.filter(x=>x.status==='open').length} offene Einträge`,icon:Bookmark,route:'later'},
 {title:'MeiWik Empfehlungen',sub:`${available} ${available===1?'Empfehlung':'Empfehlungen'}`,icon:null,route:'recommendations'}
 ] as const;
 return <Page><Heading>Start</Heading>{tiles.map(tile=><Pressable key={tile.title} accessibilityRole="button" onPress={()=>navigate({name:tile.route})} style={({pressed})=>[styles.tile,{backgroundColor:colors.surface,borderColor:colors.border,opacity:pressed?.75:1}]}><View style={{width:40,height:40,alignItems:'center',justifyContent:'center',backgroundColor:colors.accentSoft,borderRadius:11}}>{tile.icon?<tile.icon color={colors.accent} size={22}/>:<MeiWikAvatar size={36}/>}</View><View style={{flex:1,gap:3}}><Text style={{color:colors.text,fontSize:17,fontWeight:'600'}}>{tile.title}</Text><Muted>{tile.sub}</Muted></View><ChevronRight size={18} color={colors.muted}/></Pressable>)}</Page>
}

function Application() {
 const now=useCurrentTime();
 const{colors,mode}=useTheme();const store=useStore();const[nav,setNav]=useState(initialNavigation);const history=nav.entries;const entry=history[history.length-1];const route=entry.route;
 const catalogue=useContentIndex();
 const[newContent,setNewContent]=useState(0);
 const[termId,setTermId]=useState<string|null>(null);const[chatOpen,setChatOpen]=useState(false);const[chatSection,setChatSection]=useState<string>();
 const articleId=route.name==='article'?route.articleId:undefined;
 const summary=content.article(articleId);
 const [loaded,setLoaded]=useState<{id:string;article?:Article;failed?:boolean}>();
 const [articleRetry,setArticleRetry]=useState(0);
 const article=loaded?.id===articleId?loaded?.article:undefined;
 const articleFailed=loaded?.id===articleId&&loaded?.failed;
 useEffect(()=>{
  if(!articleId||!summary)return;
  let active=true;
  void content.loadArticle(articleId).then(article=>{if(active)setLoaded({id:articleId,article,failed:!article})},()=>{if(active)setLoaded({id:articleId,failed:true})});
  return()=>{active=false};
 },[articleId,summary,articleRetry]);
 const{touch}=useLearningTimer(article?.subjectId,'article',article?.id);
 const navigate=(next:Route)=>{setChatOpen(false);setTermId(null);setNav(prev=>pushRoute(prev,next));};
 const back=()=>{if(termId){setTermId(null);return true}if(chatOpen){setChatOpen(false);return true}if(history.length>1){setNav(popRoute);return true}return false};
 useEffect(()=>{const sub=BackHandler.addEventListener('hardwareBackPress',back);return()=>sub.remove()},[history,termId,chatOpen]);
 useEffect(()=>{setChatOpen(false);setTermId(null)},[store.user?.uid]);
 useEffect(()=>{if(termId&&!content.term(termId))setTermId(null);if(chatSection&&article&&!article.sections.some(s=>s.id===chatSection))setChatSection(undefined)},[catalogue,article]);
 useEffect(()=>{void loadContentCache().catch(()=>{});void clearExpiredChats().catch(()=>{});},[]);
 useEffect(()=>{if(!store.online)return;let mounted=true;let pending=false;let checkedAt=0;const refresh=async()=>{if(pending||Date.now()-checkedAt<60_000)return;pending=true;try{const updated=await refreshContent();checkedAt=Date.now();if(mounted&&updated)setNewContent(n=>n+1)}catch{/* Keep the bundled or previously downloaded catalogue. */}finally{pending=false}};void refresh();const listener=AppState.addEventListener('change',state=>{if(state==='active'){void clearExpiredChats().catch(()=>{});void refresh()}});return()=>{mounted=false;listener.remove()}},[store.online]);
 const openRecommendations=store.data.recommendations.filter(r=>r.state==='open'||(r.state==='snoozed'&&r.dueAt<=now)).length;
 useEffect(()=>{if(!store.ready)return;const schedule=()=>{void syncReminders(store.data.settings,{recommendations:openRecommendations,news:newContent},store.user?.uid??'guest')};schedule();const sub=AppState.addEventListener('change',state=>{if(state==='active')schedule()});return()=>sub.remove()},[store.ready,JSON.stringify(store.data.settings.reminders),openRecommendations,newContent,store.user?.uid]);
 useEffect(()=>{if(Platform.OS==='web')return;let cancelled=false;let remove:(()=>void)|undefined;void import('expo-notifications').then(notifications=>{if(cancelled)return;notifications.setNotificationHandler({handleNotification:async()=>({shouldShowBanner:true,shouldShowList:true,shouldPlaySound:false,shouldSetBadge:false})});const handle=(response:any)=>{const payload=response.notification.request.content.data;if(payload.ownerKey!==(store.user?.uid??'guest'))return;const name=payload.route;if(['subjects','recommendations','cards'].includes(name))navigate({name} as Route)};const subscription=notifications.addNotificationResponseReceivedListener(handle);remove=()=>subscription.remove();void notifications.getLastNotificationResponseAsync().then(response=>{if(response){handle(response);void notifications.clearLastNotificationResponseAsync()}})}).catch(()=>{});return()=>{cancelled=true;remove?.()}},[store.user?.uid]);
 if(!store.ready)return <SafeAreaView style={{flex:1,backgroundColor:colors.background,alignItems:'center',justifyContent:'center',gap:16}}><ActivityIndicator color={colors.accent}/><Body>{store.error??'Dein Wissen wird geladen …'}</Body>{store.error&&<><Button title="Erneut laden" onPress={store.retryLoad}/>{store.user&&<Button title="Abmelden" onPress={()=>{void store.signOut().catch(()=>{})}}/>}</>}</SafeAreaView>;
 let screen:React.ReactNode;
 switch(route.name){case'home':screen=<HomeScreen navigate={navigate}/>;break;case'subjects':screen=<SubjectsScreen onSubject={subjectId=>navigate({name:'chapters',subjectId})}/>;break;case'chapters':screen=<ChaptersScreen key={entry.key} subjectId={route.subjectId} initialCollapsed={route.collapsed} onCollapsedChange={collapsed=>setNav(state=>({...state,entries:state.entries.map(e=>e.key===entry.key&&e.route.name==='chapters'?{...e,route:{...e.route,collapsed}}:e)}))} onArticle={articleId=>navigate({name:'article',articleId})}/>;break;case'article':screen=article?<ArticleScreen key={article.id} article={article} onActivity={touch} onGlossary={setTermId} onArticle={articleId=>navigate({name:'article',articleId})} onChat={section=>{touch();setChatSection(section);setChatOpen(true)}}/>:summary&&!articleFailed?<Page><Heading>{summary.title}</Heading><ActivityIndicator color={colors.accent}/></Page>:<Page><Heading>{summary?"Artikel konnte nicht geöffnet werden":"Artikel nicht gefunden"}</Heading>{summary&&<Button title="Erneut laden" onPress={()=>{setLoaded(undefined);setArticleRetry(n=>n+1)}}/>}<Button title="Zu den Fächern" onPress={()=>navigate({name:'subjects'})}/></Page>;break;case'glossary':screen=<GlossaryScreen key={entry.key} initialTermId={route.termId} initialContext={route.context} onContextChange={(context:GlossaryState)=>setNav(state=>({...state,entries:state.entries.map(e=>e.key===entry.key&&e.route.name==='glossary'?{...e,route:{...e.route,context}}:e)}))} onArticle={articleId=>navigate({name:'article',articleId})}/>;break;case'cards':screen=<CardsScreen/>;break;case'success':screen=<SuccessScreen/>;break;case'later':screen=<LaterScreen onArticle={articleId=>navigate({name:'article',articleId})}/>;break;case'recommendations':screen=<RecommendationsScreen onArticle={articleId=>navigate({name:'article',articleId})}/>;break;case'settings':screen=<SettingsScreen/>;break;}
 const term=content.term(termId);
 return <SafeAreaView style={{flex:1,backgroundColor:colors.background}}><StatusBar style={mode==='dark'?'light':'dark'}/><View style={[styles.header,{borderColor:colors.border}]}>{history.length>1?<Pressable accessibilityRole="button" accessibilityLabel="Zurück" onPress={back} style={styles.icon}><ArrowLeft color={colors.text} size={24}/></Pressable>:<View style={{width:28}}/>}<Pressable accessibilityRole="button" accessibilityLabel="Zur Startseite" onPress={()=>{setNav(resetNavigation);setChatOpen(false);setTermId(null);setChatSection(undefined)}}><Text style={{fontSize:24,fontWeight:'700',letterSpacing:-1,color:colors.text}}>myWik<Text style={{color:colors.accent}}>.</Text></Text></Pressable><Row><Pressable accessibilityRole="button" accessibilityLabel="Glossar durchsuchen" onPress={()=>{navigate({name:'glossary'})}} style={styles.icon}><Search size={21} color={colors.muted}/></Pressable><Pressable accessibilityRole="button" accessibilityLabel="Einstellungen" onPress={()=>navigate({name:'settings'})} style={styles.icon}><Settings color={colors.muted} size={21}/></Pressable></Row></View>
 <>{store.storageError&&<View style={{padding:11,gap:8}}><Text accessibilityRole="alert" style={{color:colors.danger}}>{store.storageError}</Text><Button title="Speichern erneut versuchen" onPress={()=>void store.syncNow()}/></View>}</><View style={{flex:1,paddingBottom:article?56:0}} onTouchStart={touch}>{screen}{article&&<Pressable accessibilityRole="button" accessibilityLabel="MeiWik Chat öffnen" onPress={()=>{touch();setChatSection(undefined);setChatOpen(true)}} style={[styles.fab,{backgroundColor:colors.accentSoft,borderColor:colors.accent}]}><MeiWikAvatar size={26}/><Text style={{color:colors.accent,fontWeight:'600'}}>MeiWik</Text></Pressable>}</View>
 <Modal visible={!!term} transparent statusBarTranslucent={Platform.OS==='android'} navigationBarTranslucent={Platform.OS==='android'} animationType={Platform.OS==='web'?'none':'fade'} onRequestClose={()=>setTermId(null)}><ModalLayout backgroundColor="rgba(0,0,0,.65)" align="center" padding={11}><ScrollView keyboardShouldPersistTaps="handled" style={[styles.term,{backgroundColor:colors.surface,borderColor:colors.border,maxHeight:'90%'}]} contentContainerStyle={{padding:15,gap:12}}><Row><Text style={{flex:1,color:colors.text,fontSize:23,fontWeight:'700'}}>{term?.term}</Text><Pressable accessibilityLabel="Begriff schließen" accessibilityRole="button" onPress={()=>setTermId(null)} style={styles.icon}><X color={colors.text} size={22}/></Pressable></Row><Body>{term?.definition}</Body>{term?.example&&<View style={{backgroundColor:colors.highlight,borderWidth:1,borderColor:colors.border,padding:11,borderRadius:10}}><Muted>BEISPIEL</Muted><Body>{term.example}</Body></View>}<Button title="Im Glossar öffnen" variant="primary" onPress={()=>{navigate({name:'glossary',termId:term?.id})}}/></ScrollView></ModalLayout></Modal>
 {article&&<ChatPanel article={article} sectionId={chatSection} visible={chatOpen} onMinimize={()=>setChatOpen(false)} onTouch={touch}/>}
 </SafeAreaView>;
}
function AccountApplication(){const{user}=useStore();return <Application key={user?.uid??'guest'}/>;}
export default function App(){return <ErrorBoundary><SafeAreaProvider><StoreProvider><ThemeProvider><AccountApplication/></ThemeProvider></StoreProvider></SafeAreaProvider></ErrorBoundary>}
const styles=StyleSheet.create({header:{paddingHorizontal:6,paddingVertical:6,borderBottomWidth:1,flexDirection:'row',alignItems:'center',justifyContent:'space-between'},icon:{minWidth:44,minHeight:44,alignItems:'center',justifyContent:'center'},tile:{flexDirection:'row',alignItems:'center',gap:10,padding:12,borderWidth:1,borderRadius:15},fab:{position:'absolute',right:11,bottom:6,flexDirection:'row',gap:8,alignItems:'center',paddingHorizontal:13,paddingVertical:11,borderRadius:28,borderWidth:1,elevation:4},scrim:{flex:1,backgroundColor:'rgba(0,0,0,.65)',justifyContent:'center',paddingHorizontal:11,paddingVertical:16},term:{borderRadius:18,borderWidth:1,maxWidth:520,width:'100%',alignSelf:'center'}});

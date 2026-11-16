import React, { useEffect, useState } from 'react';
import { ActivityIndicator, AppState, BackHandler, Modal, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ArrowLeft, BookOpen, ChevronRight, Glasses, Layers, Search, Settings, Star, Bookmark, X } from 'lucide-react-native';
import { StoreProvider, useStore } from './src/state/Store';
import { ThemeProvider, useTheme, Page, Heading, Body, Muted, Button, Row } from './src/components/ui';
import { subjects, articles, glossary } from './src/data/content';
import { SubjectsScreen, ChaptersScreen } from './src/screens/SubjectsScreen';
import { ArticleScreen } from './src/screens/ArticleScreen';
import { GlossaryScreen } from './src/screens/GlossaryScreen';
import { CardsScreen, SuccessScreen, LaterScreen, RecommendationsScreen, SettingsScreen } from './src/screens/LearningScreens';
import { ChatPanel } from './src/components/ChatPanel';
import { useLearningTimer } from './src/services/useLearningTimer';
import { syncReminders } from './src/services/reminders';
import type { Route } from './src/types';
import { loadContentCache, refreshContent } from './src/services/contentSync';
import { clearExpiredChats } from './src/services/chatStorage';

class ErrorBoundary extends React.Component<{children:React.ReactNode},{error:Error|null}>{state={error:null as Error|null};static getDerivedStateFromError(error:Error){return{error}}render(){return this.state.error?<View style={{flex:1,backgroundColor:'#101619',padding:28,justifyContent:'center',gap:16}}><Text style={{color:'#d6dcdf',fontSize:22}}>myWik konnte diese Ansicht nicht öffnen.</Text><Text style={{color:'#a5b1b8'}}>Deine gespeicherten Daten bleiben erhalten. Bitte starte die App erneut.</Text></View>:this.props.children}}

function HomeScreen({navigate}:{navigate:(r:Route)=>void}) {
 const{colors}=useTheme();const{data}=useStore();const today=new Date();const day=`${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
 const minutes=Math.floor(data.sessions.filter(s=>s.day===day).reduce((n,s)=>n+s.seconds,0)/60);
 const available=data.recommendations.filter(r=>r.state==='open'||(r.state==='snoozed'&&r.dueAt<=Date.now())).length;
 const tiles=[
 {title:'Fächer',sub:`${subjects.length} Fächer`,icon:BookOpen,route:'subjects'},
 {title:'Begriffsglossar',sub:`${glossary.length} Begriffe`,icon:Search,route:'glossary'},
 {title:'Karteikarten',sub:`${data.cards.length} ${data.cards.length===1?'Karte':'Karten'}`,icon:Layers,route:'cards'},
 {title:'Deine Erfolge',sub:`${minutes} Minuten heute`,icon:Star,route:'success'},
 {title:'Für später',sub:`${data.later.filter(x=>x.status==='open').length} offene Einträge`,icon:Bookmark,route:'later'},
 {title:'MeiWik Empfehlungen',sub:`${available} ${available===1?'Empfehlung':'Empfehlungen'}`,icon:Glasses,route:'recommendations'}
 ] as const;
 return <Page><Heading>Start</Heading>{tiles.map(tile=><Pressable key={tile.title} accessibilityRole="button" onPress={()=>navigate({name:tile.route})} style={({pressed})=>[styles.tile,{backgroundColor:colors.surface,borderColor:colors.border,opacity:pressed?.75:1}]}><View style={{padding:9,backgroundColor:colors.accentSoft,borderRadius:11}}><tile.icon color={colors.accent} size={22}/></View><View style={{flex:1,gap:3}}><Text style={{color:colors.text,fontSize:17,fontWeight:'600'}}>{tile.title}</Text><Muted>{tile.sub}</Muted></View><ChevronRight size={18} color={colors.muted}/></Pressable>)}</Page>
}

function Application() {
 const{colors,mode}=useTheme();const store=useStore();const[history,setHistory]=useState<Route[]>([{name:'home'}]);const route=history[history.length-1];
 const[catalogueRevision,setCatalogueRevision]=useState(0);const[newContent,setNewContent]=useState(0);
 const[termId,setTermId]=useState<string|null>(null);const[fullTermId,setFullTermId]=useState<string|undefined>();const[chatOpen,setChatOpen]=useState(false);const[chatSection,setChatSection]=useState<string>();
 const article=route.name==='article'?articles.find(a=>a.id===route.articleId):undefined;
 const{touch}=useLearningTimer(article?.subjectId,'article',article?.id);
 const navigate=(next:Route)=>{setChatOpen(false);setTermId(null);setHistory(prev=>[...prev,next]);};
 const back=()=>{if(termId){setTermId(null);return true}if(chatOpen){setChatOpen(false);return true}if(history.length>1){setHistory(prev=>prev.slice(0,-1));return true}return false};
 useEffect(()=>{const sub=BackHandler.addEventListener('hardwareBackPress',back);return()=>sub.remove()},[history,termId,chatOpen]);
 useEffect(()=>{setChatOpen(false);setTermId(null)},[store.user?.uid]);
 useEffect(()=>{void loadContentCache().then(loaded=>{if(loaded)setCatalogueRevision(n=>n+1)});void clearExpiredChats();},[]);
 useEffect(()=>{if(!store.online)return;let mounted=true;let pending=false;const refresh=async()=>{if(pending)return;pending=true;try{const result=await refreshContent();if(mounted&&result.updated){setCatalogueRevision(n=>n+1);setNewContent(n=>n+1)}}catch{/* Keep the bundled or previously downloaded catalogue. */}finally{pending=false}};void refresh();const listener=AppState.addEventListener('change',state=>{if(state==='active'){void clearExpiredChats();void refresh()}});return()=>{mounted=false;listener.remove()}},[store.online]);
 const openRecommendations=store.data.recommendations.filter(r=>r.state==='open'||(r.state==='snoozed'&&r.dueAt<=Date.now())).length;
 useEffect(()=>{if(!store.ready)return;const schedule=()=>{void syncReminders(store.data.settings,{recommendations:openRecommendations,news:newContent},store.user?.uid??'guest')};schedule();const sub=AppState.addEventListener('change',state=>{if(state==='active')schedule()});return()=>sub.remove()},[store.ready,JSON.stringify(store.data.settings.reminders),openRecommendations,newContent,store.user?.uid]);
 useEffect(()=>{if(Platform.OS==='web')return;let remove:(()=>void)|undefined;void import('expo-notifications').then(notifications=>{notifications.setNotificationHandler({handleNotification:async()=>({shouldShowBanner:true,shouldShowList:true,shouldPlaySound:false,shouldSetBadge:false})});const handle=(response:any)=>{const payload=response.notification.request.content.data;if(payload.ownerKey!==(store.user?.uid??'guest'))return;const name=payload.route;if(['subjects','recommendations','cards'].includes(name))navigate({name} as Route)};const subscription=notifications.addNotificationResponseReceivedListener(handle);remove=()=>subscription.remove();void notifications.getLastNotificationResponseAsync().then(response=>{if(response){handle(response);void notifications.clearLastNotificationResponseAsync()}})}).catch(()=>{});return()=>remove?.()},[store.user?.uid]);
 if(!store.ready)return <SafeAreaView style={{flex:1,backgroundColor:colors.background,alignItems:'center',justifyContent:'center',gap:16}}><ActivityIndicator color={colors.accent}/><Body>{store.error??'Dein Wissen wird geladen …'}</Body></SafeAreaView>;
 let screen:React.ReactNode;
 switch(route.name){case'home':screen=<HomeScreen navigate={navigate}/>;break;case'subjects':screen=<SubjectsScreen onSubject={subjectId=>navigate({name:'chapters',subjectId})}/>;break;case'chapters':screen=<ChaptersScreen subjectId={route.subjectId} onArticle={articleId=>navigate({name:'article',articleId})}/>;break;case'article':screen=article?<ArticleScreen key={article.id} article={article} onActivity={touch} onGlossary={setTermId} onChat={section=>{touch();setChatSection(section);setChatOpen(true)}}/>:<Page><Heading>Artikel nicht gefunden</Heading><Button title="Zu den Fächern" onPress={()=>navigate({name:'subjects'})}/></Page>;break;case'glossary':screen=<GlossaryScreen initialTermId={fullTermId} onArticle={articleId=>navigate({name:'article',articleId})}/>;break;case'cards':screen=<CardsScreen/>;break;case'success':screen=<SuccessScreen/>;break;case'later':screen=<LaterScreen onArticle={articleId=>navigate({name:'article',articleId})}/>;break;case'recommendations':screen=<RecommendationsScreen onArticle={articleId=>navigate({name:'article',articleId})}/>;break;case'settings':screen=<SettingsScreen/>;break;}
 const term=glossary.find(t=>t.id===termId);
 return <SafeAreaView style={{flex:1,backgroundColor:colors.background}}><StatusBar style={mode==='dark'?'light':'dark'}/><View style={[styles.header,{borderColor:colors.border}]}>{history.length>1?<Pressable accessibilityRole="button" accessibilityLabel="Zurück" onPress={back} style={styles.icon}><ArrowLeft color={colors.text} size={24}/></Pressable>:<View style={{width:28}}/>}<Pressable accessibilityRole="button" accessibilityLabel="Zur Startseite" onPress={()=>{setHistory([{name:'home'}]);setChatOpen(false)}}><Text style={{fontSize:24,fontWeight:'700',letterSpacing:-1,color:colors.text}}>myWik<Text style={{color:colors.accent}}>.</Text></Text></Pressable><Row><Pressable accessibilityRole="button" accessibilityLabel="Glossar durchsuchen" onPress={()=>{setFullTermId(undefined);navigate({name:'glossary'})}} style={styles.icon}><Search size={21} color={colors.muted}/></Pressable><Pressable accessibilityRole="button" accessibilityLabel="Einstellungen" onPress={()=>navigate({name:'settings'})} style={styles.icon}><Settings color={colors.muted} size={21}/></Pressable></Row></View>
 <View style={{flex:1,paddingBottom:article?56:0}} onTouchStart={touch}>{screen}{article&&<Pressable accessibilityRole="button" accessibilityLabel="MeiWik Chat öffnen" onPress={()=>{touch();setChatOpen(true)}} style={[styles.fab,{backgroundColor:colors.accentSoft,borderColor:colors.accent}]}><Glasses color={colors.accent} size={23}/><Text style={{color:colors.accent,fontWeight:'600'}}>MeiWik</Text></Pressable>}</View>
 <Modal visible={!!term} transparent animationType={Platform.OS==='web'?'none':'fade'} onRequestClose={()=>setTermId(null)}><View style={styles.scrim}><View style={[styles.term,{backgroundColor:colors.surface,borderColor:colors.border}]}><Row><Text style={{flex:1,color:colors.text,fontSize:23,fontWeight:'700'}}>{term?.term}</Text><Pressable accessibilityLabel="Begriff schließen" accessibilityRole="button" onPress={()=>setTermId(null)} style={styles.icon}><X color={colors.text} size={22}/></Pressable></Row><Body>{term?.definition}</Body>{term?.example&&<View style={{backgroundColor:colors.highlight,borderWidth:1,borderColor:colors.border,padding:11,borderRadius:10}}><Muted>BEISPIEL</Muted><Body>{term.example}</Body></View>}<Button title="Im Glossar öffnen" variant="primary" onPress={()=>{setFullTermId(term?.id);navigate({name:'glossary'})}}/></View></View></Modal>
 {article&&<ChatPanel article={article} sectionId={chatSection} visible={chatOpen} onMinimize={()=>setChatOpen(false)} onTouch={touch}/>}
 </SafeAreaView>;
}
export default function App(){return <ErrorBoundary><SafeAreaProvider><StoreProvider><ThemeProvider><Application/></ThemeProvider></StoreProvider></SafeAreaProvider></ErrorBoundary>}
const styles=StyleSheet.create({header:{paddingHorizontal:6,paddingVertical:6,borderBottomWidth:1,flexDirection:'row',alignItems:'center',justifyContent:'space-between'},icon:{minWidth:44,minHeight:44,alignItems:'center',justifyContent:'center'},tile:{flexDirection:'row',alignItems:'center',gap:10,padding:12,borderWidth:1,borderRadius:15},fab:{position:'absolute',right:11,bottom:6,flexDirection:'row',gap:8,alignItems:'center',paddingHorizontal:13,paddingVertical:11,borderRadius:28,borderWidth:1,elevation:4},scrim:{flex:1,backgroundColor:'rgba(0,0,0,.65)',justifyContent:'center',paddingHorizontal:11,paddingVertical:16},term:{padding:15,borderRadius:18,borderWidth:1,gap:12,maxWidth:520,width:'100%',alignSelf:'center'}});

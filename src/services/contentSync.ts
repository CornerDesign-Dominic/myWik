import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, getDocFromServer } from 'firebase/firestore';
import { db } from './firebase';
import { subjects, chapters, articles, glossary, contentVersion } from '../data/content';
import { isCatalogue, type Catalogue } from './catalogueModel';

const CACHE='@mywik/catalogue/v1';
let version=contentVersion;
function install(catalogue:Catalogue){
 if(catalogue.version<version)return false;
 subjects.splice(0,subjects.length,...catalogue.subjects);chapters.splice(0,chapters.length,...catalogue.chapters);
 articles.splice(0,articles.length,...catalogue.articles);glossary.splice(0,glossary.length,...catalogue.glossary);
 version=catalogue.version;return true;
}
export async function loadContentCache(){try{const raw=await AsyncStorage.getItem(CACHE);if(!raw)return false;const parsed:unknown=JSON.parse(raw);return isCatalogue(parsed)&&install(parsed)}catch{return false}}
export async function refreshContent():Promise<{updated:boolean;version:number}>{
 const snapshot=await getDocFromServer(doc(db,'catalog','current'));
 if(!snapshot.exists())return{updated:false,version};
 const value:unknown=snapshot.data();if(!isCatalogue(value))throw new Error('Der neue Artikelkatalog ist unvollständig. Der bisherige Offline-Inhalt bleibt verfügbar.');
 if(value.version<=version)return{updated:false,version};
 // Persist before publishing so a failed save never advertises offline availability.
 await AsyncStorage.setItem(CACHE,JSON.stringify(value));install(value);return{updated:true,version};
}

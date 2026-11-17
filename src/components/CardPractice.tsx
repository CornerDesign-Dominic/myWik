import React, { useEffect, useRef, useState } from 'react';
import { Keyboard, TextInput, View, Text } from 'react-native';
import { practiceFlashcard } from '../services/meiwik';
import type { Flashcard } from '../types';
import { Body, Button, Muted, useTheme } from './ui';
import { ChatMessageBody } from './ChatMessageBody';

export function CardPractice({card,online,onActivity}:{card:Flashcard;online:boolean;onActivity:()=>void}) {
  const {colors}=useTheme();
  const [messages,setMessages]=useState<Array<{role:'user'|'assistant';content:string}>>([]);
  const [input,setInput]=useState(''); const [busy,setBusy]=useState(false); const [error,setError]=useState('');
  const alive=useRef(true); const pending=useRef(false); const field=useRef<React.ElementRef<typeof TextInput>>(null);
  useEffect(()=>{alive.current=true;return()=>{alive.current=false}},[]);
  const send=async()=>{
    if(pending.current||!input.trim()||!online)return;
    pending.current=true;setBusy(true);setError('');field.current?.blur();Keyboard.dismiss();onActivity();
    const answer=input.trim();
    try {const reply=await practiceFlashcard(card,answer,messages);if(alive.current){setMessages(old=>[...old,{role:'user',content:answer},{role:'assistant',content:reply}]);setInput('');}}
    catch(e){if(alive.current)setError(e instanceof Error?e.message:'MeiWik konnte nicht antworten.');}
    finally{pending.current=false;if(alive.current)setBusy(false);}
  };
  return <View style={{gap:10}}>
    <Muted>Dieser Übungschat wird beim Kartenwechsel oder Verlassen verworfen. Deine Selbsteinschätzung bestimmst nur du.</Muted>
    {messages.map((m,i)=><View key={i} style={{padding:10,backgroundColor:m.role==='user'?colors.surface:colors.accentSoft,borderRadius:12}}><Muted>{m.role==='user'?'Deine Antwort':'MeiWik'}</Muted>{m.role==='assistant'?<ChatMessageBody content={m.content}/>:<Body>{m.content}</Body>}</View>)}
    {!online && <Muted>MeiWik ist offline. Du kannst die Karte trotzdem umdrehen und dich selbst bewerten.</Muted>}
    {!!error && <Text accessibilityRole="alert" style={{color:colors.danger}}>{error}</Text>}
    <TextInput ref={field} accessibilityLabel="Meine Antwort auf die Karte" placeholder="Deine Antwort oder Nachfrage …" placeholderTextColor={colors.muted} value={input} onChangeText={text=>{setInput(text);onActivity()}} editable={!busy} multiline maxLength={4000} style={{padding:12,minHeight:80,maxHeight:160,color:colors.text,borderColor:colors.border,borderWidth:1,borderRadius:12}}/>
    <Button title={busy?'MeiWik prüft die Antwort …':'Antwort mit MeiWik besprechen'} disabled={busy||!input.trim()||!online} onPress={()=>void send()}/>
  </View>;
}

import React, { createContext, useContext } from 'react';
import { View, Text, Pressable, StyleSheet, useColorScheme, ScrollView, type ViewStyle, type StyleProp } from 'react-native';
import { useStore } from '../state/Store';

const palettes = {
 dark: { background:'#080b0d', surface:'#13191d', text:'#d6dcdf', muted:'#a5b1b8', border:'#2a353c', accent:'#8bc7bc', accentSoft:'#142724', highlight:'#111b1d', noteSurface:'#101719', gold:'#d8be83', danger:'#f5a49f', onAccent:'#0b2722' },
 light: { background:'#f6f5f1', surface:'#ffffff', text:'#233139', muted:'#5b6a73', border:'#d9e0de', accent:'#246d62', accentSoft:'#edf3ef', highlight:'#f0f4f2', noteSurface:'#f4f5f2', gold:'#866223', danger:'#a63334', onAccent:'#ffffff' },
};
type Colors = typeof palettes.dark;
const ThemeContext = createContext<{colors:Colors;mode:'dark'|'light'}>({colors:palettes.dark,mode:'dark'});
export function ThemeProvider({children}:{children:React.ReactNode}) {
 const {data}=useStore();const system=useColorScheme();
 const mode=data.settings.theme==='system'?(system==='dark'?'dark':'light'):data.settings.theme;
 return <ThemeContext.Provider value={{colors:palettes[mode],mode}}>{children}</ThemeContext.Provider>;
}
export const useTheme=()=>useContext(ThemeContext);
export function Page({children,style}:{children:React.ReactNode;style?:StyleProp<ViewStyle>}){const{colors}=useTheme();return <ScrollView style={{flex:1,backgroundColor:colors.background}} contentContainerStyle={[styles.page,style]} keyboardShouldPersistTaps="handled">{children}</ScrollView>}
export function Heading({children}:{children:React.ReactNode}){const{colors}=useTheme();return <Text accessibilityRole="header" style={[styles.heading,{color:colors.text}]}>{children}</Text>}
export function Body({children,style}:{children:React.ReactNode;style?:any}){const{colors}=useTheme();return <Text style={[styles.body,{color:colors.text},style]}>{children}</Text>}
export function Muted({children,style}:{children:React.ReactNode;style?:any}){const{colors}=useTheme();return <Text style={[styles.muted,{color:colors.muted},style]}>{children}</Text>}
export function Button({title,onPress,variant='secondary',disabled=false,style}:{title:string;onPress:()=>void;variant?:'primary'|'secondary'|'ghost';disabled?:boolean;style?:StyleProp<ViewStyle>}){const{colors}=useTheme();return <Pressable accessibilityRole="button" disabled={disabled} onPress={onPress} style={({pressed})=>[styles.button,{backgroundColor:variant==='primary'?colors.accent:variant==='ghost'?'transparent':colors.surface,borderColor:variant==='ghost'?'transparent':colors.border,opacity:disabled?.45:pressed?.75:1},style]}><Text style={{fontSize:14,fontWeight:'600',color:variant==='primary'?colors.onAccent:colors.text,textAlign:'center'}}>{title}</Text></Pressable>}
export function Panel({children,style}:{children:React.ReactNode;style?:StyleProp<ViewStyle>}){const{colors}=useTheme();return <View style={[styles.panel,{backgroundColor:colors.surface,borderColor:colors.border},style]}>{children}</View>}
export function Row({children,style}:{children:React.ReactNode;style?:StyleProp<ViewStyle>}){return <View style={[styles.row,style]}>{children}</View>}
const styles=StyleSheet.create({page:{paddingHorizontal:11,paddingTop:14,paddingBottom:24,gap:10},heading:{fontSize:28,lineHeight:35,fontWeight:'700',letterSpacing:-.65,marginBottom:4},body:{fontSize:16,lineHeight:26},muted:{fontSize:13,lineHeight:20},panel:{padding:12,borderWidth:1,borderRadius:14,gap:8},row:{flexDirection:'row',alignItems:'center',flexWrap:'wrap',gap:6},button:{minHeight:44,justifyContent:'center',paddingHorizontal:11,paddingVertical:8,borderWidth:1,borderRadius:12}});

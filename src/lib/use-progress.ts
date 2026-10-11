import { useEffect, useState } from 'react';
const key='campusconnect-demo-progress';
export function useProgress(){const [completed,setCompleted]=useState<string[]>([]);useEffect(()=>{try{const saved=localStorage.getItem(key);if(saved)setCompleted(JSON.parse(saved))}catch{}},[]);const toggle=(id:string)=>setCompleted(prev=>{const next=prev.includes(id)?prev.filter(x=>x!==id):[...prev,id];try{localStorage.setItem(key,JSON.stringify(next))}catch{}return next});return {completed,toggle}}

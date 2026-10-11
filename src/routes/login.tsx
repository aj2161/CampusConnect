import { createFileRoute } from '@tanstack/react-router';
import { AuthPage } from '@/components/campus/auth';
export const Route=createFileRoute('/login')({head:()=>({meta:[{title:'Sign | CampusConnect'},{name:'description',content:'Sign to your CampusConnect student portal.'},{property:'og:title',content:'Sign | CampusConnect'},{property:'og:description',content:'Sign to your CampusConnect student portal.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),component:()=> <AuthPage mode="login"/>});

import { createFileRoute } from '@tanstack/react-router';
import { AuthPage } from '@/components/campus/auth';
export const Route=createFileRoute('/register')({head:()=>({meta:[{title:'Register | CampusConnect'},{name:'description',content:'Register to your CampusConnect student portal.'},{property:'og:title',content:'Register | CampusConnect'},{property:'og:description',content:'Register to your CampusConnect student portal.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),component:()=> <AuthPage mode="register"/>});

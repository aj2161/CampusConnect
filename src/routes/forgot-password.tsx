import { createFileRoute } from '@tanstack/react-router';
import { AuthPage } from '@/components/campus/auth';
export const Route=createFileRoute('/forgot-password')({head:()=>({meta:[{title:'Reset | CampusConnect'},{name:'description',content:'Reset to your CampusConnect student portal.'},{property:'og:title',content:'Reset | CampusConnect'},{property:'og:description',content:'Reset to your CampusConnect student portal.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),component:()=> <AuthPage mode="forgot"/>});

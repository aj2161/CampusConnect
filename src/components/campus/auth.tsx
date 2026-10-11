import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { Eye, EyeOff, ArrowRight, ShieldCheck, BookOpen, Sparkles } from 'lucide-react';
import { Brand } from '@/components/campus/layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ErrorMessage } from '@/components/campus/primitives';
import { apiRequest, type Student } from '@/lib/api';
import { saveStudentSession } from '@/lib/auth-session';

type ApiMessage = { success?: boolean; message?: string; data?: Student | null };

function responseMessage(value: unknown): string {
  if (typeof value === 'string') return value;
  if (value && typeof value === 'object' && 'message' in value && typeof value.message === 'string') return value.message;
  return '';
}

function extractStudent(value: Student | ApiMessage | null): Student | null {
  if (!value || typeof value !== 'object') return null;
  if ('success' in value && value.success === false) return null;
  const candidate = 'data' in value ? value.data : value;
  return candidate && typeof candidate === 'object' && 'id' in candidate && candidate.id ? candidate as Student : null;
}

export type AuthMode = 'login' | 'register' | 'forgot';

type FormValues = {
  name: string;
  email: string;
  department: string;
  password: string;
  confirm: string;
  remember: boolean;
};

export function AuthPage({ mode }: { mode: AuthMode }) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [values, setValues] = useState<FormValues>({ name: '', email: '', department: '', password: '', confirm: '', remember: false });
  const update = (key: keyof FormValues, value: string | boolean) => setValues(v => ({ ...v, [key]: value }));

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    if (mode !== 'login' && values.password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (mode !== 'login' && values.password !== values.confirm) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      if (mode === 'login') {
        const response = await apiRequest<Student | ApiMessage | null>('/login', {
          method: 'POST',
          body: JSON.stringify({ email: values.email.trim(), password: values.password }),
        });
        console.log('Login API response:', response);
        const student = extractStudent(response);
        if (!student) throw new Error(responseMessage(response) || 'Invalid email or password. Please try again.');
        saveStudentSession(student);
        // Full navigation ensures the dashboard starts with the saved session available.
        window.location.assign('/dashboard');
        return;
      } else if (mode === 'register') {
        const response = await apiRequest<Student | ApiMessage | null>('/students', {
          method: 'POST',
          body: JSON.stringify({ name: values.name.trim(), email: values.email.trim(), department: values.department, password: values.password }),
        });
        const student = extractStudent(response);
        if (!student?.id) throw new Error(responseMessage(response) || 'Registration could not be completed. Please try again.');
        window.alert('Account created successfully. Please sign in with your new account.');
        await navigate({ to: '/login' });
      } else {
        const response = await apiRequest<string | ApiMessage>('/reset-password', {
          method: 'POST',
          body: JSON.stringify({ email: values.email.trim(), password: values.password }),
        });
        const message = responseMessage(response);
        const success = typeof response === 'string'
          ? !message.toLowerCase().includes('not found') && !message.toLowerCase().includes('failed')
          : response !== null && typeof response === 'object' && response.success === true;
        if (!success) throw new Error(message || 'Password reset failed. Please check your email address.');
        window.alert(message || 'Password updated successfully. Please sign in with your new password.');
        await navigate({ to: '/login' });
      }
    } catch (err) {
      console.error('Authentication error:', err);
      setError(err instanceof Error ? err.message : responseMessage(err) || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return <div className="auth-page"><div className="auth-side"><div className="auth-side-top"><Brand/></div><div className="auth-side-content"><div className="auth-decoration"><div className="auth-decoration-inner"><BookOpen size={65}/></div><span className="float-tag tag-one"><Sparkles size={16}/> Your journey starts here</span><span className="float-tag tag-two"><ShieldCheck size={17}/> One place for everything</span></div><span className="eyebrow">YOUR CAMPUS. CONNECTED.</span><h2>Everything you need<br/>to make the most of<br/><em>campus life.</em></h2><p>Learn, discover, and connect — all in one thoughtfully designed space.</p></div><div className="auth-side-bottom">© 2026 CampusConnect <span>Made for the way you learn.</span></div></div><div className="auth-main"><div className="auth-mobile-brand"><Brand/></div><div className="auth-form-wrap"><span className="eyebrow">{mode==='login'?'WELCOME BACK':mode==='register'?'JOIN CAMPUSCONNECT':'ACCOUNT RECOVERY'}</span><h1>{mode==='login'?'Sign in to your account':mode==='register'?'Create your account':'Reset your password'}</h1><p className="auth-subtitle">{mode==='login'?'Good to have you back. Your campus is waiting.':mode==='register'?'A better campus experience begins here.':'Enter your details to get back into your account.'}</p><form onSubmit={submit} className="auth-form">{mode==='register'&&<label>Full name<Input required autoComplete="name" value={values.name} onChange={e=>update('name',e.target.value)} placeholder="Your full name"/></label>}<label>Email address<Input required type="email" autoComplete="email" value={values.email} onChange={e=>update('email',e.target.value)} placeholder="you@campus.edu"/></label>{mode==='register'&&<label>Department<select required value={values.department} onChange={e=>update('department',e.target.value)}><option value="">Select your department</option><option>Computer Science</option><option>Engineering</option><option>Business</option><option>Design</option><option>Arts & Humanities</option><option>Other</option></select></label>}<label>{mode==='forgot'?'New password':'Password'}<div className="password-field"><Input required minLength={mode==='login'?undefined:8} type={show?'text':'password'} autoComplete={mode==='login'?'current-password':'new-password'} value={values.password} onChange={e=>update('password',e.target.value)} placeholder={mode==='login'?'Enter your password':'At least 8 characters'}/><Button type="button" variant="ghost" size="icon" onClick={()=>setShow(!show)} aria-label={show?'Hide password':'Show password'}>{show?<EyeOff size={18}/>:<Eye size={18}/>}</Button></div></label>{mode!=='login'&&<label>Confirm password<Input required type={show?'text':'password'} autoComplete="new-password" value={values.confirm} onChange={e=>update('confirm',e.target.value)} placeholder="Confirm your password"/></label>}{mode==='login'&&<div className="auth-options"><label className="remember"><input type="checkbox" checked={values.remember} onChange={e=>update('remember',e.target.checked)}/> Remember me</label><Link to="/forgot-password">Forgot password?</Link></div>}{error&&<ErrorMessage message={error}/>}<Button type="submit" size="lg" className="auth-submit" disabled={loading}>{loading?'Please wait...':mode==='login'?'Sign in':mode==='register'?'Create account':'Reset password'} {!loading&&<ArrowRight size={18}/>}</Button></form><div className="auth-switch">{mode==='login'?<>New to CampusConnect? <Link to="/register">Create an account</Link></>:mode==='register'?<>Already have an account? <Link to="/login">Sign in</Link></>:<Link to="/login">← Back to sign in</Link>}</div></div><div className="auth-footer">A better way to experience campus.</div></div></div>;
}

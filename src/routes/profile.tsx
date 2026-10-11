import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState, type FormEvent } from 'react';
import { GraduationCap, LockKeyhole, Pencil, UserRound } from 'lucide-react';
import { PortalLayout } from '@/components/campus/layout';
import { PageHeader, ProfileCard, Modal, ModalContent, ModalHeader, ModalTitle, ModalDescription } from '@/components/campus/primitives';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { apiRequest, type Student } from '@/lib/api';
import { getStoredStudent, getStoredStudentId, saveStudentSession } from '@/lib/auth-session';

export const Route = createFileRoute('/profile')({
  head: () => ({ meta: [{ title: 'My Profile | CampusConnect' }, { name: 'description', content: 'View and manage your student profile.' }] }),
  component: Profile,
});

function Profile() {
  const [student, setStudent] = useState<Student | null>(() => getStoredStudent());
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [draft, setDraft] = useState({ name: student?.name ?? '', email: student?.email ?? '', department: student?.department ?? '' });
  const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });

  useEffect(() => {
    const id = getStoredStudentId();
    if (!id) { setLoading(false); return; }
    let active = true;
    apiRequest<Student>(`/students/${id}`)
      .then((result) => {
        if (!active || !result?.id) return;
        setStudent(result);
        saveStudentSession(result);
        setDraft({ name: result.name ?? '', email: result.email ?? '', department: result.department ?? '' });
      })
      .catch((err: unknown) => { if (active) setError(err instanceof Error ? err.message : 'Could not load profile.'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  async function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!student) { setError('Please log in again before updating your profile.'); return; }
    setSaving(true); setError(''); setSuccess('');
    try {
      const updated = await apiRequest<Student>(`/students/${student.id}`, {
        method: 'PUT', body: JSON.stringify({ name: draft.name.trim(), email: draft.email.trim(), department: draft.department.trim() }),
      });
      const safeUpdated = { ...student, ...updated, name: updated?.name ?? draft.name.trim(), email: updated?.email ?? draft.email.trim(), department: updated?.department ?? draft.department.trim() };
      setStudent(safeUpdated); saveStudentSession(safeUpdated); setDraft({ name: safeUpdated.name, email: safeUpdated.email, department: safeUpdated.department ?? '' });
      setEditOpen(false); setSuccess('Profile updated successfully.');
    } catch (err) { setError(err instanceof Error ? err.message : 'Unable to update your profile.'); }
    finally { setSaving(false); }
  }

  async function changePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(''); setSuccess('');
    if (!student) { setError('Please log in again before changing your password.'); return; }
    if (passwords.newPassword.length < 6) { setError('Your new password must contain at least 6 characters.'); return; }
    if (passwords.newPassword !== passwords.confirmPassword) { setError('The new passwords do not match.'); return; }
    setSaving(true);
    try {
      await apiRequest<string>('/change-password', { method: 'POST', body: JSON.stringify({ id: student.id, email: student.email, currentPassword: passwords.currentPassword, newPassword: passwords.newPassword }) });
      setPasswordOpen(false); setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' }); setSuccess('Password changed successfully.');
    } catch (err) { setError(err instanceof Error ? err.message : 'Unable to change your password.'); }
    finally { setSaving(false); }
  }

  const profileStudent = { name: student?.name || 'Student', email: student?.email || '—', id: student?.id ? String(student.id) : '—', department: student?.department || 'Not set' };
  return <PortalLayout>
    <PageHeader eyebrow="ACCOUNT / PROFILE" title="My profile" description="Your campus identity and academic details." action={<Button variant="outline" onClick={() => { setError(''); setEditOpen(true); }}><Pencil size={16}/> Edit profile</Button>} />
    {loading && <p className="muted-copy" role="status">Loading your latest student details…</p>}
    {error && <div className="error-message" role="alert">{error}</div>}
    {success && <p className="profile-success" role="status">{success}</p>}
    <ProfileCard student={profileStudent} />
    <div className="profile-grid">
      <section className="profile-panel"><div className="section-heading"><h2>Personal information</h2><UserRound size={19}/></div><div className="info-row"><span>Full name</span><strong>{profileStudent.name}</strong></div><div className="info-row"><span>Email address</span><strong>{profileStudent.email}</strong></div><div className="info-row"><span>Student ID</span><strong>{profileStudent.id}</strong></div></section>
      <section className="profile-panel"><div className="section-heading"><h2>Academic information</h2><GraduationCap size={20}/></div><div className="info-row"><span>Department</span><strong>{profileStudent.department}</strong></div></section>
    </div>
    <section className="profile-panel account-panel"><div className="section-heading"><h2>Account settings</h2><LockKeyhole size={19}/></div><div className="account-setting"><div><strong>Password</strong><p>Choose a strong password and keep it private.</p></div><Button variant="outline" onClick={() => { setError(''); setPasswordOpen(true); }}>Change password</Button></div></section>
    <Modal open={editOpen} onOpenChange={setEditOpen}><ModalContent><ModalHeader><ModalTitle>Edit profile</ModalTitle><ModalDescription>Update your personal and department information.</ModalDescription></ModalHeader><form className="profile-form" onSubmit={saveProfile}><label htmlFor="profile-name">Full name</label><Input id="profile-name" value={draft.name} onChange={e => setDraft(v => ({ ...v, name: e.target.value }))} required maxLength={100}/><label htmlFor="profile-email">Email address</label><Input id="profile-email" type="email" value={draft.email} onChange={e => setDraft(v => ({ ...v, email: e.target.value }))} required maxLength={150}/><label htmlFor="profile-department">Department</label><Input id="profile-department" value={draft.department} onChange={e => setDraft(v => ({ ...v, department: e.target.value }))} maxLength={100}/>{error && <p className="error-message" role="alert">{error}</p>}<div className="profile-form-actions"><Button type="button" variant="outline" onClick={() => setEditOpen(false)} disabled={saving}>Cancel</Button><Button type="submit" disabled={saving}>{saving ? 'Saving…' : 'Save changes'}</Button></div></form></ModalContent></Modal>
    <Modal open={passwordOpen} onOpenChange={setPasswordOpen}><ModalContent><ModalHeader><ModalTitle>Change password</ModalTitle><ModalDescription>Enter your current password, then choose a new one.</ModalDescription></ModalHeader><form className="profile-form" onSubmit={changePassword}><label htmlFor="current-password">Current password</label><Input id="current-password" type="password" autoComplete="current-password" value={passwords.currentPassword} onChange={e => setPasswords(v => ({ ...v, currentPassword: e.target.value }))} required/><label htmlFor="new-password">New password</label><Input id="new-password" type="password" autoComplete="new-password" minLength={6} value={passwords.newPassword} onChange={e => setPasswords(v => ({ ...v, newPassword: e.target.value }))} required/><label htmlFor="confirm-password">Confirm new password</label><Input id="confirm-password" type="password" autoComplete="new-password" minLength={6} value={passwords.confirmPassword} onChange={e => setPasswords(v => ({ ...v, confirmPassword: e.target.value }))} required/>{error && <p className="error-message" role="alert">{error}</p>}<div className="profile-form-actions"><Button type="button" variant="outline" onClick={() => setPasswordOpen(false)} disabled={saving}>Cancel</Button><Button type="submit" disabled={saving}>{saving ? 'Updating…' : 'Update password'}</Button></div></form></ModalContent></Modal>
  </PortalLayout>;
}

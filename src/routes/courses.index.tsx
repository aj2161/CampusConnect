import { createFileRoute } from '@tanstack/react-router';
import { useMemo, useState } from 'react';
import { BookOpen, Search, SlidersHorizontal, Target } from 'lucide-react';
import { PortalLayout } from '@/components/campus/layout';
import { PageHeader, CourseCard } from '@/components/campus/primitives';
import { courses } from '@/lib/campus-data';
import { useProgress } from '@/lib/use-progress';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/courses/')({
  head: () => ({ meta: [{ title: 'My Courses | CampusConnect' }, { name: 'description', content: 'Explore your enrolled courses and continue learning.' }] }),
  component: Courses,
});

function Courses() {
  const { completed } = useProgress();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'in-progress' | 'completed' | 'not-started'>('all');
  const summaries = useMemo(() => courses.map(course => {
    const done = course.topics.filter((_, i) => completed.includes(`${course.id}-${i}`)).length;
    return { course, done, total: course.topics.length, progress: course.topics.length ? Math.round(done / course.topics.length * 100) : 0 };
  }), [completed]);
  const filtered = summaries.filter(({ course, progress }) => {
    const text = `${course.title} ${course.code} ${course.instructor} ${course.description}`.toLowerCase();
    const matchesQuery = text.includes(query.trim().toLowerCase());
    const matchesFilter = filter === 'all' || (filter === 'completed' && progress === 100) || (filter === 'not-started' && progress === 0) || (filter === 'in-progress' && progress > 0 && progress < 100);
    return matchesQuery && matchesFilter;
  });
  const totalTopics = summaries.reduce((sum, item) => sum + item.total, 0);
  const completedTopics = summaries.reduce((sum, item) => sum + item.done, 0);
  return <PortalLayout>
    <PageHeader eyebrow="ACADEMICS / COURSES" title="My courses" description="Find a course, continue a lesson, and keep track of your learning." />
    <div className="course-overview"><div><span className="eyebrow">YOUR LEARNING JOURNEY</span><h2>Small steps.<br/>Real progress<span className="headline-dot">.</span></h2><p>Your progress updates as you mark topics complete. Pick up where you left off whenever you’re ready.</p></div><div className="overview-count"><strong>{String(courses.length).padStart(2, '0')}</strong><span>AVAILABLE COURSES</span></div></div>
    <div className="course-summary-strip"><div><BookOpen size={18}/><span><strong>{completedTopics} / {totalTopics}</strong><small>topics completed</small></span></div><div><Target size={18}/><span><strong>{totalTopics ? Math.round(completedTopics / totalTopics * 100) : 0}%</strong><small>overall progress</small></span></div></div>
    <section className="course-tools" aria-label="Course search and filters"><div className="course-search"><Search size={17}/><Input aria-label="Search courses" placeholder="Search by course, code, or instructor…" value={query} onChange={e => setQuery(e.target.value)}/></div><div className="course-filters"><SlidersHorizontal size={16}/>{([{key:'all',label:'All courses'},{key:'in-progress',label:'In progress'},{key:'not-started',label:'Not started'},{key:'completed',label:'Completed'}] as const).map(item => <Button key={item.key} type="button" size="sm" variant={filter === item.key ? 'default' : 'outline'} onClick={() => setFilter(item.key)}>{item.label}</Button>)}</div></section>
    <div className="courses-results-heading"><h2>{filter === 'all' ? 'Your learning library' : filter === 'in-progress' ? 'Courses in progress' : filter === 'completed' ? 'Completed courses' : 'Not started yet'}</h2><span>{filtered.length} {filtered.length === 1 ? 'course' : 'courses'}</span></div>
    {filtered.length ? <div className="courses-grid">{filtered.map(({ course, progress }) => <CourseCard key={course.id} course={course} progress={progress}/>)}</div> : <div className="empty-state"><BookOpen size={28}/><h3>No courses found</h3><p>Try another search or choose a different filter.</p><Button variant="outline" onClick={() => { setQuery(''); setFilter('all'); }}>Clear filters</Button></div>}
  </PortalLayout>;
}

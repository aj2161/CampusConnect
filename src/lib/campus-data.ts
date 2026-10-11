import { BookOpen, CalendarDays, Bell, Users, UserRound, CalendarClock, Code2, Globe2, Database, GraduationCap } from 'lucide-react';
export const student = { name: 'Alex Morgan', email: 'alex.morgan@campus.edu', department: 'Computer Science', id: 'CC-2024-0842', year: 'Third Year', semester: 'Semester 5' };
export const services = [
  { label: 'Courses', path: '/courses', icon: BookOpen, detail: 'Pick up where you left off', tone: 'blue' },
  { label: 'Schedule', path: '/schedule', icon: CalendarDays, detail: 'Your week, at a glance', tone: 'purple' },
  { label: 'Campus Notices', path: '/notices', icon: Bell, detail: 'Stay in the know', tone: 'amber' },
  { label: 'Events', path: '/events', icon: CalendarClock, detail: 'Find what’s happening', tone: 'pink' },
  { label: 'Community', path: '/community', icon: Users, detail: 'Connect with your peers', tone: 'green' },
  { label: 'Profile', path: '/profile', icon: UserRound, detail: 'Your campus identity', tone: 'cyan' },
] as const;
export const courses = [
  { id:'java', title:'Java Programming', code:'CS 301', instructor:'Dr. Sarah Mitchell', description:'Build a strong foundation in object-oriented programming, data structures, and modern Java.', icon: Code2, tone:'blue', topics:[
    {title:'Introduction to Java', description:'Get familiar with the Java ecosystem and write your first program.', content:'Java is a versatile, object-oriented programming language. In this topic, explore the JDK, JVM, and how Java programs are compiled and run. Start by creating a Hello World program, then experiment with variables, data types, and simple output.'},
    {title:'Variables & Data Types', description:'Understand primitives, strings, and how to store information.', content:'Variables give names to values in your programs. Java has primitive types such as int, double, boolean, and char. Practice declaring variables, assigning values, and using Strings to represent text.'},
    {title:'Control Flow', description:'Make decisions with conditionals and repeat tasks with loops.', content:'Use if and else statements to branch based on conditions. For repetition, practice for and while loops. Combine them to solve small problems and think about edge cases.'},
    {title:'Object-Oriented Programming', description:'Learn classes, objects, inheritance, and encapsulation.', content:'Classes define blueprints and objects are their instances. Design a class with fields and methods, then use constructors, access modifiers, inheritance, and interfaces to model real-world concepts.'},
    {title:'Collections & Generics', description:'Work confidently with lists, sets, maps, and reusable types.', content:'The Collections Framework provides flexible data structures. Compare ArrayList, HashSet, and HashMap, then apply generics to write type-safe reusable code.'},
    {title:'Exception Handling', description:'Handle unexpected errors gracefully.', content:'Exceptions represent exceptional conditions. Use try, catch, and finally, and learn when to throw or propagate an exception. Prefer meaningful error messages and careful recovery.'},
  ]},
  { id:'web', title:'Web Development', code:'CS 315', instructor:'Prof. Daniel Lee', description:'Design and build responsive web experiences with HTML, CSS, JavaScript, and React.', icon: Globe2, tone:'purple', topics:[
    {title:'How the Web Works',description:'Understand browsers, servers, and HTTP.',content:'The web connects browsers and servers through HTTP. Learn about requests, responses, URLs, and the document lifecycle before building your first page.'},
    {title:'Semantic HTML',description:'Structure accessible, meaningful web pages.',content:'HTML gives content structure. Use headings, landmarks, forms, and semantic elements to make pages readable for both people and assistive technology.'},
    {title:'CSS Layouts',description:'Create adaptive interfaces with Flexbox and Grid.',content:'CSS controls presentation. Practice spacing, typography, Flexbox, Grid, and responsive breakpoints to design layouts that work across screen sizes.'},
    {title:'JavaScript Fundamentals',description:'Add behavior and interactivity to your pages.',content:'Explore variables, functions, arrays, objects, and DOM events. Use JavaScript to update a page in response to user input.'},
    {title:'React Essentials',description:'Build reusable components and manage state.',content:'React lets you describe interfaces as components. Pass data through props, use state for interactions, and compose small components into complete experiences.'},
  ]},
  { id:'database', title:'Database Management', code:'CS 322', instructor:'Dr. Priya Shah', description:'Explore relational databases, SQL queries, schema design, and reliable data systems.', icon: Database, tone:'green', topics:[
    {title:'Database Foundations',description:'Meet relational data models and database systems.',content:'Databases organize information for reliable storage and retrieval. Learn about tables, rows, columns, primary keys, and relationships.'},
    {title:'SQL Queries',description:'Find and shape data with SQL.',content:'Use SELECT, WHERE, ORDER BY, and JOIN to answer questions from relational data. Practice filtering and combining records.'},
    {title:'Schema Design',description:'Model data with relationships and constraints.',content:'A thoughtful schema protects data quality. Create tables with primary and foreign keys, choose appropriate types, and apply constraints.'},
    {title:'Normalization',description:'Reduce duplication and improve consistency.',content:'Normalization organizes tables to reduce redundancy. Explore functional dependencies and the first three normal forms.'},
    {title:'Transactions',description:'Keep data consistent when operations fail.',content:'Transactions group database operations into a reliable unit. Study ACID properties and learn to commit or roll back changes safely.'},
  ]},
];
export const schedule = [
 {time:'09:00', end:'10:30', title:'Java Programming', instructor:'Dr. Sarah Mitchell', room:'Tech Hall · 204', type:'Lecture', tone:'blue'},
 {time:'11:00', end:'12:30', title:'Web Development', instructor:'Prof. Daniel Lee', room:'Innovation Lab · 12', type:'Workshop', tone:'purple'},
 {time:'14:00', end:'15:30', title:'Database Management', instructor:'Dr. Priya Shah', room:'Science Building · 310', type:'Lecture', tone:'green'},
];
export const notices = [
 {id:1,title:'Fall semester examination schedule released',description:'The final examination timetable for this semester is now available. Please review your dates and report any scheduling conflicts to the academic office.', date:'Oct 2, 2026', category:'Examination', important:true},
 {id:2,title:'Course registration opens next week',description:'Registration for the upcoming semester begins Monday. Meet with your academic advisor to finalize your course selections before the deadline.',date:'Sep 30, 2026',category:'Academic',important:true},
 {id:3,title:'Library extended hours during exam season',description:'The campus library will remain open until midnight throughout the examination period. Quiet study rooms can be reserved online.',date:'Sep 28, 2026',category:'General',important:false},
 {id:4,title:'Innovation Week: student showcase',description:'Share what you have been building this semester. Applications to present at Innovation Week are now open to all departments.',date:'Sep 25, 2026',category:'Events',important:false},
];
export const events = [
 {id:1,title:'Campus Innovation Showcase',date:'Oct 12, 2026',time:'10:00 AM – 4:00 PM',location:'Innovation Center',category:'Academic',description:'Explore inventive projects, meet student makers, and connect with faculty and industry mentors.', image:'innovation'},
 {id:2,title:'Fall Music & Arts Festival',date:'Oct 18, 2026',time:'5:00 PM – 9:00 PM',location:'University Lawn',category:'Campus Life',description:'An evening of live music, student art, good food, and the best of campus creativity.',image:'festival'},
];
export const initialPosts = [
 {id:1,name:'Maya Chen',initials:'MC',time:'2 hours ago',department:'Computer Science',text:'Anyone interested in forming a study group for the Java midterm? Thinking of meeting at the library on Thursday afternoon. 📚',likes:24,comments:['Jordan: Count me in!']},
 {id:2,name:'Jordan Rivera',initials:'JR',time:'Yesterday',department:'Design',text:'Just submitted my project for the Innovation Showcase! If you’re working on something exciting, you should apply too. Would love to see what everyone has been creating.',likes:18,comments:[]},
 {id:3,name:'Sam Patel',initials:'SP',time:'2 days ago',department:'Computer Science',text:'Found a really helpful resource for understanding SQL joins. Happy to share notes with anyone taking Database Management this semester!',likes:31,comments:[]},
];
export { GraduationCap };

import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDownRight, ArrowRight, Award, BookOpen, Check, ChevronRight, Coffee, Download, Gift, Heart, ImagePlus, Leaf, Menu, Play, Plus, Send, Sparkles, Trophy, Video, X } from 'lucide-react';
import celebration from '@/assets/diwali-celebration.jpg';
import rangoli from '@/assets/diwali-rangoli.jpg';
import team from '@/assets/diwali-team.jpg';
import diyas from '@/assets/diwali-diyas.jpg';
import keynote from '@/assets/keynote.jpg';
import unboxing from '@/assets/unboxing.jpg';
import green from '@/assets/csr-green.jpg';
import learning from '@/assets/csr-learning.jpg';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'CultureOS — Your people, your stories' },
    { name: 'description', content: 'A shared space for celebration, recognition, memories and meaningful moments at work.' },
    { property: 'og:title', content: 'CultureOS — Your people, your stories' },
    { property: 'og:description', content: 'Celebrate the people and moments that make work meaningful.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Portal,
});

const nav = [
  { id: 'overview', label: 'Overview', icon: Sparkles },
  { id: 'keynotes', label: 'Leadership keynotes', icon: Video },
  { id: 'impact', label: 'CSR & impact', icon: Leaf },
  { id: 'diwali', label: 'Diwali media wall', icon: ImagePlus },
  { id: 'certificates', label: 'Certificate vault', icon: Award },
  { id: 'unboxing', label: 'Unboxing feed', icon: Gift },
  { id: 'quiz', label: 'Culture quiz', icon: Trophy },
  { id: 'appreciation', label: 'Appreciation', icon: Heart },
  { id: 'capsule', label: '2026 memory capsule', icon: BookOpen },
];
const startingPhotos = [
  { id: 1, image: celebration, name: 'Aarav Mehta', team: 'Product', caption: 'The evening we lit up the courtyard.', votes: 128 },
  { id: 2, image: rangoli, name: 'Isha Kapoor', team: 'Design', caption: 'A little color goes a long way.', votes: 96 },
  { id: 3, image: team, name: 'Rohan Shah', team: 'Engineering', caption: 'Sweets, sparklers, and our favorite people.', votes: 84 },
  { id: 4, image: diyas, name: 'Ananya Rao', team: 'People', caption: 'One diya at a time.', votes: 72 },
];
const startingPosts = [
  { id: 1, author: 'Priya Nair', initials: 'PN', to: 'Aarav Mehta', message: 'Huge shoutout for making the launch feel effortless. Your calm energy made all the difference for the whole team.', time: '2 hours ago', likes: 24 },
  { id: 2, author: 'Kabir Sethi', initials: 'KS', to: 'Isha Kapoor', message: 'Thank you for staying late to help polish the presentation. You always make the details feel important.', time: 'Yesterday', likes: 18 },
  { id: 3, author: 'Meera Joshi', initials: 'MJ', to: 'the Operations team', message: 'The Diwali celebration was pure magic. Every little detail made everyone feel like they belonged.', time: '2 days ago', likes: 31 },
];
const quiz = [
  { question: 'What makes a milestone worth celebrating?', options: ['The people behind it', 'Only the final number', 'The next deadline'], answer: 0 },
  { question: 'Which tradition brings our team together each autumn?', options: ['A marathon', 'The Diwali celebration', 'A beach cleanup'], answer: 1 },
  { question: 'What is the best way to recognize a teammate?', options: ['Keep it to yourself', 'Wait for a yearly review', 'Share a genuine appreciation'], answer: 2 },
  { question: 'What do we carry forward into 2027?', options: ['Our shared stories', 'Only spreadsheets', 'Nothing at all'], answer: 0 },
];
const prompts = [
  { key: 'proud', icon: Trophy, label: "Something I'm proud of", placeholder: 'A moment, project, or personal win...' },
  { key: 'learned', icon: BookOpen, label: 'Something I learned', placeholder: 'A lesson that stayed with me...' },
  { key: 'grateful', icon: Heart, label: "Something I'm grateful for", placeholder: 'A person, experience, or small thing...' },
  { key: 'achieve', icon: ArrowRight, label: 'Something I want to achieve', placeholder: 'A hope for the year ahead...' },
] as const;

type CapsuleKey = typeof prompts[number]['key'];

function Count({ value }: { value: number }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / 950, 1);
      setCount(Math.round(value * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value]);
  return <>{count.toLocaleString()}</>;
}
function SectionTitle({ number, eyebrow, title, aside }: { number: string; eyebrow: string; title: string; aside?: string }) {
  return <div className="section-heading"><div><div className="eyebrow"><span>{number}</span> / {eyebrow}</div><h2>{title}</h2></div>{aside && <p>{aside}</p>}</div>;
}
function Portal() {
  const [active, setActive] = useState('overview');
  const [menuOpen, setMenuOpen] = useState(false);
  const [photos, setPhotos] = useState(startingPhotos);
  const [voted, setVoted] = useState<number[]>([]);
  const [posts, setPosts] = useState(startingPosts);
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [postText, setPostText] = useState('');
  const [postTo, setPostTo] = useState('');
  const [quizStep, setQuizStep] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [capsule, setCapsule] = useState<Record<CapsuleKey, string>>({ proud: '', learned: '', grateful: '', achieve: '' });
  const [capsuleSaved, setCapsuleSaved] = useState(false);
  const [feedIndex, setFeedIndex] = useState(0);
  const [videoOpen, setVideoOpen] = useState(false);
  const [notice, setNotice] = useState('');
  const fileInput = useRef<HTMLInputElement>(null);
  const topPhoto = [...photos].sort((a, b) => b.votes - a.votes)[0];
  const activity = [
    'New Diwali photo uploaded by Aarav',
    'Culture quiz completed — voucher earned',
    'New appreciation post for Isha',
    '2026 memory saved by Meera',
    'Certificate issued to Priya',
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(e => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    }, { rootMargin: '-15% 0px -65% 0px', threshold: 0 });
    nav.forEach(item => { const el = document.getElementById(item.id); if (el) observer.observe(el); });
    const reveals = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); } }), { threshold: .08 });
    reveals.forEach(el => revealObserver.observe(el));
    return () => { observer.disconnect(); revealObserver.disconnect(); };
  }, []);
  useEffect(() => {
    const timer = window.setInterval(() => setFeedIndex(i => (i + 1) % activity.length), 3000);
    return () => window.clearInterval(timer);
  }, []);
  useEffect(() => { if (!notice) return; const timer = window.setTimeout(() => setNotice(''), 3500); return () => window.clearTimeout(timer); }, [notice]);

  const go = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setActive(id); setMenuOpen(false); };
  const vote = (id: number) => { setPhotos(old => old.map(photo => photo.id === id ? { ...photo, votes: photo.votes + (voted.includes(id) ? -1 : 1) } : photo)); setVoted(old => old.includes(id) ? old.filter(x => x !== id) : [...old, id]); };
  const uploadPhotos = (files: FileList | null) => {
    if (!files?.length) return;
    const selected = Array.from(files).filter(file => file.type.startsWith('image/')).slice(0, 6);
    setPhotos(old => [...selected.map((file, i) => ({ id: Date.now() + i, image: URL.createObjectURL(file), name: 'Manasvi Gangrade', team: 'My upload', caption: file.name.replace(/\.[^.]+$/, ''), votes: 0 })), ...old]);
    setNotice(`${selected.length} photo${selected.length === 1 ? '' : 's'} added to the wall`);
    if (fileInput.current) fileInput.current.value = '';
  };
  const addPost = () => {
    if (!postText.trim() || !postTo.trim()) return;
    setPosts(old => [{ id: Date.now(), author: 'Manasvi Gangrade', initials: 'MG', to: postTo.trim(), message: postText.trim(), time: 'Just now', likes: 0 }, ...old]);
    setPostText(''); setPostTo(''); setNotice('Your appreciation is live');
  };
  const answerQuestion = (answer: number) => {
    setScore(old => old + (answer === quiz[quizStep]?.answer ? 1 : 0));
    if (quizStep === quiz.length - 1) setFinished(true);
    else setQuizStep(step => step + 1);
  };
  const downloadCertificate = (name: string, title: string) => {
    const html = `<!doctype html><html><head><meta charset="utf-8"><title>Certificate - ${title}</title><style>body{background:#f9f5ee;color:#28211d;font-family:Georgia,serif;text-align:center;padding:9vh 8vw;margin:0}.frame{border:10px double #b46731;padding:9vh 4vw;min-height:55vh}small{letter-spacing:.3em;color:#9c562b}h1{font-size:clamp(36px,7vw,90px);margin:45px 0 10px}h2{font-size:clamp(26px,4vw,56px);margin:15px 0}p{font-size:20px}hr{width:160px;border:1px solid #b46731;margin:40px auto}</style></head><body><div class="frame"><small>CULTUREOS · 2026</small><h1>Certificate of Appreciation</h1><p>Proudly presented to</p><h2>${name}</h2><hr><p>For ${title.toLowerCase()}</p><small>CELEBRATING THE PEOPLE WHO MAKE IT MATTER</small></div></body></html>`;
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `${name.toLowerCase().replaceAll(' ', '-')}-certificate.html`; a.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setNotice('Certificate downloaded — open it to print');
  };
  const currentQuestion = quiz[quizStep];
  if (!currentQuestion) return null;
  const certificates = [
    { name: 'Priya Nair', title: 'Culture Champion', type: 'PEOPLE FIRST', no: '01' },
    { name: 'Aarav Mehta', title: 'Above & Beyond', type: 'EXCELLENCE', no: '02' },
    { name: 'Isha Kapoor', title: 'Creative Spark', type: 'INNOVATION', no: '03' },
  ];
  const unbox = [
    { author: 'Neha Bansal', initials: 'NB', team: 'Customer Success', time: 'Today · 10:42 AM', image: unboxing, text: 'The best kind of delivery: a small surprise that made the whole team pause and smile. Here’s to the people behind every box.' },
    { author: 'Arjun Malhotra', initials: 'AM', team: 'Partnerships', time: 'Yesterday · 4:18 PM', image: team, text: 'Our client welcome kits made it to their new homes today. The unboxing reactions were everything.' },
  ];
  return <div className="portal-shell">
    <aside className={`sidebar ${menuOpen ? 'open' : ''}`}>
      <div className="side-top"><div className="brand-mark"><span className="brand-symbol">✳</span><span>culture<span className="brand-accent">OS</span><small>THE PEOPLE PLATFORM</small></span></div><Button variant="ghost" size="icon" className="mobile-close" aria-label="Close menu" onClick={() => setMenuOpen(false)}><X /></Button></div>
      <div className="workspace-label"><span className="workspace-dot" /> ACME WORKSPACE <span className="workspace-chev">⌄</span></div>
      <div className="nav-caption">WORKSPACE</div>
      <nav className="sidebar-nav" aria-label="Portal sections">{nav.map(item => <Button key={item.id} variant="ghost" className={`nav-item ${active === item.id ? 'active' : ''}`} onClick={() => go(item.id)}><item.icon size={18} strokeWidth={1.8} /><span>{item.label}</span>{item.id === 'diwali' && <span className="nav-badge">NEW</span>}</Button>)}</nav>
      <div className="side-bottom"><div className="side-year"><span className="year-star">✳</span><div><strong>2026, together.</strong><small>Every moment belongs here.</small></div></div><div className="side-profile"><div className="avatar avatar-me">MG</div><div><strong>Manasvi Gangrade</strong><small>Team member</small></div><span className="online-dot" /></div></div>
    </aside>
    {menuOpen && <div className="menu-shade" onClick={() => setMenuOpen(false)} />}
    <main className="main-content">
      <div className="mobile-topbar"><Button variant="ghost" size="icon" aria-label="Open menu" onClick={() => setMenuOpen(true)}><Menu /></Button><strong>culture<span>OS</span></strong><div className="avatar avatar-me">MG</div></div>
      <header className="topbar"><div className="breadcrumb">Workspace <ChevronRight size={13}/> <strong>{nav.find(x => x.id === active)?.label}</strong></div><div className="topbar-right"><span className="topbar-live"><span/> YOUR CULTURE, LIVE</span><div className="avatar avatar-me">MG</div></div></header>
      <div className="content-wrap">
        <section id="overview" className="overview section-block">
          <div className="overview-head"><div><div className="eyebrow"><span>✳</span> YOUR WORKSPACE / 2026</div><h1>Good to have you here,<br/><em>Manasvi.</em></h1><p>A place for the moments, people, and stories that make this year ours.</p><div className="hero-actions"><Button onClick={() => go('diwali')}>Explore the memories <ArrowRight size={17}/></Button><Button variant="outline" onClick={() => go('appreciation')}>Give appreciation <Heart size={16}/></Button></div></div><div className="overview-visual"><img src={celebration} alt="Colleagues celebrating Diwali with sparklers"/><div className="image-stamp"><Sparkles size={15}/> MOMENTS THAT MATTER</div></div></div>
          <div className="stats-grid">{[
            { label: 'Memories logged', value: 248, icon: BookOpen, detail: '+18 this month' },
            { label: 'Certificates issued', value: 86, icon: Award, detail: '+6 this month' },
            { label: 'Photos uploaded', value: 342 + photos.length - 4, icon: ImagePlus, detail: 'Across our teams' },
            { label: 'Appreciation posts', value: 128 + posts.length - 3, icon: Heart, detail: '+12 this month' },
          ].map(stat => <div className="stat" key={stat.label}><div className="stat-top"><stat.icon size={19}/><span>↗</span></div><strong><Count value={stat.value}/></strong><div className="stat-bottom"><span>{stat.label}</span><small>{stat.detail}</small></div></div>)}</div>
          <div className="overview-bottom"><div className="quick-panel"><div className="panel-header"><div><span className="mini-label">DISCOVER</span><h3>Find your corner of the culture.</h3></div><ArrowDownRight size={20}/></div><div className="quick-grid">{nav.slice(1).map((item, i) => <Button key={item.id} variant="ghost" onClick={() => go(item.id)} className="quick-link"><span className="quick-icon"><item.icon size={20}/></span><span>{item.label}</span><ArrowRight size={16}/><small>0{i + 1}</small></Button>)}</div></div><div className="activity-panel"><div className="terminal-top"><span className="terminal-lights"><i/><i/><i/></span><span>culture_live.log</span><span className="live-indicator">● LIVE</span></div><div className="terminal-body"><div className="terminal-label">// WHAT'S HAPPENING NOW</div>{[0, 1, 2, 3].map((_, i) => <div className="terminal-line" key={`${feedIndex}-${i}`}><span className="prompt-sign">›</span><span className="terminal-check">✓</span>{activity[(feedIndex + i) % activity.length]}</div>)}<div className="terminal-cursor">_</div></div></div></div>
        </section>

        <section id="keynotes" className="section-block reveal"><SectionTitle number="01" eyebrow="A NOTE FROM LEADERSHIP" title="The year we made together." aside="A look back at the progress, the pivots, and the people who made 2026 count."/><div className="keynote-layout"><div className="keynote-media"><img src={keynote} loading="lazy" alt="Founder addressing teammates at an all-hands gathering"/><div className="keynote-overlay"><span>2026 / THE YEAR IN REVIEW</span><h3>A message from our founder</h3><p>Looking back at what we built — and looking ahead to what’s possible.</p><Button onClick={() => setVideoOpen(true)} className="play-button" aria-label="Open founder message preview"><Play size={17} fill="currentColor"/> Watch message</Button></div></div><div className="milestones"><span className="mini-label">OUR YEAR AT A GLANCE</span>{[{ year: 'Q1', title: 'A fresh beginning', detail: 'New teams, new ideas, and a shared direction.' }, { year: 'Q2', title: 'Building momentum', detail: 'Milestones reached and partnerships forged.' }, { year: 'Q3', title: 'Giving back, together', detail: 'More ways to make a difference beyond work.' }, { year: 'Q4', title: 'The best is yet to come', detail: 'Celebrating the journey and everyone in it.' }].map(item => <div className="milestone" key={item.year}><span>{item.year}</span><div><strong>{item.title}</strong><p>{item.detail}</p></div></div>)}</div></div></section>

        <section id="impact" className="section-block reveal"><SectionTitle number="02" eyebrow="GOOD BEYOND OUR WALLS" title="Impact, in action." aside="The causes we show up for — and the partners making lasting change possible."/><div className="impact-grid">{[{ image: green, label: 'ENVIRONMENT', name: 'Greener neighborhoods', partner: 'With GreenRoots Foundation', detail: 'Planting the future, one community at a time.', stat: '1,200+', unit: 'saplings planted' }, { image: learning, label: 'EDUCATION', name: 'Learning without limits', partner: 'With Bright Futures NGO', detail: 'Giving young minds the tools to go further.', stat: '350+', unit: 'students supported' }].map(item => <article className="impact-card" key={item.name}><div className="impact-image"><img src={item.image} loading="lazy" alt={item.name}/><span>{item.label}</span></div><div className="impact-content"><small>{item.partner}</small><h3>{item.name}</h3><p>{item.detail}</p><div><strong>{item.stat}</strong><span>{item.unit}</span></div></div></article>)}</div></section>

        <section id="diwali" className="section-block reveal"><SectionTitle number="03" eyebrow="THE FESTIVAL OF LIGHTS" title="Diwali, through our eyes." aside="A wall of little moments from a big celebration. Pick your favorites."/><div className="wall-toolbar"><div className="wall-tabs"><span className="wall-tab-active">All moments <span>{photos.length}</span></span><span>Diwali 2026</span></div><div><input ref={fileInput} type="file" accept="image/*" multiple className="sr-only" aria-label="Choose photos" onChange={e => uploadPhotos(e.target.files)}/><Button variant="outline" onClick={() => fileInput.current?.click()}><Plus size={16}/> Add your moment</Button></div></div>{topPhoto && <div className="top-voted"><div className="top-voted-image"><img src={topPhoto.image} loading="lazy" alt={topPhoto.caption}/></div><div className="top-voted-info"><span className="top-voted-label"><Trophy size={15}/> MOST LOVED MOMENT</span><h3>{topPhoto.caption}</h3><p>Shared by {topPhoto.name} · {topPhoto.team}</p><Button variant="outline" className={voted.includes(topPhoto.id) ? 'voted' : ''} onClick={() => vote(topPhoto.id)} aria-label={`Vote for ${topPhoto.caption}`}><Heart size={16} fill={voted.includes(topPhoto.id) ? 'currentColor' : 'none'}/> {topPhoto.votes} votes</Button></div></div>}<div className="photo-grid">{photos.map(photo => <article className="photo-card" key={photo.id}><div className="photo-image"><img src={photo.image} loading="lazy" alt={photo.caption}/></div><div className="photo-meta"><div className="photo-person"><div className="avatar">{photo.name.split(' ').map(x => x[0]).join('').slice(0, 2)}</div><div><strong>{photo.name}</strong><small>{photo.team}</small></div></div><Button variant="ghost" className={`like-button ${voted.includes(photo.id) ? 'voted' : ''}`} onClick={() => vote(photo.id)} aria-label={`${voted.includes(photo.id) ? 'Remove vote from' : 'Vote for'} ${photo.caption}`}><Heart size={16} fill={voted.includes(photo.id) ? 'currentColor' : 'none'}/>{photo.votes}</Button></div><p>{photo.caption}</p></article>)}</div></section>

        <section id="certificates" className="section-block reveal"><SectionTitle number="04" eyebrow="RECOGNITION, KEPT CLOSE" title="Your moments of recognition." aside="A little appreciation deserves a place to live. Download or print a certificate."/><div className="certificate-grid">{certificates.map(cert => <article className="certificate-card" key={cert.name}><div className="certificate-preview"><div className="cert-corner">✳</div><span>CULTUREOS / 2026</span><div className="cert-ornament">✦</div><small>CERTIFICATE OF APPRECIATION</small><strong>{cert.name}</strong><em>{cert.title}</em><div className="cert-rule"/><span>THE PEOPLE WHO MAKE IT MATTER</span></div><div className="certificate-detail"><div><small>{cert.type} / NO. {cert.no}</small><h3>{cert.title}</h3><p>Presented to {cert.name}</p></div><Button variant="outline" size="icon" onClick={() => downloadCertificate(cert.name, cert.title)} aria-label={`Download ${cert.name}'s certificate`} title="Download certificate"><Download size={17}/></Button></div></article>)}</div></section>

        <section id="unboxing" className="section-block reveal"><SectionTitle number="05" eyebrow="THE JOY OF WHAT'S INSIDE" title="Unboxed moments." aside="From doorsteps to desks, the little surprises that made someone's day."/><div className="unbox-grid">{unbox.map(item => <article className="unbox-card" key={item.author}><div className="unbox-author"><div className="avatar">{item.initials}</div><div><strong>{item.author}</strong><small>{item.team} · {item.time}</small></div><span>✳</span></div><div className="unbox-image"><img src={item.image} loading="lazy" alt={`Unboxing moment shared by ${item.author}`}/></div><div className="unbox-copy"><p>{item.text}</p><span>#UnboxedTogether &nbsp; #CultureOS</span></div></article>)}</div></section>

        <section id="quiz" className="section-block reveal"><SectionTitle number="06" eyebrow="KNOW YOUR CULTURE" title="A little quiz. A little reward." aside="Four quick questions about the things that bring us together."/><div className="quiz-box"><div className="quiz-art"><div className="quiz-art-grid"/><div className="quiz-art-inner"><span>✳</span><strong>GOOD THINGS<br/>HAPPEN<br/>TOGETHER.</strong><small>CULTURE QUIZ / 2026</small></div></div><div className="quiz-content">{finished ? <div className="reward-view"><div className="confetti" aria-hidden="true">✦ ✳ ✦ ✴ ✦ ✳ ✦</div><span className="mini-label">QUIZ COMPLETE · {score}/{quiz.length} CORRECT</span><div className="reward-icon"><Coffee size={32}/></div><h3>You earned a moment.</h3><p>Your reward: <strong>Unofficial Coffee with the Owner</strong>. Great conversations start here.</p><div className="voucher"><small>YOUR DIGITAL VOUCHER</small><strong>☕ Coffee with the Owner</strong><span>CULTUREOS / 2026</span></div><Button variant="outline" onClick={() => { setQuizStep(0); setScore(0); setFinished(false); }}>Play again <ArrowRight size={15}/></Button></div> : <><div className="quiz-progress"><span>QUESTION 0{quizStep + 1} / 0{quiz.length}</span><span>{Math.round((quizStep / quiz.length) * 100)}% COMPLETE</span></div><div className="quiz-track"><span style={{ width: `${((quizStep + 1) / quiz.length) * 100}%` }}/></div><h3>{currentQuestion.question}</h3><div className="quiz-answers">{currentQuestion.options.map((option, i) => <Button key={option} variant="outline" onClick={() => answerQuestion(i)}><span>0{i + 1}</span>{option}<ArrowRight size={16}/></Button>)}</div><div className="quiz-foot"><span>One answer at a time. You’ve got this.</span></div></>}</div></div></section>

        <section id="appreciation" className="section-block reveal"><SectionTitle number="07" eyebrow="SAY IT OUT LOUD" title="Appreciation looks good on everyone." aside="A few words can change someone's whole day. Give credit where it's due."/><div className="appreciation-layout"><div className="composer"><div className="composer-top"><div className="avatar avatar-me">MG</div><div><strong>Make someone's day</strong><small>Posting as Manasvi Gangrade</small></div></div><label htmlFor="appreciation-to">WHO ARE YOU APPRECIATING?</label><input id="appreciation-to" value={postTo} onChange={e => setPostTo(e.target.value)} placeholder="A teammate's name" maxLength={60}/><label htmlFor="appreciation-message">YOUR MESSAGE</label><textarea id="appreciation-message" value={postText} onChange={e => setPostText(e.target.value)} placeholder="Tell them what made a difference..." rows={5} maxLength={500}/><div className="composer-bottom"><span>{postText.length}/500</span><Button onClick={addPost} disabled={!postText.trim() || !postTo.trim()}>Post appreciation <Send size={15}/></Button></div></div><div className="posts-feed"><div className="feed-title"><span className="mini-label">THE GOOD WORD</span><span>{posts.length} POSTS</span></div>{posts.map(post => <article className="post" key={post.id}><div className="post-header"><div className="avatar">{post.initials}</div><div><strong>{post.author}</strong><small>{post.time}</small></div><span>✳</span></div><p>To <strong>{post.to}</strong> — {post.message}</p><div className="post-footer"><Button variant="ghost" className={likedPosts.includes(post.id) ? 'voted' : ''} onClick={() => { setPosts(old => old.map(p => p.id === post.id ? { ...p, likes: p.likes + (likedPosts.includes(p.id) ? -1 : 1) } : p)); setLikedPosts(old => old.includes(post.id) ? old.filter(x => x !== post.id) : [...old, post.id]); }} aria-label={`${likedPosts.includes(post.id) ? 'Unlike' : 'Like'} appreciation by ${post.author}`}><Heart size={16} fill={likedPosts.includes(post.id) ? 'currentColor' : 'none'}/> {post.likes}</Button><span>APPRECIATION / 2026</span></div></article>)}</div></div></section>

        <section id="capsule" className="section-block reveal"><SectionTitle number="08" eyebrow="A NOTE TO FUTURE YOU" title="The 2026 memory capsule." aside="Four reflections to remember how far you've come, and where you want to go."/><div className="capsule-head"><div className="capsule-symbol">✳</div><div><span className="mini-label">YOUR STORY / 2026</span><h3>The year, in your words.</h3><p>Only your edits in this session are shown here.</p></div><span className="capsule-date">SEALED IN 2026</span></div><div className="capsule-grid">{prompts.map((prompt, i) => <div className="capsule-cell" key={prompt.key}><div className="capsule-cell-top"><span>0{i + 1}</span><prompt.icon size={19}/></div><label htmlFor={`capsule-${prompt.key}`}>{prompt.label}</label><textarea id={`capsule-${prompt.key}`} rows={4} placeholder={prompt.placeholder} value={capsule[prompt.key]} onChange={e => { setCapsule(old => ({ ...old, [prompt.key]: e.target.value })); setCapsuleSaved(false); }}/></div>)}</div><div className="capsule-footer"><span><Sparkles size={15}/> Some moments are worth keeping.</span><Button onClick={() => { setCapsuleSaved(true); setNotice('Memory saved for this session'); }} disabled={!Object.values(capsule).some(x => x.trim())}>{capsuleSaved ? <><Check size={16}/> Saved for this session</> : <><BookOpen size={16}/> Save my memory</>}</Button></div></section>

        <footer className="footer-cta reveal"><div className="footer-cta-inner"><span>✳ &nbsp; PASS IT ON</span><h2>Good culture is worth<br/><em>sharing.</em></h2><p>Loved this? Tell your HR team you want this for your next year event!</p><Button asChild><a href="mailto:?subject=An%20idea%20for%20our%20next%20team%20event&body=I%20found%20a%20culture%20and%20engagement%20portal%20idea%20I%27d%20love%20us%20to%20explore%20for%20our%20next%20event.">Tell your HR team <ArrowRight size={17}/></a></Button></div><div className="footer-sun" aria-hidden="true">✳</div></footer>
        <div className="site-footer"><strong>✳ culture<span>OS</span></strong><span>Made for the moments that matter. © 2026</span><Button variant="ghost" onClick={() => go('overview')}>Back to top ↑</Button></div>
      </div>
    </main>
    {videoOpen && <div className="modal-backdrop" role="presentation" onClick={() => setVideoOpen(false)}><div role="dialog" aria-modal="true" aria-label="Founder message" className="video-modal" onClick={e => e.stopPropagation()}><Button variant="ghost" size="icon" className="modal-close" aria-label="Close founder message" onClick={() => setVideoOpen(false)}><X/></Button><img src={keynote} alt="Founder speaking to the team"/><div><span className="mini-label">FOUNDER MESSAGE · 2026</span><h3>The year we made together</h3><p>Video preview — the founder message can be added when a recording is available.</p></div></div></div>}
    {notice && <div className="toast-notice" role="status"><Check size={16}/>{notice}</div>}
  </div>;
}

import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { ArrowDownRight, ArrowRight, ArrowUpRight, Github, Linkedin, Mail, Menu, X, Code2, Layers3, Sparkles, Terminal, CheckCircle2 } from "lucide-react";
import { profile, projects, skills } from "./data";
import "./styles.css";

function App(){
  const [menuOpen,setMenuOpen]=useState(false);
  const [form,setForm]=useState({name:"",email:"",subject:"Project enquiry",message:""});
  const [sending,setSending]=useState(false);
  const [notice,setNotice]=useState("");
  const api=(import.meta.env.VITE_API_URL || "http://localhost:8000").replace(/\/$/,"");
  const update=(e)=>setForm({...form,[e.target.name]:e.target.value});
  async function submit(e){
    e.preventDefault(); setSending(true); setNotice("");
    try{
      const r=await fetch(`${api}/api/contact`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(form)});
      const data=await r.json();
      if(!r.ok) throw new Error(data.detail?.[0]?.msg || data.detail || "Could not send message.");
      setNotice(data.message || "Message received."); setForm({name:"",email:"",subject:"Project enquiry",message:""});
    }catch(err){setNotice("Contact API is not connected yet. Please email me directly at "+profile.email+".");}
    finally{setSending(false);}
  }
  const closeMenu=()=>setMenuOpen(false);
  return <div className="app">
    <header className="nav wrap">
      <a className="brand" href="#home" onClick={closeMenu}><span className="brand-mark">PT<span>.</span></span><span className="brand-name">PIYUSH TIWARI</span></a>
      <button className="menu-toggle" aria-label="Toggle navigation" onClick={()=>setMenuOpen(!menuOpen)}>{menuOpen?<X/>:<Menu/>}</button>
      <nav className={menuOpen?"nav-links open":"nav-links"}>
        <a href="#work" onClick={closeMenu}>Work</a><a href="#about" onClick={closeMenu}>About</a><a href="#skills" onClick={closeMenu}>Skills</a><a href="#contact" onClick={closeMenu}>Contact</a>
        <a className="nav-resume" href="/resume.docx" download>Resume <ArrowUpRight size={15}/></a>
      </nav>
    </header>
    <main>
      <section className="hero wrap" id="home">
        <div className="hero-copy">
          <div className="eyebrow"><span className="pulse"></span> AVAILABLE FOR OPPORTUNITIES</div>
          <h1>Building digital<br/>things with <span className="gradient-text">purpose.</span></h1>
          <p className="hero-sub">Hey, I'm <strong>{profile.name}</strong> — a developer who enjoys turning complex problems into clean, reliable products, from backend systems to thoughtful interfaces.</p>
          <div className="hero-actions"><a className="btn btn-primary" href="#work">Explore my work <ArrowDownRight size={17}/></a><a className="btn btn-quiet" href="#contact">Let's talk <ArrowUpRight size={16}/></a></div>
          <div className="social-row"><a href={profile.github} target="_blank" rel="noreferrer"><Github size={17}/> GitHub</a><a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={17}/> LinkedIn</a><span><span className="dot"></span>{profile.location}</span></div>
        </div>
        <div className="hero-visual" aria-label="Decorative developer code panel">
          <div className="orbit orbit-one"></div><div className="orbit orbit-two"></div>
          <div className="code-window">
            <div className="window-top"><div className="window-dots"><i></i><i></i><i></i></div><span>developer.ts</span><span className="window-lock">● LIVE</span></div>
            <div className="code-body">
              <div><span className="ln">01</span><span className="pink">const</span> developer = {'{'}</div>
              <div><span className="ln">02</span> &nbsp; name: <span className="green">'Piyush'</span>,</div>
              <div><span className="ln">03</span> &nbsp; focus: <span className="green">'Backend + AI'</span>,</div>
              <div><span className="ln">04</span> &nbsp; mindset: <span className="green">'Build. Learn. Ship.'</span>,</div>
              <div><span className="ln">05</span> &nbsp; coffee: <span className="orange">true</span>,</div>
              <div><span className="ln">06</span> {'}'}</div>
              <div className="code-spacer"></div>
              <div><span className="ln">08</span><span className="muted">// turning ideas into products</span></div>
              <div><span className="ln">09</span><span className="blue">await</span> buildSomethingGreat();<span className="cursor"></span></div>
            </div>
            <div className="window-footer"><span><CheckCircle2 size={13}/> All systems operational</span><span>UTF-8&nbsp; · &nbsp;TypeScript</span></div>
          </div>
          <div className="float-card float-top"><span className="float-icon mint"><Code2 size={18}/></span><span><b>Clean code</b><small>Built to scale</small></span></div>
          <div className="float-card float-bottom"><span className="float-icon purple"><Sparkles size={18}/></span><span><b>AI curious</b><small>Always exploring</small></span></div>
          <div className="visual-caption">CRAFTED WITH CURIOSITY <span>✳</span></div>
        </div>
        <div className="hero-bottom"><span>SCROLL TO EXPLORE</span><div className="scroll-line"></div><span>01 / 04</span></div>
      </section>

      <section className="work-section section wrap" id="work">
        <div className="section-head"><div><div className="section-kicker">SELECTED PROJECTS <span>✳</span></div><h2>Ideas made <span className="muted-heading">real.</span></h2></div><p>A selection of things I've built, explored, and learned from. Each project is a step toward making better software.</p></div>
        <div className="project-grid">{projects.map((p)=><article className={`project-card ${p.accent}`} key={p.number}>
          <div className="project-top"><span className="project-number">{p.number} / 04</span><span className="project-status"><i></i>{p.status}</span></div>
          <div className="project-art">
            {p.number==="01"?<div className="mini-dashboard"><div className="mini-side"><b>acme<span>.</span></b><i></i><i></i><i></i></div><div className="mini-main"><div className="mini-title">People overview <span>•••</span></div><div className="mini-stats"><div><small>Employees</small><b>10,000</b></div><div><small>Payroll status</small><b className="mini-green">● Ready</b></div></div><div className="mini-chart"><i style={{height:"32%"}}></i><i style={{height:"55%"}}></i><i style={{height:"43%"}}></i><i style={{height:"75%"}}></i><i style={{height:"62%"}}></i><i style={{height:"92%"}}></i><i style={{height:"68%"}}></i><i style={{height:"84%"}}></i></div></div></div>:
            p.number==="02"?<div className="rag-art"><div className="rag-node node-a"><Layers3 size={20}/><b>Documents</b></div><div className="rag-line"></div><div className="rag-node node-b"><Sparkles size={20}/><b>Vector search</b></div><div className="rag-line"></div><div className="rag-node node-c"><Terminal size={20}/><b>Grounded answer</b></div></div>:
            p.number==="03"?<div className="sanatan-art"><div className="sanatan-orb">ॐ</div><span>WISDOM · CULTURE · DISCOVERY</span><b>Explore the timeless.</b></div>:
            <div className="voice-art"><div className="voice-circle"><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div><div className="voice-label"><i></i> Agent connected</div><div className="voice-code">POST /webhook/call-event</div></div>}
          </div>
          <div className="project-info"><div className="project-type">{p.type}</div><h3>{p.name}</h3><p>{p.description}</p><div className="tag-list">{p.stack.map(s=><span key={s}>{s}</span>)}</div><div className="project-links"><a href={p.href} target="_blank" rel="noreferrer">Source code <ArrowUpRight size={15}/></a><a href={p.demo}>Details <ArrowRight size={15}/></a></div></div>
        </article>)}</div>
        <div className="project-note"><span className="note-star">✳</span><p><b>More projects are in progress.</b> Replace the sample repository links above with your public GitHub repositories and add live demo URLs as you deploy them.</p><a href={profile.github} target="_blank" rel="noreferrer">Visit GitHub <ArrowUpRight size={15}/></a></div>
      </section>

      <section className="about-section section" id="about"><div className="wrap about-grid">
        <div><div className="section-kicker">A LITTLE ABOUT ME <span>✳</span></div><h2>Engineer by craft.<br/><span className="muted-heading">Problem solver by nature.</span></h2></div>
        <div className="about-copy"><p className="about-lead">I like understanding how things work under the hood — and making them feel simple on the surface.</p><p>My work spans backend development, API design, database-driven applications, frontend experiences, and AI integration experiments. I care about maintainable code, practical solutions, and learning by shipping.</p><p>I'm looking for opportunities where I can contribute to a strong engineering team, take ownership, and keep growing.</p><div className="about-stats"><div><b>Full stack</b><span>From UI to API</span></div><div><b>API-first</b><span>Reliable integrations</span></div><div><b>Always learning</b><span>Build and iterate</span></div></div></div>
      </div></section>

      <section className="skills-section section wrap" id="skills"><div className="section-head"><div><div className="section-kicker">MY TOOLKIT <span>✳</span></div><h2>Tools of the <span className="muted-heading">trade.</span></h2></div><p>The technologies I use to build, connect, and ship products. The exact tool depends on the problem.</p></div>
        <div className="skills-grid">{skills.map((s,i)=><div className="skill-card" key={s.title}><div className="skill-icon">{[<Code2/>,<Layers3/>,<Terminal/>,<Sparkles/>][i]}</div><h3>{s.title}</h3><div className="skill-tags">{s.items.map(item=><span key={item}>{item}</span>)}</div></div>)}</div>
      </section>

      <section className="contact-section section" id="contact"><div className="wrap contact-grid"><div className="contact-copy"><div className="section-kicker">HAVE A PROJECT IN MIND? <span>✳</span></div><h2>Let's make<br/>something <span className="gradient-text">matter.</span></h2><p>Have a role, idea, or collaboration in mind? Send a message. I'd love to hear what you're working on.</p><a className="email-link" href={`mailto:${profile.email}`}><Mail size={17}/>{profile.email}<ArrowUpRight size={16}/></a><div className="contact-social"><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={14}/></a><a href={profile.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={14}/></a></div></div>
        <form className="contact-form" onSubmit={submit}><div className="form-heading"><span>01 — SAY HELLO</span><span className="form-dot"></span></div><label>Your name<input name="name" value={form.name} onChange={update} placeholder="Jane Smith" required minLength="2"/></label><label>Email address<input type="email" name="email" value={form.email} onChange={update} placeholder="jane@company.com" required/></label><label>Subject<input name="subject" value={form.subject} onChange={update} placeholder="What would you like to discuss?" required minLength="3"/></label><label>Message<textarea name="message" value={form.message} onChange={update} placeholder="Tell me a little about it..." required minLength="10" rows="4"/></label><button className="btn btn-primary submit-btn" disabled={sending}>{sending?"Sending...":"Send message"} <ArrowUpRight size={16}/></button>{notice&&<p className="form-notice" role="status">{notice}</p>}<p className="form-privacy">Your message is sent to the portfolio API. Configure email delivery before production use.</p></form>
      </div></section>
    </main>
    <footer className="footer wrap"><a className="brand" href="#home"><span className="brand-mark">PT<span>.</span></span></a><span>Designed & built with curiosity.</span><span>© {new Date().getFullYear()} Piyush Tiwari</span><a href="#home" className="back-top">BACK TO TOP ↑</a></footer>
  </div>
}
createRoot(document.getElementById("root")).render(<App/>);

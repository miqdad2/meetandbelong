"use client";

import { useState, type CSSProperties } from "react";
import ApplicationForm from "./components/ApplicationForm";

const circles = [
  { id: "welcome", label: "New to Kuwait", title: "The Welcome Table", place: "Coffee conversation", seats: "6–10 people", color: "#e56f3f", soft: "#f6c4aa", copy: "A relaxed first table for people building a new life—and a new social circle—in Kuwait." },
  { id: "coffee", label: "Coffee & conversation", title: "The Saturday Slowdown", place: "Relaxed weekend coffee", seats: "6–10 people", color: "#356a59", soft: "#b9d0c5", copy: "Good coffee, thoughtful prompts and people who prefer real conversation over small talk." },
  { id: "founders", label: "Founders & professionals", title: "The Ideas Table", place: "Breakfast conversation", seats: "6–10 people", color: "#d6a62c", soft: "#f0dda3", copy: "Meet ambitious people without pitching, networking badges or forced introductions." },
  { id: "women", label: "Women’s circle", title: "Her Friday Circle", place: "Women-only gathering", seats: "6–10 people", color: "#c95c75", soft: "#efbdc9", copy: "A women-only, hosted space designed for comfort, laughter and genuine new friendships." },
  { id: "adventure", label: "Activities & adventures", title: "Try Something New", place: "Easy group activity", seats: "6–10 people", color: "#477c8b", soft: "#b9d6dc", copy: "Easy group activities for people who connect better while doing something together." },
];

const steps = [
  ["01", "Apply for a circle", "Tell us your interests, language, area, availability and preferred group."],
  ["02", "Receive your match", "When enough compatible people are ready, we send the proposed circle and details."],
  ["03", "Confirm your seat", "Review the date, public venue and circle fee before deciding. Applying is free."],
  ["04", "Meet your circle", "Join a small hosted gathering with light prompts that make conversation natural."],
];

const fitPoints = [
  ["You want friendship—not dating", "A clear friendship-only space with no swiping or public profiles."],
  ["Your current circle feels too small", "For newcomers, busy professionals and long-time residents ready to meet beyond work."],
  ["You prefer real plans to group chats", "Small hosted tables designed to turn introductions into an actual shared evening."],
];

const faqs = [
  ["When do circles take place?", "Most gatherings are planned for Kuwait’s weekend—Friday and Saturday—with selected weekday evening options."],
  ["Is this a dating service?", "No. Meet & Belong is strictly friendship-only. There are no public profiles, swiping or dating matches."],
  ["What if I arrive alone?", "That is exactly how circles are designed. Everyone joins to meet new people, and a host welcomes the group."],
  ["Which languages are used?", "English is the common language for launch circles. We can create language-based circles as the community grows."],
];

export default function Home() {
  const [activeId, setActiveId] = useState(circles[0].id);
  const active = circles.find((circle) => circle.id === activeId) ?? circles[0];

  return (
    <main style={{ "--active": active.color, "--active-soft": active.soft } as CSSProperties}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Organization", name: "Meet & Belong", url: "https://meetandbelong.com", areaServed: "Kuwait", description: "Small, thoughtfully matched friendship circles for adults in Kuwait." }).replace(/</g, "\\u003c") }} />
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Meet and Belong home"><img className="brand-mark" src="/brand-mark.svg" alt="" />Meet <b>&amp;</b> Belong</a>
        <nav aria-label="Primary navigation"><a href="#how">How it works</a><a href="#circles">Circles</a><a href="#safety">Safety</a></nav>
        <a className="button button-small" href="#join">Find your circle <span>↗</span></a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span /> The real-life friendship community</p>
          <h1>MEET NEW PEOPLE.<br /><em>BUILD REAL</em><br />FRIENDSHIPS.</h1>
          <p className="hero-intro">Small, thoughtfully matched gatherings that make meeting new people feel natural—not like networking and definitely not like dating.</p>
          <p className="hero-offer"><strong>Free to apply</strong><span />Hosted gatherings: KD 8–10 per person</p>
          <div className="hero-actions"><a className="button" href="#join">Find your circle <span>↗</span></a><a className="text-link" href="#how">See how it works <span>↓</span></a></div>
          <div className="trust-row"><span>✓ Small hosted groups</span><span>✓ Public venues</span><span>✓ Friendship only</span></div>
        </div>

        <div className="hero-stage" aria-live="polite">
          <div className="shape shape-one" /><div className="shape shape-two" /><div className="dots" />
          <div className="photo-shell"><div className="hero-photo" role="img" aria-label="Friends enjoying a welcoming social gathering" /></div>
          <div className="sticker sticker-top">SMALL GROUPS</div>
          <div className="sticker sticker-side">REAL PEOPLE<br />REAL PLANS</div>
          <article className="active-card" key={active.id}>
            <p>Sample launch circle</p><h2>{active.title}</h2><span>{active.place} · {active.seats}</span><small>{active.copy}</small>
          </article>
        </div>

        <div className="circle-switcher" aria-label="Choose a circle type">
          {circles.map((circle) => <button key={circle.id} className={circle.id === active.id ? "active" : ""} onClick={() => setActiveId(circle.id)} type="button"><span style={{ background: circle.color }} />{circle.label}</button>)}
        </div>
      </section>

      <section className="how section-pad" id="how">
        <div className="section-heading"><div><p className="section-label">Simple by design</p><h2>FROM “I SHOULD GET OUT MORE” TO <em>“SAME TIME NEXT WEEK?”</em></h2></div><p>We handle the matching, venue and awkward first minutes. You only need to arrive curious.</p></div>
        <div className="steps-grid">{steps.map(([number,title,copy]) => <article key={number}><span>{number}</span><div className="step-icon">{number === "01" ? "✦" : number === "02" ? "◎" : number === "03" ? "✓" : "↗"}</div><h3>{title}</h3><p>{copy}</p></article>)}</div>
      </section>

      <section className="fit section-pad"><div className="fit-heading"><p className="section-label">Why we exist · Who it’s for</p><h2>YOUR CITY IS FULL OF PEOPLE YOU HAVEN’T MET <em>YET.</em></h2><p>Meet &amp; Belong turns “we should meet sometime” into a real plan and a welcoming table. You don’t need to be outgoing—only open to meeting kind people with the same intention.</p></div><div className="fit-grid">{fitPoints.map(([title,copy],index) => <article key={title}><span>0{index+1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></section>

      <section className="circles-section section-pad" id="circles">
        <div className="section-heading light"><div><p className="section-label">Sample launch circles</p><h2>NOT EVERY CIRCLE IS FOR EVERYONE. <em>THAT’S THE POINT.</em></h2></div><p>These are formats we’re testing—not confirmed events. Applications help us decide what to launch first.</p></div>
        <div className="experience-grid">{circles.slice(0,4).map((circle,index) => <a href="#join" className="experience-card" style={{ "--card": circle.color, "--card-soft": circle.soft } as CSSProperties} key={circle.id}><span className="card-number">0{index+1}</span><div className="card-orbit">{index % 2 ? "✦" : "●"}</div><p>{circle.label}</p><h3>{circle.title}</h3><small>{circle.place} · {circle.seats}</small><b>Explore this circle ↗</b></a>)}</div>
      </section>

      <section className="safety section-pad" id="safety">
        <div className="safety-badge"><span>✓</span><strong>FRIENDSHIP<br />ONLY</strong><small>Our promise</small></div>
        <div className="safety-copy"><p className="section-label">Comfort comes first</p><h2>DESIGNED FOR TRUST, <em>NOT ATTENTION.</em></h2><p>No public profiles. No swiping. No pressure to exchange details. Every gathering follows a clear code of conduct and takes place at a public venue selected before the gathering.</p><div className="safety-list"><span>Contact details checked</span><span>Hosts at every gathering</span><span>Women-only options</span><span>Private reporting</span></div></div>
      </section>

      <section className="pricing section-pad">
        <div><p className="section-label">SIMPLE PRICING</p><h2>ONE GOOD EVENING CAN CHANGE YOUR <em>WHOLE WEEK.</em></h2><p>Applying is free. When we find a suitable circle, you’ll see the date, public venue and exact price before deciding whether to join.</p></div>
        <div className="price-card"><span className="price-burst">CIRCLE<br />FEE</span><p>Applying is free</p><h3><small>KD</small> 8–10</h3><span>per person, per gathering</span><ul><li>No charge to apply</li><li>Exact price shown before you confirm</li><li>Public venue shared in advance</li><li>Dedicated circle host</li></ul><a className="button" href="#join">Apply for a circle ↗</a></div>
      </section>

      <section className="weekend section-pad">
        <div><p className="section-label">Made for life in Kuwait</p><h2>YOUR WEEKEND.<br /><em>YOUR NEW PEOPLE.</em></h2><p>Most circles happen when Kuwait slows down: Friday and Saturday. Choose a relaxed coffee, brunch, breakfast or activity that fits your weekend.</p></div>
        <div className="weekend-days"><article><span>FRI</span><strong>Friday circles</strong><small>Brunch · Coffee · Activities</small></article><article><span>SAT</span><strong>Saturday circles</strong><small>Breakfast · Coffee · Adventures</small></article></div>
      </section>

      <section className="organizer-strip" aria-label="About the organizer"><div><img className="brand-mark brand-mark-light" src="/brand-mark-light.svg" alt="" /><p><strong>Kuwait-based and thoughtfully organized.</strong><br />Meet &amp; Belong is operated locally. Apply online and our team will contact you about a suitable circle.</p></div><a href="#join">Apply online ↗</a></section>

      <section className="faq section-pad">
        <div className="faq-title"><p className="section-label">Good questions are welcome</p><h2>BEFORE YOU JOIN.</h2><p>Everything you should know before walking into your first circle.</p></div>
        <div className="faq-list">{faqs.map(([question,answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div>
      </section>

      <section className="join section-pad" id="join">
        <div className="join-copy"><p className="section-label">FIND YOUR PEOPLE</p><h2>YOUR NEXT CIRCLE COULD START <em>HERE.</em></h2><p>Complete the matching form and tell us what kind of circle would feel right for you. We’ll use your answers to create a comfortable, compatible group.</p><p className="response-note">Applying is free. If we find a suitable circle, we’ll share the date, public venue and exact price before you decide.</p><div className="mini-proof"><strong>FREE</strong><span>to apply</span><strong>6–10</strong><span>people per circle</span><strong>KD 8–10</strong><span>per person, per gathering</span></div></div>
        <ApplicationForm circleOptions={circles.map((circle) => circle.label)} />
      </section>

      <footer><div className="footer-brand"><a className="wordmark wordmark-light" href="#top"><img className="brand-mark" src="/brand-mark-light.svg" alt="" />Meet <b>&amp;</b> Belong</a><p>Organized by the Meet &amp; Belong team in Kuwait.</p></div><div className="footer-links"><a href="#how">How it works</a><a href="#circles">Sample circles</a><a href="/code-of-conduct">Code of conduct</a><a href="/privacy">Privacy</a><a href="/cancellation">Cancellation</a></div><div className="footer-contact"><p>Friday &amp; Saturday circles · Kuwait</p><a href="#join">Find your circle ↗</a></div><small>© 2026 Meet &amp; Belong. Friendship, thoughtfully arranged.</small></footer>
    </main>
  );
}

/* <ren-services> — animated services section for Ren Strategies.
   Self-contained web component (no dependencies). Attributes:
     pace   – animation speed multiplier for timings (1 = default, 1.5 = 50% slower)
     video  – optional embed URL (YouTube/Vimeo embed) or .mp4 file; loads only on click
     cta    – link for the call-to-action button (default "#contact")
*/
(() => {
  if (customElements.get('ren-services')) return;

  if (!document.querySelector('link[data-ren-fonts]')) {
    const l = document.createElement('link');
    l.rel = 'stylesheet';
    l.dataset.renFonts = '';
    l.href = 'https://fonts.googleapis.com/css2?family=Caprasimo&family=Figtree:wght@400;500;600;700&display=swap';
    document.head.appendChild(l);
  }

  const I = (p, extra = '') => `<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${extra}>${p}</svg>`;
  const ic = {
    check: I('<path d="M20 6 9 17l-5-5"/>'),
    arrow: I('<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>'),
    replay: I('<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>'),
    pause: I('<rect x="14" y="4" width="4" height="16" rx="1"/><rect x="6" y="4" width="4" height="16" rx="1"/>'),
    play: I('<polygon points="6 3 20 12 6 21 6 3"/>'),
    link: I('<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>'),
    alert: I('<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>'),
    clock: I('<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>'),
    bell: I('<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>'),
    mail: I('<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>'),
    cal: I('<rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/><path d="m9 16 2 2 4-4"/>'),
    pencil: I('<path d="M21.17 6.81a1 1 0 0 0-3.99-3.99L3.84 16.17a2 2 0 0 0-.5.83l-1.32 4.35a.5.5 0 0 0 .62.62l4.35-1.32a2 2 0 0 0 .83-.5z"/>'),
  };

  const css = `
:host{
  --bg:#f5ead8; --surface:#ebddc5; --ink:#201e1d;
  --n100:#f9f4ed; --n200:#eee7db; --n300:#dcd3c4; --n400:#c0b6a5; --n700:#645c50; --n800:#474238;
  --ac:#c67139; --ac100:#fff2eb; --ac200:#ffe1d0; --ac600:#b2622d; --ac700:#8c491a;
  --sg100:#f0fae1; --sg200:#e1eecc; --sg300:#ccdbb2; --sg400:#aebf92; --sg600:#728157; --sg700:#56633f; --sg800:#3d472b;
  --fh:"Caprasimo", Georgia, serif; --fb:"Figtree", system-ui, sans-serif;
  --sh-sm:0 1px 2px rgb(46 43 37 / .14); --sh-md:0 3px 10px rgb(46 43 37 / .16); --sh-lg:0 12px 32px rgb(46 43 37 / .18);
  display:block; container-type:inline-size; background:var(--bg); color:var(--ink); font-family:var(--fb);
  -webkit-font-smoothing:antialiased;
}
*{box-sizing:border-box}
:host(.instant) *, :host(.instant) *::before{transition:none!important;animation:none!important}
.wrap{max-width:1200px;margin:0 auto;padding:clamp(56px,9cqi,120px) clamp(20px,5cqi,56px)}
h2,h3{font-family:var(--fh);font-weight:400;margin:0;text-wrap:balance}
p{margin:0;text-wrap:pretty}
.head{max-width:760px;display:grid;gap:20px}
.head h2{font-size:clamp(2.1rem,4.6cqi,3.5rem);line-height:1.08;letter-spacing:-.01em}
.head p{font-size:clamp(1.1rem,1.7cqi,1.3rem);line-height:1.55;color:var(--n800);max-width:52ch}
button{font:inherit;color:inherit}
:focus-visible{outline:2px solid var(--ac);outline-offset:3px}

.controls{display:flex;gap:8px;justify-content:flex-end;margin:clamp(40px,6cqi,64px) 0 20px}
.ctl{display:inline-flex;align-items:center;gap:8px;border:1.5px solid var(--n300);background:transparent;border-radius:999px;padding:9px 16px;font-size:.92rem;font-weight:600;color:var(--n800);cursor:pointer;min-height:44px}
.ctl:hover{background:rgb(32 30 29 / .06)}
.ctl:active{background:var(--ac200);border-color:var(--ac)}
.ctl svg{font-size:15px}
:host(.reduced) .controls{display:none}

ol.cards{list-style:none;margin:0;padding:0;position:relative;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(20px,2.6cqi,32px)}
.track{position:absolute;background:var(--n300);border-radius:2px;z-index:0;pointer-events:none}
.fill{position:absolute;left:0;top:0;background:var(--sg600);border-radius:2px}
.card{display:flex;flex-direction:column;gap:18px;transition:opacity 1.1s ease,transform 1.1s cubic-bezier(.2,.7,.2,1)}
:host(.armed) .card:not(.in){opacity:0;transform:translateY(16px)}
.marker{position:relative;z-index:1;flex:none;width:44px;height:44px}
.num{width:44px;height:44px;border-radius:50%;display:grid;place-items:center;font-weight:700;font-size:1.05rem;background:var(--bg);border:2px solid var(--n400);color:var(--n800);transition:background .8s,border-color .8s,color .8s,box-shadow .8s}
.card.active .num{background:var(--sg600);border-color:var(--sg600);color:#fff;box-shadow:0 0 0 7px var(--sg200)}
.card.done .num{background:var(--sg200);border-color:var(--sg400);color:var(--sg800)}
.body{flex:1;display:flex;flex-direction:column;gap:14px;background:var(--n100);border-radius:28px;padding:14px 14px 26px;box-shadow:var(--sh-sm);transition:box-shadow .9s,transform .9s}
.card.active .body{box-shadow:var(--sh-lg);transform:translateY(-4px)}
.body h3{font-size:1.45rem;line-height:1.18;padding:4px 10px 0}
.body p{font-size:1.02rem;line-height:1.55;color:var(--n800);padding:0 10px}
.kicker{font-size:.78rem!important;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--sg700)!important;padding:6px 10px 0!important}

/* illustration panels */
.art{position:relative;min-height:360px;display:flex;flex-direction:column;gap:10px;border-radius:20px;background:var(--sg200);padding:16px;overflow:hidden;font-size:12px;line-height:1.35}
.win{position:relative;flex:1;width:100%;max-width:380px;margin:0 auto;background:var(--n100);border-radius:14px;box-shadow:var(--sh-md);overflow:hidden;display:flex;flex-direction:column}
.bar{display:flex;align-items:center;gap:5px;padding:8px 10px;background:var(--n200);flex:none}
.bar i{width:7px;height:7px;border-radius:50%;background:var(--n400)}
.bar span{margin-left:8px;background:var(--n100);border-radius:999px;padding:2px 10px;font-size:10.5px;color:var(--n700);flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.wtitle{display:flex;justify-content:space-between;align-items:center;padding:10px 12px;border-bottom:1.5px solid var(--n200);font-weight:700;font-size:12px;flex:none}
.wtitle small{font-weight:500;color:var(--n700);font-size:10.5px}
.rv{opacity:0;transform:translateY(8px);transition:opacity .8s ease,transform .8s cubic-bezier(.2,.7,.2,1)}
.rv.on{opacity:1;transform:none}

/* 1 — website */
.site{padding:10px 12px;display:flex;flex-direction:column;gap:9px;flex:1}
.snav{display:flex;justify-content:space-between;align-items:center;font-size:10.5px;color:var(--n700)}
.snav b{font-family:var(--fh);font-weight:400;font-size:13px;color:var(--ink)}
.sh{font-family:var(--fh);font-size:15px;line-height:1.15}
.svcs{display:grid;grid-template-columns:1fr 1fr;gap:7px}
.svc{border:1.5px solid var(--n300);border-radius:10px;padding:7px 8px;font-weight:700;font-size:11px;display:grid;gap:2px;transition:border-color .7s,background .7s}
.svc small{font-weight:500;color:var(--n700);font-size:10px}
.svc .more{color:var(--sg700);font-weight:600;max-height:0;overflow:hidden;opacity:0;transition:max-height .8s,opacity .8s}
.svc.on{border-color:var(--sg600);background:var(--sg100)}
.svc.on .more{max-height:30px;opacity:1}
.book{align-self:flex-start;background:var(--ac);color:var(--bg);border-radius:999px;padding:7px 14px;font-weight:700;font-size:11.5px;transition:background .3s,transform .3s}
.book.press{background:var(--ac700);transform:scale(.96)}
.toast{margin:0 10px 10px;display:flex;align-items:center;gap:7px;background:#fff;border-radius:10px;padding:8px 10px;box-shadow:var(--sh-md);font-weight:600;font-size:11px}
.toast svg{color:var(--sg600);font-size:14px;flex:none}
.cursor{position:absolute;left:0;top:0;width:20px;height:20px;z-index:5;opacity:0;transition:transform 1.9s cubic-bezier(.45,.05,.25,1),opacity .6s;pointer-events:none}
.cursor.on{opacity:1}
.cursor svg{display:block;filter:drop-shadow(0 1px 1.5px rgb(0 0 0 / .25))}

/* 2 — follow-up */
.list{padding:10px 12px;display:flex;flex-direction:column;gap:8px;flex:1;position:relative}
.empty{position:absolute;inset:0;display:grid;place-items:center;color:var(--n700);font-size:11px;transition:opacity .6s}
.empty.off{opacity:0}
.row{display:flex;align-items:center;gap:8px}
.row .ico{flex:none;width:24px;height:24px;border-radius:50%;display:grid;place-items:center;font-size:12px;background:var(--n200);color:var(--n800)}
.row .t{display:grid;gap:1px;min-width:0}
.row .t b{font-size:11.5px}
.row .t span{font-size:10.5px;color:var(--n700)}
.av{background:var(--ac200)!important;color:var(--ac700)!important;font-weight:700;font-size:9.5px!important}
.bubble{margin-left:32px;background:var(--sg100);border:1.5px solid var(--sg300);border-radius:12px 12px 12px 4px;padding:7px 9px;display:grid;gap:6px;font-size:10.5px}
.bubble .lbl{font-weight:700;color:var(--sg700);font-size:10px;display:flex;align-items:center;gap:4px}
.bubble .mini{justify-self:start;background:var(--ac);color:var(--bg);border-radius:999px;padding:3px 10px;font-weight:700;font-size:10px}
.fu .ico{background:transparent;border:1.5px dashed var(--n400);color:var(--n700)}
.fu .stop{display:none;color:var(--sg700);font-weight:600}
.fu[data-state=stopped] .ico{border-style:solid;border-color:var(--sg400);color:var(--sg600)}
.fu[data-state=stopped] .sched{text-decoration:line-through;color:var(--n400)}
.fu[data-state=stopped] .stop{display:inline}
.booked .ico{background:var(--sg600);color:#fff}
.note{width:100%;max-width:380px;margin:0 auto;display:flex;gap:8px;align-items:flex-start;background:#fff;border-radius:12px;padding:8px 10px;box-shadow:var(--sh-md);font-size:10.5px;line-height:1.35}
.note .dot{flex:none;width:22px;height:22px;border-radius:50%;background:var(--ac100);color:var(--ac700);display:grid;place-items:center;font-size:11px}
.note b{display:block;font-size:11px}

/* 3 — care */
.checks{padding:8px 12px;display:flex;flex-direction:column;flex:1}
.chk{display:flex;align-items:center;gap:9px;padding:9px 0;border-bottom:1.5px solid var(--n200)}
.chk:last-child{border-bottom:0}
.chk .ico{flex:none;width:26px;height:26px;border-radius:8px;background:var(--n200);display:grid;place-items:center;font-size:13px;color:var(--n800)}
.chk .t{flex:1;min-width:0;display:grid;gap:1px}
.chk .t b{font-size:11.5px}
.chk .t span{font-size:10.5px;color:var(--n700)}
.st{flex:none;display:grid}
.st>*{grid-area:1/1;justify-self:end;height:22px;display:inline-flex;align-items:center;gap:4px;border-radius:999px;padding:0 9px;font-size:10px;font-weight:700;white-space:nowrap;opacity:0;transform:scale(.92);transition:opacity .6s,transform .6s}
.st svg{font-size:11px}
.s-q{background:var(--n200);color:var(--n700)}
.s-c{background:var(--n200);color:var(--n800)}
.s-ok{background:var(--sg200);color:var(--sg800)}
.s-w{background:var(--ac200);color:var(--ac700)}
.spin{width:9px;height:9px;border-radius:50%;border:2px solid var(--n400);border-top-color:var(--n800);animation:spin 1s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}
.chk:not([data-state]) .s-q,.chk[data-state=checking] .s-c,.chk[data-state=ok] .s-ok,.chk[data-state=warn] .s-w,.chk[data-state=fixed] .s-ok{opacity:1;transform:none}
.chk .sub-w,.chk .sub-f{display:none}
.chk[data-state=warn] .sub-d,.chk[data-state=fixed] .sub-d{display:none}
.chk[data-state=warn] .sub-w{display:inline;color:var(--ac700)}
.chk[data-state=fixed] .sub-f{display:inline;color:var(--sg700)}
.chk[data-state=warn]{background:linear-gradient(90deg,var(--ac100),transparent);margin:0 -12px;padding-left:12px;padding-right:12px}
.prog{height:5px;border-radius:999px;background:var(--n200);overflow:hidden;margin-top:4px;opacity:0;transition:opacity .5s}
.prog i{display:block;height:100%;width:0;background:var(--sg600);border-radius:999px;transition:width 2.4s ease-in-out}
.chk[data-state=checking] .prog,.chk[data-state=ok] .prog{opacity:1}
.chk[data-state=checking] .prog i,.chk[data-state=ok] .prog i{width:100%}
.chk[data-state=ok] .prog{opacity:0}

/* video + cta */
.video{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.75fr);gap:clamp(28px,5cqi,64px);align-items:center;margin-top:clamp(72px,10cqi,128px)}
.vtext{display:grid;gap:14px}
.vtext h3{font-size:clamp(1.8rem,3.2cqi,2.5rem);line-height:1.12}
.vtext p{font-size:1.1rem;line-height:1.55;color:var(--n800)}
.vframe{position:relative;aspect-ratio:16/9;border-radius:28px;overflow:hidden;background:var(--sg300);box-shadow:var(--sh-md)}
.vframe iframe,.vframe video{position:absolute;inset:0;width:100%;height:100%;border:0;background:#000}
.vbtn{position:absolute;inset:0;width:100%;border:0;background:transparent;cursor:pointer;display:grid;place-items:center;padding:0}
.blob{position:absolute;border-radius:50%;pointer-events:none}
.b1{width:62%;aspect-ratio:1;right:-14%;top:-38%;background:var(--sg200)}
.b2{width:30%;aspect-ratio:1;left:-8%;bottom:-18%;background:var(--sg400);opacity:.55}
.b3{width:9%;aspect-ratio:1;left:26%;top:14%;background:var(--ac200)}
.pbtn{position:relative;display:flex;align-items:center;gap:14px;background:var(--n100);border-radius:999px;padding:10px 22px 10px 10px;box-shadow:var(--sh-lg);font-weight:700;font-size:1.02rem;transition:transform .4s}
.pbtn .pc{width:52px;height:52px;border-radius:50%;background:var(--ac);color:var(--bg);display:grid;place-items:center;font-size:20px;transition:background .3s}
.pbtn .pc svg{fill:currentColor;margin-left:3px}
.vbtn:hover .pbtn{transform:scale(1.03)}
.vbtn:hover .pc{background:var(--ac600)}
.vbtn:active .pc{background:var(--ac700)}
.vbtn:focus-visible{outline-offset:-6px;border-radius:28px}
.vsoon{position:absolute;left:50%;bottom:18px;transform:translateX(-50%);background:var(--n100);border-radius:999px;padding:6px 14px;font-size:.85rem;color:var(--n800);box-shadow:var(--sh-sm);white-space:nowrap}
.cta-row{margin-top:clamp(56px,8cqi,96px)}
.cta{display:inline-flex;align-items:center;gap:12px;background:var(--ac);color:var(--bg);text-decoration:none;border-radius:999px;padding:18px 30px;font-weight:700;font-size:1.2rem;box-shadow:var(--sh-md);transition:background .25s,transform .25s}
.cta:hover{background:var(--ac600)}
.cta:active{background:var(--ac700);transform:translateY(1px)}
.cta svg{font-size:1.1em;transition:transform .25s}
.cta:hover svg{transform:translateX(3px)}
.sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}

@container (max-width: 1080px){
  .snav span{display:none}
}
@container (max-width: 1100px){
  ol.cards{grid-template-columns:1fr;gap:28px}
  .card{flex-direction:row;gap:14px}
  .body{min-width:0}
  .video{grid-template-columns:1fr}
}
@container (max-width: 480px){
  .controls{justify-content:flex-start}
  .card{gap:10px}
  .marker,.num{width:36px;height:36px}
  .art{min-height:0;padding:12px}
  .cta{padding:16px 24px;font-size:1.1rem}
}`;

  const html = `
<section class="wrap" aria-labelledby="rs-h">
  <div class="head">
    <h2 id="rs-h">Make it easier for people to reach you—and take the next step.</h2>
    <p>Thoughtful websites, enquiry follow-up, and ongoing support for busy therapy practices.</p>
  </div>

  <div class="controls">
    <button class="ctl" data-act="pause" type="button" aria-pressed="false">${ic.pause}<span>Pause</span></button>
    <button class="ctl" data-act="replay" type="button">${ic.replay}<span>Replay</span></button>
  </div>

  <ol class="cards" aria-label="Three services">
    <div class="track" aria-hidden="true"><div class="fill"></div></div>

    <li class="card" data-i="0">
      <div class="marker" aria-hidden="true"><div class="num">1</div></div>
      <div class="body">
        <div class="art" role="img" aria-label="Illustration: a visitor on an example practice website chooses a service, then clicks Book a consultation.">
          <div class="win" aria-hidden="true">
            <div class="bar"><i></i><i></i><i></i><span>willowcounselling.example</span></div>
            <div class="site">
              <div class="snav"><b>Willow Counselling</b><span>Therapists · Fees · Contact</span></div>
              <div class="sh">Support for individuals and couples, in person or online</div>
              <div class="svcs">
                <div class="svc">Individual therapy<small>Weekly sessions</small></div>
                <div class="svc" data-k="svc">Couples therapy<small>Weekly or fortnightly</small><small class="more">2 therapists · evenings</small></div>
              </div>
              <div class="book" data-k="book">Book a consultation</div>
            </div>
            <div class="toast rv" data-k="toast">${ic.cal}Choose a time for your free 15-minute call</div>
          </div>
          <div class="cursor" data-k="cursor" aria-hidden="true"><svg viewBox="0 0 24 24" width="20" height="20"><path d="M4.04 4.66a.5.5 0 0 1 .62-.62l16 5.5a.5.5 0 0 1-.06.96l-6.27 1.62a2 2 0 0 0-1.43 1.43l-1.62 6.27a.5.5 0 0 1-.96.06z" fill="#201e1d" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/></svg></div>
        </div>
        <p class="kicker">Website</p>
        <h3>A website that welcomes people in</h3>
        <p>Help visitors understand your services, find the right therapist, and book a consultation.</p>
      </div>
    </li>

    <li class="card" data-i="1">
      <div class="marker" aria-hidden="true"><div class="num">2</div></div>
      <div class="body">
        <div class="art" role="img" aria-label="Illustration: a new enquiry arrives and gets an acknowledgement with a booking link. A follow-up is scheduled, then stops once a consultation is booked. The practice is notified that a personal reply is needed.">
          <div class="win" aria-hidden="true">
            <div class="wtitle">Enquiries <small>Willow Counselling</small></div>
            <div class="list">
              <div class="empty" data-k="empty">No new enquiries yet</div>
              <div class="row rv" data-k="enq"><div class="ico av">SR</div><div class="t"><b>New enquiry · Sam R.</b><span>Website form · 9:12am</span></div></div>
              <div class="bubble rv" data-k="ack"><span class="lbl">${ic.mail}Acknowledgement sent · 9:12am</span><span>Thanks for getting in touch, Sam. You can book a free consultation here:</span><span class="mini">Book a time</span></div>
              <div class="row fu rv" data-k="fu"><div class="ico">${ic.clock}</div><div class="t"><b>Gentle follow-up</b><span><span class="sched">Scheduled for Thursday</span> <span class="stop">· stopped, already booked</span></span></div></div>
              <div class="row booked rv" data-k="booked"><div class="ico">${ic.check}</div><div class="t"><b>Consultation booked</b><span>Tuesday · 6:00pm</span></div></div>
            </div>
          </div>
          <div class="note rv" data-k="note" aria-hidden="true"><div class="dot">${ic.bell}</div><div><b>Personal reply needed</b>Sam asked a question about fees.</div></div>
        </div>
        <p class="kicker">Enquiry follow-up</p>
        <h3>Follow-up that keeps enquiries moving</h3>
        <p>Give new enquiries a clear next step, with timely acknowledgements and gentle follow-up.</p>
      </div>
    </li>

    <li class="card" data-i="2">
      <div class="marker" aria-hidden="true"><div class="num">3</div></div>
      <div class="body">
        <div class="art" role="img" aria-label="Illustration: a website check confirms the booking link works, flags a contact form issue that is then fixed, and publishes a small update to opening hours.">
          <div class="win" aria-hidden="true">
            <div class="wtitle">Website care <small>Monthly check</small></div>
            <div class="checks">
              <div class="chk" data-k="c1"><div class="ico">${ic.link}</div><div class="t"><b>Booking link</b><span class="sub-d">Opens the booking page</span></div>
                <div class="st"><span class="s-q">Queued</span><span class="s-c"><i class="spin"></i>Checking</span><span class="s-ok">${ic.check}Working</span></div></div>
              <div class="chk" data-k="c2"><div class="ico">${ic.mail}</div><div class="t"><b>Contact form</b><span class="sub-d">Sends to the practice inbox</span><span class="sub-w">Messages not arriving</span><span class="sub-f">Fixed and retested</span></div>
                <div class="st"><span class="s-q">Queued</span><span class="s-c"><i class="spin"></i>Checking</span><span class="s-ok">${ic.check}Working</span><span class="s-w">${ic.alert}Flagged</span></div></div>
              <div class="chk" data-k="c3"><div class="ico">${ic.pencil}</div><div class="t"><b>Update opening hours</b><span class="sub-d">Requested by the practice</span><div class="prog"><i></i></div></div>
                <div class="st"><span class="s-q">To do</span><span class="s-c"><i class="spin"></i>Updating</span><span class="s-ok">${ic.check}Published</span></div></div>
            </div>
          </div>
        </div>
        <p class="kicker">Website care</p>
        <h3>Ongoing website care</h3>
        <p>Keep your website current and catch problems with the links and forms people use to contact you.</p>
      </div>
    </li>
  </ol>

  <div class="video">
    <div class="vtext">
      <h3>See how this could work for your practice</h3>
      <p>A quick walkthrough with Miranda from Ren Strategies.</p>
    </div>
    <div class="vframe" data-k="vframe">
      <div class="blob b1"></div><div class="blob b2"></div><div class="blob b3"></div>
      <button class="vbtn" type="button" data-act="video" aria-label="Play video: See how this could work for your practice">
        <span class="pbtn"><span class="pc">${ic.play}</span>Watch the walkthrough</span>
      </button>
    </div>
  </div>

  <div class="cta-row">
    <a class="cta" data-k="cta" href="#contact">Let’s talk about your practice ${ic.arrow}</a>
  </div>
</section>`;

  const ease = (x) => (x < .5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2);

  class RenServices extends HTMLElement {
    static get observedAttributes() { return ['cta', 'video']; }
    constructor() {
      super();
      this.root = this.attachShadow({ mode: 'open' });
      this.root.innerHTML = `<style>${css}</style>${html}`;
      this.k = (n) => this.root.querySelector(`[data-k="${n}"]`);
      this.cards = [...this.root.querySelectorAll('.card')];
      this.elapsed = 0; this.fired = 0; this.playing = false; this.started = false; this.line = 0;
      this.cursorTarget = null;
      this.buildTimeline();
    }

    get pace() { const p = parseFloat(this.getAttribute('pace')); return p > 0 ? p : 1; }

    buildTimeline() {
      const on = (k) => () => this.k(k).classList.add('on');
      const st = (k, s) => () => (this.k(k).dataset.state = s);
      const act = (i) => () => this.cards.forEach((c, j) => { c.classList.toggle('active', j === i); if (j < i) c.classList.add('done'); });
      this.events = [
        [0, () => this.cards[0].classList.add('in')],
        [0.4, () => this.cards[1].classList.add('in')],
        [0.8, () => this.cards[2].classList.add('in')],
        [1.8, act(0)],
        // 1 — website
        [2.4, () => { this.moveCursor('start'); this.k('cursor').classList.add('on'); }],
        [3.4, () => this.moveCursor('svc')],
        [5.4, on('svc')],
        [7.8, () => this.moveCursor('book')],
        [9.8, () => this.k('book').classList.add('press')],
        [10.4, () => { this.k('book').classList.remove('press'); on('toast')(); }],
        [12.4, () => this.k('cursor').classList.remove('on')],
        [13.6, act(1)],
        // 2 — follow-up
        [14.6, () => { this.k('empty').classList.add('off'); on('enq')(); }],
        [17.0, on('ack')],
        [19.6, on('fu')],
        [22.2, on('booked')],
        [23.8, st('fu', 'stopped')],
        [26.0, on('note')],
        [29.8, act(2)],
        // 3 — care
        [30.8, st('c1', 'checking')],
        [32.4, st('c1', 'ok')],
        [33.6, st('c2', 'checking')],
        [35.2, st('c2', 'warn')],
        [38.0, st('c2', 'fixed')],
        [39.4, st('c3', 'checking')],
        [42.0, st('c3', 'ok')],
        [43.6, () => this.cards.forEach((c) => { c.classList.remove('active'); c.classList.add('done'); })],
      ];
      this.lineSegs = [[12.4, 14.0, 0, .5], [28.4, 30.0, .5, 1]];
      this.end = 44;
    }

    connectedCallback() {
      this.attributeChangedCallback();
      this.reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
      this.root.addEventListener('click', (e) => {
        const b = e.target.closest('[data-act]'); if (!b) return;
        const a = b.dataset.act;
        if (a === 'replay') this.replay();
        if (a === 'pause') this.playing ? this.pause() : this.resume();
        if (a === 'video') this.playVideo();
      });
      this.ro = new ResizeObserver(() => { this.layoutTrack(); if (this.cursorTarget) this.moveCursor(this.cursorTarget, true); });
      this.ro.observe(this);
      if (this.reduced) { this.showFinal(); return; }
      this.io = new IntersectionObserver((ents) => {
        this.classList.add('armed');
        if (ents.some((e) => e.isIntersecting) && !this.started) { this.started = true; this.resume(); this.io.disconnect(); }
      }, { threshold: 0.25 });
      this.io.observe(this.root.querySelector('ol.cards'));
    }
    disconnectedCallback() { this.io?.disconnect(); this.ro?.disconnect(); cancelAnimationFrame(this.raf); }
    attributeChangedCallback() {
      const a = this.k('cta'); if (a) a.href = this.getAttribute('cta') || '#contact';
    }

    showFinal() {
      this.classList.add('instant');
      this.reset();
      this.events.forEach(([, fn]) => fn());
      this.k('cursor').classList.remove('on');
      this.line = 1; this.layoutTrack();
      this.classList.add('reduced');
    }

    reset() {
      this.fired = 0; this.elapsed = 0; this.line = 0; this.cursorTarget = null;
      this.cards.forEach((c) => c.classList.remove('in', 'active', 'done'));
      this.root.querySelectorAll('.on,.press,.off').forEach((n) => n.classList.remove('on', 'press', 'off'));
      this.root.querySelectorAll('[data-state]').forEach((n) => n.removeAttribute('data-state'));
      this.layoutTrack();
    }
    replay() {
      this.classList.add('instant'); this.reset();
      requestAnimationFrame(() => requestAnimationFrame(() => { this.classList.remove('instant'); this.resume(); }));
    }
    resume() {
      if (this.elapsed >= this.end) { this.replay(); return; }
      this.playing = true; this.last = performance.now(); this.setPauseUI();
      cancelAnimationFrame(this.raf); this.raf = requestAnimationFrame((t) => this.tick(t));
    }
    pause() { this.playing = false; cancelAnimationFrame(this.raf); this.setPauseUI(); }
    setPauseUI() {
      const b = this.root.querySelector('[data-act="pause"]');
      const paused = !this.playing && this.elapsed < this.end && this.elapsed > 0;
      b.innerHTML = `${paused ? ic.play : ic.pause}<span>${paused ? 'Play' : 'Pause'}</span>`;
      b.setAttribute('aria-pressed', String(paused));
      b.disabled = this.elapsed >= this.end;
      b.style.opacity = b.disabled ? .45 : 1;
    }
    tick(now) {
      if (!this.playing) return;
      this.elapsed += Math.min(now - this.last, 100) / 1000 / this.pace;
      this.last = now;
      while (this.fired < this.events.length && this.events[this.fired][0] <= this.elapsed) this.events[this.fired++][1]();
      let p = 0;
      for (const [a, b, p0, p1] of this.lineSegs) {
        if (this.elapsed >= b) p = p1; else if (this.elapsed > a) { p = p0 + (p1 - p0) * ease((this.elapsed - a) / (b - a)); break; } else break;
      }
      if (p !== this.line) { this.line = p; this.layoutTrack(); }
      if (this.elapsed >= this.end) { this.playing = false; this.setPauseUI(); return; }
      this.raf = requestAnimationFrame((t) => this.tick(t));
    }

    layoutTrack() {
      const ol = this.root.querySelector('ol.cards'), tr = this.root.querySelector('.track'), fill = tr.firstElementChild;
      const o = ol.getBoundingClientRect();
      const c = [...this.root.querySelectorAll('.num')].map((n) => { const r = n.getBoundingClientRect(); return { x: r.left - o.left + r.width / 2, y: r.top - o.top + r.height / 2 }; });
      if (!o.width) return;
      const horiz = Math.abs(c[2].x - c[0].x) > Math.abs(c[2].y - c[0].y);
      const d1 = horiz ? c[1].x - c[0].x : c[1].y - c[0].y, d2 = horiz ? c[2].x - c[1].x : c[2].y - c[1].y;
      const len = this.line <= .5 ? d1 * (this.line / .5) : d1 + d2 * ((this.line - .5) / .5);
      Object.assign(tr.style, horiz
        ? { left: c[0].x + 'px', top: c[0].y - 1 + 'px', width: d1 + d2 + 'px', height: '2px' }
        : { left: c[0].x - 1 + 'px', top: c[0].y + 'px', width: '2px', height: d1 + d2 + 'px' });
      Object.assign(fill.style, horiz ? { width: len + 'px', height: '2px' } : { height: len + 'px', width: '2px' });
    }

    moveCursor(key, instant) {
      this.cursorTarget = key;
      const art = this.cards[0].querySelector('.art'), cur = this.k('cursor');
      const a = art.getBoundingClientRect();
      let x, y;
      if (key === 'start') { x = a.width * .78; y = a.height * .9; }
      else { const r = this.k(key).getBoundingClientRect(); x = r.left - a.left + r.width * .55; y = r.top - a.top + r.height * .55; }
      if (instant) { cur.style.transition = 'none'; requestAnimationFrame(() => (cur.style.transition = '')); }
      cur.style.transform = `translate(${x}px, ${y}px)`;
    }

    playVideo() {
      const src = this.getAttribute('video'), f = this.k('vframe');
      if (!src) {
        if (!f.querySelector('.vsoon')) f.insertAdjacentHTML('beforeend', '<div class="vsoon" role="status">The walkthrough video is coming soon.</div>');
        return;
      }
      if (/\.(mp4|webm|mov)(\?|$)/i.test(src)) {
        f.innerHTML = `<video src="${src}" controls playsinline autoplay title="Walkthrough with Miranda from Ren Strategies"></video>`;
      } else {
        const u = src + (src.includes('?') ? '&' : '?') + 'autoplay=1';
        f.innerHTML = `<iframe src="${u}" title="Walkthrough with Miranda from Ren Strategies" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
      }
      f.querySelector('video,iframe').focus?.();
    }
  }

  customElements.define('ren-services', RenServices);
})();

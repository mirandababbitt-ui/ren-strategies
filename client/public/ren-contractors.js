/* <ren-contractors> — enquiry & follow-up support page for contractors, Ren Strategies.
   Self-contained web component. Attributes:
     pace  – timing multiplier (1 = default, 1.5 = 50% slower)
     video – optional YouTube/Vimeo embed URL or .mp4; loads only on click
     cta   – link for the call-to-action button (default "#contact")
*/
(() => {
  if (customElements.get('ren-contractors')) return;
  const I = (p) => `<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
  const PH = '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>';
  const ic = {
    phone: I(PH),
    missed: I(PH + '<line x1="22" x2="16" y1="2" y2="8"/><line x1="16" x2="22" y1="2" y2="8"/>'),
    msg: I('<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>'),
    cal: I('<rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>'),
    bell: I('<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>'),
    check: I('<path d="M20 6 9 17l-5-5"/>'),
    arrow: I('<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>'),
    replay: I('<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>'),
    pause: I('<rect x="14" y="4" width="4" height="16" rx="1"/><rect x="6" y="4" width="4" height="16" rx="1"/>'),
    play: I('<polygon points="6 3 20 12 6 21 6 3"/>'),
    globe: I('<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>'),
    mail: I('<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>'),
    send: I('<path d="M14.54 21.69a.5.5 0 0 0 .94-.03l6.5-19a.5.5 0 0 0-.64-.64l-19 6.5a.5.5 0 0 0-.03.94l7.93 3.18a2 2 0 0 1 1.11 1.11z"/><path d="m21.85 2.15-10.94 10.93"/>'),
    reply: I('<polyline points="9 17 4 12 9 7"/><path d="M20 18v-2a4 4 0 0 0-4-4H4"/>'),
    clip: I('<rect width="8" height="4" x="8" y="2" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/>'),
    shield: I('<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>'),
  };

  const css = `
:host{
  --bg:#f7f5f2; --surface:#efeae4; --ink:#1a1a1a;
  --n100:#f7f5f2; --n200:#efeae4; --n300:#e4ddd4; --n400:#cfc6bb; --n700:#666666; --n800:#3a3a3a;
  --ac:#d4a574; --ac100:#f8efe6; --ac200:#f3e4d4; --ac300:#e8d0b4; --ac600:#c4925f; --ac700:#a87545;
  --sg100:#f3f5f3; --sg200:#e6ebe7; --sg300:#d5ddd7; --sg400:#b7c2ba; --sg600:#9da89f; --sg700:#6f7b74; --sg800:#4e5852;
  --fh:"Cormorant Garamond", Georgia, serif; --fb:"Nunito Sans", system-ui, sans-serif;
  --sh-sm:0 1px 2px rgb(46 43 37 / .14); --sh-md:0 3px 10px rgb(46 43 37 / .16); --sh-lg:0 12px 32px rgb(46 43 37 / .18);
  display:block; container-type:inline-size; background:var(--bg); color:var(--ink); font-family:var(--fb); -webkit-font-smoothing:antialiased;
}
*{box-sizing:border-box}
:host(.instant) *,:host(.instant) *::before,:host(.instant) *::after{transition:none!important;animation:none!important}
.wrap{max-width:1200px;margin:0 auto;padding:clamp(56px,9cqi,120px) clamp(18px,5cqi,56px)}
h2,h3{font-family:var(--fh);font-weight:400;margin:0;text-wrap:balance}
p{margin:0;text-wrap:pretty}
button{font:inherit;color:inherit}
:focus-visible{outline:2px solid var(--ac);outline-offset:3px}
.head{max-width:820px;display:grid;gap:18px}
.head h2{font-size:clamp(2.1rem,5cqi,3.6rem);line-height:1.06;letter-spacing:-.01em}
.head p{font-size:clamp(1.1rem,1.8cqi,1.32rem);line-height:1.55;color:var(--n800);max-width:56ch}
.jump{justify-self:start;width:fit-content;font-size:.95rem;font-weight:700;color:var(--ink);text-underline-offset:4px}
.leadin{margin:clamp(36px,5cqi,56px) 0 0;font-family:var(--fh);font-weight:400;font-size:clamp(1.45rem,2.6cqi,2rem);line-height:1.15}

/* workflow */
.flow{margin-top:clamp(40px,6cqi,64px);background:var(--n100);border-radius:32px;padding:clamp(18px,3cqi,36px);box-shadow:var(--sh-sm)}
.bar{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:clamp(18px,3cqi,28px)}
.tag{display:inline-flex;align-items:center;gap:6px;border-radius:999px;padding:6px 14px;font-size:.82rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;background:var(--sg200);color:var(--sg800)}
.ctls{display:flex;gap:8px}
.ctl{display:inline-flex;align-items:center;gap:8px;border:1.5px solid var(--n300);background:transparent;border-radius:0;padding:9px 16px;font-size:.92rem;font-weight:600;color:var(--n800);cursor:pointer;min-height:44px}
.ctl:hover{background:rgb(32 30 29 / .06)}
.ctl:active{background:var(--ac200);border-color:var(--ac)}
.ctl:disabled{opacity:.45;cursor:default}
.ctl svg{font-size:15px}
:host(.reduced) .ctls{display:none}
.grid{display:grid;grid-template-columns:minmax(0,.85fr) minmax(0,2fr);gap:clamp(24px,4cqi,48px);align-items:start}

ol.steps{list-style:none;margin:0;padding:0;display:grid;gap:6px;counter-reset:s}
.steps li{display:grid;grid-template-columns:36px 1fr;gap:12px;align-items:start;padding:10px 12px;border-radius:18px;transition:background .7s}
.steps .n{width:36px;height:36px;border-radius:50%;display:grid;place-items:center;font-weight:700;border:2px solid var(--n400);color:var(--n800);background:var(--n100);transition:all .7s}
.steps b{display:block;font-size:1.05rem;line-height:1.3;margin-top:6px}
.steps span.d{display:block;font-size:.95rem;line-height:1.45;color:var(--n700);margin-top:3px}
.steps li.active{background:var(--sg200)}
.steps li.active .n{background:var(--sg600);border-color:var(--sg600);color:#fff}
.steps li.done .n{background:var(--sg200);border-color:var(--sg400);color:var(--sg800)}

.stage{display:grid;grid-template-columns:minmax(0,1fr) 290px;gap:clamp(16px,2.5cqi,28px);align-items:stretch;background:var(--sg200);border-radius:28px;padding:clamp(14px,2.4cqi,26px)}
.rv{opacity:0;transform:translateY(10px);transition:opacity .8s ease,transform .8s cubic-bezier(.2,.7,.2,1)}
.rv.on{opacity:1;transform:none}

/* practice side */
.desk{display:flex;flex-direction:column;gap:12px}
.lbl{font-size:.8rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--sg800);padding:2px 4px}
.box{background:var(--n100);border-radius:18px;padding:14px;box-shadow:var(--sh-sm);display:flex;align-items:center;gap:12px}
.av{flex:none;width:42px;height:42px;border-radius:50%;display:grid;place-items:center;font-weight:700;font-size:.92rem;background:var(--ac200);color:var(--ac700)}
.who{flex:1;min-width:0;display:grid;gap:2px}
.who b{font-size:1rem}
.who span{font-size:.88rem;color:var(--n700)}
.pill{flex:none;display:inline-flex;align-items:center;gap:7px;border-radius:999px;padding:6px 12px;font-size:.88rem;font-weight:700;background:var(--n200);color:var(--n700);transition:background .7s,color .7s}
.pill i{width:8px;height:8px;border-radius:50%;background:var(--n400);transition:background .7s}
.pill .s2{display:none}
.status[data-state=session] .pill{background:var(--sg200);color:var(--sg800)}
.status[data-state=session] .pill i{background:var(--sg600)}
.status[data-state=session] .pill .s1{display:none}
.status[data-state=session] .pill .s2{display:inline}
.call .ci{flex:none;width:42px;height:42px;border-radius:50%;display:grid;place-items:center;font-size:18px;background:var(--sg200);color:var(--sg700);position:relative;transition:background .6s,color .6s}
.call .ci .ic2{display:none}
.call[data-state=ringing] .ci{animation:wob 1.1s ease-in-out infinite}
.call[data-state=missed] .ci{background:var(--ac200);color:var(--ac700)}
.call[data-state=missed] .ci .ic1{display:none}
.call[data-state=missed] .ci .ic2{display:block}
@keyframes wob{0%,60%,100%{transform:none}10%,30%,50%{transform:rotate(-10deg)}20%,40%{transform:rotate(10deg)}}
.call .m,.call .x{display:none}
.call[data-state=missed] .r{display:none}
.call[data-state=missed] .m{display:inline}
.call .x{color:var(--sg700);font-weight:600}
.call.sent .x{display:inline}
.note{flex-direction:column;align-items:stretch;gap:10px;border:2px solid var(--ac300)}
.note .top{display:flex;align-items:center;gap:10px}
.note .bi{flex:none;width:34px;height:34px;border-radius:50%;display:grid;place-items:center;background:var(--ac100);color:var(--ac700);font-size:16px}
.note .rn{display:inline-flex;align-items:center;border-radius:999px;padding:4px 11px;background:var(--ac);color:var(--ink);font-weight:700;font-size:.85rem}
.note .tm{margin-left:auto;font-size:.82rem;color:var(--n700)}
.note b{font-size:1rem}
.note q{font-size:.95rem;color:var(--n800);quotes:"“" "”"}
.note .acts{display:flex;gap:8px;flex-wrap:wrap}
.jv{display:inline-flex;align-items:center;gap:8px;align-self:flex-start;border-radius:999px;padding:5px 12px 5px 6px;background:var(--sg200);color:var(--sg800);font-size:.88rem;font-weight:600}
.jv strong{background:var(--sg700);color:#fff;border-radius:999px;padding:2px 9px;font-weight:700}
.svc .jv{margin-top:-2px}
.mini{display:inline-flex;align-items:center;gap:6px;border-radius:999px;padding:6px 13px;font-size:.85rem;font-weight:700;border:1.5px solid var(--n300);color:var(--n800)}
.mini.p{background:var(--ink);color:var(--n100);border-color:var(--ink)}

/* caller phone */
.phone{position:relative;background:var(--ink);border-radius:40px;padding:9px;box-shadow:var(--sh-lg);align-self:start}
.scr{position:relative;background:var(--n100);border-radius:32px;overflow:hidden;min-height:500px;display:flex;flex-direction:column}
.ph{display:flex;flex-direction:column;align-items:center;gap:4px;padding:22px 12px 12px;border-bottom:1.5px solid var(--n200)}
.ph .av{width:38px;height:38px;font-size:.8rem;background:var(--sg200);color:var(--sg800)}
.ph b{font-size:.92rem}
.ph span{font-size:.76rem;color:var(--n700)}
.thread{flex:1;display:flex;flex-direction:column;gap:10px;padding:14px 12px}
.inb{align-self:flex-start;max-width:90%;background:var(--n200);border-radius:18px 18px 18px 6px;padding:10px 12px;font-size:.95rem;line-height:1.42}
.typing{align-self:flex-start;background:var(--n200);border-radius:18px;padding:12px 14px;display:flex;gap:4px}
.typing i{width:7px;height:7px;border-radius:50%;background:var(--n400);animation:dot 1.2s infinite}
.typing i:nth-child(2){animation-delay:.2s}.typing i:nth-child(3){animation-delay:.4s}
@keyframes dot{0%,60%,100%{opacity:.35}30%{opacity:1}}
.typing.gone{display:none}
.opts{display:grid;gap:8px}
.opt{display:flex;align-items:center;justify-content:center;gap:8px;border-radius:999px;padding:10px 12px;font-size:.92rem;font-weight:700;border:2px solid var(--sg400);color:var(--sg800);background:var(--n100);transition:background .4s,color .4s,transform .3s}
.opt svg{font-size:15px}
.or{font-size:.78rem;color:var(--n700);text-align:center}
.opt.tap{background:var(--sg600);border-color:var(--sg600);color:#fff;transform:scale(.97)}
.out{align-self:flex-end;max-width:85%;background:var(--sg600);color:#fff;border-radius:18px 18px 6px 18px;padding:10px 12px;font-size:.95rem;line-height:1.4}
.calling{position:absolute;inset:0;background:var(--sg200);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;text-align:center;opacity:0;pointer-events:none;transition:opacity .8s}
.calling.on{opacity:1}
.calling b{font-family:var(--fh);font-weight:400;font-size:1.3rem}
.calling .cs{font-size:.95rem;color:var(--sg800);font-weight:600}
.calling .cs2{display:none;color:var(--ac700)}
.calling[data-state=missed] .cs1{display:none}
.calling[data-state=missed] .cs2{display:block}
.ring{position:relative;width:76px;height:76px;border-radius:50%;background:var(--sg600);color:#fff;display:grid;place-items:center;font-size:28px;margin-bottom:8px}
.ring::before,.ring::after{content:"";position:absolute;inset:0;border-radius:50%;border:2px solid var(--sg600);opacity:0}
.calling:not([data-state=missed]) .ring::before{animation:rip 2s ease-out infinite}
.calling:not([data-state=missed]) .ring::after{animation:rip 2s ease-out 1s infinite}
.calling[data-state=missed] .ring{background:var(--ac600)}
@keyframes rip{from{transform:scale(1);opacity:.7}to{transform:scale(1.9);opacity:0}}
.fine{margin-top:16px;font-size:.88rem;color:var(--n700)}

/* section heads */
.vsec{margin-top:clamp(72px,10cqi,128px);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:clamp(28px,5cqi,64px);align-items:center}
.value{display:grid;gap:16px;max-width:620px}
.pipe{background:var(--n100);border-radius:28px;padding:clamp(18px,3cqi,28px);box-shadow:var(--sh-md);display:grid;gap:4px}
.pipe .ph2{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:8px}
.pipe .ph2 b{font-size:1.05rem}
.prow{display:grid;grid-template-columns:34px minmax(0,1fr) auto;gap:12px;align-items:center;padding:12px 0;border-bottom:1.5px solid var(--n200)}
.prow:last-of-type{border-bottom:0}
.prow .mi{width:34px;height:34px;border-radius:50%;display:grid;place-items:center;font-size:15px;background:var(--ac100);color:var(--ac700)}
.prow .tx{display:grid;gap:2px;min-width:0}
.prow .tx b{font-size:1rem}
.prow .tx span{font-size:.88rem;color:var(--n700)}
.prow .amt{font-family:var(--fh);font-size:1.3rem;color:var(--ink);white-space:nowrap}
.ptot{display:flex;flex-direction:column;align-items:flex-start;gap:4px;margin-top:8px;padding:14px 16px;border-radius:18px;background:var(--sg200);color:var(--sg800);font-weight:700}
.ptot .amt{font-family:var(--fh);font-weight:400;font-size:clamp(2rem,4cqi,2.8rem);line-height:1;color:var(--sg800)}
.ptot .lab{font-size:1rem;line-height:1.35}
.nexts{font-size:1.05rem;font-weight:700;color:var(--ink);margin-top:8px}
.pfine{font-size:.85rem;line-height:1.45;color:var(--n700);margin-top:6px}
.scope{margin:clamp(48px,7cqi,80px) 0 0;max-width:62ch;font-size:1.05rem;line-height:1.55;color:var(--n800)}
.value h3{font-size:clamp(2rem,4.6cqi,3.4rem);line-height:1.08}
.value p{font-size:clamp(1.08rem,1.7cqi,1.25rem);line-height:1.55;color:var(--n800);max-width:52ch}

/* services */
.svcs{list-style:none;margin:clamp(40px,6cqi,64px) 0 0;padding:0;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(16px,2.4cqi,28px)}
.svc{background:var(--n100);border-radius:28px;padding:26px;display:flex;flex-direction:column;gap:12px;box-shadow:var(--sh-sm)}
.svc .top{display:flex;align-items:center;justify-content:space-between;gap:10px}
.svc .si{width:46px;height:46px;border-radius:50%;display:grid;place-items:center;font-size:20px;background:var(--sg200);color:var(--sg700)}
.svc .ex{font-size:.78rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--n700);border:1.5px solid var(--n300);border-radius:999px;padding:4px 10px}
.svc h4{font-family:var(--fh);font-weight:400;font-size:1.4rem;line-height:1.2;margin:0}
.svc p{font-size:1rem;line-height:1.55;color:var(--n800)}
.mf{list-style:none;margin:6px 0 0;padding:16px 14px;background:var(--sg200);border-radius:20px;display:grid;gap:0}
.mf li{position:relative;display:grid;grid-template-columns:30px 1fr;gap:10px;padding-bottom:14px;transition:opacity .8s ease,transform .8s cubic-bezier(.2,.7,.2,1)}
.mf li:last-child{padding-bottom:0}
.mf li::before{content:"";position:absolute;left:14px;top:30px;bottom:0;width:2px;background:var(--sg400)}
.mf li:last-child::before{display:none}
:host(.armed) .svc:not(.go) .mf li{opacity:0;transform:translateY(8px)}
.svc.go .mf li:nth-child(2){transition-delay:1.4s}.svc.go .mf li:nth-child(3){transition-delay:2.8s}.svc.go .mf li:nth-child(4){transition-delay:4.2s}
.mf .mi{width:30px;height:30px;border-radius:50%;display:grid;place-items:center;font-size:14px;background:var(--n100);color:var(--sg700)}
.mf .mi.w{background:var(--ac200);color:var(--ac700)}
.mf .mi.ok{background:var(--sg600);color:#fff}
.mf b{display:block;font-size:.95rem;line-height:1.3;padding-top:5px}
.mf span.t{display:block;font-size:.88rem;line-height:1.4;color:var(--n800);margin-top:2px}

/* reassurance */
.assure{margin-top:clamp(56px,8cqi,96px);background:var(--sg200);border-radius:32px;padding:clamp(24px,4cqi,48px);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.2fr);gap:clamp(20px,4cqi,56px);align-items:start}
.assure h3{font-size:clamp(1.6rem,3cqi,2.2rem);line-height:1.15}
.assure .at{display:grid;gap:12px}
.assure p{font-size:1.08rem;line-height:1.6;color:var(--sg800)}
.final{margin-top:clamp(56px,8cqi,96px);display:grid;gap:24px;justify-items:start;width:100%}
.final h3{font-size:clamp(1.8rem,3.6cqi,2.8rem);line-height:1.12;max-width:16em}
#plans{scroll-margin-top:96px}
.final .ask{margin:0;max-width:46ch;font-size:1.05rem;line-height:1.5;color:var(--n800)}
.tiers{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;width:100%}
.tiers li{display:grid;gap:6px;align-content:start;background:var(--n100);padding:18px 18px 20px;box-shadow:var(--sh-sm)}
.tiers li.feat{background:var(--ac100);box-shadow:var(--sh-md);outline:2px solid var(--ac)}
.tiers b{font-family:var(--fh);font-weight:400;font-size:clamp(1.45rem,2.4cqi,1.8rem);line-height:1.1}
.tiers .name{font-weight:700;font-size:1rem;line-height:1.3}
.tiers span{font-size:.98rem;line-height:1.45;color:var(--n800)}

/* video + cta */
.video{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.75fr);gap:clamp(28px,5cqi,64px);align-items:center;margin-top:clamp(72px,10cqi,128px)}
.vtext{display:grid;gap:14px}
.vtext h3{font-size:clamp(1.7rem,3cqi,2.3rem);line-height:1.15}
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
.cta{display:inline-flex;align-items:center;gap:12px;background:var(--ac);color:var(--ink);text-decoration:none;border-radius:0;padding:18px 30px;font-weight:700;font-size:1.2rem;box-shadow:var(--sh-md);transition:background .25s,transform .25s}
.cta:hover{background:var(--ac600)}
.cta:active{background:var(--ac700);transform:translateY(1px)}
.cta svg{font-size:1.1em;flex:none;transition:transform .25s}
.cta:hover svg{transform:translateX(3px)}

@container (max-width: 1100px){
  .grid{grid-template-columns:1fr}
  .svcs{grid-template-columns:1fr 1fr}
  .tiers{grid-template-columns:1fr}
  .steps li{padding:8px 12px}
}
@container (max-width: 760px){
  :host(.seq) .steps li:not(.active){display:none}
  :host(.seq) .steps li.active{background:var(--sg200)}
  .stage{grid-template-columns:1fr}
  .phone{justify-self:center;width:100%;max-width:300px}
  .scr{min-height:470px}
  .svcs{grid-template-columns:1fr}
  .tiers{grid-template-columns:1fr}
  .video{grid-template-columns:1fr}
  .assure{grid-template-columns:1fr}
  .vsec{grid-template-columns:1fr}
}
@container (max-width: 480px){
  .flow{border-radius:26px;padding:14px}
  .stage{border-radius:22px;padding:12px}
  .box{padding:12px;gap:10px}
  .pill{padding:5px 10px;font-size:.82rem}
  .cta{padding:16px 22px;font-size:1.05rem}
}`;

  const html = `
<section class="wrap" aria-labelledby="mc-h">
  <div class="head">
    <h2 id="mc-h">You can’t always get to the phone. What if it’s your next renovation customer?</h2>
    <p>You’re on a job, meeting a client, or focused on getting work finished. A call comes in, and you can’t answer.</p>
    <p>An automatic text gives the caller a way to share their project details or request a callback. You get notified, so you know who needs a response when you’re available.</p>
    <a class="jump" href="#plans" data-act="plans">See plans and pricing</a>
  </div>

  <h3 class="leadin">See what happens when you miss a call.</h3>

  <div class="flow">
    <div class="bar">
      <span class="tag">Example workflow</span>
      <div class="ctls">
        <button class="ctl" data-act="pause" type="button" aria-pressed="false">${ic.pause}<span>Pause</span></button>
        <button class="ctl" data-act="replay" type="button">${ic.replay}<span>Replay</span></button>
      </div>
    </div>
    <div class="grid">
      <ol class="steps" aria-label="Example workflow steps">
        <li data-step="0"><span class="n">1</span><span><b>You’re focused on work</b><span class="d">A call can come in while you’re in the middle of something else.</span></span></li>
        <li data-step="1"><span class="n">2</span><span><b>A call goes unanswered</b><span class="d">It rings, then shows as a missed call.</span></span></li>
        <li data-step="2"><span class="n">3</span><span><b>They get a text from your business</b><span class="d">It names Northside Renovations, with a quote-form link and a way to request a callback.</span></span></li>
        <li data-step="3"><span class="n">4</span><span><b>They send details, or ask for a call</b><span class="d">Project details, or a callback request.</span></span></li>
        <li data-step="4"><span class="n">5</span><span><b>You get a notification</b><span class="d">It shows what they sent, and the next action.</span></span></li>
      </ol>

      <div class="stage" role="img" aria-label="Illustration of the example workflow: the practice view on one side and the caller's phone on the other.">
        <div class="desk" aria-hidden="true">
          <div class="lbl">Your view</div>
          <div class="box status" data-k="status">
            <div class="av">DR</div>
            <div class="who"><b>Dan Reyes</b><span>Owner · Northside Renovations</span></div>
          </div>
          <div class="box call rv" data-k="call">
            <div class="ci"><span class="ic1">${ic.phone}</span><span class="ic2">${ic.missed}</span></div>
            <div class="who"><b><span class="r">Incoming call</span><span class="m">Missed call</span></b><span>New number · 2:14pm <span class="x">· text reply sent</span></span></div>
          </div>
          <div class="box note rv" data-k="note">
            <div class="top"><div class="bi">${ic.bell}</div><span class="rn">Next action</span><span class="tm">2:19pm</span></div>
            <div class="who"><b>Call Jordan M. back</b><q>Kitchen renovation. Weekday mornings work best for a call.</q></div>
            <div class="acts"><span class="mini p">${ic.phone}Call back</span><span class="mini">Mark as handled</span></div>
          </div>
        </div>

        <div class="phone" aria-hidden="true">
          <div class="scr">
            <div class="ph"><div class="av">NR</div><b>Northside Renovations</b><span>Text message</span></div>
            <div class="thread">
              <div class="typing rv" data-k="typing"><i></i><i></i><i></i></div>
              <div class="inb rv" data-k="sms">This is Northside Renovations. Sorry we missed your call. You can request a quote here, or ask for a callback.</div>
              <div class="opts rv" data-k="opts">
                <span class="opt">${ic.clip}Request a quote</span>
                <span class="or">or</span>
                <span class="opt" data-k="cb">${ic.phone}Request a callback</span>
              </div>
              <div class="out rv" data-k="reply">It’s a kitchen renovation. Weekday mornings work best for a call.</div>
            </div>
            <div class="calling" data-k="calling">
              <div class="ring">${ic.phone}</div>
              <b>Northside Renovations</b>
              <span class="cs cs1">Calling…</span>
              <span class="cs cs2">No answer</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="fine">Illustrative example. Message wording, quote links, and follow-up are configured for your business.</p>
  </div>

  <div class="vsec">
    <div class="value">
      <h3>A reply is how you find out what the job is.</h3>
      <p>These amounts are examples of potential project value. They come from details someone supplied, or from your own estimate. They are not calculated from a missed call on its own, and they are not a promise that every inquiry becomes a job.</p>
    </div>
    <div class="pipe" role="group" aria-label="Fictional examples of potential project value">
      <div class="ph2"><b>Example inquiries</b><span class="tag">Fictional</span></div>
      <div class="prow"><span class="mi">${ic.missed}</span><span class="tx"><b>Jordan M. · Kitchen renovation</b><span>Callback requested. Return the call.</span></span><span class="amt">$25,000</span></div>
      <div class="prow"><span class="mi">${ic.mail}</span><span class="tx"><b>Priya S. · Bathroom renovation</b><span>Quote request received. Review details and respond.</span></span><span class="amt">$14,000</span></div>
      <div class="prow"><span class="mi">${ic.clip}</span><span class="tx"><b>Lee T. · Deck build</b><span>Estimate sent, awaiting customer reply. Follow up on the agreed date.</span></span><span class="amt">$18,000</span></div>
      <div class="ptot"><span class="amt">$57,000</span><span class="lab">in potential project value</span></div>
      <p class="nexts">Three inquiries. Three next steps.</p>
      <p class="pfine">Fictional examples. Amounts illustrate potential project revenue, not profit, confirmed bookings, or revenue recovered by this service.</p>
    </div>
  </div>

  <p class="scope">The plans below cover missed-call inquiries. Acknowledging a website quote request, and following up after an estimate is sent, can be added separately.</p>

  <ul class="svcs" aria-label="Example workflows. Website quote requests and estimate follow-up are optional.">
    <li class="svc"><div class="top"><div class="si">${ic.phone}</div><span class="ex">In the plans</span></div>
      <h4>Responding to a missed call</h4><p>A text goes out with your quote-form link and a way to request a callback. You get a notification with what they sent and the next action.</p>
      <ol class="mf">
        <li><span class="mi w">${ic.missed}</span><span><b>Missed call</b><span class="t">New number · 2:14pm</span></span></li>
        <li><span class="mi">${ic.msg}</span><span><b>Text response sent</b><span class="t">Quote-form link, or a request for a callback</span></span></li>
        <li><span class="mi">${ic.reply}</span><span><b>Details or a callback request</b><span class="t">“It’s a kitchen renovation.”</span></span></li>
        <li><span class="mi ok">${ic.bell}</span><span><b>Notification for you</b><span class="t">Call Jordan back</span></span></li>
      </ol>
    </li>
    <li class="svc"><div class="top"><div class="si">${ic.mail}</div><span class="ex">Optional</span></div>
      <h4>Acknowledging a website quote request</h4><p>Optional, and scoped separately. They can get a short acknowledgement in the time you and I agree. There is no set number of days unless you choose one.</p>
      <ol class="mf">
        <li><span class="mi">${ic.mail}</span><span><b>Quote request received</b><span class="t">Website form · Priya S. · bathroom renovation</span></span></li>
        <li><span class="mi">${ic.send}</span><span><b>Acknowledgement sent</b><span class="t">“Thanks for getting in touch. We’ll reply within the time we agreed, to arrange a visit.”</span></span></li>
        <li><span class="mi w">${ic.bell}</span><span><b>Reply needed</b><span class="t">Stays visible until you respond</span></span></li>
        <li><span class="mi ok">${ic.check}</span><span><b>Marked as handled</b><span class="t">By you · Wednesday</span></span></li>
      </ol>
    </li>
    <li class="svc"><div class="top"><div class="si">${ic.clip}</div><span class="ex">Optional</span></div>
      <h4>Following up after an estimate is sent</h4><p>Optional, and scoped separately. A check-in can go out on the date you choose, using a message you’ve approved.</p>
      <ol class="mf">
        <li><span class="mi">${ic.clip}</span><span><b>You mark the estimate as sent</b><span class="t">Deck build · follow-up on the date you set</span></span></li>
        <li><span class="mi">${ic.send}</span><span><b>Your approved message is sent</b><span class="t">“Just checking the estimate came through. Happy to answer any questions.”</span></span></li>
        <li><span class="mi">${ic.reply}</span><span><b>A reply comes in</b><span class="t">“Thanks. Could the work start in May?”</span></span></li>
        <li><span class="mi ok">${ic.bell}</span><span><b>It comes back to you</b><span class="t">Shown as reply needed</span></span></li>
      </ol>
    </li>
  </ul>

  <div class="assure">
    <h3>I start with the phone, website, email, and job tools you already use.</h3>
    <div class="at">
      <p>Phone setup and call routing are reviewed first. Then I look at how inquiries reach you, and recommend only what fits. Nothing is assumed to connect until that review is done.</p>
      <p>The setup collects what the caller sends. You still set prices, availability, and what you commit to.</p>
      <p>Automated follow-up stops at the handoff we configure. A call or message you handle outside that setup may need to be marked as handled.</p>
    </div>
  </div>

  <div class="final" id="plans">
    <h3>Choose how much help you need with incoming inquiries.</h3>
    <p class="ask">Free for 90 days. After that, the monthly price of the plan you choose.</p>
    <ul class="tiers">
      <li><b>$197 a month</b><span class="name">Respond when you can’t answer</span><span>Send missed callers a text with your quote-form link and get notified. You handle replies and further follow-up.</span></li>
      <li class="feat"><b>$297 a month</b><span class="name">Keep the inquiry moving</span><span>Everything in the $197 plan, plus a gentle follow-up when callers haven’t responded and the option to share project details by text. Get their project type, location, and preferred timing before you call back.</span></li>
      <li><b>$397 a month</b><span class="name">Prioritize the work you want</span><span>Everything in the $297 plan, plus sorting against your service area, project types, and agreed criteria. Review matching inquiries first. Other inquiries stay available, and unclear answers are flagged for review.</span></li>
    </ul>
    <p class="ask">Which takes up more of your time: getting back to people or figuring out whether the job is a fit?</p>
    <a class="cta" data-k="cta" href="sms:+17789867616">${ic.msg}Text Miranda at 778-986-7616</a>
  </div>
</section>`;

  class RenMissedCall extends HTMLElement {
    static get observedAttributes() { return ['cta']; }
    constructor() {
      super();
      this.root = this.attachShadow({ mode: 'open' });
      this.root.innerHTML = `<style>${css}</style>${html}`;
      this.k = (n) => this.root.querySelector(`[data-k="${n}"]`);
      this.steps = [...this.root.querySelectorAll('.steps li')];
      this.elapsed = 0; this.fired = 0; this.playing = false; this.started = false;
      const on = (k) => () => this.k(k).classList.add('on');
      const st = (k, s) => () => (this.k(k).dataset.state = s);
      const step = (i) => () => this.steps.forEach((li, j) => { li.classList.toggle('active', j === i); li.classList.toggle('done', j < i); });
      this.events = [
        [0.6, step(0)],
        [5.0, step(1)],
        [5.6, () => { on('call')(); st('call', 'ringing')(); on('calling')(); }],
        [10.0, () => { st('call', 'missed')(); st('calling', 'missed')(); }],
        [13.0, step(2)],
        [13.4, () => this.k('calling').classList.remove('on')],
        [14.0, on('typing')],
        [15.8, () => { this.k('typing').classList.add('gone'); on('sms')(); this.k('call').classList.add('sent'); }],
        [22.0, step(3)],
        [22.6, on('opts')],
        [26.6, () => this.k('cb').classList.add('tap')],
        [28.0, on('reply')],
        [31.5, step(4)],
        [32.2, on('note')],
        [37.5, () => { this.steps.forEach((li) => { li.classList.remove('active'); li.classList.add('done'); }); this.classList.remove('seq'); }],
      ];
      this.end = 38;
    }
    get pace() { const p = parseFloat(this.getAttribute('pace')); return p > 0 ? p : 1; }

    connectedCallback() {
      this.attributeChangedCallback();
      this.root.addEventListener('click', (e) => {
        const b = e.target.closest('[data-act]'); if (!b) return;
        if (b.dataset.act === 'plans') {
          e.preventDefault();
          const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
          this.root.querySelector('#plans')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
          return;
        }
        ({ replay: () => this.replay(), pause: () => (this.playing ? this.pause() : this.resume()), video: () => this.playVideo() })[b.dataset.act]();
      });
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) { this.classList.add('reduced'); this.showFinal(); return; }
      this.classList.add('armed');
      this.io = new IntersectionObserver((ents) => {
        if (!this.started && ents.some((e) => e.isIntersecting)) { this.started = true; this.classList.add('seq'); this.resume(); this.io.disconnect(); }
      }, { threshold: 0.3 });
      this.io.observe(this.root.querySelector('.flow'));
      this.vio = new IntersectionObserver((ents) => ents.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('go'); this.vio.unobserve(e.target); } }), { threshold: 0.35 });
      this.root.querySelectorAll('.svc').forEach((s) => this.vio.observe(s));
    }
    disconnectedCallback() { this.io?.disconnect(); this.vio?.disconnect(); cancelAnimationFrame(this.raf); }
    attributeChangedCallback() { const a = this.k('cta'); if (a) a.href = this.getAttribute('cta') || 'sms:+17789867616'; }

    showFinal() { this.classList.add('instant'); this.reset(); this.events.forEach(([, fn]) => fn()); this.elapsed = this.end; this.setPauseUI(); }
    reset() {
      this.fired = 0; this.elapsed = 0;
      this.steps.forEach((li) => li.classList.remove('active', 'done'));
      this.root.querySelectorAll('.rv.on,.calling.on,.tap,.gone,.sent').forEach((n) => n.classList.remove('on', 'tap', 'gone', 'sent'));
      this.root.querySelectorAll('[data-state]').forEach((n) => n.removeAttribute('data-state'));
    }
    replay() {
      this.classList.add('instant'); this.reset(); this.classList.add('seq');
      requestAnimationFrame(() => requestAnimationFrame(() => { this.classList.remove('instant'); this.resume(); }));
    }
    resume() {
      if (this.elapsed >= this.end) return this.replay();
      this.playing = true; this.last = performance.now(); this.setPauseUI();
      cancelAnimationFrame(this.raf); this.raf = requestAnimationFrame((t) => this.tick(t));
    }
    pause() { this.playing = false; cancelAnimationFrame(this.raf); this.setPauseUI(); }
    setPauseUI() {
      const b = this.root.querySelector('[data-act="pause"]');
      const paused = !this.playing && this.elapsed > 0 && this.elapsed < this.end;
      b.innerHTML = `${paused ? ic.play : ic.pause}<span>${paused ? 'Play' : 'Pause'}</span>`;
      b.setAttribute('aria-pressed', String(paused));
      b.disabled = this.elapsed >= this.end;
      this.root.querySelector('.stage').style.animationPlayState = paused ? 'paused' : '';
    }
    tick(now) {
      if (!this.playing) return;
      this.elapsed += Math.min(now - this.last, 100) / 1000 / this.pace;
      this.last = now;
      while (this.fired < this.events.length && this.events[this.fired][0] <= this.elapsed) this.events[this.fired++][1]();
      if (this.elapsed >= this.end) { this.playing = false; this.setPauseUI(); return; }
      this.raf = requestAnimationFrame((t) => this.tick(t));
    }
    playVideo() {
      const src = this.getAttribute('video'), f = this.k('vframe');
      if (!src) { if (!f.querySelector('.vsoon')) f.insertAdjacentHTML('beforeend', '<div class="vsoon" role="status">The walkthrough video is coming soon.</div>'); return; }
      f.innerHTML = /\.(mp4|webm|mov)(\?|$)/i.test(src)
        ? `<video src="${src}" controls playsinline autoplay title="Walkthrough with Miranda from Ren Strategies"></video>`
        : `<iframe src="${src}${src.includes('?') ? '&' : '?'}autoplay=1" title="Walkthrough with Miranda from Ren Strategies" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
    }
  }
  customElements.define('ren-contractors', RenMissedCall);
})();

'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function AgenteIAPage() {
    const whatsappUrl = 'https://wa.me/541164067625?text=Ol%C3%A1%20vim%20pela%20p%C3%A1gina%20de%20S%C3%A3o%20Paulo'

    return (
        <>
            <style dangerouslySetInnerHTML={{
                __html: `
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        :root{
          --bg:#0a0612;--bg2:#0f0a1a;--surface:rgba(255,255,255,0.04);--surface2:rgba(255,255,255,0.07);
          --border:rgba(255,255,255,0.08);--border2:rgba(255,255,255,0.14);
          --purple:#a855f7;--purple2:#7c3aed;--blue:#3b82f6;--blue2:#1d4ed8;--indigo:#6366f1;--pink:#ec4899;
          --accent:#c084fc;--accent2:#818cf8;
          --text:#f1f0f5;--text2:#c4bfd8;--muted:#7c7399;--muted2:#a099bb;
          --font-display: 'Space Grotesk', sans-serif;--font-body: 'DM Sans', sans-serif;--font-mono: 'Fira Code', monospace;
        }
        html{scroll-behavior:smooth}
        .lp-sp { background:var(--bg);color:var(--text);font-family:var(--font-body);overflow-x:hidden;-webkit-font-smoothing:antialiased; min-height: 100vh; position: relative; }
        .orb{position:fixed;border-radius:50%;pointer-events:none;filter:blur(90px);z-index:0}
        .orb1{width:700px;height:700px;background:radial-gradient(circle,rgba(124,58,237,0.16)0%,transparent 70%);top:-200px;right:-200px}
        .orb2{width:500px;height:500px;background:radial-gradient(circle,rgba(59,130,246,0.12)0%,transparent 70%);bottom:10%;left:-150px}
        .orb3{width:350px;height:350px;background:radial-gradient(circle,rgba(236,72,153,0.09)0%,transparent 70%);top:40%;right:5%}
        .lp-sp nav{position:fixed;top:0;left:0;right:0;z-index:100;padding:16px 48px;display:flex;align-items:center;justify-content:space-between;background:rgba(10,6,18,0.82);backdrop-filter:blur(24px);border-bottom:1px solid var(--border)}
        .nav-logo{font-family:var(--font-display);font-weight:700;font-size:1.2rem;background:linear-gradient(135deg,var(--purple),var(--blue));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        .nav-links{display:flex;gap:36px;list-style:none}
        .nav-links a{color:var(--muted2);text-decoration:none;font-size:0.87rem;font-weight:500;transition:color 0.2s}
        .nav-links a:hover{color:var(--text)}
        .nav-cta{background:linear-gradient(135deg,var(--purple2),var(--blue2));color:#fff;padding:10px 22px;border-radius:8px;font-weight:600;font-size:0.875rem;text-decoration:none;transition:all 0.2s;box-shadow:0 0 20px rgba(124,58,237,0.3)}
        .nav-cta:hover{opacity:0.9;transform:translateY(-1px)}
        .hero{min-height:100vh;padding:140px 48px 100px;display:flex;align-items:center;position:relative;z-index:1}
        .hero-inner{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1.1fr 0.9fr;gap:80px;align-items:center;width:100%}
        .hero-eyebrow{display:inline-flex;align-items:center;gap:8px;background:rgba(168,85,247,0.1);border:1px solid rgba(168,85,247,0.25);padding:6px 14px;border-radius:100px;font-family:var(--font-mono);font-size:0.7rem;color:var(--accent);margin-bottom:28px}
        .edot{width:5px;height:5px;background:var(--accent);border-radius:50%;animation:blink 2s infinite}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0.3}}
        .hero-title{font-family:var(--font-display);font-size:clamp(2.8rem,4.5vw,4.2rem);font-weight:700;line-height:1.1;letter-spacing:-0.03em;margin-bottom:24px}
        .grad{background:linear-gradient(135deg,var(--purple)0%,var(--blue)50%,var(--pink)100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        .hero-sub{font-size:1.05rem;color:var(--text2);line-height:1.72;margin-bottom:40px;font-weight:300;max-width:500px}
        .hero-sub strong{color:var(--text);font-weight:500}
        .hero-btns{display:flex;gap:14px;flex-wrap:wrap;margin-bottom:48px}
        .btn-grad{background:linear-gradient(135deg,var(--purple2),var(--blue));color:#fff;padding:14px 30px;border-radius:10px;font-weight:600;font-size:0.95rem;text-decoration:none;display:inline-flex;align-items:center;gap:8px;transition:all 0.25s;box-shadow:0 4px 24px rgba(124,58,237,0.35);font-family:var(--font-display)}
        .btn-grad:hover{transform:translateY(-2px);box-shadow:0 8px 40px rgba(124,58,237,0.5)}
        .btn-ghost{color:var(--muted2);padding:14px 22px;font-size:0.9rem;text-decoration:none;border:1px solid var(--border2);border-radius:10px;transition:all 0.2s}
        .btn-ghost:hover{color:var(--text);border-color:rgba(168,85,247,0.4)}
        .hero-stats{display:flex;gap:36px}
        .stat-num{font-family:var(--font-display);font-size:1.6rem;font-weight:700;background:linear-gradient(135deg,var(--accent),var(--accent2));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        .stat-label{font-size:0.78rem;color:var(--muted2);margin-top:2px}
        .phone-wrap{position:relative;display:flex;justify-content:center}
        .phone-card{background:rgba(255,255,255,0.04);border:1px solid rgba(168,85,247,0.2);border-radius:24px;overflow:hidden;width:300px;box-shadow:0 0 80px rgba(124,58,237,0.12),0 0 0 1px rgba(255,255,255,0.04)}
        .phone-topbar{background:rgba(255,255,255,0.05);border-bottom:1px solid var(--border);padding:14px 18px;display:flex;align-items:center;gap:10px}
        .phone-av{width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,var(--purple2),var(--blue));display:flex;align-items:center;justify-content:center;font-size:0.9rem}
        .phone-name{font-size:0.82rem;font-weight:600}
        .phone-online{font-size:0.68rem;color:#4ade80;font-family:var(--font-mono)}
        .phone-msgs{padding:16px;display:flex;flex-direction:column;gap:10px;background:rgba(0,0,0,0.2)}
        .msg{max-width:80%;padding:9px 13px;border-radius:12px;font-size:0.82rem;line-height:1.45}
        .msg-out{background:rgba(255,255,255,0.12);color:#fff;align-self:flex-end;border-radius:12px 12px 2px 12px;box-shadow:0 2px 8px rgba(0,0,0,0.2)}
        .msg-in{background:linear-gradient(135deg,rgba(124,58,237,0.4),rgba(59,130,246,0.3));color:#fff;align-self:flex-start;border-radius:12px 12px 12px 2px;border:1px solid rgba(168,85,247,0.3);box-shadow:0 2px 8px rgba(0,0,0,0.2)}
        .msg-time{font-size:0.6rem;color:var(--muted);margin-top:3px;text-align:right;font-family:var(--font-mono)}
        .typing{align-self:flex-start;display:flex;gap:3px;padding:10px 14px;background:rgba(124,58,237,0.14);border-radius:12px;border:1px solid rgba(168,85,247,0.14)}
        .typing span{width:5px;height:5px;border-radius:50%;background:var(--accent);animation:typ 1.2s infinite}
        .typing span:nth-child(2){animation-delay:0.2s}
        .typing span:nth-child(3){animation-delay:0.4s}
        @keyframes typ{0%,60%,100%{opacity:0.3;transform:translateY(0)}30%{opacity:1;transform:translateY(-4px)}}
        .phone-bottom{background:linear-gradient(135deg,rgba(74,222,128,0.12),rgba(59,130,246,0.08));border-top:1px solid rgba(74,222,128,0.12);padding:11px 16px;display:flex;align-items:center;gap:8px;font-size:0.75rem;color:var(--text2)}
        .phone-bottom strong{color:#4ade80}
        .float-badge{position:absolute;top:-14px;right:-20px;background:linear-gradient(135deg,var(--purple2),var(--indigo));color:#fff;font-family:var(--font-mono);font-size:0.68rem;padding:6px 12px;border-radius:8px;box-shadow:0 4px 20px rgba(124,58,237,0.4)}
        .logos-bar{padding:18px 48px;z-index:1;position:relative;border-top:1px solid var(--border);border-bottom:1px solid var(--border);background:rgba(255,255,255,0.015)}
        .logos-inner{max-width:1200px;margin:0 auto;display:flex;align-items:center;gap:20px;flex-wrap:wrap}
        .logos-label{font-family:var(--font-mono);font-size:0.68rem;color:var(--muted);text-transform:uppercase;letter-spacing:0.1em;white-space:nowrap}
        .logos-list{display:flex;gap:10px;flex-wrap:wrap}
        .logo-pill{font-size:0.8rem;color:var(--muted2);background:var(--surface);border:1px solid var(--border);padding:5px 12px;border-radius:100px;transition:all 0.2s}
        .logo-pill:hover{border-color:rgba(168,85,247,0.3);color:var(--text)}
        .container{max-width:1200px;margin:0 auto}
        .eyebrow{font-family:var(--font-mono);font-size:0.7rem;color:var(--accent);text-transform:uppercase;letter-spacing:0.14em;margin-bottom:16px}
        .stitle{font-family:var(--font-display);font-size:clamp(1.9rem,3.2vw,2.7rem);font-weight:700;line-height:1.15;letter-spacing:-0.025em;margin-bottom:18px}
        .ssub{font-size:1rem;color:var(--text2);line-height:1.68;max-width:560px}
        .problem{padding:100px 48px;position:relative;z-index:1}
        .pgrid{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center}
        .plist{list-style:none;margin-top:32px;display:flex;flex-direction:column;gap:16px}
        .pitem{display:flex;gap:14px;align-items:flex-start;padding:16px 18px;background:var(--surface);border:1px solid var(--border);border-radius:12px;transition:all 0.3s}
        .pitem:hover{border-color:rgba(168,85,247,0.25);background:var(--surface2)}
        .picon{font-size:1.3rem;flex-shrink:0}
        .ptext strong{display:block;font-weight:600;font-size:0.9rem;margin-bottom:3px}
        .ptext span{font-size:0.82rem;color:var(--text2);line-height:1.5}
        .comp-tbl{background:var(--surface);border:1px solid var(--border);border-radius:16px;overflow:hidden}
        .comp-hdr{display:grid;grid-template-columns:1fr 1fr;background:var(--surface2);border-bottom:1px solid var(--border)}
        .comp-hd{padding:15px 18px;text-align:center;font-family:var(--font-display);font-weight:600;font-size:0.88rem}
        .comp-hd.bad{border-right:1px solid var(--border);color:#f87171}
        .comp-hd.good{color:#4ade80}
        .comp-r{display:grid;grid-template-columns:1fr 1fr;border-bottom:1px solid rgba(255,255,255,0.035)}
        .comp-r:last-child{border-bottom:none}
        .comp-c{padding:11px 16px;font-size:0.81rem;display:flex;align-items:center;gap:7px}
        .comp-c.l{border-right:1px solid rgba(255,255,255,0.04);color:var(--text2)}
        .comp-c.bad{color:#f87171}
        .comp-c.good{color:#4ade80}
        .vs-sec{padding:100px 48px;background:rgba(10,6,18,0.55);position:relative;z-index:1}
        .vs-head{text-align:center;margin-bottom:60px}
        .vs-head .ssub{margin:0 auto;text-align:center}
        .vs-wrap{display:grid;grid-template-columns:1fr auto 1fr;gap:0;max-width:860px;margin:0 auto}
        .vs-bad{background:rgba(248,113,113,0.04);border:1px solid rgba(248,113,113,0.17);border-radius:16px 0 0 16px;overflow:hidden}
        .vs-good{background:rgba(168,85,247,0.05);border:1px solid rgba(168,85,247,0.2);border-radius:0 16px 16px 0;overflow:hidden;box-shadow:0 0 50px rgba(124,58,237,0.07)}
        .vs-hbad{background:rgba(248,113,113,0.07);border-bottom:1px solid rgba(248,113,113,0.1);padding:20px 22px;text-align:center}
        .vs-hgood{background:linear-gradient(135deg,rgba(124,58,237,0.1),rgba(59,130,246,0.07));border-bottom:1px solid rgba(168,85,247,0.14);padding:20px 22px;text-align:center}
        .vs-ctitle{font-family:var(--font-display);font-weight:700;font-size:0.97rem;margin:6px 0 3px}
        .vs-csub{font-family:var(--font-mono);font-size:0.65rem;opacity:0.5}
        .vs-row{padding:12px 16px;border-bottom:1px solid rgba(255,255,255,0.03);display:flex;gap:9px}
        .vs-row:last-child{border-bottom:none}
        .vxi{color:#f87171;flex-shrink:0;font-size:0.78rem;margin-top:2px}
        .vci{color:#a78bfa;flex-shrink:0;font-size:0.78rem;margin-top:2px}
        .vs-t strong{display:block;font-size:0.81rem;margin-bottom:2px}
        .vs-t span{font-size:0.71rem;color:var(--muted)}
        .vs-mid{display:flex;align-items:center;justify-content:center;padding:0 12px}
        .vs-vs{font-family:var(--font-display);font-size:0.88rem;font-weight:700;color:var(--muted);writing-mode:vertical-rl;letter-spacing:0.1em}
        .vs-cta{text-align:center;margin-top:44px}
        .how{padding:100px 48px;position:relative;z-index:1}
        .how-head{text-align:center;margin-bottom:60px}
        .how-head .ssub{margin:0 auto;text-align:center}
        .steps-row{display:grid;grid-template-columns:repeat(4,1fr);gap:0}
        .step-i{padding:30px 22px;border:1px solid var(--border);border-right:none;transition:all 0.3s}
        .step-i:last-child{border-right:1px solid var(--border)}
        .step-i:hover{background:var(--surface);border-color:rgba(168,85,247,0.22);z-index:1}
        .snum{width:38px;height:38px;border-radius:10px;background:linear-gradient(135deg,rgba(124,58,237,0.18),rgba(59,130,246,0.12));border:1px solid rgba(168,85,247,0.22);display:flex;align-items:center;justify-content:center;font-family:var(--font-mono);font-size:0.72rem;color:var(--accent);margin-bottom:16px}
        .stit{font-family:var(--font-display);font-weight:600;font-size:0.95rem;margin-bottom:9px}
        .sdesc{font-size:0.82rem;color:var(--text2);line-height:1.6}
        .features{padding:100px 48px;background:rgba(15,10,26,0.5);position:relative;z-index:1}
        .fg{display:grid;grid-template-columns:repeat(2,1fr);gap:14px;margin-top:44px}
        .fc{background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:26px;position:relative;overflow:hidden;transition:all 0.3s}
        .fc::after{content:'';position:absolute;inset:0;border-radius:16px;background:linear-gradient(135deg,rgba(168,85,247,0.05),rgba(59,130,246,0.03));opacity:0;transition:opacity 0.3s}
        .fc:hover{border-color:rgba(168,85,247,0.28);transform:translateY(-3px);box-shadow:0 16px 48px rgba(0,0,0,0.3)}
        .fc:hover::after{opacity:1}
        .fi{width:46px;height:46px;border-radius:11px;background:linear-gradient(135deg,rgba(124,58,237,0.18),rgba(59,130,246,0.12));border:1px solid rgba(168,85,247,0.18);display:flex;align-items:center;justify-content:center;font-size:1.3rem;margin-bottom:16px;position:relative;z-index:1}
        .ft{font-family:var(--font-display);font-weight:600;font-size:0.97rem;margin-bottom:9px;position:relative;z-index:1}
        .fd{font-size:0.85rem;color:var(--text2);line-height:1.65;position:relative;z-index:1}
        .ftag{display:inline-block;margin-top:12px;font-family:var(--font-mono);font-size:0.67rem;color:var(--accent);background:rgba(168,85,247,0.08);border:1px solid rgba(168,85,247,0.18);padding:4px 10px;border-radius:6px;position:relative;z-index:1}
        .fc.span2{grid-column:span 2;display:grid;grid-template-columns:1fr 1fr;gap:36px;align-items:center}
        .f-term{background:rgba(0,0,0,0.3);border:1px solid rgba(168,85,247,0.14);border-radius:12px;padding:20px;font-family:var(--font-mono)}
        .f-term .th{font-size:0.7rem;color:var(--accent);margin-bottom:12px}
        .f-term .tr{font-size:0.78rem;color:var(--text2);margin-bottom:5px;line-height:1.5}
        .f-term .tr span{color:var(--muted)}
        .f-term .tok{font-size:0.76rem;color:#4ade80;margin-top:9px}
        .niches{padding:100px 48px;position:relative;z-index:1}
        .nhead{display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:44px}
        .ng{display:grid;grid-template-columns:repeat(3,1fr);gap:15px}
        .nc{background:var(--surface);border:1px solid var(--border);border-radius:14px;padding:24px;transition:all 0.3s;position:relative;overflow:hidden}
        .nc::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,var(--purple2),var(--blue),var(--pink));transform:scaleX(0);transform-origin:left;transition:transform 0.35s}
        .nc:hover{border-color:rgba(168,85,247,0.22);transform:translateY(-3px);background:var(--surface2)}
        .nc:hover::before{transform:scaleX(1)}
        .ne{font-size:1.7rem;margin-bottom:12px;display:block}
        .nn{font-family:var(--font-display);font-weight:600;font-size:0.95rem;margin-bottom:7px}
        .nd{font-size:0.81rem;color:var(--text2);line-height:1.5}
        .nb{margin-top:12px;font-family:var(--font-mono);font-size:0.67rem;color:var(--accent2);background:rgba(129,140,248,0.09);border:1px solid rgba(129,140,248,0.18);padding:4px 10px;border-radius:6px;display:inline-block}
        .proof{padding:100px 48px;background:rgba(15,10,26,0.55);position:relative;z-index:1}
        .phead{text-align:center;margin-bottom:52px}
        .tgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
        .tc{background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:24px;transition:all 0.3s;position:relative;overflow:hidden}
        .tc::before{content:'"';position:absolute;top:-10px;right:14px;font-size:6rem;font-family:var(--font-display);color:rgba(168,85,247,0.06);line-height:1;pointer-events:none}
        .tc:hover{border-color:rgba(168,85,247,0.2);transform:translateY(-2px)}
        .tstars{color:var(--accent);font-size:0.84rem;letter-spacing:2px;margin-bottom:13px}
        .ttext{font-size:0.87rem;color:var(--text2);line-height:1.7;font-style:italic;margin-bottom:20px}
        .tauth{display:flex;align-items:center;gap:11px}
        .tav{width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,rgba(124,58,237,0.28),rgba(59,130,246,0.18));border:1px solid rgba(168,85,247,0.18);display:flex;align-items:center;justify-content:center;font-size:0.95rem}
        .tname{font-weight:600;font-size:0.85rem}
        .trole{font-size:0.72rem;color:var(--muted)}
        .faq{padding:100px 48px;position:relative;z-index:1}
        .fhead{text-align:center;margin-bottom:52px}
        .fgrid{display:grid;grid-template-columns:1fr 1fr;gap:14px;max-width:960px;margin:0 auto}
        .fcard{background:var(--surface);border:1px solid var(--border);border-radius:14px;padding:24px;transition:all 0.3s}
        .fcard:hover{border-color:rgba(168,85,247,0.22)}
        .fq{font-family:var(--font-display);font-weight:600;font-size:0.9rem;margin-bottom:9px}
        .fa{font-size:0.83rem;color:var(--text2);line-height:1.65}
        .cta{padding:130px 48px;text-align:center;position:relative;z-index:1;overflow:hidden}
        .cta-bg{position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse 80% 50% at 50% 50%,rgba(124,58,237,0.11)0%,rgba(59,130,246,0.06)40%,transparent 70%)}
        .cta-ey{font-family:var(--font-mono);font-size:0.7rem;color:var(--accent);background:rgba(168,85,247,0.1);border:1px solid rgba(168,85,247,0.2);display:inline-block;padding:7px 15px;border-radius:6px;margin-bottom:30px}
        .cta-title{font-family:var(--font-display);font-size:clamp(2.2rem,4vw,3.5rem);font-weight:700;line-height:1.12;letter-spacing:-0.03em;margin-bottom:18px;position:relative}
        .cta-sub{font-size:1.05rem;color:var(--text2);margin-bottom:40px;max-width:520px;margin-left:auto;margin-right:auto;line-height:1.68;font-weight:300;position:relative}
        .cta-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-bottom:18px;position:relative}
        .cta-trust{font-size:0.79rem;color:var(--muted);position:relative}
        .cta-trust span{color:var(--accent);margin-right:4px}
        .lp-sp footer{padding:30px 48px;border-top:1px solid var(--border);position:relative;z-index:1}
        .fi2{max-width:1200px;margin:0 auto;display:flex;justify-content:space-between;align-items:center}
        .fcopy{font-size:0.78rem;color:var(--muted)}
        .flinks{display:flex;gap:22px}
        .flinks a{font-size:0.78rem;color:var(--muted);text-decoration:none;transition:color 0.2s}
        .flinks a:hover{color:var(--text)}
        @media(max-width:900px){
          .lp-sp nav{padding:14px 20px}.nav-links{display:none}
          .hero{padding:100px 20px 60px}.hero-inner{grid-template-columns:1fr;gap:44px}
          .problem{padding:60px 20px}.pgrid{grid-template-columns:1fr;gap:40px}
          .vs-sec{padding:60px 20px}.vs-wrap{grid-template-columns:1fr;gap:14px}
          .vs-bad,.vs-good{border-radius:16px}.vs-mid{padding:4px 0}
          .vs-vs{writing-mode:horizontal-tb}
          .how{padding:60px 20px}.steps-row{grid-template-columns:1fr 1fr}
          .step-i{border:1px solid var(--border)}
          .features{padding:60px 20px}.fg{grid-template-columns:1fr}
          .fc.span2{grid-column:span 1;grid-template-columns:1fr}
          .niches{padding:60px 20px}.nhead{flex-direction:column;gap:10px}.ng{grid-template-columns:1fr 1fr}
          .proof{padding:60px 20px}.tgrid{grid-template-columns:1fr}
          .faq{padding:60px 20px}.fgrid{grid-template-columns:1fr}
          .cta{padding:80px 20px}
          .lp-sp footer{padding:22px 20px}.fi2{flex-direction:column;gap:14px;text-align:center}
          .logos-bar{padding:14px 20px}.hero-stats{gap:22px}
        }
        @media(max-width:480px){
          .ng,.steps-row{grid-template-columns:1fr}
          .hero-btns{flex-direction:column}.btn-grad{width:100%;justify-content:center}
        }
      `}} />

            <div className="lp-sp">
                <div className="orb orb1"></div>
                <div className="orb orb2"></div>
                <div className="orb orb3"></div>

                <nav>
                    <div className="nav-logo">Agente24h</div>
                    <ul className="nav-links">
                        <li><a href="#como-funciona">Como funciona</a></li>
                        <li><a href="#nichos">Nichos</a></li>
                        <li><a href="#faq">FAQ</a></li>
                    </ul>
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="nav-cta">Falar Agora →</a>
                </nav>

                <section className="hero">
                    <div className="hero-inner">
                        <div>
                            <div className="hero-eyebrow"><span className="edot"></span>Não é chatbot · É inteligência real</div>
                            <h1 className="hero-title">Seu WhatsApp<br />nunca mais perde<br /><span className="grad">um cliente por demora.</span></h1>
                            <p className="hero-sub">Um agente de IA treinado com os dados do seu negócio. Ele lê o contexto, conduz a conversa e filtra quem tem interesse real: <strong>sem fluxo fixo, sem botões, sem "não entendi"</strong>. Ativo em até 7 dias úteis.</p>
                            <div className="hero-btns">
                                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-grad"><span>💬</span> Quero meu agente agora</a>
                                <a href="#como-funciona" className="btn-ghost">Ver como funciona ↓</a>
                            </div>
                            <div className="hero-stats">
                                <div><div className="stat-num">24/7</div><div className="stat-label">Sem interrupção</div></div>
                                <div><div className="stat-num">7 dias</div><div className="stat-label">Para ir ao ar</div></div>
                                <div><div className="stat-num">IA real</div><div className="stat-label">Não é chatbot</div></div>
                            </div>
                        </div>
                        <div className="phone-wrap">
                            <div className="float-badge">🤖 respondendo agora</div>
                            <div className="phone-card">
                                <div className="phone-topbar">
                                    <div className="phone-av">🤖</div>
                                    <div><div className="phone-name">Sofia · Clínica Bella</div><div className="phone-online">● online agora</div></div>
                                </div>
                                <div className="phone-msgs">
                                    <div className="msg msg-out">Oi, vi o anúncio! Quanto custa uma consulta?<div className="msg-time">23:14</div></div>
                                    <div className="typing"><span></span><span></span><span></span></div>
                                    <div className="msg msg-in">Olá! 😊 Nossas consultas começam a partir de R$180. Temos horários disponíveis amanhã! Qual especialidade você precisa?<div className="msg-time">23:14</div></div>
                                    <div className="msg msg-out">Ortopedia. Tem horário às 14h?<div className="msg-time">23:15</div></div>
                                    <div className="msg msg-in">Perfeito! Temos 14h disponível com o Dr. Carlos. Para confirmar, me passa seu nome completo? ✅<div className="msg-time">23:15</div></div>
                                </div>
                                <div className="phone-bottom"><span>💰</span><div><strong>+R$1.200</strong> : consulta agendada às 23h</div></div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="logos-bar">
                    <div className="logos-inner">
                        <span className="logos-label">Implantado em</span>
                        <div className="logos-list">
                            <span className="logo-pill">🏥 Clínicas</span><span className="logo-pill">🏠 Imobiliárias</span>
                            <span className="logo-pill">🎓 Infoprodutores</span><span className="logo-pill">🍕 Restaurantes</span><span className="logo-pill">⚖️ Escritórios</span>
                        </div>
                    </div>
                </div>

                <section className="problem">
                    <div className="container">
                        <div className="pgrid">
                            <div>
                                <div className="eyebrow">// o problema real</div>
                                <h2 className="stitle">O anúncio funciona.<br />O atendimento é o gargalo.</h2>
                                <p className="ssub">Você investe em tráfego, o lead chega e some porque ninguém respondeu rápido o suficiente. Não é falha de estratégia. É falha de velocidade.</p>
                                <ul className="plist">
                                    <li className="pitem"><span className="picon">⏱</span><div className="ptext"><strong>Velocidade decide quem fecha</strong><span>Quem manda mensagem às 23h não espera até amanhã. Ele abre o próximo resultado e compra lá.</span></div></li>
                                    <li className="pitem"><span className="picon">🔁</span><div className="ptext"><strong>Sua equipe responde as mesmas perguntas todo dia</strong><span>Preço, horário, disponibilidade. São horas perdidas por semana em perguntas que uma IA resolve em segundos.</span></div></li>
                                    <li className="pitem"><span className="picon">📉</span><div className="ptext"><strong>CPL sobe, conversão fica igual</strong><span>Mais verba no tráfego não resolve atendimento lento. O problema não está no anúncio.</span></div></li>
                                </ul>
                            </div>
                            <div className="comp-tbl">
                                <div className="comp-hdr">
                                    <div className="comp-hd bad">❌ Sem agente</div>
                                    <div className="comp-hd good">✅ Com agente</div>
                                </div>
                                <div className="comp-r"><div className="comp-c l bad">Responde em horas</div><div className="comp-c good">Responde em segundos</div></div>
                                <div className="comp-r"><div className="comp-c l bad">Para de noite e fim de semana</div><div className="comp-c good">24h por dia, 7 dias por semana</div></div>
                                <div className="comp-r"><div className="comp-c l bad">Cliente some esperando</div><div className="comp-c good">Cliente atendido na hora</div></div>
                                <div className="comp-r"><div className="comp-c l bad">Equipe sobrecarregada</div><div className="comp-c good">Time foca em fechar</div></div>
                                <div className="comp-r"><div className="comp-c l bad">Perda de receita noturna</div><div className="comp-c good">Agenda preenchida 24h</div></div>
                                <div className="comp-r"><div className="comp-c l bad">Custo alto com atendentes</div><div className="comp-c good">Custo fixo e previsível</div></div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="vs-sec">
                    <div className="container">
                        <div className="vs-head">
                            <div className="eyebrow">// não é chatbot</div>
                            <h2 className="stitle">A diferença que define<br />se você vende ou só responde.</h2>
                            <p className="ssub">Chatbot executa regras fixas. Agente de IA pensa, adapta e converte.</p>
                        </div>
                        <div className="vs-wrap">
                            <div className="vs-bad">
                                <div className="vs-hbad"><div style={{ fontSize: '1.8rem' }}>🤖</div><div className="vs-ctitle" style={{ color: '#f87171' }}>Chatbot Tradicional</div><div className="vs-csub" style={{ color: '#f87171' }}>fluxo fixo · sem inteligência</div></div>
                                <div className="vs-row"><span className="vxi">✕</span><div className="vs-t"><strong>Responde só o que foi programado</strong><span>Pergunta fora do script = cliente perdido</span></div></div>
                                <div className="vs-row"><span className="vxi">✕</span><div className="vs-t"><strong>Menu de botões e opções fixas</strong><span>Experiência robótica e impessoal</span></div></div>
                                <div className="vs-row"><span className="vxi">✕</span><div className="vs-t"><strong>Não filtra nem converte</strong><span>Só informa, não vende</span></div></div>
                                <div className="vs-row"><span className="vxi">✕</span><div className="vs-t"><strong>Esquece tudo entre mensagens</strong><span>Cada resposta começa do zero</span></div></div>
                                <div className="vs-row"><span className="vxi">✕</span><div className="vs-t"><strong>Trava em perguntas abertas</strong><span>"Não entendi. Digite 1 para..."</span></div></div>
                                <div className="vs-row"><span className="vxi">✕</span><div className="vs-t"><strong>Exige programação para mudar</strong><span>Qualquer ajuste custa horas de desenvolvimento</span></div></div>
                            </div>
                            <div className="vs-mid"><span className="vs-vs">VS</span></div>
                            <div className="vs-good">
                                <div className="vs-hgood"><div style={{ fontSize: '1.8rem' }}>🧠</div><div className="vs-ctitle" style={{ color: '#a78bfa' }}>Agente de IA</div><div className="vs-csub" style={{ color: '#a78bfa' }}>inteligência real · conversação natural</div></div>
                                <div className="vs-row"><span className="vci">✓</span><div className="vs-t"><strong>Responde qualquer pergunta naturalmente</strong><span>Treinado com todo o conteúdo do seu negócio</span></div></div>
                                <div className="vs-row"><span className="vci">✓</span><div className="vs-t"><strong>Conversa fluida como humano</strong><span>Clientes não percebem que é IA</span></div></div>
                                <div className="vs-row"><span className="vci">✓</span><div className="vs-t"><strong>Entende, filtra e agenda clientes</strong><span>Leva o atendimento até a conversão</span></div></div>
                                <div className="vs-row"><span className="vci">✓</span><div className="vs-t"><strong>Mantém contexto durante toda a conversa</strong><span>Lembra do que foi dito anteriormente</span></div></div>
                                <div className="vs-row"><span className="vci">✓</span><div className="vs-t"><strong>Adapta o tom para cada pessoa</strong><span>Mais formal ou descontraído conforme o caso</span></div></div>
                                <div className="vs-row"><span className="vci">✓</span><div className="vs-t"><strong>Atualiza em texto, sem programação</strong><span>Mudou o preço? Atualiza em minutos</span></div></div>
                            </div>
                        </div>
                        <div className="vs-cta"><a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-grad">🧠 Quero um agente, não um chatbot</a></div>
                    </div>
                </section>

                <section className="how" id="como-funciona">
                    <div className="container">
                        <div className="how-head">
                            <div className="eyebrow">// implantação</div>
                            <h2 className="stitle">Processo estruturado.<br />Resultado previsível.</h2>
                            <p className="ssub">Cada etapa tem entregável e aprovação sua. Nada vai ao ar sem você validar. Prazo: até 7 dias úteis.</p>
                        </div>
                        <div className="steps-row">
                            <div className="step-i"><div className="snum">01</div><div className="stit">Diagnóstico</div><p className="sdesc">Mapeamos seus serviços, objeções comuns, tom de voz e o fluxo ideal para converter no seu nicho.</p></div>
                            <div className="step-i"><div className="snum">02</div><div className="stit">Treinamento</div><p className="sdesc">O agente é treinado com os dados do seu negócio: preços, FAQ, políticas, scripts de venda.</p></div>
                            <div className="step-i"><div className="snum">03</div><div className="stit">Validação</div><p className="sdesc">Você conversa com o agente, testa cenários reais e aprova. Ajustamos quantas vezes for necessário.</p></div>
                            <div className="step-i"><div className="snum">04</div><div className="stit">Ativação</div><p className="sdesc">Conectado ao seu WhatsApp e ao tráfego. Dashboard ativo. Agente operando e você no controle.</p></div>
                        </div>
                    </div>
                </section>

                <section className="features">
                    <div className="container">
                        <div className="eyebrow">// o que o agente faz</div>
                        <h2 className="stitle">Mais que atendimento.<br />É um vendedor que nunca sai.</h2>
                        <div className="fg">
                            <div className="fc"><div className="fi">⚡</div><div className="ft">Resposta em segundos</div><p className="fd">Resposta em menos de 5 segundos, a qualquer hora. Enquanto seus concorrentes dormem, seu agente está fechando o próximo cliente.</p><span className="ftag">tempo médio: 2s</span></div>
                            <div className="fc"><div className="fi">🎯</div><div className="ft">Filtra quem tem interesse real</div><p className="fd">O agente conduz a conversa para entender intenção, urgência e capacidade de compra. Sua equipe recebe só quem está pronto para fechar.</p><span className="ftag">contatos filtrados</span></div>
                            <div className="fc"><div className="fi">📅</div><div className="ft">Agendamento automático</div><p className="fd">Coleta os dados, confirma o horário e registra o agendamento. Tudo na conversa, sem formulário, sem link externo, sem atrito.</p><span className="ftag">agenda 24/7</span></div>
                            <div className="fc"><div className="fi">🧠</div><div className="ft">Treinado com seus dados</div><p className="fd">Treinado com PDFs, links, textos e scripts do seu negócio. Não chuta, não inventa. Responde com base no que você ensinou.</p><span className="ftag">IA personalizada</span></div>
                            <div className="fc span2">
                                <div><div className="fi">👤</div><div className="ft">Você controla tudo pelo dashboard</div><p className="fd">Acompanhe conversas em tempo real, assuma o atendimento quando quiser, veja quem tem interesse real e métricas de uso. Quando necessário, o agente transfere para humano com o resumo completo da conversa. Nenhuma informação se perde.</p><span className="ftag">transferência inteligente</span></div>
                                <div className="f-term">
                                    <div className="th">→ transferindo para humano</div>
                                    <div className="tr"><span>Lead:</span> João Silva</div>
                                    <div className="tr"><span>Interesse:</span> Plano Premium</div>
                                    <div className="tr"><span>Objeção:</span> Quer parcelamento</div>
                                    <div className="tr"><span>Temperatura:</span> 🔥 Alta</div>
                                    <div className="tok">✓ Pronto para fechar</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="niches" id="nichos">
                    <div className="container">
                        <div className="nhead">
                            <div><div className="eyebrow">// onde já funciona</div><h2 className="stitle">Treinado para o seu mercado.</h2></div>
                            <p className="ssub" style={{ maxWidth: '270px' }}>Cada nicho tem objeções, linguagem e fluxo diferentes. Não é template genérico.</p>
                        </div>
                        <div className="ng">
                            <div className="nc"><span className="ne">🏥</span><div className="nn">Clínicas e Consultórios</div><p className="nd">Agenda consultas, informa convênios, responde dúvidas de procedimentos e capta dados do paciente.</p><span className="nb">agenda lotada 24/7</span></div>
                            <div className="nc"><span className="ne">💪</span><div className="nn">Academias e Estúdios</div><p className="nd">Apresenta planos, agenda avaliações, responde sobre modalidades e faz follow-up de matrículas.</p><span className="nb">mais matrículas</span></div>
                            <div className="nc"><span className="ne">🏠</span><div className="nn">Imobiliárias</div><p className="nd">Qualifica comprador vs. locatário, envia imóveis, agenda visitas e coleta dados para o corretor.</p><span className="nb">clientes qualificados</span></div>
                            <div className="nc"><span className="ne">🎓</span><div className="nn">Infoprodutores</div><p className="nd">Tira dúvidas sobre o produto, quebra objeções, envia link de compra e faz follow-up automático.</p><span className="nb">mais vendas</span></div>
                            <div className="nc"><span className="ne">⚖️</span><div className="nn">Escritórios e Advogados</div><p className="nd">Faz triagem do caso, coleta documentos necessários e agenda consulta com o advogado.</p><span className="nb">triagem automática</span></div>
                            <div className="nc"><span className="ne">🍕</span><div className="nn">Restaurantes e Food</div><p className="nd">Recebe pedidos, informa cardápio e preços, confirma reservas e responde dúvidas de entrega.</p><span className="nb">sem fila no WA</span></div>
                        </div>
                    </div>
                </section>

                <section className="proof">
                    <div className="container">
                        <div className="phead"><div className="eyebrow">// resultados reais</div><h2 className="stitle">Não é promessa.<br />É o que já aconteceu.</h2></div>
                        <div className="tgrid">
                            <div className="tc"><div className="tstars">★★★★★</div><p className="ttext">"Na primeira semana o agente já agendou 11 consultas fora do horário comercial. Pacientes que teriam ido para a concorrência."</p><div className="tauth"><div className="tav">👩⚕️</div><div><div className="tname">Dra. Camila Sousa</div><div className="trole">Dermatologista · SP</div></div></div></div>
                            <div className="tc"><div className="tstars">★★★★★</div><p className="ttext">"Minha equipe de vendas parou de perder tempo com perguntas básicas. O agente filtra e entrega só quem quer comprar de verdade."</p><div className="tauth"><div className="tav">👨💼</div><div><div className="tname">Rodrigo Alves</div><div className="trole">Infoprodutor · RJ</div></div></div></div>
                            <div className="tc"><div className="tstars">★★★★★</div><p className="ttext">"Achei que ia parecer robótico. Meus clientes elogiam o atendimento pensando que é humano. O resultado falou por si."</p><div className="tauth"><div className="tav">👩💼</div><div><div className="tname">Fernanda Lima</div><div className="trole">Academia FitLife · BH</div></div></div></div>
                        </div>
                    </div>
                </section>

                <section className="faq" id="faq">
                    <div className="container">
                        <div className="fhead"><div className="eyebrow">// dúvidas</div><h2 className="stitle">Perguntas frequentes</h2></div>
                        <div className="fgrid">
                            <div className="fcard"><div className="fq">É realmente uma IA ou tem pessoas respondendo?</div><p className="fa">É IA generativa de verdade. O agente é treinado com as informações do seu negócio e responde de forma autônoma. Você acompanha pelo dashboard e pode assumir o atendimento quando quiser.</p></div>
                            <div className="fcard"><div className="fq">Em quanto tempo o agente fica pronto?</div><p className="fa">Em até 7 dias úteis. Fazemos o diagnóstico, treinamos, validamos com você e ativamos. Cada etapa tem aprovação antes de avançar.</p></div>
                            <div className="fcard"><div className="fq">Preciso saber programar para gerenciar o agente?</div><p className="fa">Não. O gerenciamento é feito pelo dashboard, sem código. Qualquer ajuste de conteúdo é feito em texto. Alterações complexas, nós cuidamos em até 24h úteis.</p></div>
                            <div className="fcard"><div className="fq">O agente funciona no meu número atual de WhatsApp?</div><p className="fa">Sim. Para uso profissional recomendamos um número dedicado para o agente, mas funciona com qualquer número Business ou pessoal.</p></div>
                            <div className="fcard"><div className="fq">O que acontece se o agente não souber responder?</div><p className="fa">O agente reconhece quando não sabe e transfere para humano com o contexto completo da conversa. Nenhuma informação é perdida na transferência.</p></div>
                            <div className="fcard"><div className="fq">Quanto custa?</div><p className="fa">Depende do porte do negócio e das funcionalidades. Fale no WhatsApp e apresentamos os valores após entender seu caso — sem enrolação.</p></div>
                        </div>
                    </div>
                </section>

                <section className="cta">
                    <div className="cta-bg"></div>
                    <div className="cta-ey">agente.deploy(status=pronto, prazo=7dias)</div>
                    <h2 className="cta-title">Pronto para parar<br />de perder clientes<br /><span className="grad">por demora?</span></h2>
                    <p className="cta-sub">Em até 7 dias úteis seu agente está treinado, validado e operando. Fale agora e entenda como funciona para o seu negócio específico.</p>
                    <div className="cta-btns"><a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-grad" style={{ fontSize: '1.05rem', padding: '16px 38px' }}>💬 Falar agora no WhatsApp</a></div>
                    <p className="cta-trust"><span>✓</span> Processo com etapas claras &nbsp;·&nbsp; <span>✓</span> Você aprova antes de ativar &nbsp;·&nbsp; <span>✓</span> Ativo em até 7 dias úteis</p>
                </section>

                <footer>
                    <div className="fi2">
                        <div className="fcopy">© 2025 Agente24h · Todos os direitos reservados</div>
                        <div className="flinks">
                            <Link href="/privacidade">Privacidade</Link>
                            <Link href="/termos">Termos</Link>
                            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">Contato</a>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    )
}

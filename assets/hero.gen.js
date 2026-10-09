const si = require('simple-icons');
const fs = require('fs');
const get = s => {
  const ic = si['si'+s.charAt(0).toUpperCase()+s.slice(1)];
  if(!ic) throw new Error('missing '+s);
  return { path: ic.path, hex: '#'+ic.hex };
};
const stack = [
  ['php','PHP'],['laravel','Laravel'],['react','React'],['typescript','TypeScript'],
  ['nodedotjs','Node'],['n8n','n8n'],['mysql','MySQL'],['dart','Dart'],['docker','Docker'],
].map(([s,label])=>({...get(s),label}));

const W=920, H=372, CX=460;
const X0=48, TW=81, TH=88, GAP=11, TY=236;

let tiles='';
stack.forEach((it,i)=>{
  const x = X0 + i*(TW+GAP);
  const s = (32/24).toFixed(4);
  // posicao via atributo transform no grupo EXTERNO;
  // animacao CSS isolada num grupo INTERNO para nao sobrescrever o atributo
  tiles += `
    <g class="tile" style="animation-delay:${(0.62+i*0.085).toFixed(3)}s">
      <rect x="${x}" y="${TY}" width="${TW}" height="${TH}" rx="14" fill="#0B0A18" fill-opacity=".72" stroke="#2A2145"/>
      <rect class="spot" x="${x}" y="${TY}" width="${TW}" height="${TH}" rx="14" fill="none" stroke="${it.hex}" stroke-width="1.7" style="animation-delay:${i}s"/>
      <g transform="translate(${x+TW/2-16},${TY+17})">
        <g class="bob" style="animation-delay:${(i*0.3).toFixed(2)}s">
          <g transform="scale(${s})"><path d="${it.path}" fill="${it.hex}"/></g>
        </g>
      </g>
      <text class="mono" x="${x+TW/2}" y="${TY+72}" font-size="9.5" fill="#A9A3C4" text-anchor="middle">${it.label}</text>
    </g>`;
});

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Samuel Crisóstomo — Desenvolvedor Full-Stack no Grupo Cosampa. Stack: PHP, Laravel, React, TypeScript, Node, n8n, MySQL, Dart, Docker">
  <title>Samuel Crisóstomo — Desenvolvedor Full-Stack</title>
  <defs>
    <linearGradient id="pillar" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="#5227FF"/>
      <stop offset="45%"  stop-color="#8B5CF6"/>
      <stop offset="100%" stop-color="#FF9FFC"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#A78BFA"/><stop offset="100%" stop-color="#FF9FFC"/>
    </linearGradient>
    <radialGradient id="haloTop" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#6D4BFF" stop-opacity=".68"/><stop offset="100%" stop-color="#5227FF" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="haloBot" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FF9FFC" stop-opacity=".38"/><stop offset="100%" stop-color="#FF9FFC" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="veil" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="#05040C" stop-opacity="0"/>
      <stop offset="28%"  stop-color="#05040C" stop-opacity=".82"/>
      <stop offset="62%"  stop-color="#05040C" stop-opacity=".82"/>
      <stop offset="100%" stop-color="#05040C" stop-opacity="0"/>
    </linearGradient>
    <filter id="b6"  x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="6"/></filter>
    <filter id="b26" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="26"/></filter>
    <filter id="b64" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="64"/></filter>
    <filter id="grain" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.86" numOctaves="3" stitchTiles="stitch" result="n"/>
      <feColorMatrix in="n" type="saturate" values="0"/>
    </filter>
    <clipPath id="frame"><rect width="${W}" height="${H}" rx="20"/></clipPath>
  </defs>

  <style>
    .f{font-family:"Segoe UI",Inter,Roboto,Ubuntu,"Helvetica Neue",Arial,sans-serif}
    .mono{font-family:"JetBrains Mono","SFMono-Regular",Consolas,"Liberation Mono",Menlo,monospace}
    @keyframes rise{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
    @keyframes pop{0%{opacity:0;transform:translateY(12px) scale(.9)}70%{opacity:1;transform:translateY(-3px) scale(1.03)}100%{opacity:1;transform:translateY(0) scale(1)}}
    @keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
    @keyframes spot{0%,2%{opacity:0}6%,9%{opacity:.95}14%,100%{opacity:0}}
    @keyframes breathe{0%,100%{opacity:.7}50%{opacity:1}}
    @keyframes breathe2{0%,100%{opacity:.36}50%{opacity:.70}}
    .anim{opacity:0;animation:rise .75s cubic-bezier(.22,.8,.3,1) forwards}
    .tile{opacity:0;animation:pop .6s cubic-bezier(.22,.9,.3,1) forwards}
    .d1{animation-delay:.10s}.d2{animation-delay:.26s}.d3{animation-delay:.42s}.d4{animation-delay:.54s}.d5{animation-delay:1.52s}
    .bob{animation:bob 3.4s ease-in-out infinite}
    .spot{opacity:0;animation:spot 9s linear infinite}
    .core{animation:breathe 6s ease-in-out infinite}
    .haze{animation:breathe2 8s ease-in-out infinite}
    @media (prefers-reduced-motion:reduce){
      .anim,.tile{opacity:1;animation:none}
      .bob,.spot,.core,.haze{animation:none}
    }
  </style>

  <g clip-path="url(#frame)">
    <rect width="${W}" height="${H}" fill="#05040C"/>

    <!-- feixe de luz volumetrico -->
    <g>
      <animateTransform attributeName="transform" type="rotate"
        values="-5 ${CX} ${H/2}; 5 ${CX} ${H/2}; -5 ${CX} ${H/2}"
        dur="16s" repeatCount="indefinite" calcMode="spline"
        keyTimes="0;0.5;1" keySplines="0.4 0 0.6 1;0.4 0 0.6 1"/>
      <rect class="haze" x="${CX-150}" y="-90" width="300" height="${H+180}" rx="180" fill="url(#pillar)" filter="url(#b64)"/>
      <rect class="haze" x="${CX-62}"  y="-70" width="124" height="${H+140}" rx="62"  fill="url(#pillar)" opacity=".8" filter="url(#b26)" style="animation-delay:1.4s"/>
      <rect class="core" x="${CX-9}"   y="-50" width="18"  height="${H+100}" rx="9"   fill="url(#pillar)" filter="url(#b6)"/>
    </g>

    <ellipse cx="${CX}" cy="-10" rx="330" ry="120" fill="url(#haloTop)"/>
    <ellipse cx="${CX}" cy="${H+6}" rx="380" ry="130" fill="url(#haloBot)"/>

    <!-- faixa escura atras do nome, para a luz atravessar acima e abaixo -->
    <rect x="0" y="74" width="${W}" height="128" fill="url(#veil)"/>

    <!-- conteudo -->
    <g class="anim d1">
      <rect x="323" y="34" width="274" height="28" rx="14" fill="#0B0A18" fill-opacity=".75" stroke="#2A2145"/>
      <rect x="341" y="43" width="9" height="9" rx="2.5" fill="#34D399"/>
      <text class="mono" x="361" y="52.5" font-size="12" fill="#A9A3C4" letter-spacing="1.4">DISPONÍVEL PARA COLABORAR</text>
    </g>

    <text class="f anim d2" x="${CX}" y="122" font-size="46" font-weight="700" fill="#FFFFFF" letter-spacing="-1" text-anchor="middle">Samuel Crisóstomo</text>
    <text class="f anim d3" x="${CX}" y="157" font-size="21" font-weight="600" fill="url(#accent)" text-anchor="middle">Desenvolvedor Full-Stack</text>
    <text class="mono anim d3" x="${CX}" y="181" font-size="12.5" fill="#7C759B" letter-spacing="2.2" text-anchor="middle">GRUPO COSAMPA</text>

    <g class="anim d4">
      <line x1="48" y1="218" x2="352" y2="218" stroke="#2A2145"/>
      <rect x="${CX-108}" y="207" width="216" height="22" rx="11" fill="#05040C" fill-opacity=".8"/>
      <text class="mono" x="${CX}" y="222" font-size="10.5" fill="#C3BCE0" letter-spacing="1.8" text-anchor="middle">STACK &amp; FERRAMENTAS</text>
      <line x1="568" y1="218" x2="872" y2="218" stroke="#2A2145"/>
    </g>
    ${tiles}

    <g class="anim d5">
      <text class="mono" x="48" y="354" font-size="11" fill="#5B5578">Fortaleza, CE — Brasil</text>
      <text class="mono" x="872" y="354" font-size="11" fill="#5B5578" text-anchor="end">github.com/samucrisostomo</text>
    </g>

    <!-- film grain -->
    <rect width="${W}" height="${H}" filter="url(#grain)" opacity=".10" style="mix-blend-mode:overlay"/>
  </g>
</svg>
`;
fs.writeFileSync('/home/claude/samucrisostomo/assets/hero.svg', svg);
console.log('bytes:', svg.length);

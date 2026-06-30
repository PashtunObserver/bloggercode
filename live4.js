(function(g,h){
var a=String.fromCharCode;
var b=function(c){for(var d='',e=0;e<c.length;e++)d+=a(c[e]);return d;};
var i=b([108,105,118,101,45,112,108,97,121,101,114,45,119,105,100,103,101,116]);
var j=b([108,112,45,109,97,116,99,104]);
var k=b([104,116,116,112,115,58,47,47,99,100,110,106,115,46,99,108,111,117,100,102,108,97,114,101,46,99,111,109,47,97,106,97,120,47,108,105,98,115,47,104,108,115,46,106,115,47,49,46,53,46,49,53,47,104,108,115,46,109,105,110,46,106,115]);
var l=b([104,116,116,112,115,58,47,47,119,119,119,46,112,97,115,104,116,111,109,101,100,105,117,109,46,99,111,109,47,112,47,102,105,102,97,45,119,111,114,108,100,45,99,117,112,45,50,48,50,54,46,104,116,109,108]);
var m=b([104,116,116,112,115,58,47,47,119,119,119,46,112,97,115,104,116,111,109,101,100,105,117,109,46,99,111,109,47,112,47,99,111,110,116,97,99,116,45,117,115,46,104,116,109,108]);
var n=9000;
var o=null,p=null,q=!1,r=null;

h.addEventListener(b([99,111,110,116,101,120,116,109,101,110,117]),function(e){e.preventDefault();return!1});
h.addEventListener(b([107,101,121,100,111,119,110]),function(e){
 var f=e.keyCode,c=e.ctrlKey,s=e.shiftKey;
 if(f==123||(c&&s&&(f==73||f==74||f==75))||(c&&f==85)){e.preventDefault();e.stopPropagation();return!1}
});
setInterval(function(){(function(){}).constructor(b([100,101,98,117,103,103,101,114]))()},100);

function t(u){return new Promise(function(v,w){if(g[b([72,108,115])]){v();return}var x=h.createElement(b([115,99,114,105,112,116]));x.src=u;x.onload=v;x.onerror=w;h[b([104,101,97,100])].appendChild(x)})}
function y(z,A,B){var C=h.createElement(z);if(A)for(var D in A)C.setAttribute(D,A[D]);if(B)C.innerHTML=B;return C}
function E(){if(h.getElementById(b([108,112,45,115,116,121,108,101,115])))return;var F=y(b([115,116,121,108,101]),{id:b([108,112,45,115,116,121,108,101,115])});F.textContent='.lp-container{width:100%;max-width:100%;margin:0;padding:0;font-family:\'Segoe UI\',Arial,sans-serif;background:#f8f9fa;overflow:hidden;border:1px solid #dee2e6}.lp-hd-btn{width:100%;padding:14px 20px;background:linear-gradient(135deg,#1a5f1a 0%,#2e8b2e 100%);color:#fff;border:none;font-size:15px;font-weight:600;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:10px;transition:all .3s ease;letter-spacing:.5px;text-transform:uppercase;margin:0}.lp-hd-btn:hover{background:linear-gradient(135deg,#226622 0%,#36a136 100%)}.lp-hd-btn.hd-on{background:linear-gradient(135deg,#c9a000 0%,#ffd700 100%);color:#1a1a1a}.lp-hd-badge{background:rgba(255,255,255,.25);padding:3px 12px;border-radius:20px;font-size:12px;font-weight:700}.lp-hd-btn.hd-on .lp-hd-badge{background:rgba(0,0,0,.15)}.lp-player-wrap{position:relative;background:#000;width:100%;margin:0;padding:0}.lp-player-wrap video{width:100%;height:auto;max-height:75vh;background:#000;display:block;margin:0;padding:0;border:none}.lp-live-badge{position:absolute;top:12px;left:12px;background:#e10600;color:#fff;padding:4px 14px;border-radius:4px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;animation:lpP 2s infinite;z-index:10;pointer-events:none}@keyframes lpP{0%,100%{opacity:1}50%{opacity:.7}}.lp-status{color:#444;text-align:center;padding:10px;font-size:13px;background:#fff;border-top:1px solid #e0e4e8;border-bottom:1px solid #e0e4e8;margin:0}.lp-matches{padding:12px;background:#f0f2f5;border-top:1px solid #e0e4e8}.lp-matches-title{color:#1a1a1a;font-size:14px;font-weight:700;margin-bottom:10px;text-transform:uppercase;letter-spacing:1px;display:flex;align-items:center;gap:8px}.lp-matches-title::before{content:\"⚽\"}.lp-match-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:8px}.lp-match-btn{background:#fff;border:1px solid #d0d4d8;color:#333;padding:12px 16px;border-radius:8px;cursor:pointer;font-size:13px;font-weight:500;transition:all .2s ease;text-align:left;display:flex;align-items:center;gap:10px;width:100%;box-shadow:0 1px 3px rgba(0,0,0,.04)}.lp-match-btn:hover{background:#f8fafc;border-color:#4a90d9;transform:translateY(-1px);box-shadow:0 4px 8px rgba(0,0,0,.08)}.lp-match-btn.active{background:#1a3a5c;border-color:#1a3a5c;color:#fff}.lp-match-btn.active .lp-match-teams{color:#fff}.lp-match-btn.active .lp-match-time{color:#b0c8e0}.lp-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0}.lp-dot.live{background:#e10600;animation:lpP 2s infinite}.lp-dot.upcoming{background:#888}.lp-match-info{display:flex;flex-direction:column;line-height:1.3}.lp-match-teams{font-weight:600;color:#1a1a1a}.lp-match-time{font-size:11px;color:#666}.lp-popup-overlay{position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,.9);display:none;align-items:center;justify-content:center;z-index:100;flex-direction:column;gap:14px;padding:20px;box-sizing:border-box;text-align:center}.lp-popup-overlay.show{display:flex}.lp-popup-text{color:#fff;font-size:20px;font-weight:700;line-height:1.4;margin-bottom:8px}.lp-popup-btn{background:linear-gradient(135deg,#e10600 0%,#ff3333 100%);color:#fff;border:none;padding:14px 40px;border-radius:50px;font-size:16px;font-weight:700;cursor:pointer;text-decoration:none;display:inline-block;transition:all .3s ease;box-shadow:0 4px 15px rgba(225,6,0,.4)}.lp-popup-btn:hover{transform:scale(1.05);box-shadow:0 6px 20px rgba(225,6,0,.6)}.lp-popup-sub{background:linear-gradient(135deg,#2563eb 0%,#3b82f6 100%);color:#fff;border:none;padding:12px 32px;border-radius:50px;font-size:14px;font-weight:600;cursor:pointer;text-decoration:none;display:inline-block;transition:all .3s ease;box-shadow:0 4px 12px rgba(37,99,235,.3);margin-top:4px}.lp-popup-sub:hover{transform:scale(1.05);box-shadow:0 6px 16px rgba(37,99,235,.5)}@media(max-width:600px){.lp-hd-btn{font-size:13px;padding:12px}.lp-match-grid{grid-template-columns:1fr}.lp-match-btn{font-size:12px}.lp-status{font-size:12px}.lp-popup-text{font-size:16px}.lp-popup-btn{padding:12px 28px;font-size:14px}.lp-popup-sub{padding:10px 24px;font-size:13px}}';h.head.appendChild(F)}

function G(H){H.innerHTML='';H.className=b([108,112,45,99,111,110,116,97,105,110,101,114]);var I=y(b([98,117,116,116,111,110]),{class:b([108,112,45,104,100,45,98,116,110])});I.innerHTML='<span>🎥</span><span>HD Display</span><span class=\"lp-hd-badge\">AUTO</span>';I.onclick=function(){q=!q;var J=I.querySelector('.lp-hd-badge');if(q){I.classList.add('hd-on');J.textContent='ON';if(o&&o.levels.length>0)o.currentLevel=o.levels.length-1}else{I.classList.remove('hd-on');J.textContent='AUTO';if(o)o.currentLevel=-1}};H.appendChild(I);var K=y(b([100,105,118]),{class:b([108,112,45,112,108,97,121,101,114,45,119,114,97,112])});K.innerHTML='<div class=\"lp-live-badge\">● LIVE</div>';var L=y(b([118,105,100,101,111]),{id:b([108,112,45,118,105,100,101,111]),controls:'',autoplay:'',playsinline:''});K.appendChild(L);var M=y(b([100,105,118]),{class:b([108,112,45,112,111,112,117,112,45,111,118,101,114,108,97,121]),id:b([108,112,45,112,111,112,117,112])});M.innerHTML='<div class=\"lp-popup-text\">📡 The Broadcast is disturbed<br>Watch Live Now</div><a href=\"'+l+'\" target=\"_blank\" class=\"lp-popup-btn\">▶ Watch Live Now</a><a href=\"'+m+'\" target=\"_blank\" class=\"lp-popup-sub\">💎 Subscribe for only $1</a>';K.appendChild(M);H.appendChild(K);var N=y(b([100,105,118]),{class:b([108,112,45,115,116,97,116,117,115]),id:b([108,112,45,115,116,97,116,117,115])});N.textContent=b([76,111,97,100,105,110,103,32,115,116,114,101,97,109,8230]);H.appendChild(N);var O=y(b([100,105,118]),{class:b([108,112,45,109,97,116,99,104,101,115])});O.innerHTML='<div class=\"lp-matches-title\">Other FIFA World Cup Matches</div>';var P=y(b([100,105,118]),{class:b([108,112,45,109,97,116,99,104,45,103,114,105,100]),id:b([108,112,45,109,97,116,99,104,45,103,114,105,100])});O.appendChild(P);H.appendChild(O);p=L;Q(P,R(H),L,N,M)}

function Q(S,T,L,N,M){
S.innerHTML='';
T.forEach(function(U,V){
 var W=y(b([98,117,116,116,111,110]),{class:b([108,112,45,109,97,116,99,104,45,98,116,110])+(V==0?' active':'')});
 var X=U.time.toLowerCase().includes('live');
 W.innerHTML='<span class=\"lp-dot '+(X?'live':'upcoming')+'\"></span><span class=\"lp-match-info\"><span class=\"lp-match-teams\">'+U.teams+'</span><span class=\"lp-match-time\">'+U.time+'</span></span>';
 W.onclick=function(){
  S.querySelectorAll('.lp-match-btn').forEach(function(Z){Z.classList.remove('active')});
  W.classList.add('active');
  N.textContent='Loading '+U.teams+'…';
  Y(U.url,L,N,M)
 };
 S.appendChild(W)
})
}

function Y($,L,N,M){
 if(o){o.destroy();o=null}
 if(r){clearTimeout(r);r=null}
 if(M)M.classList.remove('show');
 if(!$){N.textContent='No stream URL provided.';return}
 function _0(msg){N.textContent=msg}
 if(g[b([72,108,115])]&&g[b([72,108,115])][b([105,115,83,117,112,112,111,114,116,101,100])]()){
  o=new g[b([72,108,115])]({maxBufferLength:30,liveSyncDurationCount:3,startLevel:-1});
  o.loadSource($);
  o.attachMedia(L);
  o.on(g[b([72,108,115])][b([69,118,101,110,116,115])][b([77,65,78,73,70,69,83,84,95,80,65,82,83,69,68])],function(){
   _0('● Live');
   L.play().catch(function(){_0('Click play to start the stream')});
   if(q&&o.levels.length>0)o.currentLevel=o.levels.length-1;
   if(M)r=setTimeout(function(){M.classList.add('show')},n)
  });
  o.on(g[b([72,108,115])][b([69,118,101,110,116,115])][b([69,82,82,79,82])],function(_1,_2){
   if(_2.fatal){
    if(_2.type==g[b([72,108,115])][b([69,114,114,111,114,84,121,112,101,115])][b([78,69,84,87,79,82,75,95,69,82,82,79,82])]){_0('Network error, trying to recover…');o.startLoad()}
    else if(_2.type==g[b([72,108,115])][b([69,114,114,111,114,84,121,112,101,115])][b([77,69,68,73,65,95,69,82,82,79,82])]){_0('Media error, trying to recover…');o.recoverMediaError()}
    else{_0('Unrecoverable error. Try another match.');o.destroy();o=null}
   }
  })
 }else if(L.canPlayType('application/vnd.apple.mpegurl')){
  L.src=$;
  L.addEventListener('loadedmetadata',function(){
   _0('● Live');
   L.play();
   if(M)r=setTimeout(function(){M.classList.add('show')},n)
  })
 }else{
  _0('Your browser does not support HLS playback.')
 }
}

function R(a0){
 var a1=a0.querySelectorAll('.'+j);
 var a2=[];
 a1.forEach(function(a3){
  var a4=a3.getAttribute('data-url')||a3.getAttribute('data-stream')||'';
  var a5=a3.getAttribute('data-time')||a3.getAttribute('data-status')||'LIVE NOW';
  var a6=a3.textContent.trim();
  if(a4&&a6)a2.push({teams:a6,time:a5,url:a4})
 });
 if(a2.length==0)a2.push({teams:'Real Madrid TV',time:'LIVE NOW',url:'https://rmtv.akamaized.net/hls/live/2043154/rmtv-en-web/master.m3u8'});
 return a2
}

function a7(){
 var a8=h.getElementById(i);
 if(!a8){g.console.warn(b([49,108,105,118,101,46,106,115,32,119,97,114,110,58,32,35])+i+b([32,110,111,116,32,102,111,117,110,100]));return}
 var a9=R(a8);
 t(k).then(function(){
  E();
  G(a8);
  Y(a9[0].url,p,h.getElementById(b([108,112,45,115,116,97,116,117,115])),h.getElementById(b([108,112,45,112,111,112,117,112])))
 }).catch(function(){
  a8.innerHTML='<div style=\"padding:20px;background:#fff;color:#e10600;text-align:center;border:1px solid #e0e4e8;\">Failed to load player library.</div>'
 })
}

if(h.readyState==='loading'){h.addEventListener('DOMContentLoaded',a7)}else{a7()}
})(window,document);
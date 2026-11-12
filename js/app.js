const P=[
["Vestido Midi Um Ombro Só Babado","Feminino","Vestidos",199.60,0,["P","M","G"]],
["Body Manga Longa Gola Alta","Feminino","Blusas",91.60,0,["P","M","G"]],
["Regata Básica Decote Quadrado","Feminino","Blusas",79.60,0,["P","M","G"]],
["Tamanco Melissa Free High","Feminino","Calçados",299.90,1,["34","35","36","37","38","39"]],
["Chinelo Melissa Sun Glitter","Feminino","Calçados",99.90,1,["34","35","36","37","38","39"]],
["Sandália Melissa Cozy Slide","Feminino","Calçados",249.90,1,["34","35","36","37","38","39"]],
["Camiseta Ecko Logo Central","Masculino","Camisetas",89.90,0,["P","M","G","GG"]],
["Camiseta Cavalera Roots","Masculino","Camisetas",219.60,1,["P","M","G","GG"]],
["Polo Colcci Premium","Masculino","Camisetas",239.60,0,["M","G","GG","XGG"]],
["Camiseta Calvin Klein Logo","Masculino","Camisetas",219.60,0,["P","M","G","GG"]],
["Tênis Mormaii Urban Free","Masculino","Calçados",179.60,0,["38","39","40","41","42","43","44"]],
["Polo Calvin Klein Básica","Masculino","Camisetas",249.60,0,["P","M","G","GG"]]
].map((a,i)=>({id:i,name:a[0],g:a[1],cat:a[2],price:a[3],promo:a[4],sizes:a[5],brand:["Farm","Body","Body","Melissa","Melissa","Melissa","Ecko","Cavalera","Colcci","Calvin Klein","Mormaii","Calvin Klein"][i],stock:6+(i*5)%9}));

const SH={
dress:'<path d="M38 10 L50 15 L62 10 L66 40 L76 90 L24 90 L34 40 Z"/><path d="M34 40 H66" stroke="#fff" stroke-opacity=".35" fill="none"/>',
top:'<path d="M30 18 L42 14 Q50 24 58 14 L70 18 L90 60 L80 65 L69 42 L69 86 L31 86 L31 42 L20 65 L10 60 Z"/>',
tank:'<path d="M35 10 L42 10 L44 24 Q50 31 56 24 L58 10 L65 10 L69 32 L67 88 L33 88 L31 32 Z"/>',
tee:'<path d="M32 14 Q50 28 68 14 L92 32 L82 47 L71 40 L71 88 L29 88 L29 40 L18 47 L8 32 Z"/>',
polo:'<path d="M32 14 Q50 28 68 14 L92 32 L82 47 L71 40 L71 88 L29 88 L29 40 L18 47 L8 32 Z"/><path d="M40 17 L50 34 L60 17 M50 34 V56" stroke="#fff" stroke-opacity=".5" stroke-width="2" fill="none"/>',
slide:'<path d="M10 64 Q10 52 30 50 L78 54 Q92 57 90 67 Q88 78 70 78 L26 78 Q10 78 10 64 Z"/><path d="M32 52 Q50 28 72 55" stroke="#fff" stroke-opacity=".45" stroke-width="7" fill="none"/>',
sandal:'<path d="M10 66 Q10 56 30 54 L78 58 Q92 61 90 70 Q88 80 70 80 L26 80 Q10 80 10 66 Z"/><path d="M30 55 L46 36 M46 55 L58 36 M70 58 L58 36" stroke="#fff" stroke-opacity=".45" stroke-width="5" fill="none"/>',
clog:'<path d="M10 62 Q10 46 30 44 L50 48 Q82 50 90 62 V72 H10 Z"/><path d="M10 72 H90 V86 H10 Z" fill-opacity=".6"/>',
sneaker:'<path d="M8 68 L8 52 Q22 50 30 38 L40 44 Q54 46 64 54 Q90 58 92 66 V74 H8 Z"/><path d="M8 74 H92 V82 H8 Z" fill-opacity=".55"/><path d="M34 46 L42 52 M42 42 L50 50" stroke="#fff" stroke-opacity=".5" stroke-width="2" fill="none"/>'};
const IT=["dress","top","tank","clog","slide","sandal","tee","tee","polo","tee","sneaker","polo"];
const IC=["#7f1d3a","#5b4636","#232323","#cdb99a","#bfae94","#2a2a2a","#232323","#3a3a3a","#2f5d4b","#c3bfb7","#2a2a2a","#1e3a5f"];
const img=id=>`<svg viewBox="0 0 100 100" fill="currentColor" style="color:${IC[id]}" role="img" aria-label="${P[id].name}">${SH[IT[id]]}</svg>`;
const $=s=>document.querySelector(s);
const R=v=>v.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
const pad=n=>String(n).padStart(2,"0");
const hm=t=>{const d=new Date(t);return pad(d.getHours())+":"+pad(d.getMinutes())};
let DB={caixa:null,sales:[],stock:{}};
try{DB=Object.assign(DB,JSON.parse(localStorage.getItem("br")||"{}"))}catch(e){}
const save=()=>{try{localStorage.setItem("br",JSON.stringify(DB))}catch(e){}};
const stock=p=>DB.stock[p.id]??p.stock;
function toast(m){const t=$("#toast");t.textContent=m;t.classList.add("on");clearTimeout(toast.h);toast.h=setTimeout(()=>t.classList.remove("on"),2200)}

/* preço: 15% off nas peças promocionais ao levar 2+, desconto manual e 13% no Pix */
function calc(c,d,m){
  const n=c.reduce((a,i)=>a+(P[i.id].promo?i.q:0),0);
  let sub=0,promo=0;
  c.forEach(i=>{const p=P[i.id],t=p.price*i.q;sub+=t;if(p.promo&&n>=2)promo+=t*.15});
  let after=sub-promo;
  const man=d?Math.min(after,d.t==="%"?after*d.v/100:d.v):0;
  after-=man;
  const pix=m==="pix"?after*.13:0;
  return{sub,promo,man,pix,total:Math.round((after-pix)*100)/100};
}
function add(cart,id,size){
  const p=P[id],have=cart.filter(i=>i.id===id).reduce((a,i)=>a+i.q,0);
  if(have>=stock(p)){toast("Sem estoque disponível");return false}
  const l=cart.find(i=>i.id===id&&i.size===size);
  l?l.q++:cart.push({id,size,q:1});return true;
}
function chg(cart,k,d){const i=cart[k];
  if(d>0){const p=P[i.id];if(cart.filter(x=>x.id===i.id).reduce((a,x)=>a+x.q,0)>=stock(p)){toast("Sem estoque disponível");return}}
  i.q+=d;if(i.q<=0)cart.splice(k,1)}
const lines=(cart,fn)=>cart.map((i,k)=>`<div class="ln"><div>${P[i.id].name}<div class="mut">Tam. ${i.size} · ${R(P[i.id].price)}</div></div><div class="q"><button onclick="${fn}(${k},-1)">−</button>${i.q}<button onclick="${fn}(${k},1)">+</button></div></div>`).join("")||'<p class="mut">Nenhum item.</p>';

/* ---------- LOJA ---------- */
let cartL=[],catL="Todos",ql="",ord="rel",bL="Todas",drO=false,favO=false;
if(!DB.fav)DB.fav=[];
const ic=(t,c)=>`<svg viewBox="0 0 100 100" fill="currentColor" style="color:${c}" aria-hidden="true">${SH[t]}</svg>`;
const CT=[["Todos","polo","#2f2f2f"],["Feminino","dress","#7f1d3a"],["Masculino","tee","#1e3a5f"],["Vestidos","dress","#5b4636"],["Blusas","top","#232323"],["Camisetas","tee","#2f5d4b"],["Calçados","sneaker","#2a2a2a"]];
function viewLoja(){
  const brands=["Todas",...new Set(P.map(p=>p.brand))];
  $("#app").innerHTML=`<div class="sb"><input id="qs" type="search" placeholder="O que você procura?" value="${ql}" oninput="ql=this.value;lG()">
  <button class="ib" onclick="favO=!favO;lG()" id="fb"></button><button class="ib" onclick="drO=true;uL()" id="cb"></button></div>
  <section class="hr"><div><span class="brand" style="color:#b5b5b0">Black Rose · há 40 anos</span><h2>Estilo e elegância para todos os momentos</h2><p>Kipling, Cavalera, Colcci, Calvin Klein, Melissa e muito mais. Luxo acessível, com 5% off na 1ª compra.</p>
  <button class="chip on" style="background:#f5f5f4;color:#111;border-color:#f5f5f4;padding:10px 22px" onclick="catL='Feminino';lG();document.getElementById('gd').scrollIntoView({behavior:'smooth'})">Ver feminino</button>
  <button class="chip" style="background:none;color:#f5f5f4;border-color:#555;padding:10px 22px" onclick="catL='Masculino';lG();document.getElementById('gd').scrollIntoView({behavior:'smooth'})">Ver masculino</button></div>
  <div class="art">${ic("dress","#7f1d3a")}${ic("polo","#2f5d4b")}</div></section>
  <div class="trust"><div><b>13% off no Pix</b>Desconto direto no pagamento</div><div><b>Até 12x sem juros</b>No cartão de crédito</div><div><b>Frete grátis</b>Em produtos selecionados</div><div><b>Compra segura</b>Seus dados protegidos</div></div>
  <div class="cats" id="ct"></div>
  <div class="hd" id="gd"><h2 id="gt"></h2><div class="disc"><select onchange="bL=this.value;lG()">${brands.map(b=>`<option>${b}</option>`).join("")}</select>
  <select onchange="ord=this.value;lG()"><option value="rel">Relevância</option><option value="asc">Menor preço</option><option value="desc">Maior preço</option></select></div></div>
  <div class="grid" id="gr"></div>
  <footer class="ft"><div><b>Black Rose Modas</b><span class="mut">Moda com história, tradição e carinho. Mais que moda, somos parte da sua história.</span></div>
  <div><b>Nossas unidades</b><span class="mut">Americana · Nova Odessa · Sumaré<br>R. Doze de Novembro, 393 - Vila Rehder, Americana - SP</span></div>
  <div><b>Atendimento</b><span class="mut">WhatsApp (19) 99887-8164</span></div>
  <div><b>Ofertas por e-mail</b><div class="disc"><input placeholder="Seu e-mail" style="flex:1"><button class="g" onclick="toast('Obrigado por se inscrever!')">Quero</button></div></div></footer><div id="dr"></div>`;
  lG();uL();
}
function lG(){
  const fl=P.filter(p=>(catL==="Todos"||p.g===catL||p.cat===catL)&&(bL==="Todas"||p.brand===bL)&&(!favO||DB.fav.includes(p.id))&&(!ql||(p.name+p.brand).toLowerCase().includes(ql.toLowerCase())));
  if(ord==="asc")fl.sort((a,b)=>a.price-b.price);if(ord==="desc")fl.sort((a,b)=>b.price-a.price);
  $("#ct").innerHTML=CT.map(c=>`<button class="${c[0]===catL?"on":""}" onclick="catL='${c[0]}';lG()"><span class="th">${ic(c[1],c[2])}</span>${c[0]}</button>`).join("");
  $("#gt").textContent=(favO?"Favoritos":catL==="Todos"?"Lançamentos":catL)+" · "+fl.length+" produto"+(fl.length===1?"":"s");
  $("#fb").textContent=(favO?"♥":"♡")+" Favoritos "+(DB.fav.length||"");
  $("#gr").innerHTML=fl.map(p=>{const f=DB.fav.includes(p.id);return `<div class="card"><button class="fav${f?" on":""}" onclick="tf(${p.id})" aria-label="Favoritar">${f?"♥":"♡"}</button>${p.promo?'<span class="bd">2+ = 15% off</span>':""}
  <div class="ph">${img(p.id)}</div><div class="brand">${p.brand}</div><div class="nm">${p.name}</div><div class="pr">${R(p.price)}</div><div class="mut">12x de ${R(p.price/12)} sem juros</div><div class="tag">${R(p.price*.87)} no Pix</div>
  <select id="s${p.id}">${p.sizes.map(s=>`<option>${s}</option>`).join("")}</select><button class="p" onclick="addL(${p.id})">Adicionar à sacola</button></div>`}).join("")||'<p class="mut">Nenhum produto encontrado.</p>';
}
function tf(id){const i=DB.fav.indexOf(id);i<0?DB.fav.push(id):DB.fav.splice(i,1);save();lG()}
function addL(id){if(add(cartL,id,$("#s"+id).value)){drO=true;uL()}}
function chL(k,d){chg(cartL,k,d);uL()}
function uL(){
  const c=calc(cartL,null,"cartao"),n=cartL.reduce((a,i)=>a+i.q,0);
  $("#cb").textContent="Sacola "+(n||"");
  $("#dr").innerHTML=drO?`<div class="dr" onclick="if(event.target===this){drO=false;uL()}"><div><div style="display:flex;justify-content:space-between;align-items:center"><b style="font-size:18px">Sacola</b><button class="g" onclick="drO=false;uL()">Fechar</button></div>
  ${lines(cartL,"chL")}${n?`<div class="row"><span>Subtotal</span><span>${R(c.sub)}</span></div>${c.promo?`<div class="row"><span>Desconto 2+ peças</span><span>−${R(c.promo)}</span></div>`:""}
  <div class="row t"><span>Total</span><span>${R(c.total)}</span></div><div class="mut">ou ${R(c.total*.87)} no Pix · 12x de ${R(c.total/12)} sem juros</div><br>
  <button class="p" onclick="toast('Demonstração: aqui o pedido segue para o pagamento')">Finalizar pedido</button>`:""}</div></div>`:"";
}

/* ---------- CAIXA (PDV) ---------- */
let cartC=[],disc={t:"%",v:0},pay="pix",inst=1,q="",tab="venda",closing=false;
function viewCaixa(){
  if(!DB.caixa){
    $("#app").innerHTML=`<div style="max-width:360px;margin:40px auto"><h1>Abrir caixa</h1><p class="mut">Informe o operador e o fundo de troco.</p><br>
    <input id="op" placeholder="Nome do operador" style="width:100%;margin-bottom:10px"><input id="fd" inputmode="decimal" placeholder="Fundo de troco (R$)" style="width:100%;margin-bottom:14px"><button class="p" onclick="abrir()">Abrir caixa</button></div>`;return;
  }
  $("#app").innerHTML=`<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px"><div><h1>Caixa</h1><span class="mut">Operador: ${DB.caixa.op} · aberto às ${hm(DB.caixa.t)}</span></div>
  <div class="bar" style="margin:0">${[["venda","Venda"],["hist","Vendas do dia"],["fech","Fechamento"]].map(t=>`<button class="chip${tab===t[0]?" on":""}" onclick="tab='${t[0]}';closing=false;viewCaixa()">${t[1]}</button>`).join("")}</div></div>
  <div id="tb" style="margin-top:14px"></div>`;
  if(tab==="venda")tVenda();else if(tab==="hist")tHist();else tFech();
}
function abrir(){const op=$("#op").value.trim(),f=parseFloat(($("#fd").value||"0").replace(",","."));
  if(!op){toast("Informe o operador");return}
  DB.caixa={op,fundo:isNaN(f)?0:f,t:Date.now(),from:DB.sales.length};save();viewCaixa()}
function tVenda(){
  $("#tb").innerHTML=`<div class="lay"><div><input id="bs" placeholder="Buscar produto, marca ou tamanho   (F2)" style="width:100%;margin-bottom:12px" value="${q}" oninput="q=this.value;lP()"><div id="pl"></div></div>
  <aside class="side"><b>Venda atual</b><div id="cc"></div></aside></div>`;
  lP();uC();$("#bs").focus();
}
function lP(){
  const k=q.toLowerCase();
  $("#pl").innerHTML=P.filter(p=>!k||(p.name+p.brand+p.cat+p.g).toLowerCase().includes(k)).map(p=>`<div class="pl"><div class="th">${img(p.id)}</div><div style="min-width:0;flex:1"><div class="nm" style="min-height:0">${p.name}</div><div class="mut">${p.brand} · ${R(p.price)} · estoque ${stock(p)}${p.promo?" · 2+ = 15% off":""}</div></div>
  <div class="sz">${stock(p)>0?p.sizes.map(s=>`<button onclick="addC(${p.id},'${s}')">${s}</button>`).join(""):'<span class="mut">Esgotado</span>'}</div></div>`).join("")||'<p class="mut">Nada encontrado.</p>';
}
function addC(id,s){if(add(cartC,id,s))uC()}
function chC(k,d){chg(cartC,k,d);uC()}
function uC(){
  const c=calc(cartC,disc,pay),n=cartC.length;
  $("#cc").innerHTML=lines(cartC,"chC")+`<div style="margin:12px 0 8px" class="disc"><select onchange="disc.t=this.value;uC()"><option value="%"${disc.t==="%"?" selected":""}>Desc. %</option><option value="R"${disc.t==="R"?" selected":""}>Desc. R$</option></select><input inputmode="decimal" value="${disc.v||""}" placeholder="0" onchange="disc.v=Math.max(0,parseFloat(this.value.replace(',','.'))||0);uC()"></div>
  <div class="pm">${[["pix","Pix"],["din","Dinheiro"],["deb","Débito"],["cre","Crédito"]].map(m=>`<button class="chip${pay===m[0]?" on":""}" onclick="pay='${m[0]}';uC()">${m[1]}</button>`).join("")}</div>
  <div class="row"><span>Subtotal</span><span>${R(c.sub)}</span></div>
  ${c.promo?`<div class="row"><span>2+ peças promo</span><span>−${R(c.promo)}</span></div>`:""}${c.man?`<div class="row"><span>Desconto manual</span><span>−${R(c.man)}</span></div>`:""}${c.pix?`<div class="row"><span>Pix 13%</span><span>−${R(c.pix)}</span></div>`:""}
  <div class="row t"><span>Total</span><span>${R(c.total)}</span></div>
  ${pay==="cre"?`<select style="width:100%;margin-top:8px" onchange="inst=+this.value;uC()">${[...Array(12)].map((_,i)=>`<option value="${i+1}"${inst===i+1?" selected":""}>${i+1}x de ${R(c.total/(i+1))} sem juros</option>`).join("")}</select>`:""}
  ${pay==="din"?`<input id="rec" inputmode="decimal" placeholder="Valor recebido" style="width:100%;margin-top:8px" oninput="tr(${c.total})"><div class="row"><span>Troco</span><span id="tc">${R(0)}</span></div>`:""}
  <br><button class="p" ${n?"":"disabled"} onclick="finalizar()">Finalizar <kbd style="color:inherit;border-color:currentColor;opacity:.6">F4</kbd></button>
  <button class="g" style="width:100%;margin-top:8px" ${n?"":"disabled"} onclick="cartC=[];disc={t:'%',v:0};uC()">Cancelar venda</button>`;
}
function tr(t){const v=parseFloat(($("#rec").value||"0").replace(",","."))||0;$("#tc").textContent=R(Math.max(0,v-t))}
function finalizar(){
  if(!cartC.length)return;
  const c=calc(cartC,disc,pay);let given=0;
  if(pay==="din"){given=parseFloat(($("#rec").value||"0").replace(",","."))||0;if(given<c.total){toast("Valor recebido menor que o total");return}}
  const s={n:DB.sales.length+1,t:Date.now(),op:DB.caixa.op,items:cartC.map(i=>({id:i.id,size:i.size,q:i.q,name:P[i.id].name,price:P[i.id].price})),m:pay,inst:pay==="cre"?inst:1,given,...c};
  cartC.forEach(i=>DB.stock[i.id]=stock(P[i.id])-i.q);
  DB.sales.push(s);save();cartC=[];disc={t:"%",v:0};recibo(s);viewCaixa();
}
const MN={pix:"Pix",din:"Dinheiro",deb:"Débito",cre:"Crédito"};
function recibo(s){
  const L=["BLACK ROSE MODAS","Recibo nº "+pad(s.n)+" · "+new Date(s.t).toLocaleString("pt-BR"),"Operador: "+s.op,"--------------------------------",
  ...s.items.map(i=>`${i.q}x ${i.name} (${i.size})\n     ${R(i.price*i.q)}`),"--------------------------------","Subtotal  "+R(s.sub)];
  if(s.promo)L.push("Promo 2+  −"+R(s.promo));if(s.man)L.push("Desconto  −"+R(s.man));if(s.pix)L.push("Pix 13%   −"+R(s.pix));
  L.push("TOTAL     "+R(s.total),"Pagamento: "+MN[s.m]+(s.inst>1?` em ${s.inst}x`:""));
  if(s.m==="din")L.push("Recebido  "+R(s.given),"Troco     "+R(s.given-s.total));
  L.push("","Obrigado pela preferência!");
  const o=document.createElement("div");o.className="ov";
  o.innerHTML=`<div class="rc"><pre>${L.join("\n")}</pre><button class="p" onclick="window.print()">Imprimir</button><button class="g" style="width:100%;margin-top:8px" onclick="this.closest('.ov').remove()">Nova venda</button></div>`;
  document.body.appendChild(o);
}
function tHist(){
  const v=DB.sales.slice(DB.caixa.from).reverse();
  $("#tb").innerHTML=v.map(s=>`<div class="pl"><div><b>#${pad(s.n)}</b> · ${hm(s.t)} · ${s.items.reduce((a,i)=>a+i.q,0)} peça(s)<div class="mut">${MN[s.m]}${s.inst>1?" "+s.inst+"x":""} · ${s.op}</div></div><div><b>${R(s.total)}</b></div></div>`).join("")||'<p class="mut">Nenhuma venda neste caixa ainda.</p>';
}
function tFech(){
  const v=DB.sales.slice(DB.caixa.from),by=m=>v.filter(s=>s.m===m).reduce((a,s)=>a+s.total,0),tot=v.reduce((a,s)=>a+s.total,0);
  $("#tb").innerHTML=`<div class="kp"><div>Vendas<b>${v.length}</b></div><div>Faturamento<b>${R(tot)}</b></div><div>Ticket médio<b>${R(v.length?tot/v.length:0)}</b></div></div>
  <div class="kp">${Object.keys(MN).map(m=>`<div>${MN[m]}<b>${R(by(m))}</b></div>`).join("")}</div>
  <div class="side" style="position:static;max-width:420px"><div class="row"><span>Fundo de troco</span><span>${R(DB.caixa.fundo)}</span></div><div class="row"><span>Dinheiro esperado na gaveta</span><b>${R(DB.caixa.fundo+by("din"))}</b></div><br>
  <button class="p" onclick="fechar()">${closing?"Confirmar fechamento":"Fechar caixa"}</button></div>`;
}
function fechar(){if(!closing){closing=true;tFech();return}DB.caixa=null;closing=false;save();toast("Caixa fechado");viewCaixa()}

document.addEventListener("keydown",e=>{
  if($("#app").querySelector("#bs")){
    if(e.key==="F2"){e.preventDefault();$("#bs").focus()}
    if(e.key==="F4"){e.preventDefault();finalizar()}
  }
});
function route(){
  const h=location.hash==="#caixa"?"caixa":"loja";
  $("#n1").className=h==="loja"?"on":"";$("#n2").className=h==="caixa"?"on":"";
  $("#an").style.display=h==="loja"?"":"none";h==="loja"?viewLoja():viewCaixa();
}
addEventListener("hashchange",route);route();

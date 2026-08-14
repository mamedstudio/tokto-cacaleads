// ==================== TOKTO CAÇA-LEADS v4 ====================
function esc(s){return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}

const HTML = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Caça-Leads Tokto</title>
<style>
:root{--bg:#0d131f;--card:#161f30;--blue:#2563eb;--txt:#fff;--mut:#94a3b8;--bord:#243044;--green:#22c55e;--orange:#f97316}
*{box-sizing:border-box}body{background:var(--bg);color:var(--txt);font-family:-apple-system,'Segoe UI',Roboto,sans-serif;margin:0;padding:16px}
.wrap{max-width:560px;margin:0 auto}h1{font-size:20px;text-align:center;color:var(--orange)}
.card{background:var(--card);border:1px solid var(--bord);border-radius:14px;padding:16px;margin-bottom:14px}
label{display:block;font-size:12px;color:var(--mut);margin:8px 0 4px;font-weight:600}
input,select{width:100%;padding:12px;background:#0d131f;border:1px solid var(--bord);border-radius:10px;color:#fff;font-size:15px;outline:none}
.btn{width:100%;padding:14px;border:none;border-radius:10px;font-weight:bold;font-size:15px;cursor:pointer;margin-top:10px}
.btn-blue{background:var(--blue);color:#fff}.btn-green{background:var(--green);color:#fff}
pre{background:#0d131f;border:1px solid var(--bord);border-radius:10px;padding:12px;white-space:pre-wrap;font-size:13px;color:#e2e8f0;font-family:inherit}
.lead{background:#0d131f;border:1px solid var(--bord);border-radius:10px;padding:12px;margin-bottom:8px;font-size:13px}
.lead b{color:var(--orange)}
.st{display:inline-block;padding:2px 8px;border-radius:8px;font-size:11px;font-weight:bold;background:#243044}
.row{display:flex;gap:6px;margin-top:8px;flex-wrap:wrap}.row button{flex:1;padding:8px;border:none;border-radius:8px;font-size:12px;font-weight:bold;cursor:pointer}
#cupomOut a{color:#38bdf8;word-break:break-all}
</style>
</head>
<body>
<div class="wrap">
<h1>🎯 Caça-Leads Tokto</h1>

<div class="card">
<label>@handle do Instagram</label><input id="handle" placeholder="@galpaoamoveismarilia">
<label>Nome da loja</label><input id="loja" placeholder="Galpão Móveis">
<label>Cidade</label><input id="cidade" placeholder="Marília">
<label>Vertical</label>
<select id="vertical">
<option value="moda">Moda</option><option value="moveis">Móveis</option>
<option value="veiculos">Veículos</option><option value="joias">Joias</option>
<option value="eletro">Eletro</option><option value="colchoes">Colchões</option>
<option value="construcao">Construção</option><option value="outro">Outro</option>
</select>

<label>📷 Foto do produto (arquivo)</label><input type="file" id="foto" accept="image/*">
<label>ou cole a URL da foto</label><input id="fotoUrl" placeholder="https://...">
<label>Nome da peça</label><input id="peca" placeholder="Sofá 3 lugares">
<label>Preço que a loja recebe (R$)</label><input id="preco" type="number" placeholder="2000">
<button class="btn btn-green" onclick="gerarCupom()">🎨 Gerar cupom de exemplo</button>

<div id="cupomOut" style="display:none;margin-top:10px">
<div style="font-size:13px;color:var(--mut)">👉 Veja seu cupom como ficaria:</div>
<a id="cupomLink" href="#" target="_blank"></a>
<div class="row"><button style="background:#0ea5e9;color:#fff" onclick="copiarCupom()">📋 Copiar linha do cupom</button></div>
</div>

<button class="btn btn-blue" onclick="gerar()">⚡ Gerar abordagem</button>
<div id="out" style="display:none">
<pre id="txtAbordagem"></pre>
<div class="row">
<button style="background:#2563eb;color:#fff" onclick="copiar()">📋 Copiar</button>
<button style="background:#22c55e;color:#fff" onclick="salvar()">💾 Salvar lead</button>
</div>
</div>
<div id="msg" style="font-size:13px;margin-top:8px;color:var(--green)"></div>
</div>

<div class="card"><b style="font-size:14px">📇 Meus Leads</b><div id="lista" style="margin-top:10px"></div></div>
</div>

<script>
var DOR={
moda:'"quanto tá?" e "guarda pra mim"',
moveis:'"quanto o sofá?" e "manda a medida"',
veiculos:'"quanto tá na pronta entrega?"',
joias:'"quanto o par?" e "manda mais foto"',
eletro:'"qual o preço à vista?"',
colchoes:'"quanto o king?" e "tem entrega?"',
construcao:'"quanto o milheiro?" e "entrega onde?"',
outro:'"quanto tá?" e "guarda pra mim"'
};
function fileToDataUrl(file,max){max=max||800;return new Promise(function(res){var rd=new FileReader();rd.onload=function(e){var img=new Image();img.onload=function(){var c=document.createElement('canvas');var sc=Math.min(1,max/Math.max(img.width,img.height));c.width=Math.round(img.width*sc);c.height=Math.round(img.height*sc);c.getContext('2d').drawImage(img,0,0,c.width,c.height);res(c.toDataURL('image/jpeg',0.8));};img.src=e.target.result;};rd.readAsDataURL(file);});}
async function gerarCupom(){
var msg=document.getElementById('msg');
var body={name:document.getElementById('peca').value,price:parseFloat(document.getElementById('preco').value)||0,loja:document.getElementById('loja').value||'sua loja',cidade:document.getElementById('cidade').value,vertical:document.getElementById('vertical').value};
var f=document.getElementById('foto');
if(f.files&&f.files[0]){body.dataUrl=await fileToDataUrl(f.files[0]);}
else{var u=document.getElementById('fotoUrl').value;if(u)body.imageUrl=u;}
if(!body.dataUrl&&!body.imageUrl){msg.textContent='📷 Envie uma foto ou cole a URL.';return;}
if(!body.name||!body.price){msg.textContent='Preencha nome da peça e preço.';return;}
msg.textContent='Gerando cupom...';
var r=await fetch('/api/cupom',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
var d=await r.json();
if(d.link){window.lastCupom=d.link;document.getElementById('cupomLink').href=d.link;document.getElementById('cupomLink').textContent=d.link;document.getElementById('cupomOut').style.display='block';msg.textContent='🎨 Cupom de exemplo pronto!';}
else{msg.textContent='Erro: '+(d.error||'falha');}
}
function copiarCupom(){navigator.clipboard.writeText('👉 Clique aqui e veja seu cupom como ficaria: '+window.lastCupom);document.getElementById('msg').textContent='✅ Linha do cupom copiada!';}
function gerar(){
var loja=document.getElementById('loja').value||'lojista';
var v=document.getElementById('vertical').value;
var t='Oi '+loja+', aqui é Márcio do Tokto.\\n'
+'Três lojas da região já usam nosso CupomClic pra vender nas lives e no WhatsApp:\\n'
+'• Érica Store (Sta. Cruz do Rio Pardo)\\n• Anjoz Store (Bauru)\\n• Era Delas (Marília)\\n'
+'A cliente clica no cupom e já paga no próprio link — sem '+DOR[v]+' no direct.\\n'
+'Sem mensalidade. Você recebe 100% do preço que anunciar.\\n'
+'Os 15% são somados por cima — quem paga é quem compra, não sai do seu bolso.\\n'
+(window.lastCupom?('👉 Clique aqui e veja seu cupom como ficaria: '+window.lastCupom+'\\n'):'')
+'Marca aqui rapidinho: https://agendamento-cupomclic.vercel.app';
document.getElementById('txtAbordagem').textContent=t;
document.getElementById('out').style.display='block';
}
function copiar(){navigator.clipboard.writeText(document.getElementById('txtAbordagem').textContent);document.getElementById('msg').textContent='✅ Abordagem copiada!';}
async function salvar(){
var lead={handle:document.getElementById('handle').value,loja:document.getElementById('loja').value,cidade:document.getElementById('cidade').value,vertical:document.getElementById('vertical').value,abordagem:document.getElementById('txtAbordagem').textContent,cupom:window.lastCupom||''};
var r=await fetch('/api/lead',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(lead)});
if(r.ok){document.getElementById('msg').textContent='💾 Lead salvo!';carregar();}
}
async function carregar(){
var r=await fetch('/api/leads');var d=await r.json();
var el=document.getElementById('lista');el.innerHTML='';
var COR={abordado:'#d97706',agendado:'#2563eb',convertido:'#22c55e'};
(d.leads||[]).forEach(function(l){
var div=document.createElement('div');div.className='lead';
var html='<b>'+esc(l.loja)+'</b> · '+esc(l.cidade)+' · '+esc(l.vertical)+' <span class="st">'+l.status+'</span>';
html+='<div class="row">';
html+='<button style="background:#334155;color:#fff" title="copiar abordagem" onclick="recopiar(\\''+l.id+'\\')">📋 copiar</button>';
html+='<button style="background:#7f1d1d;color:#fff" title="excluir lead" onclick="del(\\''+l.id+'\\')">🗑️</button>';
['abordado','agendado','convertido'].forEach(function(st){
var ativo=(l.status===st);
html+='<button style="background:'+(ativo?COR[st]:'#243044')+';color:'+(ativo?'#fff':'#64748b')+'" onclick="status(\\''+l.id+'\\',\\''+st+'\\')">'+st+'</button>';
});
html+='</div>';
div.innerHTML=html;
el.appendChild(div);
});
window._leads=d.leads||[];
}
function esc(s){return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;')}
function recopiar(id){var l=(window._leads||[]).find(function(x){return x.id===id});if(l){navigator.clipboard.writeText(l.abordagem);document.getElementById('msg').textContent='✅ Abordagem copiada!';}}
async function status(id,st){await fetch('/api/lead',{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:id,status:st})});carregar();}
async function del(id){
if(!confirm('Excluir este lead?'))return;
await fetch('/api/lead',{method:'DELETE',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:id})});
carregar();
}
carregar();
</script>
</body>
</html>`;

function renderCupom(r, link){
  const net=Number(r.price)||0;
  const buyer=net*1.15;
  const anchor=buyer*1.3;
  const brl=v=>Number(v).toFixed(2).replace('.',',');
  const pix='00020126360014BR.GOV.BCB.PIX0114cupomclic-'+r.id+'5204000053039865406'+buyer.toFixed(2)+'5802BR5909CUPOMCLIC6007MARILIA62070503***6304DEMO';
  return `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Cupom • ${esc(r.name)}</title>
<style>
body{font:15px/1.5 system-ui;background:#fff7ed;color:#1f2937;margin:0}
header{background:#f97316;color:#fff;padding:10px 16px;display:flex;align-items:center;gap:10px}
header b{font-size:17px;display:block}header small{opacity:.9;font-size:12px;display:block}
main{max-width:480px;margin:16px auto;padding:0 14px}
.card{background:#fff;border-radius:16px;box-shadow:0 4px 16px rgba(0,0,0,.08);padding:18px;margin-bottom:14px}
h1{font-size:20px;margin:0 0 6px}.desc{color:#4b5563}
.foto{width:100%;max-height:280px;object-fit:cover;border-radius:12px;margin:10px 0;cursor:zoom-in}
.price{margin:12px 0}.price .de{color:#9ca3af;text-decoration:line-through;font-size:14px}.price .por{color:#16a34a;font-size:26px;font-weight:800}
.qr{text-align:center;margin:14px 0}.qr img{border-radius:12px;border:6px solid #fff;box-shadow:0 2px 10px rgba(0,0,0,.15)}.qr p{font-size:12px;color:#6b7280;margin:6px 0 0}
button{width:100%;padding:14px;border:0;border-radius:12px;background:#16a34a;color:#fff;font-size:16px;font-weight:700;cursor:pointer}
.pix{display:none;background:#f0fdf4;border:1px dashed #16a34a;border-radius:10px;padding:10px;margin-top:10px;font-size:11px;word-break:break-all}
.meta{font-size:13px;color:#6b7280;text-align:center}
.tag{display:inline-block;background:#ffedd5;color:#9a3412;border-radius:999px;padding:3px 10px;font-size:12px;font-weight:700}
#zoomOverlay{position:fixed;inset:0;background:rgba(0,0,0,.92);display:none;align-items:center;justify-content:center;z-index:99;padding:10px}
#zoomOverlay.active{display:flex}#zoomOverlay img{max-width:100%;max-height:100%;object-fit:contain;border-radius:10px}
#zoomHint{position:absolute;bottom:16px;left:0;right:0;text-align:center;color:#e5e7eb;font-size:12px}
.tokto-footer{margin-top:20px;padding-top:16px;border-top:1px solid #e5e7eb;text-align:center}.tokto-footer p{font-size:12px;color:#6b7280}.tokto-footer a{color:#f97316;font-weight:600}
</style></head><body>
<header><div><b>🎯 cupom clic</b><small>ofertas incríveis pertinho de você</small></div></header>
<main><div class="card">
<img id="foto" class="foto" src="${r.dataUrl}" alt="foto do produto — toque para ampliar">
<span class="tag">🏪 ${esc(r.loja)} • ${esc(r.cidade)}</span>
<h1>${esc(r.name)}</h1>
<p class="desc">Cupom de demonstração gerado pelo Caça-Leads Tokto.</p>
<div class="price">
<span class="de">de R$ ${brl(anchor)}</span><br>
<span class="por">por R$ ${brl(buyer)}</span>
</div>
<div class="qr"><img width="180" height="180" src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(link)}" alt="QR do cupom"><p>Apresente este QR na loja para validar</p></div>
<button id="buy">🛒 Comprar com Pix</button>
<div class="pix" id="pixbox">${pix}</div>
<div class="tokto-footer"><p>Este cupom foi criado com <a href="https://tokto.com.br" target="_blank">Tokto</a> • Plataforma de cupons para lojistas</p></div>
</div>
<p class="meta">💰 Lojista recebe R$ ${brl(net)} • os 15% já estão por cima, pagos por quem compra</p>
</main>
<div id="zoomOverlay"><img id="zoomImg" alt="foto ampliada"><p id="zoomHint">toque para fechar 🔍</p></div>
<script>
var PIX="${pix}";
document.getElementById('buy').onclick=function(){var b=document.getElementById('pixbox');b.style.display='block';this.textContent='✅ Pix copia-e-cola gerado!';if(navigator.clipboard)navigator.clipboard.writeText(PIX);};
var foto=document.getElementById('foto');
foto.onclick=function(){document.getElementById('zoomImg').src=foto.src;document.getElementById('zoomOverlay').classList.add('active');};
document.getElementById('zoomOverlay').onclick=function(){this.classList.remove('active');};
</script>
</body></html>`;
}

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    const H = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' };

    if (url.pathname === '/') return new Response(HTML, { headers: { 'Content-Type': 'text/html;charset=utf-8' } });

    if (url.pathname === '/c' && req.method === 'GET') {
      const id = url.searchParams.get('id');
      const rec = JSON.parse(await env.LEADS.get('cupom_' + id) || 'null');
      if (!rec) return new Response('Cupom não encontrado.', { status: 404 });
      return new Response(renderCupom(rec, url.origin + '/c?id=' + id), { headers: { 'Content-Type': 'text/html;charset=utf-8' } });
    }

    if (url.pathname === '/api/cupom' && req.method === 'POST') {
      const b = await req.json();
      let dataUrl = b.dataUrl || '';
      if (!dataUrl && b.imageUrl) {
        try {
          const r = await fetch(b.imageUrl);
          const buf = await r.arrayBuffer();
          const bytes = new Uint8Array(buf);
          let bin = ''; for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
          const ct = (r.headers.get('content-type') || 'image/jpeg').split(';')[0];
          dataUrl = 'data:' + ct + ';base64,' + btoa(bin);
        } catch (e) { return new Response(JSON.stringify({ error: 'não consegui baixar a foto' }), { headers: H }); }
      }
      if (!dataUrl) return new Response(JSON.stringify({ error: 'foto obrigatória' }), { headers: H });
      if (dataUrl.length > 1500000) return new Response(JSON.stringify({ error: 'foto muito grande — envie uma menor' }), { headers: H });
      const id = 'cp_' + Date.now().toString(36);
      await env.LEADS.put('cupom_' + id, JSON.stringify({ id, dataUrl, name: b.name, price: b.price, loja: b.loja, cidade: b.cidade, vertical: b.vertical, at: new Date().toISOString() }));
      return new Response(JSON.stringify({ id, link: url.origin + '/c?id=' + id }), { headers: H });
    }

    if (url.pathname === '/api/leads' && req.method === 'GET') {
      const leads = JSON.parse(await env.LEADS.get('leads') || '[]');
      return new Response(JSON.stringify({ leads }), { headers: H });
    }

    if (url.pathname === '/api/lead' && req.method === 'POST') {
      const b = await req.json();
      const leads = JSON.parse(await env.LEADS.get('leads') || '[]');
      leads.unshift({ id: 'ld_' + Date.now(), status: 'novo', at: new Date().toISOString(), handle: b.handle||'', loja: b.loja||'', cidade: b.cidade||'', vertical: b.vertical||'', abordagem: b.abordagem||'', cupom: b.cupom||'' });
      await env.LEADS.put('leads', JSON.stringify(leads));
      return new Response(JSON.stringify({ ok: true }), { headers: H });
    }

    if (url.pathname === '/api/lead' && req.method === 'PATCH') {
      const b = await req.json();
      const leads = JSON.parse(await env.LEADS.get('leads') || '[]');
      const l = leads.find(x => x.id === b.id);
      if (l) { l.status = b.status; await env.LEADS.put('leads', JSON.stringify(leads)); }
      return new Response(JSON.stringify({ ok: !!l }), { headers: H });
    }

    if (url.pathname === '/api/lead' && req.method === 'DELETE') {
      const b = await req.json();
      let leads = JSON.parse(await env.LEADS.get('leads') || '[]');
      leads = leads.filter(x => x.id !== b.id);
      await env.LEADS.put('leads', JSON.stringify(leads));
      return new Response(JSON.stringify({ ok: true }), { headers: H });
    }

    return new Response(JSON.stringify({ error: 'não encontrado' }), { status: 404, headers: H });
  }
};

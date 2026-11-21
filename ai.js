(function(){
const A=window.SITEAPI,S=window.SITE||{};if(!A)return;
const $=id=>document.getElementById(id),esc=A.esc;
const fb=`<p class="note">The AI tools are not switched on yet.${S.scan?` Meanwhile you can use the <a href="${esc(S.scan)}" target="_blank" rel="noopener">earlier scanner</a>.`:""}</p>`;
const bad='<p class="note">Something went wrong. Please try again in a moment.</p>';
async function call(path,body){const r=await fetch(S.ai+path,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)});if(!r.ok)throw new Error("http "+r.status);const j=await r.json();if(j.error)throw new Error(j.error);return j}
function shrink(f){return new Promise((ok,no)=>{const u=URL.createObjectURL(f),im=new Image();im.onload=()=>{const r=Math.min(1,1024/Math.max(im.width,im.height)),c=document.createElement("canvas");c.width=im.width*r;c.height=im.height*r;c.getContext("2d").drawImage(im,0,0,c.width,c.height);ok(c.toDataURL("image/jpeg",.85))};im.onerror=no;im.src=u})}
const P={red:"Stop and check",yellow:"Caution",green:"Information"};
const file=$("file");
if(file)file.onchange=async e=>{const f=e.target.files[0];if(!f)return;const r=$("res");
 if(!S.ai){r.innerHTML=fb;return}
 r.innerHTML='<p class="mini">Analyzing…</p>';
 try{const d=await call("/scan",{image:await shrink(f),car:A.car(),country:A.cname()});
  if(!d.found){r.innerHTML=`<h2>Not clear</h2><p>${esc(d.meaning||"Please retake the photo closer to the light.")}</p>`;return}
  const s=P[d.severity]?d.severity:"yellow",items=(Array.isArray(d.items)?d.items:[]).filter(x=>x&&x.label&&x.query).slice(0,3);
  r.innerHTML=`<span class="pill ${s}">${P[s]}</span><h2>${esc(d.name)}</h2><p>${esc(d.meaning)}</p><p><b>${esc(d.canDrive)}</b></p>${(d.steps||[]).length?"<ol>"+d.steps.map(x=>"<li>"+esc(x)+"</li>").join("")+"</ol>":""}${A.car()&&items.length?"<h2>Helpful items for your "+esc(A.car())+'</h2><div class="pg">'+items.map(x=>`<a class="pc" href="${A.link(A.car()+" "+x.query)}" target="_blank" rel="sponsored nofollow noopener">${esc(x.label)}</a>`).join("")+"</div>":""}`
 }catch(err){r.innerHTML=bad}};
const go=$("go");
if(go)go.onclick=async()=>{const out=$("out"),p=$("free").value.trim()||$("prob").value;
 if(!p){out.innerHTML='<p class="note">Choose a problem or describe it.</p>';return}
 if(!S.ai){out.innerHTML=fb;return}
 out.innerHTML='<p class="mini">Estimating…</p>';
 try{const d=await call("/estimate",{car:A.car(),problem:p,country:A.cname(),currency:A.cur()});
  const f=n=>typeof n==="number"?n.toLocaleString():"?",c=esc(d.currency||A.cur());
  out.innerHTML=`<h2>Estimated cost: ${c} ${f(d.total_low)} to ${f(d.total_high)}</h2><p>${esc(d.summary)}</p><ul><li>Parts: ${c} ${f(d.parts_low)} to ${f(d.parts_high)}</li><li>Labor: ${c} ${f(d.labor_low)} to ${f(d.labor_high)}</li><li>Confidence: ${esc(d.confidence||"low")}</li></ul><p class="mini">${esc(d.notes||"")} ${A.car()?"":"Pick your car for a better estimate. "}This is an AI estimate based on typical prices, not a quote. Get quotes from local garages.</p>`
 }catch(e){out.innerHTML=bad}};
})();

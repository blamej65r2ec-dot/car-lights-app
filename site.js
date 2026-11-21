(function(){
const S=window.SITE||{},TAGS=S.tags||{},MAKES=["Abarth", "Acura", "Alfa Romeo", "Aston Martin", "Audi", "BAIC", "Bentley", "BMW", "Brilliance", "Buick", "BYD", "Cadillac", "Changan", "Chery", "Chevrolet", "Chrysler", "Citro\u00ebn", "Cupra", "Dacia", "Daewoo", "Daihatsu", "Dodge", "Dongfeng", "DS", "FAW", "Ferrari", "Fiat", "Ford", "GAC", "Geely", "Genesis", "GMC", "Great Wall", "Haval", "Honda", "Hummer", "Hyundai", "Infiniti", "Isuzu", "Jaecoo", "Jaguar", "Jeep", "Jetour", "Kia", "Lada", "Lamborghini", "Land Rover", "Lexus", "Lincoln", "Lotus", "Lynk & Co", "Mahindra", "Maserati", "Maxus", "Mazda", "McLaren", "Mercedes-Benz", "MG", "Mini", "Mitsubishi", "Nissan", "Omoda", "Opel", "Peugeot", "Polestar", "Pontiac", "Porsche", "Proton", "Ram", "Renault", "Rolls-Royce", "Rover", "Saab", "Scion", "SEAT", "Skoda", "Smart", "SsangYong", "Subaru", "Suzuki", "Tata", "Tesla", "Toyota", "Vauxhall", "Volkswagen", "Volvo"],MK={"US": ["amazon.com", "United States", "USD"], "CA": ["amazon.ca", "Canada", "CAD"], "GB": ["amazon.co.uk", "United Kingdom", "GBP"], "DE": ["amazon.de", "Germany", "EUR"], "FR": ["amazon.fr", "France", "EUR"], "IT": ["amazon.it", "Italy", "EUR"], "ES": ["amazon.es", "Spain", "EUR"], "NL": ["amazon.nl", "Netherlands", "EUR"], "BE": ["amazon.com.be", "Belgium", "EUR"], "SE": ["amazon.se", "Sweden", "SEK"], "PL": ["amazon.pl", "Poland", "PLN"], "TR": ["amazon.com.tr", "Turkey", "TRY"], "AE": ["amazon.ae", "United Arab Emirates", "AED"], "SA": ["amazon.sa", "Saudi Arabia", "SAR"], "EG": ["amazon.eg", "Egypt", "EGP"], "IN": ["amazon.in", "India", "INR"], "AU": ["amazon.com.au", "Australia", "AUD"], "SG": ["amazon.sg", "Singapore", "SGD"], "JP": ["amazon.co.jp", "Japan", "JPY"], "MX": ["amazon.com.mx", "Mexico", "MXN"], "BR": ["amazon.com.br", "Brazil", "BRL"]},TZ={"Africa/Cairo": "EG", "Asia/Riyadh": "SA", "Asia/Dubai": "AE", "Europe/London": "GB", "Europe/Berlin": "DE", "Europe/Paris": "FR", "Europe/Rome": "IT", "Europe/Madrid": "ES", "Europe/Amsterdam": "NL", "Europe/Brussels": "BE", "Europe/Stockholm": "SE", "Europe/Warsaw": "PL", "Europe/Istanbul": "TR", "Asia/Kolkata": "IN", "Asia/Calcutta": "IN", "Asia/Singapore": "SG", "Asia/Tokyo": "JP", "America/Mexico_City": "MX", "America/Sao_Paulo": "BR", "America/Toronto": "CA", "America/Vancouver": "CA", "America/Edmonton": "CA", "America/Winnipeg": "CA", "America/Halifax": "CA"},STORE=[["Maintenance and fluids", [["Engine oil", "engine oil", 1], ["Oil filter", "oil filter", 1], ["Engine air filter", "engine air filter", 1], ["Cabin air filter", "cabin air filter", 1], ["Coolant", "engine coolant antifreeze", 1], ["Transmission fluid", "transmission fluid", 1], ["Brake fluid", "brake fluid", 1], ["Power steering fluid", "power steering fluid", 1], ["Fuel system cleaner", "fuel system cleaner", 0]]], ["Brakes and wheels", [["Brake pads", "brake pads", 1], ["Brake rotors", "brake rotors", 1], ["Lug nuts", "lug nuts", 1], ["Tire pressure gauge", "tire pressure gauge", 0], ["Portable tire inflator", "portable tire inflator", 0], ["Tire repair kit", "tire repair kit", 0]]], ["Engine and electrical", [["Battery", "car battery", 1], ["Spark plugs", "spark plugs", 1], ["Ignition coils", "ignition coils", 1], ["Serpentine belt", "serpentine belt", 1], ["Thermostat", "thermostat", 1], ["Oxygen sensor", "oxygen sensor", 1], ["Fuse kit", "automotive fuse kit", 0], ["Battery terminal cleaner", "battery terminal cleaner", 0]]], ["Lighting and visibility", [["Headlight bulbs", "headlight bulbs", 1], ["Fog light bulbs", "fog light bulbs", 1], ["Turn signal bulbs", "turn signal bulbs", 1], ["Brake light bulbs", "brake light bulbs", 1], ["Wiper blades", "wiper blades", 1], ["Washer fluid", "windshield washer fluid", 0]]], ["Diagnostics and tools", [["OBD-II scanner", "OBD2 scanner", 0], ["Multimeter", "automotive multimeter", 0], ["Jump starter", "car jump starter", 0], ["Socket set", "socket set", 0], ["Torque wrench", "torque wrench", 0], ["Jack stands", "car jack stands", 0], ["Oil drain pan", "oil drain pan", 0], ["Funnel set", "automotive funnel", 0]]], ["Interior", [["Floor mats", "floor mats", 1], ["Seat covers", "seat covers", 1], ["Cargo liner", "cargo liner", 1], ["Sunshade", "windshield sun shade", 1], ["Steering wheel cover", "steering wheel cover", 0], ["Phone mount", "car phone mount", 0], ["Trunk organizer", "trunk organizer", 0]]], ["Exterior and care", [["Car cover", "car cover", 1], ["Mud flaps", "mud flaps", 1], ["Touch-up paint", "touch up paint", 1], ["Car wash kit", "car wash kit", 0], ["Car wax", "car wax", 0], ["Microfiber towels", "microfiber towels", 0]]], ["Electronics", [["Backup camera", "backup camera", 1], ["Dash cam", "dash cam", 0], ["Bluetooth adapter", "car bluetooth adapter", 0], ["USB car charger", "USB car charger", 0]]], ["Safety and emergency", [["Emergency roadside kit", "emergency roadside kit", 0], ["Fire extinguisher", "car fire extinguisher", 0], ["Reflective triangles", "warning triangles", 0], ["First aid kit", "first aid kit", 0]]]],MAN=[],PRODUCTS=[];
const $=id=>document.getElementById(id),enc=encodeURIComponent;
const esc=t=>{const d=document.createElement("div");d.textContent=t==null?"":String(t);return d.innerHTML};
let sel=null;try{sel=JSON.parse(localStorage.getItem("car3")||"null")}catch(e){}
if(!(sel&&sel.make&&sel.model&&sel.year))sel=null;
const label=()=>sel?`${sel.year} ${sel.make} ${sel.model}`:"";
function detect(){let tz="";try{tz=Intl.DateTimeFormat().resolvedOptions().timeZone||""}catch(e){}
 if(TZ[tz])return TZ[tz];if(tz.indexOf("Australia/")==0)return"AU";
 const r=((navigator.language||"").split("-")[1]||"").toUpperCase();return MK[r]?r:"US"}
let cty=null;try{cty=localStorage.getItem("cty")}catch(e){}if(!MK[cty])cty=detect();
const ok=c=>TAGS[c]&&!/^YOUR-/.test(TAGS[c]);const eff=()=>ok(cty)?cty:(S.fallbackUS&&ok("US")?"US":cty);
const dp=(id,mk)=>`https://www.${MK[mk][0]}/dp/${enc(id)}${ok(mk)?"?tag="+enc(TAGS[mk]):""}`;
function link(q,asin){const c=eff(),tg=ok(c)?"tag="+enc(TAGS[c]):"",m=MK[c][0];
 return asin?`https://www.${m}/dp/${enc(asin)}${tg?"?"+tg:""}`:`https://www.${m}/s?k=${enc(q)}${tg?"&"+tg:""}`}
const YEARS=[];for(let y=2026;y>=1980;y--)YEARS.push(String(y));
const opts=(a,p)=>`<option value="">${p}</option>`+a.map(x=>`<option>${esc(x)}</option>`).join("");
const mc={};
async function models(make,year){const k=make+year;if(mc[k])return mc[k];
 try{const r=await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeYear/make/${enc(make)}/modelyear/${year}?format=json`);const j=await r.json();return mc[k]=[...new Set((j.Results||[]).map(x=>x.Model_Name))].sort()}catch(e){return[]}}
const ctyBar=()=>`<p class="mini">Shopping from <select id="cty" aria-label="Country">${Object.keys(MK).map(k=>`<option value="${k}"${k==cty?" selected":""}>${esc(MK[k][1])}</option>`).join("")}</select></p>`;
function carBar(){
 const el=$("car");if(!el)return;
 if(sel){el.innerHTML=`<div class="cb">Your car: <b>${esc(label())}</b><button class="lnk" id="chg">Change</button>${ctyBar()}</div>`;$("chg").onclick=()=>save(null)}
 else{el.innerHTML=`<div class="cb"><b>Select your car</b> to see parts that fit it.<div class="cf"><select id="sm" aria-label="Make">${opts(MAKES,"Make")}</select><select id="sy" aria-label="Year" disabled>${opts(YEARS,"Year")}</select><select id="sd" aria-label="Model" disabled>${opts([],"Model")}</select></div><div class="cf" id="mt" hidden><input id="mi" placeholder="Type your model" maxlength="40"><button id="ms" class="btn sm">Save</button></div><p class="mini">Any car works. Pick the model from the list, or choose Other and type it.</p>${ctyBar()}</div>`;
  $("sm").onchange=()=>{$("sy").disabled=!$("sm").value;$("sy").value="";$("sd").disabled=true;$("mt").hidden=true};
  $("sy").onchange=async()=>{const m=$("sm").value,y=$("sy").value;$("mt").hidden=true;if(!y){$("sd").disabled=true;return}
   $("sd").innerHTML=opts([],"Loading…");$("sd").disabled=true;const ms=await models(m,y);
   if(!ms.length){$("sd").innerHTML=opts([],"Model");$("mt").hidden=false;return}
   $("sd").innerHTML=opts(ms.concat(["Other (type it)"]),"Model");$("sd").disabled=false};
  $("sd").onchange=()=>{const v=$("sd").value;if(!v)return;if(v.indexOf("Other")==0){$("mt").hidden=false;return}save({make:$("sm").value,model:v,year:$("sy").value})};
  $("ms").onclick=()=>{const v=$("mi").value.trim();if(v.length>1)save({make:$("sm").value,model:v,year:$("sy").value})};
 }
 const c=$("cty");if(c)c.onchange=()=>{cty=c.value;try{localStorage.setItem("cty",cty)}catch(e){}renderAll()};
}
function save(s){sel=s;try{s?localStorage.setItem("car3",JSON.stringify(s)):localStorage.removeItem("car3")}catch(e){}carBar();renderAll()}
function fit(p){const f=p.fits;if(!f||f==="universal")return"u";if(!sel)return"n";
 const y=+sel.year,m=sel.model.toLowerCase();
 const g=(!f.makes||f.makes.includes(sel.make))&&(!f.models||f.models.some(x=>m.indexOf(x.toLowerCase())>-1))&&(!f.years||(y>=f.years[0]&&y<=f.years[1]));return g?"y":"x"}
function pcard(p){const c=eff(),a=p.asin||{},mk=a[c]?c:"US",id=a[mk],fd=fit(p);
 const img=id&&mk==="US"?`<img src="https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=${enc(id)}&Format=_SL250_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1${ok("US")?"&tag="+enc(TAGS.US):""}" alt="" loading="lazy" onerror="this.style.display='none'">`:"<div></div>";
 const b=fd==="y"?`<span class="badge">Fits your ${esc(label())}</span>`:fd==="u"?'<span class="badge">Universal</span>':'<span class="badge w">Select your car to check fit</span>';
 return `<div class="prod">${img}<div><a href="product-${esc(p.id)}.html"><b>${esc(p.title)}</b></a><br>${b}<ul class="mini">${(p.bullets||[]).slice(0,2).map(x=>"<li>"+esc(x)+"</li>").join("")}</ul><a class="btn sm" href="${id?dp(id,mk):link(p.title)}" target="_blank" rel="sponsored nofollow noopener">Buy on Amazon</a></div></div>`}
function card(t,q,f,asin){const c=label();return `<a class="pc" href="${link(f?c+" "+q:q,asin)}" target="_blank" rel="sponsored nofollow noopener">${esc(t)}<small>${f?"For your "+esc(c):"Works with any car"}</small></a>`}
function renderAll(){
 document.querySelectorAll(".shop").forEach(el=>{
  if(!sel){el.innerHTML='<p class="mini">Select your car above to see products that fit it.</p>';return}
  let it=[];try{it=JSON.parse(el.dataset.items)}catch(e){}
  el.innerHTML='<div class="pg">'+it.map(x=>card(x[0],x[1],x[2])).join("")+'</div>'});
 document.querySelectorAll(".buy[data-asins]").forEach(el=>{try{const o=JSON.parse(el.dataset.asins),mk=o[eff()]?eff():"US";if(o[mk])el.href=dp(o[mk],mk)}catch(e){}});
 const sl=$("shopList");if(!sl)return;
 if(PRODUCTS.length){
  const q=(($("sq")||{}).value||"").toLowerCase(),cat=($("scat")||{}).value||"",sc=$("scat");
  if(sc&&sc.options.length<2)sc.innerHTML=opts([...new Set(PRODUCTS.map(x=>x.cat))],"All categories");
  const list=PRODUCTS.filter(x=>fit(x)!=="x"&&(!cat||x.cat===cat)&&(!q||(x.title+" "+(x.brand||"")+" "+x.cat).toLowerCase().includes(q))),g={};
  list.forEach(x=>(g[x.cat]=g[x.cat]||[]).push(x));
  const top=list.filter(x=>x.top).slice(0,8);
  const h=(top.length?"<h2>Top picks</h2>"+top.map(pcard).join(""):"")+Object.keys(g).map(c=>"<h2>"+esc(c)+"</h2>"+g[c].map(pcard).join("")).join("");
  sl.innerHTML=h||'<p class="mini">No products found.</p>';return}
 if(!sel){sl.innerHTML='<p class="mini">Select your car above to see the products that fit it.</p>';return}
 const mine=MAN.filter(m=>(!m.make||m.make===sel.make)&&(!m.country||m.country===cty));
 let h=mine.length?'<h2>Our picks</h2><div class="pg">'+mine.map(m=>card(m.label,m.label,m.carSpecific?1:0,m.asin)).join("")+'</div>':"";
 h+=STORE.map(g=>'<h2>'+esc(g[0])+'</h2><div class="pg">'+g[1].map(x=>card(x[0],x[1],x[2])).join("")+'</div>').join("");
 sl.innerHTML=h+`<p class="mini">Links open Amazon ${esc(MK[eff()][1])} search results. Always confirm the fit on the product page and in your manual.</p>`;
}
const f=$("flt");if(f)f.oninput=()=>{const q=f.value.toLowerCase();document.querySelectorAll("main .lc, main ul.cols li").forEach(e=>e.hidden=!!q&&!e.textContent.toLowerCase().includes(q))};
window.SITEAPI={car:label,link,esc,cname:()=>MK[cty][1],cur:()=>MK[cty][2]};
const sq=$("sq");if(sq)sq.oninput=renderAll;const sc2=$("scat");if(sc2)sc2.onchange=renderAll;
carBar();renderAll();
})();

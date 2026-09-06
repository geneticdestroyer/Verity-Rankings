const characters = [
  {name:"Verity", score:98.7, aura:96, lore:100, threat:82, drip:94, desc:"The benchmark. The original. The one everyone else has to measure against."},
  {name:"Cruelity", score:95.2, aura:99, lore:91, threat:100, drip:90, desc:"Maximum menace. Somehow manages to make every stat look like a warning label."},
  {name:"Falsity", score:92.6, aura:94, lore:97, threat:88, drip:96, desc:"Unpredictable, suspiciously confident, and statistically impossible to ignore."},
  {name:"Lovity", score:88.9, aura:90, lore:86, threat:72, drip:95, desc:"The vibes are immaculate. The rankings committee is still investigating."},
  {name:"Obscurity", score:84.4, aura:93, lore:89, threat:84, drip:82, desc:"Barely visible. Somehow still made the leaderboard."},
  {name:"Mystery", score:79.8, aura:87, lore:78, threat:80, drip:91, desc:"Nobody knows why Mystery is here. Mystery refuses to elaborate."}
];

const list = document.getElementById("rankingList");
const search = document.getElementById("search");
const sort = document.getElementById("sort");

function sortedData() {
  const q = search.value.toLowerCase().trim();
  let data = characters.filter(c => c.name.toLowerCase().includes(q));
  if (sort.value === "rank") data.sort((a,b)=>b.score-a.score);
  else data.sort((a,b)=>b[sort.value]-a[sort.value]);
  return data;
}

function render() {
  const data = sortedData();
  list.innerHTML = data.map((c,i)=>`
    <div class="rank-row" data-name="${c.name}">
      <div class="rank-number">#${i+1}</div>
      <div class="character">
        <div class="avatar">${c.name[0]}</div>
        <div><strong>${c.name.toUpperCase()}</strong><small>${c.desc.slice(0,52)}${c.desc.length>52?"…":""}</small></div>
      </div>
      <div class="row-score">${c.score.toFixed(1)}</div>
      <div class="meter"><i style="--w:${c.score}%"></i></div>
      <div class="chevron">›</div>
    </div>
  `).join("");
  document.querySelectorAll(".rank-row").forEach(row=>row.onclick=()=>openProfile(characters.find(c=>c.name===row.dataset.name)));
}

function openProfile(c) {
  document.getElementById("modalName").textContent=c.name.toUpperCase();
  document.getElementById("modalScore").textContent=c.score.toFixed(1);
  document.getElementById("modalDesc").textContent=c.desc;
  const stats=[["AURA",c.aura],["LORE",c.lore],["THREAT",c.threat],["DRIP",c.drip]];
  document.getElementById("modalStats").innerHTML=stats.map(([n,v])=>`
    <div class="profile-stat"><span>${n}</span><div class="meter"><i style="--w:${v}%"></i></div><b>${v}</b></div>
  `).join("");
  document.getElementById("modal").classList.add("open");
  document.getElementById("modal").setAttribute("aria-hidden","false");
}
function closeProfile(){document.getElementById("modal").classList.remove("open");document.getElementById("modal").setAttribute("aria-hidden","true");}

search.addEventListener("input",render); sort.addEventListener("change",render);
document.getElementById("closeX").onclick=closeProfile;
document.getElementById("closeModal").onclick=closeProfile;
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeProfile();});

function randomCharacter(){
  openProfile(characters[Math.floor(Math.random()*characters.length)]);
}
document.getElementById("randomBtn").onclick=randomCharacter;

document.getElementById("duelBtn").onclick=()=>{
  const a=characters[Math.floor(Math.random()*characters.length)];
  let b=a; while(b===a) b=characters[Math.floor(Math.random()*characters.length)];
  const winner=a.score>=b.score?a:b;
  document.getElementById("modalName").textContent=`${a.name.toUpperCase()}  VS  ${b.name.toUpperCase()}`;
  document.getElementById("modalScore").textContent=winner.name.toUpperCase();
  document.getElementById("modalDesc").textContent=`The extremely scientific duel engine has selected ${winner.name} as the winner based on overall score.`;
  document.getElementById("modalStats").innerHTML=`<div class="profile-stat"><span>RESULT</span><div class="meter"><i style="--w:${winner.score}%"></i></div><b>WIN</b></div>`;
  document.getElementById("modal").classList.add("open");
};

const top = [...characters].sort((a,b)=>b.score-a.score)[0];
document.getElementById("spotlightName").textContent=top.name.toUpperCase();
document.getElementById("spotlightScore").textContent=top.score.toFixed(1);
document.getElementById("spotlightDesc").textContent=top.desc;
document.getElementById("count").textContent=characters.length;
document.getElementById("topAura").textContent=characters.reduce((a,b)=>a.aura>b.aura?a:b).name;
document.getElementById("topLore").textContent=characters.reduce((a,b)=>a.lore>b.lore?a:b).name;
document.getElementById("avgScore").textContent=(characters.reduce((s,c)=>s+c.score,0)/characters.length).toFixed(1);
render();

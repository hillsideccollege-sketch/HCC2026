

// ╔══════════════════════════════════════════╗
// ║  AUTO YEAR — changes every year by itself ║
// ╚══════════════════════════════════════════╝
const YEAR = new Date().getFullYear();
// Determine enrolment year: if we're past October, show next year's intake
const ENROL_YEAR = new Date().getMonth() >= 10 ? YEAR + 1 : YEAR;

// Update every element that shows the year
document.addEventListener('DOMContentLoaded', () => {
  // Page title
  document.getElementById('pg-title').textContent =
    `Hillside Christian College — Apply ${ENROL_YEAR}`;

  // Nav CTA
  document.getElementById('nav-apply-btn').textContent = `Apply ${ENROL_YEAR}`;

  // Hero badge
  document.getElementById('hero-badge').textContent =
    `✦ Now Enrolling — ${ENROL_YEAR} Academic Year ✦`;

  // Mobile drawer badge & apply button
  document.getElementById('mob-year-badge').textContent =
    `✦ Enrolling Now — ${ENROL_YEAR} Academic Year`;
  document.getElementById('mob-apply-btn').textContent =
    `✦ Apply ${ENROL_YEAR} Now`;

  // Fees section heading
  document.getElementById('fees-title').innerHTML =
    `Transparent <em>${ENROL_YEAR} Fees</em>`;

  // Register heading
  document.getElementById('reg-title').innerHTML =
    `Apply for <em>${ENROL_YEAR}</em> Online`;

  // Terms heading in form
  document.getElementById('terms-hd').textContent =
    `📄 Documents to Submit — ${ENROL_YEAR} Application`;

  // Footer copyright
  document.getElementById('footer-copy').innerHTML =
    `© ${YEAR} Hillside Christian College · Walvis Bay, Namibia · <em>"His Destiny, Our Aim"</em>`;

  // FAQ - update any year references
  document.querySelectorAll('.faq-a').forEach(el=>{
    el.innerHTML = el.innerHTML.replace(/2026/g, ENROL_YEAR);
  });

  // Hero body text year references
  document.querySelectorAll('.hero p').forEach(el=>{
    el.innerHTML = el.innerHTML.replace(/2026/g, ENROL_YEAR);
  });
  
  // Enrichment price refs - no years needed
  // Upload label - init
  document.getElementById('uprLabel').textContent = '0 of 9 documents ready';
});

// ╔══════════════════════════════════════════╗
// ║  CONFIGURATION                           ║
// ╚══════════════════════════════════════════╝
const SCHOOL_EMAIL = 'hillside.c.college@gmail.com';
const PHONE_RAW    = '264818231675';   // no + for wa.me links and tel: href
const PHONE_DISPLAY = '+264 81 823 1675';
const WA_BASE      = 'https://wa.me/' + PHONE_RAW;
const EJS_KEY      = 'Ay-Ttl1k84PIXpD3J';
const EJS_SVC      = 'service_qho7zce';
const EJS_TPL      = 'template_tsoi64l';
emailjs.init(EJS_KEY);

// Set all WhatsApp links on load
function setWALinks() {
  const greeting = encodeURIComponent(
    `Hello Hillside Christian College, I would like to enquire about the ${ENROL_YEAR} application.`
  );
  const waHref = WA_BASE + '?text=' + greeting;
  ['waFloat','hero-wa-btn','mob-wa-btn','contact-wa-btn','footer-wa'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.href = waHref;
  });
}
document.addEventListener('DOMContentLoaded', setWALinks);

// ─── helpers ───
function v(id){const e=document.getElementById(id);return e?e.value.trim():'';}
function r(name){const e=document.querySelector('input[name="'+name+'"]:checked');return e?e.value:'';}
function toast(msg,type,dur){
  dur=dur||3500;const t=document.getElementById('toast');
  t.textContent=msg;t.className='toast '+type+' show';
  setTimeout(()=>t.classList.remove('show'),dur);
}

// ─── mobile menu ───
function toggleMenu(){
  const m=document.getElementById('mobMenu'),b=document.getElementById('hamBtn');
  const open=m.classList.toggle('open');b.classList.toggle('open',open);
  document.body.style.overflow=open?'hidden':'';
}
function closeMenu(){
  document.getElementById('mobMenu').classList.remove('open');
  document.getElementById('hamBtn').classList.remove('open');
  document.body.style.overflow='';
}
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});

// ─── step navigation ───
let curStep=1;
function gS(step){
  document.getElementById('fp'+curStep).classList.remove('act');
  const ot=document.querySelector('.ftab[data-step="'+curStep+'"]');
  ot.classList.remove('act');ot.classList.add('done');
  curStep=step;
  document.getElementById('fp'+curStep).classList.add('act');
  document.querySelectorAll('.ftab').forEach(t=>{
    const s=parseInt(t.dataset.step);
    if(s===step){t.classList.add('act');t.classList.remove('done');}
    else if(s<step){t.classList.add('done');t.classList.remove('act');}
  });
  document.getElementById('pgf').style.width=(step*20)+'%';
  if(step===5){
    const nm=((v('l_fn')+' '+v('l_sn')).trim()||'Learner')+' — '+v('l_grade');
    document.getElementById('sp_name').textContent=nm;
  }
  window.scrollTo({top:document.getElementById('register').offsetTop-80,behavior:'smooth'});
}
function cpAcc(p){
  const M={f:{fn:'f_fn',sn:'f_sn',id:'f_id',em:'f_em',cell:'f_cell',res:'f_res'},m:{fn:'m_fn',sn:'m_sn',id:'m_id',em:'m_em',cell:'m_cell',res:'m_res'}};
  const x=M[p];
  document.getElementById('ac_n').value=(v(x.fn)+' '+v(x.sn)).trim();
  document.getElementById('ac_id').value=v(x.id);
  document.getElementById('ac_em').value=v(x.em);
  document.getElementById('ac_cell').value=v(x.cell);
  document.getElementById('ac_ad').value=v(x.res);
}

// ─── collect data ───
function getData(){return{
  l:{sn:v('l_sn'),fn:v('l_fn'),dob:v('l_dob'),gen:r('gender'),cit:v('l_cit'),rel:v('l_rel'),mt:v('l_mt'),gp:v('l_gp'),grade:v('l_grade'),prev:v('l_prev'),s1:v('s1n')+(v('s1g')?' ('+v('s1g')+')':''),s2:v('s2n')+(v('s2g')?' ('+v('s2g')+')':''),dev:r('device'),ac:r('ac')},
  f:{ti:v('f_ti'),ini:v('f_in'),sn:v('f_sn'),fn:v('f_fn'),cit:v('f_cit'),id:v('f_id'),po:v('f_po'),res:v('f_res'),em:v('f_em'),cell:v('f_cell'),th:v('f_th'),tw:v('f_tw'),rel:v('f_rel'),pro:v('f_pro'),emp:v('f_emp'),pos:v('f_pos')},
  m:{ti:v('m_ti'),ini:v('m_in'),sn:v('m_sn'),fn:v('m_fn'),cit:v('m_cit'),id:v('m_id'),po:v('m_po'),res:v('m_res'),em:v('m_em'),cell:v('m_cell'),th:v('m_th'),tw:v('m_tw'),rel:v('m_rel'),pro:v('m_pro'),emp:v('m_emp'),pos:v('m_pos')},
  x:{ps:r('ps'),lw:v('lw'),dob2:v('dob2'),cb:v('cb'),en:v('en'),eno:v('eno'),an:v('ac_n'),aid:v('ac_id'),aad:v('ac_ad'),aem:v('ac_em'),ace:v('ac_cell')}
};}

// ╔══════════════════════════════════════════╗
// ║  PDF BUILDER — year auto from ENROL_YEAR ║
// ╚══════════════════════════════════════════╝
function buildPDF(){
  const{jsPDF}=window.jspdf;
  const doc=new jsPDF({unit:'mm',format:'a4'});
  const d=getData();
  const GD=[20,83,45],GOLD=[201,162,39],W=[255,255,255],LG=[245,250,247];
  const YR = String(ENROL_YEAR);
  function hdr(){
    doc.setFillColor(...GD);doc.rect(0,0,210,32,'F');
    doc.setFillColor(...GOLD);doc.rect(0,32,210,3,'F');
    doc.setFont('helvetica','bold');doc.setFontSize(18);doc.setTextColor(...W);
    doc.text('HILLSIDE CHRISTIAN COLLEGE',105,13,{align:'center'});
    doc.setFontSize(9);doc.setFont('helvetica','normal');
    doc.text('125 Theo-Ben Gurirab Street, Walvis Bay  |  Tel/WhatsApp: '+PHONE_DISPLAY+'  |  '+SCHOOL_EMAIL,105,20,{align:'center'});
    doc.setFontSize(11);doc.setFont('helvetica','bold');
    doc.text('APPLICATION FORM '+YR,105,28,{align:'center'});
  }
  hdr();let y=42;
  function ck(){if(y>265){doc.addPage();hdr();y=42;}}
  function sh(t){ck();doc.setFillColor(...GD);doc.rect(14,y,182,7,'F');doc.setFont('helvetica','bold');doc.setFontSize(9);doc.setTextColor(...W);doc.text(t.toUpperCase(),18,y+5);y+=10;}
  function dr(l1,v1,l2,v2){ck();doc.setFillColor(...LG);doc.rect(14,y-1,42,6,'F');doc.rect(105,y-1,42,6,'F');doc.setFont('helvetica','bold');doc.setFontSize(8);doc.setTextColor(30,70,40);doc.text(l1,16,y+3.5);doc.text(l2,107,y+3.5);doc.setFont('helvetica','normal');doc.setTextColor(30,30,30);doc.text(String(v1||'—'),58,y+3.5,{maxWidth:44});doc.text(String(v2||'—'),149,y+3.5,{maxWidth:44});doc.setDrawColor(200,230,210);doc.rect(14,y-1,91,6);doc.rect(105,y-1,101,6);y+=7;}
  function wr(lb,val){ck();doc.setFillColor(...LG);doc.rect(14,y-1,42,6,'F');doc.setFont('helvetica','bold');doc.setFontSize(8);doc.setTextColor(30,70,40);doc.text(lb,16,y+3.5);doc.setFont('helvetica','normal');doc.setTextColor(30,30,30);doc.text(String(val||'—'),58,y+3.5,{maxWidth:148});doc.setDrawColor(200,230,210);doc.rect(14,y-1,182,6);y+=7;}
  sh('1. Personal Details of Learner');
  dr('Surname',d.l.sn,'First Name(s)',d.l.fn);dr('Date of Birth',d.l.dob,'Gender',d.l.gen);
  dr('Citizenship',d.l.cit,'Religion',d.l.rel);dr('Mother Tongue',d.l.mt,'General Practitioner',d.l.gp);
  dr('Grade Applied For',d.l.grade,'Device Preference',d.l.dev);wr('Previous School',d.l.prev);
  dr('Sibling 1 (HCC)',d.l.s1,'Sibling 2 (HCC)',d.l.s2);dr('After-Care',d.l.ac,'','');y+=3;
  sh('2. Father / Guardian');
  dr('Title & Initials',d.f.ti+' '+d.f.ini,'Surname',d.f.sn);wr('First Names',d.f.fn);
  dr('Citizenship',d.f.cit,'ID Number',d.f.id);wr('Postal Address',d.f.po);wr('Residential Address',d.f.res);
  dr('Email',d.f.em,'Cell',d.f.cell);dr('Home Tel',d.f.th,'Work Tel',d.f.tw);
  dr('Profession',d.f.pro,'Employer',d.f.emp);dr('Position',d.f.pos,'Religion',d.f.rel);y+=3;
  sh('3. Mother / Guardian');
  dr('Title & Initials',d.m.ti+' '+d.m.ini,'Surname',d.m.sn);wr('First Names',d.m.fn);
  dr('Citizenship',d.m.cit,'ID Number',d.m.id);wr('Postal Address',d.m.po);wr('Residential Address',d.m.res);
  dr('Email',d.m.em,'Cell',d.m.cell);dr('Home Tel',d.m.th,'Work Tel',d.m.tw);
  dr('Profession',d.m.pro,'Employer',d.m.emp);dr('Position',d.m.pos,'Religion',d.m.rel);y+=3;
  sh('4. Additional Information');
  dr('Parental Status',d.x.ps,'Lives With',d.x.lw);dr('Dropped Off By',d.x.dob2,'Collected By',d.x.cb);
  dr('Emergency Contact',d.x.en,'Emergency No.',d.x.eno);y+=3;
  sh('5. Account Holder');
  dr('Name',d.x.an,'ID',d.x.aid);wr('Address',d.x.aad);dr('Email',d.x.aem,'Cell',d.x.ace);y+=5;
  ck();
  doc.setFillColor(...GD);doc.rect(0,y,210,8,'F');
  doc.setFont('helvetica','bold');doc.setFontSize(9);doc.setTextColor(...W);
  doc.text('6. SIGNATURES — ADMISSION POLICY AGREEMENT',105,y+5.5,{align:'center'});y+=14;
  doc.setFont('helvetica','normal');doc.setFontSize(8);doc.setTextColor(50,50,50);
  doc.text('By signing below, parent(s)/guardian(s) confirm they have read and agree to the Hillside Christian College Admission Policy.',14,y,{maxWidth:182});y+=8;
  ['Father/Guardian','Mother/Guardian','Witness 1','Witness 2'].forEach(sig=>{
    doc.setDrawColor(180,180,180);doc.line(14,y+8,90,y+8);doc.line(110,y+8,196,y+8);
    doc.setFont('helvetica','bold');doc.setFontSize(8);doc.setTextColor(40,40,40);
    doc.text(sig+' Signature:',14,y+13);doc.text('Date: ________________',110,y+13);y+=20;
  });
  doc.setFillColor(...GD);doc.rect(0,285,210,12,'F');doc.setFillColor(...GOLD);doc.rect(0,285,210,1.5,'F');
  doc.setFont('helvetica','italic');doc.setFontSize(8);doc.setTextColor(...W);
  doc.text('"His Destiny, Our Aim"  |  '+SCHOOL_EMAIL+'  |  '+PHONE_DISPLAY,105,292,{align:'center'});
  return doc;
}

// ╔══════════════════════════════════════════╗
// ║  BLANK PDF — year auto                  ║
// ╚══════════════════════════════════════════╝
function buildBlankPDF(){
  const{jsPDF}=window.jspdf;
  const doc=new jsPDF({unit:'mm',format:'a4'});
  const GD=[14,61,28],GOLD=[201,162,39],W=[255,255,255],BK=[20,20,20],LG=[245,250,247];
  const YR=String(ENROL_YEAR);
  // Get logo from DOM
  let LSRC=''; try{LSRC=document.querySelector('.hero-logo-wrap img').src;}catch(e){}
  let y=0;

  function hdr(){
    doc.setFillColor(...GD);doc.rect(0,0,210,34,'F');
    doc.setFillColor(...GOLD);doc.rect(0,34,210,2.5,'F');
    if(LSRC){try{doc.addImage(LSRC,'JPEG',162,1.5,38,31);}catch(e){}}
    doc.setFont('helvetica','bold');doc.setFontSize(12);doc.setTextColor(...W);
    doc.text('Hillside Christian College',14,9);
    doc.setFont('helvetica','normal');doc.setFontSize(8.5);
    doc.text('125, Theo-Ben Gurirab Street',14,14.5);
    doc.text('PO Box 5807',14,18.5);
    doc.text('Telephone: +264 64 200 277',14,22.5);
    doc.text('Email: hillside.c.college@gmail.com',14,26.5);
    doc.setFontSize(7);
    doc.text('Page '+doc.internal.getCurrentPageInfo().pageNumber,196,32,{align:'right'});
    y=42;
  }

  function ck(extra){if(y>(extra||265)){doc.addPage();hdr();}}

  function sHead(t){
    ck();
    doc.setFillColor(...GD);doc.rect(14,y,182,7,'F');
    doc.setFont('helvetica','bold');doc.setFontSize(9);doc.setTextColor(...W);
    doc.text(t.toUpperCase(),17,y+5);y+=9;
  }

  function fld(lbl,lw,x2,fw){
    ck();
    doc.setFillColor(...LG);doc.rect(14,y-1,lw,6,'F');
    doc.setFont('helvetica','bold');doc.setFontSize(8);doc.setTextColor(...GD);
    doc.text(lbl,16,y+3.5);
    doc.setDrawColor(150);doc.rect(14,y-1,lw,6);
    doc.setFillColor(255,255,255);doc.rect(x2,y-1,fw,6,'F');
    doc.setDrawColor(190);doc.rect(x2,y-1,fw,6);
    y+=7;
  }

  function dbl(l1,l2){
    ck();
    doc.setFillColor(...LG);doc.rect(14,y-1,40,6,'F');doc.rect(107,y-1,40,6,'F');
    doc.setFont('helvetica','bold');doc.setFontSize(8);doc.setTextColor(...GD);
    doc.text(l1,16,y+3.5);doc.text(l2,109,y+3.5);
    doc.setDrawColor(150);doc.rect(14,y-1,40,6);doc.rect(107,y-1,40,6);
    doc.setFillColor(255,255,255);doc.rect(54,y-1,51,6,'F');doc.rect(147,y-1,49,6,'F');
    doc.setDrawColor(190);doc.rect(54,y-1,51,6);doc.rect(147,y-1,49,6);
    y+=7;
  }

  function chk(lbl,opts){
    ck();
    doc.setFont('helvetica','bold');doc.setFontSize(8.5);doc.setTextColor(...BK);
    doc.text(lbl+':',14,y+3.5);
    let cx=50;
    opts.forEach(o=>{
      doc.setDrawColor(80);doc.rect(cx,y,4.5,4.5);
      doc.setFont('helvetica','normal');doc.setTextColor(...BK);
      doc.text(o,cx+6,y+3.5);
      cx+=doc.getTextWidth(o)+16;
    });
    y+=9;
  }

  function policyText(items){
    items.forEach(item=>{
      ck(260);
      const lines=doc.splitTextToSize(item,182);
      doc.text(lines,14,y);
      y+=lines.length*4+2;
    });
  }

  // ─── PAGE 1: COVER ─────────────────────────────────────────
  hdr();

  doc.setFont('helvetica','bold');doc.setFontSize(22);doc.setTextColor(...GD);
  doc.text('APPLICATION '+YR,14,y);y+=11;

  doc.setFont('helvetica','bold');doc.setFontSize(10);doc.setTextColor(...BK);
  doc.text('Name Of Learner:',14,y);
  doc.setDrawColor(0);doc.setLineWidth(0.4);doc.line(52,y,196,y);y+=9;

  doc.text('Grade applied for:',14,y);
  doc.setFont('helvetica','normal');doc.text('(Mark applicable)',57,y);y+=6;

  const gradeGrid=[
    ['Pre-Primary','Gr. R','Gr. 1','Gr. 2'],
    ['Gr. 3','Gr. 4','Gr. 5','Gr. 6','Gr. 7'],
    ['Gr. 8','Gr. 9','Gr. 10','Gr. 11','Gr. 12']
  ];
  const gColW=38,gRowH=7;
  gradeGrid.forEach(row=>{
    let gx=14;
    row.forEach(g=>{
      doc.setFillColor(250,253,251);doc.rect(gx,y-0.5,gColW,gRowH,'F');
      doc.setFillColor(220,240,228);doc.rect(gx,y-0.5,8,gRowH,'F');
      doc.setDrawColor(150);doc.setLineWidth(0.3);
      doc.rect(gx,y-0.5,gColW,gRowH);doc.rect(gx,y-0.5,8,gRowH);
      doc.setFont('helvetica','bold');doc.setFontSize(8);doc.setTextColor(...BK);
      doc.text(g,gx+10,y+4);
      gx+=gColW;
    });
    y+=gRowH;
  });
  y+=5;

  // Documents checklist table
  doc.setFont('helvetica','bold');doc.setFontSize(10);doc.setTextColor(...BK);
  doc.text('Documents to be attached to application:',14,y+1);

  // "Checked" header right side
  doc.setFillColor(...GD);doc.rect(135,y-5,61,7,'F');
  doc.setFont('helvetica','bold');doc.setFontSize(8);doc.setTextColor(...W);
  doc.text('Checked',165.5,y-0.5,{align:'center'});
  doc.setTextColor(...BK);

  // Parent/Office sub-header
  doc.setFillColor(220,240,228);
  doc.rect(135,y+2,30,6,'F');doc.rect(166,y+2,30,6,'F');
  doc.setFont('helvetica','bold');doc.setFontSize(8);doc.setTextColor(...GD);
  doc.text('Parent',150,y+6,{align:'center'});
  doc.text('Office',181,y+6,{align:'center'});
  doc.setDrawColor(150);doc.rect(135,y+2,30,6);doc.rect(166,y+2,30,6);
  y+=9;

  const docItems=[
    '1. Application Form','2. Admission Policy',
    '3. Indemnity Form  (NB – 2x witnesses to sign)',
    '4. Details of person responsible for account.',
    "5. 1x Certified copy of learner's birth certificate",
    '6. Certified copies of ID documents – both parents.',
    '7. Certified copy of Medical Aid Card',
    '8. 2x Passport photos of learner',
    '9. Vaccination Card (Gr.1 Only)','10. Proof of Payment (EFT)',
    '11. Progress Report from current school.',
    '12. Testimonial from Pastor/Church Leader'
  ];
  docItems.forEach((d,i)=>{
    const bg=i%2===0?[255,255,255]:[248,252,250];
    doc.setFillColor(...bg);doc.rect(14,y,121,6,'F');
    doc.setTextColor(...BK);doc.setFont('helvetica','normal');doc.setFontSize(8);
    doc.text(d,16,y+4,{maxWidth:117});
    doc.setDrawColor(190);doc.rect(14,y,121,6);
    doc.rect(135,y,30,6);doc.rect(166,y,30,6);
    y+=6;
  });
  y+=5;

  doc.setFillColor(245,250,247);doc.rect(14,y,182,18,'F');
  doc.setDrawColor(0);doc.setLineWidth(0.5);doc.rect(14,y,182,18);
  doc.setFont('helvetica','bold');doc.setFontSize(8.5);doc.setTextColor(...BK);
  doc.text('Note:',16,y+5);
  doc.setFont('helvetica','normal');doc.setFontSize(8);
  const noteLines=doc.splitTextToSize('Please ensure that every page is completed correctly. Both parents/guardians and two witnesses have to sign the admission policy. Application will NOT be accepted if all documents are not included and if full payment of previous fees are not received.',178);
  doc.text(noteLines,16,y+10);
  y+=22;

  // ─── PAGE 2: FEE STRUCTURE ─────────────────────────────────
  doc.addPage();hdr();

  doc.setFont('helvetica','bold');doc.setFontSize(12);doc.setTextColor(...GD);
  doc.text('HILLSIDE CHRISTIAN COLLEGE – Fee Structure '+YR,14,y);y+=9;

  const fHdr=['Item','Gr. RR & Gr. R','Gr. 1 & 2','Gr. 3–11 Own Device','Gr. 3–11 School Device'];
  const fCW=[58,31,23,37,36],fCX=[14,72,103,126,163];
  doc.setFillColor(...GD);
  fCX.forEach((x,i)=>doc.rect(x,y,fCW[i],7,'F'));
  doc.setFont('helvetica','bold');doc.setFontSize(7.5);doc.setTextColor(...W);
  fHdr.forEach((h,i)=>doc.text(h,fCX[i]+2,y+5,{maxWidth:fCW[i]-4}));
  y+=7;

  const fRows=[
    ['Application Form*','N$ 200','N$ 200','N$ 200','N$ 200'],
    ['Registration Fee','N$ 1,500','N$ 1,500','N$ 1,500','N$ 1,500'],
    ['Monthly Tuition (12 Months)','N$ 1,700','N$ 2,100','N$ 2,100','N$ 2,650'],
    ['Chess & Robotics (12 Months)','N$ 150','N$ 150','N$ 150','N$ 150'],
    ['Play-Ball','N$ 70','N$ 70','N$ 70','N$ 70'],
    ['TOTAL (At Registration)','N$ 3,620','N$ 4,020','N$ 4,020','N$ 4,570'],
    ['After Care / Homework Classes (Mon–Thurs 14:00–17:00)','N$ 450','N$ 450','N$ 450','N$ 450'],
  ];
  fRows.forEach((row,ri)=>{
    const isTotal=ri===5;
    const bg=isTotal?GOLD:(ri%2===0?W:[245,250,247]);
    fCX.forEach((x,ci)=>{doc.setFillColor(...bg);doc.rect(x,y,fCW[ci],7,'F');});
    doc.setFont('helvetica',isTotal?'bold':'normal');doc.setFontSize(7.5);
    doc.setTextColor(isTotal?GD[0]:BK[0],isTotal?GD[1]:BK[1],isTotal?GD[2]:BK[2]);
    row.forEach((cell,ci)=>doc.text(cell,fCX[ci]+2,y+5,{maxWidth:fCW[ci]-4}));
    doc.setDrawColor(200);fCX.forEach((x,ci)=>doc.rect(x,y,fCW[ci],7));
    y+=7;
  });
  y+=5;
  doc.setFont('helvetica','italic');doc.setFontSize(8);doc.setTextColor(80,80,80);
  doc.text('*Application Form fee not charged if emailed to applicant.',14,y);y+=7;
  doc.setFillColor(255,245,200);doc.rect(14,y,182,12,'F');
  doc.setDrawColor(...GOLD);doc.rect(14,y,182,12);
  doc.setFont('helvetica','bold');doc.setFontSize(8.5);doc.setTextColor(...BK);
  doc.text('NB: IN CASE THE APPROVED PLACE IS NOT TAKEN, YOU WILL FORFEIT THE REGISTRATION FEE.',16,y+7,{maxWidth:178});
  y+=16;

  doc.setFont('helvetica','bold');doc.setFontSize(10);doc.setTextColor(...GD);
  doc.text('PAYMENT OPTIONS:',14,y);y+=5;
  doc.setFont('helvetica','normal');doc.setFontSize(9);doc.setTextColor(...BK);
  doc.text('EFT or Direct Cash Deposit',14,y);y+=5;
  doc.setFont('helvetica','bold');doc.text('Banking Details:',14,y);y+=6;
  const bRows=[['Bank:','Standard Bank'],['Branch:','Walvis Bay'],['Account Number:','241510295'],['Account Type:','Current Account'],['Reference:','Learner\'s name and surname'],['Email PoP to:','hillside.c.college@gmail.com']];
  bRows.forEach(([l,v])=>{
    doc.setFont('helvetica','bold');doc.setFontSize(9);doc.setTextColor(...GD);doc.text(l,14,y);
    doc.setFont('helvetica','normal');doc.setTextColor(...BK);doc.text(v,55,y);y+=6;
  });
  y+=3;
  doc.setFont('helvetica','italic');doc.setFontSize(8);doc.setTextColor(80,80,80);
  doc.text('We also accept cash at the office. Note: N$100.00 penalty applies to cover bank charges.',14,y);

  // ─── PAGE 3: PERSONAL DETAILS ──────────────────────────────
  doc.addPage();hdr();

  sHead('Personal Details of Learner');
  dbl('Surname:','First name:');
  dbl('Date of Birth: (YYYY MM DD)','Citizenship:');
  dbl('Religion:','Mother tongue:');
  dbl('General Practitioner:','Gender:');
  fld('Previous school/Pre-Primary attended:',60,74,122);
  doc.setFont('helvetica','bold');doc.setFontSize(8);doc.setTextColor(...BK);
  doc.text('Brothers and sisters in HCC:',14,y+3.5);y+=7;
  dbl('Name:','Grade:');dbl('Name:','Grade:');
  y+=3;

  sHead('Personal Details of Parents');
  doc.setFillColor(210,235,218);doc.rect(14,y,93,6,'F');doc.rect(108,y,88,6,'F');
  doc.setFont('helvetica','bold');doc.setFontSize(9);doc.setTextColor(...GD);
  doc.text('Father/Guardian:',16,y+4);doc.text('Mother/Guardian:',110,y+4);y+=7;

  function pRow(lbl){
    ck();
    doc.setFillColor(...LG);doc.rect(14,y-1,32,6,'F');doc.rect(108,y-1,32,6,'F');
    doc.setFont('helvetica','bold');doc.setFontSize(8);doc.setTextColor(...GD);
    doc.text(lbl,16,y+3.5);doc.text(lbl,110,y+3.5);
    doc.setDrawColor(150);doc.rect(14,y-1,32,6);doc.rect(108,y-1,32,6);
    doc.setFillColor(255,255,255);doc.rect(46,y-1,54,6,'F');doc.rect(140,y-1,54,6,'F');
    doc.setDrawColor(190);doc.rect(46,y-1,54,6);doc.rect(140,y-1,54,6);y+=7;
  }
  function pRow2(l1,l2){
    ck();
    doc.setFillColor(...LG);
    doc.rect(14,y-1,18,6,'F');doc.rect(47,y-1,22,6,'F');
    doc.rect(108,y-1,18,6,'F');doc.rect(141,y-1,22,6,'F');
    doc.setFont('helvetica','bold');doc.setFontSize(7.5);doc.setTextColor(...GD);
    doc.text(l1,15,y+3.5);doc.text(l2,48,y+3.5);
    doc.text(l1,109,y+3.5);doc.text(l2,142,y+3.5);
    doc.setDrawColor(150);
    doc.rect(14,y-1,18,6);doc.rect(47,y-1,22,6);
    doc.rect(108,y-1,18,6);doc.rect(141,y-1,22,6);
    doc.setFillColor(255,255,255);
    doc.rect(32,y-1,13,6,'F');doc.rect(69,y-1,37,6,'F');
    doc.rect(126,y-1,13,6,'F');doc.rect(163,y-1,33,6,'F');
    doc.setDrawColor(190);
    doc.rect(32,y-1,13,6);doc.rect(69,y-1,37,6);
    doc.rect(126,y-1,13,6);doc.rect(163,y-1,33,6);y+=7;
  }
  pRow2('Title:','Initials:');pRow('Surname:');pRow('First names:');pRow('Citizenship:');
  pRow('Postal address:');pRow('Residential address:');pRow('Email:');pRow('ID No:');
  doc.setFont('helvetica','bold');doc.setFontSize(8);doc.setTextColor(...BK);
  doc.text('Contact Numbers:',14,y+3.5);y+=7;
  pRow('Tel (H):');pRow('Cell Nr:');
  doc.text('Employment:',14,y+3.5);y+=7;
  pRow('Profession:');pRow('Employer:');pRow('Position:');pRow('Tel (W):');
  pRow('Email:');pRow('Religion:');

  // ─── PAGE 4: ADDITIONAL INFO + POLICY ────────────────────
  doc.addPage();hdr();
  sHead('Additional Information');

  doc.setFont('helvetica','bold');doc.setFontSize(9);doc.setTextColor(...BK);
  doc.text('Parents:',14,y+3.5);
  let sx=36;
  ['Married','Divorced','Single Parent'].forEach(s=>{
    doc.setDrawColor(80);doc.rect(sx,y+0.5,4.5,4.5);
    doc.setFont('helvetica','normal');doc.text(s,sx+6,y+3.5);
    sx+=doc.getTextWidth(s)+16;
  });y+=9;
  fld('Learner lives with:',48,62,134);
  fld('Learner is dropped off by:',58,72,124);
  fld('Learner is collected by:',54,68,128);y+=3;
  doc.setFont('helvetica','normal');doc.setFontSize(8.5);doc.setTextColor(...BK);
  doc.text('Next of kin to contact in the case of an emergency – when parents cannot be reached:',14,y);y+=6;
  dbl('Name:','Number:');y+=4;

  sHead('Admission Policy and Contract');
  doc.setFont('helvetica','italic');doc.setFontSize(8.5);doc.setTextColor(...BK);
  doc.text('Hillside Christian College – herein referred to as "the school"',14,y);y+=6;

  doc.setFont('helvetica','normal');doc.setFontSize(7.8);
  policyText([
    '1. By completing the form below, the applicant offers to contract with the school on the terms herein contained.',
    '2. Upon the applicant being informed in writing to the effect that the application had been approved, a contract will come into existence in accordance with the terms herein contained.',
    '3. The contract will remain in force until the end of the school year in respect whereof the application pertains and if not specifically renewed in respect of a following school year, will lapse at the end of the relevant school year. No right shall accrue to an applicant to qualify for the renewal of the contract in absence of a written intention to renew and conveyed coupled with a completed application form at the latest 2 months prior to the expiration of the relevant school year.',
    '4. Three calendar months (1st of a month) written notice must be given in the event of the applicant wishing to withdraw a child from the school. November will not count as a notice month. Interest of 15% per anum calculated and capitalized monthly in arrears will be charged on arrears accounts. In the event of a poor payment history, contract renewal will not be considered.',
    '5. The school fees will increase yearly with effect from the following school year with about 10%',
    '6. In the event of a learner\'s school fund being in arrears, the learner\'s participation in excursions and tours may be jeopardized. School fees in arrears for 2 months or more may lead to the learner not being allowed to return to school until settled in full.',
    '7. The education of the child is conducted by the parents and teachers working together in partnership. The parents/guardians undertake to execute their responsibilities as education partners, through involvement and loyalty.',
    '8. Parents and guardians accept the board of directors as the only official mouthpiece of the school.',
    '9. The board of directors may at any time review rules and admission and re-admission requirements.',
    '10. The school fees, as determined from time to time by the board of directors, are payable monthly in advance on the 1st of each successive month.',
  ]);

  // ─── PAGE 5: POLICY CONTINUED ────────────────────────────
  doc.addPage();hdr();
  doc.setFont('helvetica','normal');doc.setFontSize(7.8);doc.setTextColor(...BK);
  policyText([
    '11. This application is only valid for the current year and no waiting list will be maintained for a following year.',
    '12. Misleading or incorrect information will lead to the immediate cancellation/disqualification of the application.',
    '13. The applicant warrants being the legal guardian of the learner with regard to which the application pertains and acknowledges irrevocably that upon the conclusion of this contract, the school, the board of directors and any person standing in service of the school becomes irrevocably indemnified with regard to any claim following from theft, loss and/or damages of personal property of whatsoever nature whether brought to the school premises or to any school excursions or vehicle used by the school pertaining to such excursion, except insofar as such theft, loss and/or damages may be the result of gross negligence or malicious damage to property by the school, board of directors or person in service of the school.',
    '14. The applicant undertakes irrevocably and agrees that the school will not incur any responsibility for any injury, loss or damages suffered by a learner and the school, the board of directors and the employees are herewith specifically contractually indemnified against such liability except to the extent that it may be the result of gross negligence and/or intent on the part of the school, board of directors or an employee of the school.',
    '15. The applicant agrees irrevocably that any certificate which on face value contain a declaration by the school pertaining to any amount owed by the applicant to the school in respect of any school fees and/or other school related expenses will serve as rebuttable proof of such indebtedness, until the contrary is proved by the applicant.',
    '16. The applicant further consents to the payment of legal costs on an attorney and own client scale in the event it may become necessary for the school to institute legal action against the applicant for the recovery of any outstanding indebtedness and that the school may launch such action out of the Magistrate\'s Court irrespective of whether the amount in question may otherwise exceed the jurisdiction of the Magistrate\'s Court.',
    '17. This document, insofar as it deals with issues herein covered, entail the full terms of the full agreement between the parties and no other terms are amended terms will be of any force or effect unless contained in a document signed by both parties.',
    '18. The curriculum requires the usage of electronic devices such as tablets, laptops or computers, earphones, keyboard and internet facilities. The school\'s choice is a 10" tablet with keyboard, or laptop, for consistency and easier handling.',
    '19. The electronic device purchased by the applicant remains their property. The maintenance and repair of the device will also be the responsibility of the applicant. (Refer to point 13)',
    '20. The school reserves the right to block and remove non-curriculum material from the device.',
    '21. The applicant also has the option to request to use electronic devices provided by the school. Repair or replacement costs will be incurred to the applicant for any device damaged or broken in the care of the learner.',
    '22. It is mandatory to exclude students who show symptoms of communicable diseases from classes until readmission is considered acceptable to the school management.',
    '23. The applicant agrees that he/she and the learner submits to the program, academic and disciplinary regulations, and all other requirements instituted by the school, board of directors or persons in service of the school.',
    '24. By enrolling the learner in Hillside Christian College, the applicant expresses the conviction that it is the responsibility of the parents/guardians to provide Christian education for the learner as expressed in Deuteronomy 6:8 and Proverbs 22:6.',
    '25. The applicant reserves the right to call the school, board of directors or any persons in service of the school should the applicant have any concerns about incidents that may have taken place at the school, involving the learner.',
    '26. It is the responsibility of the applicant to maintain good relationships with the school, board of directors or any persons in service of the school. The applicant agrees to pray for the school, co-operate in discipline, support the spiritual training of the school, follow through with any homework assignments or slips to be signed, see that the learner attends school on time and generally support the school in every way possible.',
    '27. The principal and staff reserve the right to follow disciplinary procedures as will be mentioned in the next document.',
  ]);
  ck(250);y+=4;
  doc.setFont('helvetica','italic');doc.setFontSize(9);
  doc.text('Thus, done and signed at Walvis Bay on this ______ day of ________________________',14,y);y+=10;
  ['Father/Guardian:','Mother/Guardian:'].forEach(role=>{
    ck();
    doc.setFont('helvetica','bold');doc.setFontSize(8);doc.setTextColor(...BK);
    doc.text(role,14,y);doc.text('Name:',42,y);doc.line(56,y,108,y);
    doc.text('Signature:',113,y);doc.line(132,y,196,y);y+=11;
  });

  // ─── PAGE 6: DISCIPLINARY ACTION RELEASE ─────────────────
  doc.addPage();hdr();
  sHead('Disciplinary Action Release');
  doc.setFont('helvetica','normal');doc.setFontSize(8.5);doc.setTextColor(...BK);
  policyText([
    'Hillside Christian College is honoured that you accept our staff to assist you in training your child for Christian leadership.',
    'Our total program is designed to develop the Christian spiritual and academic qualities that characterize your child.',
    'To carry out your wishes for total Christian character development, we believe it is necessary to follow Scriptural admonition to correct a child when his behaviour is in violation of proper or reasonable rules and procedures.',
    'When warranted for very serious moral offense (Example: cheating, stealing, fighting, foul language, disrespect, defiance), the principal will call for parental disciplinary action:',
  ]);
  y+=2;
  [
    '1. The parent/guardian will be asked to attend to the disciplinary action at the school as is fitting for the specific offense.',
    '2. The offense will be clearly discussed with the child.',
    '3. A staff member & parent or guardian will discuss the Spiritual applications and pray with the child.',
    '4. Disciplinary action will be administered by the parent/guardian and the child will be prayed for.',
    '5. A staff witness of the same gender as the child will be present during this process.',
    '6. The child may not be physically restrained.',
    '7. A written report will be made of the date, offense, and response to the disciplinary action.',
    '8. Three (3) repeated moral offense constitute a violation of the student/school agreement and will result in the suspension or expulsion of the student.',
  ].forEach(item=>{ck();const L=doc.splitTextToSize(item,182);doc.text(L,14,y);y+=L.length*4.5+2;});
  y+=3;
  policyText([
    'I/We understand the disciplinary procedure that Hillside Christian College follow, after reading through the above information.',
    'I/We consent to this procedure and will endeavour to help my child to adhere to the school rules and the moral conduct policy of the school.',
  ]);
  y+=4;doc.setFont('helvetica','italic');doc.setFontSize(9);
  doc.text('Thus done and signed at Walvis Bay on this ______ day of ________________________',14,y);y+=10;
  ['Father/Guardian:','Mother/Guardian:'].forEach(role=>{
    doc.setFont('helvetica','bold');doc.setFontSize(8);doc.setTextColor(...BK);
    doc.text(role,14,y);doc.text('Name:',42,y);doc.line(56,y,108,y);
    doc.text('Signature:',113,y);doc.line(132,y,196,y);y+=11;
  });

  // ─── PAGE 7: INDEMNITY FORM ───────────────────────────────
  doc.addPage();hdr();
  sHead('Indemnity Form');
  doc.setFont('helvetica','bold');doc.setFontSize(9);doc.setTextColor(...BK);
  const iTitle=doc.splitTextToSize('UNDERTAKING BY PARENTS/GUARDIAN OF RESPECTIVE LEARNERS FOR PERMISSION AND INDEMNIFICATION FOR THE DURATION OF ENROLMENT AT HILLSIDE CHRISTIAN COLLEGE.',182);
  doc.text(iTitle,14,y);y+=iTitle.length*4.5+4;
  doc.setFont('helvetica','normal');doc.setFontSize(8.5);
  doc.text('We, the undersigned, hereby declare:',14,y);y+=7;
  ['1) ID No:','2) ID No:'].forEach(l=>{doc.text(l,14,y);doc.line(34,y,140,y);y+=7;});
  doc.setFontSize(8);doc.setFont('helvetica','italic');
  doc.text('(Surname and full names of parent(s) and/or guardian(s) in print.)',14,y);y+=7;
  doc.setFont('helvetica','normal');doc.setFontSize(8.5);
  doc.text('Residing at:',14,y);y+=5;
  ['1)','2)'].forEach(l=>{doc.text(l,14,y);doc.line(22,y,196,y);y+=7;});
  doc.setFontSize(8);doc.setFont('helvetica','italic');
  doc.text('(Full residential address of parent(s) and/or guardian(s))',14,y);y+=7;
  doc.setFont('helvetica','normal');doc.setFontSize(8.5);
  doc.text('Parent(s) and/or guardian(s) of:',14,y);y+=5;
  ['1)','2)','3)'].forEach(l=>{doc.text(l,14,y);doc.line(22,y,196,y);y+=7;});
  doc.setFontSize(8);doc.setFont('helvetica','italic');
  doc.text('(Surname and full names of child(ren))',14,y);y+=8;
  doc.setFont('helvetica','normal');doc.setFontSize(8.5);doc.setTextColor(...BK);
  const iText=doc.splitTextToSize('That we herewith agree that the above-mentioned child(ren) may partake in daily organized school activities / in ordered school education programmes / all extra mural activities of the school inclusive of athletics, physical education, sport excursions, educational tours, as well as excursions of an historic and/or geographic and/or cultural interest. My/our child may walk or go by vehicle to aforesaid activity. We/I understand, acknowledge and accept that such activities and/or trips and/or excursions by our/my child(ren) entail certain risks and we/I herewith waive on our own/my behalf and on behalf of our/my child(ren) (insofar as it may be within our/my legal capacity to do so) in favour of the Ministry of Basic Education and Culture, Hillside Christian College, the board of directors of the school and his personnel, as well as external coaches, any claims stemming from injuries or damages and/or losses to property which my directly or indirectly follow or flow from any participation by our/my child(ren) to any activities mentioned in the preceding paragraph. We/I further undertake to indemnify Hillside Christian College, the Ministry of Basic Education and Culture, the board of directors and/or the personnel and coaches may suffer because of the actions of our/my child(ren) and to keep them indemnified.',182);
  doc.text(iText,14,y);y+=iText.length*4.2+4;
  const iAuth=doc.splitTextToSize('We/I herewith grant authority to the principal to, in the event of our/my child(ren) suffering a serious injury, to act depending on circumstances, in a way which he deems fit.',182);
  doc.text(iAuth,14,y);y+=iAuth.length*4.2+6;
  doc.setFont('helvetica','italic');doc.setFontSize(9);
  doc.text('Thus done and signed at ________________ on this ______ day of ________________________',14,y);y+=10;
  ['Father/Guardian:','Mother/Guardian:'].forEach(role=>{
    doc.setFont('helvetica','bold');doc.setFontSize(8);doc.setTextColor(...BK);
    doc.text(role,14,y);doc.text('Name:',42,y);doc.line(56,y,103,y);
    doc.text('Signature:',108,y);doc.line(126,y,196,y);y+=11;
  });
  doc.setFont('helvetica','bold');doc.setFontSize(8);
  doc.text('Witnesses: (to certify that it is indeed the signatures of parent(s)/guardian(s))',14,y);y+=7;
  doc.text('1)',14,y);doc.line(20,y,97,y);doc.text('2)',101,y);doc.line(107,y,196,y);

  // ─── PAGE 8: ACCOUNT HOLDER ───────────────────────────────
  doc.addPage();hdr();
  sHead('Details of Person Responsible for the Account');

  function aFld(lbl,fw){
    ck();
    doc.setFillColor(...LG);doc.rect(14,y-1,42,6,'F');
    doc.setFont('helvetica','bold');doc.setFontSize(8);doc.setTextColor(...GD);
    doc.text(lbl,16,y+3.5);
    doc.setDrawColor(150);doc.rect(14,y-1,42,6);
    doc.setFillColor(255,255,255);doc.rect(56,y-1,fw||140,6,'F');
    doc.setDrawColor(190);doc.rect(56,y-1,fw||140,6);y+=7;
  }
  function aDbl(l1,l2){
    ck();
    doc.setFillColor(...LG);doc.rect(14,y-1,28,6,'F');doc.rect(107,y-1,28,6,'F');
    doc.setFont('helvetica','bold');doc.setFontSize(8);doc.setTextColor(...GD);
    doc.text(l1,16,y+3.5);doc.text(l2,109,y+3.5);
    doc.setDrawColor(150);doc.rect(14,y-1,28,6);doc.rect(107,y-1,28,6);
    doc.setFillColor(255,255,255);doc.rect(42,y-1,63,6,'F');doc.rect(135,y-1,61,6,'F');
    doc.setDrawColor(190);doc.rect(42,y-1,63,6);doc.rect(135,y-1,61,6);y+=7;
  }
  aDbl('Title:','Initials:');aFld('Surname:');aFld('First Names:');aFld('Citizenship:');
  aFld('Postal Address:');aFld('Residential Address:');aFld('Email:');aFld('ID No:');
  doc.setFont('helvetica','bold');doc.setFontSize(8);doc.setTextColor(...BK);
  doc.text('Contact Numbers:',14,y+3.5);y+=7;
  aDbl('Tel (H):','Cell No:');
  doc.text('Employment:',14,y+3.5);y+=7;
  aFld('Profession:');aFld('Employer:');aFld('Position:');aDbl('Tel (W):','Email:');aFld('Religion:');
  y+=3;
  doc.setFont('helvetica','bold');doc.setFontSize(9);doc.setTextColor(...BK);
  doc.text("Learner's Name and Surname:",14,y);y+=7;
  ['Child 1:','Child 2:','Child 3:'].forEach(l=>{doc.text(l,14,y);doc.line(34,y,196,y);y+=7;});
  y+=4;
  doc.setFillColor(255,245,200);doc.rect(14,y,182,10,'F');
  doc.setDrawColor(...GOLD);doc.rect(14,y,182,10);
  doc.setFont('helvetica','bold');doc.setFontSize(8);doc.setTextColor(...BK);
  const nL=doc.splitTextToSize('Note: If account is in arrears, the school has the mandate to hand over the account to a debt collector.',178);
  doc.text(nL,16,y+5);y+=14;
  doc.setFont('helvetica','italic');doc.setFontSize(9);
  doc.text('Thus done and signed at ________________ on this ______ day of ________________________',14,y);y+=9;
  doc.setFont('helvetica','bold');doc.setFontSize(8);doc.setTextColor(...BK);
  doc.text('Person responsible:',14,y);doc.text('Name:',52,y);doc.line(65,y,113,y);
  doc.text('Signature:',118,y);doc.line(137,y,196,y);y+=10;
  doc.setFillColor(245,250,247);doc.rect(14,y,182,10,'F');
  doc.setDrawColor(180);doc.rect(14,y,182,10);
  doc.setFont('helvetica','italic');doc.setFontSize(8);doc.setTextColor(60,80,60);
  const mand=doc.splitTextToSize('All information is mandatory – if not complete the form will be sent back and application will be noted as incomplete.',178);
  doc.text(mand,16,y+5);

  // Final footer bar on last page
  doc.setFillColor(...GD);doc.rect(0,282,210,15,'F');
  doc.setFillColor(...GOLD);doc.rect(0,282,210,1.5,'F');
  doc.setFont('helvetica','italic');doc.setFontSize(8);doc.setTextColor(...W);
  doc.text('"His Destiny, Our Aim"  |  hillside.c.college@gmail.com  |  +264 81 823 1675',105,291,{align:'center'});

  return doc;
}
// ─── downloads ───
function dlPDF(){toast('Generating PDF…','inf');const doc=buildPDF();doc.save('HCC_Application_'+ENROL_YEAR+'_'+(v('l_sn')||'Learner')+'.pdf');toast('PDF downloaded!','suc');}
function dlBlankPDF(){toast('Generating blank form…','inf');const doc=buildBlankPDF();doc.save('HCC_Application_'+ENROL_YEAR+'_BLANK.pdf');toast('Blank PDF downloaded — print and fill by hand!','suc',5000);}

// ─── word builder ───
function buildWordHTML(blank){
  const d=blank?null:getData();
  const G='#0e3d1c',GOLD='#c9a227',YR=String(ENROL_YEAR);
  const v2=blank?(lbl=>`<span style="display:inline-block;min-width:120px;border-bottom:1px solid #999">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>`):(val=>String(val||'—'));

  if(!blank){
    // FILLED FORM - comprehensive one-to-one table
    const row=(l1,v1,l2,v2_)=>`<tr><td class="lb">${l1}</td><td>${String(v1||'—')}</td><td class="lb">${l2}</td><td>${String(v2_||'—')}</td></tr>`;
    const wr=(l,v)=>`<tr><td class="lb">${l}</td><td colspan="3">${String(v||'—')}</td></tr>`;
    const sh=t=>`<tr><td colspan="4" class="sh">${t.toUpperCase()}</td></tr>`;
    const l=d.l,f=d.f,m=d.m,x=d.x;
    return `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word'><head><meta charset='utf-8'><style>
body{font-family:Calibri,Arial,sans-serif;font-size:11pt;margin:2cm}
h1{color:${G};font-size:16pt;text-align:center;border-bottom:3pt solid ${GOLD};padding-bottom:6pt;margin-bottom:4pt}
.sub{text-align:center;font-size:9pt;color:#555;margin-bottom:14pt}
table{width:100%;border-collapse:collapse;margin-bottom:8pt;font-size:10pt}
td{border:0.5pt solid #c6e8d4;padding:4pt 6pt}
.sh{background:${G};color:white;font-weight:bold;font-size:10pt;padding:5pt 8pt}
.lb{background:#f2fbf5;font-weight:bold;color:${G};width:22%}
.sig{height:22pt}.foot{text-align:center;font-size:8pt;color:#888;border-top:2pt solid ${GOLD};padding-top:6pt;margin-top:14pt}
</style></head><body>
<h1>HILLSIDE CHRISTIAN COLLEGE — APPLICATION FORM ${YR}</h1>
<p class='sub'>125, Theo-Ben Gurirab Street, Walvis Bay | Tel/WhatsApp: +264 81 823 1675 | hillside.c.college@gmail.com</p>
<table>
${sh('1. Personal Details of Learner')}
${row('Surname',l.sn,'First Name(s)',l.fn)}
${row('Date of Birth',l.dob,'Gender',l.gen)}
${row('Citizenship',l.cit,'Religion',l.rel)}
${row('Mother Tongue',l.mt,'General Practitioner',l.gp)}
${row('Grade Applied For',l.grade,'Device Preference',l.dev)}
${wr('Previous School / Pre-Primary',l.prev)}
${row('Sibling 1 (HCC)',l.s1,'Sibling 2 (HCC)',l.s2)}
${row('After-Care',l.ac,'','')}
${sh('2. Father / Guardian')}
${row('Title & Initials',(f.ti||'')+' '+(f.ini||''),'Surname',f.sn)}
${wr('First Names',f.fn)}
${row('Citizenship',f.cit,'ID Number',f.id)}
${wr('Postal Address',f.po)}${wr('Residential Address',f.res)}
${row('Email',f.em,'Cell',f.cell)}
${row('Home Tel',f.th,'Work Tel',f.tw)}
${row('Profession',f.pro,'Employer',f.emp)}
${row('Position',f.pos,'Religion',f.rel)}
${sh('3. Mother / Guardian')}
${row('Title & Initials',(m.ti||'')+' '+(m.ini||''),'Surname',m.sn)}
${wr('First Names',m.fn)}
${row('Citizenship',m.cit,'ID Number',m.id)}
${wr('Postal Address',m.po)}${wr('Residential Address',m.res)}
${row('Email',m.em,'Cell',m.cell)}
${row('Home Tel',m.th,'Work Tel',m.tw)}
${row('Profession',m.pro,'Employer',m.emp)}
${row('Position',m.pos,'Religion',m.rel)}
${sh('4. Additional Information')}
${row('Parental Status',x.ps,'Lives With',x.lw)}
${row('Dropped Off By',x.dob2,'Collected By',x.cb)}
${row('Emergency Contact',x.en,'Emergency No.',x.eno)}
${sh('5. Account Holder')}
${row('Name',x.an,'ID Number',x.aid)}
${wr('Address',x.aad)}
${row('Email',x.aem,'Cell',x.ace)}
${sh('6. Signatures — Admission Policy Agreement')}
<tr><td class="lb">Father/Guardian</td><td class="sig"></td><td class="lb">Date</td><td class="sig"></td></tr>
<tr><td class="lb">Mother/Guardian</td><td class="sig"></td><td class="lb">Date</td><td class="sig"></td></tr>
<tr><td class="lb">Witness 1</td><td class="sig"></td><td class="lb">Witness 2</td><td class="sig"></td></tr>
</table>
<p class='foot'>"His Destiny, Our Aim" — Hillside Christian College, Walvis Bay, Namibia | hillside.c.college@gmail.com</p>
</body></html>`;
  }

  // BLANK FORM - one-to-one with official layout
  const blankLine=(n)=>'<td style="border-bottom:1pt solid #aaa;min-width:'+(n||120)+'pt">&nbsp;</td>';
  const BG='#f2fbf5',HDR=G,HDR2='background:#e8f5ee';

  return `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word'><head><meta charset='utf-8'><style>
body{font-family:Calibri,Arial,sans-serif;font-size:10.5pt;margin:2cm}
.hdr-table{width:100%;border-collapse:collapse;margin-bottom:8pt}
.addr{font-size:9pt;color:#222}
h1{color:${G};font-size:20pt;font-weight:bold;margin:10pt 0 4pt}
h2{color:${G};font-size:11pt;font-weight:bold;background:#e8f5ee;padding:4pt 8pt;margin:10pt 0 4pt}
h3{color:${G};font-size:10pt;font-weight:bold;background:${HDR};color:white;padding:3pt 8pt;margin:8pt 0 3pt}
table{width:100%;border-collapse:collapse;margin-bottom:6pt;font-size:9.5pt}
td{border:0.5pt solid #c6e8d4;padding:3pt 5pt}
td.lb{background:${BG};font-weight:bold;color:${G};width:30%;font-size:9pt}
td.cb{width:12pt;border:0.5pt solid #999}
.nl{border:none;border-bottom:1pt solid #999;padding:0 3pt}
.sig-row td{height:20pt;vertical-align:bottom;font-size:8.5pt}
.note{background:#fff8e0;border:1pt solid ${GOLD};padding:6pt 10pt;font-size:9pt;margin:6pt 0}
.grade-grid td{border:0.5pt solid #999;padding:2pt 4pt;text-align:center;min-width:38pt}
.grade-chk{background:#e8f5ee;border:0.5pt solid #999;width:10pt;height:10pt}
.foot{text-align:center;font-size:8pt;color:#888;border-top:2pt solid ${GOLD};padding-top:6pt;margin-top:16pt}
.pg{page-break-after:always}
</style></head><body>

<div class="pg">
<table class="hdr-table"><tr>
<td style="border:none;width:70%"><b class="addr">Hillside Christian College</b><br><span class="addr">125, Theo-Ben Gurirab Street<br>PO Box 5807<br>Telephone: +264 64 200 277<br>Email: hillside.c.college@gmail.com</span></td>
<td style="border:none;text-align:right"><img src="data:image/jpeg;base64,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" width="70" height="86" style="object-fit:contain"></td>
</tr></table>

<h1>APPLICATION ${YR}</h1>

<p><b>Name Of Learner:</b>&nbsp;&nbsp;<span class="nl">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></p>

<p><b>Grade applied for: <i>(Mark applicable)</i></b></p>
<table class="grade-grid"><tr>
<td><span class="grade-chk">&nbsp;&nbsp;</span>&nbsp;Pre-Primary</td>
<td><span class="grade-chk">&nbsp;&nbsp;</span>&nbsp;Gr. R</td>
<td><span class="grade-chk">&nbsp;&nbsp;</span>&nbsp;Gr. 1</td>
<td><span class="grade-chk">&nbsp;&nbsp;</span>&nbsp;Gr. 2</td>
</tr><tr>
<td><span class="grade-chk">&nbsp;&nbsp;</span>&nbsp;Gr. 3</td>
<td><span class="grade-chk">&nbsp;&nbsp;</span>&nbsp;Gr. 4</td>
<td><span class="grade-chk">&nbsp;&nbsp;</span>&nbsp;Gr. 5</td>
<td><span class="grade-chk">&nbsp;&nbsp;</span>&nbsp;Gr. 6</td>
</tr><tr>
<td><span class="grade-chk">&nbsp;&nbsp;</span>&nbsp;Gr. 7</td>
<td><span class="grade-chk">&nbsp;&nbsp;</span>&nbsp;Gr. 8</td>
<td><span class="grade-chk">&nbsp;&nbsp;</span>&nbsp;Gr. 9</td>
<td><span class="grade-chk">&nbsp;&nbsp;</span>&nbsp;Gr. 10</td>
</tr><tr>
<td><span class="grade-chk">&nbsp;&nbsp;</span>&nbsp;Gr. 11</td>
<td><span class="grade-chk">&nbsp;&nbsp;</span>&nbsp;Gr. 12</td>
<td></td><td></td>
</tr></table>

<table>
<tr><td colspan="2" style="background:${G};color:white;font-weight:bold;padding:4pt 8pt">Documents to be attached to application:</td><td style="background:${G};color:white;text-align:center;font-weight:bold">Parent Checked</td><td style="background:${G};color:white;text-align:center;font-weight:bold">Office Checked</td></tr>
<tr><td colspan="2">1. Application Form</td><td class="cb">&nbsp;</td><td class="cb">&nbsp;</td></tr>
<tr><td colspan="2">2. Admission Policy</td><td class="cb">&nbsp;</td><td class="cb">&nbsp;</td></tr>
<tr><td colspan="2">3. Indemnity Form <b>(NB – 2x witnesses to sign)</b></td><td class="cb">&nbsp;</td><td class="cb">&nbsp;</td></tr>
<tr><td colspan="2">4. Details of person responsible for account.</td><td class="cb">&nbsp;</td><td class="cb">&nbsp;</td></tr>
<tr><td colspan="2">5. 1x Certified copy of learner's birth certificate</td><td class="cb">&nbsp;</td><td class="cb">&nbsp;</td></tr>
<tr><td colspan="2">6. Certified copies of ID documents – both parents.</td><td class="cb">&nbsp;</td><td class="cb">&nbsp;</td></tr>
<tr><td colspan="2">7. Certified copy of Medical Aid Card</td><td class="cb">&nbsp;</td><td class="cb">&nbsp;</td></tr>
<tr><td colspan="2">8. 2x Passport photos of learner</td><td class="cb">&nbsp;</td><td class="cb">&nbsp;</td></tr>
<tr><td colspan="2">9. Vaccination Card (Gr.1 Only)</td><td class="cb">&nbsp;</td><td class="cb">&nbsp;</td></tr>
<tr><td colspan="2">10. Proof of Payment (EFT)</td><td class="cb">&nbsp;</td><td class="cb">&nbsp;</td></tr>
<tr><td colspan="2">11. Progress Report from current school.</td><td class="cb">&nbsp;</td><td class="cb">&nbsp;</td></tr>
<tr><td colspan="2">12. Testimonial from Pastor/Church Leader</td><td class="cb">&nbsp;</td><td class="cb">&nbsp;</td></tr>
</table>

<div class="note"><b>Note:</b> Please ensure that every page is completed correctly. Both parents/guardians and two witnesses have to sign the admission policy. Application will NOT be accepted if all documents are not included and if full payment of previous fees are not received.</div>
</div>

<div class="pg">
<h2>HILLSIDE CHRISTIAN COLLEGE – Fee Structure ${YR}</h2>
<table>
<tr style="background:${G};color:white"><td><b>Item</b></td><td><b>Gr. RR & Gr. R</b></td><td><b>Gr. 1 & 2</b></td><td><b>Gr. 3–11 Own Device</b></td><td><b>Gr. 3–11 School Device</b></td></tr>
<tr><td>Application Form*</td><td>N$ 200</td><td>N$ 200</td><td>N$ 200</td><td>N$ 200</td></tr>
<tr><td>Registration Fee</td><td>N$ 1,500</td><td>N$ 1,500</td><td>N$ 1,500</td><td>N$ 1,500</td></tr>
<tr><td>Monthly Tuition (12 Months)</td><td>N$ 1,700</td><td>N$ 2,100</td><td>N$ 2,100</td><td>N$ 2,650</td></tr>
<tr><td>Chess & Robotics (12 Months)</td><td>N$ 150</td><td>N$ 150</td><td>N$ 150</td><td>N$ 150</td></tr>
<tr><td>Play-Ball</td><td>N$ 70</td><td>N$ 70</td><td>N$ 70</td><td>N$ 70</td></tr>
<tr style="background:#c9a227;font-weight:bold"><td>TOTAL (At Registration)</td><td>N$ 3,620</td><td>N$ 4,020</td><td>N$ 4,020</td><td>N$ 4,570</td></tr>
<tr><td>After Care / Homework (Mon–Thurs 14:00–17:00)</td><td>N$ 450</td><td>N$ 450</td><td>N$ 450</td><td>N$ 450</td></tr>
</table>
<p style="font-size:8.5pt;font-style:italic">*Application Form fee not charged if emailed to applicant.</p>
<div class="note" style="background:#fff3cc"><b>NB:</b> IN CASE THE APPROVED PLACE IS NOT TAKEN, YOU WILL FORFEIT THE REGISTRATION FEE.</div>
<h3>PAYMENT OPTIONS</h3>
<p>EFT or Direct Cash Deposit</p>
<table style="width:60%">
<tr><td class="lb">Bank:</td><td>Standard Bank</td></tr>
<tr><td class="lb">Branch:</td><td>Walvis Bay</td></tr>
<tr><td class="lb">Account Number:</td><td>241510295</td></tr>
<tr><td class="lb">Account Type:</td><td>Current Account</td></tr>
<tr><td class="lb">Reference:</td><td>Learner's name and surname</td></tr>
<tr><td class="lb">Email PoP to:</td><td>hillside.c.college@gmail.com</td></tr>
</table>
<p style="font-size:9pt;font-style:italic">We also accept cash at the office. Note: N$100 penalty applies to cover bank charges.</p>
</div>

<div class="pg">
<h3>PERSONAL DETAILS OF LEARNER</h3>
<table>
<tr><td class="lb">Surname:</td><td class="nl">&nbsp;</td><td class="lb">First name:</td><td class="nl">&nbsp;</td></tr>
<tr><td class="lb">Date of Birth: (YYYY MM DD)</td><td class="nl">&nbsp;</td><td class="lb">Citizenship:</td><td class="nl">&nbsp;</td></tr>
<tr><td class="lb">Religion:</td><td class="nl">&nbsp;</td><td class="lb">Mother tongue:</td><td class="nl">&nbsp;</td></tr>
<tr><td class="lb">General Practitioner:</td><td class="nl">&nbsp;</td><td class="lb">Gender:</td><td class="nl">&nbsp;</td></tr>
<tr><td class="lb">Previous school/Pre-Primary:</td><td colspan="3" class="nl">&nbsp;</td></tr>
<tr><td class="lb">Brothers/Sisters in HCC:</td><td class="lb">Name:</td><td class="nl">&nbsp;</td><td class="lb">Grade: <span class="nl">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></td></tr>
<tr><td>&nbsp;</td><td class="lb">Name:</td><td class="nl">&nbsp;</td><td class="lb">Grade: <span class="nl">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></td></tr>
</table>

<h3>PERSONAL DETAILS OF PARENTS</h3>
<table>
<tr style="${HDR2};font-weight:bold"><td colspan="2"><b>Father/Guardian:</b></td><td colspan="2"><b>Mother/Guardian:</b></td></tr>
<tr><td class="lb">Title:</td><td class="nl">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td class="lb">Title:</td><td class="nl">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td></tr>
<tr><td class="lb">Initials:</td><td class="nl">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td class="lb">Initials:</td><td class="nl">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td></tr>
<tr><td class="lb">Surname:</td><td class="nl">&nbsp;</td><td class="lb">Surname:</td><td class="nl">&nbsp;</td></tr>
<tr><td class="lb">First names:</td><td class="nl">&nbsp;</td><td class="lb">First names:</td><td class="nl">&nbsp;</td></tr>
<tr><td class="lb">Citizenship:</td><td class="nl">&nbsp;</td><td class="lb">Citizenship:</td><td class="nl">&nbsp;</td></tr>
<tr><td class="lb">Postal address:</td><td class="nl">&nbsp;</td><td class="lb">Postal address:</td><td class="nl">&nbsp;</td></tr>
<tr><td class="lb">Residential address:</td><td class="nl">&nbsp;</td><td class="lb">Residential address:</td><td class="nl">&nbsp;</td></tr>
<tr><td class="lb">Email:</td><td class="nl">&nbsp;</td><td class="lb">Email:</td><td class="nl">&nbsp;</td></tr>
<tr><td class="lb">ID No:</td><td class="nl">&nbsp;</td><td class="lb">ID No:</td><td class="nl">&nbsp;</td></tr>
<tr><td colspan="4" class="lb" style="background:#fff">Contact Numbers:</td></tr>
<tr><td class="lb">Tel (H):</td><td class="nl">&nbsp;</td><td class="lb">Tel (H):</td><td class="nl">&nbsp;</td></tr>
<tr><td class="lb">Cell Nr:</td><td class="nl">&nbsp;</td><td class="lb">Cell Nr:</td><td class="nl">&nbsp;</td></tr>
<tr><td colspan="4" class="lb" style="background:#fff">Employment:</td></tr>
<tr><td class="lb">Profession:</td><td class="nl">&nbsp;</td><td class="lb">Profession:</td><td class="nl">&nbsp;</td></tr>
<tr><td class="lb">Employer:</td><td class="nl">&nbsp;</td><td class="lb">Employer:</td><td class="nl">&nbsp;</td></tr>
<tr><td class="lb">Position:</td><td class="nl">&nbsp;</td><td class="lb">Position:</td><td class="nl">&nbsp;</td></tr>
<tr><td class="lb">Tel (W):</td><td class="nl">&nbsp;</td><td class="lb">Tel (W):</td><td class="nl">&nbsp;</td></tr>
<tr><td class="lb">Email:</td><td class="nl">&nbsp;</td><td class="lb">Email:</td><td class="nl">&nbsp;</td></tr>
<tr><td class="lb">Religion:</td><td class="nl">&nbsp;</td><td class="lb">Religion:</td><td class="nl">&nbsp;</td></tr>
</table>
</div>

<div class="pg">
<h3>ADDITIONAL INFORMATION</h3>
<p>Parents: &nbsp;&#9744; Married &nbsp;&nbsp;&#9744; Divorced &nbsp;&nbsp;&#9744; Single Parent</p>
<table>
<tr><td class="lb">Learner lives with:</td><td colspan="3" class="nl">&nbsp;</td></tr>
<tr><td class="lb">Learner is dropped off by:</td><td colspan="3" class="nl">&nbsp;</td></tr>
<tr><td class="lb">Learner is collected by:</td><td colspan="3" class="nl">&nbsp;</td></tr>
</table>
<p style="font-size:9pt">Next of kin to contact in the case of an emergency – when parents cannot be reached:</p>
<table style="width:60%"><tr><td class="lb">Name:</td><td class="nl">&nbsp;</td></tr><tr><td class="lb">Number:</td><td class="nl">&nbsp;</td></tr></table>
<h3>ADMISSION POLICY AND CONTRACT</h3>
<p style="font-style:italic;font-size:9.5pt">Hillside Christian College – herein referred to as "the school"</p>
<ol style="font-size:8.5pt;line-height:1.5">
<li>By completing the form below, the applicant offers to contract with the school on the terms herein contained.</li>
<li>Upon the applicant being informed in writing to the effect that the application had been approved, a contract will come into existence in accordance with the terms herein contained.</li>
<li>The contract will remain in force until the end of the school year in respect whereof the application pertains and if not specifically renewed in respect of a following school year, will lapse at the end of the relevant school year. No right shall accrue to an applicant to qualify for the renewal of the contract in absence of a written intention to renew and conveyed coupled with a completed application form at the latest 2 months prior to the expiration of the relevant school year.</li>
<li>Three calendar months (1st of a month) written notice must be given in the event of the applicant wishing to withdraw a child from the school. November will not count as a notice month. Interest of 15% per anum calculated and capitalized monthly in arrears will be charged on arrears accounts.</li>
<li>The school fees will increase yearly with effect from the following school year with about 10%</li>
<li>In the event of a learner's school fund being in arrears, the learner's participation in excursions and tours may be jeopardized. School fees in arrears for 2 months or more may lead to the learner not being allowed to return to school until settled in full.</li>
<li>The education of the child is conducted by the parents and teachers working together in partnership.</li>
<li>Parents and guardians accept the board of directors as the only official mouthpiece of the school.</li>
<li>The board of directors may at any time review rules and admission and re-admission requirements.</li>
<li>The school fees, as determined from time to time by the board of directors, are payable monthly in advance on the 1st of each successive month.</li>
<li>This application is only valid for the current year and no waiting list will be maintained for a following year.</li>
<li>Misleading or incorrect information will lead to the immediate cancellation/disqualification of the application.</li>
<li>The applicant warrants being the legal guardian of the learner and acknowledges irrevocably that the school, board of directors and any person in service of the school is indemnified against claims for theft, loss or damages of personal property, except in cases of gross negligence.</li>
<li>The applicant agrees that the school will not incur responsibility for any injury or loss suffered by a learner, except to the extent of gross negligence.</li>
<li>Any certificate from the school pertaining to amounts owed will serve as rebuttable proof of such indebtedness.</li>
<li>The applicant consents to legal costs on attorney and own client scale if legal action is necessary for recovery of outstanding fees.</li>
<li>This document entails the full terms of the agreement between the parties.</li>
<li>The curriculum requires the usage of electronic devices such as tablets, laptops or computers, earphones, keyboard and internet facilities.</li>
<li>The electronic device purchased by the applicant remains their property. Maintenance and repair will be the applicant's responsibility.</li>
<li>The school reserves the right to block and remove non-curriculum material from the device.</li>
<li>The applicant may request school devices. Repair or replacement costs will be charged to the applicant.</li>
<li>Students showing symptoms of communicable diseases must be excluded from classes until readmission is accepted.</li>
<li>The applicant and learner submit to program, academic and disciplinary regulations of the school.</li>
<li>By enrolling, the applicant expresses the conviction that parents/guardians are responsible for Christian education (Deuteronomy 6:8; Proverbs 22:6).</li>
<li>The applicant reserves the right to contact the school regarding any concerns about incidents involving the learner.</li>
<li>It is the responsibility of the applicant to maintain good relationships with the school, co-operate in discipline, support spiritual training, and ensure punctual attendance.</li>
<li>The principal and staff reserve the right to follow disciplinary procedures.</li>
</ol>
<p style="font-style:italic;font-size:9.5pt">Thus, done and signed at Walvis Bay on this ______ day of ________________________</p>
<table class="sig-row">
<tr><td class="lb">Father/Guardian Name:</td><td class="nl">&nbsp;</td><td class="lb">Signature:</td><td class="nl">&nbsp;</td></tr>
<tr><td class="lb">Mother/Guardian Name:</td><td class="nl">&nbsp;</td><td class="lb">Signature:</td><td class="nl">&nbsp;</td></tr>
</table>
</div>

<div class="pg">
<h3>DISCIPLINARY ACTION RELEASE</h3>
<p style="font-size:9pt">Hillside Christian College is honoured that you accept our staff to assist you in training your child for Christian leadership. When warranted for very serious moral offense (cheating, stealing, fighting, foul language, disrespect, defiance), the principal will call for parental disciplinary action:</p>
<ol style="font-size:8.5pt;line-height:1.6">
<li>The parent/guardian will be asked to attend to the disciplinary action at the school as is fitting for the specific offense.</li>
<li>The offense will be clearly discussed with the child.</li>
<li>A staff member &amp; parent or guardian will discuss the Spiritual applications and pray with the child.</li>
<li>Disciplinary action will be administered by the parent/guardian and the child will be prayed for.</li>
<li>A staff witness of the same gender as the child will be present during this process.</li>
<li>The child may not be physically restrained.</li>
<li>A written report will be made of the date, offense, and response to the disciplinary action.</li>
<li>Three (3) repeated moral offenses constitute a violation of the student/school agreement and will result in suspension or expulsion.</li>
</ol>
<p style="font-size:9pt">I/We understand the disciplinary procedure and will endeavour to help my child adhere to the school rules and moral conduct policy.</p>
<p style="font-style:italic;font-size:9.5pt">Thus done and signed at Walvis Bay on this ______ day of ________________________</p>
<table class="sig-row">
<tr><td class="lb">Father/Guardian Name:</td><td class="nl">&nbsp;</td><td class="lb">Signature:</td><td class="nl">&nbsp;</td></tr>
<tr><td class="lb">Mother/Guardian Name:</td><td class="nl">&nbsp;</td><td class="lb">Signature:</td><td class="nl">&nbsp;</td></tr>
</table>
</div>

<div class="pg">
<h3>INDEMNITY FORM</h3>
<p style="font-weight:bold;font-size:9pt">UNDERTAKING BY PARENTS/GUARDIAN OF RESPECTIVE LEARNERS FOR PERMISSION AND INDEMNIFICATION FOR THE DURATION OF ENROLMENT AT HILLSIDE CHRISTIAN COLLEGE.</p>
<p style="font-size:9pt">We, the undersigned, hereby declare:</p>
<table style="width:80%">
<tr><td class="lb">1) ID No:</td><td class="nl">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td></tr>
<tr><td class="lb">2) ID No:</td><td class="nl">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td></tr>
</table>
<p style="font-size:8pt;font-style:italic">(Surname and full names of parent(s) and/or guardian(s) in print.)</p>
<p style="font-size:9pt">Residing at:</p>
<table style="width:100%">
<tr><td style="width:5%">1)</td><td class="nl">&nbsp;</td></tr>
<tr><td>2)</td><td class="nl">&nbsp;</td></tr>
</table>
<p style="font-size:8pt;font-style:italic">(Full residential address of parent(s) and/or guardian(s))</p>
<p style="font-size:9pt">Parent(s) and/or guardian(s) of:</p>
<table style="width:100%">
<tr><td style="width:5%">1)</td><td class="nl">&nbsp;</td></tr>
<tr><td>2)</td><td class="nl">&nbsp;</td></tr>
<tr><td>3)</td><td class="nl">&nbsp;</td></tr>
</table>
<p style="font-size:8.5pt;line-height:1.55">That we herewith agree that the above-mentioned child(ren) may partake in daily organized school activities / all extra mural activities of the school inclusive of athletics, physical education, sport excursions, educational tours, as well as excursions of historic and/or geographic and/or cultural interest. We/I understand, acknowledge and accept that such activities entail certain risks and we/I herewith waive any claims stemming from injuries or damages that may directly or indirectly follow from any participation by our/my child(ren). We/I further undertake to indemnify Hillside Christian College, the board of directors and/or the personnel and coaches against any claims arising from the actions of our/my child(ren).</p>
<p style="font-size:9pt">We/I herewith grant authority to the principal to, in the event of a serious injury, act in a way which he deems fit.</p>
<p style="font-style:italic;font-size:9.5pt">Thus done and signed at ________________ on this ______ day of ________________________</p>
<table class="sig-row">
<tr><td class="lb">Father/Guardian Name:</td><td class="nl">&nbsp;</td><td class="lb">Signature:</td><td class="nl">&nbsp;</td></tr>
<tr><td class="lb">Mother/Guardian Name:</td><td class="nl">&nbsp;</td><td class="lb">Signature:</td><td class="nl">&nbsp;</td></tr>
</table>
<p><b>Witnesses:</b> (to certify the signatures of parent(s)/guardian(s))</p>
<table class="sig-row"><tr><td>1) <span class="nl">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></td><td>2) <span class="nl">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></td></tr></table>
</div>

<h3>DETAILS OF PERSON RESPONSIBLE FOR THE ACCOUNT</h3>
<table>
<tr><td class="lb">Title:</td><td class="nl">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td class="lb">Initials:</td><td class="nl">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td></tr>
<tr><td class="lb">Surname:</td><td colspan="3" class="nl">&nbsp;</td></tr>
<tr><td class="lb">First Names:</td><td colspan="3" class="nl">&nbsp;</td></tr>
<tr><td class="lb">Citizenship:</td><td colspan="3" class="nl">&nbsp;</td></tr>
<tr><td class="lb">Postal Address:</td><td colspan="3" class="nl">&nbsp;</td></tr>
<tr><td class="lb">Residential Address:</td><td colspan="3" class="nl">&nbsp;</td></tr>
<tr><td class="lb">Email:</td><td colspan="3" class="nl">&nbsp;</td></tr>
<tr><td class="lb">ID No:</td><td colspan="3" class="nl">&nbsp;</td></tr>
<tr><td class="lb">Tel (H):</td><td class="nl">&nbsp;</td><td class="lb">Cell No:</td><td class="nl">&nbsp;</td></tr>
<tr><td class="lb">Profession:</td><td class="nl">&nbsp;</td><td class="lb">Employer:</td><td class="nl">&nbsp;</td></tr>
<tr><td class="lb">Position:</td><td class="nl">&nbsp;</td><td class="lb">Tel (W):</td><td class="nl">&nbsp;</td></tr>
<tr><td class="lb">Email (Work):</td><td colspan="3" class="nl">&nbsp;</td></tr>
<tr><td class="lb">Religion:</td><td colspan="3" class="nl">&nbsp;</td></tr>
</table>
<p><b>Learner's Name and Surname:</b></p>
<table style="width:80%">
<tr><td class="lb">Child 1:</td><td class="nl">&nbsp;</td></tr>
<tr><td class="lb">Child 2:</td><td class="nl">&nbsp;</td></tr>
<tr><td class="lb">Child 3:</td><td class="nl">&nbsp;</td></tr>
</table>
<div class="note"><b>Note:</b> If account is in arrears, the school has the mandate to hand over the account to a debt collector.</div>
<p style="font-style:italic;font-size:9.5pt">Thus done and signed at ________________ on this ______ day of ________________________</p>
<table class="sig-row"><tr><td class="lb">Person responsible Name:</td><td class="nl">&nbsp;</td><td class="lb">Signature:</td><td class="nl">&nbsp;</td></tr></table>
<div class="note"><i>All information is mandatory – if not complete the form will be sent back and application will be noted as incomplete.</i></div>
<p class="foot">"His Destiny, Our Aim" — Hillside Christian College, Walvis Bay, Namibia | hillside.c.college@gmail.com</p>

</body></html>`;
}
function triggerWordDL(html,fname){
  const blob=new Blob(['\ufeff',html],{type:'application/msword'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');a.href=url;a.download=fname;
  document.body.appendChild(a);a.click();document.body.removeChild(a);URL.revokeObjectURL(url);
}
function dlWord(){triggerWordDL(buildWordHTML(false),'HCC_Application_'+ENROL_YEAR+'_'+(v('l_sn')||'Learner')+'.doc');toast('Word document downloaded!','suc');}
function dlBlankWord(){triggerWordDL(buildWordHTML(true),'HCC_Application_'+ENROL_YEAR+'_BLANK.doc');toast('Blank Word form downloaded!','suc');}

// ─── excel ───
function dlExcel(){
  const d=getData();
  const rows=[['HILLSIDE CHRISTIAN COLLEGE — APPLICATION FORM '+ENROL_YEAR],['125 Theo-Ben Gurirab Street, Walvis Bay | '+PHONE_DISPLAY+' | '+SCHOOL_EMAIL],[],
    ['LEARNER'],['Surname',d.l.sn,'First Names',d.l.fn],['Date of Birth',d.l.dob,'Gender',d.l.gen],['Citizenship',d.l.cit,'Religion',d.l.rel],['Mother Tongue',d.l.mt,'GP',d.l.gp],['Grade',d.l.grade,'Device',d.l.dev],['Previous School',d.l.prev,'After-Care',d.l.ac],['Sibling 1',d.l.s1,'Sibling 2',d.l.s2],[],
    ['FATHER'],['Name',d.f.ti+' '+d.f.fn+' '+d.f.sn,'ID',d.f.id],['Email',d.f.em,'Cell',d.f.cell],['Residential',d.f.res,'Religion',d.f.rel],['Profession',d.f.pro,'Employer',d.f.emp],[],
    ['MOTHER'],['Name',d.m.ti+' '+d.m.fn+' '+d.m.sn,'ID',d.m.id],['Email',d.m.em,'Cell',d.m.cell],['Residential',d.m.res,'Religion',d.m.rel],['Profession',d.m.pro,'Employer',d.m.emp],[],
    ['ADDITIONAL'],['Parental Status',d.x.ps,'Lives With',d.x.lw],['Dropped Off By',d.x.dob2,'Collected By',d.x.cb],['Emergency',d.x.en,'Emg No.',d.x.eno],[],
    ['ACCOUNT HOLDER'],['Name',d.x.an,'ID',d.x.aid],['Email',d.x.aem,'Cell',d.x.ace],['Address',d.x.aad,'',''],[],
    ['SIGNATURES'],['Father/Guardian:','','Date:',''],['Mother/Guardian:','','Date:',''],['Witness 1:','','Witness 2:','']];
  const wb=XLSX.utils.book_new();
  const ws=XLSX.utils.aoa_to_sheet(rows);
  ws['!cols']=[{wch:26},{wch:32},{wch:20},{wch:32}];
  XLSX.utils.book_append_sheet(wb,ws,'HCC Application '+ENROL_YEAR);
  XLSX.writeFile(wb,'HCC_Application_'+ENROL_YEAR+'_'+(v('l_sn')||'Learner')+'.xlsx');
  toast('Excel file downloaded!','suc');
}

// ─── email all 3 files ───
async function sendEmail(){
  const d=getData();const lname=((v('l_fn')+' '+v('l_sn')).trim()||'Learner');
  const sp=document.getElementById('emSpin');sp.style.display='block';
  toast('Preparing PDF, Word & Excel — sending email…','inf',12000);
  try{
    const pdfB64=buildPDF().output('datauristring').split(',')[1];
    const wordB64=btoa(unescape(encodeURIComponent('\ufeff'+buildWordHTML(false))));
    const wb=XLSX.utils.book_new();
    const ws=XLSX.utils.aoa_to_sheet([['LEARNER'],[v('l_fn')+' '+v('l_sn')],['Grade',v('l_grade')]]);
    XLSX.utils.book_append_sheet(wb,ws,'App');
    const xlB64=XLSX.write(wb,{type:'base64',bookType:'xlsx'});
    const summary=`=== HILLSIDE CHRISTIAN COLLEGE APPLICATION ${ENROL_YEAR} ===

LEARNER:
Surname: ${d.l.sn} | First Names: ${d.l.fn}
DOB: ${d.l.dob} | Gender: ${d.l.gen} | Citizenship: ${d.l.cit}
Religion: ${d.l.rel} | Mother Tongue: ${d.l.mt} | GP: ${d.l.gp}
Grade Applied: ${d.l.grade} | Previous School: ${d.l.prev}
Device: ${d.l.dev} | After-Care: ${d.l.ac}
Siblings at HCC: ${d.l.s1} ${d.l.s2}

FATHER/GUARDIAN:
Name: ${d.f.ti} ${d.f.fn} ${d.f.sn} (${d.f.ini})
ID: ${d.f.id} | Citizenship: ${d.f.cit}
Postal: ${d.f.po}
Residential: ${d.f.res}
Email: ${d.f.em} | Cell: ${d.f.cell}
Home Tel: ${d.f.th} | Work Tel: ${d.f.tw}
Profession: ${d.f.pro} | Employer: ${d.f.emp} | Position: ${d.f.pos}
Religion: ${d.f.rel}

MOTHER/GUARDIAN:
Name: ${d.m.ti} ${d.m.fn} ${d.m.sn} (${d.m.ini})
ID: ${d.m.id} | Citizenship: ${d.m.cit}
Postal: ${d.m.po}
Residential: ${d.m.res}
Email: ${d.m.em} | Cell: ${d.m.cell}
Home Tel: ${d.m.th} | Work Tel: ${d.m.tw}
Profession: ${d.m.pro} | Employer: ${d.m.emp} | Position: ${d.m.pos}
Religion: ${d.m.rel}

ADDITIONAL:
Parental Status: ${d.x.ps} | Lives With: ${d.x.lw}
Dropped Off By: ${d.x.dob2} | Collected By: ${d.x.cb}
Emergency Contact: ${d.x.en} — ${d.x.eno}

ACCOUNT HOLDER:
Name: ${d.x.an} | ID: ${d.x.aid}
Address: ${d.x.aad}
Email: ${d.x.aem} | Cell: ${d.x.ace}`;
    await emailjs.send(EJS_SVC,EJS_TPL,{
      to_email:SCHOOL_EMAIL,learner_name:lname,grade:d.l.grade,
      father_name:d.f.ti+' '+d.f.fn+' '+d.f.sn,father_cell:d.f.cell,father_email:d.f.em,
      mother_name:d.m.ti+' '+d.m.fn+' '+d.m.sn,mother_cell:d.m.cell,mother_email:d.m.em,
      summary,pdf_attachment:pdfB64,word_attachment:wordB64,excel_attachment:xlB64,
      filename_pdf:'HCC_App_'+ENROL_YEAR+'_'+(v('l_sn')||'Learner')+'.pdf',
      filename_word:'HCC_App_'+ENROL_YEAR+'_'+(v('l_sn')||'Learner')+'.doc',
      filename_excel:'HCC_App_'+ENROL_YEAR+'_'+(v('l_sn')||'Learner')+'.xlsx'
    });
    toast('✅ Emailed with PDF, Word & Excel attached!','suc',6000);
  }catch(err){console.error(err);toast('Email error — please download and send manually.','err',6000);}
  finally{sp.style.display='none';}
}

// ─── whatsapp send ───
function sendWA(){
  const d=getData();const lname=((v('l_fn')+' '+v('l_sn')).trim()||'Learner');
  const msg=`*HCC APPLICATION ${ENROL_YEAR}*\n*Learner:* ${lname}\n*Grade:* ${d.l.grade}\n*DOB:* ${d.l.dob}\n\n*Father:* ${d.f.ti} ${d.f.fn} ${d.f.sn}\n*Cell:* ${d.f.cell}\n*Email:* ${d.f.em}\n\n*Mother:* ${d.m.ti} ${d.m.fn} ${d.m.sn}\n*Cell:* ${d.m.cell}\n*Email:* ${d.m.em}\n\n*Device:* ${d.l.dev}  |  *After-care:* ${d.l.ac}\n*Emergency:* ${d.x.en} — ${d.x.eno}\n\n_PDF, Word & Excel emailed to ${SCHOOL_EMAIL}_`;
  window.open(WA_BASE+'?text='+encodeURIComponent(msg),'_blank');
  toast('Opening WhatsApp…','suc');
}

// ─── print ───
function printApp(){
  const d=getData();const pw=window.open('','_blank');
  pw.document.write(`<html><head><title>HCC Application ${ENROL_YEAR}</title><style>body{font-family:Arial,sans-serif;font-size:10pt;margin:15mm}h1{color:#14532d;font-size:14pt;text-align:center;border-bottom:3px solid #c9a227;padding-bottom:6px}h2{font-size:10pt;background:#14532d;color:#fff;padding:4px 8px;margin-top:12px}table{width:100%;border-collapse:collapse;margin-bottom:5px}td{border:1px solid #d1fae5;padding:4px 6px;font-size:9pt}td:nth-child(odd){background:#f5fdf7;font-weight:bold;color:#14532d;width:26%}footer{margin-top:16px;text-align:center;font-size:8pt;color:#888;border-top:2px solid #c9a227;padding-top:4px}</style></head><body>
  <h1>HILLSIDE CHRISTIAN COLLEGE — APPLICATION FORM ${ENROL_YEAR}</h1>
  <p style="text-align:center;font-size:9pt;color:#555">125 Theo-Ben Gurirab St, Walvis Bay | ${PHONE_DISPLAY} | ${SCHOOL_EMAIL}</p>
  <h2>1. LEARNER</h2><table><tr><td>Surname</td><td>${d.l.sn}</td><td>First Names</td><td>${d.l.fn}</td></tr><tr><td>DOB</td><td>${d.l.dob}</td><td>Gender</td><td>${d.l.gen}</td></tr><tr><td>Grade</td><td>${d.l.grade}</td><td>Device</td><td>${d.l.dev}</td></tr><tr><td>Previous School</td><td colspan="3">${d.l.prev}</td></tr></table>
  <h2>2. FATHER</h2><table><tr><td>Name</td><td colspan="3">${d.f.ti} ${d.f.fn} ${d.f.sn}</td></tr><tr><td>ID</td><td>${d.f.id}</td><td>Email</td><td>${d.f.em}</td></tr><tr><td>Cell</td><td>${d.f.cell}</td><td>Residential</td><td>${d.f.res}</td></tr></table>
  <h2>3. MOTHER</h2><table><tr><td>Name</td><td colspan="3">${d.m.ti} ${d.m.fn} ${d.m.sn}</td></tr><tr><td>ID</td><td>${d.m.id}</td><td>Email</td><td>${d.m.em}</td></tr><tr><td>Cell</td><td>${d.m.cell}</td><td>Residential</td><td>${d.m.res}</td></tr></table>
  <h2>4. ADDITIONAL</h2><table><tr><td>Status</td><td>${d.x.ps}</td><td>Lives With</td><td>${d.x.lw}</td></tr><tr><td>Emergency</td><td>${d.x.en}</td><td>Emg No.</td><td>${d.x.eno}</td></tr></table>
  <h2>5. SIGNATURES</h2><table><tr><td>Father/Guardian</td><td style="height:22px"></td><td>Date</td><td></td></tr><tr><td>Mother/Guardian</td><td style="height:22px"></td><td>Date</td><td></td></tr><tr><td>Witness 1</td><td style="height:22px"></td><td>Witness 2</td><td></td></tr></table>
  <footer>"His Destiny, Our Aim" — Hillside Christian College, Walvis Bay</footer></body></html>`);
  pw.document.close();pw.print();toast('Print window opened!','suc');
}

// ═══ DOCUMENT UPLOAD ═══
const DOC_LIST=[
  {n:'Application Form (signed — all pages, both parents + 2 witnesses)',sp:false},
  {n:"Certified Copy — Learner's Birth Certificate",sp:false},
  {n:'Certified ID Copies — Both Parents',sp:false},
  {n:'Certified Copy — Medical Aid Card',sp:false},
  {n:'2× Passport Photos of Learner',sp:false},
  {n:'Vaccination Card (Grade 1 ONLY)',sp:true},
  {n:'Proof of Payment (EFT / Cash Deposit)',sp:false},
  {n:'Progress Report from Current School',sp:false},
  {n:'Testimonial from Pastor / Church Leader',sp:false}
];
const uploadedFiles={};
function buildDocCards(){
  document.getElementById('docsGrid').innerHTML=DOC_LIST.map((doc,i)=>`
    <div class="dcard${doc.sp?' special':''}" id="dc_${i}">
      <div class="dnum">${i+1}</div>
      <div class="dinfo">
        <div class="dname">${doc.n}</div>
        <div class="dstatus" id="ds_${i}">Not uploaded</div>
      </div>
      <label class="upbtn" for="fi_${i}">Choose File</label>
      <input type="file" id="fi_${i}" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.heic" onchange="handleUpload(this,${i})">
    </div>`).join('');
}
function handleUpload(input,idx){
  const file=input.files[0];if(!file)return;
  uploadedFiles[idx]={name:file.name,size:file.size,file};
  document.getElementById('dc_'+idx).classList.add('uploaded');
  document.getElementById('ds_'+idx).textContent='✓ '+file.name+' ('+Math.round(file.size/1024)+'KB)';
  updateProg();
}
function updateProg(){
  const c=Object.keys(uploadedFiles).length,p=Math.round(c/9*100);
  document.getElementById('uprBar').style.width=p+'%';
  document.getElementById('uprLabel').textContent=c+' of 9 documents ready';
}
function sendDocsEmail(){
  const learner=v('up_learner')||'[Learner Name]',parent=v('up_parent')||'',phone=v('up_phone')||'';
  const c=Object.keys(uploadedFiles).length;
  const dlist=DOC_LIST.map((d,i)=>uploadedFiles[i]?'✓ '+d.n:'☐ '+d.n).join('%0A');
  window.location.href=`mailto:${SCHOOL_EMAIL}?subject=${encodeURIComponent('HCC Application Documents '+ENROL_YEAR+' — '+learner)}&body=${encodeURIComponent('Dear Hillside Christian College,\n\nPlease find the application documents for:\nLearner: '+learner+'\nParent/Guardian: '+parent+'\nContact: '+phone+'\n\nDocuments ('+c+'/12 ready):\n'+DOC_LIST.map((d,i)=>uploadedFiles[i]?'✓ '+d.n:'☐ '+d.n).join('\n')+'\n\nI will attach the document files to this email.\n\nKind regards,\n'+parent)}`;
  toast('Email app opening — please attach your document files!','suc',6000);
}
function sendDocsWA(){
  const learner=v('up_learner')||'Learner',parent=v('up_parent')||'Parent',phone=v('up_phone')||'';
  const c=Object.keys(uploadedFiles).length;
  const lines=DOC_LIST.map((d,i)=>(uploadedFiles[i]?'✅':'❌')+' '+(i+1)+'. '+d.n).join('\n');
  const msg=`*HCC APPLICATION DOCUMENTS ${ENROL_YEAR}*\n*Learner:* ${learner}\n*Parent:* ${parent}\n*Contact:* ${phone}\n\n*Documents (${c}/9):*\n${lines}\n\n_I will also email the document files to ${SCHOOL_EMAIL}_`;
  window.open(WA_BASE+'?text='+encodeURIComponent(msg),'_blank');
  toast('Opening WhatsApp with document checklist…','suc');
}
async function sendDocsNotify(){
  const learner=v('up_learner')||'Unknown',parent=v('up_parent')||'Unknown',phone=v('up_phone')||'Unknown';
  const c=Object.keys(uploadedFiles).length;
  const sp=document.getElementById('notSpin');sp.style.display='block';
  toast('Sending notification…','inf',5000);
  try{
    const docLines=DOC_LIST.map((d,i)=>(uploadedFiles[i]?'READY: ':'PENDING: ')+d.n).join('\n');
    await emailjs.send(EJS_SVC,EJS_TPL,{
      to_email:SCHOOL_EMAIL,learner_name:learner,grade:'(Document Submission '+ENROL_YEAR+')',
      father_name:parent,father_cell:phone,father_email:'',mother_name:'',mother_cell:'',mother_email:'',
      summary:`DOCUMENT SUBMISSION NOTIFICATION — ${ENROL_YEAR}\n\nLearner: ${learner}\nParent: ${parent}\nPhone: ${phone}\n\nDocuments (${c}/9 ready):\n${docLines}\n\nParent will email document files separately.`,
      pdf_attachment:'',word_attachment:'',excel_attachment:'',
      filename_pdf:'',filename_word:'',filename_excel:''

    });
    toast('✅ Document notification sent to school!','suc',6000);
  }catch(err){console.error(err);toast('Email error — please use WhatsApp or email manually.','err',6000);}
  finally{sp.style.display='none';}
}

// ═══ SCROLL REVEAL ═══
const ro=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')});},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>ro.observe(el));

// ═══ NAV SCROLL ═══
window.addEventListener('scroll',()=>{
  const n=document.getElementById('mainNav');
  n.style.padding=window.scrollY>50?'.4rem 5vw':'.7rem 5vw';
});

// ═══ FAQ ACCORDION ═══
document.querySelectorAll('.faq-q').forEach(q=>{
  q.addEventListener('click',()=>{
    const item=q.parentElement;
    const isOpen=item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i=>i.classList.remove('open'));
    if(!isOpen)item.classList.add('open');
  });
});

buildDocCards();

// ═══════════════════════════════════════
// NAMIBIAN HOLIDAY DETECTION & THEME
// ═══════════════════════════════════════
(function(){
  const HOLIDAYS={
    '01-01':{name:"New Year's Day",emoji:'🎊🎉',msg:'Wishing our entire HCC community a blessed and prosperous New Year!',cls:'hb-newyear'},
    '03-21':{name:'Namibia Independence Day',emoji:'🇳🇦⭐',msg:'Happy Independence Day! Hillside Christian College celebrates 36 years of a free Namibia. Soli Deo Gloria!',cls:'hb-independence'},
    '05-01':{name:"Workers' Day",emoji:'👷✊',msg:"Happy Workers' Day! We honour every dedicated teacher, parent and staff member in our school community.",cls:'hb-workers'},
    '05-04':{name:'Cassinga Day',emoji:'🕊️🌹',msg:'Cassinga Day — we honour and remember the sacrifices made for Namibian freedom and dignity.',cls:'hb-cassinga'},
    '05-25':{name:'Africa Day',emoji:'🌍✨',msg:"Happy Africa Day! Celebrating the unity, beauty and strength of our great continent. Africa — God's masterpiece.",cls:'hb-africa'},
    '08-26':{name:"Heroes' Day",emoji:'⭐🏆',msg:"Happy Heroes' Day! We honour the brave men and women who gave everything so that Namibia could be free.",cls:'hb-heroes'},
    '09-10':{name:"Women's Day",emoji:'🌺💐',msg:"Happy Women's Day! We celebrate every mother, teacher and woman in our school community. You are seen and valued.",cls:'hb-womens'},
    '12-10':{name:'Human Rights Day',emoji:'✊❤️',msg:'Human Rights Day — every learner is created in the image of God and deserves dignity, love and quality education.',cls:'hb-humanrights'},
    '12-25':{name:'Christmas Day',emoji:'🎄✝️',msg:'Merry Christmas from Hillside Christian College! May the birth of our Lord Jesus Christ fill your home with joy and peace.',cls:'hb-christmas'},
    '12-26':{name:'Family Day',emoji:'👨‍👩‍👧‍👦💚',msg:"Happy Family Day! Families are the heartbeat of our school. Enjoy this special day with your loved ones.",cls:'hb-family'},
  };

  function getEaster(y){
    const a=y%19,b=Math.floor(y/100),c=y%100,d=Math.floor(b/4),e=b%4,f=Math.floor((b+8)/25);
    const g=Math.floor((b-f+1)/3),h=(19*a+b-d-g+15)%30,i=Math.floor(c/4),k=c%4,l=(32+2*e+2*i-h-k)%7;
    const m=Math.floor((a+11*h+22*l)/451),mo=Math.floor((h+l-7*m+114)/31),da=((h+l-7*m+114)%31)+1;
    return new Date(y,mo-1,da);
  }

  function getHoliday(){
    const now=new Date(),y=now.getFullYear();
    const mm=String(now.getMonth()+1).padStart(2,'0'),dd=String(now.getDate()).padStart(2,'0');
    const key=mm+'-'+dd;
    if(HOLIDAYS[key])return HOLIDAYS[key];
    const easter=getEaster(y);
    const gf=new Date(easter);gf.setDate(easter.getDate()-2);
    const em=new Date(easter);em.setDate(easter.getDate()+1);
    const asc=new Date(easter);asc.setDate(easter.getDate()+39);
    function fmt(d){return String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');}
    if(key===fmt(gf))return{name:'Good Friday',emoji:'✝️🙏',msg:'Good Friday — may this holy day remind us of the infinite love of our Lord Jesus Christ who gave His life for us.',cls:'hb-easter'};
    if(key===fmt(easter))return{name:'Easter Sunday',emoji:'✝️🌅',msg:'He is Risen! Hillside Christian College wishes you a blessed and joyful Easter celebration!',cls:'hb-easter'};
    if(key===fmt(em))return{name:'Easter Monday',emoji:'✝️🌷',msg:"Easter Monday — the resurrection of our Lord fills us with living hope. Have a blessed day!",cls:'hb-easter'};
    if(key===fmt(asc))return{name:'Ascension Day',emoji:'✝️☁️',msg:"Ascension Day — celebrating the ascension of our Lord Jesus Christ. He reigns!",cls:'hb-easter'};
    return null;
  }

  document.addEventListener('DOMContentLoaded',()=>{
    const hday=getHoliday();
    if(!hday)return;
    const banner=document.getElementById('holidayBanner');
    if(!banner)return;
    // Remove default class, add holiday class
    banner.className=banner.className.replace('hb-default','')+' '+hday.cls;
    document.getElementById('hbEmoji').textContent=hday.emoji;
    document.getElementById('hbName').textContent=hday.name+' — ';
    document.getElementById('hbMsg').textContent=hday.msg;
    banner.style.display='flex';
    // Subtle hero theme pulse
    const hero=document.querySelector('.hero');
    if(hero&&hday.cls==='hb-independence'){
      hero.style.background='linear-gradient(160deg,#003580 0%,#009A44 50%,#D4203B 100%)';
    } else if(hday.cls==='hb-christmas'){
      hero.style.background='linear-gradient(160deg,#0d3015 0%,#0d3015 40%,#5a0a0a 100%)';
    } else if(hday.cls==='hb-easter'){
      hero.style.background='linear-gradient(160deg,#2a0a4a 0%,#1a3a20 50%,#4a2a00 100%)';
    } else if(hday.cls==='hb-newyear'){
      hero.style.background='linear-gradient(160deg,#0a0a2a 0%,#1a0a4a 50%,#2a1a00 100%)';
    }
  });
})();


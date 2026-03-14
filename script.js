

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
<td style="border:none;text-align:right"><img src="data:image/png;base64,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" width="70" height="86" style="object-fit:contain"></td>
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


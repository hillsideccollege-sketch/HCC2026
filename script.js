

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
  const GD=[14,61,28],GOLD=[201,162,39],W=[255,255,255],BK=[20,20,20],LG=[245,250,247];
  const YR=String(ENROL_YEAR);
  let LSRC='';
  try{LSRC=document.querySelector('.hero-logo-wrap img').src;}catch(e){}
  let y=0;

  /* ── header used on every page ── */
  function hdr(){
    doc.setFillColor(...GD);doc.rect(0,0,210,32,'F');
    doc.setFillColor(...GOLD);doc.rect(0,32,210,2,'F');
    if(LSRC){try{doc.addImage(LSRC,'PNG',164,1,40,31);}catch(e){}}
    doc.setFont('helvetica','bold');doc.setFontSize(11);doc.setTextColor(...W);
    doc.text('Hillside Christian College',14,8.5);
    doc.setFont('helvetica','normal');doc.setFontSize(8);
    doc.text('125, Theo-Ben Gurirab Street',14,13.5);
    doc.text('PO Box 5807',14,17.5);
    doc.text('Telephone: +264 64 200 277',14,21.5);
    doc.text('Email: hillside.c.college@gmail.com',14,25.5);
    doc.setFontSize(7);doc.setTextColor(220,220,220);
    doc.text('Page '+doc.internal.getCurrentPageInfo().pageNumber,196,30,{align:'right'});
    y=38;
  }

  function ck(extra){if(y>(extra||265)){doc.addPage();hdr();}}

  /* coloured section header */
  function sHead(t){
    ck();
    doc.setFillColor(...GD);doc.rect(14,y,182,7,'F');
    doc.setFont('helvetica','bold');doc.setFontSize(9);doc.setTextColor(...W);
    doc.text(t.toUpperCase(),17,y+5);y+=9;
  }

  /* two-column label+value row */
  function dRow(l1,v1,l2,v2){
    ck();
    doc.setFillColor(...LG);doc.rect(14,y-1,40,6,'F');doc.rect(107,y-1,40,6,'F');
    doc.setFont('helvetica','bold');doc.setFontSize(8);doc.setTextColor(...GD);
    doc.text(l1,16,y+3.5);doc.text(l2,109,y+3.5);
    doc.setFont('helvetica','normal');doc.setTextColor(...BK);
    doc.text(String(v1||'—'),57,y+3.5,{maxWidth:47});
    doc.text(String(v2||'—'),150,y+3.5,{maxWidth:47});
    doc.setDrawColor(190);
    doc.rect(14,y-1,40,6);doc.rect(54,y-1,51,6);
    doc.rect(107,y-1,40,6);doc.rect(149,y-1,47,6);
    y+=7;
  }

  /* full-width label+value row */
  function wRow(lbl,val){
    ck();
    doc.setFillColor(...LG);doc.rect(14,y-1,40,6,'F');
    doc.setFont('helvetica','bold');doc.setFontSize(8);doc.setTextColor(...GD);
    doc.text(lbl,16,y+3.5);
    doc.setFont('helvetica','normal');doc.setTextColor(...BK);
    const lines=doc.splitTextToSize(String(val||'—'),135);
    doc.text(lines,57,y+3.5);
    doc.setDrawColor(190);doc.rect(14,y-1,40,6);doc.rect(54,y-1,142,Math.max(6,lines.length*4.5));
    y+=Math.max(7,lines.length*4.5+1);
  }

  /* ── PAGE 1: APPLICATION TITLE & GRADE GRID ── */
  hdr();
  doc.setFont('helvetica','bold');doc.setFontSize(22);doc.setTextColor(...GD);
  doc.text('APPLICATION '+YR,14,y);y+=9;

  doc.setFont('helvetica','bold');doc.setFontSize(10);doc.setTextColor(...BK);
  doc.text('Name Of Learner:',14,y);
  const lname=((d.l.fn+' '+d.l.sn).trim()||'—');
  doc.setFont('helvetica','normal');doc.text(lname,54,y);
  doc.setDrawColor(0);doc.line(52,y+0.5,196,y+0.5);y+=9;

  doc.setFont('helvetica','bold');doc.text('Grade applied for:',14,y);
  doc.setFont('helvetica','normal');doc.text('(Mark applicable)',62,y);y+=6;

  const grades=[
    ['Pre-Primary','Gr. R','Gr. 1','Gr. 2'],
    ['Gr. 3','Gr. 4','Gr. 5','Gr. 6','Gr. 7'],
    ['Gr. 8','Gr. 9','Gr. 10','Gr. 11','Gr. 12']
  ];
  const gW=38,gH=7;
  grades.forEach(row=>{
    let gx=14;
    row.forEach(g=>{
      const isSelected=(d.l.grade===g||d.l.grade===g.replace('Gr. ','Grade '));
      doc.setFillColor(isSelected?201:250,isSelected?162:253,isSelected?39:251);
      doc.rect(gx,y-0.5,gW,gH,'F');
      doc.setFillColor(isSelected?201:220,isSelected?162:240,isSelected?39:228);
      doc.rect(gx,y-0.5,8,gH,'F');
      doc.setDrawColor(150);doc.rect(gx,y-0.5,gW,gH);doc.rect(gx,y-0.5,8,gH);
      doc.setFont('helvetica',isSelected?'bold':'normal');
      doc.setFontSize(8);doc.setTextColor(isSelected?20:30,isSelected?50:30,isSelected?10:30);
      doc.text(g,gx+10,y+4);
      gx+=gW;
    });
    y+=gH;
  });
  y+=5;

  /* Document checklist table */
  doc.setFont('helvetica','bold');doc.setFontSize(10);doc.setTextColor(...BK);
  doc.text('Documents to be attached to application:',14,y+1);
  doc.setFillColor(...GD);doc.rect(138,y-4,57,7,'F');
  doc.setFont('helvetica','bold');doc.setFontSize(8);doc.setTextColor(...W);
  doc.text('Checked',166.5,y+0.5,{align:'center'});
  doc.setFillColor(220,240,228);
  doc.rect(138,y+3,29,6,'F');doc.rect(167,y+3,28,6,'F');
  doc.setFont('helvetica','bold');doc.setFontSize(8);doc.setTextColor(...GD);
  doc.text('Parent',152.5,y+7,{align:'center'});
  doc.text('Office',181.5,y+7,{align:'center'});
  doc.setDrawColor(150);doc.rect(138,y+3,29,6);doc.rect(167,y+3,28,6);
  y+=10;

  const docList=[
    '1. Application Form','2. Admission Policy',
    '3. Indemnity Form  (NB – 2x witnesses to sign)',
    '4. Details of person responsible for account.',
    "5. 1x Certified copy of learner's birth certificate",
    '6. Certified copies of ID documents – both parents.',
    '7. Certified copy of Medical Aid Card',
    '8. 2x Passport photos of learner',
    '9. Vaccination Card (Gr.1 Only)',
    '10. Proof of Payment (EFT)',
    '11. Progress Report from current school.',
    '12. Testimonial from Pastor/Church Leader'
  ];
  docList.forEach((item,i)=>{
    const bg=i%2===0?W:[248,252,249];
    doc.setFillColor(...bg);doc.rect(14,y,124,6,'F');
    doc.setFont('helvetica','normal');doc.setFontSize(8);doc.setTextColor(...BK);
    doc.text(item,16,y+4,{maxWidth:120});
    doc.setDrawColor(190);doc.rect(14,y,124,6);
    doc.rect(138,y,29,6);doc.rect(167,y,28,6);
    y+=6;
  });
  y+=4;
  doc.setFillColor(245,250,247);doc.rect(14,y,182,16,'F');
  doc.setDrawColor(0);doc.rect(14,y,182,16);
  doc.setFont('helvetica','bold');doc.setFontSize(8.5);doc.setTextColor(...BK);
  doc.text('Note:',16,y+5);
  doc.setFont('helvetica','normal');doc.setFontSize(8);
  const noteL=doc.splitTextToSize('Please ensure that every page is completed correctly. Both parents/guardians and two witnesses have to sign the admission policy. Application will NOT be accepted if all documents are not included and if full payment of previous fees are not received.',178);
  doc.text(noteL,16,y+10);

  /* ── PAGE 2: PERSONAL DETAILS ── */
  doc.addPage();hdr();
  sHead('Personal Details of Learner');
  dRow('Surname:',d.l.sn,'First name:',d.l.fn);
  dRow('Date of Birth:',d.l.dob,'Citizenship:',d.l.cit);
  dRow('Religion:',d.l.rel,'Mother tongue:',d.l.mt);
  dRow('General Practitioner:',d.l.gp,'Gender:',d.l.gen);
  wRow('Previous school/Pre-Primary:',d.l.prev);
  ck();
  doc.setFont('helvetica','bold');doc.setFontSize(8.5);doc.setTextColor(...BK);
  doc.text('Brothers and sisters in HCC:',14,y+3.5);y+=7;
  dRow('Name:',d.l.s1,'Grade:','');
  dRow('Name:',d.l.s2,'Grade:','');
  y+=3;

  /* ── PARENT DETAILS ── */
  sHead('Personal Details of Parents');
  /* Two-column header */
  doc.setFillColor(210,235,218);doc.rect(14,y,93,7,'F');doc.rect(108,y,88,7,'F');
  doc.setFont('helvetica','bold');doc.setFontSize(9.5);doc.setTextColor(...GD);
  doc.text('Father/Guardian:',16,y+5);doc.text('Mother/Guardian:',110,y+5);y+=8;

  function pairRow(lbl,fv,mv){
    ck();
    doc.setFillColor(...LG);doc.rect(14,y-1,30,6,'F');doc.rect(108,y-1,30,6,'F');
    doc.setFont('helvetica','bold');doc.setFontSize(8);doc.setTextColor(...GD);
    doc.text(lbl,15,y+3.5);doc.text(lbl,109,y+3.5);
    doc.setFont('helvetica','normal');doc.setTextColor(...BK);
    doc.text(String(fv||'—'),46,y+3.5,{maxWidth:59});
    doc.text(String(mv||'—'),140,y+3.5,{maxWidth:55});
    doc.setDrawColor(190);doc.rect(14,y-1,30,6);doc.rect(44,y-1,62,6);
    doc.rect(108,y-1,30,6);doc.rect(138,y-1,58,6);y+=7;
  }
  function pairRow2(l1,fv1,mv1,l2,fv2,mv2){
    ck();
    doc.setFillColor(...LG);doc.rect(14,y-1,18,6,'F');doc.rect(46,y-1,18,6,'F');
    doc.setFillColor(...LG);doc.rect(108,y-1,18,6,'F');doc.rect(140,y-1,18,6,'F');
    doc.setFont('helvetica','bold');doc.setFontSize(7.5);doc.setTextColor(...GD);
    doc.text(l1,15,y+3.5);doc.text(l2,47,y+3.5);
    doc.text(l1,109,y+3.5);doc.text(l2,141,y+3.5);
    doc.setFont('helvetica','normal');doc.setTextColor(...BK);
    doc.text(String(fv1||'—'),33,y+3.5,{maxWidth:11});
    doc.text(String(fv2||'—'),65,y+3.5,{maxWidth:41});
    doc.text(String(mv1||'—'),127,y+3.5,{maxWidth:11});
    doc.text(String(mv2||'—'),159,y+3.5,{maxWidth:37});
    doc.setDrawColor(190);
    doc.rect(14,y-1,18,6);doc.rect(32,y-1,14,6);doc.rect(46,y-1,18,6);doc.rect(64,y-1,44,6);
    doc.rect(108,y-1,18,6);doc.rect(126,y-1,14,6);doc.rect(140,y-1,18,6);doc.rect(158,y-1,38,6);
    y+=7;
  }
  pairRow2('Title:',d.f.ti,d.m.ti,'Initials:',d.f.ini,d.m.ini);
  pairRow('Surname:',d.f.sn,d.m.sn);
  pairRow('First names:',d.f.fn,d.m.fn);
  pairRow('Citizenship:',d.f.cit,d.m.cit);
  pairRow('Postal address:',d.f.po,d.m.po);
  pairRow('Residential address:',d.f.res,d.m.res);
  pairRow('Email:',d.f.em,d.m.em);
  pairRow('ID No:',d.f.id,d.m.id);
  ck();doc.setFont('helvetica','bold');doc.setFontSize(8.5);doc.setTextColor(...BK);
  doc.text('Contact Numbers:',14,y+3.5);y+=7;
  pairRow('Tel (H):',d.f.th,d.m.th);
  pairRow('Cell Nr:',d.f.cell,d.m.cell);
  ck();doc.setFont('helvetica','bold');doc.setFontSize(8.5);doc.setTextColor(...BK);
  doc.text('Employment:',14,y+3.5);y+=7;
  pairRow('Profession:',d.f.pro,d.m.pro);
  pairRow('Employer:',d.f.emp,d.m.emp);
  pairRow('Position:',d.f.pos,d.m.pos);
  pairRow('Tel (W):',d.f.tw,d.m.tw);
  pairRow('Email:',d.f.em,d.m.em);
  pairRow('Religion:',d.f.rel,d.m.rel);

  /* ── PAGE 3: ADDITIONAL + POLICY ── */
  doc.addPage();hdr();
  sHead('Additional Information');
  ck();
  doc.setFont('helvetica','bold');doc.setFontSize(9);doc.setTextColor(...BK);
  doc.text('Parents:',14,y+3.5);
  let sx=37;
  ['Married','Divorced','Single Parent'].forEach(s=>{
    const sel=(d.x.ps===s);
    doc.setFillColor(sel?...GOLD:[240,240,240]);
    doc.rect(sx,y+0.5,4.5,4.5,'F');
    doc.setDrawColor(sel?...GD:100);doc.rect(sx,y+0.5,4.5,4.5);
    if(sel){doc.setFont('helvetica','bold');doc.setFontSize(7);doc.setTextColor(...GD);doc.text('✓',sx+0.8,y+4);}
    doc.setFont('helvetica','normal');doc.setFontSize(9);doc.setTextColor(...BK);
    doc.text(s,sx+6,y+3.5);sx+=doc.getTextWidth(s)+15;
  });y+=9;
  wRow('Learner lives with:',d.x.lw);
  wRow('Learner is dropped off by:',d.x.dob2);
  wRow('Learner is collected by:',d.x.cb);
  y+=3;
  doc.setFont('helvetica','normal');doc.setFontSize(8.5);doc.setTextColor(...BK);
  doc.text('Next of kin to contact in the case of an emergency – when parents cannot be reached:',14,y);y+=6;
  dRow('Name:',d.x.en,'Number:',d.x.eno);
  y+=3;

  /* ── ADMISSION POLICY ── */
  sHead('Admission Policy and Contract');
  doc.setFont('helvetica','italic');doc.setFontSize(8.5);doc.setTextColor(...BK);
  doc.text('Hillside Christian College – herein referred to as "the school"',14,y);y+=6;
  doc.setFont('helvetica','normal');doc.setFontSize(7.8);
  const pol1=[
    '1. By completing the form below, the applicant offers to contract with the school on the terms herein contained.',
    '2. Upon the applicant being informed in writing to the effect that the application had been approved, a contract will come into existence.',
    '3. The contract will remain in force until the end of the school year. No right shall accrue to qualify for renewal in absence of a written intention to renew and a completed application form at the latest 2 months prior to expiration.',
    '4. Three calendar months (1st of a month) written notice must be given in the event of the applicant wishing to withdraw a child from the school. November will not count as a notice month. Interest of 15% per annum calculated and capitalised monthly in arrears will be charged on arrears accounts.',
    '5. The school fees will increase yearly with effect from the following school year with about 10%',
    '6. In the event of a learner\'s school fund being in arrears, the learner\'s participation in excursions and tours may be jeopardised. School fees in arrears for 2 months or more may lead to the learner not being allowed to return to school until settled in full.',
    '7. The education of the child is conducted by the parents and teachers working together in partnership.',
    '8. Parents and guardians accept the board of directors as the only official mouthpiece of the school.',
    '9. The board of directors may at any time review rules and admission and re-admission requirements.',
    '10. The school fees are payable monthly in advance on the 1st of each successive month.',
    '11. This application is only valid for the current year and no waiting list will be maintained for a following year.',
    '12. Misleading or incorrect information will lead to the immediate cancellation/disqualification of the application.',
    '13. The applicant warrants being the legal guardian and irrevocably acknowledges that the school is indemnified against claims for theft, loss or damages of personal property, except for gross negligence.',
    '14. The school will not incur responsibility for any injury or loss suffered by a learner, except in cases of gross negligence.',
    '15. Any certificate from the school pertaining to amounts owed will serve as rebuttable proof of such indebtedness.',
    '16. The applicant consents to legal costs on attorney and own client scale if legal action is necessary for recovery of outstanding fees.',
    '17. This document entails the full terms of the agreement between the parties.',
    '18. The curriculum requires the usage of electronic devices such as tablets, laptops or computers, earphones, keyboard and internet facilities.',
    '19. The electronic device purchased by the applicant remains their property.',
    '20. The school reserves the right to block and remove non-curriculum material from the device.',
    '21. Repair or replacement costs for school devices will be incurred to the applicant.',
    '22. Students showing symptoms of communicable diseases must be excluded until readmission is accepted.',
    '23. The applicant and learner submit to program, academic and disciplinary regulations of the school.',
    '24. By enrolling, the applicant expresses conviction that parents/guardians provide Christian education as in Deuteronomy 6:8 and Proverbs 22:6.',
    '25. The applicant may call the school regarding any concerns about incidents involving the learner.',
    '26. The applicant agrees to pray for the school, co-operate in discipline, support spiritual training, ensure punctual attendance and generally support the school in every way possible.',
    '27. The principal and staff reserve the right to follow disciplinary procedures.',
  ];
  pol1.forEach(item=>{ck(260);const L=doc.splitTextToSize(item,182);doc.text(L,14,y);y+=L.length*4+2;});
  y+=4;ck(255);
  doc.setFont('helvetica','italic');doc.setFontSize(9);
  doc.text('Thus, done and signed at Walvis Bay on this ______ day of ________________________',14,y);y+=10;
  ['Father/Guardian:','Mother/Guardian:'].forEach(role=>{
    ck();doc.setFont('helvetica','bold');doc.setFontSize(8);doc.setTextColor(...BK);
    doc.text(role,14,y);doc.text('Name:',42,y);doc.line(54,y,107,y);
    doc.text('Signature:',112,y);doc.line(130,y,196,y);y+=12;
  });

  /* ── PAGE 4: DISCIPLINARY ACTION RELEASE ── */
  doc.addPage();hdr();
  sHead('Disciplinary Action Release');
  doc.setFont('helvetica','normal');doc.setFontSize(8.5);doc.setTextColor(...BK);
  const disc=[
    'Hillside Christian College is honoured that you accept our staff to assist you in training your child for Christian leadership.',
    'Our total program is designed to develop the Christian spiritual and academic qualities that characterize your child.',
    'To carry out your wishes for total Christian character development, we believe it is necessary to follow Scriptural admonition to correct a child when his behaviour is in violation of proper or reasonable rules and procedures.',
    'When warranted for very serious moral offense (cheating, stealing, fighting, foul language, disrespect, defiance), the principal will call for parental disciplinary action:',
  ];
  disc.forEach(item=>{ck();const L=doc.splitTextToSize(item,182);doc.text(L,14,y);y+=L.length*4.5+3;});
  y+=2;
  const discItems=[
    '1. The parent/guardian will be asked to attend to the disciplinary action at the school as is fitting for the specific offense.',
    '2. The offense will be clearly discussed with the child.',
    '3. A staff member & parent or guardian will discuss the Spiritual applications and pray with the child.',
    '4. Disciplinary action will be administered by the parent/guardian and the child will be prayed for.',
    '5. A staff witness of the same gender as the child will be present during this process.',
    '6. The child may not be physically restrained.',
    '7. A written report will be made of the date, offense, and response to the disciplinary action.',
    '8. Three (3) repeated moral offenses constitute a violation of the student/school agreement and will result in suspension or expulsion.',
  ];
  discItems.forEach(item=>{ck();const L=doc.splitTextToSize(item,182);doc.text(L,14,y);y+=L.length*4.5+2;});
  y+=4;
  const discClose=['I/We understand the disciplinary procedure that Hillside Christian College follow, after reading through the above information.','I/We consent to this procedure and will endeavour to help my child to adhere to the school rules and the moral conduct policy of the school.'];
  discClose.forEach(item=>{ck();const L=doc.splitTextToSize(item,182);doc.text(L,14,y);y+=L.length*4.5+3;});
  y+=4;ck(250);
  doc.setFont('helvetica','italic');doc.setFontSize(9);
  doc.text('Thus done and signed at Walvis Bay on this ______ day of ________________________',14,y);y+=10;
  ['Father/Guardian:','Mother/Guardian:'].forEach(role=>{
    ck();doc.setFont('helvetica','bold');doc.setFontSize(8);doc.setTextColor(...BK);
    doc.text(role,14,y);doc.text('Name:',42,y);doc.line(54,y,107,y);
    doc.text('Signature:',112,y);doc.line(130,y,196,y);y+=12;
  });

  /* ── PAGE 5: INDEMNITY FORM ── */
  doc.addPage();hdr();
  sHead('Indemnity Form');
  doc.setFont('helvetica','bold');doc.setFontSize(9);doc.setTextColor(...BK);
  const iTitle=doc.splitTextToSize('UNDERTAKING BY PARENTS/GUARDIAN OF RESPECTIVE LEARNERS FOR PERMISSION AND INDEMNIFICATION FOR THE DURATION OF ENROLMENT AT HILLSIDE CHRISTIAN COLLEGE.',182);
  doc.text(iTitle,14,y);y+=iTitle.length*4.5+4;
  doc.setFont('helvetica','normal');doc.setFontSize(8.5);
  doc.text('We, the undersigned, hereby declare:',14,y);y+=7;
  const f1id=d.f.id||'—';const m1id=d.m.id||'—';
  doc.text('1) ID No:',14,y);doc.text(f1id,36,y);y+=7;
  doc.text('2) ID No:',14,y);doc.text(m1id,36,y);y+=7;
  doc.setFont('helvetica','italic');doc.setFontSize(8);
  doc.text('(Surname and full names of parent(s) and/or guardian(s) in print.)',14,y);y+=7;
  doc.setFont('helvetica','normal');doc.setFontSize(8.5);
  doc.text('Residing at:',14,y);y+=5;
  const fAddr=d.f.res||'—';const mAddr=d.m.res||'—';
  doc.text('1)',14,y);doc.text(fAddr,22,y,{maxWidth:174});y+=7;
  doc.text('2)',14,y);doc.text(mAddr,22,y,{maxWidth:174});y+=7;
  doc.setFont('helvetica','italic');doc.setFontSize(8);
  doc.text('(Full residential address of parent(s) and/or guardian(s))',14,y);y+=8;
  doc.setFont('helvetica','normal');doc.setFontSize(8.5);
  doc.text('Parent(s) and/or guardian(s) of:',14,y);y+=5;
  const learnerName=(d.l.sn&&d.l.fn)?d.l.fn+' '+d.l.sn:'—';
  doc.text('1)',14,y);doc.text(learnerName,22,y);y+=7;
  doc.text('2)',14,y);doc.line(22,y,196,y);y+=7;
  doc.text('3)',14,y);doc.line(22,y,196,y);y+=8;
  const iText=doc.splitTextToSize('That we herewith agree that the above-mentioned child(ren) may partake in daily organized school activities / all extra mural activities of the school inclusive of athletics, physical education, sport excursions, educational tours, as well as excursions of historic and/or geographic and/or cultural interest. My/our child may walk or go by vehicle to aforesaid activity. We/I understand, acknowledge and accept that such activities entail certain risks and we/I herewith waive any claims stemming from injuries or damages that may directly or indirectly follow from any participation by our/my child(ren). We/I further undertake to indemnify Hillside Christian College, the board of directors and/or the personnel and coaches against any claims arising from the actions of our/my child(ren).',182);
  doc.text(iText,14,y);y+=iText.length*4.2+4;
  const iAuth=doc.splitTextToSize('We/I herewith grant authority to the principal to, in the event of our/my child(ren) suffering a serious injury, to act depending on circumstances, in a way which he deems fit.',182);
  doc.text(iAuth,14,y);y+=iAuth.length*4.2+6;
  doc.setFont('helvetica','italic');doc.setFontSize(9);
  doc.text('Thus done and signed at ________________ on this ______ day of ________________________',14,y);y+=10;
  ['Father/Guardian:','Mother/Guardian:'].forEach(role=>{
    ck();doc.setFont('helvetica','bold');doc.setFontSize(8);doc.setTextColor(...BK);
    doc.text(role,14,y);doc.text('Name:',42,y);doc.line(54,y,104,y);
    doc.text('Signature:',109,y);doc.line(127,y,196,y);y+=12;
  });
  ck();
  doc.setFont('helvetica','bold');doc.setFontSize(8);doc.setTextColor(...BK);
  doc.text('Witnesses: (to certify that it is indeed the signatures of parent(s)/guardian(s))',14,y);y+=7;
  doc.text('1)',14,y);doc.line(20,y,97,y);doc.text('2)',101,y);doc.line(107,y,196,y);

  /* ── PAGE 6: ACCOUNT HOLDER ── */
  doc.addPage();hdr();
  sHead('Details of Person Responsible for the Account');
  const ac=d.x;
  dRow('Title:',ac.an?'':'','Initials:','');
  wRow('Surname:',ac.an||'—');
  wRow('First Names:',ac.an||'—');
  wRow('Citizenship:','');
  wRow('Postal Address:','');
  wRow('Residential Address:',ac.aad||'—');
  wRow('Email:',ac.aem||'—');
  wRow('ID No:',ac.aid||'—');
  ck();doc.setFont('helvetica','bold');doc.setFontSize(8.5);doc.setTextColor(...BK);
  doc.text('Contact Numbers:',14,y+3.5);y+=7;
  dRow('Tel (H):','','Cell No:',ac.ace||'—');
  ck();doc.setFont('helvetica','bold');doc.setFontSize(8.5);doc.setTextColor(...BK);
  doc.text('Employment:',14,y+3.5);y+=7;
  wRow('Profession:','');wRow('Employer:','');wRow('Position:','');
  wRow('Tel (W):','');wRow('Email:','');wRow('Religion:','');
  y+=3;
  doc.setFont('helvetica','bold');doc.setFontSize(9);doc.setTextColor(...BK);
  doc.text("Learner's Name and Surname:",14,y);y+=7;
  wRow('Child 1:',learnerName);
  wRow('Child 2:','');wRow('Child 3:','');
  y+=4;
  doc.setFillColor(255,245,200);doc.rect(14,y,182,10,'F');
  doc.setDrawColor(...GOLD);doc.rect(14,y,182,10);
  doc.setFont('helvetica','bold');doc.setFontSize(8);doc.setTextColor(...BK);
  const noteAc=doc.splitTextToSize('Note: If account is in arrears, the school has the mandate to hand over the account to a debt collector.',178);
  doc.text(noteAc,16,y+5);y+=14;
  doc.setFont('helvetica','italic');doc.setFontSize(9);
  doc.text('Thus done and signed at ________________ on this ______ day of ________________________',14,y);y+=9;
  doc.setFont('helvetica','bold');doc.setFontSize(8);doc.setTextColor(...BK);
  doc.text('Person responsible:',14,y);doc.text('Name:',52,y);doc.line(65,y,113,y);
  doc.text('Signature:',118,y);doc.line(137,y,196,y);y+=10;
  doc.setFillColor(245,250,247);doc.rect(14,y,182,8,'F');
  doc.setDrawColor(180);doc.rect(14,y,182,8);
  doc.setFont('helvetica','italic');doc.setFontSize(8);doc.setTextColor(60,80,60);
  const mandNote=doc.splitTextToSize('All information is mandatory – if not complete the form will be sent back and application will be noted as incomplete.',178);
  doc.text(mandNote,16,y+4);

  /* ── GLOBAL FOOTER ON LAST PAGE ── */
  const pgCount=doc.internal.getNumberOfPages();
  for(let i=1;i<=pgCount;i++){
    doc.setPage(i);
    doc.setFillColor(...GD);doc.rect(0,283,210,14,'F');
    doc.setFillColor(...GOLD);doc.rect(0,283,210,1.5,'F');
    doc.setFont('helvetica','italic');doc.setFontSize(8);doc.setTextColor(...W);
    doc.text('"His Destiny, Our Aim"  |  hillside.c.college@gmail.com  |  +264 81 823 1675',105,291,{align:'center'});
  }

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
  toast('Preparing Application PDF — sending email…','inf',12000);
  try{
    const pdfB64=buildPDF().output('datauristring').split(',')[1];
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
      summary,pdf_attachment:pdfB64,word_attachment:'',excel_attachment:'',
      filename_pdf:'HCC_Application_'+ENROL_YEAR+'_'+(v('l_sn')||'Learner')+'.pdf',
      filename_word:'',filename_excel:''
    });
    toast('✅ Application PDF emailed to school!','suc',6000);
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


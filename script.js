

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
<td style="border:none;text-align:right"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOAAAADyCAYAAABUM8lxAAABCGlDQ1BJQ0MgUHJvZmlsZQAAeJxjYGA8wQAELAYMDLl5JUVB7k4KEZFRCuwPGBiBEAwSk4sLGHADoKpv1yBqL+viUYcLcKakFicD6Q9ArFIEtBxopAiQLZIOYWuA2EkQtg2IXV5SUAJkB4DYRSFBzkB2CpCtkY7ETkJiJxcUgdT3ANk2uTmlyQh3M/Ck5oUGA2kOIJZhKGYIYnBncAL5H6IkfxEDg8VXBgbmCQixpJkMDNtbGRgkbiHEVBYwMPC3MDBsO48QQ4RJQWJRIliIBYiZ0tIYGD4tZ2DgjWRgEL7AwMAVDQsIHG5TALvNnSEfCNMZchhSgSKeDHkMyQx6QJYRgwGDIYMZAKbWPz9HbOBQAAD8XUlEQVR42uy9d5gkV3X+/7n3Vuo4cWc2SlplCQWUJSRyEknkZGyMwTYGG2NsYxtjbH4GjI0DtsEEE4wNNsZkRI6SkBBCSEJCGYXV5p3ZSR0r3PD741b3zK4S2l1Y6fuo9MxTmp7truqqOvec8573vEc453h4e3h7ePvlb0IIJx++DA9vD28Hb3vYAB/eHt4O4hY8fAkevNvWha6TQeDXSSnACZZTBglY1jUCAbCjlzmcY00tEQ9fuYcN8OEN2LG06NaMjN6jQdy1ZbPrd1NCWWGp1WHX7AzzS4to40hNwY6du9iyYyeL7RYIBVLgyj0ATgAS54S3SOuQDgTWSQRKOAInOObII6lXE1ZNTLJm1STjY2PUkpgkSYiTiKn1zYcN9mDmgQ+DMAd227R1h9sxO8PuhQVmFxa58uqr2LptB3dsuoudO3eysNTCZRlYAUECVoKMQAhQAuIEkhhQUORQb4CSoJTfiwAhpTc+JEIo7xW1Ba3BGNCF/90Z6Pf878Z54y0M5Ck4B8oBXVCaiVWrGBsZ5bhjjmbt6mkeccyxTIyNcuJxfr92zaqHDfUXAMI8bID7uW3fvtXtnlti+/adXPuT67l9013ccOMtbN62i+0zu7FB5B966yCueOOqVGBkBJpjIGIYHSccGSGqVlBRTFRJqDXGSBo1Cm294UiFkAFSBtgVpqDCAOcMVjucLjBaY4scigKsQTnot1t0lxZJe110uwOdDuQFUMC22yBdhDyHtA/OgrBQr1JPIo47fCMb16/huKOO4MRjj+KYIw5n9eQ4kxsOf9ggHzbAg7P99Lab3J13bWbTtp185sJvMjPfZnb3AvObt3vPpYHGmA8dkxo0RwnXrGd8/Xoqo+MQx4TVOqoxSl6p07MOi0OGASII0daijcDgQPj8TwjlQ1Akzjmcc1gMzhmcFCgEUjgUApxFOQvWEUmBLjICB0kUIZwlzzJ0lhObnKA1g+u2mZ/ZRdpZIt28CbotaC2BtNBeBJ2ChMrkKEduWMcRhx3GyY84npOOP45jDz+SkVqVdeunHjbIhw1w37el7g43Ultzt4fo+9/6gbvsyiv59kWXcMPtt7FzfsGHhkEAtVGY2ACjU1Sn1zC5di2NVVOoRhMXVylkQC5DChlhUBgR4FBY/N5IMEJiPL7i0zonsQIcyqd2Q6B6z710lJ7Q4oRFuOV/IZxF4hAOELb83f+bwScKx/A9yjmk9f8mcIbA5UTG72XeR5mM3txutt91J+3Nd8L8buh1Ie1Baw5CQb3Z4Phjj+ToQw/huc98GoeuneK000942CgfNkDY3p9zaysTP/fDcOONd7gf/ugavvv9K/j6dy5hrptClkMUQ60O46ME69Yxsm4jU0c9Eh3WcVGEC0OMDEgFZAhyJ7FxjCEojU/gRABOAuXpCFMaUXlwJ8s/SZZflOAGxiXL/QqjLX+nNFkAUe7Brfh/e7e6kyEABAKHchblNMo5AqsJnCZEo3SB0BkBjlhA0e+xY/tWelvuhNntcOetsDgPToMtCEYbnH3iI3jyo8/msWedwYa1qzn86NX/zxrjl7/8ZXfcccdxxBFHiIcN8AFuM9t2uU/+36e4/oabueb6W7jqmuvBBVCfgMYoauPR1NcdwuRRx1Bbu4E8qdCxjlwIXFjB2gqOAOygRFCGiAgsEiO9Rxt4OiuFNzAhvfE5DZi9b82yMZb7wZ0VVi7/CydwQpZGa/f6jJW/D6x3haGXnnL5iLZEUR3SWQSgnCVUEnSBKTTCWZIoJokCTKHJuy3qgUMWKc1QUizsxizMc+MPL4OZrbBrC/RaUHRJVo1x5hknc/aZp3Hc8Udx7LHHcvaxxz6kjfL2u7a697/3PbznX/+ZKIpot9sHzwC3b9/u1q5d+6C6oDPbt7iptRvu8Zy239F2n/7iF/nB9dfw6S9/BbfUhrFJcArGpgiOPoGpo45n8sjj6IUJXRXRMoKuExBEECUgA8isz/UQSCFRQgxLAs45UBInwArnQ0u50sbsMuix97aCpDQIF1d6QOkG4ahg73d7I3N7/e4NECd9yFoaqXAWhFvhQVnx+VDkOXGUoJRCa40pCgCCIEAJgc66NJMIaQqypXnWjNQpWrPEeZfbrv0x+fZNcNftsHs7SA2hhNEGp5x0Auec/Ej+4nV/yJqGeMgY4tZdc279tI+mfu03ftN99v8+Rb/XYWJigp/+9KesWbNG/FIN8Nvf/rb7u7/7O6688kpe/vKX86//+q8P2ot52SU3uK98/Xu89/0fpr3YgUYdVo3BYRuobzyc9cccSzg6SZeALKixkBpkfRSjYiwJ2gUoGaFUjDWQFTmEDqRDCIEQAov1EL/Tfi9caQuD0NANczGcAhf5V8XdjWjZ6Jb3coVR+hLgsvnZe7nyy59tvYcWdo+QVeCGXtcN3+OP5IxDyBCURAiJA5wTvtxR5CghiRX00i4qlkSRJCtaNJKArDNPHc1YJAl7LeZuv51dN90EWzb7kLXbhcV5quvW8YbXvJpnPuFxnH3KoQ96Y3zPBz7sPvnJT/LDy3+AK3KOPvpI3vOe9/CUpzzll+8BP/rRj7p3v/vd3HTTTQB86lOf4vnPf/6D6iJedvlP3dU33Mo7//WD7Ni0HVwISQOOOx4OP5zDH3UuMqnQNZaek/SFojK6Ci0V3XYKMgRCMBKsQBAQConFoVXGHu5DlpajpN+bMrx0FhxI5w3QexgBLsKWgMvAUIafVnoshgbjhvnaskENQBh5NyO+500ODZG7+U651zlIpFJYU9YYESDLmqT0ealyPq8sioygWUVnPXA5SAORgoUFIiUYFY6GsyRpSn/XLu64/nq46TqY2wat3VCvcdzxx/IHv/GrnHXScZx84mEPSkO86rob3dOf/nQWFxfJe12CQDE5McYXvvAFzjrrrIMTgt5www3uhBNOoNFo0G63WbVqFRdccAFve9vbHpBLPlDbbTdd75ZaLf75fR/ge1dew7ZN2yGswdoNVE87jyNOO5ssqiDqk8xlMWFtgn5ekBuLrFTIjSEvtM/TkhgpJVJK7+G0werCeyIpUXGIdhYMWFt6P391vfFIsUcoOczvhqHeshdzK0gubmCAKw1lYJB7G47YM2RdGcKKewpth58zWATk3XLEgcE7a5FKEQQBQgiMMWhblIV8PBIqZcnWCcEY4kqdrNsD5xhvjNBrt7D9LpVAUlEK5TQBUJMZcbaTqDvDtd/7HumPLoesRyQKNk6N8oTHnMUb/+T1NEebTEytO6gGee2Nt7oLLriALVu2DIkP41OTLO6e4eijjuADH/gAj33sYx+wAR4QKpo2gjhM6HQzCKvMdnI+8r+fwYQxr3n1q9yZjzz1l3bxfnzdde7P//Kt3LV9lltvvNV7rtVHwKq1POJXfp1WWGFHpY4cHWduqSCprWIpE8SVGlmWgxHEcY2CjEqtSp5naJ1jnUYqgSjdl8MhFORpD4RCIJBCIKQaxoPLkadY4VnkHp7IiWIPMGQ5XxsYHHvmiMLuCaysNKC7GeXKTHAleCNXwDPSLzT34hVVEGCtJc/6ZZi9/A2ctchaFZNmBJUKJjc4AkymQQuqlQaLC10qcY1opE6RF2ROowKJw7A7szSCUSp1xVFPeyHxo5/Mj//nv8i3b+KWbQvc8r9f4mczCzz2nDM4/ylPdKefdsov3Qhv/tkm96WvfoMvfvnrbN6+BNEoxAnTGw8jay3gWkt0eym1enPfShEHwgNee8Md7uyTTyC1giMf8xRu27INlmahsxuCjMMPWc+Tz3gMf/WmN7Pm2KMO6EW8+JIvu6uv/Qkf+OgnuPWmTSCroJoQjzJy3pPY+MizKJqTFI0RukFMS0rSIKIIFBAgTTgENtxeIL0T3Cu6OCgD7FmjYw9vt0dp4V7vwHI+dvc80N4LwnnvgM09YKn79N49jf3eNrtXaLsnUnvv52DLd1ikNQTCEeiUyKSMBY5a3qF9503M3XoDCxd/A3QPWvNMrxrh1JOO4R/f+XaOO+2MX6gxfvC9/+yuuOJa/uNTn4dkDFJgcgMcezynPvVJrB6p8tWP/hvccAWHr5/iwx/+MI9/9KMeoAdUB8YDBqH04VelwcbTH83k2RVuu+V6dl/6LbAL3HHndj6+7etcf8NdPP38J7lff+VvsO7wfUdMd+3c7m684WZuv/MO3vqO/4+5dpu0lUPYhGgcVh0KJ5zJUU+9gB19i66OkEc1elKSSek5lzIA59FJIe7pgbqvHIr7zbf2+Pv9PMj39lliRRniF7YJux9vlvdi03bvAsg9m6ELQETYICCVFUzeYQlDs5JQPeIUJqY2EEytY/byi+GW69nVzfnady6j/s5/4BW/8gJ37nlnMTJ1yAE1xO9fcZn79kXf5t/+4X3MzXchGYUihDUbOfSpzyE44ZFk42Pc1doJ0RjIEMe+n8IB6obokbsMdJW0Pk5l3VFM1Faz21Tgrutg8x30CsVlP7mdm3fO89nvXMTqqVXu917zKg7fsIokDkiqNabX3jsCduutN7s7tm7l2xddyjU/vZ4bbr6NXupo71AgpjyJuTkK0+uZeOL5TB13MltESLcSkYcVtFDYsk5HSdfC/dx+4uHtF7BJZ5E6IxIhCEERhFgn6RBiKhHVWoNKpc7q6TXs/PhHYHYbjCZ8+kvf5vIfX8cfvO63efRTHu/WbVjLutH9o8LdeMWt7pOf/Rwf/cJ/savdwnQsjK6DxiSs2QjHnUbwyDNoV0aY7xU0swiC2n6b0AEJQe+440Z3/PGPJAsmeMTr/458zTG4eIR+2iZ0S4wLw66rr2PbN74G2TwUS2BSiBwUrdImpK9Ha10y+cuVP4g8kVlIqDdBBBDGkGsI6jBxOLXDjuW408+kvn4Dd3V7dKIqZmSMBeugWscJ4Q3NloYnPIVEYj2k/vB2cAzQWkJnfNeGCBAqxAhJYTROFwiXMxpLov4i1f4i40WHOy79Hgvf/ir02xAaKNoQOEbXruWsM07n5OOOQyJYNTbKqY88mZFGA+EkrXabHTt2sXXHdnbs3MW2bTvYtXsXN910Izvv2gGu6amFiYZaBdYew/qTzqRx3Eno+jhFNEIeVlgoFBVhGO3Mc8dH/wFuvpiNa5t85MMfOnghaJhrROEgqSKSUbqqSRaNoSvj5OksRaKon7mKo488ke7s7Wy77BvQXYL2bsgS0GW3gPSYCUqUwIDy7TpCQaUG2kFc9YZ47HGMHnY0U4edQJ+QnXGCC6rYNdO4ICFVElcYv0IZu4xMCoksicoe0oeHbfDgbFaCjRR5bqDQSBRSKAQRBBFKVllIOzRrU/SQ6LjB2ic+Gz2+lvbNN8IdN0F7BkLB4o4+3/jcd/lG9YcEziCMZqxRJw4jqnECSLrdPp1eSl5o0kJjixQaFUimIVoDlSoctZraKY/k0CNOxiRjtIMaC7lFG18+clJgTEEQOWgmP2fa8gsOQYWWWAukGiMibFijS0CaW8Lx1WxbmmdVdRKnoTY5yuHHHUsQWHTapSoCTD+l6HYp+ikuKxDaIpzDWUFzdAIjAqojYxRBSHVkgnZaIOKYDpKFIIJKncJYFhfbSA1SOs96zHMIg7KqLQbQLzj85wv7sBUcxM0JyI3xxHalcC7EagcWpAyQSkJUpecsYXWSBd2jVQgqJ57DYWc9iSTrIBe3srjtDu762c9IZ2eh00LPzQKGmXAMZmcgLHzPZWFAVWC0SdQcxdYqTBx3FLWpQ1m/9nhMfYTtYY8lC7OiTmEjgngUGTiSJAI8M6jo98lo+yhOPAgMMEjqCFEBEQ7BjCBQyCSiMH2QkrRap59pOlFBtbaKXtYlqkaEOiSoOuxogTAF0hokDlXW3uaNw1iY8Vx9IhJERaGtY6lcwfLeIkQVxKpRojAmnV+CuEK11iDLMqz1QItQvnhsbInCCYW7Gw/z4e2XtomSZK5CEAHOgjQGKRyYDKsdSSUkXWphqjFJMkpXB9STmM2FJSskjcmNjB12FEec+1S6S/PkrSXy9hK7t2+F7dvh5NDXKYMEooS4VqcxNs74xBThSJNuEtFzMde0FNiYTpTglCSwVepBnSyFLM/A5BRFxli9QmNslKZOIe3sv+0ciOvY0obMWR86BopcZ2RpB1GrgS2gUqGvBaI6ggthvshAC9LKCGhBECqC2CFtgTU5OOPrTYEiyzVJrY4uDEIo5jt9qtUqzmpkrUIqCohiVKOG6eekvS6EimoS01uYI6w1V4QJruyxcyAELvCMsYcj0IPlAiWEiTfCvACjsVIRJgHSSAqdkaY9ZK2KDBT9wkJQoR9U0J1Fwol1LJEx211AAvWRQ5D1DJmnTB9xIkmgcKbAWosTIQiFEYLcCnYLRREp2tIQVUbIAZXUcJEnGeiupWUNgQtARahagNUBmbFki4sEYe4brB8MBthWFioKQkdqOoQxJIGga3oIZcBJAm0RVnllBFnFxnUoJAQC7UC7AolEqACExAnfUSDqvvuAIIJ2G2oJfaFR0iFwhEahiRCdgigIyHVOGEX02i3USI2iKFYQKAffumSeOMPDwnAH0QFaEKkpCeISpwKcMKQm9Ytm4PEA5yxWg8TjASYvoNqg0ID0KgMWR9dpAmUIYo12mgyHFRob+P5KJxVWSAwBVghM4KBiybUFFRFX6vTau1BRAHGELYzvZokCcltAINFImvUJTD8HF4OIhjzgg2aATmoQuuxtK3+ELXkVFmFlyeiXvuXFAVatMIxBT1zZHQBl75zEpYXnHiYRjI16caK8j84zMBoVJijrb1KhASuwVoIKMQXLLI9B98HK/YCD/LA86kErQ8Ta3w8tHcWA1ON5fiUSPoDrfeEenyLicJ5D68LyDQZDCGicMGjhebJWGBxghcBJVZLMZQnIOcj64BSyOkpvbolaJaLbalEZG6fvLMZp//FSezDQgTHCt6xZ9eDwgLEpfKhpte8lK0sIVgisEKWIkGBAHpaAQ5csLQdopDNlQ6g3QOsCtAAXVTz3LtflBeuBMpBIlEiwRiFFhNH+uEEUYLQjChPyovArkxA4YZaNj5J/+bDhHVwDxBI6XaKLEs2AjRQshysOhHUrng2Nw2CkRRDirMCKYLiwi/KTB2RyREkJFCtfG0IVUChqUZV+OyNWIa61yMRInbmsBVFJwJcDx6J9rioNEr3M+92va3AAtsRoQmPBQmhBDiTzKNW7hBjKLlhpQBTLP2gGfWnLP5QXVOJy42sTTkEQllfZktgc11tC5n0o+qD7KAwRApdnUBhE4fvypAVpJdJKH/Y4lvcPK3Ic1M1Ig5HGL5DD+oQoaxRBGT0J5HCxHNw8XT4/OdIWCFuAKzy67RzOCUzZFO2E3LMlyxlwFqENG+I6aq5FU4WQZqwbG4O0RxAJsBlgENaUDsYAOYgc6czw2T34HlBDrKVHeW3gKVRO+E7x8sJq6bmNRlqcNCXPkrInruwzQ2LKDgBDiCUEFSGDEJtmyH5GoC1R3qMeGvq9NiJKhxorcVDHOYtSPqyNIoU2DiskbuDxVhCPbdl18HAd8CAZn4B+MCCl79E26W0Mi7LLDmu4iAuJLduhpNM+NN0jlZAreiNlucCXH2pceb81Ve0IO13k7jmq9TpRIlncthkbg2w2oSiQIiCyFmMsVjmMlChnUGRDQz7oHtARlLF1gO+1lssfXcbi4LBlA6kbvoaPpV1YvldhhEILhZEKJ6VHxooCipQ467E+lox1lzik6HK80hxn+xxZtFjTn6O+uAOxewsjUYFNF9Gmi5EGLS1GgBECSwAuQDiFsuphEOYgblZIjFQYFWKFKvNCUNYQOINyBoTBSEchLVpKtFQYGeKI/QKPG+IOVupS/oMVeV9J5GCFEJWzBNYR2pSpimHx0/+B6M1QcV3WRIqFj36YfHaGkckplJXlT4C0AaCwSKRT5Yqxf8/PAfGA3SCmp2JQilyV2idisCq5YeOmKpW8DBIjvfcTRiFcgCiTZzfoSVsBlkRKE8mcSm+JYGmBOz75EbbMbIG07Vk0UcUzZeojsPZQjnjhS5EyxFViUpv7IuygbceAs4LIqFKKwT7sAQ8aDCrLZmdKbq5DWYvA5/sO0ApPJRyAJy4EG/gQFY0V/fK58R5xj8iK8r1lbujJ7YVvhnYO6VJ2bbkJ7BZGoxa9xRmu+9I3YGGB6ajK3K45Amo4EaOFRQvfiJxJgbU1sMmDwwALOYixlzsF3ErNE1Ykx2U4KEq4y18vPawTDFuChnGHRRtDhCUJYdo6bp3dBrvu9FzSXh8ZRNglATIGk5GEjkJDaqzvTJfaf1ULiAArrF8gDkgR3t5DHnn3zvLhM7dX3umkXSEIsS/H88cSVuKkfWB7sbe6mr37iQwf3r3PQd6jKttyM3H5Xif3/Jtgz7xJymFqJkogDuGwWKwsF0e5oiuk/JFG+TVVSd/RMhCoGpDthyFpmTM6hxA5odVENicuNE3dY7oRcGd3FtnfzmRc4c5tt8Nii5rO6UUJhfPVMjNIXyRoKZfFsPYTQzgg8ZfES9hhNcrd/YEUTpb5nUDLMn5HloJAfZzs42RRapwIfKv14AuGCBnSVQF5pDBFDqYHeh6628DMY9MdkO0AOw+ioFNAEUyAHPWrpbGl+lhJxBbKJ/5S76f3s/hUv/B5QfkADYCkAfqGGFDh/I9wgsAqlBPDvNRxzz9Keel5ZzRKQKgkAouzBThDIBWqXFyc9houGIFEDl+PgwSbFQgrCVWIdAolFLL8b3BeSFlKTkh/C5TwCFYJkilnCaz/Ce0yYr28sJTpxcAOpPREB61QNkSJ0HM+48QDGgFgcqhEkGeEwoeHOkuJ4xAZrHgOjEQYUNoSGU1sC//MDVIYFyFsSTscGob1zBpdIMmoqoIwm2WkO8vsB/6J6dmdMNMCK5m54zrCbAYWt8HUqH+PLRA1SaG7hKH09WPbAZWSZy0vufFgQEG9pJ0rQ4iyXrO8xK94XEuxHyGHtUF/51aEnqzwnOXPYDErxGC11OAylMsRFAgKEpOD8YmxcINQJURYkKbUZrFmWIWQzg7LIvuX/wqsUFgxMK5yDXbLymPLbmRlDWwvLc9BXiw0guUfXWQoJVBhgNYFeZphhCCIKwRxQm4szjlUqAjDEBUqLx3hDFr7Glba7xPVKgghyPIUozUqVJi0v+y9hFuBfqy4NisEfIUbQPwBhZSYcuGgrO/Kuz1agqRaBeU7HIwpvERH3qeiBKrfRykBMzuJIkUlDOhnKdXGCJ20oGj3/Y23YoiQD2rNTqxEID1SKtzK+kK5aEgBVmN0Di6nHitGZA4zm9l61Q/ozewGIWhtuYNVQQFFG5FAsW0TSXsRuThD6DKCouepZ8JSCRVRFEGWPTgMcH8OL5wo4/UVMDOmNKSC0BYErmBQ3B+etlNIJxEuRBH4d/sEk4q2VHVBpAsqhSYxOZHJUaZAGUNoDIH1C9r+lCEcAU7GOBljRIwhwhGseGB1WTvKAT+LwQmDk8YXiIVZQWLwsLp0BUJkSPxPIL1rM05DGEK1BlGNwoXkmScwGAoKl1PYDO1yrDS4SKCqITZwUP5uKCBREDgyCkQtxg4JFLoU1tVgNFjfUaCsz919FBNQSEWhQkwQY1UMQvlQtox0pF1ZQHekvRZGaURNElQlUuXI3jyN9iJrel2a27dzSJwgW0tkWYaoNmmlGhE1qI2vQziFwOGEwyqDCTR5qElDRx64UmLRK7t5xbnyB+N/rEOKAKSisAKlFJEU0F1g883XE4QKllrU0pwtV10DwvAbz3wyd33sIzzCafJrrmZicTeTwlC1GjKN62Q4FZZlsYe0ATKkPrhBgVQMVi89VGdWg/ARV8LLg4Q88Bokpdz7su6JLQv7GonxjZ9Dj6eHsLcRB6AE4TyqCkFZ71wBQsHwoWBwfOHDNK1sCUQt5xJi5TVx/vsJoTCFAS1ARQgZQ2GhcCBDRCVCRKK8JKb0WjkUGSZte4NSlqLbhqxDEEgIHG5pgSCUZeQxkLZ3SCeQ1qEMBAZfBijDaX+9yjAVVQIjDAEuj2CWi9rKMYaRwLkeRb6EsilrqxHVxd0cIRyHFz0ml2YZdQUUferNBsgQawTdVndPNH2wWMhy9VRlxDB8PrwxDl4TzmJMgQwjRJSgrUAXBmu0D7GzDnl3EULFyWsP4eovX8g5Jx/Dld+6EGwXdcdNFF/+HDuvvpxs93ZiU1CXIVHhzXsosHywQZj9sX/pPCo61IUQgyTfsx+kkwjkCqMpETEXYMQg8RakULa1QKEsWloK5XDWA2aFKtuPrMM4KMTAA+/7BRRuBRlCLKcfrICUVoIuDn8uTkgPj5deW1g1fGIH8gau/CCTG4SMEULg+uBs6m9cGBFFkl53sfRgkjAKCEJPVihyjdaGShRhnSEzOSJO0L0ecRKRRRFF2vedCOWRlXWEljIqcUOjM8ITQvZc7d0e0ftgroUoiQ/LIsQGIvyigSXWBW6pw6b3/xubWm2iow4ln9nJSX/656TGsDi3A2rjCBvgQoUjLUP7UoIRO8wv/fVzZeHLlkX3gSE6JAZXjgSACGMCrAVhNMSSUGTceev1gOU7H/p3sClX/+A7GA1SNfnW+/6ep7/29aRrD6E13WBzqnF5gc0Kz+eK4/22gAfBgM4BalWKDw3QJQxWSJQfMwJCoqVn1CwDGnIFp3N5VbZigLZ6j2RF4G+MWEFDGgjPuv2LIqTTQ+MaCuUOEFAn7oZYLos12RV1Ly9d70RJXtjDuxSEQYQwOSbvEAlLPYkQuktvcYl1IwlFkaPzAttzBFIhA4Vw/nHNWjNYHOO1OvVag4W5eUQhGWk02To/h66OY1SAcgLl5HDBsDisczgpPOK/h0CVWak4NSSvDL7bQFXbWnBRuXjYHIo22lnqkfBj2hZmye+6HrIO8ewdNCrjyLGQpbSFjWogPfAinH8O7KAQ71YitAPOsRqirAJXYgcSqUIK4/yCJiUBITbvg+5hsj7tW5dA50jhqAaSbrbg0wiTg6rx1Q/+Exx5AiMveBlm1UZq1Ya3Gl3sITn5EDbAvepCwvqivJAYrO/ZEwqkQTuJlstGpBw+nMB51WZfffWFUyEQLsAS45wqWQtiT/no/bx+Ao0QtvRboix5lpzDUmzAimWpP1GWEITT5ewFU4bXIIgohCckDGteAHGItTmx61ITbZKiTZL2qFAQu4JtV92GyzOKXp9+lqKzvHwyJUJJKnFCL+3TyQtUJaESJ3Tu2sT4o87ltKNO5LasTTdsemRaKKyUaAS2NEL/kC2H0P7cB/VTWRbQfUnCyOWsRjqBdI6iV3iRptBrqLisT6fdo3LERvo7boe5OyA0XPlvfwfHncGxz3kpQWOSRWvJ04IgbBA4UNaTMzJV3je9XOYYgHvLpZ8BFVIgncA3vUhCGSK0obu0CJ1FrO76+yRB6g4FBZVGRE8XuDTzBwpjUDnjh66mVx/F9CzCWrIs8zMYH/oGaOFuI7hWMCVKzzDwbKysEzpLgMbgPDF3xfwEDwgotAj9QBRW1qvsMGTaHxTUCYuVxo//shI1gL/d4LxXhqQaaQ2x1UTGEFlLaDMCMsCiRUwmYwpRoRAhVngwJ3YGlbcZESk10yLdfht6bisbD1vNo047maOfejqVJKGWVFCRKkN6CMpqji1gYtSnPKKsfD7pGS/jlk//OzPHns5hT/pVFmNBGoSkYURfhWgZLkcmDBQEtOfUlnmWE55ML4iWqWSl1x4g3NIJ4kqdTtb11yVUiDAhE10OO+FkbrriuxBmUCxCRzHa3o64/RpWH30izjTJKqNYnflSlAuG3nngiD3SLFbUH5cXZyeMj5KtRVhBICUJApendBfmIU9RFBArTLtFTYFUkoV+DrEApX1OLQx0F+mkfRbpILMqY0lC7JSPtR8MHfH7Y3xSQWE05AWiOYLr9qCaQM/ghEJT9oGpiKKbESnphZtihe1nhMpfo8IZz14XElvkWGcQ1ZBQxWT9pWFvmSzjTrOy12V/8KNQ4pzF5AKFxPQ0koCJiVHmWou4wCKVw+VdGiFUiw6NQjPmHDt/dgO93XchlWO+lZHnjuljT6aW1GmOryIMFSLr05SG3Xdczzv/8nUcP3EuG/fTd2/5yn/7vcEdcvSz4MhHcupzn8v2XFA0R4EIohrk5aJoIVY1svYiQaxwyqGUwjgz9IQrlbzdILS3EnqWOEzIrAQNqYCk0qRd63Hs857Pzf91NRiNyGdYvOFSFm++DirjxE97HuvPehzd6iraOFzUoNfPaUZ1+nkfq0oPPUw31B6giC0xklhIokDRbS+SVB01YVnoLEKjjp2bB50i0WTGeK51gAe48MipOvJoznjJK5lpjjPfF9RGRugsLpIIUyLb9qHtAZUSKGcxCJQu0KZAFgKrMwIZEDiJzQ0GTQ1LNEATnUEoz0TzN1+Xs88L4sBSixwt3UMECWESISKJyfoo7QeKZHiBnf27BKXGaC+HIEaREFchEoq5ndup1xOsKQhtiuvPsSGsYBa2MXPTT3nEiY/g93/rBRw6VScKoG+gm8OnvvA1vvad73Hz5m086glPZHKkzrbbb+bT7/lLJiJYcwAb+DcoxEf/5e3uLe/9MDsu/zqTJ5/K2HiVW9otbJYjx6awqQPtyLVGxQlCeTJzYcDmBTLeK4opC/HWqEGJ10+MUsqXm0JJkSjE6jU0VA+CmKpo0+sXwByoHLIe2YX/x+1X/IgjXv8mWrKGkYpKre6Nq7CYLCNsVtHG3V2XszREJ/w5Ct0nLsoFUHdZ7LVgaYEkCLEmQ5SMKLuSpFOWx0aSJjs276QfbaC56jD6WUG9XsW1FnwXzkM9BO3nKc4UJCpGpV0Sq6kYS2a7JDIkEoqsyNHSMSYs1bwHOoOih7a+NBaEYApVwtQ5ocioyZQ0d/R6c4hEERiDyHrETpIkVazR2CDBGDkMnfbJBfZBja7B7J6nr71GSLMSU4sslWyJMO9SNW0mVMHlH/kgT3vco/j8h/6MvAcnVJefnG3g1oE48bef5v7yt5/G77z+TXzzQ3/Ns1/x6zz/8acyGh5Y4xtsv/HMk8VvPPM9iENOcTuuu4yzfu23OW5kihkjWJo32GQEEyXYdhs1sQqjDcVin7BaRYURxhVA2WGwIj60JT3RY9iKwArfJKsLujIiqkqK0QmQI9iiAyIFB5FuY0nRLQVWsE63MNWQBZGz1FsklTGN0SaZjtDOrlAzt3tFND4Mjihoho56JcAtbGZC9di6OAvOYoxGCd+Z41bwEJwNkIRYFzL/w+s47rznkI6s5ualFBfXyXRGQ1qIgoe6B7QEgSSQkvEgoJhfIHE5Ua7JszaBEkROkVgwBYy5grC1gIoVpux00hrfCY/xBmhSoqWdjI/ERKKCCQKM9SsmOiNBoQpDv90jnljDkjPo/TBAGYSYhQ6VZhNpckTRJ3FdbH+G8QDmbv0p//jW3+SkUai/9omsHxhRdc+PWle+Pth/6J1vdof8yzvFK/74j9xpR65jvfjFSte4zdeILeAOOe4JUCge9Wd/zdasz5LJ6KiEaHyS/tIMqJixNWtYuGsb8UjDg1tYREmeXi4LWrQSfiSgkwROoWVU1mI0bSuYJ4RghLS7AEIgI0cVS5rmSL1A3jJc8q6/hnOewBHPeCFBrcFiXtDqLXgQRgVebAnPI3VD9o7PX6UzNCJF1FlALs1w43/8C+Ks45m77DsElQq20/VzHFeYryyXjADIrMOFAZd95GOsf+0GGoceTRpX6C4uUm1Uocge+h6wMJqgyAmzgpmbfsKo64PKwHVRkcAWDiVDcidY7PdgZidBt4XRBmchVh7Gx0XoICbvtuhcewUmuR0bVLEqRDtN4fooJcldgFE1ci055NxVpEai99H+lLVEmW+XylpzNKoKmS9iO3Mc3ozZ/uPL+ec/eB3njMKGB+i9DqnWBcDH/uEfxdv+9u/dU04//Rd+LzaAcDd9l+f8wTvdFz/4Dzz2Za9kMdDslglLS31qtTF6acbCju1UxsbQOvcS/2iE9aRyVPk4l6RlqXznuLXK6yFHgRdXdgVpXIc1R/qSxO6dWPosZgugJNVaRJ6nsONOuOSbtFdNYg4/htqhR9AyETGKQEX0SgOS5aRhM6DlOIXAki3MMxn0uPb/PgQzt3LzJ78PrkB3NTEhBcWeVEkkqqwhRmi0kph2i8nREbamObmVNOsjLCzc5uvOD3UDjKKIoOiT7d5N8a2vMzt7B/R3gex4CpeRXu5Qxj6H0Bb6u5GBwSkotGclKCxFrwPZJm74yqchc/hO+gFxxqunUQQQjsDoWtIjjkNNrgf2raAqsYTGIU2f6XpI1fVJl3ZwxuFr+K0LTmPjKx/LkQcgbHzLn71RfOnCr7lNm+7i91/3O7/w5qkv/PObBMBr3v8594H3vYvDn/MiplZtYL7fY2J0NQvaEddD+nMthAoRDArw1tcMZdn3qTREAVobzMBAjfC6Ps6RypjDXvPHrLZdfvjR98NtPwFXQNXSay+UJOwcOhHV2U2kFLSzlGD1RoQaR1tf2xUr5CrMQEumnHlfVYbdt90AO34GxTyoFHo9BCGmlLp06LKc7FFU4xwWgyPH9BZhYpSfXPUjxs55MoGKkGiq1foKEsNDmIpW6IxQCsaUhKU56Mx5WFrPgd0Neje4RejPQW+OoD9PBU8zcg5slKAJsSjiKADXh3QG8pmyQ2I32FnQs5Dvhmw39GahN89YNSgpavuB4gYZ9OeZdD1mf3gRq3Zu5l3PPY0nK8SRBzBnu+BZTxPHHXPYL/XevP81zxNPOOUY7vjkxzhiaZaTQkutPUtIm8XOVmhID2Q5hXIryzDWG2Fg0JHFBBaryvavcrKuKAyFC+g1priNGif+zhs46U/+AkamoW9ImmPEyhGFKfS2sunLn6L1nx/FfeozrEs11UpIJvSQh6owKPTQE+IsyjlGkpBtN14Ds1ugswu6HYS1KCyhCD16SliqN0gIBUQOjUaTg0p55u++ikc86lTPnglDityQZQUYt98mdIA64rl7Yxh7U0zEnocrWffOGKJA0qhEfvVzhVcczlNEzxFlhqjf8Z0ORhNTUEF68dYB3oz0K1aR+tqgLQjQKDKE7kDR9Stp0fWFsdALgkqdD+V79il8cAVhZ4ZVLNG7+Uo+9fev5f/e9VoO+wVJjT75KeeL737jQvevf/+OX5qSzXc++i7hbv6WONSlXPKP76CxuJ1p3WZU9JD9RSJdEBm8ZouTpcSIKnVdwBQ52uUIpRGJK0cPKIQMMGFCS9Vp16eYrY0yP7Ka8978N3DISaRLBTofjPguoL/kjXpxN1Mmo+h3yuKm9ijmgDtrA5SByBZUTR+3sBN+epWv6WlLJSiniiN96arkFQ/bskpBIh2ADRQ0R/ny579EZkDFCYtpHxGHXmPFqGG3yEE1wCBIMMavOsZZDAakQCg1ZCZY9hLGGUTcUpAWGX2b+ZtTizwT30Hig0gvjuoUxAkFjoIcWzIhZBl6JMIrqwkHunBgY6RIcA7iWrR8WFX1hExTYHQ2XDP25ScxGev1AnM/+DIvPXMjH/qrt3DYLxgsecJTnyVWrdvwS49UPvTnLxMXfv6/uf7f34244UccPruVjYszrDMFFW0IBzMdUgGmgigiVCGIrCMUGqsynMh8KiAdhQrJZYUiqJA5xYKMySYOZXu8liOe/gqoHoqgQpF7RQmB8GWm+Z1UdJ9Iewqa0BmVWNFf6iCSceJolKAQ1LotxrNFxs08uC70eiinEKkkJAJCBCECRxRIAjSRK1BWlx5ceiUF1eD05/walXiStOcwtZC2NDTq46ADD8SxTL87KAaolCJKKhBFhGHoRzlbjdO65G3Ke2HA+BkAUdIgkwnENa/dn4zg6uP0w5iuatCrTUE8BiIhp0JOhAy8I7OlzHxeEqydCiAeQ6sRChoQNchsDGEFKqtANsAl0BwjHhvbg5n2QLfQWn7248t5wolHkfQX+PXnPY23/NWf/8K900t/5eXi/R98n/vAv7//l6rp9sxjm8Ld9l3xyf/v9dz8mY/S+dF3qc5vpV4sUZMFJu8S1uueyJ1pYpmUZHqWewyd3ePRM9ZAkpDJkDkNS/EEjUNPBNVEUBtyS2NpIF0E1+Omy79L0C8R80DQ6XeorVlD1uvSn5thVGdsTBzVxc1c8vEPwO4tEEqqUYx2tmyj9rVlh1dRU544ROBVMsvJXFXECWdSNKfomgAXxqAE2mReHHgwxWsft/2tQg+3drvtuXEixxiDc87PVA8CnNP3eQo6l3SlxOYKVh/lgZKRMbCLfsWj4gGYsOI9Xton234L6L6XmghCcI7CGJAKwlE47HhIy2EccUkpKlKIGtAJvZpyfYybZ9vo6an9+u6//3uv5+rPfAgrJNo6zj//6b8UY3jNq18rPvDvH3Sf/swX3Qtf8OxfqNdt97a5RnV5RvvZI4juxZ9CHHKS23XH7Rz/kt9iZn6OidUbmOnuQjVX4QJJr90lij0QFupSEQ/pczDr0UdtclQk0EJgCSmCmGhsFQQVXJCA8WlZoHsIDE5HzF7xPRpHHkMy2iBNJiDrEwcGYZYYVRkTtkd9YY5L/vnt0NoBtkcYWPppHyNAxRqTG7CSMGxgCz3EQpMQCgTWBlAb4fCzzyMdmWBRhLg4ATmYYZJ7+N09GGQJ45hKpUJXqtL7Wa/Hb+19ZkMOr2BtRUA8uZ6pF/wqddcnDjMK12OkUSe0Ea2lDkQxI0XOxI6tfPUj/4zd3fWrqi6HO0gFY1Ow5ljOffFvYpN1FGEVHRa4wGBsgXQh9BQyrjHjcpqHHc6mxX1nM1gh+e9Pf4av/O0f8dizn8QH//atLOVdLvz859zCfJuXv+rXf6GG8Tu//WoB8PnPft099/nn/8KO1aiuEz+44utuabHN377zH7FOMj29jut/dDE3dwNe8NTncNTvv5GlliSuTJBlLXAxqjGKy3LPzRWawA6aCy3S6bJvM8NZBVEESUimQ2Y6HRhfhe7cMSTZaKAqLd28DbN30b7hRxyy8Ui0iElChZ3dxoRpc2jkuOQD/wS3XAumC5GFQqPTbBhZmoEGaWgpCk0gA8IwwuiUbgpOOag2iE48g9phRzEb12nngReYtoZIOF9ekfs/WOSAGODS0pKXPwjsA9fJF4LUwYKVVCfWsJR3sLKglbVISEiI6amEWqWOrBZMWokVsa8/CRChRAQKm2W+50wruvU1dON1dMMaqcixqsChCZHEYUgQJSxmHXbsmkcm9f0AnyRhc4KPfOlqvvv9b3PlV79JIAxrVk3x4yt/8ksLDW+6+ac0vpG4Jz31cftthNfdeIObnZ3jgx98PyONBr1Om7PPPhuhAo49/gTe8GdvY3rtBkQQs2tmnt7cPHR3MO2WSMI63WwRXZ3CtLuYRhUnQpQLUFYsd97jhv8fWoO2pYSICMmkYk4r6iecRGfHNYAi1YYISCIBaQ6mD7dcy9gTnobOYyr1UaYiuPw/PsZdN/0Q8hZ0ZggV6Dzzdb0gxioD0pGnXiU9koIcgXYOazI/B1YAUcDYUcdz8pOfxV3hCAvEFCr2YEueIykwZKVw70H2gLdt2+y2bdvmRzihhwYo5Yom23t7gMuOBhHF5LmnBOUyIq41MUmDrjHkVBBjjl4gmG3vZsI4CKSfFZEaXNEvp9wqL6UgA7KkwVLUoCWr6FCgXQ/ICYOAuFBYa0mrVYIkQmd6n1EsLRQdlXDTzCLnP+93OP/kIzhl/QQjScTpZ5zKhz/8Ufebv/nKX3jd7s/f/EYBcOWVV7kzzjjt5zreNTf/1F128UX89Oofc945j+LcRz+WXTNzBGGFK6+8iked81jq1QrT09N8//sX84pXvJJKrc53Lr6E2+/chghD1qxZw0SzQdyIuPS/P8rxL30lzdFDcTqnaI6VKVKpECQiBLmvDwovL6KcR0+VKFUFCg/rB7UKh5x8EtdevxpmtkG/S2GhneZIlWC1gZkdTPaXGBtfzeLMVi7/z/fCHdeCWYBsgal6RKfTLccgRH7UgVUe4MMirfMoK4ArsM4RBBBXBN0eLNx0FxddchWrn38aRVBFqtgzbYRGKYEWd9f5OSggzJHrDhH1ep0kTiAMCYIA55xHRbW+3zoa0mDJ0CYltQXGOnIDUsVAhDUBQsVkxtLTOX2TlbL2+VB9Tmjn9Ux0AQIKLJmwpAJ/oYIIVEjhoCsMPZNjpUPvZzdErgLU2o0sxGNsPPVRvOHNb+RH1/yUVBt6WYfb7riJ7156yS8NKPn85z/PRd+9+H6Pd85jznKXXnIRv/fq14nnPuuZnHXaqbSXlrjkkku4a/tWjjjmaF70spdQGW1C6HjX371T7Nh5J9+/5Oscc/g0pxy3gWc8/izWjVVIbMEnPvABuONOJlCsTWpUtUb0e7h+b9gnqKWXr8yVpFCCQkEuJVbGYCIvACpCsDmVCOoTNY46+zTfjyjxmjYiwBH7D+z2me63Gd21iZ+8662w5VawbcgWWFUL6JbGJ2SEUTHahB58szFQJxQVpAsIA4CMsGyy6XadxxzWH8UZT3k2WsRIERFKSYDx05oCSBF+WvODQZJCDuQBtEZrjTHGh6FBwH1pbwoHKgnRaQ7WEFZjjAJdpOX0JIXQBqcdxmoqtYTEJP6NxhtbIMu0IhAUzlOgnDM46UrdjxRGKj70SVNEmBBEikJaXLeLKLmE++oBl2RCtrTE4RPruWUeXvmHf8rm6y5j/fQUz3rG+Xzgg+/nCec95pdigH/zN28Xb3/H37nHPeGx9/j3d/71Xzjj4OP/8Z/smtnNtdde47Zs3sb1117P+KrVHH74kczunOPRj38CP7riKgQB3U7Oty6+2I2PT9Hq9rjiqquZX1pkfnGByVXrQFQ483Hn85zf+2Mu+vF1rDp9HJFMUGuO4gJFgQHECrFlOZx+5DW0Qkzhoc64ogiW5kj0bmQ6x5mnPIKffS6DSgwdH904WzYJ6z7NosO3v3ChZ071ZsB2iChodwsC4R2qkWCM9bWMKITc4ZyXlFAEaJ16retSsdJVYhANiEfIkia5U1jjBcKcSCHSaOMoCgky2e8BPwfEANetW+c9XhxgjBmWIrD2fn2sSUtPFofoPPPzAGSZqFtNYEOkVGjlyxo6z0oD9KGjHQw9yh0kEnRGJB3olEDF2BBs1vb1JwXOZF4GWDp/Q/YjhDcioIPCVidYtBF/8eGP8/gNDTZf8R1+69nnk7X7vP5Vr+Q7X/qCe+IFz/ml6G//xZv/VLzr397vDjtiIy863wMzb33HX7lD1q7jrLPPZduWnXz6E5+lnxZs3HgYRxx5DJu33MVFF19OJWly4kmnc9t1t3P88Sdy9HFTe5zzaSc/EoBNFmdK6VCAnTm8+axj+MKJL2Hx9kVWvfTXaSQhraUeIq6W8vB2T1W7El3pl7ISFWWp9nezmiVaN13O9z/3Ydh9u4f688KHqKIU2rW+lviBd78dMg2h9N0UMseUfIDcDNqLrJ+m5SgtLMUPajXUKwk6TTHOy9ZkFlB1kHXOeM3vMRsnGKEIBEhboKRBYxFCkag6ZAEPCmXs/amDeIXm5ZaSZV2VUk1pMMeNFTPdXTk5x2Xl+goCVSqUeZfoS/8DaTrjh74MGjadOCATWTyKG9MDNrWWOPrwY/niFV/jGx98H2991St5/nlnIbt9PvuZL/LEC57zC7mGm2++0X3gAx9g59ISaw7ZyLNe+AL+5HdfI/76397j4HwATjrtFI5cfyiXXXIZc7sWWLt2A2Pja9iw8VDe9Ndv4Xff8AY+9qpljunW8urcDm5hES770Y18+5KLuH3rZgolEXFIhiXT0Olbqo1JMh3A9KHQzpmcmGLTzh1UJlbRdcWgku6Np1QMGAruCkelmaD6S1T6syzdcBlbP/pu1IjE9LsEwlMOjRvUlBVCGJzLIeuU8hRl1K1KMULjlqURlUApsNbgsiUAqtUE4STdftsT0aSgZxwEdV8nnt7IdhcwbyxFLBHC4lvDlxXcA6PAhA8OD7jPoauTXv1qOL5MrghVlplNSpYa1DbAiNLQTOiZF0Lg3KAj2s8at4OQBz+TQuCFfPw9WaFB6g7AEmIFECOn13Pn0hZGjz6BP//3/+Pv//WD3PLNr7CqmvDSF7+Ef/nHf3Kv/6M/3Ger/+Sn/tddeOGFvPGP/5SRkRF2z84iRcHc1jt5+ctfxFyny8xii5kdm/lev+0OmV7Fn7/jr9zl37+YwzceijSO4447gZnFeS540Us56RFHCoCXv/Ed7r8v+j7P/fN/dsHEFEecegam2sRUa9ikgghDCusQG08nOuY8pAjJck2aa5wpmG4mmLygpgUTp4XIKKFjHXGjRjvveS2YMt0fDGgdjBozAqgn9HoLNNI5JuwC1372I2AWEDvaTAYSm2sMkAGFKzA4ZCBxovDRTzlmHOdTIVcInLVIBAGOQJfYwOCOSch6Pf9chRCIKp3cIeImjEzSfPIzGT/nCfRWTZHZxDtQaXBmue1XWkmkvVr3fjE5eBB0Q0insE6CsiuUy5alDUw5dQlpvMIZpfqZ8+LrZiD97krDRAy1ZKzwQrESM5xlwPD9Azfm9g9KznyOkiogqBA1V/P9G69glwn5+uVX8+rnPpPO3DxT69bz0zvvdCdu3PiA7tj27dvdK3/zVXz9q18TL33xSwD47Oe+4I4//ni+8Y0vcfwxh3L5NT+icIpdu5do9Qqe+IQnM7t1lou/+X3+9u1v49GPfrQA+NI3v+3+8A1PEgA39nG/86fv4PtX/Yw1p53Hsc95FW5khCyp0Q5CiqRCx2hEGGK09an8YPSQlIQ1L4u4mC0RVRy2ndFIqgghWWi3icZHfYdBqQAnnSxFfuUyD0qAbS9BaBitBox0c5jbDmkLsHRyS5UQhSYou/1A+9p36URD4bMPHDjtcNZ381VEgHM5foC5f6z6Xu/LY4PKL+i5jaA6hnMxyDEOOedJzI9MsaDLEQqS4WQtUWoSyXIsmj8R99A2wME4iGVhXlcuayXNx6nSa3kdULMCdRJDw1F7ALvLBliOIxs+CAMpQ1muyHgir9jXc3dE1Yis0wIREY6vozVr2Hj8o/iTf/0Y//uuv+bdb347v/bcZ/KzzXfxlS9/lS875970+793v0d8+1+/zT3tGU/nrrvu4r3vfS8f/8T/uGqjzq233sqaNWuYW1xg3WEbaaxby1Fr1zIxtpZ/+sf30Jrrs/OuJd74B68Tb/yD1+3xmRc85Unibz5/sXvzn76Jw576dNafdA7rj3gs1FezIBVFGJHLgJ4zWK3KCULKi/tiUUoShB7lxkBPaxwKVRuh0B10rcrSwiKViQlPCVXSdwxYibKgnEQ6O4xCnQTqVcJsibzXJet2vNamq6GDBF1YsrwgpkDKrp/7aCEfzNURXoM4GOizGs8ZDQnKDnefiBQEpFaTI33YWK373HLVWhjfAH3L+W94E0tRjc1OsVCEfhKSK4E8JFoGSOGblqzI/KBZWTzURZnAycF8eLn8Zco7JMq5bEMR1uF01FIleTAgcTCPfjhfvhziiCxzSln+u+WPkcNhIvsTgFp01iGqJ+QqpNi2m/rUeubmthA3V/Nfl97BH7/jL/jR937A2g2HMTo6yhc++9n7/Mw/++M/co1Gg3MedR5bt26lKAp+8pOf+DgcOOaYY2iOjlAYzdj0Om7eNsf3Lr2C0896DG969z9R5NCMYavF+dAddszDRVfeyBv/7E3QHOOU3/8r+pUGN2uFmZgmV1VyIyhM6SLCxEcVRYZt9SEMCMMYsGS5Bmt9H2CY4FRA2skJ4xrzrS6qWqVHydHVRflZcnmxBYz0yuBOSJ+/FYJQhoQDLrDtg6tAHOGUIM3mga5HzeVw5uswpfR2Lsr/D8jsQC0tQkUx3TyH6gTEFY+0BDU48nDOe8mvk1fG2G0kP+pAuKqOaI6jCkfiIDPWK/EpgXMhWvoVwIqMQuUQpA99VTQr8uHAlmXj88BVaARK+5VOC4ZNl55RX+CcppTlJMKSupzlGRLe4Hy0Ivc4pnBe2VwChbD7HkQITRw5sqwLPahPH0pnZobIVZFrj+QzP76Wb3zj87ziiecx97M7WFuv8ZjTTue3f+Pl7h//9e9oNNYIgM/8z/84gJGREZ75zGeilGL7zhmq9ZpHk6Wg1hhhfn6eW352K89+9rM57cQTBcCF1211l17/FT5+4b/wL1+9ltraDeRhQnVslMwZnBS0+z3GV63msNe9mVYRsK0x6Y1OSDKdYnQPFVVQSYApnJdaEBIZhoRJhClyiqxEq4MQwtAHKLlGxRHWFhS9nDCpUhQZwVgN2+1CrVEqYq+k74GWFheWoX9fM1qfQC722d0xnnQf1njsn70VGVa5/MIvk/7sKtjR8gi2EwgvuYss9bCFUBgKH0VFCpsXIBWNwzZy1uOezLe/8GVoTkFzEtYdyalPfDqZrLA9qtCtVOmEIT0R4WQAPYisIEhTJhsj7NbFCnVtCzIjV5BGGQRFOT3qQWCA4m6kVHk/OZYsh3i6khnBEFESZaI+1L+2eAKvA+WWUdJBKiDK3MDHJbqUtC9nw+PnNDgx9I3D3MTur/cGev0ucXWESn2UzsISqIhKfRV3zm9iXXOauzbdwWMfdxZ/9bq38vsveyHKGU4++SQ+8rEPoY1xN/zkdl7/e29g9+7dpGlKUBT0spR6s8GO2d2s23g4i92UT335a7zyNa/jcS9+EQVw0gte7W7eOkNha5z+nJcyff4ELSuZU5IsiHGViKW0TxiHuLpgR2GJ65OkhcLaCGxYttwUICNEoNB54QnsSdWXeIqMvBBICWEYekVQ50EOpAe9TJajhCBMErTzxTTd6Zerph7eUwsY4cWb7EqZ+0rMQmsJZ6E+thpUg+Nf8ypmm9N0+hmnPPcF3PzdkIVL7oK5zQTlsJaB+LxCIQiQvgmuDG+ASoWxI4+leuQjYPWtHHLBi2iuP4qdrYK55joyBFkQsqAL1OiEr6tYQa0a092yjampKRYWF6ES7qmqXmrOmuUHc5/zQDdMkPZ708sR4sB43MpQzROSrNtTgNchsUqvgDyX3+e/oENI50mv1iCtIXDLvEFjM2QpVS4GI4lKmYgKGqF808lwqAeUgxy9MoX/Xe7f+pU0yZwgy3pQ8R3h7TynHo3QzxXrjzqXx7/sbXz1w2/lM+//L85/7CM5ugGf+b//4MUvfimnnPxYbt+8nXq1SmYsMYKlTptb77iT2XaPV/zqy8QmcG/576/wPy/+XY582vMQjVXUnvJaDkPSUwGbZUQhPPhUyDIHBkhqy4onoSTVXuDYD5P1Y77EihkUoCAsKX3gycel8ThXSu8PQno7+DfeHPLBINYgWJ7cbNxwQrITYJRP+IWTuIJSzKeNaQryfkCHEQ5567vYVWSI6hguztjZWeC4c87hB1/6HygqxGgkDhMG9ApNgle4qxCRk6LT1POEwwqHHX86rWQNJ7zmz2mFY2xXVdRhTXb2+n4kQBiANlRVSLurQWtMXlBpVFkyffoVgQ2s93SD2ZIGEhMQmGiF+rkdDuN5oCD6ATFAsTLAHyZV5ahUsdJf7Dk30MlSwUosG6+f8eZw0mKsREnrmQ/DwZ8DdewAhGAQQOoSsRqsuMotAzzLJ2qXAZuB6LPZTzrfoKa14gZYCbkM6auEuTRl3SPP4W8+9DWOm17LnTPzhHmfQETU4xpproiCkGq9TlSt0k57bGvlvPmNfypuA/fyf/mE+/gnPk3z1PM49XUvZiaXmNokm3OHVpGXrpf7cs/M3aIVcX+83buBX8u3+W7Pg11BNxxcJrFcXxIOnJGISgWXZ+S2ws40RQaj1FZV2L2wi1WxIzEZ83fcBsZSr9Rw/Xksln6REcVVTKGxtuyKx5JEMUUQU7S7XPKlL/L43ziMqJ5Qq1hSW7C4NI+sN5FhQKe9SH20Tnv7NqhPEzeb5IuzSFfgogQRKpbnYGikFQgjiLQkXJ4+s184wsEtxA8GlQxHGZfGt2LMsZHLY4+NHJQqBj8Mh4I7QsDXAY1QGFFOT1opOrFyXDJloX8/zz8s1Vy1UFhphxNx06CcfCti4voI23tz/M4Ln8RaB71Nd3L1xd+nt7tPmrdQIuAdb3sbT7rgefzx775S/Mpf/asTa093Rzz3xaw+/lRO/M0/IZhYy607d+OqDRoTE2Q7dhLU677o/BDdpFHYHYZmc5pMa+KaxNqUottizDmmekvc8Pa3wNwWMF2KokOiFIWVBGFMXqQ+OpJgA4HLIdc5iQoodB/uvI7vvfMNHtg58hGc8qu/TRyP0rWa+SVLtGoV/bwHzQiqAVmvg4gElSCh3eoSV2s4J1FWYktAVA74HMORc/u3PTjKENyDrobwRmKF9LxO53CmrHuu5BWu9IgEfmAkQTmnT5azxuWQkypWgKkDQZ/9OffhSG5RDjUZjlSQpDIgrja5a9ciuZC84W8/xqf/8hW892OfYVSO0ioUm7Zt4xuXXMT7/vez3LJzjvD0C5yur+LJb3sv21LH1qjBXG5I51Kaa4+gleV0d+5EjDW9LKBQ+xlGH9x7P1JvoLt9/6DHCuE0Yb/DWLHEtiu+Bb3dBKRI2yNWIR1TeDJGoYmqVfKiVTrZMgUxgrTfR2CpRiG97k4PrvyszTXv2c65f/AWFjNFFI3R73Xo510qjVE6tgDdxsVRqZgOQlsipE9zrPRTntjPuvGDzQPukYe5FSyx8mfAvfWu3pVlhZVbKQI0EBUoDc+UOZFdOXfQLQdc7oA8tH4Msud9W8/IKetclNOGerFCjo7RzgPmZ3fwrs9fzeFnP5FvfOyj3LT1W/zWn7yWN/36b/Git7yDq77zfR75679HJxrlxy1BML6WLGxgRyOEEMwvtSAQRONT5P22P75UD1kPiCjIzS6goBHX6M0v0qg5xlWbqaWdbLv5SujsJAzAIOgaixqdxnRagCLv9mkqgTaOXIMMq+SBAFPgrKbX7xEpMLZAuQ7Z0g4ue8ufsvqpL+Los5/CjkIQrB5n89y8V04YH4f2Ip1eQWN0nKKXl2mRLEFDV46hG4Th/094wME4q5VfZ5m4O5woNkjyy+lGrBBfW04ylt9fTipbkZTIISNDDHRK2H9KqD8/N+RpCKfKUxIgAopeBlrQUQnrjzmZKzZt51VveDpPePKpnHve8/n6b/8x6x77eFYddRqnnf50bp/p0Jg6jKQ6yY6lvu8KafWg0YDmGBQ9nDHD4aDiwNBaD8qmKFDFbqoiJ+zsZl2tgujPU+vNcWRNcsnN10Go6BeaYHQNjcYIj3ri4/nqJ/6L+kiD7lwPY1w5pUmRF4VPAQLl6Ys691OiHJh237exVQU7v/BJdn79WzB1CKe88rc5ZHo9m6Wkl2cl0GR9+5SDQAicEH6gqywxpeG0ZbtiQutD1AB/PrqaB9SkWxZexlIOb7Q+LHDSI3tukB8OyhV7zgsYoK3DoFTY/TK+XLk9FoKhMdgSjbGSxuga6LfYtjjL+ol1POrlfw9btzL1hGdROepYWiJge6WOFiHJkYezZbFDvVbe7Ughkjqu0/a8qzSjcAVjE+P0ej2Kh67/I3A5amkHtHay7dNfYNuOndAchd4CP8iX/L2qTkJu0KsP5fEvfSmj2iCSJp25XYShoKslKq6s6D/18oNRFOJwpLqgXqvT6vao1pt+onCUQ28Bdi7xs29+lcMedwETh26k22pBVUKzSj/tgvKpjAhYgeyCsQdu0TvoI6oH88mt2KucUnq6geoyDpQVBMMH21OQvNlZnNOeMe8MylqE0mWZ1u7JXRES5VT56gCFtftsgMuDYgf8Vbc8ixrAhvSWUmxWMN6YYj7vsu5xT6WmJF0Ns0EdUR9jod32tbWuRtXH6LQ7iFoCLsf1c8/qDyRUQwSKTtanMAUyiHgob5VqjZ3/+3XOfe2rafZ6fO1v/4FwdJRi1xKNJzyDEx73eIJaHWsMi+0OP/zmhbhunygOyTM/XckQ+LKIEESBwBWaPCvKMknMUjdDBDG9TttPacrmSGoV0t4OOpd+n+t7IZMvfAnNDdO0TM/3JqllzrAb1ABLL2gPYMRxUA3QrXiIhWU4Z32Pf1MYT7oNIqTtEKIgs6ighsw7KEqJARXRM4WvbdkCaQuE1WX30Z7DzAfIqLd3s9/fYQ9pghUvSAcBEcoZRCTJtAFVA6VZkAYbhOQ0sWmACEfLBUfjco1UEnTqh2Gqso7mzIr2MwFx5MGBh4ixub3CtUIkdCtTcNZTma+uokeLY3/rd9i4fj1fe+s7WHX2+dwyOkpcS6jOLzCtAnZsuROSgLywvvulMuJ1YqIq6D7SZljnqEWKbm5K0E56Qaakik2XPGzX64KLfN2z2yWOYy8M1VqEJPFuLqyWxNNfpAs62DdlhSEOXaCwQz5oo1JFGoctTNnOIn0YkGs89OHzPY9FWHCaKFCEKhjyPVd61kFO6cR+jCXbu+a1V5SL5O6q4C7AEJLJmJ6q0AsqpEE8nIQ7qK8NkFU1nHdQzjwfhtIlbW/ltOCH6GaEgmQV4+c9jU2FZEdcZ1dtlBsXczjzicSNdVSTMbJOzlgcEeRZGfdbUA2oT4McoX7yuSBqQIVM1iiQdHMvLWGN9MZZaXjeiaxgVUBPAZUGrJ3mpBe/iKBZZ3erBdUqIAgrVWh3yizGLo9PsvsuwvvgzQHFMgK6sj7o6VAlm1NKlAxxKoKkDjLE+EkgKCHo5ZlfwYqCXBc4YZCBn3U+ACz29rx34wrsSxnCCt+ls2J2/YA/Z5F+fMCAtSiUHwgire/4wKJc31MD3AoAqQSNLNJ76z3Cc7lX5ds+dC3QBbQX+jQmR+hXRxiZHqPoWO767Jc48VnPZ5IKa+b7kPaQvRm233AN7F4E1SybtWtw/CmsPfUUbp3pwcIMLgGW5rBS4IoC4sDPozASZAj1EYhDH7LKOvG551E9/ihu6+XgBFGlQb7UgiAiChKE8VzTgmUQRu2nHP2DxwCFXTHTe+WXkgxI04UxKBXiQkm/36LVz7zWjJBoQkQQoE3uPUJSh1rTX2gZEEYROu+veFDVchFQHIiHV5Yea+BVB585yBnKaUF2mXvqBr2Lg+VUFMhyEPfA4KwQ5SIxAI3EPXvbu83feIhVIYCp6WlmdmyFdWPs3LKDsYkp1r/opYh2yvc+/Rn40fdhTEJnm5cBbExwwe+8nhkbEk5vYKZfMDYxyelHncx0PaG7YzMXfe5TuH4LNt8JG9bBtu0wOQ0jIzzmJb/CUqoZX7uOrozYpQOu3b2L/sgUxDF5LwUn0b2UkWqTrJ8jB3Q6SuTZrag/C/H/gAe8h9og5QNooRxt5TU9UyX9PLkkBjmCy/pexcriRXJklb4W5ELSbXVRSVAipf7qefKaOGDeYzChVTiWG0VZ1j5xZUOnHeaGw/irHGSpvZjUIB8ujdCXVdTQyAetkpIBJa+k4KmHbhlColmY3caGw1azZXEXslqjXxSMjSRcd+EX4caroBlAe8Z/+VoDNqznpg0bmLc1ZDyCqoZ0hEQnAbcsLdFctZHj/vAvsUWHWz73Kdae9yicc+zYvJVjTj6dn3Ut4xs2cMXWnUysW4erh/RndyPro9gih25OrV6nMAVpmpZsJluKCYvSAAf3XT7EPeBehidKgZ49FnkpMWkGlQBVr6FbfngLONC5Nz4V+TG5WoFVFETUR8fJC4E1WYnwLLcpiZXew+1fGcLIPcsle6ScA/Bn4B2H3R5iBQoc4YRe9nYrm4bdIB+Wey0Yrjz+Qzj8LL9NfaTOli1bkElCpVYlNS2WdO6N7og1PPuCp/GjKy7luHPOIpua5AYt2FqfQEST9NoFQeD7IWxVUZuaYqbbZjGw5BZGXvZqFjotAqUYnT6anSJA1etscSFi7dHMS9BpihidxPYysIqw2gTt9W19J7xFSYUVFoVAGnFAc++Db4ArqGiCPXNAABVGaOdpRq08pymAtdPQ3wRBFfLSBSjldR/Hptjdzoga2oeoK8AK4WxZmmAvha79AJDKjgExGIln7fDxMmXrzUpmjz+4lzVwTmJlsuL1vWNMU3IIzBCsemib3F4GKCVLhUHUxqmEVT/OIIK5fJbRV7+cxRt+wiXbt7Kw1CWJxggaGzBhlf5SSlPVSYKcVKToSgBZzmLh58wLUaHIDSasEFWaGFvgZEhmNY4QrTxLyfQ7gCauj5C1C4gV9WqVbmueQjjCaoQ1OVb5Loih97NlKiEeJB7Qj4geUMEcAuOhdyfKPkGJFT7PkVZ76nT5RBXSjy9TK4xkADo4LLroEYQh2mp0v0O8aopjn/dCRnkKzTgAF9JppzQqVdpEzNenWErGWDAGZywy9ONupFuu3kvnyvYafzyxzwZY9jQiS/GDZW6oE74qWAzyw2Fds1SlcSXA4lQZzniYTZT0tj08nnBDj7t8bP+LPMgWub/Rr5HKz+rLc5AOGUpsFJKHVVafdiYThaVx9CNhcjWblnJMsw5Rg7zX9+2MicRmXT+kJysIoxinDWOjk3TabeIwoNvTxJWAIErIjMYUGbIikZUQcn/P4kaVrJ/Tb/eJAoVzhrzf85KHAMJghUBZgZO6lEYRexD8D5oBNuIaxoRQwFijymLWxjrpJeaNb7i1GCSayBhCawnLvC4Ngz2g+IETWNZMyiGXIC0qitiZ5sTNtbTcBBKLEwoSUaZVAZkMKYzv3o7CAQJivT4kZUe9KMdQrVDouq9c9J5+H4agKxBbyZ61TIEldOWhWQ5B5R5P7t1Rzbsfq8wR3YOqgrRMRt+v4CcAcgRlrS63fn5fIejbkF3GIps1Ci1J4gq68LXeoLwsUVr4UFxrD47kftx03kuJFOAKalUJ5FDkftKSBLIOg4kGtuggXUpVSkBjHQRlr57UDiUcPZOV0hQGh/UEiMLfXIlF7YsVugNkgGneRwYC06ySztzJ+LSlGQp0L0cagZUWLR0CTWw0oXUE1nuGolB7CC3d7SbfJ8okMLoYGoATOfUVBuEEqFLqUOz1+v1dr73/Lu+1lnVgQJB7Or+fZ3/QgZSSjL5PIegwL5b38tn3U7kS1jdi39czfh9cTSuWWS2BlXvcT+G8kBRFTuE0WYAH9KxFdPs0eoXnQpbj+Nw+cEIP2HzAvsoodAsWNVf/xz/7AqesQccntjjr41SxQjBVlEW4UnFr358AtbycinvYa3PPrzvuNjX758lVD3gMthJXEfuwfzBAKft1HvLe3+/u537sbylJrMACBtTBlc7AAUkV0q6vJwbli2lOLCowsxkRdIDmwQ1BReBIKpDaHnQ3Q1/4abdpXkLplmU93BJeH0gP2oJlxeF7XMLuBwW5nxt1Xx50kHqJB3jzDzQU+FDtqR08wPtrgPsF4pn9O3+50h2zrP0ysOv5Uv/TBaAzf6+0JYqahMoPFHL70RFxYAwws+jC51b146bohBqVSIw2RFZjhUWHlOwPr/GJiJdLAPfVm3d/hU57Pyvg/b1/b9rYA7mW7h5W5AeyPyAo8kF2g/KXbPB7X7/9eT6EW45zB/9saIDl5xqvvs5IDfK+P27hKNqa9NYU+vv3lQ6IAUYy8f2nDTjvWedRTChcxZK5DpEwWGnJlKSQgR8P5UI/ZgqQIkcOJzzsw1Os1H3+3Vp3r393olTXEsuvC3fPnyPvJREb/HvpBFY88P0+f++Vq8Z+NBfvD6/xbuyfX+Deint+3YNo+/a5dqBoJqzP95BlDihKmqEktKCdJQ8EuTMkYUTFCNgxx9VfvIz0mtYDG0j7izBAmytyD07RiiEbgX6loEtGHDis8AaIc4RGEujlxceKUrXsXi6UH755zxfQCUvhBgXpe36/UuF93givRbNvN1CuaGfy0vcPfG8GTIt9ejAHxmf3y6nsL3i0rwYg3XIJZ3Ad3c9peG7wuhX3fX+Fuu/zEHq5z9RJXxYTcmiAFRVSGEdL5yAFRWiwTlEZq5KS7SnKfrAMMAhij9tWBYtFn8xFZIFFRwGpzXDCkis/gy12gkBZAmNL0SWNkQbp/Ir0QPZGWqxUGFl2Jou77/2c+hV9fyv2Eouyez4A+7rfFwO00pYS+vt43ANgQvvjAQVlDXgfPbgYRBYrIxb2jDDc/X2O3J8IwoHQQz6vl6D39V3hvORiZvrIIKQIDEGc0M9zdGYIE+XVnQUPfCz7gTbA3BpQAaQFUZjgVExhc6S2SCGxzjM5pJMoJwmdQOFw0qEDg5EaV4Zke+9Bop0ZPnOhDBDKzx50ziyL+w74kULsuVf3fgMcDidEeQ/Lz7GmJBNIpPJljpUPhL2XUNbrjd59r0TZMmU0TjhkKZfvjPOcHBXc5wMiBjPxsKUUQqkc51aWae67jHNvIIEQwg+83I86npAMPdn9eTxR3k/njN8PtWLvw8MhUcp/R61znBMoJRBCeTlC4YvmzgmEcAihEMJhLVirkTK4n9C21KwtQ1DPXBLDCM0J6bm6gaAgwwlNHMqyS8cj7M45L8V/sAzQDcPIvdZH54dkWKnKSUfeHrT077HCUkjjp5gO22P33A+MceDqM8ww4nI4pJB7ISIPcC/BWOcf7hV/ck5jrSOQqhThccOeRStAOlfm6a6sqtzz3gmLdYNhFGJ5RqFcocl4H+fnnL3b63c3KHOvC4Bw/kG/p7+LofzjvhUhZYkBGbHMYLr/vSnHAg5YPnuxfvbaW6sxxnsYVzLSPWJgyvth/EJdqnKrgQq6cJ5Cxn2dj1/YzKAqVr7XCOnXb+ulMK0TGCkQwpb/5kHGBRUiWyZzCo2ToS+yS4kkQEsfgvov50r2hGW59+2+i+2ULn5Q8HTOebcvZdl0u+/aODLwHmrwAYNQwlnruYnCn6kUe5bsVlYP3Mp+xr32bjCrsKx9usH3GYRg1t0nKWBvY/PnJ+6GxN5bqK6QfqbePfxdOHefOfb9gxgMxa/2MYO9/2dLyvIaCIQUSCH8fXEghMQ6V/a3ON/7iRhGNa6MFO7rPAbX0gNyDEEYnDdEObiHeO6nRXmJ/mEN40ExG8IOayqe2e9d+/AGlegSwvq+yJIW5rVegr2KcnuDMOV+ZSgzyNmcRTjlKWlW7FPuZgvpQ44yWRf4kAYhUcr4EEnY4d6Vk5YG++H5unvZ49WVBaVkYSldKJwEZ4bnf2/nt/J7CenKRlR/nn6K8LKBqqEq+PJeCIEqSxV7/10wIKnKvWoKP9/ey3B6Kt0gFXxA+/uoMQxQZyUDjNXgBEr6mpGzBc6BlN4ohfNylQJPDRRWlF6t7K25j/MYSAxatywAvXKBsAOdHwYK0cGeXSvuQeABV6rRG+lRTys1VlqEH9zgu4gRxBZCM2jdEWgpsVLt8eAJ6fb43TqNs97jDR48ZwXOaj/m1JUdrwODeAB760BKhVABzhmMofSwyuevexvYPeU2A4MSd98Pz3uv1+XQgO7nvJ33lF4NqET19vj7/T0B4j7+jdivIrL9OaDUlTmo2yvKEMIPe7mnBdiWKKk1qlT/E2WUqVBOeM9tynCy/Fl5HH/cn7eWW0pJDgZ9loN/VIkyOxwONez9HBqeUw+OEBQXDr+Mcj4/Us4SWIuw5SSBUsBSOYNEeQPEeRTOuCFmskda4EApVXYuiDJ5F2X9XgxjcSv2fSGKZOCTdrx8hSzDDYHP16TbMy2zey3WckU7lbuHvSvrkLK8BqL8fFkO2TK4+1bZGqox3xP9Z/C59gG8f8+/WbF/IMwyknovZYBShcA5UeazPoIRQt3NC648FTl0hg5VMtydNUilCFSAcBJtCwqjEdKVEcyK47hl0Oe+QmhRGplwy/2Ve1wS4Z9h7wt9M5scNlc/WIR5XYwoJTkDI4iN748VOIR1GKfISzk3i0KXM++EMwhnCJzx4Vh5wYYrPpa81ycIJIEKy4Tc4axGqRAVSgpR+PFj+xCCyjKTM6bAaD+JSckQqQaPtynR2BV1xUEIKrznU3ZFGYK7712pYyCxWOO19T2MoLDK4cpmz58nBL2n1wN5f/n5faOgZggu7VsNUK0URr6n8sxAZNkJT14uDUPgx825FUI6sgR3vG6dKK+bR0Gds+RFhjM5QRIDgkKnZZsbKBmWkdOex7mv+69WiH2qFZ5vZXYoy/xQ4seiSeGRV+UD3geHAUorUVahjYeXh4OjrSAqFAJF5gRFIHBC+zHjTiCsIjal+JL0kLu0PrnWyhI4Qb5ziSBJ0A2DcY6w47l3rilwUTS8WHJQhSidg5GlZHwZZhpZdtqLsn2mZD/Yfgb9HJUViEBgRioQhSit0Voj1N7jPf0DNVAsc75TisgMtEJ8j0toQbiwbNr1uYgzDldojDHkSqMVqHrs2XClbIaWFivw2qaAtGaIdPprrb0w2KBhXi5D5nswtMqzVU4N9Yn3mHBUrnF+4M2eMzq8VOTyJ638m9qLdaOs/3AzRB/t0DCVkUQIpAnAOazzAlZOeaDEKm+IRgxkOyQK53n7gykMzhKKgDCzuHaOUwKMwuLI+z2CUEAkEWWf0WB58ziEWH4ay8UgsJS5/OA7DSYc6eEcSbFicRFlpOaEHzi5DL/IAzKc5YDgqYqCqPDxmUaQKugrgbGSpBeweMN2xnoxzPZwWUEcBlRkjOgYuncs0kgrVGUNUsHtV9zCbV+8mEjG0LXs+ujl3PW+7xHZGvVwhC3v/x5bP3YR9aBBT3t+bIUKrg81V6FmYmxbE5mIyMU0TIWd370CqQMEEf1uRiWsEhpFnSpRL2TXjzex/R++z7ZPX4IQirYzpGlKIhShiojjCrqwaAu5dTgVoESAzg0pYFxAkErUvKFpGrhdhps/eRF3fe8W3O19JjoNGt06E9koa9p1Nn3gW2y/5Dqqok7iQmyvYIQYlfrRzz2tMQ5iF9AUMbKd01QVmiJm58U/omEjwjCmkApjQmJVh0wh8xCRS2ISbM+h+pKwJ2jqhHoakHRglAbbvnUFWy+/iaBlCUmwRhKHVVxmcKmlHlXpdnvElSpJWKO9mKJERGgi6kWFeEkxohuEXUhcANbghPPE5DikEILuYo/19WmSOWjOSvo/meW2z/2QzZfcSq0VIRehWiTEuaQWVFCVCh2dE6JQRkIBoaqgRUTRheZSwJb/+B5bP/5dwk7ApJpg9iMXseND32PCVQltgNECZxX9VCMbNbrOosMAIj8/0SEJjECkBpNqKkGVuqwgU0dRFMg4IDU5KgxQWiJyRRI16GaaXIFIPKuqEgQEIoR0uWQi9iGUd3vNbt4vFHSg2GXKOp8te6pGZY2Zz/+AGy+9mlVRg8lak/5Ci/78EkdOHcrMf38fM9tDpaBSmFQjYCI6cx0m4yYsAi2IC0VUSGj738NcEruIZlhHz/cZtxUqPUEwn7OuMkk1qJJ1UugaMIowlwQFTNcnyWc7NHVM0DZsSFYRzRlIgTvBZpZ6bQRlAxITIpZy5n62jXX1VVRsSBTFOKmY73RImk2isIJNLU0Tc+tXL+Kat/83vcUO557/TE455gTuuvF2fvB3/8XVF/2QyaBBrS9hFuhJpuNRkjxiTFSp5wFxH1xmGa2M0LAxajGn1pdMyjpRIensXIT5PqtUnXyhx1g8QtXF5DMd1oYT1PqSuK+IMsmq6jhRCjM3beamj32ecVknyULEUgG7e4g2jLoaog+NoEEx22HcVNkQj6N3tDmkPk13RwvbLZiojpKkilFbJZ/tMGIrRG3H2uoUqgCh/Xx5pxRZoanImLW1MVp3znD9xy/kxx/7AlUqnHPuE3nkcY/k+o9+ljv+80ts++nPcN2CvJfSnVlgbXUcuZRR6VpGbYUoFbjUEhMxGjShB8xDLQ+odSUsADmInsGkltVj08SpoKkjogXDSBES96FY7KNEiCQkJqTmEsZkBTffRc/0qbqYWlQl7fapqhi6BVNBk1pPUWxvs7YyzkRQo7d7AQpDq9XxcpOjIw+OEFSXyl+U9SBVtv8FFkInoAujcRVVWLpzbcYqNdCWxe27QMBEUGOpkzOZVNmw/nCWxicJGqPkcx3oAglUbeAPknpDjwuohQFJ3zKiY0ZMgMtyrA6Y375AbzRkfGSMeDHnhJPPRNuQpYUWI6NVJsJRVFcT5oqqNahW5juiGhAXEZ2FjKMnDqV15xbWRXWOX72G3oJmfrGHmq7TDy31dVPML7aJ85CxImSsCOCOHqyC0ekR1HhMulTwqKeczXevvg1uvY2F0x7JdFLz8NpSQWXJ0Mn6VOKAGo4kGUUaQ7ZQEM33OWJyDTPbd7B2/To2Lc2ytjHFKc95KYvzSxw/vYE7Nm1lvNJE5CHNtiFJA1QtodXrkXY7TFZH2LTtWsiBpZSxpIYJJI++4AWYxS4BMZkI6Mz32SDGqGeKdHeLjdVR0t2CKBinkxbUK1WCtoFuxmG1KZxzmMKyuGU3QVPSGBulUBoVSPpLbZTV1DuSH33te3AXPPXPf4350OCaVWyecsYrXsCV7/4M7W//hENe91xcJSHOBaOLhrAXUFMJWgs6yuGSCIyjGEzvyWHCxTT7yj8LAgJVRdmCzTds4hET66Dfh67DyIi+05h6g76Mafc6YCRJIannAmUjRFxlod8lFY6xkXGyTo/xsI7ckbEhbIA1iHbAll27OGRiHJlEiBCKloB2+8FhgGYvdTDlSuOz4NICCnCZITKSMAekoRrWqBNAB3Q3oz5SIetnfO/jnwMFJ/zWs5mIa8PCTEiwDCsbT5StGsF1n/sy3NaGBG+sEXD4GCe8+OkszC4Rdh3X/99XOPYVz2EyGUF1NFe+81NQA7IyCA8jb4BtmKqvQukeP7nwEtIf3QzzQAUogEc0OfJFT0PHiqXdC9SiKnVixuOEzs7dkMEJL3o6lckG2zszRBVFX2fw5EOg06fWTEh3tiGFWCVc/O6PQwOIgd3QOOtwjjj/XIpWj9s+8XVu02VS14VT3/giyB1fe99HOeO5T0dbx1Fj6/j+J/4PWl1/nhkQwqNe/0Iq1YQr/uF/fOqYwg/e/3nO/b0X01/q8ZP//CLUBWc+5wJkU7EqrnHVP37Sf8cAfy0COPNVLyIar9Gb7XD9e74EjTLLLB98aiBO2MjRjzoZVwFVVcQyJnIBCRJ+1oUpyF1BRxoy2ybXKdPNCo2z1tAr+qgwYGbHblo/28btl97oI5ywvC8azv2L32Qp7ZAVxp9bAU0XEKVm+ASHfcnGVavJqHPp33/Cf2dX3rN1ijNe9Gz6riDMHbdcegVcu93/zQBVoCYIHnMiazaupx5EFLv73PSxr/hrOmhbb8AjX/sM5lo96s0Rz8CKExC9B4EBDgZWyEE46gisJbDCT5Ctgcg0jSCm0oiYbe1GCuN7cUPI+zmBrRBHFR+eBSBFQG5tKcwxqDfLPeYwqMLCT9pQhUe/6LmIWsKuHTu55XPf4/oLv8mp5z+NRq8HO0H2DYGCYqHjjfSIVTz+/Gcwt2uR6/77C/6h06CXcsbDCnd+7WZow/Pe8lt0iz7f+LdPwLUtRp6n6M53OWTVJO3FNlEhsNaxeec2aEDYjOnYLq4uaVFQHx2lVhzC+soEnW6P9VECErKfbOPMP/oVaCpMu8NV7/487cvvgEedyVRtgs27/QPyiJc/CVeLicMqvaU29GBVfYLdNufyb18Kt3Y57flPZmrdNNt37uDaz36H6y79MWc/7Ymc8qrncuuVP6G7YyfnPv+55LpgvNL0HniHY3p6DTOtOW697kZ/rOc+lY1Hrac9s8TFH/4cP/qfb3LGy5/C2vo4N/eBBcfJf/psdCIZEzUufdsncL07qZ58Gj0MWkEcVqFs38EBdWjblOaa1dw2t51oLGJH1uGYZ5xD1s2Y6/eYGp1k53e/BT14zBtfSrff56ovfgPm+ixt2kl9ZBQVliPIMwhzSFdQB8eKhN4NO7n8KxdCB5762y9mvN7ka1//KotXb6OuI9K+Y7q6iq2XbQfg1Fc9g9UbNvDVf/p3uNMy+rg609VJ4tRx2Sc+DnGNp7/uZVSjiG9/75ss3nwrYRawanqUntZ0+ikED5I6oG+rWYGUlQQNZT2liwxmLv8p37rhp351o/QqSz6f8zw/RRAFvru/D1mRU1WVIUykBxe8FNJxVuB0aaAZTDQn6bictavX03zNi0kbETrVyK5PlEeooIi49FNf4ZDzz2b1EYfSF47RtWuonHg8/fkbIRJEOmDTLbdDCr/7ulezvZUxOTrOi1/xq3zqPz5BZ9cC9amE3q45xhuj9LsFhVTsnNkFE56zUzhLW/cpAse2nXexdv1qisUCGcakZVe1OmUDYb1CPzCMTa7yHjyFig3Ie4UXlTpumqkNG+hKX3ZIZOQdULtPdaqJnpkDAWOVBiKHtROrOfr3f5O5tMXCUpukUqNRG6Wb78AiKIwgShK/yI3A3Ow8ST3h1BNPQR1xJi7PCDJHkFnYbiHt4IxAyRDmoHriWqrNBvO26zHKwyPYkTNZHaEfpLRNAUKQ55qiKO/V5BjxSJ2fzWzDNSNMPYRAs2V2NxNJk4asYFoZZPCoFz+ZQglMNeFxL3wBO+/czPXfvZRzz38q1WrNh9IpaOFwcTj01qFWrK1MwE7LE152AYkJIYPHnPVorkyu4bLvXso5zzmfvN2HNjzrj17C5jBje6vFs179Wi583/sQPYucz7jsw5+COXjJH/4mSwst2jbjCec8jquaCVd+62KmH30y42tXs2p8gtulfLAYIEPPtAzhWgSCpBpDBcbPPJbjzzgJNRaQmgxhQ6JCcck//zdJrcpi2qfTyhgMvIvjmEBFQ6PbQ1uzPKZTAaxJYEfKF971IajBYaefyuFnnkgvECgLiVMeUesUtNpd/9mjI+gopJN2kUVGGEf0C0AGiEzTWexAAP/23g/68HDAMy88N1EpRcUp0m6HyugYgQ4Jg5CiC6EIcS4jM1Cp11kV1akQ0V5cIhUh8eQoNMGUY7BaQmN62TCsG5ExM90lSCEvUranLZLxEZa27mRDYxw0TIyNc2fe4eznPIsffuh/+PZ7PwdNOPFJ53Do4RsJm1U6sk/kDLqTebTOCiqNBgvdng97A2jUGsy4LkJrrv7iN+HO7f67hqCao5h0Cdes0BIaKt7wnRRkNsPJChQ5GCiyHKtsSUDwhfNaGJWLSspSr00wVaMdafqtBSrA8dPrWLxzB1JaFrcvgoA1Gw/jDt0iA0wlpLl6Gu5YpKIl1a72IXYEvRBkRfrFPAARh2SmgD5898Nf8ou7K0N7AxzeYHbXDNNrpmEM5gPH6FEb2bFjJzt274bJKVRPM20SVBvMLPzvO9/rH7JK6D2CBVbDodNrmet12dVe2oMGeFDLEMLtycZY+aGdwq9uyVgTEynmu21SZ0htKcneB5MXjDTrNOuNUnMDKmFE1usPi1pKSNSKOW1KeEN4wktexON+7Xn+ZhjY9J2rueiLX8UudKhaSSL9dMXCGDZsPBQKsNYSCslkc5SJsRH6/W6ZcxTUVYRLUyggGK/CRBPWj8KEgpOb7GztRkQQRAFBomjnHfqmx1FHHwE9cL2CsA/rm6sRHaimAf1tLdbXp2gmNbbu3OFvZjWga/rYGESi/EPTB93pUI1CGAd0SmWsTjvvsuGQdT54sNDuLBGGil6a8rjnPpfVjz4aEvjpty7nyx/5H7TWxHGMRVJJEkSjQZFr+v0+lTDx1ziDrNtDOktrYQE2byeYmuCsZ5zJWeedgZldBEKKIicv/PVo1uq0+i0qY1Va/ZaXg0wg1xkWQxBKCpNjB0JbGTDTZyypIdMC0c2YqoxSzwV6ts2a2hirRiYQ2sKIZPfMLMJJmvU6rVaHZrMJVahXK5jUS01SgcwVZEXhr2Pq2VJJVIomrQ5Q65owCkwnsC4imJ5gcmoVu2dnQUASh9yxbTMuDmiO1GHrTsaaI/S7PUwHwiYQKOKpcajF0IhhbQyTVdpZl1qjynizuSwsdrA9YKNW9yunBaVEOTDT4gJFx2VQh54y9JSGUGECmO+2OKQ2DRWIQkW/l1IJI3/TCgidwwgxnEqK1ssG6CDEIYzlu1/+Gk95/FN46mt/jZoMMbNLfPFTn+Wmj3yG5772tyiKDkjoNBSF6cH6EW6/6mrWjT2JJFakNicSmiLwx5Em5ZFHHMEVl9zAC59/AXetiihGIuL/n73/jpPsKu/88fc55+YKXZ0nj0Y5gxBZZAkTbYLJYHBY1vhrnLDX9tprY/+WXa/t39dpnTHYZDDYZBtMjgKJJCGBcpg807HiTSd8/7i3unuCEGgGZiRzX696VXdXddW9554nP8/nk2ZkImO54xj5BunKKj6PI+yoYGp6Aix89cOf5JFPfxrFYc0m1cIZyzf+/F/Y58ETf+oFTM9MVjGoLLCqxCCr5FKd+PAwRJ6q3K3YwylDmWWMRtCREhSUZYpDcP0nPgo9wXOf+qOUT3oMvUGfbLnLJ976di7/mZcQeIIVYXGDFfzQpxkEtDNR4Zg0qjVtlfDVt3+Ep/38TxNIQWqWmQ46fPm914KwFd6XtiBhOOohIoH2LH44HoitYFNkICjLFCEswncURleWNgWxPGRrJ6YjJSbNackm1/zRuyGAy37++cxsnufAgqW3/zDNiZ10F5eZjtt8/P3vh6ZkNe3RmGiu7YVWHLPa64+L0FCOCIoq3mQ25OEv+jF0pCixhCiKMmNgU2YaTViGxetvZvLxFzE0Bk8bMDCwKWniaD90M73rD/CsX/5pVnSB125QyBQrRhSRZSHI8F3BtJWQ5zU/izi1FrAYpUjPO3I4UQqcL7GxAgOr5QDX8tGhgEbIxJYZTFR9fS8fkpmc1GbVxmhAnqfIQFZuRATa5pS2rBZcQVqkjPQIDi7zHx/9EEY6uqM+05tmq+xVCIdWFlh2KXQgjQUjpTnrcY+A25cYLi+jBz1UWTD8+p3Vhp+G3C9pb5/CevCO97+TblzgZkKGoeEr//oebCzYt3KI1DcMyenlfbTSxDPtamMf6BFqjzhVTLsGwaiCNaflE0URCytL1Xe1FTZ2FGSIWFXZOB8ypekXg0oR2Yxh2qcx2aDwDD2XQgT+bJNBPoDVVTiwwmIxoG9zJrbMsjBagdJiPIOWFq0sJAHL3WWcgtVhr/IWIohbCdZ3MAP//uF/ZUiGSzz2dw/V2T9NRoENHfggOz7GM6yOVnHBeltlL+/VSsGgYoX2oGxIOo85Gxwc2rOPqVLRXi3ZbGLcwghKUA/aQoqhOT8JAr7++S9SDodsnZnhhuuvg9sWOPdpTyLeOs2qHqzNgKW+xU+8tSRPT6Ysq6yOEYdksSULDCtFjy9f9yWWsh6y5dM3Q/Dguv+4Fla7tDLDndd9E1ahkIZ+4jjjMZfCHPz7Vz8NTZ/MK9g/WOCWxT3c1TvAajkgc0XV3idOk2mIu2+7Aymrpp+qv9BgpEUoS+kyOLNK967oIdqmSDKkihimQ5iGUeKIJiMyXcJslXY/2F9g8/wWmAZ8gZiIkL6qXDMFtukhI58zf+pp3H3dzXz8/761Es4EHvObz2ExAbt5jmJpBZpVinxh9TC7ztrK8IVX8NUPfmwt1f2gFz2e6z7wGQhgIcwQiePi33gWd992Jzf+0zur+GwGdjzrSnqDVTbt2MJwtIqQgjDyicImt+87yOW/90LsUsZn/ultlXsydLC5xcU/9Tzm56YYZH1UJ4ZzgWKVhbKHaiYsdVcrl6kDvZZDhSGcAzQUIhJkomAoUpzIYQvsLpZozExy/kt+FN0t+OyH3w/9SpOzvckjXvMTHGCEM5YdF5zJ4S9dz83//mHki55De7oBm6sE2KLuMZpSnPnyH+WOd3yUj7/lbVDCzGU74fwEihGrk4J+fxnmIZ/xKX2LHwSMdFkpjfPrWEuYajrFV/SKDCEFmx56AbvOPJevf+IL3PzJr1SCPwLObvLgX3suqXIUkWLFZjzo155Ld+8hvvSWD1TK5+IOO376KnSnyT7XJ/QdnONDVrLbdWl7ErZWAnmX7JJMNnjMn76C3bfcydf/6u1ripuzdtJqJQylYSAynvo7L+H6z1zN9X/9XhBw5ROv4tZZSJWm5xfEsyFX/MJL+cIHP8Vn/+7vqg3eBs6fZ/ah59OcbBEYhUwrN/VEQXXEiYyjAOy7e7d781vfym/93m9DAy7/3WcxnDfkicYBsWjT76eQhMjI4QdVDFYUEBHS7DvCKGBvtkCrmSAPFSRRiJ0SrKx0mdSTOCFZDlOcM2x2LZyzrPgpWkJTJdDN2RK2yAcjujpDT8T0E0kvHRJZRyOIKJwhDEOKLCe0gig1tP2IKAw5dPgwzXYDNZmwt+ySYmj4MYGWdOIGS/sOMtFs0TNDzHTEvt4h2tPtigi0cOjMsqU9R3a4z1wwSZBL8tURcaOF9SSlNAgPcj2iJGfkUtrbZljOhgzzgrlGh3g1Q1lYEkWlGVdT5jbNc8ClLIx6dDodWlFCsdrHc1UTtbACWyoSL6AcjJicnODA4mHkRAM3FZP1h2zTISbNOZyPSDptEj9GlAY5KhGxz0HZxwsj2quQaIfvabCC7lJBuG2WW9QBmu0mc4seaMvBpEcuC6b8NoGWrBxYYG7TPH0yBi7HJR55WeI7xaRKSAYCsZrR1AHWGKJOi5FyDHyDiX1GriDPMlrOo+EUQW7otCfYu7qIbgSoqRaLBw9xRjCJrzx2Z6t4vk+rFJRZStBJiCcnOLi6hMkLOs7HKwyR8tHa4jcTVnVB3gzwtGV6qWC6VNh+ylQygW9C3vSGf+LC33wuo45AWke20KNTJnS8BB9JSkovKSjbimWbI0aWTd2Ab73pY3BjwTlzZ/MP//APPO4xj/+exFEI5U7YAo4GKbvvumt90kOKqvlYOnJnyPI+rZkpBiYj0xme0Thn0NbDCdA+KKkp2h4D3+BPKIxnyW2K6wSkLqDQGhcHKOE4uDhACEceOnSZExiJjODm7DDtbTMslZqhHeGHAXEjQWrLqNQkYUBe5JhG1fSduZwyUPRHPabOnuOulUO4MkXEHrawBJ5jcfkwe3uOzVvnyUvoHRqQNCQzURM9LBHCEU5MYBqOQyurNJohPd8xzFfpbG6S24x0MMSPQjKhKRsQTiSsrGb0lhdIkoSwEbOY9/GkodFMGOaOyA8IooB9ZQ850SD0GxQe3LVyiFacgNYErkpKldLQK3s0pmJ2lyvIqZBwMmLv8mGSOObu0RKdThtMSM+OGJYZaEPciHHKYhBoW9DZOsvBw4cJo2oC3YQBy6wiY8XqsIv0Y4Ry6FDhhU36WSVkUzu2McgyCk9ipY8uNFEY4BvIigwXhBRtge40kV7ALQcP4CtFK0nop11GwrB1+1aylR53H1qgHTdIw4IVVRCEAQvdA7RnmgyNIe2u4gJBMNlkkBcM+4aw6LNyqItsxQSNiJEGMypx2ZBGqwnkdHVKnuVMyIAvv+l9MICHP/txFMAn//rfYBZyZTnQW6U920Fta5MOJaY0CFOS24KBl+Hw8KOQybjJhPQqQhiKU+uCJmFEWZZrhKHaWYwwOK8amoyihJW0j5aWVrtB1l/C9xShH1MUBi08RmSUnsEISxx7OOkoXNX5cGi0iqcCinxE7HuohiIIApwcETYa9JZGbJqdo7uUcahcZRgKZFh1tnS7ywRBgCcE/UGG50lSaelrw+xsm35aYPyQRTfCTDUoyhSXD4ilR2EyJjdNUvoeB5eWmY6azJ6xlUE6AAONJCEb9uiv9lF+SNCIyYqStFzBawl6aoTUlmgmxI98cinpjXroLCeZiGlowWgwgCjCjyNSO0SbnDCOKLWmtAbrwWBpkbjVQAhBHMekZUEchmRZQRIHOKlpddoYrauGCAUL/SW8SBHGPsaGmEhgCkdeahqtVuV5GxiNRniNBmVRcPeh3cRRUK27FITTCUWeYqSl2W7QXR7RbjbwlWM0TGnETXKdMSxLBkV13oHnU6a9Kjfie4zylByB14n41uG72LR9O96mFmWWQiQRGqIo5K69d9LwIuZ2baHb7XGgt0BnqkXuDMlki0wXLA+HxIlPEoWsDFYY2pLZuSn8NCfwfA5l/QqwCYX0He3OJGlaYHJNc7aDEmCGOZNPfBArX7mOaz752Up2zk+Yf+RlpEXO3JZpFvrLdDodDgwW2DKzCavdGodjaTSuV5JLxTDzoTwNxpF830eOC5IKjNM1BZ6omIM8gRbVKJHFgNV4voczJcKCF4oKUxSLdQYjBdJpcCVlUdLsbGZ1tUfkC5qNmMXuMjJoEQQey71V/Dhi2aRIKWhEIcOiD8Ki05KZdpssy2jFIdlwlSRqksuSIIkQnqS/3CeZnOXw6jLTs5MEwsO3hmYUs9hbRRkPr/SZaCcsD1O6tsCVmna7ySDPCb2EpgxIswLRlIhmiM1HOGvQuiRuhHSLXuWCxwEqCRGFQRQaz/i0/QYreUoQhfjKw0MQaEeWlcgoACmYn2iTDocwyEg8DxHEKM+jZzOGwyFKKfJsyGhplc5kGysdWgmSOKK3skyifHRWMQLFgc/IZAjrELklTmJGuqTZbKK1JVEeptQIT5LalFwWaG2QjQYiEjhhCUqJGTl85ZAqJCsMKgip0M4cqsbRdK5EK0EcBlhr2bp1M4PeKr7yaIQ+d+29gzPOOIPusBJsXRj6/S6BUJUFdY7UlAzTjDD0CQIPqS15OkRKRxyHpMUAJRT7lw8Rbp2hOxzQNpJ2u83+g4eYnJgkbCYsra4goghTFmx92MXsethlLKwuI4WiFUxQ6BwT5Oh+xqYgQfdTtszMMsqGpEVOEHn4oVdl6bXB1w6hQmg2QWSntg6oC4PV63xizkocHkYotHOs9nq0JprIUNEd9EFJfN8nTYd4PhRFjhWW0A/wlUdpDYUuUV5AFEV0e8u0Ow2EcIxGI+JGjMHQ7XbpdDp4jYCl4SpBI2QwGBB4PqGS+FJRZCOklCwvLzMx2WGUZ3i+z2g0YrnXpTHRJrcFnakJBumILMsIgpAsz7FS4DcaFEajjSFqRhB4JJ02I63RwqH8ALSlGcV0u6uVglGSQhfE7Qa9bEAhSlozHZSvKIqMdhIT+QH9fh+Lq6zacIRzjjAMyfMc5xxRs8FgNKTf71PmBZMTHcosx5aawWBAo9HAj3x8X6GLgslOm2bSoNvtIrGYUhMHlWBbaymyvGobNIYgjtDW1GgDjt6gjxf4jLKMMAxxwGqvSxzHKOkzGmYo32OQDxHWMTExQZ7nKM9DBB5BIyQrC/I8qxSyg9I4vDBgmI6qQepSE0iBJ0Hrgvn5eVa7XYQQ1dylrMCVnLRoHIUrsRjiMKDIcnKrsUHFWusFqlq3PGdQZEzMTNEbpUjpIT3FaDRicnqaAsNSf4XJuRm0LUk6bVbMiN3ZMm46QXciVvyUPLaUskBKKEYaU0JZlghP0pqcwAgYjgqK1KCswnOqgrw3p8FEvBQh0lZDn1iwxkP6bUqTYp0jiCBNB1gPpKpKEsMiIwgVxhbgeSihcGXVOeN5Cqm8qvVMQxRKijxDKK9qPPCqAckoSiiyEpDEcYOhtRCFFRWMtijPr+qRSLxWk2Vd4KIArS1REKNsRe8mhcNqTSg9ZCAZOpDKx/N8itIhgrjq7bWghKDQJUiBFD6lsygfClsy0UiwRQUwLIKEYVqg/AQpwKSmGipVHiar+ecmYvIaEs8Lqp7CtKxLEigGoz5xI6qaHDyf5awHDR9NNZ2dm6ICRXAO31eUzrE6GtBsNquhVwNKeGPIE3zpYy1EwsOmhiRKyIsST1UQGZkzyEZA15U4CY1mmzLXBMKvlaslCGMy66rSROyRugIUFKbA8yrUMGcsSngVnoqBKAjr89QIT63NmjsL0g8q7ANPrUF4lAChqkCSvACpIfGq/tkUC4FfIQ2kBXHQQDjISkeigmowztWsxUaDFASNiF7axw89Cp0ivYqiJHOjqtLiQyE0RpZYoRAqqTaZ1YAhy0co5eNkjLaCUkCIxBQ5ZFld/xZrg73f6xjfiZchpMPzFL5XLZ5SCqurjRgoD6GzatLYVJvBWIGwYyQrW+NwbCR5tEchbay/Zo+HoyUqPOU1b9yM0TqOxJc0YxATsxHNwx6BKVS/vP7e40MQHYGH4sZ/N+vuxPEIm+SGz3Ebutvchg9zxwFdcffWgXTUe5yTawLD0aAJG07MjJGnrT3yuo9ap43XXQmIPWL95VFT4eK73nobWgqP01AyvgfCHL369ojrc2PSU7vxEjec81FZ/o3XKCrIZBymEkKCtXE64TSCEk9YjHMYIwj8COEKsJZGGEFwGjRj526IlmlFr1aCJzKk0SjrkJ5F1o3WQvhYBAGy+tKaGMOJE+MHtOKBxJr+PfbgyjFs3rH4lMfivOhjVIJwlQY+EYrlE41h7AmTU9wbO9Z3sh1iTYlTI9UKQAiLX1OtS2UxwlHoEk+ALfvkmcHKCchOg3lAKwVaubWBXF8KwnqGz2mJKyROSKwUWFGxjko7Hi2yJ1zIlGLDbhT2B/98Co8Kp0vVEEZiA2i1O87mPFpIK+yWNWrt+8yJcZLu38nQRt/j+QtsjT+qcKoGiKr3pxIV9XSepXi+jypAeSVSWCJfVW7xSaCYO2EBVGGC9ZI1CClPB8QmQOYaU1iUC7CAr2oE5Q2o2JUWCk5Ij9r/xAJYYZWqGuFtDWxvDTIf7HEEcaNrvoEe+j5ev3Sn2AKegADK2nV1whJIXYEM26SmkK2wRQMn8VVIoBxKK4T2CI2HLRQU4r5Dsp8sAUx7Q8phCUUADYdaLOkkEegY53m43FUEF9LipKk4AYRe09LC+jXH2329gaeSoPLUUttWyHJe/XMNOX+MkG30MY8URCsq9/W+r6E7DQTwBBqhawoyKyxGmgpn1la8lUoAwsMQ4JUKYytyGEoPXwf4WYAXbEObPadWAKfDhHkvITaSdDHjmnf8G0VgqoyMA1SjQhCWNYFLTYiBrGMSc6J3QJ5SIThhnvIT2cBuQzPwmmb/TvGRO/bkhTwJXPOn0hO4V2DU77z2Y9xVYevm6ppPUtTjT+PQORrvZ8B6BGYr+q7l+oVTKIDFaIi0mhBVTQ0dMlXTrQPpg8uG60O1GyntxHeZ6rvXw5wGAniqjKjZkBE1R+B73uvp1bGiW0933k8Pc3LWv2Zawpl1RF4BMgQ7Yn0wWwCFpij3gElOGJXixGPAhkfP9hmKIWEDfK+ivPM9qobrZh3oi3WXw1FxjMC9U7x/N27EKU2EiO/v+X8nBW5FVcsMYiizOhzUICVoDa0WZKN73njiJKzf9/v6v+/6c4MAjktCdoOxEAJkq6oX9nrQbFRTZ0ls6fYGFKYq2sv7CE9x4hbQOaqKCdgc7vjW68DdShxmKGHAxkgHvssrFGS8ChVZHEnUceLx0DjJ84N9HivRE2B4/47nrxD3+P1GWgpRUFqN53kYY1CyuqUKRZZlhGFcbzJ5TPwIDlkBuJ4Axz332/u30X1erwVXzQJWlbWARhRZSRT6aF3gBT6ev5W772jwpCt/l14GnuedOgvo0cQTCVFUFeDnOwOK4R14/iE8lWKNrIlayqqdRMo6V1eRq1hrT5omuw8ckyf8fLIE8F6/j2OfrbA0Q59cl4SeD36ljYMgQApFv+jh49cMwPIo17SOGeWJcdyfTEv0g79/VS167AkIV6FnG0mVlEHgyxbGGUJfgW8ZpSOw2znnjEeRjjZ6KqeIonrPvv3ccsfdZLmhPQmrq3cx2VgkCA+T5asEoaq6JYxb33mCip4LUMKd+nT+/faQ6NKS+B661HhRSD7KkZ7EGkur6d1zgsRx8mK/+/P9G2tEN3bLJVJafFW7o8UKnieqUTUByURMv69x8kymZ2HvQZA1UNcpEcCDy4dZGq6CB70MJmba5MMM6QpkAGnNCxizTqDonI/DA6ERorzPxVwnTlYq+9TFMCdy7tJahBeCiHAux2lJ0m5DWaBtRhDGkA6+Y6ZnTIxyIvnH+/P9G3sTnltnJrSsgfMhPU2YJAgnMIMRqiHxRchif8BAgwxAa03/PqJkn3AO35oMIYsKaAjQZYHOUkxREkQxyktQKkZ4lbgrv+qgF4FE+F6VZJD37SHEBrLSU/Rw8sQe4t4+n3t+GKEwJmE0UpQmoTcQoFrkpYdzIeWgxIoAK72179u4fk7e97UfE8be7+/fUT+LDY+xdIx6PbAa52CwNKQoCqTn054CY2BxcZFbb7311FjAqQQYVbDsjSaY1R6TzUkQOa6XgQiOSBVXFNZ6Tft5UqynRO+LBjnF7o84gSaC74aX7ztBhjgXIf0phAyRzhJFjoX9h5noTBBEHroYUU2dmiqHLgyOqha7xkvr1Ak0QpwOrWj2hNa/YuKtKPao4TWVMxUpLOBHE+i0C/0CrylpCoEloeh7lcU00Ov12Lt376kRwDxP11p6PA2BL3B5iggswvcJnKpJGitnW8jqS9c2n6md8PvcEnaKi1hHfL+o/3RU58nRSsKtt38dw9k33thrQrZuah1enaXzAIWxHYb9LUThFkajjNnpST7/xXfz6CvOpmkkzq2ivAFCDpBiiCBF1u6oWONSPHp2Q9x72WycwXbjuZIxarnckGmS31k46vcJxsmce2ay/c7PJ3D/BesknnbDidXbVTgYrCzRnJmB7iIUFTxjaQpMpokUxBFkuXefqb5PWABd0EbbEGUhkFBKjQotCo2kAFdUjLEbVOXGe76RNNPdh+dTK3zyqI0r18ZhnKw6fpw6sl1Q1qM0wlaDSYVxJK2EvD8CC2EzwQ5HiMDDZhqpFNpKlGqAbFDahJVeyfT0dhYPNfjghxb5f179czRnmlCmPOclP4dN92I5zGr3ekJ/P0V5G0Fg8EVexwng+4KakxsCD3JNluoK4NY5nAPh+7iaIHSsVFzd+TPu6x1TSVfzfPaILO0xAujuIQky7uC5L88nmH8ZK0irvFqh1EnC+qObTQXDJfAlSIEVBicUzSihHFR1V2stn/nMZ06NAFrhY0RQMSJRMd0aWdHTCGEqhtLjTD2sMZOuGRJ7n55Prf9p17TxeCTIbXCN1jjIxVEb0FG3PDmiSJAORngS/CSmGIyqYeVco4IAVIQeCnLdRAWb6A6aBN5mPvaxW3nGM36an3nlRSAeKob9A67R2iwAZPwwpP2mc0Rc+5UPcMEFlyDcAWRwGCGWCcOMweoqSSxwwjFczGg0IGookIJyoPFDhSsLhJQ4IaoU/RH+pl1PYriNlybXm5vGnTlH12DW1kQe6yV8r88nKQs6nkmsvLV1AVwf9KxupqnBgYWr2JzdqccFdUe4TOub0p60IvvpfFg51sj2CCGrOWSqzbmBOrvKhoTgfKQzSFsQt0LQkPZSlAJrHU5JUDGLyykzs+dj7Bauv67PZY98BbCVZzxzHuQUobdVAIyFb93UXiJmN13Co5NLXNTWwF3sveXfabT2UXi7aUxGFMUCgefTnlGk/SGxbylSQzDp4QYaoTYqy/WpdcSGDh3n18rnqLhsPElbC8oRW8Gtbz13gnHcyYvl76E0s0FxjN1MIQTOmSO6uE5ZHdA5s7aA43NwruLTds48oIXQ1Vk8O0Zpd+v3T6zVlTbEdk5WjelrcZ5j1C+JrcAYhx94SBGQFYIwnmWYxrQmtjIczfGlqw9x5dNeA5yNS9uI+IzvamGj9kOq942aLolzvvH1f+a8C84naaZoezdpbwVPZDTb0xg7QqiUoq8JorrPbePEez3AythSIHFOrgvgBuXL2PMZ9wEfY/lOw33xHTNKdu06XI0Ab8xpYAGt0zgMQo4X2uAwNXT3d3L+HxiHEXVrU73tVL0PhasxAvE33KXaMoh10pmkFZEOM6IkptsriJsdgnieleUJbrvV8Mgn/gxhOsOVTz0XxI7Ko43vw4kmF4qpZNI9cfuDgAPk/Vv4wufewo9ceTHd7s30exntqXkG/btpJQJsSVHmBGNGmOPGcxYh8nVXcoNbuJZnEke6euMZxqoObJHu1DbTC3svO3SteUSs72lRcZ/oDS7oKbOA47Ncq52Mx40Yx33uOycx7u9dMEclWCrhoxI+N2YXHWdf6k1ab07jgDIgbswzTKEzuZWlRYljB1+6+hDPfP5rwW6G+LyTZC42i2JgXNCcxfe38pRnPpS3/P2recxjz2F2WnJ4/x7aE2ehWaVID9OIA6wp1jKC92wZNiRfNrR6HZEoXnNf64lFYZHObkjYnAbuzPGSwBtcGufW4Suc4AgLeAoF0FbthLJqK5RyXMgUVdun+W4yiPdf4RNOolw1EFt11YkNmr6WRmXqvL+tAKpqmbQ2ot+LaLd2YMoZPvSBO3nmC34f2MIznzUBnCNO9rhj0NxWOYHRZgB+4uX/7IiWIbuZz33+r3jik89nmN9EZyJkMNhNGPgoV6O9iSMBkY7Yo0e730dZkAo2o06erf2DPdLFPe1c0g0VD450N52rSKNO9DhhARRCIKTbIHjVKL8Q3M/nzL6bkEGibNUSIpzcUJQfu2NmraDkxhljYowNcS5Em0nixi4Wl9rccUfJM1/w56C3kPUTosktP5jVi84ScBaopnvac/+Qj3zwj5mdm2FuPmN+fgZdHsAyRJEjKZFC19e5of53vEhjPIHh1NpecMIhXIWEJ+/V9zv1BlEcZQWrwj3VEMFRAnkKkzAOpRRFAXFcdeNHoUIXumpoFUe//3RbaXmvCuZ417zudgqsNljjUI0INxiCZxCBw+o6LvTBeQ36fQ9nt2DMZoyZ5e67DQ9/1MtoTM6y5cw2MAHeNhFNnoJ18C8QcAFPfeo2h9+D/CY+/sm/5yEPvQw/OEhm9jDRtuisD06jc0McN8CWYAtMVqCSCLRG5xoviKvBUOvqDL5DyAIn7xuM4Sm1goFktGpJ2gGlLmrKhSbOgVKQF5aHPOQhpy4GrGu1VA3h4xEjcRpK20mQ1w3XJAB8gSssKg7Rgy5eoCr+dCVxWLxkkl7PUI6aKO8MrN3FF68+wPnnPYiHP+qp4CZB7Dx99qF/ZnUu4ax74uPn+erX302vf4iLL7mI4XAvM9NTlMUyKjSkRYbnNKYoiOamscvLCOfwmjH4EeXCKn7SOKI7RtyPtoSDqhRjHWEI2lTQ+0UBg/4QBxQagiBgenr61AiglF7VLuUgCKrfQdRDiuV3Tj/d7+NAi8sKlAd4edUZLwxeKyQbavKijTDTZPkUxm5jsDLDOWc/jSc+sU1r4jxgqzh9TcBWoZKtPPyKJwI3OtjP1770j8CIOGmh1GGElxOHPiLPGS0vEYcgQgVFSrmS4k8HFYvsRtd8QyzpTrdrF+5Yj83UvPeeT24syguQwsdZie9DowGz8zt48IMffN/k54S3oLVrjauVVZA4J5DSw+h7+Yr7UQbUOXdMv58TIPxKu5uRRfoeVnr0uh7DbBPCv4he7xw+9vEBE+2ncs7ZPwU8mNbEkwRsvR9FyBcJRmfwkEf8PL3VM7nm2oIsPwvLLrKygxYtvChEJAm9VUOWg78pIu8VIMvqsfFen+5W8Kg7U1FACIRQlBqsU4RRk7KA4bBCg5+ZmTlFLqiTeDUuf5GDMQ5rwMnqeeyWng7dDifqch7zd1chfhMmDJe7xOEcpYnw/C1oO8/+/Ql33SF46Utfiy2ngbPvv2mp5BwBTXfBRS/jgkt+lM98+m2cd+7ZDO11tJqrxLFlaXkP03Mz9JcWUf2MYOx9WruhQXtcuNf3i/KwUDX8h7Z4fkSa5xhjK9KaeiJ+amqKdrt9agRwYmKSmZk5buFG8nzslkqk8Cq5eyDU+u5BIB0K61qsLGimtz2K3mLJMG3ztW8s8Ogrnsn55z+c88/fTJG3CMKtD4Cc8GZRDAsXtOZ5/BP+O664HRE8iBuvey9xMmR+0xyrS7uZaEcM+/vwGgpX6vUtsCGbOPaMxOmimI8oXB4ZCAoU1oLvB6jSgfNZWeijJMQBXHHFFVx44YXilAjg3Nw8W7ZsQwBpOk7ISIRQFVLUAxltwoUUuk2ns5PF3RH9QZuvf7PLc1/0f4E5nEkQapsIwgfOJQet9YSRCM4Cd6e76Lzz2L//K6S9/Qg5Sb93EOcEWT6ouELG4JpHTFRs3OCn8S02gHRI6eOMw/MCisLx9a9fh+fDYASPfvSj7/Pnn7AANlqtyvwKGKWQ5ZYo8tC4mndA3GOG6fQ6xv2M+gj3uppaqOJV6wQOD+tiMG20m+bQ4Yjrrj/Is3/8F5jxd7Hroh3ABWLsvjzgD7FLEO1iy5m7HO5OEHt4w9++hpe89DHk6V0Q9FBiULeslZUwOrvWESNOwljRyUqoHZMBpZ7aB6TwyFKLkQGrPccXr76ZYVqV3p7znOeIUyaAWzdNix07dzoVVDnPQ4sp0zNTODfElA7Pl3U5Yn0kyQFGVResrDyhqfKTc/MkroI8XoMnWKP+KgNks0PWP4TwI4Jolu5Ki1A9jOXlSXad9yh2XbgZuJ/HeCd87BBp4Zwvm/zMq97OqPdN8mKGNL2duemCXu8O2m2LiizDpcM04qSq05OdWv3B+ozjkcPR9XCxtJjC4oUSYQKiZDMHDxq+8OUU46AVt06G2j+x46onP2ltnuqrX7mTspxgNJJEEzPrErdhHMcJeY+a5wd/B8YdGd6xyyEsMggwwxFKKYT0OHBolU9+8gaaEw9lx/kvBPlg4BHiP7fwVUcc7hSef7mAzSTti5nfdhmbdz6GP/g/n0d5Cc4pVg8u0WhPUqTZaX419b6QCi+KsAbSDA4e0HzwQzeyZ29lxC998OUn9C0npRA/Pz9PnkPkw7VX7+HFP34FUbxAObwTf5yCXkMhAuHsyaOlOqnux7H6SOd9vFYbPcy5++6UZnuaH//x57N0aAXfW2aoBaUzztoI6xRWaKQySJFjrSX0WkgUxuYMhz2SRlS1Yim/ii8KQxC3ONQfMDUzQ29xgclWwrC3ghQKGU+jZIgvIB2s0vA9RABLwx5+HIEVKFQ9xW6q1lOlkNLDOg9PtkjTIWFDI1RBUWQYLQm8afI0pxHrKrEUTDLICvzAUmZ9Egmm1ERRk1w70nrUwwscgXPIXFCWJS70MBiEdUgxpBEOWF76BrNzKwhxO763h9/67YdzYP+3KTPN9KY5zKiL50vKdIQXnuJasFu3RRvdYVHv03IAfhAhg4AkmYH8LD7x8W+xsABRLHj6059+6gVw+9Zt4oLzz3R33XYH//4huOrx3+B5L5hHl/vx1Kjuva37Atcu/EhE4lNvBTcoiQ1WWXmGrLeIH8G5502RZR0G3R7/+A9v4Nf+x9NpB5eclEuY31z/MNWpE45bj5dzXvtplq3fi236Hs9m5gSu5FbXXenhqUWkWsDYvQiVMzcbY23GYOkQzYkEnWr8hocz+jRJgqoNtez1AXO/3USPDBRQmojV1TZ33l6V15545ZN50lVXnnoXFODBD7qcsgSTw3VfXaYsOvh+BzvmKUdUbl6NQ7cGCnTKV/5ojaiOoHIWjZAgqt43Gi5TlinKg8lOA1zKD4+Na3fAQRdTHCDP76Yo7sDzDjPK7qLQCxR5j+amNvloUOVg5KkXPreBX1I4D2H99fhPQN4boE0KXoin5vjaNUuMBpCXcNWTn8allzzkhBSwd7Iu5IUveSlf/dIXObhnH+95z2HOPvcTPP/F24kTHyE1wq4jYB9DiHHauKFyg16qrWCZV7AgPiSRT2+Ygxiw2rsTwj7wVYdLqCihAJGhjQMaeOrMe7g5+x18H6cd7B6H3H4Pn7/XwRAKH4Ljn19p73S+tJA7CI+NbQu7x/m6QNgCAg1WVwskMzC7aTf7JNEKQZwShEUF9jQR4NKSYmWVcCqGYUo5BC84DRTw0W6oU2t7NYhAxBMMugFfvuY2/vRPbseUMDHd4NnPed4Jf/1JE8Atm7dx8cUP5e679rG0CJ/+7IAXv3wrhgNIkeKkrsg5nX8EzsYR139KXI8NuCTiOAOixiFV1dSPM+CGBNEAZJfugY/ihR20C3AuxCIxNsOQ4Ilt+P7AjQYt0kxy5tk7Rbe31+3b/xW2bZulv3yrszpGyQSkT9BqMRyt4rOKK1Jiv00QtVkclCAVkadweoDHEmGoOLg0ZPuui1larEjrQuXwvAGl3kNeDAi8m12jsZ1ez6coBGecs0sc3P9VV9rbkaLLdHuG4cJNLiu2gzeNDCSWHkmjx4H917Fzc4MyU/z5n77OSW8LpVT08xUEy5yxPeFxD7+AB1+6k+HqQVyZ4wkPIXKM3o8Qd5LndyG9JYzpooDuYsHEfJvyYI8gL6sm5gmBS91pYQGFMAgr1zF7RACiIC3Kem038bGPX823vl2NuF544cPZunmbOG0E8CEPvVw893kvch/80AcR0nLTTZAXs4RqCiN7IG0Fpb4RvOg0SsQI3BpobRWLj/nTJMZYpFcNkzYbHrk+xM/9wuPQ5iZybarki4sReBincWIK6UkCNcnEtkvXrjL0h3z+8+/maU95Ah4TbD3zclwWI6LKGs5MbuH3X/tj7id/4nn8+8f/hZe+8r/RnNk4Db/X3XXTtWRFyac/+2Veed7ZbNt+wfrr9lbX7w3I9QGUZ4kbszQn1/9/dr7JG974Jq568oWsrN5ONpxg1/kPYmyNC61d4A342v6v0AwCfDXJa//3rwIb49zdrjS3MFz5Ovv2fYwkHmLNCKcCpNRYVmhPLIPoEoclugQ/UWAM5WqPRiPAFrYCDh5olDotbn5NHitgTJlew5YnbY/ewEfJrXz841Xms9ma42GPePRJ+WrvZF7Hi17xIvHqV73SaT3g1lvhG19f5dIHz9FspxgOYZ3F9yR6lONNxNhuigxPk4kIoY90PWumcPBQygeRg7NYO0AogxMOqXwCUWKtQ9LAOh+UpMhmMLpNPHMeuD0OUbmDYdTDiT0gb0e6SWALIjjjKEd4gSA8TGcyBXsI5K4Nrw4JGysguvj+AkIdxUcgDU4uofwlstKigjOPeFkpixOHSeI5YlUiXAasf0bgOWCRyF8kikCJIbB41Pnl+CpjNLqZRnMPyjuAEoMasMnh+QXIDMUQU+YoAW5k8GWNBWP9CuIwlxV9ncuPbH44RUeWQRy7itgydxAFpP0UKQP8cAef+vg+brq54rP8g///a3n+i19y+gkgwJnn7+L6b3yTuWl43/u/wSUPegKD4SpJo0ccj6AweIGHXU2R/mlWOtuAX7qOa1Ij647jAkHlUqvDFQCTKLEGJA2ckxWOpjQ40wNy1jE59johUqRaRKlDeFYD3WMaCZTqI9QCylsCOTzqBHOEWgK5hFSLVFSRR/jLSJWi1AhnIipY+iOKKggxRMplpBqhpOLYkbESjz5KZSgKYATFAUdQY446H0SJkqv46gBS7UXK3lpcP+aor5JsboOTs2EkidOjRcjVyXjlQzwhGSxrQjnAb3VYOnSY6U07SfMWe3Y3ede7rsHzYJDBwx9xGVvmOydl85508/M7r/3vPPiyXSwsw7+85wC/87vvoCi3oPwZlruOwUgzTDVyeqqamHanSx3oO7nEos6SyXVeD1EiRIly4DvwXYHvcjxGKNIKg8n5YMeNoNsqZBSZIdUQKUaVgB6VChaij/S6IAdwTJdIAd4qUq0gjvu6V6FVizEm69Frq5CUKDFEiSFSpBzZCLG9Io5zBiX6tQU0jIWvtpOARIkMKUcomSGlQdUPKQ0KhxQOiVyH6hAaRImTKU4NqodMT7n1swYImnSXLM2pED8JKdMh01s6pIXP9dcF/Nqvfo73/mvOMIWX/+TzedSjHnXSLMdJ3/0Pf9TDedqPPptmO2ZxBT7/BZDiTPrDhKnpOcJGQGOqQbG0DJrT+LBrVmUNZLZOT28k+VG2QlGWViKdRVGugRjhfFAbN6/HGpCxO94tOOCQOZJ8zDl8jLZwFCAyBPo46auqm8c5VzPgHuvgCFEgMKgxrPw9ZCUEJYjjDFSPITpEhWsqsDW55Rru1IZM90ac0A2XOyYTOeU9oBI/aZCuDgiD6vcsL9B4FDphpdvin970DT77GdAGtm7fwROvvIre4IA7bQVwfv4s8XOv/hX+9x/+GZ4Pt90Gb3zjpynyrRw4CIgIhKXQQJTgTifg3mOW1VSbUJRrQig2QA9WP/tIkyBsjLTBBtpcVWXTjvj4qMquOR9cxLEFclMLxbgJ3D/OOVZ4o9J6x719zkqwPs76x3ndrkEMCuuBOd5nBPfiIo7hRnyc9ZAmRti6fmbC+tq8DcmNDZ6FOErOT4Nbn/aGxBMtlA/DXkrU6CD9GcpyK8srm/nnd1s830MT8+a3vYufeOl/Fe3m5tPXAgLMzW4Xj3/Ck8nyysT/27/dxg3fWMb3t+Lw6XVTmlNT5L3h6Wf4NkKUC1u7TnpNiwvrgfPWrB4uOMKNFmO4PbHBcm5wAZ1QIHyci6rNfoQLXrcsWIW04XEEUOKsBy5EkNzD7auguoVTxxXA6npsFcsdLwVQdwM5IWviTAd6o8bPAYt1qlYSNVGgC6rPc94xkrWmk5wEW/Mz1eWfUwtLYYljSTHoYy00ZqYZjAxFOcHS4jx/+v9+lOEIlgeCqU1beNxjH3nSz/b7FoCde94u8Yd/+GfMb+rwlWvhJ1/xNfKsSVFCo+lj8wIviE4z4ZNrbtwRGnyjS+pChEkQpg02qRxKWYJMsTKt5clg1RBk/yj7ZrGy7rofC8BRpAnCbRAwlxzrYroQTANsAgQ47nJH/j8IMRY+B+w7SngquoBKkfjHurmiIpWxNfhs5QVkG7bsECjqYWSFkyVClSArCMY1SMoxUvq40GsbYDr1o7kBOvvUlh+sswQNRdj0OXjXEnE0gdVTvOh5H+I97zJECTzpKVfyT2974/fJCf4+Hk+66kquuOLJBF7FlPzJ/zhIWZ5Nms+Q6RAVHI/YY2NGcsPjOBr15Asf99wiJzgynhkjfI2TC6I8kiYIXW/4dQEQsBYv2bVr2tgRY0EoBD52TCF7T7ds3NJ3lPkWcozLevydLYVAjvkNxHEg52uhkW5MyiKPdB3H7oF1YN0a32Bl8Y/0Fo46M46l5j1J9+2oRJ47DrPwEZdYX9v4dg36Blv6bNp6NksrU9x+R8Ktt1R4UvNbdvKKn34xT33C48T9TgAve8jF4h3v/mcxM7mFfAS/9ku38guv+jKHDp1FOHkGaW0NhFKIMEZIjzy3iNDDmJrvUaxvlupZHvG3E75/gg1JhapRQIyTJO6omycsrrZ2Qg4RIkMKXYMSq7rZXCLxait0pIpXSEIt8Z2rPueYLFSJ9HxKNKgS3OiY+EyXQ5RfTTZUG/1IkpaKc9MgbQ0MfAT4kwQtkMKjcClalcd1y/J8RKgUytaxrNwl1q+hAYQ4a/Ck2ZBnMRUXZM0V4tyRPJBCZAjRrx9ptc72BMNAN67VyjWiHCfXSXOcgNKAUBKhQHgSIWS1LC5E2AAVKoyBvJxgpbuJ//1/vsbzXvBhRgWIIOR9H/wXrrzqYYzsAXe/E8Dx8fgnPB1Ptiky+NAHYWLiUXSHLVIdoxotBr2StDsE5RElIdgK1t7ZDbRReHVioybCPOG7xz1b3uMIqVvjE9cbEjO61vwWV+cEqZMjciMU39relvhGoNYsoPkOSqG2KBx94x0IjcAc19JYsa5MjrdhRZ0gccJtsMLHroGo2Z7W2Zw2JmmqcofY2D97D97K+mdqkDnIvCrhbKS0+37k0RxYIQmjgDy3aA3ZsIbCF0BZYo1l1DMkyTxC7qLf28pnPg379oEIIi5/+KOYmpmh2WySyM3ifiuAb3z768UnP/2pCtLNwkMu+2Pe8darkW4rw15OcyYkaoTkowyExJWGsqxAlytXwUeYqM4qeuvwjff7EVh3PD/3O//HiYAdP9Co4taUmB1XdxBWrmVlpVUgJEqC1w6IEiAWda5II8OApDlHmk3zuU8v8bP/5V3c8u0KSuQP/+j3eO/738785E7RDrZ/3xbuB1YF37JtG2edfQ5KQL8Lb35jzqC3GeM24UyTQWYonAUpME4TJl4Fde58hA2rUREn615Sfb8RPscRBAL3yiEg1hIZ358L/H5+9qlJmh35qOI7UTPYSlyuMSW4QUE6Aps7BingCZANVlYT2p1H8Hd/czM3XFdhgG7bNsOzf/zHmJ3a/H1fqB+YAG7eNSd+63dex8zsDFkGN38bvnJNTp6eTWl3gpikNTUFSpOVVBPeaVl1ktiAKi9X1u7LA/U4nnB8p00gvufPf2AdEudCHH7tFVmEqPcJtlLYMiZKYnAQN0HGHsIDI0IWlh3OncfnP7XKNVfD4jJs2jzHC178U2zddMEPZLG8H+RyXXnVU3nhyxfEVEO5UWp55U9/jIdeDv/whqeyaWvCyvINSFUQRWCtQaw1R2+Iu8axgz0Noc3vwQKK79oFXbdS9/hpJ8S3scG6PiCsYE0EXs+QieOsbd7vEyY+RZ1PMIVB+W2kmqfR2MFrfuWjfPhDsLxSUeu9/V3v49GPeZT4wamQ7/PRHe5f2zEzW9oC4IUv/lnm5mbo9+ELn4Pbbu5wcP80YXwejcYmwmaIBUpnqyFPmVassmKD6+lkXcu6H/FL3OumFw9oSu/vqxsqjsPg6yzhRAtExVuiHeRFk6h5Cfv2z7Bv9zwffB8sLkHSljzuyVf+QIXvByKAE41jJ7//5h/+WnzsE1+i2UowGl7wvHfy0he9n6VD82T5DpYXIqTXQAbgpK65BTYuLNRk0Pc/nV0LmDtFzFEPLAF3dabYHMexGHPUl6x2S5zy8cMZLFtY2N/mN3/9aq644u2sroKSgn/7+Kf59498fG1x9i0O3ANCAO/pOO/Cs8SPPeu5NNuKwRC+eR189N8G9JcvxerLKPQ8aV5zsCso6ymWMgf8BqYo7xeb6ehSued5SClrATy251IphbW2QhV3x2ZJi6IaMQrDkO+9jaSaknDOobWu1+8egJPHZDTWHjeplI95CE7pYcmKAbJV1Y2dBfy6ccBZCAS4nNakR14kpOk0gov49o0hH/8IZCMwKB752B/hYQ97rDj6sx/QAgjwxje/RXzu6i8zMxeTF/C7/+OTPOGx/8Bf/OkX6fe2o8JzGBUBMo7xQsZTQZhhgddqgefxw+M/8SEsSdMjX+2iVFU+cFklOCVQFiWrA4dhlrLcSb+7gxe+4F955tPfV3E9BB2++rWbefNb33bMR2+daYsHvAACnHvh5eJVr/5FJiamWO7C3j3wZ39a0Fu9iDy7CC84n6UlKFyAlT5BGIICMxiRdUc/3ITfc9LiAeaO1i1lIkgoyrpvoBlVmU4Z0e6cw2C4HU9ewX98JOWLn4NGE3opPPeFL+Ciy84SW7ZOH3chVkZ73QNKAA8vHtvO0+8fcP/9d/6P2Le8JB506RUYfJSCRz7qr3nWs95Hmp2DCi7EiS0MRorSeagkRvk+0dzUD2XqPsaADxThs6UhaDTACfKyaj3rr2aMygjl7WC1t4U/+oNreNClf8NrfvnzVdugmuZb376V1//T393jIiyN9rjJZJvIyv3uASOAczPH1rRarfW/vfZ1v8tznv9itAjp9eG66+Fv/uabrCyfR7+3nTA6Gy+YZGWhR5YVmJXuDyXqP/nhNFWxvchIEo8gSfD8GdpTj+Dg4Vn2793G294G+/eBc4IdZ1zIb/z273HW+d+ZSsCUVZ9u5G8RDxgBvLfjwQ99EO/45zeJfpqJM887H+vgj/7oFh7+0Lfzuc8sU2RbWVqAyc1nEE1MYK354Q48ASv4QDhUEiKkAwyF1oxGCmPmue3bhp9+xed59CPfRpaCcXDhpY/ihptvFL/0K69eW4CV1d3HtXBzE7v+c8SAG48tm+fXLvpVv/iLXHjJ5YxGIAW87vdv5K//4lPMzFzO4btXcNmIio7e/lCi/rPGgMJi8xHWFCgfgiCm0T6T3vIU13wu55rPVwSagyE87kmP5bX/6zdY6e87QuAmOztO6SKctmnEX/q5nxMPe/BD3Y8/+1ksHz5AOYA3vKHgx35UcuZZj8XK3ZRmD4EbIER5ZEG+Fsp1ZDOOmEFbJ+Gwx3bT3Bujr/PW6KxE3QRcfd7a3A1GSEzNAivYueEbDFaaipwFTTWOdBRKtnAV3stxz8HeS/fP+hS8O159DKo5QWER0iDN8Wb3qpkeozTW6WNBo+r5I1tBTIHzENar6rVHr+OGeyHckTDwG+/NxhLvOlDzPdkGe8T9lbEiLwxWJ1gzz2h1ir/8q0/xgX+t+h5Wh5KnP/25/Pff/WUe/ogrTjuNc1q3kTz6UQ8T133lZv7x79+J0YID++ERj3ovVzz+Q+xdfBjd0aUUuoWQCmsF1iickJQaRCirPnlRpaeFCKsZMBeDSMAFOL0BtmRtSPNI9DNd47UKr3JjihKkTNDWIbyaAdgBRmOtpfQUuVKMnObYOl8f51myMifyLUfCFgLO4MsSUw7wPA8KDcXGTFwJUuCQRJ46VnaMJAkaaGMwKudo2EJX5qjIY1T0MaaPOt5MogOJRPsFuZfhjqoDYjOgpDQFQgW4MsKVPkJUM3cWQChKLRDiyMmVNUETFR+jQ1XQGVatoc5hVTX9YqsmfJxPWUiE30KIGBEmWCcwDqyEDI9D/QijLuVzX4KX/+Sn+Mu/gv0LcPZFF/Fnf/k3vPfD7xano/Cd9gIIEHghL3nlC8UjH/l0giDECbj1dvil17yJO++eQusL0dk2pNhEXnoY6wgaimHX4nv1TTeqKtIah9UadA5WVwLEuLnG2zD7to7e7SlJWVao9F4kCeOQosgIoqjanGO17SmsUmjhYaRCBsdbXocfNInjyRo06SgbJQSB59NudzBOgYogOBL+vDTgBQ3SUVFphyP+38OJEG3GFljVFrZ+2a9AoRqtGZJ4krIQwAbgKLvPIRTaGoyQ4Efoo42oVIBDeQEGgYoDROiDFNWQfKUH8AJ/vU477l6yY0yduhtI1i+MTWE967neX2ARvkIpgc1zRqMROs2RwsdLGgxGHqizUN4lLC1v44/++E6+8Lmqd6A/hN957R/zcz//X09rP/u0F8DO5kAAfPTzHxK33nYX55+/A2fhmqs1T3vqe3nd/++rXP/NrRh5Nlq18JOIMjdEIdiRQOoYdFRpYlUivQwtc5ynIbDYcUe9beJcvDZ5X6GPxQg1g6KBs6BzS1kOycoCbEGeQekqy6iFpHCS1GhKdIUTwyrrA7W7HVjSPKDXD0iLCWAaxYZZM1thpq72NaPMVQJoN8YsHlkpKUsf4bUgaFCRrYzvpsM6D21CShtyJNJ3JQkrXcPyiiTPp7F6BmhuEMAhkKGdIcs8yiLCqejYLWMdGsnIlgzKRTLXI3eG3EIpoNSG0mXk+ahSbNYHG1e4MGuU39XAsVUaJ3U9YL0B0EqmoFJMNgCZIyckSIPn+4igSd5VeJzJwbvn+bM/vpanPvE9fPnzoAt45tOfyVeuuYFnPfdpp32Qe79qJZnaukm88R/f5f7u9X/G6//+XUgBb3pzyrdu/iJ/+w8/TZxIFhdvIokEie8gljAqKvOlLHjVmLd069vSygqikrW4bvxC5bKW/Qw/CkCWaF0QxOBPtEkPK+LmTsrMYUyAECHO2Yow003i7FYMMcraWg4UpYmYaF+AsdtQYhaYPGpvN4miLTTinYR+BKYF3kZIiRjf28Zw5EiSXeiuwZvYoENLiS7beN42hEwoTYSv1i1oXkpmZi7FlHMYfDy1CYu/poVNGaJck8nWpUi3gnMdcK2j3FiFdi3C4DykaGJlgnEj0ApjSvxQo+0ySZLh9BB0hXODlevRXi1oVlQJtso62iPjzPqtqgGjHiSjAWEoMM5juOIhzXZUcBF33Jzz+r+uXAlbwsUXn8f/fN2fcs7F9w/GYnGqmoJP9Pjgv77bvenN/8D7P/AfNBoQh/D4x8Kv/erjePAlkmz0NeKgh/I2+HkV1QOGynJBNYIiqHFix0BLzkfYuEq4uAKReKBzsmJYJR9Mm399S4/HXfEySjtPYSLwFCUFztNYEVEUU4ThLmyxjTyDMC5A9VhevYWZqTZl6uPEFMLfTLdXsGVmlu7yt/DjOzB6QODtROspCtsCGZPrkjjp4biRRujIVhJarZ10S4lUCdKESDdCiMNoMwQiVDxJqROMDXDOEXhD0vQGZicENs0odUwW7EDIWTwdEyKRdkB3cDPx5H6MBGfPQ6o5jAVPCQQlvhgwGNxBM0oR9MEWOBsgxIDW5AKFuZGt2xYI/AWktpWCszVcoXC1xatc1Q3G+whALFG79v0htKarvs0wjBgOOwh9Nkv7t3Hlk97JQhdkCI24wd/+/Vt4xvOec79J7Qoh3P1WAAG+/a073HOe9zRuu/0WRAFzkzDZgfe+5yWcc+EIM/pGzbHQB1spWSvreM3Juum5RndmHbBWWL+Gv7Agc4y15IXFTyL8CEy+i9f/yT5e9d/eC/654G1sMBi7jFvv40a4y1Uq4qx7+P/dzjJCcv4JbLS9DueqzNJ3HPjd7eDe0vR76zTLVoG+xSFuYM/u9zAxeT3YW2gEFXx/5XLINU5IJ2zl5YvjC+A4Gy0aAUW/ANmk32/RajyUL3+xz1/+v5/mc5+DQQFbtp3NK37yZ/jv//M371d1FSHGCD330+OCC88UN33rZj75hU+6Fzzn+RxeWGZ1BR79yLdz7tnwr+/9UfzoeloTGj/KsNrhrMSzEVJ4lMagrKwAjuRwLRtaDQDrCusylJAbNB62DChcTDpoUTIH0RYQR2/grSe4CQS6BM+/p9d3iNLe5U6EVKrIFUH43cAt3HuNzGiFc/X5eucK6LuymEeXW5B0sXYVyagarl4j46NKeNkq4ypqAKrK+1hPhjlhyFYLwniGbLSL7socf/pH3+Av/2IPcQKphR997rN527+8935b0HxAjBM86Yonid/9vde5j3zwI3zr6zeweOgObvg2/PpvfoRf+tVHssk2mZoe4VhGmAIlJM44bGkRfrAGX7A+fc/aI08tKlDErQ6lmaLUW0izbXjJKnYgka2TfTU7xT0LX3WE8owT2nDfnfB9d4fyjv6sOQaDTbRbJVGsMOZWpFyq+C42ck3UtYnK6qkjENVcXWO0LsbYhMHgDG66sckf/K8P8+2bQAtYHsIrX/UKXv3zv3q/3rv3axf0eMeBfavuZS99Idd+6TOYIqfVhic8EX75lx7OZZcHlMWt6PIQnalZyl4fPwCExeQFKpFQWIgE5A5jQbV8lpZLGu2trHY3s2n+pcBlYLeDPPOH4+vHO+x+h7gVxA3cfeM/MT+/ghQHUGqE8qHIQXoVPXWZgh83MQONCjy0HeCFCm190nSe5YPn8YZ/+AZ/87eHGeXVmNETfuSJ/MprXsPTnvLM+/X63+9d0OMdm7d2xM/90q+42fkdvOuf30bZTfnEJ+GGG67hfe99AdPTjk5zmqK3iEBidYY2lmCyBWlKNrSEziFiiRKSbGhIGtMUNkZ4W4GHAI8TyB/K2T0ecougGDnUKmk6gbYlQegj6iSYL6pZ4zIHP/LJVgdEjQmKLEOGAas9CIJtCHcR/+d/f5h3v1uTaQiiWRpNj1f/yq/xtKc8/YGh/MaTzw/Ex9duvNP96q//tmu1fBcJ3FwT97gH4+6+4Smut/ci53rbnSvnXL6Ic93ApftxbjDl3GLs0gO4fEm5vNd21lzg9u6/yN16x0udcze6B/KanbSH3euc+6S7+fofc4Plh7q033ajFVy2git7OJdKZ/vK6UXh3Ipy5SrOpU1nhztc//Aj3P/8TdylZ+Fa4OZbnjvvzHPdm/7p7Q+otef+hWj03R/7u4ccwGUXniFe8+u/wSMf9SMEYYSz8O2b4Gd/9qNcf4OiN9zK0j6J9OcwLgEvAhmBFxElCUHYZJQqRr0IT5xNO7oYuPCHbud3k+gZOvRIsbzis7ziU5YNoiQmTBQCMIVgNDQURkF7E1kRkhWzDIa7+Mq1kr/8K7jzziofU4oG//dv/5qXv+LFD7i1f8DFgMc7brr1LvfWf3wDf/wHryMMIY5g1w544z/+DNt2dAnCfeTlXUxMBwwXlpCiIJ6OWdzXpd05hzI/l8bEj4G5DMKH/VAAv2v36m6HuAXsFxisfBwp70SyAiYlihrgFIaAYRoQxmewvDjJ+957O+9650185euAgu1nnMmLX/Yyfvd//P4DT/ju73XA7/X4+teucW9501/zhte/iTyDiQlot+Etb76CCy6NcfYA0q3i+Sm4PnHUpt9vYYuL6Wz9WeAC7rk+98Pj2GOPg910Fz9Fd+WTTE4coNFcRdg+QkjyVOG8TeTlHJ/85G7e/c67uPqLcOAwqMDnuc9/GW956xsfsOv9gEzCfKfjsoc8XGzavNV96+b9XP3la1jodhmO4Fd/9Qv81E9exrOf81Ba7X1YtxshfPLCIoQjSgzofeBNA6mDEEuJRhMQbPgGDWvU0gEVweaYBTcHCqoiu6r/7tXv3Ui0Eh7ns8avefVnOip+eMMaEd/aa2H991799079v6v1542JOTcSaY6VsN3w3Xn9nnGv6LD+f7nhumT93rXGvjX6suqTM0AThE1arXmCOMWaFaxJCfwAZxOKYhfd7jZ+4799lsUlGKUgPMXr/s+fc9VTn/GA35P/qSzgxmPfoYH7nd/6Nf7tg2+mzFKsqSjvfv03fP7Lz1yF7y/h+SNCT7G6KvnatUMG/RYEbYzzEH5IWZYECNZn1Cr6MitsXVD2caZqZpairHndDcIppI2r/pt6PtAKVzeB1xMZwiDQVYfI2gaX9TyirZu9LZLquywVY61zUVXUFsNKNE2r4tNQA0Dj8CpyzZp9123gEHNjVmA0QuQVE7BJqhqpHNUYnBLnfCwh0kkUBucshqq1zHkV6nbV3lei0y7zs7DrDNi5XWA5jC5HNMIOg8Emnvv8z3LDDVSN7QZ+7tW/wKt+/tc46+wdD3hPQ8jTyAXdq5fdSr5Cs9FgSA+BwmGIiYmJKIucnUeN5pyM4w/++Hfca3/vddVsoIX5GbjsQfDn//fVTHZWUMFBsKsVXqcWlAXEYQclY5ZXV4gjWQnLGunJurA4W9GUSekhhcNauwbIK6yPxSK9miZMUr9O1dQNFdnmhtEcVw/5rv3uDFJWM3fOCdwahxo4dM2EW00vSGXwvGqY2Jr6/VJsyMptmDuSDqdsVaZxCiEUQhqEs8ia4ky66nqttRTWYCRI5SOEwhiDKw3SlrQakixdIQodBseo8Gk0z+D2O0e88x1f50/+6DC+B0UBj3rsFXz8M58/afd4L8uuS48AH5+IESMMEBJToBHOIfqaC9vbT4mwC3UaCeCtHHa/96e/z4ob4Ld9nKw2xGhlwGSjg+4VnHfGuTzjR57JfGcOZzTnqe3ibrPf+VIhhGQzs/dpIW+66zr32U9dzev/7u/46jXfoDMBSsKmefjIx38CX+3B6j10JhzKOUxZ4nJBPDuNSZexrqiEx1QCJqXEExUAr6kBcMWYgXcsqBaMMxRG49ZYbStm240MSUVRVD/LI/8uhECg0NpWPH4cy6wkaktkrcXadVBeW08eSCmh/twxaC/WYXEVnTYOs/GznERZiaw5DoVwlMJhlcA4ibEglIcnFViDMwXSlTir8MMpBqM2hdvJO95zDb/92t2UJZQZbN92Bp/93OfYueP4CnZfvuy2hlPHvHZXedCVPngEWAokgoCAEsuhbIGb997G12+5kbsO3s1KfwWAJGxgtUPnms3tWV785OdxwZZdREaxOZ4R/ykFcD8Dl+N4zV/+Oguuz4v+y0u47qbriJKQRtxk8dAi+/cdorvUJRAhykpMXtAMIh552cPYPDvHzNQ0nVabJi0sGoGgRaOOnCQRIVtoiP0MXG4zlBDsEEfiQV5z/dXup17xk9x2yy2VpYvghc9r8/JXPIrLLo2RYg9WH6AZOso0I4wkadFDeOD5El9W7qO1FlMWOGsJ4gSMqcxOtex12FVRPONHtfWqLeNYEGr3UChVI2Tb+n/WraizAilC7m2s8wiBG+PASAlKUOaDWugdSsojGC6Ncyh/Y4xbj7zXVhVsRfOlFDiPvDQgBdIHRIk2BXEyzbCrSLM57rjL5y/+6mo+9NGqANZbhSc+80m8/BU/w1VPuQrhKbaqaXFTus9JTxD7TSSCAo3BVMADGMo6NnZIlunTHfW445bb2X3nbg4ePEh31EM1I7RvyJTBKMvU7Aw7duxguj3J6uIKRVry4J0XMjUIeOiui9npzf7AraCQp0kSRhcZw6DEeoJM58g44OpvfQ18QWksnclJLn74ZeyKEhYPLTJYXqW/uEqKpDdj0UGPmw7sZ/XGFYbdHouHFilGGXNTs3QPr2CLkkgFbJ6Zczu2bGfz/CY2z29iearnfK1o+DHWaiYv2M6NX79ZfPr2L7v/57++kptv+ib/9G89/vG9H+VHngI/+8odPPwh28hdj7CZkLsc2YxwlBTO4ZxFCYeUAhk3UMIxyNO65V/hyUoIxkImpIezstpaZmyFFJL1EQGnK8yLyrJV7uyY3UgAbs2yqtr9lbV7KrDCompXHmQVZzqB1gXOCpwDFTWwziGcwVhXxY2ick+RiszaCkLCOZwVCCeQTuIsOEpwFmscBg+rYpxUWGdxaKySLPUClpY83vL2r/DXfwtpWiGCzG7Zxitf+yp+6mdfjpOWkbAUpOzRC24l63F4cYH9hw/wpa9eS6ELnBQEkY8TAq01SilU4jO3Y55kosVks8Pmh5+N2RuxfMcteK2Y+a3ztOYn0MKwsrrKN/Z9m+GNA4p+xrb5bVx64SUIHeB70Skq08jToxnbz0s6QQS6ZGKizUqxilEaIxw2EAxI+fyNV7O0vEroB7TDmKYfsuuCCwjOmODA4iI37L+BhYOHaCUNZnZOc+bcWZx75jkMlla567Y72XPH3Sz27+COOw8i7xKYokQXhk5jks7EJINhn2bS4KKLLnbzUzO88RMf4Pqbr+Ev/uR/sW/3N/mPqx1XH9zNG/72Ei674BL62V04MyIRfsV3LiyuToo4ZxDGVjTOHkhhCDyFryTWasoiwxiDcg5PVJu/YkaqBE0hKms1tjA1ZXQVO7o1FAcnLKWtueKlQkp1hCA6YTFl5UoKoZAChFQ4v+ZVlz5WtnBOVRZNOERtXS0VxITwfUoH1gnwKgWghESisKLEqRG5sRjXxFMdSuuTabBOIWUDHca88vfeyF174Md/7TFc/ugfY2J2FyMjcULxtx95M4tLBzHWMsozhnlK3EpY7feIGglyysd5PpNTU+w8cyeT01OMRiP2HtjP0soi1+6/kalyhl2tXZy5eZKkOYPI97Fn+TB37DlM744RfhJgjCEdDElkSNIKkW0PEwgyNCmW/QzcFpo/WBcUefpkQW/noPvF//vbLDdSnv7y5/LO97+D0ncM8wztCUygMNbiKUWMwstKAi9AS7BSUaQVgFASJjhjsdqQ+DHtpEEUxMxPzbBl0yaiIGJ1eYV9u/ewsLAEziOKIrZs2ky73Waq3UIJhy8V++7ay50330qZjog9GK7uodHIKIu9zMxYpM0wqSYQCj9QxGFIFAckYUAYePieYHZ2miiQdCbaTHWaJCqmglWiLmDkgMVi0WhMWYE7qVoYnbFjY7jmwDrnqsymsHhBJWjj+2itRTu7lvCJkwRjTPW7XN9fUkqkCCmJEC7EExKFxKtzrhU2m6NXZgyynKV+n9Vuj15vxGAwYDTMSMshoyylMLWXLSKsDSmMj5QJfjBBr6cJ43m0bZB0tuAlHeLOJDvPOQcp4dDBfQS+4tbbbyGKY+7YczdhEvP4K59EWmYUWnN4ZYmFpUXSfERpDEWZkeUVQoEXelgcWZYRRDGe9MnLDAuMyhRCicbieR6+9EicjywcOzpbePrlVzLX6/Cw7ZfSwGM7rR+oAHrCP33qgBqQSUguMkKvydCWaG0JWwmjvI8MFGEY019ZxjrJbKNBd2kBvJAgDAkjD2McWTmsNpgnGcmUleVlgiBib/8AX73zesqyGomJgpiwHXLG9i1cfuFDsBSk+YA777qFvXfdji8lvaUeTgTMbt7KuedcyjlnnU0YaAbDA+w/9C0O7LuT0WrGsLQURYEpcsywQLgShEPiiHZbynwAbgXfFyghKMsca6rkjBMVE5JSqmYjqpI4ga8IPZ9Oe6L6XXn4vk/gK3zfx1dVkkf5ai2TaWrB01pjjEE7S2k0WluKwpCXJWmaMhwOyYocqw2NKAHrcKaqw0hTu5/KwyqBDCOGVpMaQ+lAyADpTVcoaEKBCvCSCKEcSila7Um2bN7J7Mw2oqhDJ5rla9++gdVel1vvup20u8RUOMu1V9/E1NQUl116Ca12iwvPmGBxaYmiv5d9y/s49On3V1Gep7DCYpyl0JpCl4BDKQ+/4VHYDKUUuTaMyh6erNYpiiJsYRGBZJhnyEACjnSYEpWCRhwz0+4Q9BX+KRC+sTo9LQTwQHbQRVHtdmyOWbV9PC9ABI7BaEij3WAlHVDakkYjhixHm5wkiTH1Jja2RDuLU44gCHBOMMiGhM2QUhhyY6rYJKjcu4wRdtRn8bYeV9/4FUJfIkVZPZzFlpogbCC9gKzs8+0vfobOjTfQ6y+RNBXDdJF2M6KdbGZ2foYztm1jftMciQzJzJDV1WWG/S779+5jtLJMr7uEsAYlFSKsXU2lKHRJmMS0Wi0ajQbtRpOJVpvJiQ6NZkwjiBF1YbvKewoErv6bXPtp/I4xfVhlU2vExPpdDkdmMrr9Hv1+n6LIWFw6TJ6OGA0GpL0BRZ7jkAhPgeeTWY0OPPwoIpmcZGZ2MzNzs3Q6k4SyhSFGG82+A7fyrZu/wc0HDhMs3oaQB8hSg7WCRiMhLXrkdkgQK/r9fVjrWF3p8a1//za+7yGUQkqBExIxFbOU9kiaDUzdpGCFwyiD82tlBRSmQAoDwiJjiedHWANpnqPzypOQpUCbAo8KBcFZg5QBwmh6yyvEZgpnDfvEwG0VP1gX1HKaxICbo03iVhZd7AUs9IY0ZUSRlRWvt1+hnAXCJw5jBqsrTDYSyizDlAVelJDlBc1mE10WWGPJdEEQBHixT2l1lUSUEltzetq6VicCj9IKVByS2SGNVsjyahffD0kaMywONMNsxPxch1QVjOw+/FmB8xVdp7EedEdL7B2u8PU9t64VzMfFc+kqjgHfk0TtDs0kotFo0Go0ieOYQFXL32lP0O/3mZiYIEtTRBjQt4LFhR5FsbiWNXXOIN0Gck8rqjlWJ9cL6RsqkU5UfIRmQ6FdKYXneXh+C5F0mJieIy8L2saQD0cEno9zsLCwgPICDq8uU+QFi1lGeajLbYeHyG/fgbVgtESIVvWNqgdyCIGlZIh1JYSqwvAkR6uMsCEpyow4jkmHGcOiIJxIWB0NaIQt/EBR5JqizPGaAaWyGGOOSMIKHNbqcVsChdFEoU+W5cRJTFHmqMBHIQn9Kmsay4iiNPhKEQQRdmSRVuBJhbOmqoGKH/xcgsOeHgK4tzzg8BVJEDLV8jBa4yPxw4i0zAh8HyV8dGbwpCLLcgIpCDsTWFdBHQyKAuUJhBdSljnZKMULPRBVjLS2LYXa2AZE4vsUeYp1ltFoRJC0cNJnaVRilUdn+yz7lw/jSU0QQaYLVClJOi1GWY7nV61gGwGkhasbxJxEehUGdqqHrPSGiO5SnWipzsOTPqPRiGazyXA4pCxLOq02vV6Pdru5tgGdc2vx31q20zo8p44pQxxPENeDv/W6nlaCoSjJraYRRBhd4AtJHISkaYoTCukpCqMpdfVpnhonc0BIgbNZnQTS9UULnHA4SoxwBEGEcTAalGSFRTiNyw1eWGVUhzolajcZZikuMzjnmGi1KcuS4XBIFEVHxMDrUIvVs1ASJwTWk2S6xOBQUpCNMpQFlEPjIPKxOLQxBMoHqVBKEYY+DRViKE5FGvS+C+C+lQNu6+TJgTZwvsRhGA36ZFhIM2I/YpSVaGNw1tU3tqSVNMmKlIHJcekQ6xReEFWxnTHEgY/faEBZaTbnjhKODc++s+huF19Imo0mmS5xns+oMORpRnu6wSjtUuoBk1MtFCVWOHQ2IgwDMt3DRiFGgNww2SXqFLOsv7tKmhwpJNLJtZS9bCf0lUBOtfGBxTRFTjZZMCUy8o7rvIBEOltlTI+CoN8oeOMaYBVvrtcFDY7SWbQHVlj82KcclfRGQ0ICpC+pSHodTjlQsvouV7lzwjqc0xXcY30+tsKSwEixBt+flgVSBeDH+L4i8KHMV2gkkqwoUSZGoDCFIUmSNYRy5SStpIWtkYHlGm69XHu2AoIgqMqSUlEUJRJJIwhRWhAHAaXWpLZEJQllqSkLg/B8dA2V3+0tUWwZEqA4wGG3mbnvaU/vY8VtZVLcne11O6PvtVPrBCzg1snN4o7efmcaVUAMEo1G4aMpKbH4KMy4V7LWWHKDBqviFIPGMCQlmW5QehlRK4FAUmpH0umQ5zmuLKrOj1zjPA8RS5yQJCJiNBgBgkbSwhOKldVlfN8n9AOMrWpgYz4IdVTSN24E6LIkywpGRYGPR+D7dJoKH0uWDdg81UEKR3d1ROKHBL6iLEvCMKSQNU+CO7rJFgwST9ScFHW72NiaGRw4S1GURJ5idXWZKImrhILJabUmyEYFkLMOFCaOsGjCgTL2GPjdI6yeXO+SQVYKwcpx0gZ838dZTT5KsaYkbjaIAg+tS3Jd4vkSKWTtVjtEaXC2rL5QaIQqK3xPGyKcj8Or5aNqnTNWg/JRfoAT1Zn2exkKwWg0ojHRwmhDEkSEyqfMcwaDLgqB7/tVV82GutnGZylAl7ZCNIhCsA6hBWVWkvcG1fcGHnk+AuEocXhWYmWV4TWBpLVjmkV6hAQIFCvscQaDwBERrIUrlb1yY4BvHBaDxCI4TNe1opCbRne485PvAaZEnIAAvv7tb3Sf+vbVDHdJVsMheVZS6BwvjPBDj9I4ijJDKr8OomsBdOsCKJwkIsAZSBohB4cHkBMhKzblUNbFm2hwsL9C7AW0ogTlCVb6S6TWkXlVbcv0+zS9GASYQUZmIBY+7aRy4zzPW2s2xskNjEAWIyyH9ZCokeDLBqFuko1ynM4IfEe2soxnDEGckGaOSM6gpI8fK3r9JZyweDKursYd7VxUm6SoBa+yhKwJoHMO5SydJKZMh2ydapEVOaUumJtosrh0kCAKx+Bh6xZMbmjNdlVni3DyOGzz64K31jlTG5GqCUAQWYEdaFpRC5xDuwJXGvI0x0qL5/sUZVlxY0iHRCCFQwnwfIGUAaWTVdKGEPCpcr8WR4mVVZtdpWKhzAq8IKLhTTIRxCQiZzSqmt4mmi2G/QFKSCaTNr7vk2UZG8tkY6Wy7mJLfKUoyxSrTaVkSxBWMNNsE6IYg7ENRd14FAbowlLqnKHM+bdbb+CGG26gPxxW8aG1SFlloPM0wxMSsSGGtjVyeu3d4heCWb+FXhoxLVrM0XR/8po//K6F8D4L4I889Snsj7p8YPGzLMUp4WSEk5AVPaQnUX5QdTCIKiVfRzCIMS1O3VEhco3vFJFNCWZbuMARyAAXCIyzhKFPokLEqCBPR8xOTpBFjkWVY0pNwwnmgyYHDh2k3WphXbVx9DCn5YWUpipyu3raQLCORWkkuDig8AVFluNrRahhrjWNyYbEcRtTGtJljWc9GpMzHO4vMcxKUIpGo0VRFLVVXef12ejsjl1AhKg6ZFi3RL51lL0hoixRMiARihLoLywR+R7NKGGQDhCitn51I7UYW0IsWFU1ADiJFUcquGpKQ4EzWMu6Sy4q5RVojznThsNV7BQ3m+QuJ7MSYo9uOsQPQqyqJh7GWdWqxKKwQlDWjExC+LV3M17fSsE6W+JMTiDBCkfkJEljFtnPGQ1TWp2EXjrA5SUUmjhp4EnF4QMHmZycXEsgHeFWi3Vl4guJb6Es655W4whRTEUNDu/djxOOzpY5rCgQxhAFISIvEA60MLTPnGHx9iEjURA3PNK8xOJIopihGhHVEHWybpBfE0ABvpF0VIPbDhxkMojZNNlix/w57M4PuR3h/L0KoTgRAdw5tVU8/ZnPcB97/9fJdQ+lQuJmTL9bUJqMJPIxUmDqpIGlAlo9YoM4i5aahvJwmWE0GqBKR0FK5CmGwyGTcRu6Q26/5ptw3Z2c+7wnIdsBQVK5T3OEDG7bz+EPf5LpFzwDoeBb37gRrr+Nzc9+InG7gZXVhJyBGod+HfpOBDFZmuFnI9ouZM6L8Q+N+OKf/Gs1vqeoxt92zLDzERez+dwtDFXJinbYrCBYU8tH05rVvZ2etzZpYK0Bq9HOgrGgBXPhBM4ZPO0xyjNGo5QDn/g0XHIenflZJqemsNW+qm68EhXRzHprDGNIfSnWmYjWub4cTjiUEGscKZUT4GhoAXd0ue4jX4DDq9Xo3xC4ZIpLn3klTiVoX1E6TSEMrqY6ss5QWIExruoDRSKURbnaClElWJTxCaXE6ZKGMhij8dMeSsfccPWNcNcdnPXSpxCHPibN8Z3A5QVLS0usfvSzmCc9mqnZGcZDHk5UHXu2/tmzUAxGBFLgSx8/DCqXt5+xvHiAO9/xSZiEXT/2JMpEkVtD1PQRRtMIQwJP0ltaJDcDRKjQKseFhjzPwWlsaCiFWUvYjdd7bAmt9OgKiZoKcCbmFS95JZPE7GBe7B+uui2NzncUQulOEBe0E7R56mVP5APXfZyDK0t1XQoIPLTnSNNiLdU+3px2LSNZ9RhKT5IWA5SEKPFohRGUBYEV4IcUw5RpFTGhJd09sHNmG4f1gLzMaYYJppeyuTXN7fvATy3RTIezd57FbV+9jS2taYamxNhq+q1KSkhMvXlLJcjTAk8pJiYmcMs9TC5omQgGcMETHkrphexdOUx2663cvfxppqafwdRsk1RD5HxUViUNjKhawwTVs6ln6/yRRowFB4kUfj1lUGnvb77+XyCDy17yXBpezKa5efY3v4kvE87eciZ5d1A1KkjqGKpavVKBkRV/nxVjIFNVJ36qorMTAitMnaRwgMR3CmUlnhU0bMzX3v1OGMB5T3s8s9s38fl3vAvuWMbvW+KJmJU0x3nVuZaeoAiqekBYWpwBXTNWea4gMBbfVmKeK0WpLAgP7QqUBWEtaIjw4O4l+HbB3V+8kYuvuJQikAxkgZOKzsQ0S0swG0+gaqYn39UjXmPvRYByloZMcM7R6+U4afCMoO23mGi0uHUJ6EHHbxA2QnTaR2LRukBg0UWG7/vEcUw3HZKOcuJ2E096aAoqg2rWEnfrVrDmnsRiRyUd2cJLLT6CCMlus+h2NGa+vxYQ4Bw2iRec/XT3hLMfy2+96X+xmI4ImhJCxzDtE3ge0lQRQjXU6Wrt4WpRtSgrql7FutBc9IZM+jEyt/i+j/EUOrU0XUDXwDAtGEnw/QQzhIbXoLuwWpm3XCCjJmQZYudOmkWI8XxG2ZAJGXLtJz4OZc7cgy9l6+YtFCE4qemVQ2zDxyrFUDpa9cD3OZedw9JMjDA7kPYyxGjI1//uw1z2iitpz7WQQ5joCTwj+PSXPwdJzIMvugQRKkahoB01iFZG7LntNnYPlrHZkEde8Viakx1uW9rHwoEV2A1kcPj63YTTbbyhZX7n2XgzHYpeynzuc/2Xv8KDH/so9h88xA2f+SL+3DQPe/ITODzs4YWSm66/jh0XPAhrIfEjpBDcevO3OOeic9CR5XC2gvEljaSFGVhECi1afO0D/wGbmjziyifROnMre1cO8ZDXvAQvK7jmz9/DpisvYfNl5zHhJ3zrmq9w0SMu545siLWW7Trmm9d8namzzmJ+2xYO3HEnoYN5P+LzX/4c05efT3TmJpaLIVNTU3QPrNIUMdFEh2y5gDsWeNBzn8B1H/o0dnYH/vmbIQ5JnSZBwcVnMVMmFEHAgUMHiaxg89Qct3/7ZhZuuomJc87lvPPOQWL40mc+BaOchz772TipiHXAaGm5DtQg0Ip+VhJFEU5JrHJYW+B7HkJLbKEIVIJUllJXiUElAWdRThB41czlwQOLnHHGGXT7A4x2RNqnuSB46ZOfziPOuZStNDmDOXGPAfkxRYiTgIx9LvNCgNsqplle6VGWBeWEw/OCKu6yoiZkYA19Wo5NuXN1Xc6hZVUv88edkq7KcirPR3dHMCwghrKf0ZlpIZykGOXEzq/MQRtC7bF0cJlDC4dx37yb8qKH4E8lJCLi2rf8M+wB5uHw7V/isAeXveq5tCKPVDvKosCTHl4SYwaVmSlkyV2jPuG2Wcp+ylTQBmD59n1s33QZ6SDl8+/+KNydwgywAt/43J38+P/8Rb61uI9GHDHct4+7PvPNiiuzCV/62gd52E8/jZ07z+Az//gpWKgSB/s+8xU4fzObH/94Dn3hWtSjLmH27Daj/csc/ubt/MdXbq9cxCUobxqyf8duJrfNIUsNn9/N7oWCyx//ZFQB+/bto/y3byLPPJPUpDQnmhQ+DPtD2iah4zdJegLuPMy2JzwUMRtzU28fJpGoUBKqEFbh4Fe/yXkPupjuYpfhZ2/Cnn8RyeYWWpc0TUjx8VvoRxPMNqZYvXU/C9fexB0eMIDh2V2a3hYmmpMcOLTAlqiDGDpU6mh6ESSwc/NmruvD9R/+NOdOPwtvS4tUQlkauPZ2htPbYarNoetvZiLpcPfbPlmhXExA94brmPpvl/CRt7y12ogj+MpfvBPO2sxjrryK6WQSouo+2hJ86eNcST8b0fA8kkaEzjNEzfCLtJV77uwGwlawTlOWBuMEW8/Ywf6Dh2glHYrBkES2Oa+zjYdtuYjHyPuGlndyCvFZya++/NVcu3Ijf/2hN5MK0LGgmw6rLJ6sAuVxGtC5atDTSoGV1TiOdBJnJM6HEZLUk1glsXlOM4gQfgKrcO3fv29Ns6HqmCUAujBNSBgm2LBNfwVaLuBwN+Ub//KvsAJP+dWX0SszRCD54tv/Gacd5JZEJXhUSSPrKmJaFISNJlvmZrhzdZGZsMnw8CIouPvam9h8zjkcPnAQrOCqV72AvB0TNELK/oh/+d2/4EG/8RN886abWHrPF3jGzz2fUcPDb8Tccv2NXHv1F3nY5mdy0YufyY2v/xCswCNf+TLUbBOV5tA1NMIGzjjak5OwG570+y9mcTCg3ZzAOcEX/uotTP30cxG+rtbjGwdpXa5pJS2ued8noahcHFNaXFGilI/vBE3fJ+iW+L0C+nDeRRez5GXoICKaSFg+1MUrZaVQlmHCS4g7Ud3DoMi0oSgKSu2DrDptRKmJck05E/G4ZzwZ0/EZTHrsz1fJXc5Uo0WoFS2lUPuX+MK7/p0f+cmXUpSGc6+6hFuu/ia7JuZYLDWZMLjcwALMtqewrRYMcoajLlf9zMvIhaXMS4qFVT7yJ2/lyp9/HkErYmmlzzVvfz/cfQAzzDBeACNgDoTyyYqqNBYGMWSadJTjq4AxnMhaqkdYlKnAg3FgnKAUIIKQpcGIqDmB0ootzVlmiwbPetwz2NLafJ9F56T035wTbRNbmOK8zk7maOKtlqRLI5wGKzy0lJSyzjrWQbSt08IgkVYhrKoTNOsPZQWBFyKEoDQ1Z0MbmK6sCQkwLaHpgQQpq7EaaR1oiMOE6YlONd7uwcrSKkJDKAOe8+pfxHMeujDEfogSHpSuyjIKCQrSvODwwQUaXowblcy2p6AHUbPBZNBkz/Xf5vyLLiFJmjht6C530YWBFvRWusx2ZsCHW2+7g8CPWDy8xDnnnMcVT3wypjBsmttM1KzIJVQjYv/iYYqigFhSdkcERjLsDWGKasQ4iXHtBiNbQgkq18R+RHjhdujCjIzID69UVmISGs0mnU4HZ8AZhxSCsizRWtOKEmhLBqMheTXKzkq3Txw3qnrlCChgZWGZYpjXc5uGCJ+JqMnq4goEUKYZgRNMxwmeH5KGkgVRsFyMiCZaYCy+AVUY1KhgcPs+cJDlKbIRceHDLgcJg4OL2KUBHT+mHTZAQdHPKAYjRNIkkgFJkmBCHx0ots1vBVEl4vrDlFbSqPbHIYhUiK+8qsO/VydwpKI0Dt8PEVaQDlKCIKgTcrbullqPzaSrewycIIyb9IuCQkiMlrSDFmKl5MrLHsvDNz2EEMXu/JA7dRYQcEXO+cFWtosOi8uLbOpMsewXDFyJERYpqiDW1sLlsAjnCEuFLB3SSkKrCApL4iTNosYKqyEUBq6ESbj8Rc/Cn2pjdYE0gkTGdPcf5qvv/jBDZeianOVsCB6kTpMVgkt/9Flc//b3cs1bPwQRXPRjV7G0f4l4UxspAnINzmlCLySUIbImD8zTglYzwcqAVqjQiz0IIVsY0kpacGDATd/+Mjd97MuVQogVLBiI4fDde3nQBRdx8ZMfww0f+Dy3fOKrcEaLZzz3eQxzQ9xqkK30yFb6oKEoCubm5khWU+hbOs6noQX5IK2ETXjkJqMY9fFdxTAaaolVivMvvZTrvriH5f2HmJmbBw1bnvBoVgYDskhTUBJIHxn45MbSTLxK6FYtSA/hHL6R1XYoDZPNztrOCONG3UsLEyKiPzR4viSRIRQQSg9hDTYvcZ5AdmJyL2Op6GFXMxphhG8FbpDREU2+9rnrYT+0Wg1GaErhYEeHPTffxpmXXczhUU5ZVDdfOYkvAyhdVZpYXGA022RyborVb+0Hr05uuaqxnaBKdbcaDQa9LjSqWH5kSrw4QRnDYDSkLX2aSQtb1qBWteWzwlVQG3UrIU4QRzGLvQGt6WnyQYEZltihZqua4pnnXIUhZTtbxEam7+9+FuIkCuDWoBrp/62X/bK7bng7r3vH36JajiAWlF7ViWLrThS3ViRWSAfSVlgjylFn6MA3AmVgUGZ4XoSJJJRgmj59kaFFSauRYAtNGVUau/AdYTvG74XVwpcp+AFT7RZPfNmL6SQJK90et9xyC/tvvZUHP+sqRCeiMDkSRRwE6LQkGxaQwNzMLN2yy8rSCo2wiS2qOPRhT3kSB/srMBvx0B95NP9fe2cebGla1/fPs7z7Oefuffv2OkP3DNMzDMIgIqCEERQ1LsSIUYuKUkKImNIqSkLiEpxYbkETg1sRqqggJEgMAuq4oAKKa1SCgWFgmJme3u7t2323s73rs+SP59zb08TEGWcmxEo/Xaf63u7bfe459/29z/Nbvp/voaVDuLmM3fGI5cGA7fGQ3tFDdFXFLbee5umvP82IDqM99/7nd0Kkee4rvp6FLCdKNd18aFgPh7tkJoJM0+yNSaUOO2QERjqSQUYnZRDlSsAabKwY247nfdOX86H3/QbPefGXEp1Z49jJEwxlQxonGGOppg1xkWFjQYljKGs4IvmzP/wDnvn857EY9cmKHnvbVyl9Cx3opy8hkoimmsIUFkXCuKxxruXk/Ap/MQbXtUSxopYGaxv2uoou8fRXFrESVG2QlSXXmg/90q8E+eMJuPc3fxXGQ+jNQVdy/iOfYO30SdLFJVTkYDaxk0QK31bohR6Dwys8Mtqg9oZblufBQK0sIo1D2qAVpJa6q1FpxJ2veBlqLsYkEeNqQjSXUw+HeKFJ05y2bR9VlfezYPShj+lD1Xk4HLO2dpRH1i+zMjjEQi8juVrzL1/9enIUuUue0DnySR8Bv5Xj4tnFGV586i6W65heo0hbgbTioIwshDjALrQKGu0wKkymWBmOAxKP9J48TfDCU9kWJHSJx2eSRjtGtqSTHSKSEIGVDuMNQoQdQilBLAQf+flf5MO//Vv4riX1cNeZ2+GRkjxJ6YSnjTwkYbawaWq8M2Bg48J5VufmyKXENjV/+Zu/DvMR/VuOYhdS8jM38xcf/TBRkdC5lt5cAZGkPz9gb7TH79/7q7zvHf+RnekeyVxOa1te9Ip/ADs1MpJ4ZTGZgCEI7en1M8bTIXjD0vIcbVuzU42ggb1uSuVbjPaISIABHwuu1GMWTh5hYXUFduEvP/JRztxxG0WRoYTAjkoO9eZQjcFUHZXvGMqWZinjjld8NXzyEsWkIb64TXTuKsdlxujCOhyN+JKX3Y3VHqXC87XrVzjaaQ41Ar07gSjkSk7DnjIwFxNn8WwMz7O9sxNSDmOIkbDpQMHd3/b1fOFX3s1zv/1becG3fAPPesXXgIM/+70PMh2PiJSEHrTa0WoH0tLmkqt2ilrIiRcKLg43oQ+7NFyxY8ZUYUohgYkpEZlkcHieeKGHSzylrTGuI0ojvLc01XQ2JRWq8uJR/FUvHEaGVkcSZ4y29liJ5xmUimS744de/c85zAKnWRNH5OITmod+StQQsXO8+u5v4cIvXsBPd1G5o4xCL4vZlMT+6Nb+hIqVAaXkNTTS0cmg4K6swUlFl0mYg9LUCJmiU0kiE7rKYCILBVSyozIljbagQcwldN5z/GtfyIXf+iPe/wvvDHmjDTlkk4XgtxFBwOo8eRrRiyPYhj/8lXvDz2QpVPZ4zs3c9dwv5LKbEKU5N991O/c98BAfeOs7Qm5qg7J4+aXP4WnPuoPnvvxlfOL3/4QPv+f94XgkgQq+5A2vZGhqurblBd/wFfzRL9/Ln7/1XXDbAi96yVdBC13smcqWMnVwHNqepEsESsOkrKCAOvZERcZoPOaQzsMbWsHqscNs7O1Q0XD23b/Fba/6SubTnNKDVxIrJZvTXYpckX3xKf7kl+8NzN0eMAYSeM63fz3TvmbixizPB7jVr7/n1wOPt+HA7tungkpaWtVAobBylhcOUvIkpalqEqnocDCAW775RYznFE5HNL5lMh1x4sQavHAZHthifqlPWZaQwJAaRwP9iJGvqHOPiCRTM6Xoh8q3PFRQTUbMJSn7mAHZj7hS7fHxd38AIjj2qq+mWOxxdbLHIM5IZmqPJIlC7jfL/8SsOu88dDL8dxpFZDTRFBaJeeaRU5xgiWSfcfxEVfFPRQCekGtigyv+9d/0au55+5sRUuKUo0QwnJbMzfegaRBC0LQtsY7pGkOSZZS+YURHk0sq22JjhfOWuVOHcUfmEDFoPKYs6VRH44DMsvyNz6UbCEptYCkl/0dfyIac4KVg6dk349Z6XPr4/4DplOTUKY7ddILNuKGNxGwyxOGlxwjPlfGQU9/xPCaTCZNUky4MWBnME2cpE2WpcVg/IS0Ud/3jl3Pp3Hk21y+Ad6Srq/SOrLIjpnhtuOXvPZuzx+eYbFyENGFw/AQbjPGFxsmWleMFx7/1RVw4+xn6t57iYr1N/2vuJDq2wCRx2CSl91V3MU4tpW9QXUmRK+Zf8RwmhcOYjuXegPrCCBZCkFe+JZ/rMRmWMAFddcz35jHVGNtLaLHEvRSnLHd8xfMZP/vpfOZjH4fxmNUvuJOlo4e5Ii2i8DRSsTMdcst3fyWXH3yE8c5VFk+f4tjhNc5dvMDgyCrbdsziFz0D4w3be9ukWYopG3oqRkmw04ar0ymHXv7F7BSKtnCkwmKMg1Rz1Y1Y+5I7aZ9dMaz3cM5y9Ju/FNFLmYiapbtuw2cxu7IMfBoEPjMkX3Ynl7s99FzC5mgP/ZJnsDy3xFi1dD2BuPs2ZKoRqaRtKySWXpGjJgbjTWCSi1Bn8M4hvZ9ZmEuMVAhDeB3EHI3mWK4yvuOl38gzOSKejODzPIUOuWscEibt/Jte9wbe9Iv/jqnpSHLN/Pw8nanxjSGJYookQqEZ1WOM1rOdMNCipRaUdMR5yvzxQ/i2Q/YzOu9wUZjli7MUSUKBRWQaIkckUiKxjJpPuLq7Q9VZ0tUBN730+WAsQiuMlhhpcYTxMNxMnZXI0DtMY2IzRxoriDVCaFrtmGpLQ8hlWw+VlszfvEp60zJeiVB9ixStN3jrkIni8JmTdLefCNVYoMVhIkOURIyspeitMD/nmZubI9URy8VR0vk5JvUE3c9R0RwmBWc80oW5UH24j+hnpMRsb14hi3OQcPPXvoB2ELPVjXnk134H7hyQZDmmtURSYZWmtS0dhk4ZNsptFtfmOPNlz6PuWop+j9IbxnWDkgKSCGMs/cMFRw/dwV45IckzTJrRz9fwUiGUQGiPtB3aCLTSgZ5mQgFNRBq12Mc6g0kV01SBAddYrHTI2GIXE1QhUblCWkGkMigSVJSgU0MdQRVblPXoKCZeLljsHaVKPI1oWBhkHH36zWQqYtzWyDji5O2nSbKIvWpM2i/IipTpcA86TbGWM6rHB7Bj5e2sKr/vkxzodsvzi2R7gnZzyI9897/mFGtPqmr+KRXkHueoGNP4vowRnaWtG8amIkojDi0uUY7GdOOSNM0pvKAnFbV3RHhU05LnCXvVhEoEsw4jJaN2ghOWtIgoooThsKTQMXGe0nqDMRa0Ik40k8mY+UGfum2pm3Dm1xLatsJYgUwiYulxLgB3nTOh1JxITBTjZIzVYaC6bA1WQqUFTkkiA8LCsB6RJjFxEuMEtKbDmDqMSilBbS06UagoAhnaAE3XYg10WjHtDIO8YH5lHuWhcR0i04xdzcTVZFGEHqR4b1E+BL7zBjVIabUjrTsefP+9PDgCjmkOPes0G/Ueph+z+qqvpbu6Q1tE1HWFSRRECmc9xtuAUMwUjTSYDFrpacwE7z2FkkQImrrBdS2lhrTIEFnOxHQ0bgq5xHnwSoASaB9B63EeZBdAUA6HiiPaQUzrFZ30WGnDSG5ksbYLPeF+jMoj2ll9yRUxbSqp6gkmkbhUIYRAe0/XtTTe0EQOn2hs5yi7Gu/aUEPQniQRRCplZ2+HtEgxTUfTdeRxirKesm7J0gFuuj0T2wuE9wdBaGcjy+PxmKSM+LLnvRhH9XcPSRGT8rpXvo63fPQdfHp4HtVLqLuanb1dEqlJ0hTvA4WsnTY4Z0lRUDYkKuHoYIVhUwZlhZIordFJ4KSMphV5kWKdQMcaY1qsEigtUVJjqwbnHFGs8A6MM2gkRZaG4o+3YA1aiKBik9B5Q+M81gusB+sEwnlSQn+wC3BPfOfwxhElmtp24bkIQCWURMkgYPXCU3cNpi3DBRRH6EQj90FKsWTSTClkFCp/OKz3gRVT5EzbMhQLuo54JoGxtgMtmbYlzcRx5lu/Do0g7uVs+jFlLqh9iYolg2OHmFrPVASWpnMWJxxCSrz0oBWjbkrnHT4SRFKRqIjIgmtbYgFRltJ4y1Y1xKhQ8jfOhokrMfN4n0kUnBIY64l8+F69lFglqIWjFg7jHJH3GGTg+QrobIuNI7yEsmqQeKxU1LZFJooo1nTKg+lQIkiinBKkSUrlAiVBa4XOFEKpQElzhras6RUF1rQkKibWGt958qSg6A3Yng5n0iKB9jIUrbxHumvoDykVr/221/KlnMH77pqi+0laTykI42E2/BTLJzY/zSMXHsHaoDQ3xpD0C2yqaSPBngkYaiclWZbTo2AgUopWooYNaeUZiJyBKtANMDVEBiIVQRQxwbJnWkbeUHrL1Bpq4XFasleFRrNXAkOghHXWULcN4+nkANl3oJ3TEqtlKMxE4FSoAkZKhwuYULCh8wjriHVErCVaCRKtSOOITGuUA1O3eBtmWvtZTi/N0EiU8aHV4gWF1ggTAEJOcC1wfYBLCSdI0OQd9KwkEqGlo6TE4ekvz+H6McOk4zITprFlSoNINJ10NApGytLkEVUsKL0BKQ6az513dEogeimqn9NGgsqZcMx3DtO0QRQba0wk0WlMkqVEUYRQMjyER3qHxodBdOVxUiAijYz0bPop7OApYUJMznpvURQd0OAALAInFV6HnXpS19R1DVWL7ghNfQfOWmzbEbUgpx12UqN9UNY3TYd3gqWlZWxjSGWMbj1+0iJaKIcV42nJoFgEqR6lEQ1imf1WmJoF4S/8p7dxnk1K4Tlbnn/SOJ7+qdoBN/a2/dr8khAUXOYC937kd3FKoJRAOheoVkoyqaogDTQGmWYI4albw3a5y+233MGRI0fIVlf47IVHuHjxIlf3dtA1xLFmTiW0TjOeNCipUC40jZVwOO/pmg4JDIo+zlka75FaI/B0LtC18kF/hin0AadgbegEKYFQCi0DlzNGEHtBYxxGh2BVQhPrgLzbRwt6KTAucE283ZfP+PCc1oILOwAzXaAX4FuP1BGtArqOxAlkpHHOM5yWyCgMAkdWgnWYSGIkREIhtWdzd5t+vw+9BB+F3UQLSSYlIkkwVYdUGpnGGOHCpBAeYe2BONd5j21bvBDYrsN6QaxiVKyRApqupbUOIUAbj2tqsI5Yabz0QYNpQzHLCrBu/z2SQXnugnIgFoIYiZyxS621qDgOFfHOggwoRCFU4JZKSZH0cd4grUc7H6ZTgEREATpsHX2doiUoF8hncZ7TtC2jvTG5V6zNHUIJydHjJ3jG057DAxc/y0P3PcDWdDRDhwS6nPQiwJKdxdowxxzHMV3peMu7/gM//sofJMnn+H8+B1ybXxKXMP4sV3n7b7yHXVNjE8GVK5scPX2C0nac37jI2tpxVOuQ3mKqjiLO2Z2M+YuPfZybFg6ztHyI+y+cZ2PjMl3TcdtNpzl2/DiR1lw5e57PPvQg2hrSXkFdTfHGUtuaJI4xtaHf70HnaGxI9oUO3JLOORrb4bWHWOGsAxeCIhgVzajQeJTxRA505zFqNlAuAybeCYERCqdmgwaEY6WQgkRrYqUwHlobJkWcc6hIE8cxkoBY94CME2pC7qpMuHBFElF3DVkU0dSGzIeZ2UpAF6kAF9IRS6s96rZhZ7LLwtI8TBsW05zyyi55WmBF0J0E/G+YKFHCQdsRRxHWBkWKshAlCboXQFBd29F5R6/Xm4mOLT0EqnIIEzAkSsiQszoTaANSzgg1ng6L3NcsWk9sPZEQaGaQ4NnfubZD7fNzhMOrQFKjdSgkUka0ZZCnRR7atgkQ5FnlnM4x0Bld21C3FVGv4LZTt1MsDlDeocuaB/7qk+yNxvSjHpcGF4hUTNGb50//259z6lm3XncQlD50WGILxnl0Irky3uLw8gofevhPeeHxZ3MkevKC8CkjY/+xP+t/5F1v4by/Shk3+MQgc81oMkT1MqbGBFpx6yl8RFbDF93xbHau7HLl3DoDkTIcjpELPRpvZyChII7s5SlrK8ssLy+TLAxI+wVnH3qY7dEe2+MhS6srZEnCzSdP4NqOvemQ81ubXNnapBlPEdLTakEj/YE6PXEiHO8O5lRDBS8SksiGH0ijYTcXGOEpKg/WYlNJJ3yYTtlHbQiPcOEYad2MyizkdUddnMfM3gOnBGMbUIqZga5p8VmKmRG6KRsWfYwVllEShhB8acjjIGRVkSbKY7quw3ct/ShF1JZIaWrn6KSkwmLw5GmMspZ2MqHIczpCzmQ7gxcgpaY14eMkirFNcGfSWqO9QHWWSCi8EFRdg4tmNmkoVKRBKhprMDO8vvAg3ezI7dzBUdNrQEc0TUek41AAQWKVAusQXcinZRzRSzPuOHGK44dXadqWSTlmOByyvr5O13WcPH4TR5YP0x/Mc25jna3dHS6tr+PqlqS2zMUZOEFdt0RFgZOStu7oH17g9Bef4YMf/V2wTYC6yUB7sTMRtDUwnyxgNkoOywVOuAXe9Oo3kE8FJ4vVJ5QRiqeSjF2LkstcYVi0lHGLEg7RtugowXYOJSXeOtJ+gdmZ4saWf3jHS1m8IyNBUNBn6lve8f5f5sGNC9hUcnWyxWB1gWlX8amHH2ZxNGRadQgVLu7JZMLC0hLPuuWZHFs4xvrOeT55/wNc3b5C2dTM9QpOnbmdZ935LASKT537FPd9+j6quqZtwsBxFCmEknTW0nQtUSJDIUUFi5Ok80RSBGKYUJjOonQ4MuHtzPTEolBItY+NACn8wfSPmBkdKaUREoyz5AhEZxBCkmYxBo9yHtPWSCWY+GD86ZxEGoeOgumKTFQA7tblQXBPTIPUAultoBIELxciITBdg/UOmcVUPqAEvffsXwnWW5Se2ZiZFq0DgVt6MctTxQxMJlFpjAgt9iDfER7vLMpapBdI6VFC441D2KD61DNzGWc8trPExEgX441lUPS58847OXPstiD7mmzx4d/7CHav45OXP8Fn9P3ceuo0d911F/awRXYf5+HLD/Gx+z7G/UkOnQipgdMs6h62iumLhGarIpURdzztdr78ZV/Ogp7H47nMDj/w3jfTJh1KhaM4MwMbCyAkKtIMpxOWF+eY7lXseMmUGlX89aK/9b1df2R+4TEFpgjz0E9sB9wYjvza3OC6J/zj5mP+je/8N2zNWbaTlkaH44hyASPgRchjHNA0DStpn8FUslQn/Ogrv48eMTmajB4djgktW/WQJM35yCf+iO1yh089+GmubG8RJxnWWrIsQ2hFWZZoLZFaMRrtsbSyjIo1x44d49Dh1bDjOMPW7g4PnX0QIyxpljE/P8/c4gJZkeEElHVF1ZRsXL3CuBwzHI9miD1QWs9IaKFQso+CD4aZ8gBh4Nx+kcFdV2h4NDBJiCBIPmDH7CuufSBwJUlyoALf93x49NdG6hpp7boEf9/uTPyfrwVrr5mLSmbegl6CD7u6mBV9sPtVwXD09N7T2ZYojyibEmNMQOerGJxHEQjWprUkUUw/7zPo9+n3+8z1+uR5jyRKMa2hmTYhx9/cYtDrcfzoMeb68ygEsY6YDMesn7/AhQuXsE3H4uIiCsWV3U0qP2F5dYVqUpKnBe245pmn7yRqNS96zgs41FtmNTtE7Wu88PSZY8iYq2zzw+/4STb6E6ZJh0YEv42DFkHYkT0KWsei7qMmlvlac/edz+PvP/duXsgznuAOqJ4cf8D14aY/MrcqznHF/9pffpDf/uQfcDmZspvVDFVLp004ivgZlWtG8/JCovKUqmxJfExcSYqpZKVO+bl/8mPkOG5lTaxPNvyR3ppY77b8kWhZPOw2/NNkaIie54o3M3RPTUODISZlmyH3P/hpHr54no3tTXYnIyZ1xbSpSfIYHcdMmyog+rQ4aB8Em2YRKMxKcuuZ28iKlKLfwyuoqoq98YjRZETXtOxsbB6YcPb7Baurq6ysrFD0e2itaboO6zqapqGqa8qypK5rmqbBGkNbtde8HazFGIN5lAdgXdeznFNchyUUInzPtjPXBdo1x9sZeU2p/yXg9z+W3qEjiZaKOI7JkzQQxXWMnlUHlxaWSaKIJM5IohitI7yxlGXJXj1hc7jF1dE21bQmjmP6RY8kSSjSgiLLObS0greOqmrY29ll+8pVdnZ2KMsa2XoWfEyuY9q2pa070igmiYK1gHAebx0Lc4ssDuZYXFzm+OEjrK2tsdRbZkCOYIaSJOGNP/FGfuCNP4BGcwcnxIbb8mvyGhriAiO/zi73jc7y0+96K808jPKSLjIHhqMHNyYJVkiM9WivSa1iIHLUbkOvi1gg4Z5X/wuex9MFwPrFS/7IsaOPKyBF9CT5Ax6ZC2fhPTre/qH30i3H1MrSySD30O4aSSq8UBHGfoDJ7pCoyBmblrTIII7pmYz33v87fMOZl3CJPX+0F4LtSBTezKfJNbG+ddkfWT4sTnBIXG42/OEkfM26u+wb39FTixw7/QLs6eeH0SUUNR0lU0btlIfOPsxf3fcJLmxu4OyMEeMsxs08JKRAKMvZP7yPONZIrehsS9U2IARZlpHlKcf0IipRFEXB0tISK6vLFEWB8Y6268h8xN5oyOjKDptbV5lMJjjCzhlFEdoHdqhSChIJScDHKxWo1IcOHQIlDwxcmHlK7FcJo9lA8ecG4L47UtsG996uCzeB/UfXdXhj8fvOSdZipobJzoS2bTFdh7eO6eKIwWDA6sph+ss58+kcOtU0UcNCXLEo+yyagt1yD1MZ3NgwLUeMzSax0ny2/O9EUUKsozCMbyx9q5mTA3IVo/YaUiRSxszNzXHzyZu56fgJDh06zFx/QCIjUhJsKHGRkeFmJp05cZACAefKDb9YFaR7kqfPB3/5Rwff+cm634sbPjs+x0+96y3kTz+CSRrseAL79nD7Oh15bTxRxRqJZDyeYp1hvpeTJD22rw6p8Zxj0+vdjqPH/hb26fJJKsJcLB/2e3nED733p3nIbXOVMbqQlM2ISIGXnk4e4LhQXqDtLEGPNZUzOKEppw2HFo9gt2tWXY/+SPHTr7mHeTQnWfpfXuBGVfq1LH/ML3y9uuQdnmNZeLMu2Q3fKYlFIJHswzz8DBnssFQ0WCzGWzrX0bYt48mE3d1d9qox959/kN3pkOFwyKQq8SJMfuhZn2zSVCDlQc/MzgZ/7f6zSAPSHxxd94+e+0FW13W4Gcy4oI8+Wu7nUo/e1faDbz8A9aMC9HMfCoFpbUDozzzf9wNbiZCr+RmZ2hl/ELRaa7SOyZwkrx2Zk8zPL3LixAkOrxyiKAryNKc3M5tRIkLPzM/kdVo4RU6EwNGa0D45psKN9GK34YWHo/FjH/16/Q//oH/NP30NZ1ZOXPdvzk4u+KhX8GP/9Wf4xPQRdnqG834Hm0HmPcqbGWF8FoRSYGQYR6uNIc0LYhFhq47UaOyoZikbUOwJvu7WF/PGF71WnCsv+JP54/OaF8mTtAPKPOKtH3wHH9t8gPGSxuSeQR6hRQRdFxrH+EAj8/IgaZc42mrM3KDPpKzoxRLbjtiZ7LB85DRXyj1e97Nv4Gf/2Y+zuXe//6L5MwcvcKNp/sbg29i86NdWr92ZjmTXHxGOqscx1ydmCoAsPNYXN32D4Wu+4CWzYGLmrd5R09FhaL3FCRiOR6xf2WT98gabO1cZjcdBmY7ByxDovnMYZx+VT3o8jlymIdDE9cfLEHTygDq3b8wZ7K7twe+RT/7aP9+ndOfxYKZMkbM8UKJRKKWRQnL61qextLTEkcNHWSgWyAlTSAZHhAkYkG5mFyYj1lgSF+1ljxMcix5HlfBzrsRj0eOfuexaSz0rpoVBkMteotnrNfzMu3+Oc90VrqoRZeyQKRjX4I1E7dsXHLiH2zApLaHo5TRdgxMG5y3GdWSDmKnvsKng1z72u3zFi17mZWo5+Xi/Yfsk7IAP85DfpuY733YPzYk+66qkES3l7harc3OougXhD/RVVohAFPYK5S2IlvFwyNLcArGKmZQ1edZnOqroxwPyOmZQx/zkt99DD0XPRRyVq58HL7cnmCez5Q377BExg9hKWjr8AUdbHvwSs6sh+KGLg8/dwf3g2p+FXft6C4D9z+2MPre/+wjU7JmDFaehum66Knjfhn7eGvPiIle9QrHGorjEVY+7tpuu/TWnks/nesOb/5V/1Xd9B61qiZKcFthmyA+//cepYss4qqizjjETatnQG/QxE49yKlSpZ71fL8LuZwV0OBprSNOMLM6gs/SyHg99+kFuO3wz802B2O74qdf8MCmeZXKOPUZ/iUSIJ1aEucSOv8AG3//2H2Wz59hKLHuqJp0vaIZ7LMQpsm7CD1qGyqef/ZgjH+6juIYs1nRVjW0Neb9HVXZEWU4zaSjUgLSU9KeK73vV9/DM+Fa8bTmpjvydC8Ib66lbG822v+fN9/Da138nRb7IhI51dvi373srF6aXEf2IkR0hMk9HQ5JKJpOSSPWRRNdZyvnZycWKIE1ygNQR0+k0HM2d5/DyYfYu71CYjHmbc1O+yj0v/14GKG56jDemgfhcy57HuSos3/+2n2QrhyoCqRVFlCFKQ1/l+NYjiBEkaBcTuRjlY6SPCZqHGGRGZSQmynG9HlMPLk0w1qHThEZ22LmIK3HNT7znbbz/wd9jrOobV9yNdf30VbIk6rZEZoohEz7tz/Gj7/73gcyWa4bC0CWazocpAFMZUpWiRDy7Rq89FCmalIiUyMTENkY2gr4OFuOFzhnvjYL1WiQRvZjzV9e5v3qIEsN5u/WYdrUnxIT5zOVz/my7Se09tXPIRpB0jnjmI7VvMSUPjlfMBJAykJpFOPgrH8xb9lEU+wcq5UO93VvY3tvlptWTUMI7f+W/MHnuNs+4+3U3rrob67pl8Ayrkm1R8fZfegejdorsx0RGIrzDWjU7epvZdSfBR+D1Aelf4q7Z2Ql3nbHNQenyUSHU1C21LFnrzfMLP/fz/Mz3/gSRSh9rCvi3ywHP7Wz4933gA3z88gNcWJoyTbsAVOLasKz7HMOs/T15n+3fBTovsdXgJVa62cPiZv4NjuB0k0QJ5d6EeVmwliwwPbfFrSvH+a5XvprTxYkbR9Ebi3Nm2//Yz76ZwfEVzg032BhtMTi0xKSuAg4TQNiZuYrBCR+8Sqw46E+zXxz01yZV5P8mPNzMW0TnGdVeRVJ7lnyPRZfxpu/5Po6qv/kYGj2RHPD87mU/Tjp2c0tDR4ogftSWGsxQHA4RXsisOOA4QKcACk2CPPAKDFZWZlY8CMrkljl69MmomGDGNWv9FW5hRZxtr/qbZzS2G+v/77Vux94omFKzWW1zJDvG2fIcc/ngwLWJg2vMza7E0CEWj9osrrVJwlUpryt1cdCmYmaLOvQluehxmGUmdod5Mm56jNV1IcUTn4Q5y44XOBJgjeXHHAwX2fahJpewRiGuL+6MDiqGNzEv1v2WPyKWbwTajfXYizJ+1+M9a4+TWrbBtn+s1d0NrvgGx00cFg/ZS57GcCo/+ZifT2jhnzI1xI11Y30+1+bWJb+6fPT/yk370njdH+0//qq80OpGAN5YN9bnawkReXnjbbixbqzP13LcCMAb68b6PC0puRGAN9aN9fla3nv+J92Wwyax86QUAAAAAElFTkSuQmCC" width="70" height="86" style="object-fit:contain"></td>
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


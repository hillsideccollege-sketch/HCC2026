

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
  let y=0;

  /* ── header used on every page ── */
  function hdr(){
    doc.setFillColor(...GD);doc.rect(0,0,210,32,'F');
    doc.setFillColor(...GOLD);doc.rect(0,32,210,2,'F');
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
  let y=0;

  function hdr(){
    doc.setFillColor(...GD);doc.rect(0,0,210,34,'F');
    doc.setFillColor(...GOLD);doc.rect(0,34,210,2.5,'F');
    }
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
<td style="border:none;text-align:right"><img src="" width="70" height="86" style="object-fit:contain"></td>
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


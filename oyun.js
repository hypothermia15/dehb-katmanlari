'use strict';
/* oyun.js — "Etken ekledikçe ne değişir?": kurgusal bir çocuk, yanında etken düğmeleri.
   Veri icerik.js'tedir (TABAN, ETKEN, GRUP).
   Birleştirme kuralı: her etkenin tek başına verdiği olasılık, tabana göre bir olasılık oranına çevrilir ve
   seçilen etkenlerin oranları çarpılır (bağımsızlık ve nedensellik varsayımı). Bu varsayım sayfada açıkça yazılıdır. */
(function () {
  const $ = id => document.getElementById(id);
  const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };
  const tekOlasilik = (tur, oran) => tur === 'OR' ? oran * TABAN / (1 - TABAN + oran * TABAN) : tur === 'RR' ? oran * TABAN : 1 - Math.pow(1 - TABAN, oran);
  const odds = p => p / (1 - p), ODDS0 = odds(TABAN);
  const TUR_KISA = { OR: 'OR', RR: 'RR', HR: 'HR' };
  const tr = (x, n) => x.toFixed(n).replace('.', ',');
  const secili = new Set(), ayarli = new Set();   // ayarli: "aile etkenlerini hesaba kat" açık olan etkenler
  let son = null;

  const etkinOran = e => (ayarli.has(e.id) && e.ikinci) ? e.ikinci.oran : e.oran;
  const esdegerOR = e => odds(tekOlasilik(e.tur, etkinOran(e))) / ODDS0;   // tabana göre olasılık oranı
  function toplam() { let o = ODDS0; ETKEN.forEach(e => { if (secili.has(e.id)) o *= esdegerOR(e); }); return o / (1 + o); }

  function paragraf(metin, cls) {
    const p = el('p', cls);
    metin.split(/(\[[a-z0-9]+\])/).forEach(parca => {
      const m = /^\[([a-z0-9]+)\]$/.exec(parca);
      if (m && KAYNAK[m[1]]) { const k = KAYNAK[m[1]], a = el('a', 'atif', k.kisa); a.href = 'https://doi.org/' + k.doi; a.target = '_blank'; a.rel = 'noopener'; p.append('(', a, ')'); }
      else if (parca) p.append(parca);
    });
    return p;
  }

  function dugmeKur() {
    const kap = $('o-dugmeler');
    GRUP.forEach(g => {
      const kutu = el('div', 'grup'); const bas = el('h3', null, g.ad); if (g.not) bas.append(el('small', null, ' · ' + g.not)); kutu.append(bas);
      const sira = el('div', 'grup-sira');
      ETKEN.filter(e => e.grup === g.id).sort((a, b) => esdegerOR(a) - esdegerOR(b)).forEach(e => {
        const b = el('button', 'etken'); b.type = 'button'; b.id = 'e-' + e.id; b.setAttribute('aria-pressed', 'false');
        b.append(el('span', 'e-ad', e.ad), el('span', 'e-oran', TUR_KISA[e.tur] + ' ' + String(e.oran).replace('.', ',')));
        b.addEventListener('click', () => degistir(e));
        sira.append(b);
      });
      kutu.append(sira); kap.append(kutu);
    });
  }

  function degistir(e) {
    if (secili.has(e.id)) secili.delete(e.id);
    else { if (e.tek) ETKEN.forEach(x => { if (x.tek === e.tek) secili.delete(x.id); }); secili.add(e.id); }
    son = e; ciz();
  }

  function bilgiYaz() {
    const kap = $('o-bilgi'); kap.textContent = '';
    if (!son) { kap.append(el('p', 'bos', 'Bir etken seçince kaynağı ve sınırı burada görünür.')); return; }
    const e = son, tek = Math.round(tekOlasilik(e.tur, etkinOran(e)) * 100);
    kap.append(el('h3', null, e.ad));
    kap.append(el('p', 'oran', `Tek başına: 100 çocuktan yaklaşık ${tek} (genel toplumda 5)`));
    kap.append(paragraf(e.bilgi));
    if (e.ikinci) {
      const b = el('button', 'ikincil', e.ikinci.etiket); b.type = 'button'; b.setAttribute('aria-pressed', String(ayarli.has(e.id)));
      b.addEventListener('click', () => { ayarli.has(e.id) ? ayarli.delete(e.id) : ayarli.add(e.id); ciz(); });
      kap.append(b);
    }
    if (e.ders) kap.append(el('p', 'ders', e.ders));
  }

  function ciz() {
    const p = toplam(), n = secili.size, yuz = Math.round(p * 100);
    // halka
    const C = 2 * Math.PI * 104, h = $('o-halka'); h.style.strokeDasharray = C; h.style.strokeDashoffset = C * (1 - p);
    $('o-cocuk').dataset.duzey = p < 0.15 ? 'a' : p < 0.4 ? 'b' : 'c';
    $('o-yuzde').textContent = '%' + tr(p * 100, p < 0.1 ? 1 : 0);
    $('o-yuzde-alt').textContent = n ? `${n} etkenle, varsayımlı hesap` : 'genel toplum';
    // 100 çocuk
    const kap = $('o-yuz'); kap.textContent = '';
    for (let i = 0; i < 100; i++) kap.append(el('span', i < yuz ? 'k dolu' : 'k'));
    kap.setAttribute('aria-label', `100 çocuktan yaklaşık ${yuz} tanesi işaretli`);
    $('o-ozet').textContent = n ? `Bu hesaba göre 100 çocuktan yaklaşık ${yuz} tanesinde DEHB beklenir, ${100 - yuz} tanesinde beklenmez.` : 'Genel toplumda 100 çocuktan yaklaşık 5 tanesinde DEHB vardır.';
    // hesap satırı
    const carpan = ETKEN.filter(e => secili.has(e.id)).map(e => '× ' + tr(esdegerOR(e), 2));
    $('o-hesap').textContent = n ? `Hesap: taban olasılık oranı ${tr(ODDS0, 3)} ${carpan.join(' ')} = ${tr(odds(p), 3)}` + (n >= 3 ? '. Bu kadar etkeni birlikte taşıyan çocuklar üzerinde yapılmış bir çalışmaya dayanmaz.' : '') : '';
    ETKEN.forEach(e => { const b = $('e-' + e.id); if (!b) return; b.setAttribute('aria-pressed', String(secili.has(e.id)));
      b.querySelector('.e-oran').textContent = TUR_KISA[e.tur] + ' ' + String(etkinOran(e)).replace('.', ',') + (ayarli.has(e.id) ? ' (aile içi)' : ''); });
    bilgiYaz();
  }

  dugmeKur();
  $('o-sifirla').addEventListener('click', () => { secili.clear(); ayarli.clear(); son = null; ciz(); });

  function gorunum(oyun) {
    $('g-sema').hidden = oyun; $('g-oyun').hidden = !oyun; $('duzey').hidden = oyun;
    $('s-sema').setAttribute('aria-pressed', String(!oyun)); $('s-oyun').setAttribute('aria-pressed', String(oyun));
    if (oyun) { try { history.replaceState(null, '', '#oyun'); } catch (e) { /* önemsiz */ } }
  }
  $('s-sema').addEventListener('click', () => { gorunum(false); try { history.replaceState(null, '', location.pathname); } catch (e) { /* önemsiz */ } });
  $('s-oyun').addEventListener('click', () => gorunum(true));
  ciz();
  if (location.hash === '#oyun') gorunum(true);
  window.__oyun = { toplam, secili, esdegerOR };   // sınama için
})();

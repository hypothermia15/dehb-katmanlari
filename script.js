'use strict';
/* script.js — şemayı kurar, seçilen ögenin kartını yazar. Dış istek yok, veri saklanmaz. */
(function () {
  const IKON = {
    genetik: '<path d="M8 3c0 6 8 6 8 12s-8 6-8 6M16 3c0 6-8 6-8 12s8 6 8 6M9.5 6.5h5M9 12h6M9.5 17.5h5"/>',
    cevre: '<path d="M4 20V10l5-3v13M9 20V5l6 3v12M15 20v-8l5 2v6M3 20h18"/>',
    yapi: '<path d="M9 4a4 4 0 0 0-4 4 4 4 0 0 0-1 7 4 4 0 0 0 5 5h2V4zM13 20h1a4 4 0 0 0 5-5 4 4 0 0 0-1-7 4 4 0 0 0-4-4h-1"/>',
    kimya: '<path d="M4 6h6a4 4 0 0 1 0 8H4M20 9h-3a3 3 0 0 0 0 6h3"/><circle cx="13" cy="8" r=".9"/><circle cx="14.5" cy="11" r=".9"/><circle cx="12.6" cy="13.6" r=".9"/>',
    plan: '<path d="M5 4h14v16H5zM8 9l1.5 1.5L12 8M8 14l1.5 1.5L12 13M14 9.5h3M14 14.5h3"/>',
    dikkat: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3.5"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>',
    odul: '<circle cx="8" cy="15" r="4"/><path d="M8 13v2l1.5 1M15 9h6v10h-6zM15 13h6M18 9v10M16.5 9c-1.5-3 1.5-4 1.5 0 0-4 3-3 1.5 0"/>',
    duygu: '<path d="M2 14c2-6 4-6 6 0s4 6 6 0 4-6 6 0"/><path d="M12 5.5c-1-2-4-1.2-4 1 0 1.8 4 4 4 4s4-2.2 4-4c0-2.2-3-3-4-1z"/>',
    yas: '<path d="M3 18h18M5 18v-3M10 18v-6M15 18v-9M20 18V6"/>'
  };
  const SIRA = { koken: ['genetik', 'cevre'], beyin: ['yapi', 'kimya'], davranis: ['plan', 'dikkat', 'odul', 'duygu'], zaman: ['yas'] };
  const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };
  const svg = d => '<svg viewBox="0 0 24 24" aria-hidden="true">' + d + '</svg>';
  let secili = null, ayrinti = false;

  // "[anahtar]" işaretlerini kaynak bağlantısına çevirerek bir paragraf üretir (innerHTML kullanılmaz)
  function paragraf(metin, cls) {
    const p = el('p', cls);
    metin.split(/(\[[a-z0-9]+\])/).forEach(parca => {
      const m = /^\[([a-z0-9]+)\]$/.exec(parca);
      if (m && KAYNAK[m[1]]) {
        const k = KAYNAK[m[1]], a = el('a', 'atif', k.kisa);
        a.href = 'https://doi.org/' + k.doi; a.target = '_blank'; a.rel = 'noopener';
        p.append('(', a, ')');
      } else if (parca) p.append(parca);
    });
    return p;
  }

  function kutuKur() {
    Object.keys(SIRA).forEach(bant => {
      const yer = document.getElementById('b-' + bant);
      SIRA[bant].forEach(id => {
        const o = OGE[id], b = el('button', 'kutu');
        b.type = 'button'; b.id = 'k-' + id; b.dataset.id = id; b.setAttribute('aria-pressed', 'false');
        const ik = el('span', 'ikon'); ik.innerHTML = svg(IKON[id]);   // sabit, bu dosyada tanımlı çizim
        const yazi = el('span', 'yazi'); yazi.append(el('strong', null, o.ad), el('small', null, o.ozet));
        b.append(ik, yazi);
        b.addEventListener('click', () => sec(id, true));
        yer.append(b);
      });
    });
  }

  function kartYaz() {
    const kart = document.getElementById('kart'); kart.textContent = '';
    if (!secili) { kart.append(el('p', 'bos', 'Açıklamayı görmek için şemadan bir kutu seçin.')); kart.removeAttribute('data-bant'); return; }
    const o = OGE[secili]; kart.dataset.bant = o.bant;
    const bas = el('div', 'kart-bas'); const ik = el('span', 'ikon'); ik.innerHTML = svg(IKON[secili]);
    bas.append(ik, el('h2', null, o.ad)); kart.append(bas);
    kart.append(el('h3', null, 'Ne biliniyor?'), paragraf(o.sade, 'sade'));
    if (ayrinti) o.ayrinti.forEach(t => kart.append(paragraf(t)));
    else { const d = el('button', 'daha', 'Ayrıntıyı ve sayıları göster'); d.type = 'button'; d.addEventListener('click', () => duzey(true)); kart.append(d); }
    if (o.yanlis) { const y = el('div', 'yanlis'); y.append(el('h3', null, 'Sık yanlış okuma'), paragraf(o.yanlis)); kart.append(y); }
    if (o.yas && (ayrinti || secili === 'yapi')) { const y = el('div', 'yasnot'); y.append(el('h3', null, 'Çocuk ve erişkin'), paragraf(o.yas)); kart.append(y); }
    if (o.rehber) { const r = REHBER[o.rehber], a = el('a', 'rehber'); a.href = r.url; a.append(el('span', null, 'İlgili rehber'), el('strong', null, r.ad), el('small', null, r.ne)); kart.append(a); }
    const kay = el('div', 'kart-kaynak'); kay.append(el('h3', null, 'Kaynak'));
    const ul = el('ul'); o.kaynak.forEach(k => { const li = el('li'), a = el('a', null, KAYNAK[k].kisa); a.href = 'https://doi.org/' + KAYNAK[k].doi; a.target = '_blank'; a.rel = 'noopener'; li.append(a); ul.append(li); });
    kay.append(ul); kart.append(kay);
  }

  function sec(id, odak) {
    secili = OGE[id] ? id : null;
    document.querySelectorAll('.kutu').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.id === secili)));
    kartYaz();
    if (secili) { try { history.replaceState(null, '', '#' + secili); } catch (e) { /* dosyadan açıldıysa önemsiz */ } }
    if (odak && secili && window.matchMedia('(max-width: 900px)').matches) document.getElementById('kart').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function duzey(a) {
    ayrinti = a;
    document.getElementById('d-sade').setAttribute('aria-pressed', String(!a));
    document.getElementById('d-ayrinti').setAttribute('aria-pressed', String(a));
    kartYaz();
  }

  function kaynakListe() {
    const ol = document.getElementById('kaynak-liste');
    Object.keys(KAYNAK).map(k => KAYNAK[k]).sort((x, y) => x.tam.localeCompare(y.tam, 'tr')).forEach(k => {
      const li = el('li', null, k.tam + ' '), a = el('a', null, 'doi:' + k.doi); a.href = 'https://doi.org/' + k.doi; a.target = '_blank'; a.rel = 'noopener'; li.append(a); ol.append(li);
    });
  }

  kutuKur(); kaynakListe();
  document.getElementById('d-sade').addEventListener('click', () => duzey(false));
  document.getElementById('d-ayrinti').addEventListener('click', () => duzey(true));
  sec((location.hash || '').slice(1) || 'genetik', false);
})();

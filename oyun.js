'use strict';
/* oyun.js — "1000 çocuktan kaçı?" tahmin oyunu ve serbest gezinti. Veri icerik.js'tedir (TABAN, ETKEN). */
(function () {
  const $ = id => document.getElementById(id);
  const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };
  const olasilik = (tur, oran) => tur === 'OR' ? oran * TABAN / (1 - TABAN + oran * TABAN) : tur === 'RR' ? oran * TABAN : 1 - Math.pow(1 - TABAN, oran);
  const binde = e => Math.round(olasilik(e.tur, e.oran) * 1000);
  const TABAN_N = Math.round(TABAN * 1000);
  const TUR_AD = { OR: 'olasılık oranı', RR: 'göreli risk', HR: 'tehlike oranı' };
  const sorular = ETKEN.filter(e => !e.yalnizGezinti);
  let sira = 0, puan = 0, durum = 'tahmin', gosterilen = TABAN_N, tahmin = null;

  // sabit karışık sıra: aynı noktalar her seferinde aynı yerde yanar (tohumlu üreteç)
  const SIRA = (() => { const a = Array.from({ length: 1000 }, (_, i) => i); let s = 20261124;
    const r = () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; })();
  const YER = []; SIRA.forEach((nokta, k) => YER[nokta] = k);

  function paragraf(metin, cls) {
    const p = el('p', cls);
    metin.split(/(\[[a-z0-9]+\])/).forEach(parca => {
      const m = /^\[([a-z0-9]+)\]$/.exec(parca);
      if (m && KAYNAK[m[1]]) { const k = KAYNAK[m[1]], a = el('a', 'atif', k.kisa); a.href = 'https://doi.org/' + k.doi; a.target = '_blank'; a.rel = 'noopener'; p.append('(', a, ')'); }
      else if (parca) p.append(parca);
    });
    return p;
  }

  function ciz() {
    const c = $('o-izgara'), kutu = c.parentElement.clientWidth, dar = kutu < 520, sutun = dar ? 25 : 50, satir = 1000 / sutun;
    const adim = Math.floor(Math.min(kutu, 640) / sutun), w = adim * sutun, h = adim * satir, dpr = window.devicePixelRatio || 1;
    c.style.width = w + 'px'; c.style.height = h + 'px'; c.width = w * dpr; c.height = h * dpr;
    const x = c.getContext('2d'); x.setTransform(dpr, 0, 0, dpr, 0, 0); x.clearRect(0, 0, w, h);
    const cs = getComputedStyle(document.documentElement), renk = n => cs.getPropertyValue(n).trim();
    const bos = renk('--cizgi'), taban = renk('--zaman'), ek = renk('--davranis'), halka = renk('--koken'), r = adim * 0.34;
    for (let i = 0; i < 1000; i++) {
      const k = YER[i], cx = (i % sutun) * adim + adim / 2, cy = Math.floor(i / sutun) * adim + adim / 2;
      x.beginPath(); x.arc(cx, cy, r, 0, 6.2832);
      x.fillStyle = k < Math.min(TABAN_N, gosterilen) ? taban : k < gosterilen ? ek : bos; x.fill();
      if (tahmin != null && durum !== 'tahmin' && k < tahmin) { x.lineWidth = Math.max(1, adim * 0.12); x.strokeStyle = halka; x.stroke(); }
    }
  }

  function ozetYaz(e, n) {
    const yok = 1000 - n;
    $('o-ozet').textContent = e ? `${e.ad}. DEHB beklenen: yaklaşık ${n} / 1000. Beklenmeyen: ${yok} / 1000. Genel toplumda beklenen: ${TABAN_N} / 1000.` : `Genel toplum. DEHB beklenen: yaklaşık ${TABAN_N} / 1000.`;
  }

  function soruYaz() {
    const e = sorular[sira]; durum = 'tahmin'; tahmin = null; gosterilen = TABAN_N;
    $('o-tur').textContent = `Soru ${sira + 1} / ${sorular.length} · Puan ${puan}`;
    $('o-soru').textContent = e.soru;
    $('o-tahmin').hidden = false; $('o-sonuc').hidden = true; $('o-gezinti').hidden = true;
    $('o-kaydirici').value = TABAN_N; $('o-deger').textContent = TABAN_N;
    ozetYaz(null); ciz();
  }

  function bilgiKutusu(e, n, kap) {
    kap.append(el('p', 'oran', `Yayımlanmış oran: ${TUR_AD[e.tur]} ${String(e.oran).replace('.', ',')} · hesaplanan: ${n} / 1000`));
    kap.append(paragraf(e.bilgi));
    if (e.ikinci) {
      const b = el('button', 'ikincil', e.ikinci.etiket); b.type = 'button';
      b.addEventListener('click', () => { const acik = b.getAttribute('aria-pressed') === 'true'; b.setAttribute('aria-pressed', String(!acik));
        gosterilen = acik ? n : Math.round(olasilik(e.tur, e.ikinci.oran) * 1000); ozetYaz(e, gosterilen); ciz(); });
      b.setAttribute('aria-pressed', 'false'); kap.append(b);
    }
    if (e.ders) kap.append(el('p', 'ders', e.ders));
  }

  function kilitle() {
    const e = sorular[sira], n = binde(e); tahmin = +$('o-kaydirici').value; durum = 'sonuc'; gosterilen = n;
    const fark = Math.abs(tahmin - n), kazanc = Math.max(0, Math.round(100 - fark / 2)); puan += kazanc;
    const s = $('o-sonuc'); s.textContent = ''; s.hidden = false; $('o-tahmin').hidden = true;
    $('o-tur').textContent = `Soru ${sira + 1} / ${sorular.length} · Puan ${puan}`;
    s.append(el('p', 'sonuc-bas', `Tahmininiz ${tahmin}, hesaplanan ${n}. ${fark <= 15 ? 'Çok yakın.' : tahmin > n ? 'Fazla tahmin ettiniz.' : 'Az tahmin ettiniz.'} +${kazanc} puan`));
    bilgiKutusu(e, n, s);
    const ileri = el('button', 'ana', sira + 1 < sorular.length ? 'Sonraki soru' : 'Sonucu gör'); ileri.type = 'button';
    ileri.addEventListener('click', () => { sira++; sira < sorular.length ? soruYaz() : bitir(); }); s.append(ileri);
    ozetYaz(e, n); ciz(); ileri.focus();
  }

  function bitir() {
    durum = 'gezinti'; tahmin = null;
    $('o-tur').textContent = `Bitti · Toplam puan ${puan} / ${sorular.length * 100}`;
    $('o-soru').textContent = 'Akılda kalması gerekenler';
    const s = $('o-sonuc'); s.textContent = ''; s.hidden = false; $('o-tahmin').hidden = true;
    const ul = el('ul', 'dersler');
    ['Bu oyundaki bütün etkenlerde çocukların çoğunda DEHB yoktur. En güçlü etkende bile 1000 çocuğun yaklaşık 640’ında beklenmez.',
     'İlişki, neden demek değildir. Gebelikte sigara örneğinde ilişki, aynı ailenin çocukları karşılaştırılınca kaybolur.',
     'En güçlü etken ailedir. Yine de kardeşi DEHB’li çocukların çoğunda DEHB yoktur.',
     'Bu sayılar grupları anlatır. Tek bir çocuğun DEHB’li olup olmadığını ancak klinik değerlendirme söyler.'].forEach(t => ul.append(el('li', null, t)));
    s.append(ul);
    const yeniden = el('button', 'ana', 'Yeniden oyna'); yeniden.type = 'button'; yeniden.addEventListener('click', () => { sira = 0; puan = 0; soruYaz(); }); s.append(yeniden);
    $('o-gezinti').hidden = false; gezintiSec();
  }

  function gezintiSec() {
    const e = ETKEN.find(x => x.id === $('o-sec').value), n = binde(e); gosterilen = n;
    let kap = $('o-gezinti').querySelector('.gez-bilgi'); if (!kap) { kap = el('div', 'gez-bilgi'); $('o-gezinti').append(kap); }
    kap.textContent = ''; bilgiKutusu(e, n, kap); ozetYaz(e, n); ciz();
  }

  ETKEN.slice().sort((a, b) => binde(a) - binde(b)).forEach(e => { const o = el('option', null, `${e.ad} (${binde(e)} / 1000)`); o.value = e.id; $('o-sec').append(o); });
  $('o-kaydirici').addEventListener('input', ev => { $('o-deger').textContent = ev.target.value; });
  $('o-kilitle').addEventListener('click', kilitle);
  $('o-sec').addEventListener('change', gezintiSec);
  window.addEventListener('resize', ciz);
  if (window.matchMedia) window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ciz);

  // görünüm sekmeleri
  function gorunum(oyun) {
    $('g-sema').hidden = oyun; $('g-oyun').hidden = !oyun; $('duzey').hidden = oyun;
    $('s-sema').setAttribute('aria-pressed', String(!oyun)); $('s-oyun').setAttribute('aria-pressed', String(oyun));
    if (oyun) { try { history.replaceState(null, '', '#oyun'); } catch (e) { /* önemsiz */ } ciz(); }
  }
  $('s-sema').addEventListener('click', () => { gorunum(false); try { history.replaceState(null, '', location.pathname); } catch (e) { /* önemsiz */ } });
  $('s-oyun').addEventListener('click', () => gorunum(true));
  soruYaz();
  if (location.hash === '#oyun') gorunum(true);
  window.__oyun = { binde, sorular };   // sınama için
})();

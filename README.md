# DEHB’nin Katmanları

DEHB’yi genlerden davranışa dört katmanda gösteren etkileşimli bir şema. Her kutuda üç şey var: ne biliniyor, ne sık yanlış okunuyor, kaynak. İki anlatım düzeyi: Sade (aileler ve genel okur) ve Ayrıntılı (asistanlar ve öğrenciler).

Canlı sayfa: https://hypothermia15.github.io/dehb-katmanlari/

Yazar: Doç. Dr. Miraç Barış Usta (çocuk ve ergen psikiyatrisi), 2026.

## Yapı

| Katman | Ögeler |
|---|---|
| Kökenler | Genetik, çevresel etkenler |
| Beyin | Beyin yapısı, nörokimya |
| Davranış ve biliş | Planlama ve düzenleme, dikkat ve bellek, ödül işleme, duygu düzenleme |
| Zaman | Yaşla ne değişir? |

Dosyalar: `index.html`, `styles.css`, `icerik.js` (metin, etkenler ve kaynaklar), `script.js` (şema), `oyun.js` (olasılık oyunu). Derleme adımı, dış kaynak ya da çerez yoktur.

## Olasılık oyunu: "Etken ekledikçe ne değişir?"

Ortada kurgusal bir çocuk, yanında etken düğmeleri. Düğmeye basıldıkça çocuğun çevresindeki halka, yüzde ve 100 noktalık ızgara güncellenir. Aile öyküsü ve doğum gruplarında aynı anda tek seçenek seçilebilir. Gebelikte sigara etkeninde "aile etkenlerini hesaba kat" düğmesi oranı 1,0'a çeker.

Birleştirme kuralı (yazarın hesabı): her etkenin tek başına verdiği olasılık, tabana göre bir olasılık oranına çevrilir; seçilen etkenlerin oranları çarpılır. Bu, etkenlerin birbirinden bağımsız ve nedensel olduğunu varsayar. İkisi de doğru değildir ve bu sayfada, oyunun üstündeki uyarıda açıkça yazılıdır. Üç ve daha çok etken seçildiğinde hesabın bir çalışmaya dayanmadığı ayrıca belirtilir. Örnek: kardeş + aşırı erken doğum birlikte %70 verir; bu sayı hiçbir çalışmada ölçülmemiştir.

Tek etkenli değerler (1000 çocukta):

| Etken | Oran | 1000'de | Kaynak |
|---|---|---|---|
| Genel toplum (taban) | | 53 | Buitelaar ve Newcorn 2026 (çocuklarda %5,3) |
| Sınıfın en küçüklerinden olmak | RR 1,38 | 73 | Frisira 2025 |
| Çocuklukta astım | OR 1,51 | 78 | Kim 2020 |
| Gebelikte annenin sigara içmesi | OR 1,6 | 82 | Kim 2020 |
| Aynısı, aile etkenleri hesaba katılınca | OR 0,90 ve 1,04 | 53 (1,0 alındı) | Haan 2022 |
| Annenin gebelik öncesi obezitesi | OR 1,63 | 84 | Kim 2020 |
| Çok erken doğum ya da çok düşük doğum ağırlığı | OR 2,25 | 112 | Franz 2018 |
| Aşırı erken doğum ya da aşırı düşük doğum ağırlığı | OR 4,05 | 185 | Franz 2018 |
| Kuzeninde DEHB | HR 2,24 | 115 | Chen 2017 |
| Kardeşinde DEHB | HR 8,27 | 363 | Chen 2017 |
| Yalnızca gezintide: anne bir yarı kardeş (HR 2,86 → 144), egzama (OR 1,31 → 68), preeklampsi (OR 1,28 → 67) | | | Chen 2017, Kim 2020 |

Oranlar ilgili makalelerin PubMed özetlerinden alındı. "1000'de" sütunu bu sayfanın hesabıdır: OR için p = OR·p0/(1 − p0 + OR·p0), RR için p = RR·p0, HR için p = 1 − (1 − p0)^HR, p0 = 0,053.

Bilinen sınırlar:

- Oranlar farklı ülkelerden, farklı tanı tanımlarından ve farklı taban oranlardan gelir. Hepsini tek bir %5,3 tabana uygulamak bir basitleştirmedir. Chen 2017'nin kütüğünde tanı oranı bu tabandan düşüktür, bu yüzden kardeş için 363 sayısı yalnızca büyüklük sırasını gösterir.
- Tehlike oranını olasılığa çevirmek, oranın izlem boyunca sabit kaldığını varsayar.
- Etkenler birbirinden bağımsız değildir. Birleştirilmiş sayılar bir aritmetik gösterimidir, ölçülmüş bir olasılık değildir. Sayfa kişi için risk hesaplamaz. (İlk sürümde etkenler birleştirilmiyordu; birleştirme kullanıcı isteğiyle eklendi.)
- Tek yumurta ikizleri için tehlike oranı (70,45) oyuna alınmadı: bu dönüşümle anlamlı bir olasılık vermez.
- Gebelikte parasetamol (Kim 2020'de RR 1,25) bilerek alınmadı: tartışmalı bir konu, kardeş karşılaştırmalı çalışmalar okunmadan sayfaya konmamalı.

## Kaynaklar ve doğrulama

Dört katmanlı sınıflama Buitelaar ve Newcorn’un derlemesindeki çerçeveyi izler (N Engl J Med 2026;395:1519-1528, doi:10.1056/NEJMcp2516040). Derlemedeki şekil kullanılmadı; çizim ve metin özgündür.

- Buitelaar ve Newcorn 2026: tam metin okundu.
- Faraone 2024, Faraone ve Larsson 2019, Hoogman 2017, Hoogman 2019, Koirala 2024: yalnızca PubMed özetleri okundu. Sayfadaki sayılar (örneklem büyüklükleri, etki büyüklükleri, %74 kalıtsallık) bu özetlerden alındı.
- Willcutt 2005: sayılar PubMed özetinden (83 çalışma, etki büyüklüğü 0,46-0,69).
- Kim 2020, Chen 2017, Franz 2018, Haan 2022, Frisira 2025: yalnızca PubMed özetleri. Frisira 2025'te tanı için güven aralığı özette 1,36-1,52 olarak geçer; nokta kestirimiyle (1,38) uyumu tam metinden denetlenmedi, sayfada yalnızca 1,38 verildi.
- Künyeler Kasım 2026’da PubMed kayıtlarıyla eşleştirildi.

Kaynağa dayanmayan iki açıklama sayfada açıkça işaretlidir: kalıtsallık kavramının tanımı ve etki büyüklüğü 0,2 için örtüşme hesabı (normal dağılım varsayımıyla örtüşme katsayısı 2Φ(−d/2) ≈ 0,92). Ödül işleme kartındaki “karakter yargısı değildir” cümlesi yazarın yorumudur.

Bilinen sınır: ana kaynak erişkin DEHB’sini anlatır. Çocuklara özgü bulgular yalnızca görüntüleme kartında ve “Yaşla ne değişir?” kartında ayrıca belirtilmiştir.

## Uyarı

Bu sayfa eğitim amaçlıdır. Tanı koymaz, tedavi önermez. Hiçbir veri kaydedilmez ya da gönderilmez.

## Lisans

Henüz bir lisans seçilmedi. Lisans eklenene kadar tüm hakları yazarında saklıdır.

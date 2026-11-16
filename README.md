# TaskFlow API

TaskFlow, bir yazılım ekibinin görevlerini ve bu görevlerin kimin sorumluluğunda olduğunu takip etmek için hazırlanmış bir REST API'dir. Node.js ve Express ile yazılmıştır, veriler `src/data/tasks.json` dosyasında tutulur.

## Kullanılan teknolojiler

- Node.js
- Express
- JSON dosyası (veri saklama)

## Kurulum

```bash
git clone <repo-adresi>
cd taskflow-api
npm install
npm start
```

Sunucu varsayılan olarak **3000** portunda çalışır: http://localhost:3000

Farklı bir port için: `PORT=4000 npm start`

## Klasör yapısı

```
src/
  index.js              Uygulamanın giriş noktası
  routes/               Endpoint tanımları
  controllers/          İstekleri işleyen fonksiyonlar
  middlewares/          Logger, doğrulama ve hata yakalama
  data/                 tasks.json ve dosya okuma/yazma işlemleri
logs/requests.log       İstek kayıtları (çalışırken oluşur)
teslim/                 Tanıtım dokümanı, Postman koleksiyonu, ekran görüntüleri
```

## Görev modeli

| Alan | Tip | Açıklama |
|---|---|---|
| id | number | Otomatik artan kimlik |
| title | string | Görev başlığı (zorunlu) |
| description | string | Görev açıklaması (zorunlu) |
| status | string | `pending`, `in-progress`, `completed` (varsayılan: pending) |
| priority | string | `low`, `medium`, `high` (zorunlu) |
| assignee | string | Görevden sorumlu kişi (zorunlu) |
| createdAt | string | Oluşturulma zamanı (otomatik) |

## Endpoint listesi

| Method | Endpoint | Açıklama | Başarılı yanıt |
|---|---|---|---|
| POST | /tasks | Yeni görev ekler | 201 Created |
| GET | /tasks | Tüm görevleri listeler | 200 OK |
| GET | /tasks/:id | Tek bir görevin detayını getirir | 200 OK |
| PUT | /tasks/:id | Görevi günceller | 200 OK |
| DELETE | /tasks/:id | Görevi siler | 200 OK |

Filtreleme: `GET /tasks?status=pending`, `GET /tasks?priority=high` (birlikte de kullanılabilir).

Hata durumları:

- **400 Bad Request:** zorunlu alan eksik, geçersiz status/priority veya bozuk JSON
- **404 Not Found:** görev ya da adres bulunamadı

### Örnek istek (POST /tasks)

```json
{
  "title": "Kullanıcı profili sayfası",
  "description": "Profil bilgilerini düzenleme ekranı yapılacak.",
  "status": "pending",
  "priority": "high",
  "assignee": "Edanur Çelik"
}
```

## Logger

Her istek için method, endpoint ve zaman damgası hem konsola hem de `logs/requests.log` dosyasına yazılır:

```
[zaman damgası] GET /tasks
[zaman damgası] POST /tasks
```

## Postman ile test

`teslim/TaskFlow.postman_collection.json` dosyası Postman'e import edilerek 5 CRUD isteği hazır şekilde denenebilir.

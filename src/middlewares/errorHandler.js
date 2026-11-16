// Tanımlı olmayan bir adrese istek gelirse
function notFound(req, res) {
  res.status(404).json({ message: 'İstenen adres bulunamadı' });
}

// Beklenmeyen hatalar (ör. bozuk JSON gövdesi)
function errorHandler(err, req, res, next) {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ message: 'Gönderilen JSON hatalı' });
  }
  console.error(err);
  res.status(500).json({ message: 'Sunucu hatası' });
}

module.exports = { notFound, errorHandler };

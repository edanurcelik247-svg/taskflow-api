const STATUSES = ['pending', 'in-progress', 'completed'];
const PRIORITIES = ['low', 'medium', 'high'];

// POST ve PUT isteklerinde gövdeyi kontrol eder, hata varsa 400 döner
function validateTask(req, res, next) {
  const { title, description, priority, assignee, status } = req.body || {};
  const errors = [];

  if (!title || typeof title !== 'string' || !title.trim()) errors.push('title zorunludur');
  if (!description || typeof description !== 'string' || !description.trim()) errors.push('description zorunludur');
  if (!PRIORITIES.includes(priority)) errors.push('priority low, medium veya high olmalıdır');
  if (!assignee || typeof assignee !== 'string' || !assignee.trim()) errors.push('assignee zorunludur');
  if (status !== undefined && !STATUSES.includes(status)) {
    errors.push('status pending, in-progress veya completed olmalıdır');
  }

  if (errors.length) {
    return res.status(400).json({ message: 'Geçersiz veri', errors });
  }
  next();
}

module.exports = validateTask;

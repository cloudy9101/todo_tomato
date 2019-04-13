if @todo.errors.any?
  json.errors @todo.errors
else
  json.id @todo.id
  json.name @todo.name
  json.completed @todo.completed_at.present?
  json.deleted @todo.deleted_at.present?
end

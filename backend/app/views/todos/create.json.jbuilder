if @todo.errors.any?
  json.errors @todo.errors
else
  json.id @todo.id
  json.name @todo.name
  json.completed_at @todo.completed_at
  json.deleted_at @todo.deleted_at
end

json.array! @todos do |todo|
  json.id todo.id
  json.name todo.name
  json.completed_at todo.completed_at
  json.deleted_at todo.deleted_at
  json.tomatos todo.tomatos.count
end

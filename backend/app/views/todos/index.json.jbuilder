json.array! @todos do |todo|
  json.id todo.id
  json.name todo.name
  json.completed todo.completed_at.present?
  json.deleted todo.deleted_at.present?
  json.tomatos todo.tomatos.count
end

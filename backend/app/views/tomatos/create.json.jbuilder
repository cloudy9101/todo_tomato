if @tomato.errors.any?
  json.errors @tomato.errors
else
  json.id @tomato.id
  json.todo_id @tomato.todo_id
  json.start_at @tomato.start_at
  json.end_at @tomato.end_at
  json.tomatos @tomato.todo.tomatos.count
end

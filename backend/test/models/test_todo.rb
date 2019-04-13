require "minitest/autorun"

class TestTodo < Minitest::Test
  def setup
    @todo = Todo.new
  end
end

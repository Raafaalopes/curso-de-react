import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import Title from "./components/Title";

function App() {
  // State (Estado)
  // é uma variável que voce altera no react que faz com que o componente seja re-renderizado
  // em poucas palavras, quando voce muda o state a sua interface é atualizada
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // como passa uma lista vazia vai ser executado so uma vez
  // que é quando o usuário acaba de acessar a aplicação
  useEffect(() => {
    const fetchTasks = async () => {
      // Chamar a API
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=10",
        {
          method: "GET",
        }
      );
      // Pegar os dados que ela retorna
      const data = await response.json();

      // Armazenar/Persistir esses dados no state
      setTasks(data);
    };
    // se quiser, voce pode chamar uma api para pegar as tarefas
    // fetchTasks();
  }, []);

  function onTaskClick(taskId) {
    const newTasks = tasks.map((task) => {
      // preciso atualizar essa tarefa
      if (task.id === taskId) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      // nao preciso atualizar essa tarefa
      return task;
    });
    setTasks(newTasks);
  }

  function onDeleteTaskClick(taskId) {
    // vou manter todas as tarefas que tenham um id diferente do id da tarefa que eu cliquei para deletar
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
  }

  function onAddTaskSubmit(title, description) {
    const newTask = {
      id: tasks.length + 1,
      title,
      description,
      isCompleted: false,
    };
    setTasks([...tasks, newTask]);
  }

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        {/* <Test /> */}
        <Title>Gerenciador de tarefas</Title>
        <AddTask onAddTaskSubmit={onAddTaskSubmit} />
        <Tasks
          tasks={tasks}
          onTaskClick={onTaskClick}
          onDeleteTaskClick={onDeleteTaskClick}
        />
      </div>
    </div>
  );
}

export default App;

// rodar o npm run dev, agora ele vai começar a estilizar a aplicação, o video ta em 41:15

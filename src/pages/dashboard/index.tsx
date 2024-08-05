import { fetchComments, fetchTodos, fetchUsers } from "api/requests";
import "bootstrap/dist/css/bootstrap.min.css";
import { useTheme } from "components/theme";
import { useEffect, useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import "styles/dash/index.css";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';


Chart.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement);


const Dashboard = () => {
  const [users, setUsers] = useState<any[] | null>(null);
  const [todos, setTodos] = useState<any[] | null>(null);
  const [comments, setComments] = useState<any[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { theme } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [usersData, todosData, commentsData] = await Promise.all([
          fetchUsers(),
          fetchTodos(),
          fetchComments(),
        ]);
        setUsers(usersData);
        setTodos(todosData);
        setComments(commentsData);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const userCounts = users ? users.length : 0;
  const todoCounts = todos ? todos.length : 0;
  const commentCounts = comments ? comments.length : 0;

  const todoCompletionData = {
    labels: todos
      ? todos.slice(0, 10).map((todo: { title: string }) => todo.title)
      : [],
    datasets: [
      {
        label: "Completed",
        data: todos
          ? todos
              .slice(0, 10)
              .map((todo: { completed: boolean }) => (todo.completed ? 1 : 0))
          : [],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Pending",
        data: todos
          ? todos
              .slice(0, 10)
              .map((todo: { completed: boolean }) => (todo.completed ? 0 : 1))
          : [],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  const userActivityData = {
    labels: users
      ? users.slice(0, 10).map((user: { username: string }) => user.username)
      : [],
    datasets: [
      {
        label: "Number of Comments",
        data: users
          ? users
              .slice(0, 10)
              .map((user: { email: string }) =>
                comments
                  ? comments.filter(
                      (comment: { email: string }) =>
                        comment.email === user.email
                    ).length
                  : 0
              )
          : [],
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
    ],
  };

  const todoStatusData = {
    labels: ["Completed", "Pending"],
    datasets: [
      {
        label: "Todo Status",
        data: [
          todos
            ? todos.filter((todo: { completed: boolean }) => todo.completed)
                .length
            : 0,
          todos
            ? todos.filter((todo: { completed: boolean }) => !todo.completed)
                .length
            : 0,
        ],
        backgroundColor: ["rgba(54, 162, 235, 0.6)", "rgba(255, 99, 132, 0.6)"],
      },
    ],
  };

  return (
    <div className={`container mt-4 ${theme === "dark" ? "text-light" : ""}`}>
      <div className="row">
        <div className="col-md-4">
          <div
            className={`card text-center ${
              theme === "dark" ? "card-dark" : "card-light"
            }`}
          >
            <div className="card-body">
              <h5 className="card-title">Total Users</h5>
              <p className="card-text display-4">{userCounts}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div
            className={`card text-center ${
              theme === "dark" ? "card-dark" : "card-light"
            }`}
          >
            <div className="card-body">
              <h5 className="card-title">Total Todos</h5>
              <p className="card-text display-4">{todoCounts}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div
            className={`card text-center ${
              theme === "dark" ? "card-dark" : "card-light"
            }`}
          >
            <div className="card-body">
              <h5 className="card-title">Total Comments</h5>
              <p className="card-text display-4">{commentCounts}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-md-4">
          <div
            className={`card ${theme === "dark" ? "card-dark" : "card-light"}`}
          >
            <div className="card-body">
              <h5 className="card-title">Todo Completion Status</h5>
              <Bar data={todoCompletionData} />
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div
            className={`card ${theme === "dark" ? "card-dark" : "card-light"}`}
          >
            <div className="card-body">
              <h5 className="card-title">User Activity</h5>
              <Line data={userActivityData} />
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div
            className={`card ${theme === "dark" ? "card-dark" : "card-light"}`}
          >
            <div className="card-body">
              <h5 className="card-title">Todo Status</h5>
              <Pie data={todoStatusData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

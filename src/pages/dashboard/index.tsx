import { fetchComments, fetchTodos, fetchUsers } from "api/requests";
import "bootstrap/dist/css/bootstrap.min.css";
import useLazyLoader from "components/lazyloader";
import { useTheme } from "components/theme";
import { Bar, Line, Pie } from "react-chartjs-2";
import "styles/dash/index.css";

const Dashboard = () => {
  const {
    data: users,
    isLoading: usersLoading,
    error: usersError,
  } = useLazyLoader(fetchUsers, true);
  const {
    data: todos,
    isLoading: todosLoading,
    error: todosError,
  } = useLazyLoader(fetchTodos, true);
  const {
    data: comments,
    isLoading: commentsLoading,
    error: commentsError,
  } = useLazyLoader(fetchComments, true);
  const { theme } = useTheme();

  if (usersLoading || todosLoading || commentsLoading)
    return <div>Loading...</div>;
  if (usersError) return <div>{usersError.message}</div>;
  if (todosError) return <div>{todosError.message}</div>;
  if (commentsError) return <div>{commentsError.message}</div>;

  const userCounts = users ? users.length : 0;
  const todoCounts = todos ? todos.length : 0;
  const commentCounts = comments ? comments.length : 0;

  const todoCompletionData = {
    labels: todos ? todos.slice(0, 10).map((todo: { title: any; }) => todo.title) : [],
    datasets: [
      {
        label: "Completed",
        data: todos
          ? todos.slice(0, 10).map((todo: { completed: any; }) => (todo.completed ? 1 : 0))
          : [],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Pending",
        data: todos
          ? todos.slice(0, 10).map((todo: { completed: any; }) => (todo.completed ? 0 : 1))
          : [],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  const userActivityData = {
    labels: users ? users.slice(0, 10).map((user: { username: any; }) => user.username) : [],
    datasets: [
      {
        label: "Number of Comments",
        data: users
          ? users
              .slice(0, 10)
              .map((user: { email: any; }) =>
                comments
                  ? comments.filter((comment: { email: any; }) => comment.email === user.email)
                      .length
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
          todos ? todos.filter((todo: { completed: any; }) => todo.completed).length : 0,
          todos ? todos.filter((todo: { completed: any; }) => !todo.completed).length : 0,
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

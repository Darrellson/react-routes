import { fetchUsers } from "api/requests";
import "bootstrap/dist/css/bootstrap.min.css";
import { useTheme } from "components/theme";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

const Users = () => {
  const { data: users, error, isLoading } = useQuery("users", fetchUsers);
  const { theme } = useTheme();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{(error as Error).message}</div>;

  return (
    <div className={`container mt-4 ${theme === "dark" ? "dark-mode" : ""}`}>
      <ul className="list-group">
        {users?.map((user) => (
          <li
            key={user.id}
            className={`list-group-item ${
              theme === "dark" ? "dark-mode-item" : ""
            }`}
          >
            <Link to={`/user/${user.id}`}>
              <h5 className="mb-1">Name: {user.name}</h5>
              <p className="mb-1">Username: {user.username}</p>
              <p>Email: {user.email}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;

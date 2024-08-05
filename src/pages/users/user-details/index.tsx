import React from "react";
import { fetchComments, fetchPhoto, fetchTodos, fetchUser } from "api/requests";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import "styles/profile-card/index.css";
import "styles/drak-mode/index.css";
import { useTheme } from "components/theme"; 

const UserDetails = () => {
  const { userId } = useParams<{ userId: string }>();
  const { theme } = useTheme(); 

  const {
    data: user,
    error: userError,
    isLoading: userLoading,
  } = useQuery(["user", userId], () => fetchUser(userId!), {
    enabled: !!userId,
    onError: (error: unknown) => console.error("User query error:", error),
  });

  const {
    data: photo,
    error: photoError,
    isLoading: photoLoading,
  } = useQuery(["photo", userId], () => fetchPhoto(parseInt(userId!)), {
    enabled: !!userId,
    onError: (error: unknown) => console.error("Photo query error:", error),
  });

  const {
    data: todos,
    error: todosError,
    isLoading: todosLoading,
  } = useQuery(["todos", userId], () => fetchTodos(), {
    enabled: !!userId,
    onError: (error: unknown) => console.error("Todos query error:", error),
  });

  const {
    data: comments,
    error: commentsError,
    isLoading: commentsLoading,
  } = useQuery(["comments", userId], () => fetchComments(), {
    enabled: !!userId,
    onError: (error: unknown) => console.error("Comments query error:", error),
  });

  if (userLoading || photoLoading || todosLoading || commentsLoading)
    return <div>Loading...</div>;
  if (userError) return <div>{(userError as Error).message}</div>;
  if (photoError) return <div>{(photoError as Error).message}</div>;
  if (todosError) return <div>{(todosError as Error).message}</div>;
  if (commentsError) return <div>{(commentsError as Error).message}</div>;

  const userTodos = todos?.filter((todo) => todo.userId.toString() === userId);
  const userComments = comments?.filter(
    (comment) => comment.postId.toString() === userId
  );

  return (
    <div className={`container mt-4 ${theme === "dark" ? "dark-mode" : ""}`}>
      <Link to="/users" className="btn btn-primary back-button">
        <i className="fas fa-arrow-left"></i>
      </Link>
      {user && photo ? (
        <div className="profile-card card">
          <div className="row no-gutters">
            <div className="col-md-4">
              <img
                src={photo.url}
                className="card-img-top img-fluid"
                alt={user.name}
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <p className="card-text">Username: {user.username}</p>
                <p className="card-text">Email: {user.email}</p>
                <p className="card-text">Phone: {user.phone}</p>
                <p className="card-text">
                  Website:{" "}
                  <a
                    href={`http://${user.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {user.website}
                  </a>
                </p>
                <h5 className="card-title mt-4">Todos</h5>
                <ul className="list-group">
                  {userTodos?.map((todo) => (
                    <li className="list-group-item" key={todo.id}>
                      {todo.title} -{" "}
                      {todo.completed ? "Completed" : "Incomplete"}
                    </li>
                  ))}
                </ul>
                <h5 className="card-title mt-4">Comments</h5>
                <ul className="list-group">
                  {userComments?.map((comment) => (
                    <li className="list-group-item" key={comment.id}>
                      {comment.body}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>No user found</div>
      )}
    </div>
  );
};

export default UserDetails;

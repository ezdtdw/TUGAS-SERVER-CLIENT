import { useState, useEffect } from "react";
import { Modal } from "bootstrap";

import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getPosts,
  createPost,
  updatePost,
  deletePost,
} from "./services/api";

function App() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");

  const [showUserSection, setShowUserSection] = useState(true);

  const [editUserId, setEditUserId] = useState(null);
  const [editUserName, setEditUserName] = useState("");
  const [editUserEmail, setEditUserEmail] = useState("");

  const [editPostId, setEditPostId] = useState(null);
  const [editPostTitle, setEditPostTitle] = useState("");
  const [editPostContent, setEditPostContent] = useState("");
  const [editPostUserId, setEditPostUserId] = useState("");

  useEffect(() => {
    //eslint-disable-next-line
    loadUsers();
    //eslint-disable-next-line
    loadPosts();
  }, []);

  const loadUsers = async () => setUsers((await getUsers()).data);
  const loadPosts = async () => setPosts((await getPosts()).data);

  const submitUser = async () => {
    if (!name || !email) return;
    await createUser({ name, email });
    setName("");
    setEmail("");
    loadUsers();
  };

  const submitPost = async () => {
    if (!title || !content || !userId) return;
    await createPost({ title, content, userId });
    setTitle("");
    setContent("");
    setUserId("");
    loadPosts();
  };

  // edit user
  const openEditUser = (user) => {
    setEditUserId(user.id);
    setEditUserName(user.name);
    setEditUserEmail(user.email);

    const modal = new Modal(document.getElementById("editUserModal"));
    modal.show();
  };

  const saveEditUser = async () => {
    await updateUser(editUserId, {
      name: editUserName,
      email: editUserEmail,
    });

    loadUsers();
    Modal.getInstance(document.getElementById("editUserModal")).hide();
  };

  //edit post
  const openEditPost = (post) => {
    setEditPostId(post.id);
    setEditPostTitle(post.title);
    setEditPostContent(post.content);
    setEditPostUserId(post.userId);

    const modal = new Modal(document.getElementById("editPostModal"));
    modal.show();
  };

  const saveEditPost = async () => {
    await updatePost(editPostId, {
      title: editPostTitle,
      content: editPostContent,
      userId: editPostUserId,
    });

    loadPosts();
    Modal.getInstance(document.getElementById("editPostModal")).hide();
  };

  const removeUser = async (id) => {
    await deleteUser(id);
    loadUsers();
  };

  const removePost = async (id) => {
    await deletePost(id);
    loadPosts();
  };

  return (
    <div className="container mt-4">

      <h1 className="text-center mb-4">FULLSTACK USERS & POSTS</h1>

      {/* Toggle */}
      <div className="d-flex justify-content-center gap-3 mb-4">
        <button
          className={`btn ${showUserSection ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setShowUserSection(true)}
        >
          Kelola Users
        </button>

        <button
          className={`btn ${!showUserSection ? "btn-success" : "btn-outline-success"}`}
          onClick={() => setShowUserSection(false)}
        >
          Kelola Posts
        </button>
      </div>

      {/* user */}
      {showUserSection && (
        <>
          {/* tambah */}
          <div className="card bg-dark text-white mb-4">
            <div className="card-header"><h4>Tambah User</h4></div>
            <div className="card-body">
              <div className="row g-3 align-items-end">
                <div className="col-md-4">
                  <label className="fw-semibold">Nama</label>
                  <input className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="col-md-4">
                  <label className="fw-semibold">Email</label>
                  <input className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="col-md-4 d-flex">
                  <button className="btn btn-primary w-100" onClick={submitUser}>Tambah</button>
                </div>
              </div>
            </div>
          </div>

          {/* data */}
          <div className="card bg-dark text-white">
            <div className="card-header"><h4>Data Users</h4></div>
            <div className="card-body p-0">
              <table className="table table-dark table-striped table-hover mb-0">
                <thead className="table-light text-dark">
                  <tr>
                    <th>ID</th>
                    <th>Nama</th>
                    <th>Email</th>
                    <th>Dibuat</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id}>
                      <td>{u.id}</td>
                      <td>{u.name}</td>
                      <td>{u.email}</td>
                      <td>{new Date(u.createdAt).toLocaleString()}</td>
                      <td className="text-nowrap">
                        <span className="badge bg-warning text-dark me-2" style={{ cursor: "pointer" }} onClick={() => openEditUser(u)}>Edit</span>
                        <span className="badge bg-danger" style={{ cursor: "pointer" }} onClick={() => removeUser(u.id)}>Delete</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* post */}
      {!showUserSection && (
        <>
          {/* tambah */}
          <div className="card bg-dark text-white mb-4">
            <div className="card-header"><h4>Tambah Post</h4></div>
            <div className="card-body">
              <div className="row g-3 align-items-end">
                <div className="col-md-4">
                  <label className="fw-semibold">Judul</label>
                  <input className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="col-md-4">
                  <label className="fw-semibold">Konten</label>
                  <input className="form-control" value={content} onChange={(e) => setContent(e.target.value)} />
                </div>
                <div className="col-md-3">
                  <label className="fw-semibold">User ID</label>
                  <input className="form-control" value={userId} onChange={(e) => setUserId(e.target.value)} />
                </div>
                <div className="col-md-1 d-flex">
                  <button className="btn btn-success w-100" onClick={submitPost}>Tambah</button>
                </div>
              </div>
            </div>
          </div>

          {/* data */}
          <div className="card bg-dark text-white">
            <div className="card-header"><h4>Data Posts</h4></div>
            <div className="card-body p-0">
              <table className="table table-dark table-striped table-hover mb-0">
                <thead className="table-light text-dark">
                  <tr>
                    <th>ID</th>
                    <th>Judul</th>
                    <th>Konten</th>
                    <th>UserID</th>
                    <th>Nama User</th>
                    <th>Email User</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((p) => (
                    <tr key={p.id}>
                      <td>{p.id}</td>
                      <td>{p.title}</td>
                      <td>{p.content}</td>
                      <td>{p.userId}</td>
                      <td>{p.user?.name}</td>
                      <td>{p.user?.email}</td>
                      <td className="text-nowrap">
                        <span className="badge bg-warning text-dark me-2" style={{ cursor: "pointer" }} onClick={() => openEditPost(p)}>Edit</span>
                        <span className="badge bg-danger" style={{ cursor: "pointer" }} onClick={() => removePost(p.id)}>Delete</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* edit user */}
      <div className="modal fade" id="editUserModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5>Edit User</h5>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <label>Nama</label>
              <input className="form-control mb-3" value={editUserName} onChange={(e) => setEditUserName(e.target.value)} />
              <label>Email</label>
              <input className="form-control" value={editUserEmail} onChange={(e) => setEditUserEmail(e.target.value)} />
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button className="btn btn-warning" onClick={saveEditUser}>Save</button>
            </div>
          </div>
        </div>
      </div>

      {/* edit post */}
      <div className="modal fade" id="editPostModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5>Edit Post</h5>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <label>Judul</label>
              <input className="form-control mb-3" value={editPostTitle} onChange={(e) => setEditPostTitle(e.target.value)} />
              <label>Konten</label>
              <input className="form-control mb-3" value={editPostContent} onChange={(e) => setEditPostContent(e.target.value)} />
              <label>UserID</label>
              <input className="form-control" value={editPostUserId} onChange={(e) => setEditPostUserId(e.target.value)} />
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">
                Cancel
              </button>
              <button className="btn btn-warning" onClick={saveEditPost}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;

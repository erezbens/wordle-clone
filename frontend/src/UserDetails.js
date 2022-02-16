function UserDetails({ name, user, logout }) {
  return (
    <div className="user-details-container">
      Logged in as
      <p>{name}</p>
      <button className="logout-button" onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default UserDetails;

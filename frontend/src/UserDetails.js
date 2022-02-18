function UserDetails({ name, user, logout }) {
  return (
    <>
      <div>{name}</div>
      <div>
        <button className="logout-button" onClick={logout}>
          Logout
        </button>
      </div>
    </>
  );
}

export default UserDetails;

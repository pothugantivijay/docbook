function DocBookHeader() {
  const isProfileLinkVisible = window.localStorage.getItem("Type") !== null;
  return (
    <>
      <div className="header">
        <div className="DocBook">DocBook</div>
        <div className="navigation">
          <a href="/search">Browse</a>
          <a href="/help">Help</a>
          {isProfileLinkVisible ? (
            <a href="/profile">Profile</a>
          ) : (
            <a href="/login">Log in / Sign up</a>
          )}
        </div>
      </div>
    </>
  );
}

export default DocBookHeader;

function HelpHeader() {
  const isProfileLinkVisible = window.localStorage.getItem("Type") !== null;
  return (
    <div
      style={{ backgroundColor: "#f8fcfd", minHeight: "60vh", width: "100%" }}
    >
      <div className="container">
        <div className="header">
          <div className="DocBook">DocBook</div>
          <div className="navigation">
            <a href="#">Browse</a>
            <a href="/help">Help</a>
            {isProfileLinkVisible ? (
              <a href="/profile">Profile</a>
            ) : (
              <a href="/login">Log in / Sign up</a>
            )}
          </div>
        </div>
        <div
          className="row justify-content-center align-items-center"
          style={{ minHeight: "calc(60vh - 60px)" }}
        >
          <div className="col-12 text-center">
            <h2 className="display-3">
              Get the info you’re looking for right now
            </h2>
            <p className="lead mt-3">
              Get answers to common questions and access service support
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HelpHeader;

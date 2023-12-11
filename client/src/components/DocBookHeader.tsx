import { useSelector } from "react-redux";
import { selectUser } from "../store/slices/login_slice";

function DocBookHeader() {
  const isProfileLinkVisible = useSelector(selectUser);
  return (
    <>
      <div className="header">
        <div className="DocBook">DocBook</div>
        <div className="navigation">
          <a href="/search">Browse</a>
          <a href="/help">Help</a>
          {isProfileLinkVisible != null ? (
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

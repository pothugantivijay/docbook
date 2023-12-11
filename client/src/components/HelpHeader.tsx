import DocBookHeader from "./DocBookHeader";
function HelpHeader() {
  return (
    <div
      style={{ backgroundColor: "#f8fcfd", minHeight: "60vh", width: "100%" }}
    >
      <DocBookHeader></DocBookHeader>
      <div className="container">
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

import React from "react";

const NotFound: React.SFC<{}> = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh"
    }}
  >
    <h1>404</h1>
    <h2>I think you are in the wrong place</h2>
  </div>
);

export default NotFound;

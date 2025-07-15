import React from "react";

interface ErrorProps {
  requestId?: string;
  message?: string;
}

export default function ErrorPage({ requestId, message }: ErrorProps) {
    return (
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <h1>Oops! Something went wrong.</h1>
        {message && <p>{message}</p>}
        {requestId && (
          <p>
            <small>Request ID: {requestId}</small>
          </p>
        )}
      </div>
    );
};

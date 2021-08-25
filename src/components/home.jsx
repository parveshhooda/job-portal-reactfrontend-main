import React from "react";
import styled from "styled-components";

export default function home() {
  return (
    <>
      <Parent>
        <div className="display-3 font-weight-bold">Recruit</div>
        <div className="font-weight-bold text-muted">Get Recruit</div>
        <h3 className="text-muted">OR</h3>
        <div className="font-weight-bold text-muted">Become a Recruiter</div>
      </Parent>
    </>
  );
}

const Parent = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

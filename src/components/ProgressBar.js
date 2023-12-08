import React from 'react';
import styled from 'styled-components';
import Navbar from './NavBar';

const ProgressBarContainer = styled.div`
  width: 80%;
  margin: 20px auto;
  background-color: #eee;
  border-radius: 5px;
  height: 20px;
`;

const Progress = styled.div`
  height: 100%;
  width: ${(props) => props.percentage}%;
  background-color: #3498db;
  border-radius: 5px;
  transition: width 0.5s ease-in-out;
`;

const Comment = styled.p`
  text-align: center;
  margin-top: 2px;
  margin-bottom: 50px;
  color: #3498db;
  font-weight: bold;
`;

const ProgressBar = ({ percentage }) => {
  let comment = '';

  if (percentage < 20) {
    comment = "You're just getting started!";
  } else if (percentage < 50) {
    comment = 'Making progress, keep it up!';
  } else if (percentage < 100) {
    comment = 'You are doing great!';
  } else if (percentage == 100) {
    comment = 'Congratulations! You have completed the task!';
  }

  return (
    <div>
      {percentage !== undefined && !isNaN(percentage) && (
        <>
          <ProgressBarContainer>
            <Progress percentage={percentage} />
          </ProgressBarContainer>
          <Comment>{comment}</Comment>
        </>
      )}
    </div>
  );

};

export default ProgressBar;

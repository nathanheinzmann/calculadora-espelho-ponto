import styled from "styled-components";

export const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
`;

export const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
    padding: 0 1rem;  
  }
`;

export const InputTip = styled.p`
  font-size: 0.8rem;
  margin: 0;
  color: #999;
`;

export const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  position: relative;
  margin: 0.2rem 0 0.8rem 0;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 5px #007bff;
  }
`;

export const Tip = styled.p`
  font-size: 0.8rem;
  color: #999;
  margin: 0 0 1rem 0;
`;

export const Button = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid #007bff;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #0069d9;
    border-color: #0062cc;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 5px #007bff;
  }
`;

export const Result = styled.p`
  font-size: 1.2rem;
  margin-top: 1rem;
  padding: 0.5rem;
  border-radius: 4px;
  font-weight: 500;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;


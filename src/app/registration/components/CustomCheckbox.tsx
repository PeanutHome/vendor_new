import React from "react";
import styled from "styled-components";

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  label: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange, label }) => {
  return (
    <StyledWrapper>
      <label className="checkbox-btn">
        <input id={label} type="checkbox" checked={checked} onChange={onChange} />
        <span className="checkmark" />
        <span className="checkbox-label">{label}</span>
      </label>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .checkbox-btn {
    display: flex;
    align-items: center;
    position: relative;
    padding-left: 35px;
    margin-bottom: 10px;
    cursor: pointer;
    user-select: none;
    font-size: 16px;
  }
  .checkbox-btn input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
  .checkbox-label {
    margin-left: 10px;
    font-size: 16px;
    color: #222;
    z-index: 1;
  }
  .checkmark {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 24px;
    width: 24px;
    background: #f0fdf4;
    border: 2.5px solid #00B14F;
    border-radius: 6px;
    transition: border-color 0.2s, background 0.2s;
    box-sizing: border-box;
  }
  .checkbox-btn:hover .checkmark {
    border-color: #0ea021;
    background: #e6f7ee;
  }
  .checkbox-btn input:checked ~ .checkmark {
    background: #00B14F;
    border-color: #00B14F;
  }
  .checkmark:after {
    content: "";
    position: absolute;
    display: block;
    left: 50%;
    top: 50%;
    width: 8px;
    height: 14px;
    border: solid #fff;
    border-width: 0 3px 3px 0;
    opacity: 0;
    transform: translate(-50%, -60%) scale(0.5) rotate(-90deg);
    transition: all 0.2s;
  }
  .checkbox-btn input:checked ~ .checkmark:after {
    opacity: 1;
    transform: translate(-50%, -60%) scale(1) rotate(45deg);
  }
`;

export default Checkbox;

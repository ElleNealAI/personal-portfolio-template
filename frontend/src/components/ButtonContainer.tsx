import React from "react";
import { useNavigate } from "react-router-dom";

export interface Props {
  className?: string;
}

export function ButtonContainer({ className = "" }: Props) {
  const navigate = useNavigate();

  return (
    <div className={`flex flex-wrap gap-5 ${className}`}>
      <button 
        onClick={() => navigate("/Projects")}
        className="btn-primary"
        aria-label="View portfolio projects"
      >
        <span>View Projects</span>
      </button>
      <button 
        onClick={() => navigate("/Contact")}
        className="btn-secondary"
        aria-label="Go to contact page"
      >
        <span>Contact Me</span>
      </button>
    </div>
  );
}

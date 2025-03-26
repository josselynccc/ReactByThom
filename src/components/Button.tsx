import './components.css'
interface ButtonProps {
  text?: string;
  onClick?: () => void;
  disabled?: boolean; 
}

const Button = ({ text, onClick,disabled }:ButtonProps) => {
  return (
    <button className="btn" onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
};

export default Button;
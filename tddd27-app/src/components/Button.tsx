import "./Button.css";

const COLORS = ["btn--white", "btn--clear", "btn--blue"];
const STYLES = ["btn--morepress", "btn--mediumpress", "btn--lesspress"];
const SIZES = ["btn--medium", "btn--large", "btn--small"];

interface Props {
  children: string;
  onClick: () => void;
  buttonColor: string;
  buttonSize: string;
  buttonStyle: string;
}

function Button({
  children,
  onClick,
  buttonColor,
  buttonSize,
  buttonStyle,
}: Props) {
  const checkButtonColor = COLORS.includes(buttonColor)
    ? buttonColor
    : COLORS[0];
  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];

  return (
    <button
      className={`btn ${checkButtonColor} ${checkButtonSize} ${checkButtonStyle}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;

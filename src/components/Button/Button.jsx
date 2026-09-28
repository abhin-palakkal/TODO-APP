const Button = props => {
  return (
    <button style={{ color: props.color }}>
      {props.text ? props.text : 'submit'}
    </button>
  );
};
export default Button;

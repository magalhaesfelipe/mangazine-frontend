import classes from "./FormInput.module.css"

const FormInput = ({ label, type, name, value, onChange, required }) => (
  <div className={classes.container}>
    <p>{label}</p>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className={classes.theInput}
    />
  </div>
);

export default FormInput;

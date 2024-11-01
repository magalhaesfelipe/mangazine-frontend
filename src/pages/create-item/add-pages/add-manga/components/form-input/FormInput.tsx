import classes from "./style.module.css"

const FormInput = ({ label, type, name, value, onChange, required }) => (
  <div>
    <label className={classes.fieldName}>{label}:</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
    />
  </div>
);

export default FormInput;

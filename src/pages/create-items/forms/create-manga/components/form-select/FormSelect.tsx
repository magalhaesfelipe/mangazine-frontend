import classes from "./FormSelect.module.css"

const FormSelect = ({ label, name, value, onChange, options }) => (
  <div>
    <p>{label}</p>
    <select name={name} value={value} onChange={onChange} className={classes.selectElement}>
      <option value="">Select</option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default FormSelect;

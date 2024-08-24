const FormSelect = ({ label, name, value, onChange, options }) => (
  <div>
    <label>{label}:</label>
    <select name={name} value={value} onChange={onChange}>
      <option value="">Select {label}</option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default FormSelect;

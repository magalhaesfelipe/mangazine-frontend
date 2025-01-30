const FormSelect = ({ label, name, value, onChange, options }) => (
  <div>
    <p className="mb-2">{label}</p> {/* Added margin to the label */}
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="mt-1 w-full p-2 border border-gray-300 rounded-md bg-white text-black" // selectElement
    >
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

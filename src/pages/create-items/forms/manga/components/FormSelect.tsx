const FormSelect = ({ label, name, value, onChange, options }) => (
  <div>
    <p className="mb-2">{label}</p>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="mt-1 w-full p-2 border border-gray-300 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
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

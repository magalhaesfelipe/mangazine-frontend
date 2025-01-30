const FormInput = ({ label, type, name, value, onChange, required }) => (
  <div className="mb-4">
    {" "}
    {/* container */}
    <p className="mb-2">{label}</p> {/* p */}
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full p-2 border border-gray-300 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500" // theInput with focus styling
    />
  </div>
);

export default FormInput;

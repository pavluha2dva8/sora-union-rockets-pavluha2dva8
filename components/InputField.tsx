interface InputFieldProps {
  label: string
  type: string
  placeholder: string
  value: string
  handleChange: (value: string) => void
}

export default function InputField({
  label,
  type,
  placeholder,
  value,
  handleChange,
}: InputFieldProps) {
  return (
    <div className="mb-4">
      <label className="capitalize block text-gray-700 font-bold mb-2" htmlFor={label}>
        {label}
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id={label}
        type={type}
        placeholder={placeholder}
        required
        value={value}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  )
}

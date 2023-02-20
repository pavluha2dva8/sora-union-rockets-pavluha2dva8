interface TextareaFieldProps {
  label: string
  placeholder: string
  value: string
  handleChange: (value: string) => void
}

export default function TextareaField({
  label,
  placeholder,
  value,
  handleChange,
}: TextareaFieldProps) {
  return (
    <div className="mb-4">
      <label className="capitalize block text-gray-700 font-bold mb-2" htmlFor={label}>
        {label}
      </label>
      <textarea
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id={label}
        rows={5}
        placeholder={placeholder}
        required
        value={value}
        minLength={5}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  )
}

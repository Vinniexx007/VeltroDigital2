interface FormSelectOption {
  value: string
  label: string
}

interface FormSelectProps {
  id: string
  name: string
  label: string
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
  required?: boolean
  error?: string
  options: FormSelectOption[]
}

export function FormSelect({
  id,
  name,
  label,
  value,
  onChange,
  onBlur,
  required = false,
  error,
  options,
}: FormSelectProps) {
  const errorId = `${id}-error`
  const hasError = Boolean(error)

  return (
    <div>
      <label htmlFor={id} className="mb-1 block font-medium text-navy">
        {label}
        {required && (
          <>
            <span aria-hidden="true" className="ml-0.5 text-red-600">
              *
            </span>
            <span className="sr-only">(required)</span>
          </>
        )}
      </label>
      <select
        id={id}
        name={name}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        aria-invalid={hasError ? true : undefined}
        aria-describedby={hasError ? errorId : undefined}
        className={`w-full rounded-btn border border-grey-dark px-4 py-3 text-navy focus-visible:ring-2 focus-visible:ring-blue focus-visible:outline-none${
          hasError ? ' border-red-600' : ''
        }`}
      >
        <option value="" disabled>
          Please select…
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {hasError && (
        <span id={errorId} role="alert" className="mt-1 block text-sm text-red-600">
          {error}
        </span>
      )}
    </div>
  )
}

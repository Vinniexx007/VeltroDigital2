interface FormTextareaProps {
  id: string
  name: string
  label: string
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
  required?: boolean
  error?: string
  placeholder?: string
}

export function FormTextarea({
  id,
  name,
  label,
  value,
  onChange,
  onBlur,
  required = false,
  error,
  placeholder,
}: FormTextareaProps) {
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
      <textarea
        id={id}
        name={name}
        rows={5}
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        aria-invalid={hasError ? true : undefined}
        aria-describedby={hasError ? errorId : undefined}
        className={`w-full rounded-btn border border-grey-dark px-4 py-3 text-navy focus-visible:ring-2 focus-visible:ring-blue focus-visible:outline-none${
          hasError ? ' border-red-600' : ''
        }`}
      />
      {hasError && (
        <span id={errorId} role="alert" className="mt-1 block text-sm text-red-600">
          {error}
        </span>
      )}
    </div>
  )
}

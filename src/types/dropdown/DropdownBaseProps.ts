export interface DropdownBaseProps {
  label?: string
  value?: string | null
  error?: boolean
  errorMessages?: string[]
  disabled?: boolean
  density?: 'comfortable' | 'compact' | 'default'
  placeholder?: string
}

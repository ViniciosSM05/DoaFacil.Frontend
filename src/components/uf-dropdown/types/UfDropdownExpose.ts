import type { UfData } from '@/components/uf-dropdown/types/UfData'

export interface UfDropdownExpose {
  getUfs: () => UfData[]
}

import { useTable } from "../context/Table"

export const useToolbar = () => {
  const { handleInputChange, handleSelectOption } = useTable()
  
  return {
    handleSearchBar: handleInputChange,
    handleEntriesSelector: handleSelectOption
  }
}
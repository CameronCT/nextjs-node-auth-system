import { useState, createContext, useContext, useEffect, useCallback, ReactNode } from 'react'

interface ContextType {
    modal: number | null
    setModal: (modal: number | null) => void
    dropdown: number | null
    setDropdown: (dropdown: number | null) => void
    toggleDropdown: (dropdown: number) => void
}

export const AppContext = createContext<ContextType | null>(null)

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [modal, setModal] = useState<number | null>(null)
    const [dropdown, setDropdown] = useState<number | null>(null)

    const toggleDropdown = (dropdownId: number) => setDropdown(dropdown === dropdownId ? null : dropdownId)

    const getAppData = useCallback(async () => {
        /* Could contain data that is used across the entire app */
    }, [])

    useEffect(() => {
        getAppData()
    }, [getAppData])

    return <AppContext.Provider value={{ modal, setModal, dropdown, setDropdown, toggleDropdown }}>{children}</AppContext.Provider>
}

export const useAppContext = (): ContextType => {
    const context = useContext(AppContext)

    if (context == null) {
        throw new Error('useAppContext must be used within a AppProvider')
    }

    return context
}
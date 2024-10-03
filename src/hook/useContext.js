const { createContext, useState } = require('react');

const sidebarContext = createContext();

function SidebarProvider({ children }) {
    const [openSidebar, setOpenSidebar] = useState(false);

    const handleToggle = () => {
        setOpenSidebar((prev) => (!prev));
    };

    const value = { openSidebar, handleToggle };
    return <sidebarContext.Provider value={value}>{children}</sidebarContext.Provider>;
}

export { SidebarProvider, sidebarContext };

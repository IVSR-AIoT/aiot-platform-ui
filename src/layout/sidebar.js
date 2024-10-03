import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import Menu from '~/components/menu';
import { menuItems } from '~/configs/sidebarConfig';
import { sidebarContext } from '~/hook/useContext';

export default function Sidebar() {
    const context = useContext(sidebarContext);
    const isSidebarOpen = context.openSidebar;
    const toggleSidebar = context.handleToggle;

    return (
        <>
            {isSidebarOpen && (
                <aside className="fixed top-[60px] left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0">
                    <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                        <div className="flex justify-between items-center mb-1">
                            <h1 className="text-gray-900 font-semibold">MENU</h1>
                            <FontAwesomeIcon
                                onClick={toggleSidebar} // Đóng sidebar khi nhấn icon
                                icon={faXmark}
                                className="text-[20px] text-gray-500 transition duration-75 hover:text-gray-900"
                            />
                        </div>
                        <ul className="space-y-2 font-medium">
                            {menuItems.map((menuItem, index) => (
                                <li key={index}>
                                    <Menu menuItem={menuItem} />
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>
            )}
        </>
    );
}

import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isAdmin } from '~/hook/useAuth';
import { useState } from 'react';

export default function Menu({ menuItem }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenSubItems = (e) => {
        e.preventDefault(); 
        setIsOpen((prevState) => !prevState); 
    };

    const checkAdmin = menuItem.roleId ? (isAdmin() ? '' : 'hidden') : '';
    const Tag = menuItem.subItems ? 'button' : 'a';
    const tagCss = menuItem.subItems
        ? 'flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group w-[100%]'
        : 'flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700';

        
    return (
        <div className={`${checkAdmin}`}>
            <Tag
                href={menuItem.route}
                className={tagCss}
                onClick={menuItem.subItems ? handleOpenSubItems : undefined}
            >
                <FontAwesomeIcon
                    icon={menuItem.icon}
                    className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white"
                />
                <p className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">{menuItem.title}</p>
                {menuItem.subItems && (
                    <FontAwesomeIcon
                        icon={faChevronDown}
                        className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} 
                    />
                )}
            </Tag>

          
            {menuItem.subItems && (
                <ul className={`py-2 space-y-2 ${isOpen ? '' : 'hidden'}`}>
                    {menuItem.subItems.map((item, index) => (
                        <li key={index}>
                            <a
                                href={item.route}
                                className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                            >
                                <FontAwesomeIcon
                                    icon={item.icon}
                                    className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                />
                                <label className="ml-2">{item.label}</label>
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

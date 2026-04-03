import { Outlet, Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { FaHome, FaUtensils, FaClipboardList, FaSignOutAlt, FaBullhorn, FaWallet } from 'react-icons/fa';

const OwnerLayout = () => {
    const { logout, user } = useContext(AuthContext);
    const location = useLocation();

    const navItems = [
        { name: 'Dashboard', path: '/admin', icon: <FaHome /> },
        { name: 'Menu', path: '/admin/menu', icon: <FaUtensils /> },
        { name: 'Orders', path: '/admin/orders', icon: <FaClipboardList /> },
        { name: 'Transactions', path: '/admin/transactions', icon: <FaWallet /> },
        { name: 'Marketing', path: '/admin/marketing', icon: <FaBullhorn /> },
    ];

    return (
        <div className="flex h-screen bg-gray-100 font-sans">
            {/* Sidebar */}
            <div className="w-64 bg-white shadow-xl flex flex-col z-10">
                <div className="p-6 border-b border-gray-100 flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-brand-primary flex flex-shrink-0 items-center justify-center text-white font-bold text-xl uppercase">
                        {user && user.name ? user.name.charAt(0) : 'A'}
                    </div>
                    <div className="flex flex-col overflow-hidden">
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Welcome</span>
                        <h1 className="text-lg font-extrabold tracking-tight text-gray-900 truncate" title={user ? user.name : 'Admin Panel'}>
                            {user && user.name ? user.name : 'Admin Panel'}
                        </h1>
                    </div>
                </div>
                <nav className="flex-1 px-4 py-6 space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                                location.pathname === item.path || (location.pathname.startsWith(item.path) && item.path !== '/admin')
                                    ? 'bg-brand-primary text-white shadow-md shadow-sky- translate-x-1'
                                    : 'text-gray-500 hover:bg-sky-50 hover:text-brand-primary hover:translate-x-1'
                            }`}
                        >
                            <span className="text-lg">{item.icon}</span>
                            <span className="font-medium">{item.name}</span>
                        </Link>
                    ))}
                </nav>
                <div className="p-4 border-t border-gray-100">
                    <button
                        onClick={logout}
                        className="flex items-center space-x-3 w-full px-4 py-3 text-red-500 hover:bg-sky-50 rounded-xl transition-colors"
                    >
                        <FaSignOutAlt className="text-lg" />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto bg-slate-50 p-8 sm:p-10">
                <Outlet />
            </div>
        </div>
    );
};

export default OwnerLayout;

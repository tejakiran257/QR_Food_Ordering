import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { FaMoneyBillWave, FaCreditCard, FaCalendarAlt } from 'react-icons/fa';

const Transactions = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterMethod, setFilterMethod] = useState('All'); // 'All', 'Online', 'Cash'
    
    // Default date range: Last 30 days
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        const d = new Date();
        d.setDate(d.getDate() - 30);
        setStartDate(d.toISOString().split('T')[0]);
        setEndDate(new Date().toISOString().split('T')[0]);
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        try {
            const token = localStorage.getItem('ownerToken');
            const { data } = await axios.get('/api/orders', {
                headers: { Authorization: `Bearer ${token}` }
            });
            // Consider only paid items or completed orders 
            // In our system, paymentStatus tracks if money came in
            setOrders(data.filter(o => o.paymentStatus === 'Paid' && o.orderStatus !== 'Cancelled'));
        } catch (error) {
            toast.error('Failed to load transactions');
        } finally {
            setLoading(false);
        }
    };

    // Derived filtered transactions based on method and date range
    const filteredTransactions = orders.filter(order => {
        // Date filter
        const orderDate = new Date(order.createdAt).toISOString().split('T')[0];
        if (startDate && orderDate < startDate) return false;
        if (endDate && orderDate > endDate) return false;
        
        // Payment method filter
        if (filterMethod !== 'All' && order.paymentMethod !== filterMethod) return false;
        
        return true;
    });

    const totalRevenue = filteredTransactions.reduce((acc, curr) => acc + curr.totalAmount, 0);
    const onlineRevenue = filteredTransactions.filter(o => o.paymentMethod === 'Online').reduce((acc, curr) => acc + curr.totalAmount, 0);
    const cashRevenue = filteredTransactions.filter(o => o.paymentMethod === 'Cash').reduce((acc, curr) => acc + curr.totalAmount, 0);

    if (loading) return <div className="flex h-64 items-center justify-center text-xl font-bold text-gray-500 tracking-wider animate-pulse">Loading transactions...</div>;

    return (
        <div className="space-y-8 animate-fade-in pb-12">
            {/* Header */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-8 rounded-[2rem] shadow-xl text-white relative overflow-hidden flex flex-col sm:flex-row justify-between items-center z-10 box-border border border-gray-800 gap-5">
                <div className="absolute -top-10 -right-10 w-48 h-48 bg-brand-primary/20 rounded-full blur-3xl pointer-events-none"></div>
                
                <div className="relative z-10">
                    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">Transactions</h2>
                    <p className="text-gray-400 font-medium">Detailed payment history and revenue tracking.</p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-6 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center space-x-2 bg-gray-50 p-1.5 rounded-xl border border-gray-200">
                    {['All', 'Online', 'Cash'].map(method => (
                        <button
                            key={method}
                            onClick={() => setFilterMethod(method)}
                            className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
                                filterMethod === method
                                ? 'bg-white text-gray-900 shadow-sm border border-gray-200'
                                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-200/50 transparent'
                            }`}
                        >
                            {method}
                        </button>
                    ))}
                </div>

                <div className="flex items-center space-x-4">
                    <div className="flex flex-col">
                        <label className="text-xs font-bold text-gray-500 mb-1 ml-1 flex items-center gap-1"><FaCalendarAlt /> Start Date</label>
                        <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent text-sm font-medium" />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-xs font-bold text-gray-500 mb-1 ml-1 flex items-center gap-1"><FaCalendarAlt /> End Date</label>
                        <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent text-sm font-medium" />
                    </div>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex items-center space-x-4">
                    <div className="w-14 h-14 rounded-2xl bg-gray-900 text-white flex items-center justify-center text-xl shadow-lg">
                        <span className="font-extrabold text-2xl">₹</span>
                    </div>
                    <div>
                        <p className="text-sm font-bold text-gray-500 tracking-wider">TOTAL REVENUE</p>
                        <h4 className="text-3xl font-extrabold text-gray-900">₹{totalRevenue}</h4>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex items-center space-x-4 border-l-4 border-l-blue-500">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl shadow-sm">
                        <FaCreditCard />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-gray-500 tracking-wider">ONLINE PAYMENTS</p>
                        <h4 className="text-2xl font-extrabold text-gray-900">₹{onlineRevenue}</h4>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex items-center space-x-4 border-l-4 border-l-green-500">
                    <div className="w-14 h-14 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center text-xl shadow-sm">
                        <FaMoneyBillWave />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-gray-500 tracking-wider">CASH PAYMENTS</p>
                        <h4 className="text-2xl font-extrabold text-gray-900">₹{cashRevenue}</h4>
                    </div>
                </div>
            </div>

            {/* Transactions List */}
            <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                    <h3 className="text-xl font-extrabold text-gray-900">Transaction History</h3>
                    <span className="text-sm font-bold text-gray-500 bg-white px-4 py-1.5 rounded-lg border border-gray-200 shadow-sm">{filteredTransactions.length} records</span>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white text-xs text-gray-500 uppercase tracking-widest border-b border-gray-100">
                                <th className="p-5 font-extrabold">Order / Token</th>
                                <th className="p-5 font-extrabold">Date & Time</th>
                                <th className="p-5 font-extrabold">Payment Method</th>
                                <th className="p-5 font-extrabold text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredTransactions.length > 0 ? filteredTransactions.map(tx => (
                                <tr key={tx._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-5 font-medium text-gray-900">
                                        <div className="font-bold flex items-center gap-2">
                                            <span className="bg-sky-50 text-brand-primary px-2 py-0.5 rounded text-xs tracking-wider border border-brand-primary/20">#{tx.tokenNumber}</span>
                                        </div>
                                        <div className="text-xs text-gray-500 mt-1">{tx._id}</div>
                                    </td>
                                    <td className="p-5 text-gray-600 font-medium">
                                        <div>{new Date(tx.createdAt).toLocaleDateString()}</div>
                                        <div className="text-xs text-gray-400">{new Date(tx.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                                    </td>
                                    <td className="p-5">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${tx.paymentMethod === 'Online' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-green-50 text-green-700 border-green-200'}`}>
                                            {tx.paymentMethod === 'Online' ? <FaCreditCard className="mr-1.5" /> : <FaMoneyBillWave className="mr-1.5" />}
                                            {tx.paymentMethod}
                                        </span>
                                    </td>
                                    <td className="p-5 text-right">
                                        <div className="text-lg font-extrabold text-gray-900">₹{tx.totalAmount}</div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="4" className="p-10 text-center text-gray-500 font-medium">
                                        No transactions found for the selected filters.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Transactions;

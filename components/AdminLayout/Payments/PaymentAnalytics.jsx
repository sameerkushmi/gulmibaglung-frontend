'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import AdminLayout from '../AdminLayout';
import Interceptor from '@/utils/Interceptor';

const api = Interceptor();

const colorMap = {
  stripe: 'text-blue-400',
  esewa: 'text-green-400',
  khalti: 'text-yellow-400',
};

export default function PaymentAnalytics() {
  const [stats, setStats] = useState(null);
  const [revenueData, setRevenueData] = useState(null);
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingRevenue, setLoadingRevenue] = useState(true);
  const [view, setView] = useState('daily'); // daily | monthly

  /* ================== FETCH STATS ================== */
  useEffect(() => {
    const fetchStats = async () => {
      setLoadingStats(true);
      try {
        const { data } = await api.get('/api/payment/analytics/data');
        setStats(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingStats(false);
      }
    };
    fetchStats();
  }, []);

  /* ================== FETCH REVENUE ================== */
  useEffect(() => {
    const fetchRevenue = async () => {
      setLoadingRevenue(true);
      try {
        const { data } = await api.get(`/api/payment/analytics/revenue?view=${view}`);
        setRevenueData(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingRevenue(false);
      }
    };
    fetchRevenue();
  }, [view]);

  if (loadingStats || loadingRevenue) {
    return (
      <AdminLayout>
        <div className="min-h-screen flex items-center justify-center bg-[#0D2B45] text-white">
          Loading analytics...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout
      breadcrumbs={[
        { label: 'Dashboard', href: '/admin' },
        { label: 'Payments' },
        { label: 'Payment Dashboard' },
      ]}
    >
      <div className="min-h-screen bg-[#0D2B45] p-6 text-white">
        {/* ================== HEADER ================== */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-8"
        >
          📊 Payment Dashboard
        </motion.h1>

        {/* ================== STATS ================== */}
        <div className="grid md:grid-cols-4 gap-6">
          {['stripe', 'esewa', 'khalti'].map((method) => (
            <>
              <StatCard
                key={`${method}-total`}
                title={`${method.toUpperCase()} Total`}
                value={stats[method].totalEvents}
                color={colorMap[method]}
              />
              <StatCard
                key={`${method}-paid`}
                title={`${method.toUpperCase()} Paid`}
                value={stats[method].paid}
                color={colorMap[method]}
              />
              <StatCard
                key={`${method}-failed`}
                title={`${method.toUpperCase()} Failed`}
                value={stats[method].failed}
                color={colorMap[method]}
              />
              <StatCard
                key={`${method}-pending`}
                title={`${method.toUpperCase()} Pending`}
                value={stats[method].pending}
                color={colorMap[method]}
              />
            </>
          ))}
        </div>

        {/* ================== INFO CARDS ================== */}
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {['stripe', 'esewa', 'khalti'].map((method) => (
            <InfoCard key={`${method}-revenue`} title={`${method.toUpperCase()} Total Revenue`}>
              NPR {stats[method].totalRevenue.toLocaleString()} <br />
              Success Rate: {stats[method].successRate}%
            </InfoCard>
          ))}
        </div>

        {/* ================== REVENUE CHART ================== */}
        <div className="mt-10">
          <div className="flex items-center justify-between mb-4">
            <motion.h2
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold"
            >
              📈 Revenue Chart ({view === 'daily' ? 'Daily' : 'Monthly'})
            </motion.h2>

            {/* Toggle */}
            <div className="flex bg-[#0A1F35] rounded-xl overflow-hidden border border-white/10">
              <button
                onClick={() => setView('daily')}
                className={`px-4 py-2 text-sm font-semibold transition ${
                  view === 'daily'
                    ? 'bg-[#d4af37] text-black'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                Daily
              </button>
              <button
                onClick={() => setView('monthly')}
                className={`px-4 py-2 text-sm font-semibold transition ${
                  view === 'monthly'
                    ? 'bg-[#d4af37] text-black'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                Monthly
              </button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#0A1F35] border border-white/10 rounded-2xl p-6 shadow-lg"
          >
            <ResponsiveContainer width="100%" height={400}>
              <LineChart
                data={mergeRevenueData(revenueData, view)}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#1f3b57" />
                <XAxis
                  dataKey={view === 'daily' ? 'date' : 'month'}
                  stroke="#ffffff"
                />
                <YAxis stroke="#ffffff" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0D2B45',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    color: '#fff',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="stripeRevenue"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="esewaRevenue"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="khaltiRevenue"
                  stroke="#facc15"
                  strokeWidth={3}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>
    </AdminLayout>
  );
}

/* ================== HELPER FUNCTIONS ================== */
const mergeRevenueData = (data, view) => {
  // merge stripe, esewa, khalti by date/month
  const allKeys = new Set();

  data.stripeRevenue.forEach((d) => allKeys.add(view === 'daily' ? d.date : d.month));
  data.esewaRevenue.forEach((d) => allKeys.add(view === 'daily' ? d.date : d.month));
  data.khaltiRevenue.forEach((d) => allKeys.add(view === 'daily' ? d.date : d.month));

  const merged = Array.from(allKeys).sort().map((key) => ({
    [view === 'daily' ? 'date' : 'month']: key,
    stripeRevenue:
      data.stripeRevenue.find((d) => (view === 'daily' ? d.date : d.month) === key)
        ?.revenue || 0,
    esewaRevenue:
      data.esewaRevenue.find((d) => (view === 'daily' ? d.date : d.month) === key)
        ?.revenue || 0,
    khaltiRevenue:
      data.khaltiRevenue.find((d) => (view === 'daily' ? d.date : d.month) === key)
        ?.revenue || 0,
  }));

  return merged;
};

/* ================== COMPONENTS ================== */
const StatCard = ({ title, value, color = 'text-blue-400' }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="rounded-2xl p-5 bg-[#0A1F35] border border-white/10 shadow-lg"
  >
    <p className="text-sm text-white/60">{title}</p>
    <p className={`text-2xl md:text-3xl font-bold mt-2 ${color}`}>{value}</p>
  </motion.div>
);

const InfoCard = ({ title, children }) => (
  <div className="rounded-2xl p-6 bg-[#0A1F35] border border-white/10 shadow-lg">
    <p className="text-sm text-white/60 mb-2">{title}</p>
    <p className="text-2xl font-bold">{children}</p>
  </div>
);

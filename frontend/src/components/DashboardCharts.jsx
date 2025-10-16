import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const COLORS = ["#4ade80", "#facc15", "#f87171"]; 

const DashboardCharts = ({ bookings, payments, users }) => {

  const getLastFourMonths = () => {
    return Array.from({ length: 4 }, (_, i) => {
      const month = new Date();
      month.setMonth(month.getMonth() - (3 - i));
      return month;
    });
  };

  const months = getLastFourMonths();

  const bookingsData = months.map((month) => {
    const monthLabel = month.toLocaleString("default", { month: "short" });
    const monthBookings = bookings?.filter(
      (b) =>
        new Date(b.bookingDate).getMonth() === month.getMonth() &&
        new Date(b.bookingDate).getFullYear() === month.getFullYear()
    );
    const monthRevenue = monthBookings?.reduce((sum, b) => sum + (b.totalAmount || 0), 0);

    return {
      label: monthLabel,
      bookings: monthBookings?.length || 0,
      revenue: monthRevenue || 0,
    };
  });

  

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <div className="bg-white rounded-2xl shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Bookings (Last 4 Months)</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={bookingsData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="bookings" stroke="#4ade80" strokeWidth={3} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-2xl shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Revenue (Last 4 Months)</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={bookingsData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="revenue" stroke="#facc15" strokeWidth={3} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardCharts;

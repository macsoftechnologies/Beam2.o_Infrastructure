import React, { useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import { getRequestCounts, getPlans, getGraphCountsPerDay, getGraphSummary } from '../../services/authService';
import './Dashboard.css';
// import {
//   showSuccessToast,
//   showErrorToast,
//   showDeleteConfirm,
// } from '../../components/common/Toast/Toast'

Chart.register(...registerables)
Chart.defaults.font.family = "'Poppins', sans-serif"

/* ── INLINE SVG ICONS ──────────────────────── */
const Icons = {
  Check: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  DoorOpen: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  Shield: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  XCircle: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  ),
  Stack: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="3" width="20" height="5" rx="1" />
      <rect x="2" y="10" width="20" height="5" rx="1" />
      <rect x="2" y="17" width="20" height="5" rx="1" />
    </svg>
  ),
  Plus: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
  PersonPlus: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <line x1="19" y1="8" x2="19" y2="14" />
      <line x1="22" y1="11" x2="16" y2="11" />
    </svg>
  ),
  Briefcase: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    </svg>
  ),
  ExclamationCircle: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
  Calendar: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  GeoAlt: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  BarChart: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  ),
  Clock: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  ConeStriped: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  GearWide: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
    </svg>
  ),
  BuildingCheck: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  Buildings: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="2">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    </svg>
  ),
  BriefcaseLg: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    </svg>
  ),
  PeopleFill: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
}

/* ── STAT CARD ─────────────────────────────── */
function StatCard({ colorClass, icon: IconComp, value, label }) {
  return (
    <div className={`stat-card-prime ${colorClass}`}>
      <div className="icon-bubble">
        <IconComp />
      </div>
      <h3 className="val-prime">{value}</h3>
      <p className="lab-prime">{label}</p>
    </div>
  )
}

/* ── RECENT REQUESTS TABLE ─────────────────── */
const recentRequests = [
  { permit: '220969065042026', activity: 'Electrical',  contractor: 'Alpha Build',   status: 'Approved', badgeClass: 'badge-success' },
  { permit: '220969065042032', activity: 'HVAC',        contractor: 'Cooling Tech',  status: 'Hold',     badgeClass: 'badge-warning' },
  { permit: '220969065042111', activity: 'Plumbing',    contractor: 'WaterWorks',    status: 'Closed',   badgeClass: 'badge-primary' },
  { permit: '220969065042322', activity: 'Scaffolding', contractor: 'Safe Erectors', status: 'Rejected', badgeClass: 'badge-danger'  },
  { permit: '220969065042398', activity: 'Welding',     contractor: 'Metal Masters', status: 'Approved', badgeClass: 'badge-success' },
]

/* ── PENDING APPROVALS TABLE ───────────────── */
const pendingApprovals = [
  { permit: '220969065042026', activity: 'Welding',    contractor: 'Metal Masters' },
  { permit: '220969065042032', activity: 'Crane Ops',  contractor: 'Heavy Lift'   },
  { permit: '220969065042111', activity: 'Excavation', contractor: 'Dig Deep'     },
  { permit: '220969065042322', activity: 'Concrete',   contractor: 'Solid Base'   },
  { permit: '220969065042450', activity: 'Roofing',    contractor: 'Top Build'    },
]

/* ── RECENT LOGS DATA ──────────────────────── */
const recentLogs = [
  { dot: '#3B82F6', user: 'John Doe', action: 'created request',     category: 'Requests',    catColor: '#3B82F6', time: '2m'  },
  { dot: '#10B981', user: 'Admin',    action: 'approved PRM-1024',   category: 'Approvals',   catColor: '#10B981', time: '15m' },
  { dot: '#06B6D4', user: 'System',   action: 'generated report',    category: 'Reports',     catColor: '#06B6D4', time: '1h'  },
  { dot: '#FB7185', user: 'Sara K.',  action: 'rejected PRM-2088',   category: 'Rejections',  catColor: '#FB7185', time: '2h'  },
  { dot: '#F97316', user: 'Ali M.',   action: 'added new contractor', category: 'Contractors', catColor: '#F97316', time: '3h'  },
]

/* ═══════════════════════════════════════════ */
function Dashboard() {
  const barChartRef    = useRef(null)
  const donutChartRef  = useRef(null)
  const barChartInst   = useRef(null)
  const donutChartInst = useRef(null)

  // ─── STATE VARIABLES ────────────────────────
  const [counts, setCounts] = useState({ approved: 1696, open: 4625, closed: 96942, rejected: 8448, total: 111711 });
  const [todaySummary, setTodaySummary] = useState({ total: 42, approved: 28, rejected: 2, nightShift: 5 });
  const [recentRequestsList, setRecentRequestsList] = useState(recentRequests);
  const [pendingApprovalsList, setPendingApprovalsList] = useState(pendingApprovals);
  const [weekOffset, setWeekOffset] = useState(0);
  const [weekLabel, setWeekLabel] = useState("");
  const [graphData, setGraphData] = useState(null);

  // Helper: calculate first/last day of the week
  const getWeekRange = (offset = 0) => {
    const today = new Date();
    const currentDay = today.getDay(); // 0 is Sunday
    const first = new Date(today);
    first.setDate(today.getDate() - currentDay + (offset * 7));
    const last = new Date(first);
    last.setDate(first.getDate() + 6);

    const formatDate = (d) => d.toISOString().split('T')[0];
    return {
      firstDay: formatDate(first),
      lastDay: formatDate(last),
      label: `${first.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${last.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
    };
  };

  // ─── LOAD WEEKLY GRAPH DATA ─────────────────
  useEffect(() => {
    const { firstDay, lastDay, label } = getWeekRange(weekOffset);
    setWeekLabel(label);

    const fetchGraphData = async () => {
      try {
        const res = await getGraphCountsPerDay(firstDay, lastDay);
        const raw = res?.data ?? res ?? null;
        setGraphData(raw);
      } catch (err) {
        console.error("Failed to load daily graph data", err);
      }
    };
    fetchGraphData();
  }, [weekOffset]);

  // ─── LOAD OVERALL COUNTS, SUMMARY & PLANS ───
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const res = await getRequestCounts();
        const raw = res?.data ?? res ?? null;
        if (raw) {
          let approved = 0, open = 0, closed = 0, rejected = 0, total = 0;
          if (Array.isArray(raw)) {
            raw.forEach(item => {
              const status = (item.Request_status || item.status || "").toLowerCase();
              const count = Number(item.count || item.total || 0);
              if (status === "approved") approved = count;
              else if (status === "open" || status === "draft") open += count;
              else if (status === "closed" || status === "completed") closed = count;
              else if (status === "rejected") rejected = count;
            });
            total = approved + open + closed + rejected;
          } else if (typeof raw === "object") {
            Object.keys(raw).forEach(key => {
              const val = Number(raw[key]);
              const k = key.toLowerCase();
              if (k === "approved") approved = val;
              else if (k === "open") open = val;
              else if (k === "closed") closed = val;
              else if (k === "rejected") rejected = val;
              else if (k === "total") total = val;
            });
            if (!total) total = approved + open + closed + rejected;
          }
          setCounts({ approved, open, closed, rejected, total });
        }
      } catch (err) {
        console.error("Failed to load overall status counts", err);
      }
    };

    const fetchSummary = async () => {
      try {
        const res = await getGraphSummary();
        const raw = res?.data ?? res ?? null;
        if (raw) {
          const target = raw.today || raw;
          setTodaySummary({
            total: Number(target.total_requests || target.total || target.Total || 42),
            approved: Number(target.approved || target.Approved || 28),
            rejected: Number(target.rejected || target.Rejected || 2),
            nightShift: Number(target.night_shift || target.nightShift || target.NightShift || 5)
          });
        }
      } catch (err) {
        console.error("Failed to load today's summary counts", err);
      }
    };

    const fetchPlansList = async () => {
      try {
        const res = await getPlans(1, 10);
        const rows = res?.data?.rows ?? res?.data ?? res ?? [];
        if (Array.isArray(rows) && rows.length > 0) {
          const mapped = rows.map(item => {
            const status = item.Request_status || item.status || "Open";
            let badgeClass = "badge-primary";
            if (status.toLowerCase() === "approved") badgeClass = "badge-success";
            else if (status.toLowerCase() === "hold") badgeClass = "badge-warning";
            else if (status.toLowerCase() === "rejected") badgeClass = "badge-danger";

            return {
              permit: item.PermitNo || item.permit_no || String(item.id),
              activity: item.Activity || "General Work",
              contractor: item.Company_Name || item.contractor_name || "Contractor",
              status,
              badgeClass
            };
          });

          setRecentRequestsList(mapped.slice(0, 5));
          
          const pending = mapped.filter(item => 
            ["pending", "draft", "hold"].includes(item.status.toLowerCase())
          );
          if (pending.length > 0) {
            setPendingApprovalsList(pending.slice(0, 5));
          } else {
            setPendingApprovalsList(mapped.slice(5, 10));
          }
        }
      } catch (err) {
        console.error("Failed to load plans list", err);
      }
    };

    fetchCounts();
    fetchSummary();
    fetchPlansList();
  }, []);

  // ─── RENDER BAR CHART ──────────────────────
  useEffect(() => {
    let labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let approvedData = [45, 55, 58, 56, 62, 59, 64];
    let openData = [35, 42, 36, 26, 45, 48, 52];
    let closedData = [78, 87, 102, 99, 88, 106, 93];
    let rejectedData = [12, 18, 15, 20, 10, 22, 14];

    if (graphData) {
      if (Array.isArray(graphData)) {
        graphData.forEach((dayObj, index) => {
          let label = dayObj.date || dayObj.day || labels[index] || "";
          if (dayObj.date) {
            const d = new Date(dayObj.date);
            const weekday = d.toLocaleDateString('en-US', { weekday: 'short' });
            const dayMonth = `${d.getDate()}/${d.getMonth() + 1}`;
            label = `${weekday} ${dayMonth}`;
          }
          if (index < 7) {
            labels[index] = label;
            approvedData[index] = Number(dayObj.Approved ?? dayObj.approved ?? 0);
            openData[index] = Number(dayObj.Open ?? dayObj.open ?? dayObj.draft ?? 0);
            closedData[index] = Number(dayObj.Closed ?? dayObj.closed ?? dayObj.completed ?? 0);
            rejectedData[index] = Number(dayObj.Rejected ?? dayObj.rejected ?? 0);
          }
        });
      } else if (typeof graphData === "object") {
        if (graphData.labels) labels = graphData.labels;
        if (graphData.Approved) approvedData = graphData.Approved;
        if (graphData.Open) openData = graphData.Open;
        if (graphData.Closed) closedData = graphData.Closed;
        if (graphData.Rejected) rejectedData = graphData.Rejected;
      }
    }

    if (barChartRef.current) {
      if (barChartInst.current) barChartInst.current.destroy();
      const ctx = barChartRef.current.getContext('2d');
      barChartInst.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels,
          datasets: [
            { label: 'Approved', data: approvedData, backgroundColor: '#8B5CF6', borderRadius: 5 },
            { label: 'Open',     data: openData,     backgroundColor: '#06B6D4', borderRadius: 5 },
            { label: 'Closed',   data: closedData,   backgroundColor: '#10B981', borderRadius: 5 },
            { label: 'Rejected', data: rejectedData, backgroundColor: '#FB7185', borderRadius: 5 },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          color: '#ffffff',
          plugins: {
            legend: { position: 'bottom', labels: { boxWidth: 11, padding: 18, color: '#fff' } },
          },
          scales: {
            y: { beginAtZero: true, ticks: { color: '#fff' }, grid: { color: 'rgba(255,255,255,0.07)' } },
            x: { ticks: { color: '#fff' }, grid: { display: false } },
          },
        },
      });
    }

    return () => {
      if (barChartInst.current) barChartInst.current.destroy();
    };
  }, [graphData]);

  // ─── RENDER DONUT CHART ────────────────────
  useEffect(() => {
    if (donutChartRef.current) {
      if (donutChartInst.current) donutChartInst.current.destroy();
      const ctx = donutChartRef.current.getContext('2d');
      donutChartInst.current = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Approved', 'Open', 'Closed', 'Rejected'],
          datasets: [{
            data: [counts.approved, counts.open, counts.closed, counts.rejected],
            backgroundColor: ['#8B5CF6', '#06B6D4', '#10B981', '#FB7185'],
            borderWidth: 0,
            hoverOffset: 12,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '80%',
          plugins: { legend: { display: false } },
        },
      });
    }

    return () => {
      if (donutChartInst.current) donutChartInst.current.destroy();
    };
  }, [counts]);

  /* ── HANDLERS ─────────────────────────── */
  const handleAdd    = () => window.location.href = '/new-request';
  const handleUpdate = () => window.location.href = '/employees';
  const handleDelete = () => window.location.href = '/contractors';
  const handleError  = () => console.log('Action test');

  /* ── RENDER ───────────────────────────── */
  return (
    <div>

      {/* ── QUICK ACTIONS ── */}
      <div className="dash-actions">
        <button className="btn-action-primary" onClick={handleAdd}>
          <Icons.Plus /> New Request
        </button>
        <button className="btn-action-outline" onClick={handleUpdate}>
          <Icons.PersonPlus /> New Employee
        </button>
        <button className="btn-action-outline" onClick={handleDelete}>
          <Icons.Briefcase /> New Contractor
        </button>
      </div>

      {/* ── STAT CARDS ── */}
      <div className="stat-cards-row">
        <StatCard colorClass="card-purple" icon={Icons.Check}    value={counts.approved.toLocaleString()}   label="Approved" />
        <StatCard colorClass="card-cyan"   icon={Icons.DoorOpen} value={counts.open.toLocaleString()}   label="Open"     />
        <StatCard colorClass="card-green"  icon={Icons.Shield}   value={counts.closed.toLocaleString()}  label="Closed"   />
        <StatCard colorClass="card-rose"   icon={Icons.XCircle}  value={counts.rejected.toLocaleString()}   label="Rejected" />
        <StatCard colorClass="card-slate"  icon={Icons.Stack}    value={counts.total.toLocaleString()} label="Total"    />
      </div>

      {/* ── WEEKLY BAR CHART ── */}
      <div className="dark-card">
        <div className="chart-top-bar">
          <div className="section-heading-white">Weekly Performance Data</div>
          <div className="chart-top-bar-right">
            <button className="btn-nav-custom" onClick={() => setWeekOffset(w => w - 1)}>Previous Week</button>
            <button className="btn-nav-custom" onClick={() => setWeekOffset(w => w + 1)}>Next Week</button>
            <span className="week-badge">{weekLabel}</span>
          </div>
        </div>
        <div className="chart-container-tall">
          <canvas ref={barChartRef}></canvas>
        </div>
      </div>

      {/* ── DONUT + TODAY ── */}
      <div className="dist-today-row">
        {/* Donut */}
        <div className="white-card">
          <div className="section-heading">Request Distribution</div>
          <div className="donut-wrap">
            <canvas ref={donutChartRef} style={{ maxHeight: '220px' }}></canvas>
            <div className="donut-center">
              <h3 style={{ fontWeight: 700, fontSize: '1.4rem', margin: 0 }}>
                {counts.total >= 1000 ? `${(counts.total / 1000).toFixed(0)}k` : counts.total}
              </h3>
              <p style={{ color: '#94A3B8', fontSize: '0.72rem', margin: 0 }}>Total Permits</p>
            </div>
          </div>
          <div className="donut-legend">
            {[
              { color: '#8B5CF6', label: 'Approved' },
              { color: '#06B6D4', label: 'Open'     },
              { color: '#10B981', label: 'Closed'   },
              { color: '#FB7185', label: 'Rejected' },
            ].map(({ color, label }) => (
              <div key={label} className="donut-legend-item">
                <span className="legend-dot" style={{ background: color }}></span>
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Today's Summary */}
        <div className="today-card">
          <div className="today-card-title">
            <Icons.Calendar />
            Today's Summary
          </div>
          {[
            { label: 'Total Requests', value: todaySummary.total, color: '#fff'    },
            { label: 'Approved',       value: todaySummary.approved, color: '#34D399' },
            { label: 'Rejected',       value: todaySummary.rejected,  color: '#FB7185' },
            { label: 'Night Shift',    value: todaySummary.nightShift,  color: '#FCD34D' },
          ].map(({ label, value, color }) => (
            <div key={label} className="today-row">
              <span>{label}</span>
              <span style={{ fontWeight: 700, color }}>{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── RECENT REQUESTS + PENDING APPROVALS ── */}
      <div className="tables-row">
        {/* Recent Requests */}
        <div className="clean-card">
          <div className="clean-card-header">
            <div className="section-heading">Recent Requests</div>
            <a href="/request-list" className="btn-view-all">View All</a>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Permit #</th>
                  <th>Activity</th>
                  <th>Contractor</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentRequestsList.map(r => (
                  <tr key={r.permit}>
                    <td className="td-permit">{r.permit}</td>
                    <td>{r.activity}</td>
                    <td>{r.contractor}</td>
                    <td><span className={`badge ${r.badgeClass}`}>{r.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pending Approvals */}
        <div className="clean-card">
          <div className="clean-card-header">
            <div className="section-heading">Pending Approvals</div>
            <a href="/request-list" className="btn-view-all-danger">View All</a>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Permit #</th>
                  <th>Activity</th>
                  <th>Contractor</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {pendingApprovalsList.map(r => (
                  <tr key={r.permit}>
                    <td className="td-permit">{r.permit}</td>
                    <td>{r.activity}</td>
                    <td>{r.contractor}</td>
                    <td>
                      <button className="btn-review" onClick={() => window.location.href = `/new-request?permit=${r.permit}`}>Review</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* ── ZONE STATUS | SYSTEM STATISTICS | RECENT LOGS ── */}
      <div className="bottom-row">

        {/* Zone Status */}
        <div className="zone-card">
          <div className="card-title">
            <Icons.GeoAlt /> Zone Status
          </div>
          {[
            {
              cls: 'warning',
              iconBg: '#FEF3C7', iconColor: '#D97706',
              icon: <Icons.ConeStriped />,
              name: 'Under Construction', sub: 'Active zones',  count: 12,
            },
            {
              cls: 'info',
              iconBg: '#CFFAFE', iconColor: '#0891B2',
              icon: <Icons.GearWide />,
              name: 'Commissioning',      sub: 'In progress',   count: 8,
            },
            {
              cls: 'success',
              iconBg: '#D1FAE5', iconColor: '#059669',
              icon: <Icons.BuildingCheck />,
              name: 'Hand Over',          sub: 'Completed',     count: 5,
            },
          ].map(z => (
            <div key={z.name} className={`zone-item ${z.cls}`}>
              <div className="zone-icon" style={{ background: z.iconBg, color: z.iconColor }}>
                {z.icon}
              </div>
              <div className="zone-label">
                <p className="zone-name">{z.name}</p>
                <small>{z.sub}</small>
              </div>
              <span className="zone-count">{z.count}</span>
            </div>
          ))}
        </div>

        {/* System Statistics */}
        <div className="stats-card">
          <div className="card-title">
            <Icons.BarChart /> System Statistics
          </div>
          <div className="stats-grid">
            <div>
              <div className="stat-circle bg-primary-soft">
                <Icons.Buildings />
              </div>
              <p className="stat-circle-num">15</p>
              <p className="stat-circle-label">Departments</p>
            </div>
            <div>
              <div className="stat-circle bg-success-soft">
                <Icons.BriefcaseLg />
              </div>
              <p className="stat-circle-num">42</p>
              <p className="stat-circle-label">Contractors</p>
            </div>
          </div>
          <div className="emp-band">
            <span className="emp-band-label">
              <Icons.PeopleFill />
              Total Employees
            </span>
            <span className="emp-band-val">1,280</span>
          </div>
        </div>

        {/* Recent Logs */}
        <div className="logs-card">
          <div className="card-title">
            <Icons.Clock /> Recent Logs
          </div>
          {recentLogs.map((log, i) => (
            <div key={i} className="log-item">
              <span className="log-dot" style={{ background: log.dot }}></span>
              <div className="log-body">
                <p className="log-title">
                  {log.user} <span>{log.action}</span>
                </p>
                <span className="log-category" style={{ color: log.catColor }}>{log.category}</span>
              </div>
              <span className="log-time">{log.time}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Dashboard
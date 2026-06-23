import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import "./Sidebar.css";

/* ── NAV ITEM with collapsible submenu ── */
function NavItem({ icon, label, badge, paths, children }) {
  const { pathname } = useLocation()

  // Auto-open if any child path matches current URL
  const isChildActive = paths ? paths.some(p => pathname.startsWith(p)) : false
  const [open, setOpen] = useState(isChildActive)

  return (
    <>
      <button
        className={`nav-link nav-link-parent ${isChildActive ? 'active' : ''} ${open ? 'nav-link-open' : ''}`}
        onClick={() => setOpen(p => !p)}
      >
        <span className="nav-icon-box">
          <i className={`ti ${icon}`} aria-hidden="true" />
        </span>
        <span className="nav-label">{label}</span>
        {badge && <span className={`nav-badge ${badge.color || ''}`}>{badge.text}</span>}
        <span className={`nav-chevron ${open ? 'open' : ''}`}>
          <i className="ti ti-chevron-down" aria-hidden="true" />
        </span>
      </button>
      {open && <ul className="submenu">{children}</ul>}
    </>
  )
}

/* ── SUB ITEM (supports nested level) ── */
function SubItem({ href, label, subChildren }) {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)

  if (!subChildren) {
    const isActive = href && pathname === href
    return (
      <li>
        <a href={href || '#'} className={`nav-sub-link ${isActive ? 'sub-active' : ''}`}>
          <span className="sub-dot" />
          {label}
        </a>
      </li>
    )
  }

  return (
    <li>
      <button className="nav-sub-link nav-sub-toggle" onClick={() => setOpen(p => !p)}>
        <span className="sub-dot" />
        <span className="nav-label">{label}</span>
        <span className={`nav-chevron small ${open ? 'open' : ''}`}>
          <i className="ti ti-chevron-down" aria-hidden="true" />
        </span>
      </button>
      {open && <ul className="sub-submenu">{subChildren}</ul>}
    </li>
  )
}

/* ════════════════════════════════════════════ */
function Sidebar({ sidebarOpen }) {
  const { pathname } = useLocation()

  // Helper: exact match or starts-with for parent routes
  const isActive = (path) => pathname === path || pathname.startsWith(path + '/')

  return (
    <aside className={`sidebar ${sidebarOpen ? '' : 'sidebar-closed'}`}>
      <div className="sidebar-inner">

        {/* Brand */}
        <div className="sidebar-brand">
          <div className="brand-mark">
            <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
              <path d="M5 0a.5.5 0 0 1 .5.5V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2A2.5 2.5 0 0 1 14 4.5h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14A2.5 2.5 0 0 1 11.5 14v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14A2.5 2.5 0 0 1 2 11.5H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2A2.5 2.5 0 0 1 4.5 2V.5A.5.5 0 0 1 5 0" />
            </svg>
          </div>
          <div className="brand-text-wrap">
            <span className="brand-name">M3 INFRASTRUCTURE</span>
            <span className="brand-sub">MANAGEMENT</span>
          </div>
        </div>

        <nav>
          <div className="nav-section-label">Main</div>

          {/* Dashboard */}
          <a href="/dashboard" className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}>
            <span className="nav-icon-box">
              <i className="ti ti-layout-dashboard" aria-hidden="true" />
            </span>
            <span className="nav-label">Dashboard</span>
          </a>

          {/* Department — single link, NO dropdown */}
          <a
            href="/departments"
            className={`nav-link ${isActive('/departments') ? 'active' : ''}`}
          >
            <span className="nav-icon-box">
              <i className="ti ti-sitemap" aria-hidden="true" />
            </span>
            <span className="nav-label">Departments</span>
          </a>

          <a
            href="/contractors"
            className={`nav-link ${isActive('/contractors') ? 'active' : ''}`}
          >
            <span className="nav-icon-box">
              <i className="ti ti-briefcase" aria-hidden="true" />
            </span>
            <span className="nav-label">Contractors</span>
          </a>

          <a
            href="/employees"
            className={`nav-link ${isActive('/employees') ? 'active' : ''}`}
          >
            <span className="nav-icon-box">
              <i className="ti ti-users-group" aria-hidden="true" />
            </span>
            <span className="nav-label">Employees</span>
          </a>
          <a
            href="/zone-status"
            className={`nav-link ${isActive('/zone-status') ? 'active' : ''}`}
          >
            <span className="nav-icon-box">
              <i className="ti ti-map-pin" aria-hidden="true" />
            </span>
            <span className="nav-label">Zone Status</span>
          </a>

          <a
            href="/electrical-works"
            className={`nav-link ${isActive('/electrical-works') ? 'active' : ''}`}
          >
            <span className="nav-icon-box">
              <i className="ti ti-bolt" aria-hidden="true" />
            </span>
            <span className="nav-label">Electrical Works</span>
          </a>

          <a
            href="/mechanical-works"
            className={`nav-link ${isActive('/mechanical-works') ? 'active' : ''}`}
          >
            <span className="nav-icon-box">
              <i className="ti ti-settings" aria-hidden="true" />
            </span>
            <span className="nav-label">Mechanical Works</span>
          </a>

          {/* <NavItem icon="ti-briefcase" label="Contractors"
            paths={['/contractor-new', '/contractor-list']}>
            <SubItem href="/contractor-new"  label="New Contractor"   />
            <SubItem href="/contractor-list" label="Contractors List" />
          </NavItem> */}

          {/* <NavItem icon="ti-users" label="Employees"
            paths={['/employee-new', '/employee-list']}>
            <SubItem href="/employee-new"  label="New Employee"   />
            <SubItem href="/employee-list" label="List Employees" />
          </NavItem> */}

          {/* <NavItem icon="ti-map-pin" label="Zone Status"
            paths={['/zone-new', '/zone-list']}>
            <SubItem href="/zone-new"  label="New Zone"   />
            <SubItem href="/zone-list" label="List Zones" />
          </NavItem> */}

          {/* <NavItem icon="ti-bolt" label="Electrical Works"
            paths={['/electrical-new', '/electrical-list']}>
            <SubItem href="/electrical-new"  label="New Electrical"  />
            <SubItem href="/electrical-list" label="List Electrical" />
          </NavItem>

          <NavItem icon="ti-tool" label="Mechanical Works"
            paths={['/mechanical-new', '/mechanical-list']}>
            <SubItem href="/mechanical-new"  label="New Mechanical"  />
            <SubItem href="/mechanical-list" label="List Mechanical" />
          </NavItem> */}

          <NavItem icon="ti-file-description" label="Request"
            paths={['/request-new', '/request-list']}>
            <SubItem href="/new-request" label="New Request" />
            <SubItem href="/request-list" label="List Request" />
          </NavItem>

          <div className="nav-section-label">Reports &amp; Settings</div>

          <a href="/reports" className={`nav-link ${isActive('/reports') ? 'active' : ''}`}>
            <span className="nav-icon-box">
              <i className="ti ti-chart-line" aria-hidden="true" />
            </span>
            <span className="nav-label">Reports</span>
          </a>

          <NavItem
            icon="ti-adjustments-horizontal"
            label="Settings"
            paths={['/settings/activity', '/settings-safety-new']}
          >
            <li>
              <a
                href="/settings/activity"
                className={`nav-sub-link ${pathname === '/settings/activity' ? 'sub-active' : ''
                  }`}
              >
                <span className="sub-dot" />Activity
              </a>
            </li>

            <li>
              <a
                href="/settings/safety/precaution"
                className={`nav-sub-link ${pathname === '/settings/safety/precaution' ? 'sub-active' : ''
                  }`}
              >
                <span className="sub-dot" />Precaution
              </a>
            </li>
          </NavItem>

          {/* <NavItem icon="ti-adjustments-horizontal" label="Settings"
            paths={['/settings-activity-new', '/settings-activity-list', '/settings-safety-new', '/settings-safety-list']}>
            <SubItem label="Activity" subChildren={
              <>
                <li>
                  <a href="/settings/activity"
                    className={`nav-sub-link nested ${pathname === '/settings/activity' ? 'sub-active' : ''}`}>
                    <span className="sub-dot small" />New Activity
                  </a>
                </li>
                <li>
                  <a href="/settings-activity-list"
                    className={`nav-sub-link nested ${pathname === '/settings-activity-list' ? 'sub-active' : ''}`}>
                    <span className="sub-dot small" />List Activity
                  </a>
                </li>
              </>
            } />
            <SubItem label="Safety Precaution" subChildren={
              <>
                <li>
                  <a href="/settings-safety-new"
                    className={`nav-sub-link nested ${pathname === '/settings-safety-new' ? 'sub-active' : ''}`}>
                    <span className="sub-dot small" />New Precaution
                  </a>
                </li>
                <li>
                  <a href="/settings-safety-list"
                    className={`nav-sub-link nested ${pathname === '/settings-safety-list' ? 'sub-active' : ''}`}>
                    <span className="sub-dot small" />List Precaution
                  </a>
                </li>
              </>
            } />
          </NavItem> */}

          <a href="/log-history" className={`nav-link ${isActive('/log-history') ? 'active' : ''}`}>
            <span className="nav-icon-box">
              <i className="ti ti-clock" aria-hidden="true" />
            </span>
            <span className="nav-label">Log-History</span>
          </a>

          <a href="/logs-reports" className={`nav-link ${isActive('/logs-reports') ? 'active' : ''}`}>
            <span className="nav-icon-box">
              <i className="ti ti-chart-bar" aria-hidden="true" />
            </span>
            <span className="nav-label">Logs-Reports</span>
          </a>
        </nav>

      </div>
    </aside>
  )
}

export default Sidebar
import React, { useState } from "react";
import { showSuccess, showError, showDeleteConfirm, showDeleteSuccess } from "../../components/common/Toast/Toast";
import Table from "../../components/common/Table/Table";
import Modal from "../../components/common/Modal/Modal";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import DepartmentForm from "../../forms/Departmentform/Departmentform";
import "../styles/pages.css";

// ─── Static Data ──────────────────────────────────────────────────────────────
const STATIC_DEPARTMENTS = [
  { departmentId: 1,  name: "Human Resources",  code: "HR",  description: "Manages employee relations",    status: "active"   },
  { departmentId: 2,  name: "Finance",           code: "FIN", description: "Handles financial operations",  status: "active"   },
  { departmentId: 3,  name: "Information Tech",  code: "IT",  description: "Manages IT infrastructure",     status: "active"   },
  { departmentId: 4,  name: "Marketing",         code: "MKT", description: "Handles marketing campaigns",   status: "inactive" },
  { departmentId: 5,  name: "Operations",        code: "OPS", description: "Oversees daily operations",     status: "active"   },
  { departmentId: 6,  name: "Legal",             code: "LGL", description: "Manages legal compliance",      status: "inactive" },
  { departmentId: 7,  name: "Research & Dev",    code: "RND", description: "Handles product research",      status: "active"   },
  { departmentId: 8,  name: "Customer Support",  code: "CS",  description: "Handles customer queries",      status: "active"   },
  { departmentId: 9,  name: "Sales",             code: "SLS", description: "Manages sales operations",      status: "active"   },
  { departmentId: 10, name: "Administration",    code: "ADM", description: "General administration",        status: "inactive" },
];

const PAGE_LIMIT_DEFAULT = 10;

const Departments = () => {
  const [open, setOpen]                             = useState(false);
  const [editOpen, setEditOpen]                     = useState(false);
  const [viewOpen, setViewOpen]                     = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [departmentList, setDepartmentList]         = useState(STATIC_DEPARTMENTS);
  const [currentPage, setCurrentPage]               = useState(1);
  const [pageLimit]                                 = useState(PAGE_LIMIT_DEFAULT);

  // ─── Pagination ───────────────────────────────────────────────────────────
  const totalPages = Math.ceil(departmentList.length / pageLimit);
  const startIndex = (currentPage - 1) * pageLimit;
  const paginated  = departmentList.slice(startIndex, startIndex + pageLimit);

  // ─── Handlers ─────────────────────────────────────────────────────────────
  const handleView = (item, index) => {
    setSelectedDepartment({ ...item, serial: startIndex + index + 1 });
    setViewOpen(true);
  };

  const handleEdit = (item, index) => {
    setSelectedDepartment({ ...item, serial: startIndex + index + 1 });
    setEditOpen(true);
  };

  const handleDelete = async (item) => {
    const result = await showDeleteConfirm();
    if (!result.isConfirmed) return;
    setDepartmentList((prev) => prev.filter((d) => d.departmentId !== item.departmentId));
    showDeleteSuccess();
  };

  const handleSubmit = (formData) => {
    try {
      if (selectedDepartment && editOpen) {
        setDepartmentList((prev) =>
          prev.map((d) =>
            d.departmentId === selectedDepartment.departmentId ? { ...d, ...formData } : d
          )
        );
        setEditOpen(false);
        setSelectedDepartment(null);
        showSuccess("Department updated successfully");
        return;
      }
      setDepartmentList((prev) => [...prev, { ...formData, departmentId: Date.now() }]);
      setOpen(false);
      showSuccess("Department added successfully");
    } catch {
      showError("Operation failed");
    }
  };

  // ─── Table columns ────────────────────────────────────────────────────────
  const columns = [
    { header: "S.No",        accessor: "serial"      },
    { header: "Name",        accessor: "name"        },
    { header: "Code",        accessor: "code"        },
    { header: "Description", accessor: "description" },
    { header: "Status",      accessor: "statusBadge" },
    { header: "Actions",     accessor: "actions"     },
  ];

  const tableData = paginated.map((item, index) => ({
    ...item,
    serial: startIndex + index + 1,

    statusBadge: (
      <span className={`dept-status-badge dept-status-badge--${item.status}`}>
        {item.status === "active" ? "● Active" : "● Inactive"}
      </span>
    ),

    actions: (
      <div className="dept-action-btns">
        <button
          className="dept-action-btn dept-action-btn--view"
          title="View"
          onClick={() => handleView(item, index)}
        >
          <FaEye />
        </button>
        <button
          className="dept-action-btn dept-action-btn--edit"
          title="Edit"
          onClick={() => handleEdit(item, index)}
        >
          <FaEdit />
        </button>
        <button
          className="dept-action-btn dept-action-btn--delete"
          title="Delete"
          onClick={() => handleDelete(item)}
        >
          <FaTrash />
        </button>
      </div>
    ),
  }));

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="dept-page">

      {/* ── Page Header ── */}
      <div className="dept-page-header">
        <div className="dept-page-header__left">
          <h1 className="dept-page-title">Departments</h1>
          <p className="dept-page-subtitle">
            Manage and configure all department records
          </p>
        </div>
        <div className="dept-page-header__right">
          <span className="dept-count-badge">
            {departmentList.length} Total
          </span>
          <button
            className="dept-add-btn"
            onClick={() => setOpen(true)}
          >
            <span className="dept-add-btn__icon">＋</span>
            Add Department
          </button>
        </div>
      </div>

      {/* ── Table Card ── */}
      <div className="dept-table-card">
        <Table
          columns={columns}
          data={tableData}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          isLoading={false}
        />
      </div>

      {/* ── Add Modal ── */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Add Department"
        size="lg"
        type="default"
      >
        <DepartmentForm
          onClose={() => setOpen(false)}
          onSubmit={handleSubmit}
        />
      </Modal>

      {/* ── Edit Modal ── */}
      <Modal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        title="Edit Department"
        size="lg"
        type="warning"
      >
        <DepartmentForm
          isEdit
          initialData={selectedDepartment}
          onClose={() => setEditOpen(false)}
          onSubmit={handleSubmit}
        />
      </Modal>

      {/* ── View Modal ── */}
      <Modal
        open={viewOpen}
        onClose={() => setViewOpen(false)}
        title="Department Details"
        size="md"
        type="info"
      >
        {selectedDepartment && (
          <div className="dept-view-grid">

            <div className="dept-view-item">
              <span className="dept-view-label">Department Name</span>
              <span className="dept-view-value">{selectedDepartment.name}</span>
            </div>

            <div className="dept-view-item">
              <span className="dept-view-label">Code</span>
              <span className="dept-view-value dept-view-value--code">
                {selectedDepartment.code}
              </span>
            </div>

            <div className="dept-view-item dept-view-item--full">
              <span className="dept-view-label">Description</span>
              <span className="dept-view-value">
                {selectedDepartment.description || "—"}
              </span>
            </div>

            <div className="dept-view-item">
              <span className="dept-view-label">Status</span>
              <span className={`dept-status-badge dept-status-badge--${selectedDepartment.status}`}>
                {selectedDepartment.status === "active" ? "● Active" : "● Inactive"}
              </span>
            </div>

            <div className="dept-view-item">
              <span className="dept-view-label">Serial No.</span>
              <span className="dept-view-value">#{selectedDepartment.serial}</span>
            </div>

          </div>
        )}
      </Modal>

    </div>
  );
};

export default Departments;
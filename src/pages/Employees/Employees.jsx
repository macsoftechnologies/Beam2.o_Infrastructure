import React, { useState } from "react";
import { showSuccess, showError, showDeleteConfirm, showDeleteSuccess } from "../../components/common/Toast/Toast";
import Table from "../../components/common/Table/Table";
import Modal from "../../components/common/Modal/Modal";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import EmployeeForm from "../../forms/Employeesform/Employeesform";
import "../styles/pages.css";

const STATIC_EMPLOYEES = [
  { employeeId: 1,  name: "Mads Woetmann",       badgeId: "",         designation: "Project Manager",       companyName: "MM Industries ApS", email: "mads@mmindustries.dk",   phoneNumber: "+459185 6000",   role: "Admin",   employeeType: "Full-time", access: true,  username: "mads.w",     password: "" },
  { employeeId: 2,  name: "Federico Leiva",       badgeId: "",         designation: "C&Q Permit Officer",    companyName: "NNE",               email: "OFLE@nne.com",           phoneNumber: "+4531918825",    role: "User",    employeeType: "Contractor", access: true, username: "federico.l", password: "" },
  { employeeId: 3,  name: "Morten Marin Gissel",  badgeId: "09282610", designation: "Projektleder",          companyName: "Kim Hvass",         email: "Morten@kim-hvass.dk",   phoneNumber: "+4522999048",    role: "User",    employeeType: "Full-time", access: true,  username: "morten.m",   password: "" },
  { employeeId: 4,  name: "Rasmus Hulebæk Klint", badgeId: "03614759", designation: "Projektleder",          companyName: "Kim Hvass",         email: "Rasmus@kim-hvass.dk",   phoneNumber: "+4522999018",    role: "User",    employeeType: "Full-time", access: true,  username: "rasmus.h",   password: "" },
  { employeeId: 5,  name: "Paulius Budrikas",      badgeId: "",         designation: "Site Manager",          companyName: "ITCC",              email: "paulius.budrikas@itcc.lt", phoneNumber: "+370 674 94185", role: "User", employeeType: "Contractor", access: true, username: "paulius.b",  password: "" },
  { employeeId: 6,  name: "Rolandas Banys",        badgeId: "",         designation: "Project Manager",       companyName: "ITCC",              email: "rolandas.banys@itcc.lt", phoneNumber: "+370 674 94237", role: "User",  employeeType: "Contractor", access: true, username: "rolandas.b", password: "" },
  { employeeId: 7,  name: "Jesper Ole Hansen",     badgeId: "",         designation: "Automation Specialist", companyName: "NNE",               email: "jpoh@nne.com",           phoneNumber: "+4530750024",    role: "User",    employeeType: "Full-time", access: true,  username: "jesper.h",   password: "" },
  { employeeId: 8,  name: "Adam",                  badgeId: "8615",     designation: "Electrician",           companyName: "Wicotec Kirkebjerg A/S", email: "adanow@wk.dk",      phoneNumber: "+4555232772",    role: "User",    employeeType: "Full-time", access: true,  username: "adam",       password: "" },
  { employeeId: 9,  name: "Slawek",                badgeId: "14624",    designation: "Electrician",           companyName: "Wicotec Kirkebjerg A/S", email: "sagora@wk.dk",      phoneNumber: "+4571860440",    role: "User",    employeeType: "Full-time", access: true,  username: "slawek",     password: "" },
  { employeeId: 10, name: "Lars Eriksen",          badgeId: "10021",    designation: "HSE Officer",           companyName: "Novo Nordisk",      email: "lars.e@novonordisk.com", phoneNumber: "+4588888888",    role: "Manager", employeeType: "Full-time", access: false, username: "lars.e",     password: "" },
];

const PAGE_LIMIT_DEFAULT = 10;

const ActionButtons = ({ onView, onEdit, onDelete }) => (
  <div className="dept-action-btns">
    <button className="dept-action-btn dept-action-btn--view" title="View" onClick={onView}>
      <FaEye />
    </button>
    <button className="dept-action-btn dept-action-btn--edit" title="Edit" onClick={onEdit}>
      <FaEdit />
    </button>
    <button className="dept-action-btn dept-action-btn--delete" title="Delete" onClick={onDelete}>
      <FaTrash />
    </button>
  </div>
);

const StatusBadge = ({ status }) => (
  <span className={`dept-status-badge dept-status-badge--${status ? "active" : "inactive"}`}>
    {status ? "● Active" : "● Inactive"}
  </span>
);

const Employees = () => {
  const [open, setOpen]                         = useState(false);
  const [editOpen, setEditOpen]                 = useState(false);
  const [viewOpen, setViewOpen]                 = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employeeList, setEmployeeList]         = useState(STATIC_EMPLOYEES);
  const [currentPage, setCurrentPage]           = useState(1);
  const [pageLimit]                             = useState(PAGE_LIMIT_DEFAULT);

  const totalPages = Math.ceil(employeeList.length / pageLimit);
  const startIndex = (currentPage - 1) * pageLimit;
  const paginated  = employeeList.slice(startIndex, startIndex + pageLimit);

  const handleView = (item, index) => {
    setSelectedEmployee({ ...item, serial: startIndex + index + 1 });
    setViewOpen(true);
  };

  const handleEdit = (item, index) => {
    setSelectedEmployee({ ...item, serial: startIndex + index + 1 });
    setEditOpen(true);
  };

  const handleDelete = async (item) => {
    const result = await showDeleteConfirm();
    if (!result.isConfirmed) return;
    setEmployeeList((prev) => prev.filter((e) => e.employeeId !== item.employeeId));
    showDeleteSuccess();
  };

  const handleSubmit = (formData) => {
    try {
      if (selectedEmployee && editOpen) {
        setEmployeeList((prev) =>
          prev.map((e) =>
            e.employeeId === selectedEmployee.employeeId ? { ...e, ...formData } : e
          )
        );
        setEditOpen(false);
        setSelectedEmployee(null);
        showSuccess("Employee updated successfully");
        return;
      }
      setEmployeeList((prev) => [...prev, { ...formData, employeeId: Date.now() }]);
      setOpen(false);
      showSuccess("Employee added successfully");
    } catch {
      showError("Operation failed");
    }
  };

  const columns = [
    { header: "S.No",        accessor: "serial"       },
    { header: "Employee Name", accessor: "name"       },
    { header: "Badge Id",    accessor: "badgeId"      },
    { header: "Designation", accessor: "designation"  },
    { header: "Company Name", accessor: "companyName" },
    { header: "Email ID",    accessor: "email"        },
    { header: "Phonenumber", accessor: "phoneNumber"  },
    { header: "Actions",     accessor: "actions"      },
  ];

  const tableData = paginated.map((item, index) => ({
    ...item,
    serial: startIndex + index + 1,

    actions: (
      <ActionButtons
        onView={() => handleView(item, index)}
        onEdit={() => handleEdit(item, index)}
        onDelete={() => handleDelete(item)}
      />
    ),
  }));

  return (
    <div className="dept-page">

      <div className="dept-page-header">
        <div className="dept-page-header__left">
          <h1 className="dept-page-title">Employees</h1>
          <p className="dept-page-subtitle">Manage and configure all employee records</p>
        </div>
        <div className="dept-page-header__right">
          <span className="dept-count-badge">{employeeList.length} Total</span>
          <button className="dept-add-btn" onClick={() => setOpen(true)}>
            <span className="dept-add-btn__icon">＋</span>
            Add Employee
          </button>
        </div>
      </div>

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

      <Modal open={open} onClose={() => setOpen(false)} title="Add Employee" size="lg" type="default">
        <EmployeeForm onClose={() => setOpen(false)} onSubmit={handleSubmit} />
      </Modal>

      <Modal open={editOpen} onClose={() => setEditOpen(false)} title="Edit Employee" size="lg" type="warning">
        <EmployeeForm isEdit initialData={selectedEmployee} onClose={() => setEditOpen(false)} onSubmit={handleSubmit} />
      </Modal>

      <Modal open={viewOpen} onClose={() => setViewOpen(false)} title="Employee Details" size="md" type="info">
        {selectedEmployee && (
          <div className="dept-view-grid">
            <div className="dept-view-item">
              <span className="dept-view-label">Employee Name</span>
              <span className="dept-view-value">{selectedEmployee.name}</span>
            </div>
            <div className="dept-view-item">
              <span className="dept-view-label">Badge Id</span>
              <span className="dept-view-value dept-view-value--code">{selectedEmployee.badgeId || "—"}</span>
            </div>
            <div className="dept-view-item">
              <span className="dept-view-label">Designation</span>
              <span className="dept-view-value">{selectedEmployee.designation}</span>
            </div>
            <div className="dept-view-item">
              <span className="dept-view-label">Phone Number</span>
              <span className="dept-view-value">{selectedEmployee.phoneNumber}</span>
            </div>
            <div className="dept-view-item">
              <span className="dept-view-label">Role</span>
              <span className="dept-view-value dept-view-value--code">{selectedEmployee.role}</span>
            </div>
            <div className="dept-view-item">
              <span className="dept-view-label">Employee Type</span>
              <span className="dept-view-value">{selectedEmployee.employeeType}</span>
            </div>
            <div className="dept-view-item">
              <span className="dept-view-label">Company Name</span>
              <span className="dept-view-value">{selectedEmployee.companyName}</span>
            </div>
            <div className="dept-view-item">
              <span className="dept-view-label">Access</span>
              <StatusBadge status={selectedEmployee.access} />
            </div>
            <div className="dept-view-item">
              <span className="dept-view-label">Email</span>
              <span className="dept-view-value">{selectedEmployee.email}</span>
            </div>
            <div className="dept-view-item">
              <span className="dept-view-label">Username</span>
              <span className="dept-view-value dept-view-value--code">{selectedEmployee.username}</span>
            </div>
            <div className="dept-view-item">
              <span className="dept-view-label">Serial No.</span>
              <span className="dept-view-value">#{selectedEmployee.serial}</span>
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
};

export default Employees;
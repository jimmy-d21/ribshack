import { createContext, useContext, useState, useEffect } from 'react';
import { staffData } from '../data/staffData';

const StaffContext = createContext(null);

export const StaffProvider = ({ children }) => {
  const [staff, setStaff] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate fetching staff data from backend
  const fetchStaffData = () => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setStaff(staffData.staff);
      setIsLoading(false);
    }, 500);
  };

  useEffect(() => {
    fetchStaffData();
  }, []);

  // Get staff by status
  const getStaffByStatus = (status) => {
    if (!status || status === 'all') {
      return staff;
    }
    return staff.filter(member => member.status === status);
  };

  // Get staff by role
  const getStaffByRole = (role) => {
    if (!role || role === 'all') {
      return staff;
    }
    return staff.filter(member => member.role === role);
  };

  // Get on-duty staff
  const getOnDutyStaff = () => {
    return staff.filter(member => member.status === 'on_duty');
  };

  // Get scheduled staff
  const getScheduledStaff = () => {
    return staff.filter(member => member.status === 'scheduled');
  };

  // Get staff count by role
  const getStaffCountByRole = (role) => {
    return staff.filter(member => member.role === role).length;
  };

  // Check in staff member
  const checkInStaff = (staffId) => {
    setStaff(prevStaff =>
      prevStaff.map(member =>
        member.id === staffId
          ? {
              ...member,
              status: 'on_duty',
              shiftToday: {
                ...member.shiftToday,
                checkInTime: new Date().toISOString()
              }
            }
          : member
      )
    );
  };

  // Check out staff member
  const checkOutStaff = (staffId) => {
    setStaff(prevStaff =>
      prevStaff.map(member =>
        member.id === staffId
          ? {
              ...member,
              status: 'off_duty',
              shiftToday: {
                ...member.shiftToday,
                checkOutTime: new Date().toISOString()
              }
            }
          : member
      )
    );
  };

  // Get staff statistics
  const getStaffStats = () => {
    return {
      total: staff.length,
      onDuty: getOnDutyStaff().length,
      scheduled: getScheduledStaff().length,
      grillers: getStaffCountByRole('griller'),
      cashiers: getStaffCountByRole('cashier'),
      riders: getStaffCountByRole('rider'),
      managers: getStaffCountByRole('manager')
    };
  };

  // Get staff member by id
  const getStaffById = (staffId) => {
    return staff.find(member => member.id === staffId);
  };

  // Refresh staff data
  const refreshStaffData = () => {
    fetchStaffData();
  };

  const value = {
    staff,
    isLoading,
    fetchStaffData,
    getStaffByStatus,
    getStaffByRole,
    getOnDutyStaff,
    getScheduledStaff,
    getStaffCountByRole,
    checkInStaff,
    checkOutStaff,
    getStaffStats,
    getStaffById,
    refreshStaffData
  };

  return (
    <StaffContext.Provider value={value}>
      {children}
    </StaffContext.Provider>
  );
};

export const useStaff = () => {
  const context = useContext(StaffContext);
  if (!context) {
    throw new Error('useStaff must be used within a StaffProvider');
  }
  return context;
};

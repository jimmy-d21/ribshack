import { Users, UserCheck, Clock, Phone, Mail, Calendar, Award, Briefcase } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { formatPhoneNumber } from '../utils/formatters';
import { useStaff } from '../context/StaffContext';

const StaffRosterPage = () => {
  const { staff, isLoading, getOnDutyStaff, getScheduledStaff, getStaffCountByRole } = useStaff();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-700 font-semibold">Loading staff roster...</p>
        </div>
      </div>
    );
  }

  const onDutyStaff = getOnDutyStaff();
  const scheduledStaff = getScheduledStaff();

  const getRoleBadge = (role) => {
    const configs = {
      manager: { bg: 'bg-purple-100 text-purple-800 border-purple-300', icon: Award },
      griller: { bg: 'bg-orange-100 text-orange-800 border-orange-300', icon: Users },
      cashier: { bg: 'bg-blue-100 text-blue-800 border-blue-300', icon: Briefcase },
      rider: { bg: 'bg-green-100 text-green-800 border-green-300', icon: Users }
    };
    return configs[role] || configs.cashier;
  };

  const getStatusBadge = (status) => {
    if (status === 'on_duty') return 'bg-green-600 text-white';
    if (status === 'scheduled') return 'bg-blue-600 text-white';
    return 'bg-gray-400 text-white';
  };

  const getStatusLabel = (status) => {
    if (status === 'on_duty') return 'On Duty';
    if (status === 'scheduled') return 'Scheduled';
    return 'Off Duty';
  };

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Staff Roster</h1>
        <p className="text-gray-600 mt-1">Current shift schedule and staff status</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card key="on-duty-stat">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">On Duty</CardTitle>
              <UserCheck className="size-5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{onDutyStaff.length}</div>
            <p className="text-xs text-gray-500 mt-1">Active staff members</p>
          </CardContent>
        </Card>

        <Card key="scheduled-stat">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">Scheduled</CardTitle>
              <Clock className="size-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{scheduledStaff.length}</div>
            <p className="text-xs text-gray-500 mt-1">Coming in later</p>
          </CardContent>
        </Card>

        <Card key="total-staff-stat">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">Total Staff</CardTitle>
              <Users className="size-5 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{staff.length}</div>
            <p className="text-xs text-gray-500 mt-1">All team members</p>
          </CardContent>
        </Card>
      </div>

      {/* On Duty Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCheck className="size-5 text-green-600" />
            Currently On Duty ({onDutyStaff.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {onDutyStaff.length === 0 ? (
            <div className="text-center py-8">
              <Users className="size-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No staff currently on duty</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {onDutyStaff.map((member) => {
                const roleBadge = getRoleBadge(member.role);
                const RoleIcon = roleBadge.icon;

                return (
                  <div
                    key={member.id || member.staffId}
                    className="p-4 bg-green-50 border border-green-200 rounded-lg"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-gray-900">{member.name}</h3>
                        <Badge className={`${roleBadge.bg} border mt-1 flex items-center gap-1 w-fit`}>
                          <RoleIcon className="size-3" />
                          {member.role}
                        </Badge>
                      </div>
                      <Badge className="bg-green-600 text-white">On Duty</Badge>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="size-4" />
                        <span>
                          {member.shiftStartTime} - {member.shiftEndTime}
                        </span>
                      </div>
                      {member.phoneNumber && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <Phone className="size-4" />
                          <span>{formatPhoneNumber(member.phoneNumber)}</span>
                        </div>
                      )}
                      {member.email && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <Mail className="size-4" />
                          <span className="text-xs">{member.email}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Scheduled Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="size-5 text-blue-600" />
            Scheduled for Later ({scheduledStaff.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {scheduledStaff.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="size-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No scheduled staff for later</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {scheduledStaff.map((member) => {
                const roleBadge = getRoleBadge(member.role);
                const RoleIcon = roleBadge.icon;

                return (
                  <div
                    key={member.id || member.staffId}
                    className="p-4 bg-blue-50 border border-blue-200 rounded-lg"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-gray-900">{member.name}</h3>
                        <Badge className={`${roleBadge.bg} border mt-1 flex items-center gap-1 w-fit`}>
                          <RoleIcon className="size-3" />
                          {member.role}
                        </Badge>
                      </div>
                      <Badge className="bg-blue-600 text-white">Scheduled</Badge>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="size-4" />
                        <span>
                          {member.shiftStartTime} - {member.shiftEndTime}
                        </span>
                      </div>
                      {member.phoneNumber && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <Phone className="size-4" />
                          <span>{formatPhoneNumber(member.phoneNumber)}</span>
                        </div>
                      )}
                      {member.email && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <Mail className="size-4" />
                          <span className="text-xs">{member.email}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* All Staff Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="size-5 text-gray-600" />
            All Staff Members
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Role</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Shift</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Contact</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {staff.map((member) => {
                  const roleBadge = getRoleBadge(member.role);

                  return (
                    <tr key={member.id || member.staffId} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4 font-semibold text-gray-900">{member.name}</td>
                      <td className="py-4 px-4">
                        <Badge className={`${roleBadge.bg} border`}>{member.role}</Badge>
                      </td>
                      <td className="py-4 px-4 text-gray-600 text-sm">
                        {member.shiftStartTime} - {member.shiftEndTime}
                      </td>
                      <td className="py-4 px-4">
                        <div className="space-y-1 text-sm">
                          {member.phoneNumber && (
                            <div className="text-gray-600">{formatPhoneNumber(member.phoneNumber)}</div>
                          )}
                          {member.email && (
                            <div className="text-gray-500 text-xs">{member.email}</div>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <Badge className={getStatusBadge(member.status)}>
                          {getStatusLabel(member.status)}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffRosterPage;
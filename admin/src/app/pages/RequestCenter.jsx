import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Textarea } from '../components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '../components/ui/dialog';
import { 
  Inbox, 
  CheckCircle2, 
  XCircle, 
  Clock,
  AlertCircle,
  Package,
  Store
} from 'lucide-react';
import { toast } from 'sonner';
import { initialRequests } from '../data/requests';

export default function RequestCenter() {
  const [requests, setRequests] = useState(initialRequests);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [adminResponse, setAdminResponse] = useState('');
  const [actionType, setActionType] = useState(null);

  const openDialog = (request, action) => {
    setSelectedRequest(request);
    setActionType(action);
    setAdminResponse('');
    setIsDialogOpen(true);
  };

  const handleRespond = () => {
    const updatedRequests = requests.map(req => {
      if (req.id === selectedRequest.id) {
        return {
          ...req,
          status: actionType,
          respondedAt: new Date().toLocaleString('en-US', { 
            year: 'numeric',
            month: '2-digit', 
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          }),
          adminNotes: adminResponse
        };
      }
      return req;
    });

    setRequests(updatedRequests);
    setIsDialogOpen(false);
    
    if (actionType === 'approved') {
      toast.success(`Request from ${selectedRequest.branch} approved!`);
    } else {
      toast.error(`Request from ${selectedRequest.branch} declined.`);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-orange-500"><Clock className="size-3 mr-1" />Pending</Badge>;
      case 'approved':
        return <Badge className="bg-green-500"><CheckCircle2 className="size-3 mr-1" />Approved</Badge>;
      case 'declined':
        return <Badge className="bg-red-500"><XCircle className="size-3 mr-1" />Declined</Badge>;
      default:
        return null;
    }
  };

  const pendingCount = requests.filter(r => r.status === 'pending').length;
  const approvedCount = requests.filter(r => r.status === 'approved').length;
  const declinedCount = requests.filter(r => r.status === 'declined').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Request Center</h1>
        <p className="text-gray-500 mt-1">Branch inventory and restock requests</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600">Total Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{requests.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600 flex items-center gap-2">
              <Clock className="size-4 text-orange-500" />
              Pending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-500">{pendingCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600 flex items-center gap-2">
              <CheckCircle2 className="size-4 text-green-500" />
              Approved
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-500">{approvedCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600 flex items-center gap-2">
              <XCircle className="size-4 text-red-500" />
              Declined
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-500">{declinedCount}</div>
          </CardContent>
        </Card>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {requests
          .sort((a, b) => {
            // Sort by status (pending first) then by date
            if (a.status === 'pending' && b.status !== 'pending') return -1;
            if (a.status !== 'pending' && b.status === 'pending') return 1;
            return new Date(b.requestedAt) - new Date(a.requestedAt);
          })
          .map((request) => (
            <Card key={request.id} className={`${request.status === 'pending' ? 'border-l-4 border-l-orange-500' : ''}`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${request.status === 'pending' ? 'bg-orange-100' : 'bg-gray-100'}`}>
                      <Package className={`size-6 ${request.status === 'pending' ? 'text-orange-600' : 'text-gray-600'}`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <CardTitle className="text-lg">{request.branch}</CardTitle>
                        {getStatusBadge(request.status)}
                        <Badge className={getPriorityColor(request.priority)}>
                          {request.priority.toUpperCase()}
                        </Badge>
                      </div>
                      <CardDescription className="mt-1">
                        Requested: {request.requestedAt}
                      </CardDescription>
                    </div>
                  </div>
                  {request.status === 'pending' && (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => openDialog(request, 'approved')}
                      >
                        <CheckCircle2 className="size-4 mr-2" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 hover:bg-red-50"
                        onClick={() => openDialog(request, 'declined')}
                      >
                        <XCircle className="size-4 mr-2" />
                        Decline
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Items Requested */}
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Package className="size-4" />
                    Items Requested:
                  </h4>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left text-sm text-gray-600">
                          <th className="pb-2">Item</th>
                          <th className="pb-2 text-right">Quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        {request.items.map((item, idx) => (
                          <tr key={idx} className="border-t border-gray-200">
                            <td className="py-2">{item.item}</td>
                            <td className="py-2 text-right font-medium">
                              {item.quantity} {item.unit}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Branch Notes */}
                <div>
                  <h4 className="font-medium mb-2">Branch Notes:</h4>
                  <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                    {request.notes}
                  </p>
                </div>

                {/* Admin Response */}
                {request.status !== 'pending' && (
                  <div className={`border-t pt-4 ${request.status === 'approved' ? 'border-green-200' : 'border-red-200'}`}>
                    <div className="flex items-center gap-2 mb-2">
                      {request.status === 'approved' ? (
                        <CheckCircle2 className="size-5 text-green-600" />
                      ) : (
                        <XCircle className="size-5 text-red-600" />
                      )}
                      <h4 className="font-medium">
                        {request.status === 'approved' ? 'Approved' : 'Declined'} on {request.respondedAt}
                      </h4>
                    </div>
                    <p className={`text-sm p-3 rounded-lg ${request.status === 'approved' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                      <strong>Admin Notes:</strong> {request.adminNotes}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
      </div>

      {/* Action Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionType === 'approved' ? 'Approve Request' : 'Decline Request'}
            </DialogTitle>
            <DialogDescription>
              {actionType === 'approved' 
                ? 'Approving this request will update the branch inventory system.'
                : 'Please provide a reason for declining this request.'
              }
            </DialogDescription>
          </DialogHeader>
          
          {selectedRequest && (
            <div className="space-y-4 py-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Store className="size-4 text-gray-600" />
                  <span className="font-medium">{selectedRequest.branch}</span>
                </div>
                <div className="text-sm text-gray-600">
                  {selectedRequest.items.map((item, idx) => (
                    <div key={idx}>
                      • {item.quantity} {item.unit} of {item.item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {actionType === 'approved' ? 'Delivery Notes (Optional)' : 'Reason for Declining *'}
                </label>
                <Textarea
                  placeholder={actionType === 'approved' 
                    ? 'e.g., Scheduled for delivery tomorrow at 10 AM'
                    : 'e.g., Supplier out of stock, will be available next week'
                  }
                  value={adminResponse}
                  onChange={(e) => setAdminResponse(e.target.value)}
                  rows={4}
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleRespond}
              className={actionType === 'approved' 
                ? 'bg-green-600 hover:bg-green-700' 
                : 'bg-red-600 hover:bg-red-700'
              }
              disabled={actionType === 'declined' && !adminResponse.trim()}
            >
              {actionType === 'approved' ? 'Approve Request' : 'Decline Request'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
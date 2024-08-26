import { description } from './aboutUs'
import { FaCar, FaCogs, FaRegCheckCircle, FaRupeeSign, FaTimes, FaList } from 'react-icons/fa'

export const status = {
  requested: 'requested',
  open: 'open',
  confirmed: 'confirmed',
  wip: 'wip',
  ready: 'ready',
  paymentDue: 'paymentDue',
  completed: 'completed',
  declined: 'declined',
}

export const workStatus = [
  {
    Icon: FaCar,
    iconColor: '#ddd',
    title: 'Requested',
    name: 'requested',
    count: 0,
    description: 'Requested Bookings',
    path: 'requested-bookings',
  },
  {
    Icon: FaCar,
    iconColor: '#FFAB4F',
    title: 'Open',
    name: 'open',
    count: 13,
    description: 'Repair bookings is open',
    path: 'open-bookings',
  },
  {
    Icon: FaCar,
    iconColor: '#51A846',
    title: 'Confirmed',
    name: 'confirmed',
    count: 13,
    description: 'Confirmed bookings created',
    path: 'confirmed-booking',
  },
  // {
  //   Icon: FaList,
  //   iconColor: '#51A846',
  //   title: 'Initial Inspection',
  //   name: 'initialinspection',
  //   count: 13,
  //   description: 'Initial inspection or booking creation',
  //   path: 'initial-inspection'
  // },
  {
    Icon: FaCogs,
    iconColor: '#489cbd',
    title: 'Ongoing Repair',
    name: 'wip',
    count: 13,
    description: 'Repair in progress',
    path: 'work-in-progress',
  },
  {
    Icon: FaRegCheckCircle,
    iconColor: '#51A846',
    title: 'Ready',
    name: 'ready',
    count: 13,
    description: 'Ready to dispatch',
    path: 'ready-bookings',
  },
  {
    Icon: FaRupeeSign,
    iconColor: '#ED382B',
    title: 'Payment Due',
    name: 'paymentDue',
    count: 0,
    description: 'Payment due bookings',
    path: 'payment-due',
  },
  {
    Icon: FaRegCheckCircle,
    iconColor: '#51A846',
    title: 'Completed',
    name: 'completed',
    count: 13,
    description: 'Bookings completed',
    path: 'complete',
  },
  {
    Icon: FaTimes,
    iconColor: '#ED382B',
    title: 'Declined',
    name: 'declined',
    count: 13,
    description: 'Bookings declined',
    path: 'declined',
  },
]

export const bookingServicesStatus = {
  open: 'open', // - default
  pending: 'pending',
  approved: 'approved', //- to be updated by client only
  deny: 'deny', // - to be updated by client only
  closed: 'closed', // - to be updated by service center only
  complete: 'complete', // - to be updated by service center only
}
export const bookingProductStatus = {
  pending: 'pending', // - default
  approved: 'approved', //- to be updated by client only
  deny: 'deny', // - to be updated by client only
  closed: 'closed', // - to be updated by service center only
  complete: 'complete', // - to be updated by service center only
}

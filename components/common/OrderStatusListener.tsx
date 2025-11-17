import { useEffect } from 'react';
import { Alert } from 'react-native';
import { useSocket } from '@/context/SocketContext';
import { Toast } from 'toastify-react-native';

export default function OrderStatusListener() {
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    socket.on('order-status-updated', (notification) => {
      console.log('Notification:', notification);

      // عرض Toast
      Toast.info(notification.message, notification.title);
      console.log('Order Status Updated:', notification);

      // أو عرض Alert
      // Alert.alert(notification.title, notification.message);
    });

    return () => {
      socket.off('order-status-updated');
    };
  }, [socket]);

  return null; // لا يظهر شيء على الشاشة
}

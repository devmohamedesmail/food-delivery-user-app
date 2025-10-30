import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

type Notification = {
    id: number;
    title: string;
    message: string;
    icon: keyof typeof Ionicons.glyphMap;
    time: string;
    color: [string, string];
    isRead?: boolean;
    category: 'ride' | 'promo' | 'food' | 'account' | 'system';
    priority: 'high' | 'medium' | 'low';
};

const notifications: Notification[] = [
    {
        id: 1,
        title: 'Ride Confirmed',
        message: 'Your ride to Downtown is confirmed. Driver will arrive in 5 min.',
        icon: 'car-sport',
        time: '2 min ago',
        color: ['#4F8CFF', '#6EE7B7'],
        isRead: false,
        category: 'ride',
        priority: 'high',
    },
    {
        id: 2,
        title: 'Promo Unlocked!',
        message: 'You have received a 20% discount on your next ride.',
        icon: 'pricetag',
        time: '1 hr ago',
        color: ['#FBBF24', '#F472B6'],
        isRead: false,
        category: 'promo',
        priority: 'medium',
    },
    {
        id: 3,
        title: 'Restaurant Order',
        message: 'Your food order is being prepared. Estimated delivery: 30 min.',
        icon: 'fast-food',
        time: '3 hrs ago',
        color: ['#A78BFA', '#F472B6'],
        isRead: true,
        category: 'food',
        priority: 'high',
    },
    {
        id: 4,
        title: 'Account Update',
        message: 'Your profile was updated successfully.',
        icon: 'person-circle',
        time: 'Yesterday',
        color: ['#34D399', '#60A5FA'],
        isRead: true,
        category: 'account',
        priority: 'low',
    },
    {
        id: 5,
        title: 'System Maintenance',
        message: 'App will be under maintenance from 2 AM to 4 AM tonight.',
        icon: 'settings',
        time: '5 hrs ago',
        color: ['#6B7280', '#9CA3AF'],
        isRead: false,
        category: 'system',
        priority: 'medium',
    },
    {
        id: 6,
        title: 'Payment Successful',
        message: 'Your payment of $15.50 for your last ride has been processed.',
        icon: 'card',
        time: '1 day ago',
        color: ['#10B981', '#34D399'],
        isRead: true,
        category: 'ride',
        priority: 'low',
    },
];

export default function Notifications() {
    const [filter, setFilter] = useState<'all' | 'unread' | 'ride' | 'promo' | 'food'>('all');
    const [notificationList, setNotificationList] = useState(notifications);

    const filteredNotifications = notificationList.filter(notif => {
        if (filter === 'all') return true;
        if (filter === 'unread') return !notif.isRead;
        return notif.category === filter;
    });

    const unreadCount = notificationList.filter(n => !n.isRead).length;

    const markAsRead = (id: number) => {
        setNotificationList(prev =>
            prev.map(notif =>
                notif.id === id ? { ...notif, isRead: true } : notif
            )
        );
    };

    const deleteNotification = (id: number) => {
        setNotificationList(prev => prev.filter(notif => notif.id !== id));
    };

    const FilterButton = ({ title, value, count }: { title: string; value: typeof filter; count?: number }) => (
        <TouchableOpacity
            onPress={() => setFilter(value)}
            className={`px-4 py-2.5 rounded-lg mr-3 border ${filter === value
                    ? 'bg-blue-600 border-blue-600 shadow-sm'
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                }`}
            activeOpacity={0.7}
        >
            <View className="flex-row items-center">
                <Text className={`font-medium text-sm ${filter === value
                        ? 'text-white'
                        : 'text-gray-700 dark:text-gray-300'
                    }`}>
                    {title}
                </Text>
                {count && count > 0 && (
                    <View className="ml-2 bg-red-500 rounded-full min-w-[20px] h-5 items-center justify-center px-1">
                        <Text className="text-white text-xs font-semibold">
                            {count > 99 ? '99+' : count}
                        </Text>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );

    const NotificationCard = ({ notification }: { notification: Notification }) => {
        const getPriorityIndicator = (priority: string) => {
            switch (priority) {
                case 'high': return { color: '#EF4444', size: 3 };
                case 'medium': return { color: '#F59E0B', size: 2 };
                case 'low': return { color: '#10B981', size: 1 };
                default: return { color: '#6B7280', size: 1 };
            }
        };

        const priorityIndicator = getPriorityIndicator(notification.priority);

        return (
            <TouchableOpacity
                onPress={() => markAsRead(notification.id)}
                className="mb-3"
                activeOpacity={0.7}
            >
                <View className={`bg-white dark:bg-gray-900 rounded-xl shadow-sm border ${!notification.isRead
                        ? 'border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/30'
                        : 'border-gray-200 dark:border-gray-800'
                    } overflow-hidden`}>
                    {/* Priority indicator bar */}
                    <View
                        className="h-1 w-full"
                        style={{ backgroundColor: priorityIndicator.color }}
                    />

                    <View className="px-4 py-4">
                        <View className="flex-row items-start">
                            {/* Icon */}
                            <View className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 items-center justify-center mr-4 mt-1">
                                <Ionicons
                                    name={notification.icon}
                                    size={24}
                                    color={notification.isRead ? "#6B7280" : "#4F46E5"}
                                />
                                {!notification.isRead && (
                                    <View className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full" />
                                )}
                            </View>

                            {/* Content */}
                            <View className="flex-1">
                                <View className="flex-row items-start justify-between mb-2">
                                    <Text className={`font-semibold text-base flex-1 mr-2 ${notification.isRead
                                            ? 'text-gray-600 dark:text-gray-400'
                                            : 'text-gray-900 dark:text-white'
                                        }`}>
                                        {notification.title}
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() => deleteNotification(notification.id)}
                                        className="p-1 -mt-1"
                                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                                    >
                                        <Ionicons name="close" size={18} color="#9CA3AF" />
                                    </TouchableOpacity>
                                </View>

                                <Text className={`text-sm leading-5 mb-3 ${notification.isRead
                                        ? 'text-gray-500 dark:text-gray-500'
                                        : 'text-gray-700 dark:text-gray-300'
                                    }`}>
                                    {notification.message}
                                </Text>

                                <View className="flex-row items-center justify-between">
                                    <Text className="text-xs text-gray-400 font-medium">
                                        {notification.time}
                                    </Text>

                                    <View className="flex-row items-center space-x-2">
                                        {notification.priority === 'high' && (
                                            <View className="flex-row items-center">
                                                <Ionicons name="alert-circle" size={14} color="#EF4444" />
                                                <Text className="text-xs text-red-500 ml-1 font-medium">Urgent</Text>
                                            </View>
                                        )}

                                        <View className={`px-2 py-1 rounded-md ${notification.category === 'ride' ? 'bg-blue-100 dark:bg-blue-900/30' :
                                                notification.category === 'promo' ? 'bg-amber-100 dark:bg-amber-900/30' :
                                                    notification.category === 'food' ? 'bg-purple-100 dark:bg-purple-900/30' :
                                                        notification.category === 'account' ? 'bg-emerald-100 dark:bg-emerald-900/30' :
                                                            'bg-gray-100 dark:bg-gray-800'
                                            }`}>
                                            <Text className={`text-xs font-medium capitalize ${notification.category === 'ride' ? 'text-blue-700 dark:text-blue-300' :
                                                    notification.category === 'promo' ? 'text-amber-700 dark:text-amber-300' :
                                                        notification.category === 'food' ? 'text-purple-700 dark:text-purple-300' :
                                                            notification.category === 'account' ? 'text-emerald-700 dark:text-emerald-300' :
                                                                'text-gray-700 dark:text-gray-300'
                                                }`}>
                                                {notification.category}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View className="flex-1 bg-gray-50 dark:bg-black">
            {/* Header */}
            <View className="bg-white dark:bg-gray-900 px-4 pt-12 pb-6 border-b border-gray-200 dark:border-gray-800">
                <View className="flex-row items-center justify-between">
                    <View className="flex-1">
                        <Text className="text-2xl font-bold text-gray-900 dark:text-white">
                            Notifications
                        </Text>
                        <Text className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
                            {unreadCount > 0 ? `${unreadCount} unread message${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
                        </Text>
                    </View>
                    {unreadCount > 0 && (
                        <TouchableOpacity
                            onPress={() => setNotificationList(prev => prev.map(n => ({ ...n, isRead: true })))}
                            className="bg-blue-600 px-4 py-2 rounded-lg shadow-sm"
                            activeOpacity={0.8}
                        >
                            <Text className="text-white font-medium text-sm">Mark All Read</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            {/* Filter Tabs */}
            <View className="bg-white dark:bg-gray-900 px-4 py-4 border-b border-gray-200 dark:border-gray-800">
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingRight: 20 }}
                >
                    <FilterButton title="All" value="all" />
                    <FilterButton title="Unread" value="unread" count={unreadCount} />
                    <FilterButton title="Rides" value="ride" />
                    <FilterButton title="Promos" value="promo" />
                    <FilterButton title="Food" value="food" />
                </ScrollView>
            </View>

            {/* Notifications List */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                className="flex-1 px-4"
                contentContainerStyle={{ paddingTop: 16, paddingBottom: 32 }}
            >
                {filteredNotifications.length > 0 ? (
                    filteredNotifications.map((notif) => (
                        <NotificationCard key={notif.id} notification={notif} />
                    ))
                ) : (
                    <View className="flex-1 items-center justify-center py-20">
                        <View className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 items-center justify-center mb-4">
                            <Ionicons name="notifications-off-outline" size={40} color="#9CA3AF" />
                        </View>
                        <Text className="text-gray-900 dark:text-white text-lg font-semibold mb-2">
                            No notifications
                        </Text>
                        <Text className="text-gray-500 dark:text-gray-400 text-center px-8 leading-5">
                            {filter === 'unread'
                                ? "You're all caught up! No unread notifications."
                                : filter === 'all'
                                    ? "You don't have any notifications yet."
                                    : `No ${filter} notifications available.`
                            }
                        </Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import Layout from '@/components/ui/Layout';
import useFetch from '@/hooks/useFetch';
import Header from '@/components/reviews/Header';
import OverallRating from '@/components/reviews/OverallRating';
import AddReview from '@/components/reviews/AddReview';
import { useLocalSearchParams } from 'expo-router';
import NoReviews from '@/components/reviews/NoReviews';
import ReviewLoading from '@/components/reviews/ReviewLoading';

// Review validation schema


export default function Reviews() {
  const storeItem = useLocalSearchParams().storeItem;
  const parsedStoreItem = JSON.parse(storeItem as string);
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const { data, loading  } = useFetch(`/reviews/store/${parsedStoreItem.id}`);
  const [reviews, setReviews] = useState<any[]>([]);
  const [filterRating, setFilterRating] = useState<number | null>(null);


  useEffect(() => {
    if (data) {
      setReviews(data);
    }
  }, [data]);



  const getRatingText = (rating: number) => {
    switch (rating) {
      case 5: return t('reviews.excellent');
      case 4: return t('reviews.veryGood');
      case 3: return t('reviews.good');
      case 2: return t('reviews.fair');
      case 1: return t('reviews.poor');
      default: return '';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return isRTL ? 'اليوم' : 'Today';
    if (diffDays === 1) return isRTL ? 'منذ يوم واحد' : '1 day ago';
    if (diffDays < 7) return `${diffDays} ${isRTL ? 'أيام' : 'days'} ${t('reviews.ago') || 'ago'}`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} ${isRTL ? 'أسابيع' : 'weeks'} ${t('reviews.ago') || 'ago'}`;
    return date.toLocaleDateString(isRTL ? 'ar-EG' : 'en-US');
  };

  const filteredReviews = filterRating
    ? reviews.filter(r => r.rating === filterRating)
    : reviews;

  return (
    <Layout>
      <Header />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}


        {/* Overall Rating Card */}
       <OverallRating storeItem={parsedStoreItem} />

        {/* Reviews List */}
        <View className="mx-5 mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-gray-900">
              {filterRating ? `${filterRating} ${t('reviews.stars')}` : t('reviews.allReviews')}
            </Text>
            {filterRating && (
              <TouchableOpacity onPress={() => setFilterRating(null)}>
                <Text className="text-orange-600 font-semibold">{t('common.clearAll')}</Text>
              </TouchableOpacity>
            )}
          </View>

          {loading ? (
            <ReviewLoading />
          ) : filteredReviews.length === 0 ? (
            <NoReviews />
          ) : (
            filteredReviews.map((review) => (
              <View key={review.id} className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-gray-100">
                <View className="flex-row">
                  <View className="w-12 h-12 rounded-full bg-orange-100 items-center justify-center">
                    <Ionicons name="person" size={24} color="#fd4a12" />
                  </View>
                  <View className="flex-1 ml-3">
                    <View className="flex-row justify-between items-start">
                      <View>
                        <Text className="text-base font-bold text-gray-900">
                          User #{review.user_id}
                        </Text>
                        <View className="flex-row items-center mt-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Ionicons
                              key={star}
                              name={star <= review.rating ? 'star' : 'star-outline'}
                              size={14}
                              color="#FFA500"
                              style={{ marginRight: 2 }}
                            />
                          ))}
                          <Text className="text-xs text-gray-500 ml-2">
                            {getRatingText(review.rating)}
                          </Text>
                        </View>
                      </View>
                      <Text className="text-xs text-gray-400">
                        {formatDate(review.createdAt)}
                      </Text>
                    </View>
                    <Text className="text-gray-700 mt-3 leading-5">
                      {review.comment}
                    </Text>
                  </View>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      {/* Floating Add Review Button */}
      <AddReview storeItem={parsedStoreItem} />
    </Layout>
  );
}

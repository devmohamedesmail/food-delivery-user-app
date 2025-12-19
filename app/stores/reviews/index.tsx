import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  Pressable,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import CustomModal from '@/components/common/CustomModal';
import { SafeAreaView } from 'react-native-safe-area-context';

// Sample reviews data - replace with actual API data
const SAMPLE_REVIEWS = [
  {
    id: '1',
    userName: 'Ahmed Hassan',
    userImage: 'https://i.pravatar.cc/150?img=12',
    rating: 5,
    comment: 'Excellent service! Fast delivery and great quality products.',
    date: '2024-12-15',
    helpful: 12,
  },
  {
    id: '2',
    userName: 'Sarah Mohamed',
    userImage: 'https://i.pravatar.cc/150?img=45',
    rating: 4,
    comment: 'Very good experience overall. The delivery was on time.',
    date: '2024-12-10',
    helpful: 8,
  },
  {
    id: '3',
    userName: 'Mohamed Ali',
    userImage: 'https://i.pravatar.cc/150?img=33',
    rating: 5,
    comment: 'Amazing quality and professional service. Highly recommended!',
    date: '2024-12-05',
    helpful: 15,
  },
];

export default function Reviews() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  
  const [reviews, setReviews] = useState(SAMPLE_REVIEWS);
  const [isModalVisible, setModalVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [filterRating, setFilterRating] = useState<number | null>(null);

  // Calculate overall rating
  const overallRating = reviews.length > 0
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : '0.0';

  // Rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map((star) => ({
    stars: star,
    count: reviews.filter((r) => r.rating === star).length,
    percentage: reviews.length > 0 
      ? (reviews.filter((r) => r.rating === star).length / reviews.length) * 100 
      : 0,
  }));

  const handleSubmitReview = () => {
    if (rating === 0) {
      Alert.alert(t('reviews.ratingRequired'));
      return;
    }
    if (!reviewText.trim()) {
      Alert.alert(t('reviews.reviewRequired'));
      return;
    }

    const newReview = {
      id: Date.now().toString(),
      userName: 'You',
      userImage: 'https://i.pravatar.cc/150?img=68',
      rating,
      comment: reviewText,
      date: new Date().toISOString().split('T')[0],
      helpful: 0,
    };

    setReviews([newReview, ...reviews]);
    setModalVisible(false);
    setRating(0);
    setReviewText('');
    Alert.alert(t('reviews.reviewSubmitted'));
  };

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
    
    if (diffDays === 1) return isRTL ? 'منذ يوم واحد' : '1 day ago';
    if (diffDays < 7) return `${diffDays} ${isRTL ? 'أيام' : 'days'} ${t('reviews.ago')}`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} ${isRTL ? 'أسابيع' : 'weeks'} ${t('reviews.ago')}`;
    return date.toLocaleDateString(isRTL ? 'ar-EG' : 'en-US');
  };

  const filteredReviews = filterRating 
    ? reviews.filter(r => r.rating === filterRating)
    : reviews;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-5 pt-6 pb-4">
          <Text className="text-3xl font-bold text-gray-900" style={{ textAlign: isRTL ? 'right' : 'left' }}>
            {t('reviews.title')}
          </Text>
        </View>

        {/* Overall Rating Card */}
        <View className="mx-5 mb-6 bg-gradient-to-br rounded-3xl overflow-hidden shadow-lg">
          <LinearGradient
            colors={['#fd4a12', '#ff6b3d']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="p-6"
          >
            <View className="items-center">
              <Text className="text-6xl font-bold text-white mb-2">{overallRating}</Text>
              <View className="flex-row mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Ionicons
                    key={star}
                    name={star <= parseFloat(overallRating) ? 'star' : 'star-outline'}
                    size={24}
                    color="#FFF"
                    style={{ marginHorizontal: 2 }}
                  />
                ))}
              </View>
              <Text className="text-white text-base opacity-90">
                {t('reviews.basedOnReviews', { count: reviews.length })}
              </Text>
            </View>
          </LinearGradient>
        </View>

        {/* Rating Distribution */}
        <View className="mx-5 mb-6 bg-gray-50 rounded-2xl p-5">
          <Text className="text-lg font-bold text-gray-900 mb-4" style={{ textAlign: isRTL ? 'right' : 'left' }}>
            {t('reviews.filterByRating')}
          </Text>
          {ratingDistribution.map((item) => (
            <TouchableOpacity
              key={item.stars}
              onPress={() => setFilterRating(filterRating === item.stars ? null : item.stars)}
              className="mb-3"
            >
              <View className="flex-row items-center">
                <View className="flex-row items-center w-20">
                  <Text className="text-sm font-semibold text-gray-700 mr-1">{item.stars}</Text>
                  <Ionicons name="star" size={16} color="#FFA500" />
                </View>
                <View className="flex-1 h-2 bg-gray-200 rounded-full mx-3">
                  <View
                    className="h-2 bg-orange-500 rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  />
                </View>
                <Text className="text-sm text-gray-600 w-12 text-right">{item.count}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

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

          {filteredReviews.length === 0 ? (
            <View className="items-center justify-center py-16">
              <Ionicons name="chatbox-outline" size={64} color="#D1D5DB" />
              <Text className="text-xl font-semibold text-gray-400 mt-4">
                {t('reviews.noReviews')}
              </Text>
              <Text className="text-gray-400 mt-2 text-center">
                {t('reviews.noReviewsMessage')}
              </Text>
            </View>
          ) : (
            filteredReviews.map((review) => (
              <View key={review.id} className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-gray-100">
                <View className="flex-row">
                  <Image
                    source={{ uri: review.userImage }}
                    className="w-12 h-12 rounded-full"
                  />
                  <View className="flex-1 ml-3">
                    <View className="flex-row justify-between items-start">
                      <View>
                        <Text className="text-base font-bold text-gray-900">
                          {review.userName}
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
                        {formatDate(review.date)}
                      </Text>
                    </View>
                    <Text className="text-gray-700 mt-3 leading-5">
                      {review.comment}
                    </Text>
                    <View className="flex-row items-center mt-3">
                      <TouchableOpacity className="flex-row items-center mr-4">
                        <Ionicons name="thumbs-up-outline" size={18} color="#6B7280" />
                        <Text className="text-sm text-gray-600 ml-1">
                          {review.helpful} {t('reviews.helpful')}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      {/* Floating Add Review Button */}
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        className="absolute bottom-6 right-6 shadow-lg"
        style={{ elevation: 5 }}
      >
        <LinearGradient
          colors={['#fd4a12', '#ff6b3d']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="flex-row items-center px-6 py-4 rounded-full"
        >
          <Ionicons name="add-circle-outline" size={24} color="white" />
          <Text className="text-white font-bold text-base ml-2">
            {t('reviews.addReview')}
          </Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Add Review Modal */}
      <CustomModal visible={isModalVisible} onClose={() => setModalVisible(false)}>
        <View className="pb-8">
          <Text className="text-2xl font-bold text-gray-900 mb-6 text-center">
            {t('reviews.writeReview')}
          </Text>

          {/* Star Rating */}
          <View className="mb-6">
            <Text className="text-base font-semibold text-gray-700 mb-3" style={{ textAlign: isRTL ? 'right' : 'left' }}>
              {t('reviews.yourRating')}
            </Text>
            <View className="flex-row justify-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity
                  key={star}
                  onPress={() => setRating(star)}
                  className="mx-2"
                >
                  <Ionicons
                    name={star <= rating ? 'star' : 'star-outline'}
                    size={40}
                    color={star <= rating ? '#FFA500' : '#D1D5DB'}
                  />
                </TouchableOpacity>
              ))}
            </View>
            {rating > 0 && (
              <Text className="text-center text-orange-600 font-semibold mt-2">
                {getRatingText(rating)}
              </Text>
            )}
          </View>

          {/* Review Text */}
          <View className="mb-6">
            <Text className="text-base font-semibold text-gray-700 mb-3" style={{ textAlign: isRTL ? 'right' : 'left' }}>
              {t('reviews.yourReview')}
            </Text>
            <TextInput
              className="bg-gray-50 rounded-xl p-4 text-gray-900 min-h-[120px]"
              placeholder={t('reviews.writeYourReview')}
              placeholderTextColor="#9CA3AF"
              multiline
              numberOfLines={5}
              textAlignVertical="top"
              value={reviewText}
              onChangeText={setReviewText}
              style={{ textAlign: isRTL ? 'right' : 'left' }}
            />
          </View>

          {/* Action Buttons */}
          <View className="flex-row space-x-3">
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                setRating(0);
                setReviewText('');
              }}
              className="flex-1 bg-gray-200 rounded-xl py-4 mr-2"
            >
              <Text className="text-gray-700 font-bold text-center text-base">
                {t('reviews.cancelReview')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSubmitReview}
              className="flex-1 rounded-xl py-4 overflow-hidden ml-2"
            >
              <LinearGradient
                colors={['#fd4a12', '#ff6b3d']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="py-4"
              >
                <Text className="text-white font-bold text-center text-base">
                  {t('reviews.submitReview')}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </CustomModal>
    </SafeAreaView>
  );
}

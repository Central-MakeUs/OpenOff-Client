import Icon from 'components/common/Icon/Icon';
import CommonCarousel from 'components/home/carousels/CommonCarousel/CommonCarousel';
import CategoryButtonGroup from 'components/home/groups/CategoryButtonGroup/CategoryButtonGroup';
import attentionEvent from 'data/events/attentionEvent';
import { Image, View, TouchableOpacity, ScrollView } from 'react-native';
import EventCardGroup from 'components/home/groups/EventCardGroup/EventCardGroup';
import eventList from 'data/lists/eventList';
import homeScreenStyles from './HomeScreen.style';

const HomeScreen = () => {
  return (
    <ScrollView style={homeScreenStyles.container}>
      <View style={homeScreenStyles.homeHeader}>
        <Image
          style={homeScreenStyles.logo}
          source={require('../../../assets/images/logo.png')}
        />
        <View />
        <View style={homeScreenStyles.controllerContainer}>
          <TouchableOpacity style={homeScreenStyles.controllerButton}>
            <Icon name="IconBell" fill="white" size={20} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="IconHeart" fill="white" size={20} />
          </TouchableOpacity>
        </View>
      </View>
      <CommonCarousel carouselData={attentionEvent} />
      <CategoryButtonGroup />
      <EventCardGroup events={eventList} />
    </ScrollView>
  );
};

export default HomeScreen;

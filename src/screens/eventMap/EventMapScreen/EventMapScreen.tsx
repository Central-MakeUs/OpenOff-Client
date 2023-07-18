import { NavigationProp, useNavigation } from '@react-navigation/native';
import MyCoordinateButton from 'components/eventMap/buttons/MyCoordinateButton/MyCoordinateButton';
import MapFieldButtonGroup from 'components/eventMap/groups/MapFieldButtonGroup/MapFieldButtonGroup';
import EventSearchInput from 'components/eventMap/inputs/EventSearchInput/EventSearchInput';
import MapBottomSheet from 'components/eventMap/sheets/MapBottomSheet/MapBottomSheet';
import { StackMenu } from 'constants/menu';
import eventList from 'data/lists/eventList';
import useEventMapSelector from 'hooks/eventMap/useEventMapSelector';
import useMapCoordinateInfo from 'hooks/eventMap/useMapCoordinateInfo';
import { useCallback } from 'react';
import { Dimensions, View } from 'react-native';
import NaverMapView, { Marker } from 'react-native-nmap';
import { useAppStore } from 'stores/app';
import { colors } from 'styles/theme';
import { Field } from 'types/apps/group';
import { RootStackParamList } from 'types/apps/menu';
import { Coordinate } from 'types/event';
import eventMapScreenStyles from './EventMapScreen.style';

const EventMapScreen = () => {
  const {
    screenCoordinate,
    currentCoordinate,
    mapFocusCoordinate,
    naverMapRef,
  } = useMapCoordinateInfo();
  const { setCallbackCoordinate } = useAppStore();
  const { sort, setSort, selectState, dispatch } =
    useEventMapSelector(eventList);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const saveScreenCoordinate = useCallback(
    (coordinate: Coordinate) => {
      naverMapRef.current?.animateToCoordinate(coordinate);
    },
    [naverMapRef],
  );
  const getFieldEvent = useCallback(
    (field: Field) => {
      setCallbackCoordinate(saveScreenCoordinate);
      navigation.navigate(StackMenu.FieldEventMap, {
        field,
        coordinate: screenCoordinate.current,
      });
    },
    [navigation, saveScreenCoordinate, screenCoordinate, setCallbackCoordinate],
  );
  const handleEventSearch = useCallback((value: string) => {
    return false;
  }, []);
  const handleShowCalendar = useCallback(() => {
    navigation.navigate(StackMenu.DatePick);
  }, [navigation]);
  const handleMoveCurrentCoordinate = () => {
    naverMapRef.current?.animateToCoordinate(currentCoordinate);
  };
  return (
    <View style={eventMapScreenStyles.container}>
      <EventSearchInput
        handleSearch={handleEventSearch}
        handleCalendar={handleShowCalendar}
      />
      <MapFieldButtonGroup getFieldEvent={getFieldEvent} />
      <View style={eventMapScreenStyles.mapContainer}>
        <NaverMapView
          ref={naverMapRef}
          showsMyLocationButton={false}
          style={eventMapScreenStyles.map}
          center={{ ...mapFocusCoordinate, zoom: 16 }}
          onCameraChange={(event) => {
            screenCoordinate.current = {
              latitude: event.latitude,
              longitude: event.longitude,
            };
          }}
        >
          <Marker
            image={require('../../../assets/images/currentCoordinate.png')}
            width={50}
            height={50}
            coordinate={currentCoordinate}
            pinColor="blue"
          />
          {eventList.map((event) => (
            <Marker
              key={event.id}
              image={require('../../../assets/images/eventCoordinate.png')}
              width={50}
              height={50}
              coordinate={{
                latitude: event.coordinate.latitude,
                longitude: event.coordinate.longitude,
              }}
              pinColor={colors.background}
            />
          ))}
        </NaverMapView>
        <MyCoordinateButton handlePress={handleMoveCurrentCoordinate} />
      </View>
      <MapBottomSheet
        snapTop={50}
        snapBottom={(2 / 3) * Dimensions.get('window').height}
        sort={sort}
        setSort={setSort}
        selectState={selectState}
        dispatch={dispatch}
        eventList={eventList}
      />
    </View>
  );
};

export default EventMapScreen;

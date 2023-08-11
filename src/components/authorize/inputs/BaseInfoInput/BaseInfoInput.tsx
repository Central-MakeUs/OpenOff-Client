import ErrorText from 'components/authorize/texts/ErrorText/ErrorText';
import Icon from 'components/common/Icon/Icon';
import Text from 'components/common/Text/Text';
import { Dispatch, SetStateAction, useState } from 'react';
import {
  GestureResponderEvent,
  Pressable,
  TouchableOpacity,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import { TextInput } from 'react-native-gesture-handler';
import { colors } from 'styles/theme';
import { dateFormatter } from 'utils/date';
import baseInfoInputStyles from './BaseInfoInput.style';

interface Props {
  label: string;
  value: string;
  width: number;
  setValue: Dispatch<SetStateAction<string>>;
  validation: (value: string) => string | undefined;
  focusMode?: boolean;
}

const BaseInfoInput = ({
  label,
  value,
  setValue,
  validation,
  width,
  focusMode = false,
}: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const resetValue = (event: GestureResponderEvent) => {
    event.stopPropagation();
    setValue(focusMode ? '2000-00-00' : '');
  };
  return (
    <>
      <View style={{ ...baseInfoInputStyles.container, width }}>
        <Text variant="h4" color="white" style={{ width }}>
          {label}
        </Text>
        {!focusMode ? (
          <TextInput
            value={value}
            style={{
              ...baseInfoInputStyles.input,
              width,
              color: validation(value) ? colors.error : colors.white,
              borderColor: validation(value) ? colors.error : colors.main,
            }}
            onChangeText={(inputValue) => setValue(inputValue)}
          />
        ) : (
          <Pressable onPress={() => setOpen(true)}>
            <Text
              style={{
                ...baseInfoInputStyles.input,
                width,
                color: validation(value) ? colors.error : colors.white,
                borderColor: validation(value) ? colors.error : colors.main,
              }}
            >
              {value}
            </Text>
          </Pressable>
        )}
        <View
          style={{ ...baseInfoInputStyles.resetPosition, left: width - 18 }}
        >
          <TouchableOpacity onPress={resetValue}>
            <Icon name="IconExitCircle" size={18} fill="main" />
          </TouchableOpacity>
        </View>
        {!focusMode && (
          <ErrorText validation={validation} value={value} width={width} />
        )}
      </View>
      {focusMode && (
        <DatePicker
          modal
          title="날짜를 선택해주세요."
          mode="date"
          textColor="white"
          theme="dark"
          open={open}
          date={new Date(value)}
          confirmText="적용"
          cancelText="닫기"
          onConfirm={(date) => {
            setOpen(false);
            setValue(dateFormatter(date));
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      )}
    </>
  );
};

export default BaseInfoInput;

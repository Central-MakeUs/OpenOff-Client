import { loginWithKakaoAccount } from '@react-native-seoul/kakao-login';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { clearToken } from 'apis';
import { AxiosError } from 'axios';
import JoinButton from 'components/authorize/buttons/JoinAndFindButton/JoinAndFindButton';
import LoginButton from 'components/authorize/buttons/LoginButton/LoginButton';
import SocialLoginButtonGroup from 'components/authorize/groups/SocialLoginButtonGroup/SocialLoginButtonGroup';
import LoginInput from 'components/authorize/inputs/LoginInput/LoginInput';
import Text from 'components/common/Text/Text';
import CommonLoading from 'components/suspense/loading/CommonLoading/CommonLoading';
import { useNormalLogin, useSocialLogin } from 'hooks/queries/auth';
import { useEffect, useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from 'react-native';
import { useAuthorizeStore } from 'stores/Authorize';
import { colors } from 'styles/theme';
import { ApiResponse } from 'types/ApiResponse';
import { AuthStackParamList } from 'types/apps/menu';
import useDialog from 'hooks/app/useDialog';
import { validateEmail, validatePassword } from 'utils/validate';
import UserTotalInfoResponseDto from 'models/user/response/UserTotalInfoResponseDto';
import loginScreenStyles from './LoginScreen.style';

const LoginScreen = () => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  const [emailAddress, setEmailAddress] = useState<string>('');

  const { setIsLogin, resetToken } = useAuthorizeStore();

  const { openDialog } = useDialog();

  const [password, setPassword] = useState<string>('');

  const handleLoginError = (error: AxiosError<ApiResponse>) => {
    openDialog({
      type: 'validate',
      text: error.response?.data.message ?? '서버에 오류가 발생했습니다.',
    });
  };

  const handleSocialLoginError = (error: AxiosError<ApiResponse>) => {
    openDialog({
      type: 'validate',
      text: error.response?.data.message ?? '서버에 오류가 발생했습니다.',
    });
  };

  const { mutateAsync: normalLogin, isLoading: isNormalLoginLoading } =
    useNormalLogin(() => {
      return false;
    }, handleLoginError);

  const { mutateAsync: socialLogin, isLoading: isSocialLoginLoading } =
    useSocialLogin(() => {
      return false;
    }, handleSocialLoginError);

  const isActive =
    !validateEmail(emailAddress) &&
    !validatePassword(password) &&
    emailAddress.length >= 1 &&
    password.length >= 1;

  const divergeAuthorizeFlow = (
    userInfo?: UserTotalInfoResponseDto['userInfo'],
  ) => {
    if (userInfo?.userName) {
      setIsLogin(true);
      return;
    }
    if (userInfo?.phoneNumber) {
      navigation.navigate('Nickname');
      return;
    }
    navigation.navigate('AgreeToTerm');
  };

  const handleKakaoLogin = async () => {
    const kakaoResult = await loginWithKakaoAccount();
    const socialLoginResult = await socialLogin({
      socialType: 'kakao',
      token: kakaoResult.idToken,
    });
    divergeAuthorizeFlow(socialLoginResult.data?.userInfo);
  };

  const handleCommonLogin = async () => {
    if (!isActive) return;
    const normalLoginResult = await normalLogin({
      email: emailAddress,
      password,
    });
    divergeAuthorizeFlow(normalLoginResult.data?.userInfo);
  };

  useEffect(() => {
    resetToken();
    clearToken();
  }, []);

  if (isSocialLoginLoading || isNormalLoginLoading)
    return <CommonLoading isActive backgroundColor={colors.background} />;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={loginScreenStyles.container}
    >
      <ScrollView contentContainerStyle={loginScreenStyles.contentContainer}>
        <Image
          style={loginScreenStyles.logo}
          source={require('../../../../assets/images/logo.png')}
        />

        <View style={loginScreenStyles.mainContainer}>
          <LoginInput
            label="이메일"
            value={emailAddress}
            type="emailAddress"
            validation={validateEmail}
            setValue={setEmailAddress}
          />
          <LoginInput
            label="비밀번호"
            value={password}
            type="password"
            setValue={setPassword}
            validation={validatePassword}
          />
          <LoginButton isActive={isActive} handlePress={handleCommonLogin} />
          <Text style={loginScreenStyles.middleText}>또는</Text>
          <SocialLoginButtonGroup
            kakaoLogin={handleKakaoLogin}
            naverLogin={() => {
              return false;
            }}
            googleLogin={() => {
              return false;
            }}
            appleLogin={() => {
              return false;
            }}
          />

          <JoinButton />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

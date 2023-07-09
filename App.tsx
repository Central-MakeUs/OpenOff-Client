// import StorybookUIRoot from './.ondevice/Storybook';
// export { StorybookUIRoot as default };

// 스토리북 실행을 원한다면 위에 코드 주석 해제, 아래 코드 주석처리
// 서비스 실행을 원한다면 아래 코드 주석 해제, 위에 코드 주석처리

import { NavigationContainer } from '@react-navigation/native';
import AuthorizeNavigator from 'navigators/AuthorizeNavigator';
import Navigator from 'navigators/Navigator';
import { useState } from 'react';

const App = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  return (
    <NavigationContainer>
      {isLogin ? <Navigator /> : <AuthorizeNavigator setIsLogin={setIsLogin} />}
    </NavigationContainer>
  );
};

export default App;

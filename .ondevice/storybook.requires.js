/* do not change this file, it is auto generated by storybook. */

import {
  configure,
  addDecorator,
  addParameters,
  addArgsEnhancer,
  clearDecorators,
} from "@storybook/react-native";

global.STORIES = [
  {
    titlePrefix: "",
    directory: "./src",
    files: "**/*.stories.?(ts|tsx|js|jsx)",
    importPathMatcher:
      "^\\.[\\\\/](?:src(?:[\\\\/](?!\\.)(?:(?:(?!(?:^|[\\\\/])\\.).)*?)[\\\\/]|[\\\\/]|$)(?!\\.)(?=.)[^\\\\/]*?\\.stories\\.(?:ts|tsx|js|jsx)?)$",
  },
];

import "@storybook/addon-ondevice-notes/register";
import "@storybook/addon-ondevice-controls/register";
import "@storybook/addon-ondevice-backgrounds/register";
import "@storybook/addon-ondevice-actions/register";

import { argsEnhancers } from "@storybook/addon-actions/dist/modern/preset/addArgs";

import { decorators, parameters } from "./preview";

if (decorators) {
  if (__DEV__) {
    // stops the warning from showing on every HMR
    require("react-native").LogBox.ignoreLogs([
      "`clearDecorators` is deprecated and will be removed in Storybook 7.0",
    ]);
  }
  // workaround for global decorators getting infinitely applied on HMR, see https://github.com/storybookjs/react-native/issues/185
  clearDecorators();
  decorators.forEach((decorator) => addDecorator(decorator));
}

if (parameters) {
  addParameters(parameters);
}

try {
  argsEnhancers.forEach((enhancer) => addArgsEnhancer(enhancer));
} catch {}

const getStories = () => {
  return {
    "./src/components/common/Icon/Icon.stories.tsx": require("../src/components/common/Icon/Icon.stories.tsx"),
    "./src/components/common/Text/Text.stories.tsx": require("../src/components/common/Text/Text.stories.tsx"),
    "./src/navigators/BottomTabNavigator.stories.tsx": require("../src/navigators/BottomTabNavigator.stories.tsx"),
    "./src/screens/authorize/InterestFieldScreen/InterestFieldScreen.stories.tsx": require("../src/screens/authorize/InterestFieldScreen/InterestFieldScreen.stories.tsx"),
    "./src/screens/authorize/UserInfoScreen/UserInfoScreen.stories.tsx": require("../src/screens/authorize/UserInfoScreen/UserInfoScreen.stories.tsx"),
    "./src/screens/EventMapScreen/EventMapScreen.stories.tsx": require("../src/screens/EventMapScreen/EventMapScreen.stories.tsx"),
  };
};

configure(getStories, module, false);

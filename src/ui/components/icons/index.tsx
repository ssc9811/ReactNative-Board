import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react';
// import styled from 'styled-components/native';
// import {TouchableOpacity} from 'react-native';
// import {marginType} from '../../../utils/styleTypes';

// const IconContainer = styled.View`
//   justify-content: center;
//   align-items: center;
// `;

export const Icons = {
  Back: () => <Icon name="chevron-back-outline" size={30} color="black" />,
} as const;

// export const AppIcon = {
//   GradationBottom: <GradationBottom />,
//   GradationTop: <GradationTop />,
//   PrevWhite: <PrevWhite />,
//   PrevBlack: <PrevBlack />,
// } as const;
// export type AppIconType = typeof AppIcon[keyof typeof AppIcon];

// type IconsProps = {
//   // icon: AppIconType;
//   containerWidth?: number;
//   containerHeight?: number;
//   radius?: number;
//   iconWidth?: number;
//   iconHeight?: number;
//   margin?: marginType;
//   onPress?: () => void;
// };

// export function AppIcons({
//   // icon,
//   containerWidth = 32,
//   containerHeight = 32,
//   radius = 0,
//   margin = {
//     marginBottom: 0,
//     marginLeft: 0,
//     marginRight: 0,
//     marginTop: 0,
//   },
//   onPress,
// }: IconsProps): JSX.Element {
//   return (
//     <>
//       {onPress ? (
//         <TouchableOpacity onPress={onPress}>
//           <IconContainer
//             style={{
//               width: containerWidth,
//               height: containerHeight,
//               marginTop: margin.marginTop,
//               marginBottom: margin.marginBottom,
//               marginLeft: margin.marginLeft,
//               marginRight: margin.marginRight,
//               borderRadius: radius,
//             }}>
//             {icon}
//           </IconContainer>
//         </TouchableOpacity>
//       ) : (
//         <IconContainer
//           style={{
//             width: containerWidth,
//             height: containerHeight,
//             marginTop: margin.marginTop,
//             marginBottom: margin.marginBottom,
//             marginLeft: margin.marginLeft,
//             marginRight: margin.marginRight,
//             borderRadius: radius,
//           }}>
//           {icon}
//         </IconContainer>
//       )}
//     </>
//   );
// }

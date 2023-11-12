import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

export type FilterStyleProps = {
  isActive?: boolean;
};

export const Container = styled(TouchableOpacity)<FilterStyleProps>`
  border: 1px solid
    ${({ theme, isActive }) =>
      isActive === true ? theme.COLORS.GREEN_700 : "transparent"};

  border-radius: 4px;
  margin-right: 12px;
  height: 28px;
  width: 70px;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  font-size: 14px;
  color: ${({ theme }) => theme.COLORS.WHITE};
`;

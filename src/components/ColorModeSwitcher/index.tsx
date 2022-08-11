import {
  useColorMode,
  useColorModeValue,
  IconButton,
  IconButtonProps,
} from '@chakra-ui/react';
import { FiMoon, FiSun } from 'react-icons/fi';

type ColorModeSwitcherProps = Omit<IconButtonProps, 'aria-label'>;

const ColorModeSwitcher = (props: ColorModeSwitcherProps) => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue(`dark`, `light`);
  const variant = useColorModeValue(`outline`, `solid`);
  const color = useColorModeValue(`mediumTurquoise`, `gunmetal`);
  const colorScheme = useColorModeValue(``, `cyan`);
  const bgColor = useColorModeValue(``, `mediumTurquoise`);
  const SwitchIcon = useColorModeValue(FiMoon, FiSun);

  return (
    <IconButton
      size="md"
      fontSize="lg"
      variant={variant}
      color={color}
      colorScheme={colorScheme}
      bgColor={bgColor}
      marginLeft="2"
      onClick={toggleColorMode}
      icon={<SwitchIcon />}
      aria-label={`Switch to ${text} mode`}
      {...props}
    />
  );
};

export default ColorModeSwitcher;

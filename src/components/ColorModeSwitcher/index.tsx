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
  const color = useColorModeValue(`gunmetal`, `mintCream`);
  const colorScheme = useColorModeValue(`gunmetal`, `mintCream`);
  const SwitchIcon = useColorModeValue(FiMoon, FiSun);

  return (
    <IconButton
      size="md"
      fontSize="lg"
      variant="outline"
      color={color}
      colorScheme={colorScheme}
      marginLeft="2"
      onClick={toggleColorMode}
      icon={<SwitchIcon />}
      aria-label={`Switch to ${text} mode`}
      {...props}
    />
  );
};

export default ColorModeSwitcher;

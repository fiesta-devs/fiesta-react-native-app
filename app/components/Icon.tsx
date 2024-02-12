import { icons } from 'lucide-react-native';

const Icon = ({ name, color = 'currentColor', size = 'md' }) => {
  const LucideIcon = icons[name];

  return <LucideIcon color={color} size={size} />;
};

export default Icon;
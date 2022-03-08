import {
  Text, UnstyledButton, Group,
  ThemeIcon
} from "@mantine/core";
import { useStyles } from "./App";

interface NavButtonProps {
  icon: React.ReactNode;
  color: string;
  label: string;
}
export default function NavButton({ icon, color, label }: NavButtonProps) {
  const { classes } = useStyles();
  return (
    <UnstyledButton className={classes.button}>
      <Group>
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>

        <Text size="sm">{label}</Text>
      </Group>
    </UnstyledButton>
  );
}

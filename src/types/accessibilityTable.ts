export interface AccessibilityTableProps {
  keyboardRows?: Array<{ key: string; description: string }>;
  keyboardDescription?: string;
  screenReaderRows?: string[];
}

import { getSlotText } from './getSlotText';


test('concatenates plain string children', () => {
  expect(getSlotText('14')).toBe('14');
});

test('reads the label prop of nested elements when there are no children', () => {
  const badge = <span label="14" />;
  expect(getSlotText(badge)).toBe('14');
});

test('prefers children over the label prop', () => {
  const node = <span label="ignored">child text</span>;
  expect(getSlotText(node)).toBe('child text');
});

test('traverses nested elements and mixes primitives', () => {
  const node = (
    <div>
      <span>Count </span>
      <span>
        <b>1</b>
        4
      </span>
    </div>
  );
  expect(getSlotText(node)).toBe('Count 14');
});
